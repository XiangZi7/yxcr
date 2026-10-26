## 一、核心概念

动态组件是 Vue 提供的一种特殊组件渲染方式，通过 `:is` 属性可以动态切换不同的组件。这是构建灵活可配置界面系统的关键技术。

### 基本语法

```vue
<component :is="currentComponent"></component>
```

## 二、基本用法

### 1. 组件名切换

```vue


<template>
  <button @click="current = current === 'Home' ? 'About' : 'Home'">切换组件</button>
  <component :is="current"></component>
</template>
```

### 2. 组件对象切换

```vue


<template>
  <component :is="components[currentIndex]"></component>
</template>
```

## 三、高级用法

### 1. 配合 keep-alive 缓存状态

```vue
<keep-alive>
  <component :is="currentComponent"></component>
</keep-alive>
```

### 2. 动态导入异步组件

```vue

```

### 3. 传递 props 和事件

```vue
<component :is="currentComponent" :title="pageTitle" @submit="handleSubmit"></component>
```
