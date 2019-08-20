
import Route from "route-parser";
import {RecursiveRecord} from "./src/libs/utils";

interface SvelteComponentOptions<Props> {
    target: HTMLElement;
    anchor?: HTMLElement | null;
    props?: Props;
    hydrate?: boolean;
    intro?: boolean;
    }

interface SvelteComponent<Props> {
    new (options: SvelteComponentOptions<Props>): any;
    $set(props: {}): void;
    $on(event: string, callback: (event: CustomEvent) => void): void;
    $destroy(): void;
    render(props?: {}): {
        html: string;
        css: { code: string; map: string | null };
        head?: string;
    };
}

declare module "*.svelte" 
{  
    const component: SvelteComponent<{}>;
  
    export default component;
    export {SvelteComponent, SvelteComponentOptions}
}

interface Page 
{
    path: string;
    route: Route;
    create: (target: HTMLElement) => SvelteComponent<{}>;
}

interface PageProps
{

}

type PageModule = {
    default: SvelteComponent<PageProps>
};

declare module "*.page.svelte" 
{
    export const d: RecursiveRecord<PageModule>;
    export default d;

    export {Page, PageProps, PageModule, SvelteComponent, SvelteComponentOptions}
}
