import type { Request, Response, NextFunction } from "express";

export const validateBook = (req: Request, res: Response, next: NextFunction) => {
    
    const {title, author, year} = req.body;
    if (!title || !author){
        return res.status(400).json({
            message: "title and author are required"
        });
    }

    const numYear = Number(year);
    if (!Number.isInteger(numYear) || (numYear < 0 || numYear > 2026)) {
        return res.status(400).json({
            message: "must enter a valid year between 0 and 2026"
        });
    }

    if (title.replaceAll(" ", "") === ""){
        return res.status(400).json({
            message: "title must contain more than whitespace"
        });
    }

    next();
};

