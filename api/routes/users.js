import express from "express";
import { deleteUser, getUser, getUsers, updateUser } from "../controllers/user.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

// router.get("/checkauthentication", verifyToken, (req, res) => {
//     res.send("You are authenticated");
// });

// router.get("/checkuser/:id",verifyUser, (req, res, next) => {
//     res.send("You are allowed to perform this action");
// });


// router.get("/checkadmin/:id", verifyAdmin, (req, res, next) => {
//     res.send("hello Admin, you are loged in and you can delete all users.");
// }); 

router.put("/:id", verifyUser, updateUser);

router.delete("/:id", verifyUser ,deleteUser);

router.get("/:id", verifyUser,getUser);

router.get("/",verifyAdmin, getUsers);

    
export default router;