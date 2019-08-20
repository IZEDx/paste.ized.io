
declare interface SvelteComponentOptions<Props> {
    target: HTMLElement;
    anchor?: HTMLElement | null;
    props?: Props;
    hydrate?: boolean;
    intro?: boolean;
}

declare interface SvelteComponent<Props> {
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


declare interface PageProps
{

}

declare type PageModule = {
    default: SvelteComponent<PageProps>
};


declare module "*.page.svelte" 
{
    const a: RecursiveRecord<PageModule>;
    export default a;
}


declare module "*.svelte" 
{  
    const component: SvelteComponent<{}>;
  
    export default component;
}
