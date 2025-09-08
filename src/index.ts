import express from "express"
import "dotenv/config"
import { closeDB, getDB, runDB } from "./db/database.js"
import type { Db } from "mongodb"

const app = express()
const port: number = Number(process.env.PORT) || 3000

app.get("/", (req, res) => {
  res.status(200).send("Hello world!")
})

// Start server on Port Variable
// app.listen(port, "0.0.0.0", () => {
//  console.log(`Listening on port ${port}`)
// })

async function startServer() {
  try {
    await runDB()
    app.listen(port, () => {
      console.log(`Listening on port ${port}`)
      console.log(`Start the app: http://localhost:${port}`)
    })
    process.on("SIGINT", async () => {
      console.log("Cleaning up...")
      await closeDB()
      process.exit(0)
    })
  } catch (error) {
    console.log(error)
  }
}

startServer()

app.get("/api/v1/database/comments/:username", async (req, res) => {
  const db: Db = getDB()
  const result = await db
    .collection("comments")
    .find({ name: req.params.username })
    .limit(25)
    .toArray()

  if (result.length === 0) {
    res.status(404).send({ message: "Nothing was found" })
    return
  }

  res.send(result)
})
