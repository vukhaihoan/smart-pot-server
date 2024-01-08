const path = require("path");

const MONGODB_DATABASE = "smart-pot";
const MONGODB_ATLAS_PARAMS = process.env.MONGODB_ATLAS_PARAMS;
exports.MONGODB_CONNECTION_STRING =
  process.env.MONGODB_URL_ATLAS + MONGODB_DATABASE;

exports.CLIENT_ID = process.env.CLIENT_ID;
exports.PROJECT_ID = process.env.PROJECT_ID;
exports.AUTH_URI = process.env.AUTH_URI;
exports.TOKEN_URI = process.env.TOKEN_URI;
exports.AUTH_PROVIDER_X509_CERT_URL = process.env.AUTH_PROVIDER_X509_CERT_URL;
exports.CLIENT_SECRET = process.env.CLIENT_SECRET;
exports.REDIRECT_URL = ["http://localhost:3000"];
