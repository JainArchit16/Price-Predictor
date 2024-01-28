const express = require('express');
const { exec } = require('child_process');
const app = express();
const path = require('path');
const port = 3000;

// Execute script.py to generate the JSON file
exec('python script.py', (error, stdout, stderr) => {
  if (error) {
    console.error(`Error executing script.py: ${error.message}`);
    return;
  }
  if (stderr) {
    console.error(`script.py stderr: ${stderr}`);
    return;
  }

  // Serve files from the current directory
  app.use(express.static(__dirname));

  // Start the server after script.py execution
  app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  });
});
