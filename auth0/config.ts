/**
 * Script to load Auth0 config from env
 *
 * Created by: Long Hung Nguyen (longhungn)
 */
require('dotenv').config();

const IS_PROD = process.env.NODE_ENV === 'production' ? true : false;

export const config = {
  AUTH0_DOMAIN: process.env.AUTH0_DOMAIN,
  AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID,
  AUTH0_CLIENT_SECRET: process.env.AUTH0_CLIENT_SECRET,
  AUTH0_KEYWORD_REPLACE_MAPPINGS: {
    // AUTH0_TENANT_NAME: 'uowac-dev.au.auth0.com',
    AUTH0_DOMAIN: process.env.AUTH0_DOMAIN,
    SYNC_USER_URL: process.env.SYNC_USER_URL,
    SYNC_USER_CLIENT_ID: process.env.SYNC_USER_CLIENT_ID,
    SYNC_USER_CLIENT_SECRET: process.env.SYNC_USER_CLIENT_SECRET,
  },
  AUTH0_ALLOW_DELETE: false,
  AUTH0_EXCLUDED_RULES: [],
};
