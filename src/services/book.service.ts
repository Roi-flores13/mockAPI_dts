import { findAll,
         remove,
         create,
         updateByID,
         findByID} from "../repositories/book.repository.js";

import type {Book} from "../types/books.js";
import type { UpdateBookDTO } from "../repositories/book.repository.js"
import { HttpError } from "../errors/http.error.js"

// Aqui viven las decisiones de negocio

export function getBookByIdService(id: Number){

    const book = findByID(id);
    if(!book) throw new HttpError(404, "Book not found");

    return book;
}

export const getAllBooksService = () => {
    return findAll();
};

export const createBook = (book: Book) => {
    const newbook = {
        ...book,
        id: Date.now(),
    };
    return create(newbook);
};

export const deleteBook = (id: number) => {

    const deleted = remove(id);
    console.log(deleted);
    if(!deleted) throw new HttpError(404, "Book not found");
    return deleted;
}

export const updateBook = (id: number, updateData: UpdateBookDTO) => {

    const updated = updateByID(id, updateData);
    if (!updateData) throw new HttpError(404, "Book not found or invalid parameter to modify");
    return updated;
}