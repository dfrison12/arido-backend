const express = require('express');
const router = express.Router();

const usersApiController = require ('../../controllers/api/users');

/* creating a route that will be used to send a response to the client. */
router.get("/users", usersApiController.list);
router.get("/users/:alias", usersApiController.showUser);
router.get("/users/:alias/groups", usersApiController.showGroups);
router.post("/users", usersApiController.store);

module.exports = router;