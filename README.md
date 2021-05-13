# RETURN-SKY 回天

一个简单的响应式数据构建库。

---
### HOW 如何使用

1. 创建一个 `ref` 对象：
   ```typescript
   import { toRef } from "return-sky";

   const obj = toRef({
     id: 1000,
     name: "return-sky",
   });
   ```
2. 监听这个 `ref` 对象的更新：
   ```typescript
   import { watchRef } from "return-sky";

   const cancelWatch = watchRef(obj, (nv) => {
     console.log("new value -> ", nv);
     console.log("new name -> ", nv.name);
   });

   obj.name = "JuerGenie"; // 触发监听回调

   cancelWatch(); // 👈取消监听
   ```
