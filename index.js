const developmentMode = require('./src/index')
const productionMode = require('./dist/index')

const env = process.env.NODE_ENV || 'development'

let libVersion = developmentMode

env === 'production' ? libVersion = productionMode : libVersion = developmentMode

export default libVersion
