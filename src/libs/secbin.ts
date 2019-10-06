import { genSalt, hash } from "bcryptjs";
import AES from "crypto-js/aes";
import {enc} from "crypto-js";
import axios from "axios";

export const getId = async () => (await axios.get("./paste.json")).data.id;

export async function paste(msg: string, language: string): Promise<string>
{
    const id = await getId();
    const salt = await genSalt(10);
    const key = await hash(id, salt);

    const cipher = AES.encrypt(msg, key).toString();

    await axios.post(`./paste/${id}.json`, {cipher, language});

    const url = location.origin + "/" + id + "#" + salt.slice(7);

    return url;
}

export async function read(id: string, salt: string): Promise<{content: string, language: string}>
{
    salt = "$2a$10$" + salt;
    
    const {cipher, language} = (await axios.get(`./paste/${id}.json`)).data;
    const key = await hash(id, salt);

    const content = AES.decrypt(cipher, key).toString(enc.Utf8);

    return {content, language};
}