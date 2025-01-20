import 'dotenv/config';
import express, { NextFunction, Request, Response } from 'express';
import { CustomError } from './utils/error.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { clerkClient, clerkMiddleware, requireAuth } from '@clerk/express';
import { Webhook } from 'svix';
import userRouter from './routes/user.js';

const app = express();
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

// app.use(async (req: any, res: any, next: NextFunction) => {
//     const { userId } = req.auth;
//     if (userId) {
//         const user = await prisma.user.findUnique({
//             where: { clerkId: userId }
//         })
//     }
// });

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

app.get('/:name', (req: Request, res: Response,) => {
    res.send('Hello ' + req.params.name);
});

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

app.post('/api/webhooks', async (req: Request, res: Response) => {
    const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;
    if (!WEBHOOK_SECRET) {
        throw new Error("You need a WEBHOOK_SECRET in your .env");
    }

    const headers = req.headers;
    const payload = JSON.stringify(req.body);

    const svix_id = headers['svix-id']
    const svix_timestamp = headers['svix-timestamp']
    const svix_signature = headers['svix-signature']

    if (!svix_id || !svix_timestamp || !svix_signature) {
        return new Response('Error occured -- no svix headers', {
            status: 400,
        })
    }

    const wh = new Webhook(WEBHOOK_SECRET);

    let event: any;

    try {
        event = wh.verify(payload, {
            // let this error be, it works without fixing it
            'svix-id': svix_id,
            'svix-timestamp': svix_timestamp,
            'svix-signature': svix_signature,
        })
    }
    catch (err) {
        console.log("Error verifying webhook: ", err.message);
        return res.status(400).json({
            success: false,
            message: err.message,
        })
    }

    const { id } = event.data;
    const eventType = event.type;
    console.log(`Webhook with an ID of ${id} and type of ${eventType}`);
    console.log('Webhook body: ', event.data);

    return res.status(200).json({
        success: true,
        message: 'Webhook recieved',
    })
})

app.use('/api/user', userRouter);


// app.use('/api/user', userRouter);
// app.use('/api/posts', postRouter);
// app.use('/user', publicUserRouter);

app.use((err: any, req: any, res: any, next: any) => {
    console.error(err.stack)
    res.status(401).send('Unauthenticated!')
})

// app.use((err: CustomError, req: Request, res: Response, next: NextFunction) => {
//     const statusCode = err.statusCode || 500;
//     const message = err.message || 'Internal Server Error';
//     res.status(statusCode).json({
//         success: false,
//         statusCode,
//         message,
//     });
// })