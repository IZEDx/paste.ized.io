import { genSalt, hash } from "bcryptjs";
import AES from "crypto-js/aes";
import {enc} from "crypto-js";
import axios from "axios";

export async function paste(msg: string): Promise<string>
{
    const id = (await axios.get("./api/paste/id")).data;
    const salt = await genSalt(10);
    const key = await hash(id, salt);
    const cipher = AES.encrypt(msg, key).toString();

    await axios.post("./api/paste/"+id, {cipher});

    const url = location.href.split("#")[0] + "#" + salt.slice(7)+id;

    return url;
}

export async function read(req: string): Promise<string>
{
    req = "$2a$10$" + req;
    const id = req.slice(29);
    const salt = req.slice(0, 29);
    
    const cipher = (await axios.get("./api/paste/"+id)).data;
    const key = await hash(id, salt);

    const plain = AES.decrypt(cipher, key).toString(enc.Utf8);

    return plain;
}