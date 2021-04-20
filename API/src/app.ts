import mongoose from 'mongoose'
import cors from 'cors'
import express from 'express'
import * as core from 'express-serve-static-core'
import 'dotenv/config'

const mongoUri: string = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@drug-cluster.edgvn.mongodb.net/${process.env.MONGO_DATABASE}?retryWrites=true&w=majority`
const mongoConfig: Object = { useNewUrlParser: true, useUnifiedTopology: true }

const app: core.Express = express()

app.use(cors())
app.use(express.json())

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
