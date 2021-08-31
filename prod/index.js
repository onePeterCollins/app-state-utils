developmentMode = require('./src/index')
productionMode = require('./dist/index')

const env = process.env.NODE_ENV || 'development'

switch (env) {
    case 'development':
        return developmentMode
    
    case 'production':
        return productionMode
}
