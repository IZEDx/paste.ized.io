export * from "./client";
import {SvelteComponent, SvelteComponentOptions} from "./client";

declare module "*.svelte" 
{  
    const component: SvelteComponent<{}>;
  
    export default component;
    export {SvelteComponent, SvelteComponentOptions}
}

declare module "*.ts"
{
    
}