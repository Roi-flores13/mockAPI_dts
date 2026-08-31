import type { Request, Response, NextFunction } from "express";
import { HttpError } from "../errors/http.error.js";

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    const status = err instanceof HttpError ? err.statusCode : 500;
    const message = err.message || "internal server error";

    return res.status(status).json({
        status: "error",
        statusCode: status,
        message: message
    });
    next();
}