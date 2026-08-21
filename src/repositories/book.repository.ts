import type {Book} from "../types/books.ts";

const books: Book[] = [
    {
        "id": 1,
        "title": "Clean Code",
        "author": "Robert C. Martin"
    },
    {
        "id": 2,
        "title": "Design Patterns",
        "author": "Erich Gammas"
    }
]

export function findAll(): Book[]{
    return books;
}