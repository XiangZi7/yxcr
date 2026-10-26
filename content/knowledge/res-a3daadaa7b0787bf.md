1. 初始化参数、实例化 compiler。
2. 从入口开始**解析依赖**，递归构建模块图。
3. 通过 loader 转换模块。
4. 打包输出 chunk / bundle。
5. 优化（压缩、Tree shaking、代码分割）。
