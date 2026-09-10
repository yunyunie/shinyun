# Teh Shin Yun — 个人网站

纯 HTML / CSS / JS，没有框架，不需要安装任何东西。

## 文件结构

```
├── index.html              首页（Hero + Work + Journey + Lab + Notes 一整页）
├── work-tiktok.html        案例一：TikTok
├── work-tencent.html       案例二：腾讯 PUBG MOBILE Esports
├── work-innon.html         案例三：HK inno.N / BEWANTS
├── journey.html            足迹（路线 + 四个章节）
├── lab.html                实验室
├── notes.html              观察
└── assets/
    ├── styles.css          全站样式（颜色和字体在最上面的 :root）
    ├── i18n.js             全部文案（中英韩）+ 地图和项目数据
    ├── site.js             交互逻辑（语言、导航高亮、工牌、地图）
    ├── avatar-badge.png    工牌头像
    ├── intro.webm          ← 入场动画放这里（还没有）
    ├── journey/            足迹照片（每座城市一张 01.jpg）
    │   ├── malaysia/  beijing/  shenzhen/  seoul/
    ├── work/               案例配图
    │   ├── tiktok/  tencent/  innon/
    └── lab/
        └── ai-visual/pubg-mobile/
```

## 怎么改文字

**所有文字都在 `assets/i18n.js` 里**，不在 HTML 里。

文件分成三段：`en:` `zh:` `ko:`。每一行长这样：

```js
"hero.lede":"I work where markets, products and people overlap.",
```

冒号左边是编号（不要动），右边引号里的就是网页上显示的文字。三种语言各改一次。

⚠️ 中文内容里如果要用引号，请用「」，**不要用英文的 `"`**，否则会破坏文件，页面会变空白。

## 怎么放图片

每个占位框上都写着它对应的文件路径，比如：

```
assets/journey/beijing/01.jpg
```

把图片按这个路径和名字放进对应文件夹就行。放好之后需要把 HTML 里对应的
`<div class="ph">…</div>` 换成 `<img src="路径" alt="说明" loading="lazy">`。
图片整理好之后可以直接发给我，我帮你换。

## 换入场动画

首屏的人物是**去背之后的透明视频**，直接落在页面奶黄底上，没有任何边框或容器。

需要三个文件：

- `assets/intro.webm` — VP9 + alpha 透明版本（Chrome / Firefox / Edge 用这个）
- `assets/intro.mp4` — 不透明回落版，背景必须是 `#F5EFE1`（Safari 用这个）
- `assets/intro-poster.jpg` — 首帧，加载前显示

规格：竖版 4:5、静音、3–5 秒、单个文件 500KB 以内。
如果你之后重新出片，把原始 mp4 发我，我来做去背和两种格式的转码。

## 怎么改颜色

`assets/styles.css` 最上面：

```css
--paper:#F5EFE1;   /* 页面底色 */
--ink:#211D19;     /* 正文 */
--blue:#1B4FA0;    /* 强调色：Contact、CTA、挂绳、首尔 */
--coral:#A4463A;   /* 足迹路线和城市标记 */
```

## 图片现在的状态

**所有占位框都已经换成真实图片，网站上没有任何虚线框了。**

| 位置 | 文件 |
|---|---|
| 首屏人物动画 | `assets/intro.webm`（透明）+ `assets/intro.mp4`（回落）+ `assets/intro-poster.jpg` |
| PUBG AI 视觉 | `assets/lab/ai-visual/pubg-mobile/01–04.jpg` |
| TikTok 案例 | `assets/work/tiktok/v1–v2.jpg` |
| 腾讯案例 | `assets/work/tencent/v1、v3.jpg` |
| Journey 四座城市 | `assets/journey/{malaysia,beijing,shenzhen,seoul}/01.jpg` |

## 换图片时

所有图片都用 `loading="lazy"`，点击会打开灯箱放大。
替换时保持同名同路径即可，不用改代码。

## 本地预览

双击 `index.html` 即可。语言弹窗只在第一次出现；想再看一次，用无痕窗口打开。

## 部署到 Vercel

1. github.com 建一个新仓库（Private 也可以）
2. 仓库页面点 `uploading an existing file`，把这个文件夹里所有东西拖上去
3. vercel.com 用 GitHub 登录 → `Add New` → `Project` → 选中仓库 → `Import`
4. 什么都不改，直接 `Deploy`

30 秒后拿到链接。之后每次在 GitHub 上改文件，网站会自动更新。

## 上线前要确认

- [ ] TikTok 的年份（现在写 2021–2024）
- [ ] 韩文找母语者过一遍
- [ ] 图片全部补上，占位框换成真图
- [ ] 入场动画替换
