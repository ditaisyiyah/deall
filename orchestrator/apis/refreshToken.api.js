const axios = require('axios');

const { refreshToken: { host, port } } = require('../config/index')

module.exports = axios.create({ baseURL: `http://${host}:${port}` })