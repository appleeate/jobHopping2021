> Mom, I Can't Learn Anymore(《妈妈，我学不动了！》) 是一系列关于计算机领域程序最新时事的文章(偏向于前端领域)，在该系列会从不同的角度讨论领域内的实践和进展。

`源网站 https://1linelayouts.glitch.me`

## 前言

周日在家看 web.dev 的 2020 三天 live，发现不少有意思的东西，其中有一项是关于 CSS 的，主播是 Una Kravets（chrome team 成员）。虽然我已经好几个月没有深入研究 CSS 的东西了，不过以前的底子还在（有兴趣的可以看我一年前发布的关于 CSS 的东西，虽然由于太过底层没啥人愿意看, sad）。

> **注意：下面大部分代码已经由各大主流最新浏览器实现，切记不要使用在 production 当中**

> **注意：如果是公众号的读者，由于外链原因，可以点击阅读原文，github page 里面有更加详细的 demo, 本文所有代码和演示属于 Una**

## 正文

### 01. 超级居中

在没有 flex 和 grid 之前，垂直居中一直不能很优雅的实现。而现在，我们可以结合 `grid` 和 `place-items` 优雅的同时实现**水平居中**和**垂直居中**。

```html
<div class="parent blue" >
  <div class="box coral" contenteditable>
    :)
  </div>
  <style>
    .blue {
      background-color: aqua;
      height: 500px;
    }
    .parent {
      display: grid;
      place-items: center;
    }
    .box {
      width: 100px;
    }
  </style>
```

MDN, place-items 属性详解

codepen 地址

### 02. 可解构的自适应布局(The Deconstructed Pancake)

```css
flex: 0 1 <baseWidth>
```

这种布局经常出现在电商网站：

1. 在 viewport 足够的时候，三个 box 固定宽度横放
2. 在 viewport 不够的时候（比如在 mobile 上面），宽度仍然固定，但是自动解构（原谅我的中文水平），不在同一水平面上

```html
  <div class="parent white">
    <div class="box green">1</div>
    <div class="box green">2</div>
    <div class="box green">3</div>
  </div>
  .ex2 .parent {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }

  .ex2 .box {
    flex: 1 1 150px; /*  flex-grow: 1 ，表示自动延展到最大宽度 */
    flex: 0 1 150px; /*  No stretching: */
    margin: 5px;
  }
```

