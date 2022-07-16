const axios = require('axios');

const { user: { host, port } } = require('../config/index')

module.exports = axios.create({ baseURL: `http://${host}:${port}` })