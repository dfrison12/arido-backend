const express = require('express');
const router = express.Router();

const usersController = require ('../../controllers/users/users');

/* creating a route that will be used to send a response to the client. */
router.get("/users", usersController.getUsers);
router.get("/users/:alias", usersController.showUser);
router.get("/users/:alias/groups", usersController.showGroups);
router.post("/users", usersController.store);

module.exports = router;