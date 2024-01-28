const express = require("express");
const app = express();
const path = require("path");
const port = 10000;

// Serve files from the current directory
app.use(express.static(__dirname));

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
