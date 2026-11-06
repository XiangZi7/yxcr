## 一、核心概念

interface 主要描述对象的结构，支持声明合并和 extends。type 可以描述对象、联合类型、交叉类型与基础类型别名。两者都支持泛型，并在编译时提供类型检查。

## 二、实现原理

### 1. 理解核心机制

interface 主要描述对象的结构，支持声明合并和 extends。type 可以描述对象、联合类型、交叉类型与基础类型别名。两者都支持泛型，并在编译时提供类型检查。

```typescript
interface User {
  id: number
  name: string
}

type Status = 'loading' | 'success' | 'error'
type Admin = User & { role: 'admin' }
```

### 2. 根据表达能力选择类型

从实际执行过程出发，关注输入、输出与边界条件，并用一个简洁的例子解释关键概念。

```typescript
function greet(user: User): string {
  return `Hello, ${user.name}`
}

const status: Status = 'success'
```

### 3. 作用域与副作用

明确事件监听、异步请求和资源的生命周期，及时清理不再需要的副作用。

## 三、实践与方案对比

选择方案时，需要结合项目规模、维护成本、性能需求和团队经验，解释方案的适用边界，并通过实际场景说明取舍。

## 四、总结

interface 主要描述对象的结构，支持声明合并和 extends。type 可以描述对象、联合类型、交叉类型与基础类型别名。两者都支持泛型，并在编译时提供类型检查。学习时，先理解核心概念，再梳理执行流程，最后结合实际案例与边界条件验证。
