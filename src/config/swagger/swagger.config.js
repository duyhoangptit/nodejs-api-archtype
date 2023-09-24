const swaggerUi = require('swagger-ui-express');
const optionsOpenApi = require('./openapi.config')
const swaggerJsdoc = require("swagger-jsdoc")
const specs = swaggerJsdoc(optionsOpenApi);

const openApi = (app) => {
    app.use(
        "/api-docs",
        swaggerUi.serve,
        swaggerUi.setup(specs)
    )
    routeDefault(app)
}

const optionsSwagger = {
    swaggerOptions: {
        urls: [
            {
                url: '/api-docs/swagger.json',
                name: 'Json'
            },
            {
                url: '/api-docs/swagger.yaml',
                name: 'Yaml'
            }
        ]
    }
}

const configSwagger = (app) => {
    app.use('/api-docs', swaggerUi.serveFiles(null, optionsSwagger), swaggerUi.setup(null, optionsSwagger));
    routeDefault(app)
}

const routeDefault = (app) => {
    app.use((req, res, next) => {
        if (req.url === '/') {
            res.redirect('/api-docs')
            return
        }
        next()
    })
}

module.exports = {
    configSwagger,
    openApi
}
