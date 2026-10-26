vue-router在单页面应用中,主要用于组件之间的切换.

**其本质就是:建立并管理url和对应组件之间的映射关系.**

在`HTML`中，有两个组件，分别是：

- **router-link**

  会被渲染成`a`标签用来导航，用户点击后切换到相关视图。

- **router-view**

  用来设置切换的视图在哪里渲染.(一个页面也可以有多个`router-view`分别展示特定的视图,并且支持嵌套)

我们有以下几种办法来切换：

- **HTML方式**

  ```html
  <div id="app">
    <h1>Hello App!</h1>
    <p>
      
      
      
      <router-link to="/foo">Go to Foo</router-link>
      <router-link to="/bar">Go to Bar</router-link>
    </p>
    
    
    <router-view></router-view>
  </div>
  ```

- **JavaScript方式**

  要想在JS中实现路由的跳转，需要以下准备：

  - 导入`vue-router`包
  - 引入需要跳转的组件
  - 通过`new VueRouter()`详细配置每个路由的路径
  - 将路由实例挂载到根实例上，`new Vue({router}).$mount('#app')`

  使用以下代码，来配置路由

  ```js
  // 1. 定义 (路由) 组件。
  // 可以从其他文件 import 进来
  const Foo = { template: '<div>foo</div>' }
  const Bar = { template: '<div>bar</div>' }
  
  // 2\. 定义路由
  // 每个路由应该映射一个组件。 其中"component" 可以是
  // 通过 Vue.extend() 创建的组件构造器，
  // 或者，只是一个组件配置对象。
  // 我们晚点再讨论嵌套路由。
  const routes = [
    { path: '/foo', component: Foo },
    { path: '/bar', component: Bar }
  ]
  
  // 3\. 创建 router 实例，然后传 `routes` 配置
  // 你还可以传别的配置参数, 不过先这么简单着吧。
  const router = new VueRouter({
    routes // (缩写) 相当于 routes: routes
  })
  
  // 4\. 创建和挂载根实例。
  // 记得要通过 router 配置参数注入路由，
  // 从而让整个应用都有路由功能
  const app = new Vue({
    router
  }).$mount('#app')
  ```

  通过注入路由器，我们可以在任何组件内通过 `this.$router` 访问路由器。

  ```js
  methods: {
      goBack () {
        this.$router.push('/')
        // 跳转到指定路由
        this.$router.go(-1)
        // 类似浏览器的前进与后退
     }
  }
  ```
