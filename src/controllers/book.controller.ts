import type {Request, Response} from "express";
import {createBook,
        deleteBook,
        updateBook,
        getBookByIdService,
        getAllBooksService
} from "../services/book.service.js"
import { HttpError } from "../errors/http.error.js";

// Todoo referente al HTTP y a los protocolos web viven aqui

export const getBooksController = (req: Request, res: Response) => {

    if (req.query.id){
        return handleGetById(req, res);
    }

    return handleGetAll(req, res);
} 

export function handleGetById(req: Request, res: Response){

    const filter = Number(req.query.id);

    if (isNaN(filter)) {
        throw new HttpError(400, "ID must be a number");
    }

    const book = getBookByIdService(filter);
    return res.status(200).json(book);
}

export function handleGetAll(req: Request, res: Response){
    const books = getAllBooksService()
    return res.status(200).json(books);
}

export const remove = (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const deleted = deleteBook(id);
    res.status(204).send();
}

export const create = (req: Request, res: Response) => {
    const book = createBook(req.body);
    res.status(201).json({
        message: "Book has been created",
        books: getAllBooksService()
    });
}

export const update = (req: Request, res: Response) => {

    const id = Number(req.params.id);

    if (isNaN(id)) throw new HttpError(400, "ID must be a number");
    const updated = updateBook(id, req.body)

    return res.status(200).json(updated);
}
