import { MaybePromise } from "./utils";

const events = new Map<string, Function[]>();

export interface Events
{
    paste(): MaybePromise<void>;
}


export function trigger<K extends keyof Events>(name: K, ...args: Parameters<Events[K]>): ReturnType<Events[K]>[]
{
    const listeners = events.get(name);
    if (listeners === undefined) return [];

    return listeners.map(listener => listener(...args));
}

export function listen<K extends keyof Events>(name: K, listener: (...args: Parameters<Events[K]>) => ReturnType<Events[K]>): Function
{
    events.set(name, [...(events.get(name) || []), listener]);

    return () => dispose(name, listener);
}

export function dispose<K extends keyof Events>(name: K, listener: (...args: Parameters<Events[K]>) => ReturnType<Events[K]>)
{
    events.set(name, events.get(name)!.filter(fn => fn !== listener));
}
