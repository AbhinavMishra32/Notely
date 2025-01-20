import { NextFunction, Response } from "express";

export const updateNote = (req: any, res: Response, next: NextFunction) => {
    const { content, title } = req.body;
    console.log("title: ", title);
    console.log("content: ", content);

    res.status(200).json({
        success: true,
        message: "Note updated",
    });
}