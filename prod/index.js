const developmentMode = require('./src')
const productionMode = require('./dist')

const env = process.env.NODE_ENV || 'development'

let libVersion = developmentMode.default

env === 'production' ? libVersion = productionMode.default : libVersion = developmentMode.default

export default libVersion
