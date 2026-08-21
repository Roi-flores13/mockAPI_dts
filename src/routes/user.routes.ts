import { Router, type Request, type Response } from "express";
import { getAllBooks } from "../controllers/book.controller.js";

const router = Router();

router.get("/", getAllBooks);
export default router;
