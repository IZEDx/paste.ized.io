

type _RecursiveRecord<T> = Record<string, T|RecursiveRecord<T>>;
declare interface RecursiveRecord<T> extends _RecursiveRecord<T>
{
}
