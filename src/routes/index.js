/* importing the express module. */
const express = require('express');

const usersApiController = require ('../controllers/api/users')

/* creating a new router object. */
const router = express.Router();

/* creating a route that will be used to send a response to the client. */
router.get("/", usersApiController.list);

/* Exporting the router object so that it can be used in other files. */
module.exports = router;