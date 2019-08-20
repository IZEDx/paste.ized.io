
/// <reference types="express" />



declare type APIHandler = (req: Express.Request, res: Express.Response) => any;

declare interface APIRoute
{
    get?: APIHandler;
    post?: APIHandler;
    put?: APIHandler;
    delete?: APIHandler;
}

type APIModule = {
    default: APIRoute
};

declare module "*.route.ts" 
{
    const a: RecursiveRecord<APIModule>;
    export default a;
}
