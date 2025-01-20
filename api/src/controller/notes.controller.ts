import { NextFunction, Response } from "express";

export const updateNote = (req: any, res: Response, next: NextFunction) => {
    const { content, title } = req.body;
}