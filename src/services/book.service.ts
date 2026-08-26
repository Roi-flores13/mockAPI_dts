import { findAll,
         findByID,
         remove,
         create} from "../repositories/book.repository.js";

import type {Book} from "../types/books.js";

// Aqui viven las decisiones de negocio

export function getBooks(){
    return findAll()
}

export const getBook = (id: number) => {
    return findByID(id);
};

export const createBook = (book: Book) => {
    const newbook = {
        ...book,
        id: Date.now(),
    };
    return create(newbook);
};

export const deleteBook = (id: number) => {
    return remove(id);
}