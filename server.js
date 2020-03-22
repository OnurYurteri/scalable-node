const express = require('express')
const app = express()

const AppRoutes = require('./app/routes')
const UserRoutes = require('./user/routes')


app.use('/app', AppRoutes)
app.use('/user', UserRoutes)

app.listen(3000)