![图片](https://mmbiz.qpic.cn/mmbiz_gif/2icbwiaINBibTkGagJxJFQAIRFyshrTKydDjNzWBRKmn0ibEXpJH1DmGG6p1N8KLLAQsDFmCJauMmEXJUxupGiaYibicw/640?wx_fmt=gif&tp=webp&wxfrom=5&wx_lazy=1)

当我们设置 `flex: 1 1 150px;` 时候：![图片](https://mmbiz.qpic.cn/mmbiz_gif/2icbwiaINBibTkGagJxJFQAIRFyshrTKydDRHFS2VYeibNPY0uLuOq8PbXx22qbh4WCc6fJvwf5mdxcKSCT158Z9ZA/640?wx_fmt=gif&tp=webp&wxfrom=5&wx_lazy=1)

codepen 地址

### 03. 经典的 sidebar

```
grid-template-columns: minmax(<min>, <max>) ...
```

同样使用 `grid` layout，可以结合 `minmax()` 实现弹性的 sidebar（这在你要适应大屏幕的时候很有用）。`minmax(<min>, <max>)` 就是字面意思。结合 `<flex>` 单位，非常优雅，避免了数学计算宽度等不灵活的手段（比如我们设置 gap 的时候）。

```
  <div class="parent">
    <div class="section yellow" contenteditable>
    Min: 150px / Max: 25%
    </div>
    <div class="section purple" contenteditable>
      This element takes the second grid position (1fr), meaning
      it takes up the rest of the remaining space.
    </div>
  </div>
  .ex3 .parent {
    display: grid;
    grid-template-columns: minmax(150px, 25%) 1fr;
  }
```

![图片](https://mmbiz.qpic.cn/mmbiz_gif/2icbwiaINBibTkGagJxJFQAIRFyshrTKydDc9ibzdFlntsgrtyPjPqz9GaRiaiaj3y9XVNxt3UuLMbwtENNyYvg6H3jQ/640?wx_fmt=gif&tp=webp&wxfrom=5&wx_lazy=1)

codepen 地址

### 04. 固定的 header 和 footer

```
grid-template-rows: auto 1fr auto
```

固定高度的 header 和 footer，占据剩余空间的 body 是经常使用的布局，我们可以利用 `grid` 和 `fr` 单位完美实现。

```html
  <div class="parent">
    <header class="blue section" contenteditable>Header</header>
    <main class="coral section" contenteditable>Main</main>
    <footer class="purple section" contenteditable>Footer Content</footer>
  </div>
  .ex4 .parent {
    display: grid;
    grid-template-rows: auto 1fr auto;
  }
```

![图片](https://mmbiz.qpic.cn/mmbiz_gif/2icbwiaINBibTkGagJxJFQAIRFyshrTKydD6Js1OOnUWlUFZmYwAst9aTKh65uesENJqyhqUoXVtSVc0iad06RGU9g/640?wx_fmt=gif&tp=webp&wxfrom=5&wx_lazy=1)

codepen 地址

### 05. 经典的圣杯布局(classical holy Grail layout)

```
grid-template: auto 1fr auto / auto 1fr auto
```

我们可以轻松的使用 Grid 布局来实现圣杯布局，并且是弹性的。

```html
  <div class="parent">
    <header class="pink section">Header</header>
    <div class="left-side blue section" contenteditable>Left Sidebar</div>
    <main class="section coral" contenteditable> Main Content</main>
    <div class="right-side yellow section" contenteditable>Right Sidebar</div>
    <footer class="green section">Footer</footer>
  </div>
  .ex5 .parent {
    display: grid;
    grid-template: auto 1fr auto / auto 1fr auto;
  }
  
  .ex5 header {
    padding: 2rem;
    grid-column: 1 / 4;
  }

  .ex5 .left-side {
    grid-column: 1 / 2;
  }

  .ex5 main {
    grid-column: 2 / 3;
  }

  .ex5 .right-side {
    grid-column: 3 / 4;
  }

  .ex5 footer {
    grid-column: 1 / 4;
  }
```

![图片](https://mmbiz.qpic.cn/mmbiz_gif/2icbwiaINBibTkGagJxJFQAIRFyshrTKydDHpRGh7T8MCJicHYEnZSxorSVQ7lnHpIibNn0yFK0wZNljZrBejTuLbOg/640?wx_fmt=gif&tp=webp&wxfrom=5&wx_lazy=1)

codepen 地址

### 06. 有意思的叠块

使用 `grid-template-columns` 和 `grid-column` 可以实现如下图所示的布局。进一步说明了 `repeat` 和 `fr` 的便捷性。

![图片](https://mmbiz.qpic.cn/mmbiz_png/2icbwiaINBibTkGagJxJFQAIRFyshrTKydDxKMGp44jPic370hibwa4EAjcEouNlPaPDGTYu11x0EI45grcsKMSccjA/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

codepen 地址

### 07. RAM 技巧

```
grid-template-columns: repeat(auto-fit, minmax(<base>, 1fr))
```

Una Kravets 称之为 repeat, auto, minmax 技巧。这在弹性布局 **图片/box** 这类非常有用(一行可以摆放的卡片数量自动适应)。

```
  .ex7 .parent {
    display: grid;
    grid-gap: 1rem;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  }
  <div class="parent white">
    <div class="box pink">1</div>
    <div class="box purple">2</div>
    <div class="box blue">3</div>
    <div class="box green">4</div>
  </div>
```

其效果是如果能够满足多个 box 的最小宽度（比如上面的 `150px`），自动弹性适应放在多行。举个例子:

1. 当前宽度是 `160px`（不考虑 gap），那么上面四个 `box` 的宽度会自适应为 `160px`,并且分为 4 行
2. 当前宽度是 `310px` （不考虑 gap），上面四个 `box` 分成两行，两个 `box` 平分宽度
3. 当满足一行放下 3 个box 时，第三个 box 自动到第一行
4. 当满足一行放下 4 个 box 时，第四个 box 自动到第一行

![图片](https://mmbiz.qpic.cn/mmbiz_gif/2icbwiaINBibTkGagJxJFQAIRFyshrTKydDe44fBBHRSPNhDYDaCicfdelibpUc78OqWY7iaicCPicXClK6sgtrx2qPgGg/640?wx_fmt=gif&tp=webp&wxfrom=5&wx_lazy=1)

如果我们将 `auto-fit` 改为 `auto-fill`:![图片](https://mmbiz.qpic.cn/mmbiz_gif/2icbwiaINBibTkGagJxJFQAIRFyshrTKydDfgWrRm4NDQZwjPzJLWQGr9zAOt5z7ZaAv9v9AGE9qCI3PCRpIFK2gA/640?wx_fmt=gif&tp=webp&wxfrom=5&wx_lazy=1)

### 08. 卡片弹性自适应

`justify-content: space-between`，结合 `grid` 和 `flex` 实现完美的卡片布局。

```
  <div class="parent white">
    <div class="card yellow">
      <h3>Title - Card 1</h3>
      <p contenteditable>Medium length description with a few more words here.</p>
      <div class="visual pink"></div>
    </div>
    <div class="card yellow">
      <h3>Title - Card 2</h3>
      <p contenteditable>Long Description. Lorem ipsum dolor sit, amet consectetur adipisicing elit.</p>
      <div class="visual blue"></div>
    </div>
    <div class="card yellow">
      <h3>Title - Card 3</h3>
      <p contenteditable>Short Description.</p>
      <div class="visual green"></div>
    </div>
  </div>
  .ex8 .parent {
    height: auto;
    display: grid;
    grid-gap: 1rem;
    grid-template-columns: repeat(3, 1fr);
  }

  .ex8 .visual {
    height: 100px;
    width: 100%;
  }

  .ex8 .card {
    display: flex;
    flex-direction: column;
    padding: 1rem;
    justify-content: space-between;
  }

  .ex8 h3 {
    margin: 0
  }
```

![图片](https://mmbiz.qpic.cn/mmbiz_gif/2icbwiaINBibTkGagJxJFQAIRFyshrTKydDibFYWthOnBaNsibYLLCZ8BO9C89Z8KoID2QvQuSQibCcWjVUql10VS8aQ/640?wx_fmt=gif&tp=webp&wxfrom=5&wx_lazy=1)

无论是宽度或高度的收缩还是延展，都可以完美的展现 card 的布局。

codepen 地址

### 09. 使用 clamp 实现 fluid typography

```
clamp(<min>, <actual>, <max>)
```

使用最新的 `clamp()` 方法可以一行代码实现 fluid typography。提高 UX，非常适合包含阅读内容的 card，因为我们不希望一行字太短或太长。

```
  <div class="parent white">
    <div class="card purple">
      <h1>Title Here</h1>
      <div class="visual yellow"></div>
      <p>Descriptive Text. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sed est error repellat veritatis.</p>
    </div>
  </div>
  .ex9 .parent {
    display: grid;
    place-items: center;
  }

  .ex9 .card {
    width: clamp(23ch, 50%, 46ch);
    display: flex;
    flex-direction: column;
    padding: 1rem;
  }

  .ex9 .visual {
      height: 125px;
      width: 100%;
    }
  
```

![图片](https://mmbiz.qpic.cn/mmbiz_gif/2icbwiaINBibTkGagJxJFQAIRFyshrTKydDoedONDTibpmIRc41LCTUuE9ZYLcGbm3qzILqAnXRL6deUuwKbKbMIMw/640?wx_fmt=gif&tp=webp&wxfrom=5&wx_lazy=1)

MDN, clamp() 详解

### 10. 完美实现比例

```
aspect-ratio: <width> / <height>
```

在展现 CMS 或其他设计内容时，我们会期望图片、video、卡片能够按照固定的比例进行布局。而最新的 `aspect-ratio` 就能优雅的实现该功能(使用 chrome 84+)

```
  <div class="parent white">
    <div class="card blue">
      <h1>Video Title</h1>
      <div class="visual green"></div>
      <p>Descriptive Text. This demo works in Chromium 84+.</p>
    </div>
  </div>
  .ex10 .parent {
    display: grid;
    place-items: center;
  }

  .ex10 .visual {
    aspect-ratio: 16 / 9;
  }

  .ex10 .card {
    width: 50%;
    display: flex;
    flex-direction: column;
    padding: 1rem;
  }
```

![图片](https://mmbiz.qpic.cn/mmbiz_gif/2icbwiaINBibTkGagJxJFQAIRFyshrTKydDMuv6N5ibAbcLC6h8Tib5lBYUKuuq00UiaUEItZyXal3b90YibfzzZnEnjA/640?wx_fmt=gif&tp=webp&wxfrom=5&wx_lazy=1)

codepen 地址

------

> 如果喜欢，关注，点赞，转发 一键三连
>
> 我是 BY，一个有趣的人，以后会带来更多的原创文章。
>
> 本文章遵循 MIT 协议，转载请联系作者。