import 'dotenv/config';
import express, { NextFunction, Request, Response } from 'express';
import { CustomError } from './utils/error.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { clerkClient, clerkMiddleware, requireAuth } from '@clerk/express';
import { Webhook } from 'svix';
import userRouter from './routes/user.js';
import notesRouter from './routes/notes.js';

const CLIENT_URL = process.env.CLIENT_URL;
if (!CLIENT_URL) {
    console.error('CLIENT_URL is not set in environment variables');
    process.exit(1);
}

export const app = express();
const PORT = 3000;
app.use(clerkMiddleware());
app.use(express.json());
app.use(cookieParser());


app.use(cors({
    origin: CLIENT_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}))

const legacyRequireAuth = (req: any, res: any, next: any) => {
    if (!req.auth) {
        return next(new Error('Unauthenticated'))
    }
    next()
}

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// app.get('/:name', (req: Request, res: Response,) => {
//     res.send('Hello ' + req.params.name);
// });

app.get('/', async (req: Request, res: Response) => {
    res.status(200).json({
        success: true,
        message: "DB NOTES API"
    });
})

app.use('/api/user', userRouter);
app.use('/api/note', legacyRequireAuth, notesRouter);
// app.use('/api/note', requireAuth(), notesRouter);


// app.use((err: any, req: any, res: any, next: any) => {
//     console.error(err.stack)
//     res.status(401).send('Unauthenticated!')
// })

// app.use((err: CustomError, req: Request, res: Response, next: NextFunction) => {
//     const statusCode = err.statusCode || 500;
//     const message = err.message || 'Internal Server Error';
//     res.status(statusCode).json({
//         success: false,
//         statusCode,
//         message,
//     });
// })