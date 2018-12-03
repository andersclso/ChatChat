const router = require('express').Router();
const controller = require('./controllers');

// router.get("/", (req, res) => {
//   res.send({ response: "I am alive" }).status(200);
// });

// router.route("/")
//   .get(controller.getBusinessData)
//   .post(controller.postBusinessData)

router.route("/createuser")
  .post(controller.createUser)

router.route("/authenticate")
  .get(controller.authenticate)

router.route("/storeMessage")
  .post(controller.storeMessage)

router.route("/loadHistory")
  .get(controller.loadHistory)


module.exports = router;
