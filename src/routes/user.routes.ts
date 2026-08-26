import { Router } from "express";
import { getAllBooks, getOne, create, remove } from "../controllers/book.controller.js";
import { validateBook } from "../middleware/validateBook.middleware.js";

const router = Router();

router.get("/", getAllBooks);
router.get("/:id", getOne);
router.post("/", validateBook, create);
router.delete("/:id", remove);

export default router;
