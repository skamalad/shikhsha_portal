// Copyright 2017 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

'use strict';

// [START gae_node_request_example]
const express = require('express');
const { google } = require('googleapis');
const { auth } = require('google-auth-library');

const { SecretManagerServiceClient } = require('@google-cloud/secret-manager');

const app = express();

const scopes = ['https://www.googleapis.com/auth/admin.directory.user',
  'https://www.googleapis.com/auth/admin.directory.group',
  'https://www.googleapis.com/auth/admin.directory.group.member'];

app.get('/', (req, res) => {
  listUsers(res);
});

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});
// [END gae_node_request_example]

module.exports = app;

/**
 * Lists the first 10 users in the domain.
 *
 */
async function listUsers(res) {
  const client = new SecretManagerServiceClient();

  async function accessSecretVersion() {
    const [version] = await client.accessSecretVersion({
      name: 'projects/step-january2021/secrets/appengine-service-account-key/versions/latest',
    });

    // Extract the payload as a string.
    const payload = version.payload.data.toString();

    return payload;
  }

  const key = await accessSecretVersion();

  const jsonKey = JSON.parse(key)

  var jwt = new google.auth.JWT({
    email: jsonKey.client_email,
    key: jsonKey.private_key,
    subject: "admin@gcpdemos.net",
    scopes: scopes
  }
  );

  jwt.authorize(function (err, tokens) {
    if (err) {
      console.log(err);
      return;
    } else {
      console.log("Successfully connected!");
    }
  });

  // obtain the admin client
  const admin = await google.admin({
    version: 'directory_v1',
    auth: jwt
  });

  // list the first 10 users
  admin.users.list({
    domain: 'gcpdemos.net',
    maxResults: 10,
    orderBy: 'email',
  }, (err, resp) => {
    if (err) return console.error('The API returned an error:', err);

    const users = resp.data.users;
    res.status(200);
    var usersStr = "";
    if (users.length) {
      console.log('Users:');
      users.forEach((user) => {
        usersStr = usersStr + `${user.primaryEmail} (${user.name.fullName})<br>`;
        console.log(`${user.primaryEmail} (${user.name.fullName})`);
      });
    } else {
      usersStr = 'No users found.';
      console.log('No users found.');
    }
    res.send(usersStr);
    res.end();
  });

}

