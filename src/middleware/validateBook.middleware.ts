import type { Request, Response, NextFunction} from "express";

export const validateBook = (req: Request, res: Response, next: NextFunction) => {
    
    const {title, author} = req.body;
    if (!title || !author){
        return res.status(400).json({
            message: "title and author are required"
        });
    }

    next();
};

