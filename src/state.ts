/**
 * 回天模块全局状态。
 */

import { Value } from "./value";

// 当前正在执行计算的引用值
export let currentValue: Value<unknown> = null as unknown as Value<unknown>;

// 当前已经执行过更新的函数，避免重复执行
export const updatedFunction: unknown[] = [];
