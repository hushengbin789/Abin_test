/**
 * 类型工具 - 常用的 TypeScript 类型定义
 */

/** 可为空的类型 */
export type Nullable<T> = T | null;

/** 可选的类型 */
export type Optional<T> = T | undefined;

/** 可为空或未定义 */
export type Maybe<T> = T | null | undefined;

/** 提取 Promise 内部类型 */
export type Awaited<T> = T extends Promise<infer U> ? U : T;

/** 深度只读 */
export type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P];
};

/** 深度可选 */
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

/** 函数类型 */
export type AnyFunction = (...args: unknown[]) => unknown;

/** 记录类型 */
export type AnyRecord = Record<string, unknown>;

/** 提取数组元素类型 */
export type ArrayElement<T> = T extends readonly (infer E)[] ? E : never;
