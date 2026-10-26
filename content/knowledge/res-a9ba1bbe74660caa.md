Webpack 是一个**模块打包器**：从入口出发，分析模块依赖，通过 **Loader** 处理非 JS 资源、通过 **Plugin** 扩展功能，最终产出优化后的 bundle。

**核心概念：** `entry`（入口）、`output`（出口）、`module.rules`（loader）、`plugins`、`resolve`（解析）、`optimization`（代码分割/压缩）、`devServer`。

**Loader 与 Plugin 的区别：**

- **Loader**：让 webpack 能加载并转换**非 JS 文件**（`babel-loader`、`ts-loader`、`style-loader`、`css-loader`、`file-loader`、`sass-loader`）。作用于单个文件。
- **Plugin**：扩展 webpack **整体功能**（压缩、代码分割、html 生成、环境注入）。作用范围更广，可影响整个构建流程。
