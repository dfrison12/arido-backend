/* importing the express module. */
const express = require('express');

/* creating a new router object. */
const router = express.Router();

/* Importing the usersApiController module */
const usersApiController = require ('../../controllers/api/users');

/* creating a route that will be used to send a response to the client. */
router.get("/users", usersApiController.list);
router.get("/users/:alias", usersApiController.show);
router.post("/users", usersApiController.store)

/* Exporting the router object so that it can be used in other files. */
module.exports = router;