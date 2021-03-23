'use strict';

const { GoogleAuth } = require('google-auth-library');
const readline = require('readline');
const { google } = require('googleapis');
const { request } = require('https');

const SCOPES = ['https://www.googleapis.com/auth/admin.directory.user'];

const getServiceDetails = async function main() {
  const auth = new GoogleAuth({
    scopes: 'https://www.googleapis.com/auth/cloud-platform',
  });
  const client = await auth.getClient();
  const projectId = await auth.getProjectId();
  // const url = `https://dns.googleapis.com/dns/v1/projects/${projectId}`;
  const url = `https://dns.googleapis.com/dns/v1/projects/shikha-testapp`;
  const res = await client.request({ url });
  console.log(res.data);
};

getServiceDetails().catch(console.error);

module.exports = {
  getServiceDetails: getServiceDetails,
};
