const express = require('express')
const app = express()

app.get('/', (req, res) => {
    const onur = {
        name: "Onur",
        surname: "Yurteri"
    }
    res.json(onur)
})

app.listen(3000)