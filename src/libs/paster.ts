import { genSalt, hash } from "bcryptjs";
import AES from "crypto-js/aes";

export async function paste(msg: string): Promise<string>
{
    const id = await (await fetch("./api/request-id")).text();
    const salt = await genSalt(10);
    console.log(salt.length);
    const key = await hash(id, salt);
    const cipher = AES.encrypt(msg, key).toString();

    console.log(cipher);

    return location.href.split("#")[0] + "#" + salt.slice(7)+id;
}

export async function read(req: string): Promise<string>
{
    req = "$2a$10$" + req;
    const id = req.slice(29);
    const salt = req.slice(0, 29);
    
    return id;
}