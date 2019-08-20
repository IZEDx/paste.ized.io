import { Request, Response } from "express";
import { db } from "../../libs/db";
import { ParamsDictionary } from "express-serve-static-core";

export default {
    async post(req: Request, res: Response)
    {
        const id = (<ParamsDictionary>req.params).id;
        const cipher = req.body.cipher;

        await db.put(id, cipher);

        res.send("ok");
    }, 

    async get(req: Request, res: Response)
    {
        const id = (<ParamsDictionary>req.params).id;
        const cipher = await db.get(id);

        res.send(cipher.toString());
    }
} 