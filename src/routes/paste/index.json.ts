import { Request, Response } from "express";
import { randomSequence, log } from "../../libs/utils";
import { db } from "../../libs/db";

export async function get(req: Request, res: Response)
{
    let id = "";
    do 
    {
        id = randomSequence(10, false, false);
    } while(await checkId(id));

    res.end(JSON.stringify({id}));
}

async function checkId(id: string)
{
    try {
        await db.get(id);
        return true;
    }
    catch(e) {
        return false;
    }
}