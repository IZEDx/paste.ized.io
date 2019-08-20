import AES from "crypto-js/aes";
import {genSalt as _genSalt, getSalt as _getSalt, hash} from "bcryptjs";
import { randomSequence } from "./utils";


export function decrypt(cipher: string, key: string)
{
    return AES.decrypt(cipher, key).toString();
}

