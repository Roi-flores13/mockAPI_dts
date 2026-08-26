import type {Book} from "../types/books.ts";

let books: Book[] = [
    {
        id: 1,
        title: "Clean Code",
        author: "Robert C. Martin"
    },
    {
        id: 2,
        title: "Design Patterns",
        author: "Erich Gammas"
    }
]

// Repository se encarga de trabajar con los datos (queries, procesamiento, logica)

export function findAll(): Book[]{
    return books;
}

// GET book by id
export const findByID = (id: number) => books.find((book) => book.id === id)

// POST insert new book 
export const create = (book: Book) =>{
    books.push(book);
    return book;
}

export const remove = (id: number) => {
    const exists = books.some((book) => book.id === id);
    if (!exists) return false;
    books = books.filter(book => book.id !==id);
    return true
}