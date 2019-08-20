/// <reference path="../client.d.ts" />

import Route from "route-parser";
import { RecursiveRecord, indexModules } from "./libs/utils";
import pageModules, {PageModule} from "./pages/**/*.svelte";


function isPageModule(obj: any): obj is PageModule
{
    return !!obj && !!obj.default && obj.default.name === "Component";
} 



async function main()
{
    const pages = await indexModules(pageModules, isPageModule, (path, module) => [{
        path,
        route: new Route(path),
        create: (target: HTMLElement) => new module.default({target})
    } as Page]);

    const page = pages.find(page => page.route.match(location.pathname));

    if (page) {
        const match = page.route.match(location.pathname);
        page.create(document.body).$set(match);
    } else {
        pages.find(page => page.route.match("/404"))!.create(document.body);
    }

    console.log(pages);
}

main();
