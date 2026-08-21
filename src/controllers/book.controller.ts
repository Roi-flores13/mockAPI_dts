import type {Request, Response} from "express";
import {getBooks} from "../services/book.service.js";

export function getAllBooks(req: Request, res: Response){
    res.json(getBooks());
}