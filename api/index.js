const express = require('express')
const routes = require('./routes/index.js')

const app = express()
routes(app)

const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`Servidor está rodando na porta ${port}.`)
})

module.exports = app;