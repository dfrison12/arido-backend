// Importing external packages
const express = require('express');

/* Importing routers */
const mainRouter = require('./routes/index');

/* Creating an instance of the express package. */
const app = express();

/* Telling the server to use the mainRouter when the user goes to the root directory. */
app.use("/", mainRouter);

/* Configuring global middlewares */
app.use(express.json());
app.use(express.urlencoded({extended: false}));

/* This is the port that the server is running on. */
const port = 3001;
app.listen( port, () => {
    console.log(`Server running on port ${3001}`)
});