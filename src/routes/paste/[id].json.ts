import { Request, Response } from "express";
import { db } from "../../libs/db";
import { ParamsDictionary } from "express-serve-static-core";

export async function post(req: Request, res: Response)
{    
    const id = (<ParamsDictionary>req.params).id;

    await db.put(id, JSON.stringify(req.body));

    res.end(JSON.stringify({
        status: "ok"
    }));
}

export async function get(req: Request, res: Response)
{    
    const id = (<ParamsDictionary>req.params).id;

    const data = await db.get(id);

    res.end(JSON.stringify({
        status: "ok",
        ...JSON.parse(data.toString())
    }));
}