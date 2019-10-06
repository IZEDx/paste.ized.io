import { Request, Response } from "express";
import { db } from "../../libs/db";
import { ParamsDictionary } from "express-serve-static-core";
import { respond, respondError } from "../../libs/http";

export async function post(req: Request, res: Response)
{    
    const id = (<ParamsDictionary>req.params).id;

    await db.put(id, JSON.stringify(req.body));

    respond(res);
}

export async function get(req: Request, res: Response)
{    
    const id = (<ParamsDictionary>req.params).id;

    try {
        const data = await db.get(id);
    
        respond(res, JSON.parse(data.toString()));
    } catch(err)
    {
        console.error(err);
        respondError(res, 404, err);
    }
}