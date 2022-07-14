
/* importing the express module. */
const express = require('express');

/* creating a new router object. */
const router = express.Router();

/* creating a route that will be used to send a response to the client. */
router.get("/", (req,res) => {
    res.status(200).json('Hola mundo')
});

/* Exporting the router object so that it can be used in other files. */
module.exports = router;