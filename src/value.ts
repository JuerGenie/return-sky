import {
  SYMBOL_FIELD_REF_VERSION,
  SYMBOL_FIELD_SUBSCRIBER,
  SYMBOL_FIELD_SUBSCRIBERS,
  SYMBOL_IS_REFOBJ,
  SYMBOL_FIELD_UPDATED,
} from "./symbols";
import { clone } from "./utils/value";

type SubscribeCallback<T = unknown> = (newVal: T, oldVal: T) => void;
type ComputedCallback<T = unknown> = () => T;

export type Value<T = unknown> = T & {
  [SYMBOL_IS_REFOBJ]: true;
  [SYMBOL_FIELD_REF_VERSION]: number;
  [SYMBOL_FIELD_SUBSCRIBER]: WeakRef<SubscribeCallback<T>>[];
  [SYMBOL_FIELD_SUBSCRIBERS]: Map<keyof T, WeakRef<SubscribeCallback<T>>[]>;
  [SYMBOL_FIELD_UPDATED]: WeakMap<Value<any>, SubscribeCallback<any>>;
};
export type ComputedValue<T> = Value<{ readonly value: T }>;

export function isRef<T extends object = object>(value: T): value is Value<T> {
  return Reflect.get(value, SYMBOL_IS_REFOBJ);
}

export function toRef<T extends object>(target: T): Value<T> {
  let subscriberMap = [] as WeakRef<SubscribeCallback<T>>[];
  const subscriberCallbackMap = new Map<
    keyof T,
    WeakRef<SubscribeCallback<T>>[]
  >();
  // 初始化订阅回调列表。
  for (const key in target) {
    subscriberCallbackMap.set(key, []);
  }

  const result = new Proxy(target, {
    get(t, p, r) {
      switch (p) {
        case SYMBOL_IS_REFOBJ:
          return true;
        case SYMBOL_FIELD_SUBSCRIBER:
          return subscriberMap;
        case SYMBOL_FIELD_SUBSCRIBERS:
          return subscriberCallbackMap;
        default:
          return Reflect.get(t, p, r);
      }
    },
    set(t, p, newVal, r) {
      const oldThis = clone(t);
      const oldVal = clone(Reflect.get(t, p, r));
      const setterResult = Reflect.set(t, p, newVal, r);

      let subscribers: WeakRef<SubscribeCallback<T>>[];
      // 通知字段订阅回调。
      subscribers = subscriberCallbackMap.get(p as keyof T)!;
      subscriberCallbackMap.set(
        p as keyof T,
        subscribers
          ?.filter((subscriber) => !!subscriber.deref())
          .map((subscriber) => {
            subscriber.deref()?.(newVal, oldVal);
            return subscriber;
          }) || []
      );
      // 通知对象订阅者。
      subscriberMap = subscriberMap
        .filter((subscriber) => !!subscriber.deref())
        .map((subscriber) => {
          subscriber.deref()?.(t, oldThis);
          return subscriber;
        });

      return setterResult;
    },
  });

  return result as Value<T>;
}

type CancelWatch = () => void;
type WatchSource<T> = Value<T>;
export function watchRef<T>(
  target: WatchSource<T>,
  callback: SubscribeCallback<T>
): CancelWatch {
  if (!isRef(target)) {
    throw new Error("watch error, target is not ref object!");
  }

  const callbackRef = new WeakRef(callback);
  target[SYMBOL_FIELD_SUBSCRIBER].push(callbackRef);

  let tag = false;
  return () => {
    if (tag) {
      console.warn(
        "watch cancel callback already call! watch callback -> ",
        callback
      );
      return;
    }
    const index = target[SYMBOL_FIELD_SUBSCRIBER].indexOf(callbackRef);
    if (index !== -1) {
      target[SYMBOL_FIELD_SUBSCRIBER].splice(index, 1);
    }
    tag = true;
  };
}

// export function calcRef<T>(factory: ComputedCallback<T>): ComputedValue<T> {

// }
