// 响应式对象标识
export const SYMBOL_IS_REFOBJ = Symbol("ref-object");

// 响应式对象更新版本，防止多次更新
export const SYMBOL_FIELD_REF_VERSION = Symbol("ref-version");

// 订阅者列表
export const SYMBOL_FIELD_SUBSCRIBER = Symbol("subscriber");
// 订阅回调列表
export const SYMBOL_FIELD_SUBSCRIBERS = Symbol("subscribers");
// 通知者列表
export const SYMBOL_FIELD_UPDATED = Symbol("updated");
// 值的父对象
export const SYMBOL_FIELD_PARENT = Symbol("parent");
// 通知函数
export const SYMBOL_FUNCTION_UPDATED = Symbol("updated");
// 订阅函数
export const SYMBOL_FUNCTION_SUBSCRIB = Symbol("subscrib");
