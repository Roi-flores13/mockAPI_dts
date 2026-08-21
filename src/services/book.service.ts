import { findAll } from "../repositories/book.repository.js"

export function getBooks(){
    return findAll()
}