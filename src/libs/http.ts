import { Response } from "express";

export type Primitives = string | number | boolean;

interface _JSONArray {
    [index: number]: Primitives | _JSONArray | JSONObject;
}

interface JSONObject {
    [key: string]: Primitives | _JSONArray | JSONObject;
}


export function respond(res: Response, data: JSONObject = {})
{
    res.end(JSON.stringify({
        status: "ok",
        ...data
    }));
}

export function respondError(res: Response, status: number = 500, data: Primitives | JSONObject = {})
{
    res.statusCode = status;
    res.end(JSON.stringify(data));
}
