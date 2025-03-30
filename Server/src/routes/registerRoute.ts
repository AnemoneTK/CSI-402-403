import express from "express";
import { register, login, history } from "../controller/register";
import { getAccount } from "../controller/paginate";

const router = express.Router();

router.post("/tempAccount", register);
router.post("/login", login);
router.get("/historicalSignin", history);
router.post("/getAccount", getAccount);

export default router;
