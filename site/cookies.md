---
title: Cookie 与广告
description: 说明本站当前的 Cookie 与本地存储用途、Google 广告接入准备状态，以及管理 Cookie 和个性化广告的方法。
---

# Cookie 与广告

说明本站当前的 Cookie 与本地存储用途、Google 广告接入准备状态，以及管理 Cookie 和个性化广告的方法。

生效与更新日期：<time datetime="2026-11-07">2026 年 11 月 7 日</time>

## 当前使用情况 {#current}

本站没有账号或个人学习数据，仅使用浏览器本地存储保存主题和搜索界面偏好。本站使用 Google Analytics 统计页面访问情况，Google Analytics 会设置 `_ga` 等 Cookie。当前未接入 AdSense、再营销或转化追踪脚本，广告功能尚未启用。

Cookie 是浏览器保存、并可能随请求发送给对应网站的小段数据；localStorage 保存在当前浏览器中，不会像 Cookie 一样自动附在每次请求里。两者都属于设备存储技术，但用途和管理方式不同。

## 本地存储清单 {#storage}

| 存储项目 | 内容与用途 | 保存时间 |
| --- | --- | --- |
| `vitepress-theme-appearance`（localStorage） | 浅色、深色或跟随系统的主题偏好 | 直到用户或浏览器清除 |
| `vitepress:local-search-detailed-list`（localStorage） | 搜索结果是否显示详细列表 | 直到用户或浏览器清除 |
| `vitepress:local-search-filter`（sessionStorage） | 搜索框中最近一次输入的关键词 | 关闭标签页后清除 |
| `_ga`、`_ga_*`（Cookie） | Google Analytics 区分访问者与会话，用于统计访问量 | 最长约 2 年 |

本地存储只用于界面偏好，不用于跨站广告追踪；清除后主题会恢复为默认设置。你可以在浏览器中阻止或清除 Cookie，也可以安装 [Google Analytics 停用浏览器插件](https://tools.google.com/dlpage/gaoptout)。

::: info 有问题，随时联系
内容纠错、隐私请求与合作咨询

[xiangzi777777@gmail.com](mailto:xiangzi777777@gmail.com)
:::
