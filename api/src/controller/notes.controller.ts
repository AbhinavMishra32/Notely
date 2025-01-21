import { NextFunction, Response } from "express";
import prisma from "../db";
import { clerkClient } from "@clerk/express";

export const addNote = async (req: any, res: Response, next: NextFunction) => {
    try {
        const { content, title } = req.body;
        const { userId } = req.auth;
        console.log("userId", userId);

        const user = await prisma.user.findUnique({
            where: { clerkId: userId }
        });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
        // console.log("user", user);

        const note = await prisma.note.create({
            data: {
                title: "New Note",
                content: "",
                userId: user.id
            }
        });

        res.status(200).json({
            success: true,
            message: "Note created",
            noteId: note.id,
        });
    } catch (error) {
        console.log(error);
        // next(error);
    }
}

export const updateNote = async (req: any, res: Response, next: NextFunction) => {
    const { title, content } = req.body;
    const { noteId } = req.params;
    const { userId } = req.auth;

    try {

        const note = await prisma.note.findUnique({
            where: {
                id: noteId,
            }
        });

        if (!note) {
            return res.status(404).json({
                success: false,
                message: "Note not found or you do not have permission to update this note"
            });
        }

        console.log('clerkId: ', userId);
        const user = await prisma.user.findUnique({
            where: { clerkId: userId }
        });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        if (!user || note.userId !== user.id) {
            return res.status(403).json({
                success: false,
                message: "You do not have permission to update this note"
            });
        }

        const updatedNote = await prisma.note.update({
            data: {
                title,
                content
            },
            where: {
                id: noteId
            }
        });

        res.status(200).json({
            success: true,
            message: "Note updated successfully",
            note: updatedNote
        })
    } catch (error) {
        console.error("Error updating note:", error);
        res.status(500).json({
            success: false,
            message: "Failed to update note",
            error: error.message
        });
    }
};

export const fetchNote = async (req: any, res: Response, next: NextFunction) => {
    try {
        const { noteId } = req.params;
        const { userId } = req.auth;
        // console.log(noteId);

        const note = await prisma.note.findUnique({
            where: { id: noteId }
        })

        const user = await prisma.user.findUnique({
            where: { clerkId: userId }
        })
        console.log("note: ", note);

        if (!note) {
            return res.status(404).json({
                success: false,
                message: "Note by user not found or note doesn't exist"
            })
        }

        if (note.userId !== user.id) {
            return res.status(403).json({
                success: false,
                message: "You dont have permission to edit this note",
                note
            });
        }

        res.status(200).json({
            success: true,
            message: "Note found successfully",
            note
        })
    }
    catch (err) {
        console.log(err);
        // next(err);
    }
}

export const fetchAllNotes = async (req: any, res: Response, next: NextFunction) => {
    const { userId } = req.auth;
    try {
        const user = await prisma.user.findUnique({ where: { clerkId: userId } });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found, cant fetch notes"
            });
        }

        const notes = await prisma.note.findMany({ where: { userId: user.id } });
        res.status(200).json({
            success: true,
            notes
        });
    } catch (error) {
        console.log("Error in fetchAllNotes: ", error);
    }
}

export const deleteNote = async (req: any, res: Response, next: NextFunction) => {
    const { noteId } = req.params;
    try {
        const deletedNote = await prisma.note.delete({ where: { id: noteId } });

        if (!deletedNote) {
            return res.status(404).json({
                success: false,
                message: "Note not found"
            });
        }

        res.status(200).json({
            success: true,
        });
    } catch (error) {
        console.log("Error while deleting note: ", error);
    }
}