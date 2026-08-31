import type {Book} from "../types/books.ts";

export let books: Book[] = [
    {
        id: 1,
        title: "Clean Code",
        author: "Robert C. Martin",
        year: 2003
    },
    {
        id: 2,
        title: "Design Patterns",
        author: "Erich Gammas",
        year: 2007
    }
]

export type UpdateBookDTO = Partial<Omit<Book, "id">>;

// Repository se encarga de trabajar con los datos (queries, procesamiento, logica)

export const findAll = (): Book[] => {
    return books;
}

export const findByID = (id: Number): Book[] | undefined => {
    
    const index = books.findIndex((book) => book.id === id);    
    if (index === -1) return undefined;

    return books[index];
}

// POST insert new book 
export const create = (book: Book) =>{
    books.push(book);
    return book;
}

// DELETE delete book
export const remove = (id: number) => {
    const exists = books.some((book) => book.id === id);
    console.log(exists);
    if (!exists) return false;
    books = books.filter(book => book.id !==id);
    return true
}

export const updateByID = (id: number, updateData: UpdateBookDTO): Book | null => {
    const index = books.findIndex((book) => book.id === id);

    if (index === -1) return null;

    const updatedBook: Book = {
        ...books[index], 
        ...updateData,
        id
    };

    books[index] = updatedBook;
    return updatedBook
}
