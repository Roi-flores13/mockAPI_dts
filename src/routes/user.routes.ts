import { Router } from "express";
import { getBooksController, create, remove, update } from "../controllers/book.controller.js"
import { validateBook } from "../middleware/validateBook.middleware.js";

const router = Router();

router.get("/", getBooksController);
router.post("/", validateBook, create);
router.delete("/:id", remove);
router.patch("/:id", update); //Middlewre falla

export default router;
