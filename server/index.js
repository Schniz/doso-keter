require("dotenv").load();
const express = require("express");
const api = require("./src/api");
const app = express();
const port = 8080;

app.get("/", (req, res) => {
  res.send("welcome");
});

app.use("/api", api);

app.listen(port, () => {
  console.log(`server is listening on ${port}. Ctrl-C to stop`);
});
