
import chalk from "chalk";
export {chalk};


/**
 * Does nothing.
 * @param args Anything.
 */
export function nop(...args: string[]) {}

/**
 * Time utilities
 */
export namespace time {
    export const local = () => new Date().toLocaleString();
}

export const sleep = (ms: number) => new Promise(res => setTimeout(res, ms));

/**
 * Logging utilities
 */
export namespace log {

    export let name = "svelte-template"
    /**
     * Logs stuff using a given prefix.
     * @param {string} prefix The prefix to prepend.
     * @param {string[]} msg The actual message.
     */
    function logPrefix(prefix: string, ...msg: any[]) {
        console.log(prefix + "\t" + chalk.gray(time.local()) + "\t", ...msg);
    }

    export const main           = (...msg: any[]) => logPrefix(chalk.red.bold("["+ name +"]"), ...msg);
    export const error           = (...msg: any[]) => logPrefix(chalk.red.bold("[ERROR]"), ...msg);
    export const server         = (...msg: any[]) => logPrefix(chalk.blue.bold("[Server]"), ...msg);
    export const interaction    = (...msg: any[]) => logPrefix(chalk.green.bold("[Interaction]"), ...msg);
    export const debug          = (...msg: any[]) => logPrefix(chalk.yellow.bold("[Debug]"), ...msg);
    export const test          = (...msg: any[]) => logPrefix(chalk.green.bold("[Test]"), ...msg);
}

export function randomSequence(length: number, digits = true, specialChars = true) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
                + (digits ? "0123456789" : "")
                + (specialChars ? "!§$%&/()=?{[]}-_.:,;<>|#+~" : "");
  
    for (var i = 0; i < length; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  
    return text;
}

export const isBrowser = () => typeof window !== "undefined";
export const isNode = () => !isBrowser();

export type MaybePromise<T> = T|Promise<T>;
