const express = require('express')
const mongoose = require('mongoose');


const app = express()
const port = 3000
mongoose.connect('mongodb+srv://ProjetoBriefing:<password>@briefing-api.r6gtvrk.mongodb.net/?retryWrites=true&w=majority&appName=Briefing-API')

app.get("", (req, res))

app.listen(port, () => {
    console.log('App running')
})
