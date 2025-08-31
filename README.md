# cursor-auto-account-web 前端部署指南

本项目为 cursor-auto-account 的前端部分，基于 React 构建。后端服务请前往 [cursor-auto-account](https://github.com/Viper373/cursor-auto-account) 仓库部署。

---

## 目录结构
- `src/`：前端源代码
- `public/`：静态资源
- `build/`：生产构建输出目录

---

## 部署方式

## 后端部署（需要先部署后端服务！！！）

后端服务请参考 [cursor-auto-account](https://github.com/Viper373/cursor-auto-account) 仓库的部署文档。

### 1. 私有部署

#### 环境要求
- Node.js >= 14.x
- npm >= 6.x

#### 步骤
1. 克隆本仓库：
   ```bash
   git clone https://github.com/Viper373/cursor-auto-account-web.git
   cd cursor-auto-account-web
   ```
2. 安装依赖：
   ```bash
   npm install
   ```
   ```bash
   yarn install
   ```
   ```bash
   pnpm install
   ```
3. 构建项目：
   ```bash
   npm run build
   ```
   ```bash
   yarn build
   ```
   ```bash
   pnpm build
   ```
4. 将 `build/` 目录下内容部署到任意静态 Web 服务器。
5. 配置前端环境变量

复制 `.env.example` 为 `.env` 并设置：
```
API_URL=https://your-api-domain-or-ip:port
REACT_URL=https://your-frontend-domain
```

说明：
- 前端通过 `API_URL` 访问后端接口（axios 基址与 SSE 均基于该变量）。
- 后端 CORS 放行读取 `REACT_URL`（或多个来源用逗号分隔），请与实际前端部署域名保持一致。

---

### 2. 云部署

#### 2.1 fork 本仓库

建议先 fork 本仓库到自己的 GitHub 账号，方便后续自定义和管理。

#### 2.2 Vercel 部署

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/import/project?template=https://github.com/Viper373/cursor-auto-account-web)

点击上方按钮可一键部署到 Vercel。

1. 登录 [Vercel](https://vercel.com/) 并新建项目，选择本仓库。
2. 保持默认构建命令，无需其他配置。
3. 部署完成后即可访问。

#### 2.3 Netlify 部署

[![Deploy with Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/Viper373/cursor-auto-account-web)

点击上方按钮可一键部署到 Netlify。

1. 登录 [Netlify](https://www.netlify.com/) 并新建站点，连接本仓库。
2. 保持默认构建命令，无需其他配置。
3. 部署完成后即可访问。

---

## 常见问题
- 前端无法访问接口：请检查 API 地址配置，确保后端已正确部署并允许跨域。
- 构建失败：请确认 Node.js 和 npm 版本，或删除 `node_modules` 重新安装依赖。

---

## 联系与支持
如有问题请提交 Issue 或联系维护者。
