const express = require('express');
const cors = require('cors');
const app = express();

/* Importing routers */
const userApiRouter = require('./routes/api/users');

/* Configuring global middlewares */
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

/* Telling the server to use the userApiRouter when the user goes to the "/api" directory. */
app.use("/api", userApiRouter);

/* This is the port that the server is running on. */
const port = 3001;
app.listen( port, () => {
    console.log(`Server running on port ${port}`)
});