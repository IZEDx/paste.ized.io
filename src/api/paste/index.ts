import { Request, Response } from "express";

export default {
    post(req: Request, res: Response)
    {
        res.send("ok");
    }
} 