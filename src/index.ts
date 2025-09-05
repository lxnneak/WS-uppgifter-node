import express from "express"

const app = express()
const port: number = 3000

app.get("/", (req, res) => {
  res.status(200).send("Hello world!")
})

// Start server on Port Variable
app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})
