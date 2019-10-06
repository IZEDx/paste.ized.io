
import { createServer }             from "http";
const express = require("express") as () => Express;
import { static as serveStatic, Express }    from "express";
import { join }                     from "path";
import { json, urlencoded, raw }         from "body-parser";
import { log }                      from "./libs/utils";

(<any>global).navigator = {
    userAgent: "Sapper"
};
const sapper = require('@sapper/server');

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';
const path = (...str: string[]) => join(__dirname, ...str);

export async function main()
{
    log.name = "codebin";
    log.main("Starting api server...");

    const app       = express();
    const server    = createServer(app);

    app.use(json({limit: "100mb"}));
    app.use(urlencoded({limit: "100mb", extended: true})); 

    app.use(serveStatic("static"));
    app.use(sapper.middleware());

    server.listen(PORT, () => {
        log.main(`Server started.`);
        log.main(`Listening on port ${PORT}.`);
    });

} 


main();