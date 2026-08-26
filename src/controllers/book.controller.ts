import type {Request, Response} from "express";
import {getBooks,
        createBook,
        getBook,
        deleteBook
} from "../services/book.service.js";

// Todoo referente al HTTP y a los protocolos web viven aqui

export function getAllBooks(req: Request, res: Response){
    res.json(getBooks());
}

export const getOne = (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const book = getBook(id);
    if (!book) { 
        return res.status(404).json({
            message: "Book not found"
        });
    }

    res.json(book);
}

export const remove = (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const deleted = deleteBook(id);
    if (!deleted) { 
        return res.status(404).json({
            message: "Book not found"
        });
    }

    res.status(204).send();
}

export const create = (req: Request, res: Response) => {
    const book = createBook(req.body);
    res.status(201).json();
}
