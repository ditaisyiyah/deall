const axios = require('axios');

const { app: { refreshTokenPort } } = require('../config/index')

module.exports = axios.create({ baseURL: `http://localhost:${refreshTokenPort}` })