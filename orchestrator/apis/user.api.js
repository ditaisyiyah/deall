const axios = require('axios');

const { app: { userPort } } = require('../config/index')

module.exports = axios.create({ baseURL: `http://localhost:${userPort}` })