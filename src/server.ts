import { createServer }             from "http";
const express = require("express") as () => Express;
import { static as serveStatic, Express, Request, Response, NextFunction, Router, RequestHandler }    from "express";
import { join }                     from "path";
import { json, urlencoded }         from "body-parser";
import { log }                      from "./libs/utils";
import Route from "route-parser";
import { indexModules } from "./libs/utils";
import apiModules from "./api/**/*.route.ts";

const path = (...str: string[]) => join(__dirname, ...str);

function isAPIModule(obj: any): obj is APIModule
{
    return !!obj && !!obj.default && (!!obj.default.get || !!obj.default.post || !!obj.default.put || !!obj.default.delete);
} 

export async function main()
{
    log.main("Starting api server...");

    const app       = express();
    const server    = createServer(app);
    const statics   = serveStatic(path("client"), {index: ["index.html"]});
    const apiRouter = Router();

    const apiRoutes = await indexModules(apiModules, isAPIModule, (path, module) => [{
        path,
        route: new Route(path),
        ...module.default
    } as const]);

    for (const route of apiRoutes)
    {
        if (route.get) apiRouter.get(route.path, route.get);
        if (route.post) apiRouter.post(route.path, route.post);
        if (route.put) apiRouter.put(route.path, route.put);
        if (route.delete) apiRouter.delete(route.path, route.delete);
    }

    app.use(urlencoded({ extended: true })); 
    app.use(json());

    app.use("/api", apiRouter);
    app.use(flattenStatics);
    app.use(statics);
    app.use((req, res) => {
        res.sendFile(path("client", "index.html"));
    });

    server.listen(8080, () => {
        log.main(`Server started.`);
        log.main(`Listening on port 8080.`);
    });
} 

const staticFileEndings = [".css", ".js", ".html", ".map"];
function flattenStatics(req: Request, res: Response, next: NextFunction)
{
    const url = req.url;
    const assetsIdx = req.url.indexOf("/assets/");
    if (assetsIdx >= 0)
    {
        req.url = req.url.substring(assetsIdx);
    }
    if (staticFileEndings.find(e => req.url.endsWith(e)))
    {
        req.url = req.url.substring(req.url.lastIndexOf("/"));
    }

    next();
}

main();