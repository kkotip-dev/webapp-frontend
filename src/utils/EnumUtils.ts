export type EnumValues<T> = keyof T;
// export type EnumMap<T, V> = { [key in EnumValues<T>]: V };
// export type EnumMap<T, V> = { [key in T extends number]: V };
export type EnumMap<T extends number, V> = Record<T, V>;