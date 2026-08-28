# /dsh-zh/api 路由契约

## 概述
`/dsh-zh/api` 是 deepseek-harness-zh_pro 和 dsh-client-ui-custom 共享的会话管理路由前缀。

## 端点列表
- POST /dsh-zh/api/session.delete - 删除会话
- POST /dsh-zh/api/session.unarchive - 取消归档
- GET /dsh-zh/api/trash.list - 回收站列表
- POST /dsh-zh/api/trash.restore - 恢复会话

## 同时安装行为
两插件同时安装时，防重机制：deepseek-harness-zh_pro 使用引用计数，dsh-client-ui-custom 使用安装守卫。路由最终只注册一次。

## 信任围栏
- 仅接受 localhost/127.0.0.1/[::1] 的请求
- 需要 sec-fetch-site: same-site 或无 origin
- host 头必须与 origin 匹配
