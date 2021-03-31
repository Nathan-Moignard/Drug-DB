import { config } from 'dotenv'
import mongoose from 'mongoose'
import express from 'express'
import * as core from 'express-serve-static-core';

const app: core.Express = express()

mongoose.connect(`mongodb://Epitest:Erwaf@mongo:27017/${process.env.MONGO_DATABASE}`, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log(`Successfully connect to ${process.env.MONGO_DATABASE} Database`))
.catch(err => {
  console.log(err)
  process.exit(1)
})

app.get('/', (req, res) => {
  res.status(200).send(JSON.stringify('ok'));
});

app.listen(process.env.API_PORT, () => {
  console.info("Server started on Port: " + process.env.API_PORT)
})
