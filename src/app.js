// importing external packages
const express = require('express');

// express instance
const app = express();

//setting PORT
const port = 3001;

app.listen( port, () => {
    console.log(`Server running on port ${3001}`)
});