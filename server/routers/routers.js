const Router = require("express");
const router = new Router();
const controller = require("../controller/controller");
const AuthMiddleware = require("../middleware/AuthMiddleware");

router.post("/registration", controller.registration);
router.post("/login", controller.login);
router.get("/leaders", controller.leaders);
router.get("/check", AuthMiddleware, controller.check);
router.post("/update", AuthMiddleware, controller.updateScore);
router.post("/updatePass", AuthMiddleware, controller.updatePass);
router.post("/updateSound", AuthMiddleware, controller.updateSound);
router.post("/updateSkin", AuthMiddleware, controller.updateSkin);
router.post("/delete-user", AuthMiddleware, controller.deleteUser);
router.post("/create-admin", AuthMiddleware, controller.createAdmin);
router.post("/delete-admin", AuthMiddleware, controller.deleteAdmin);
module.exports = router;
