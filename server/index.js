require("dotenv").config();

const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const PORT = process.env.PORT || 8000;

// Defining routes below
app.get('/', (req, res) => { // Basic route to test server connectivity, delete later
  res.type('text/plain');
  res.send('Espresso Server ☕️');
})

app.listen(PORT);
console.log(`Server listening at http://localhost:${PORT}`);