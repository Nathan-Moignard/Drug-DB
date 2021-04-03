import mongoose from 'mongoose'
import express from 'express'
import * as core from 'express-serve-static-core'

const mongoUri = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@drug-cluster.edgvn.mongodb.net/Drugs?retryWrites=true&w=majority`
const mongoConfig = { useNewUrlParser: true, useUnifiedTopology: true }

const app: core.Express = express()

mongoose.connect(mongoUri, mongoConfig)
.then(() => console.log(`Successfully connected to ${process.env.MONGO_DATABASE} Database`))
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
