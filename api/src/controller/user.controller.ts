import { NextFunction, Request, type Response } from "express";
import { Webhook } from "svix";
import prisma from "../db.js";

export const webhook = async (req: any, res: Response, next: NextFunction) => {
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

    if (event.type == "user.created") {
        await signUp(event.data);
    }

    return res.status(200).json({
        success: true,
        message: 'Webhook recieved',
    })
}

const signUp = async (eventData: any) => {
    const { id, username, first_name, last_name } = eventData;
    const { email_address } = eventData.email_addresses[0];
    console.log(username);
    console.log(id);
    console.log(email_address);

    const user = await prisma.user.create({
        data: {
            clerkId: id,
            username,
            email: email_address ?? "",
        }
    })
}