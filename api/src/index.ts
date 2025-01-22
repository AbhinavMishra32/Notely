import 'dotenv/config';
import express, { NextFunction, Request, Response } from 'express';
import { CustomError } from './utils/error.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { clerkClient, clerkMiddleware, requireAuth } from '@clerk/express';
import { Webhook } from 'svix';
import userRouter from './routes/user.js';
import notesRouter from './routes/notes.js';

export const app = express();
const PORT = 3000;
app.use(clerkMiddleware());
app.use(express.json());
app.use(cookieParser());


app.use(cors({
    origin: 'http://localhost:5173', // for access from anywhere, use '*'
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

app.get('/protected', requireAuth({ signInUrl: "/sign-in" }), async (req: Request, res: Response) => {
    // console.log(req);
    const { auth } = req as any;
    const { userId } = auth;
    if (!userId) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    console.log(userId);
    const user = await clerkClient.users.getUser(userId);
    return res.json({ user });
});

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