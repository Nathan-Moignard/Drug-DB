import { config } from 'dotenv'
import mongoose from 'mongoose'
import express from 'express'
import * as core from 'express-serve-static-core';

process.env.API_PORT = '8080'

const app: core.Express = express()

app.get('/', (req, res) => {
  res.status(200).send(JSON.stringify('ok'));
});

app.listen(process.env.API_PORT, () => {
  console.info("Server started on Port: " + process.env.API_PORT)
})
