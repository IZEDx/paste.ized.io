import { Request, Response } from "express";
import { randomSequence, log } from "../libs/utils";

export default {
    get(req: Request, res: Response)
    {
        const id = randomSequence(10, false, false);
        log.debug(id);
        res.send(id);
    }
} 