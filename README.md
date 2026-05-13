# 人工智能训练师三级刷题系统

一个用于备考「人工智能训练师三级」职业资格认证的在线刷题系统，支持顺序练习、随机刷题、错题本等功能，并可通过 Firebase 实现多设备数据同步。
官方题库来源：[上海交通大学资源下载页](https://gjzs.sjtu.edu.cn/skill)

> 实操题请参考: [Morriaty-The-Murderer/2025-AI-Trainer-practices](https://github.com/Morriaty-The-Murderer/2025-AI-Trainer-practices)

## 功能特性

### 刷题模式
- **顺序刷题** - 按题库顺序逐题练习
- **随机刷题** - 随机抽取题目练习
- **错题本** - 自动记录答错的题目，支持错题重练

### 答题功能
- 即时反馈（答对/答错）
- 显示答案解析
- 进度条跟踪
- 答题统计（正确率、已完成数）

### 数据同步
- 基于 Firebase Realtime Database
- 6 位数房间码配对同步
- 支持多设备进度同步
- 离线模式可用

### 题库内容
- **单选题** - 涵盖人工智能基础知识、职业道德等
- **多选题** - 综合性题目
- **判断题** - 概念判断题
- 每题均附带详细答案解析

## 技术栈

- **前端**: 纯 HTML + CSS + JavaScript（单文件应用）
- **数据库**: Firebase Realtime Database
- **部署**: Netlify（静态托管）

## 项目结构

```
ai-trainer-quiz/
├── README.md                              # 项目说明文档
├── .gitignore                             # Git 忽略配置
├── 人工智能训练师三级刷题.html              # 主应用文件（可直接打开使用）
├── deploy/
│   └── index.html                         # 部署版本（与主文件相同）
├── 人工智能训练师三级题库-70分.pdf          # 题库 PDF 源文件
└── 题库md转换/
    ├── 人工智能训练师三级题库_完整.md       # 完整题库
    ├── 单选题.md                           # 单选题题库
    ├── 多选题.md                           # 多选题题库
    └── 判断题.md                           # 判断题题库
```

## 使用方式

### 方式一：直接打开
1. 双击 `人工智能训练师三级刷题.html` 文件
2. 在浏览器中打开即可使用

### 方式二：在线访问
本项目已部署到 Netlify，可直接访问使用。
访问链接：[https://ai-trainer-quiz.netlify.app/](https://ai-trainer-quiz.netlify.app/)

#### 自行部署
如需自行部署，将 `deploy/index.html` 上传到 Netlify：
1. 登录 [Netlify](https://app.netlify.com/)
2. 拖拽 `deploy` 文件夹到部署区域
3. 或连接 Git 仓库自动部署

## 跨设备同步

支持在不同设备间同步刷题进度，操作步骤如下：

1. 在页面右上角点击切换按钮，弹出同步码窗口

   ![切换按钮](assets/img1.png)

2. 窗口中会显示一个 6 位数同步码（如 `725664`）

   ![同步码](assets/img2.png)

3. 在另一台设备上打开同一页面，输入该同步码即可同步刷题进度

> 提示：在 PC 上刷完题后记下同步码，在手机浏览器打开页面输入同步码，即可继续刷题。

## 数据同步配置

如需启用多设备同步功能，需要配置 Firebase：

1. 访问 [Firebase Console](https://console.firebase.google.com/) 创建项目
2. 启用 Realtime Database
3. 获取 Firebase 配置信息
4. 在应用中点击「同步」按钮，输入房间码进行配对

## 题库转换

题库源文件为 PDF 格式，使用 [pdf-converter-mineru](https://github.com/tanis90/pdf-converter-mineru) skill 转换为 Markdown 格式：

```bash
# 安装 pdf-converter-mineru skill
npx skills add https://github.com/tanis90/pdf-converter-mineru --skill pdf-converter
```

对你的 Agent 发出转换 pdf 的指令，后即可自动转换。

## 许可证

本项目仅供个人学习使用。

## ☕ Buy Me a Coffee

如果这个项目对你有帮助，欢迎请我喝杯咖啡 ☕

<div align="center">

<img src="assets/zhifubao.jpeg" alt="支付宝收款码" width="200" />

**支付宝扫码赞赏**

你的支持是我继续开发和维护这个项目的动力！❤️

</div>
