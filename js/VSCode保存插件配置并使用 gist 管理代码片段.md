# VSCode保存插件配置并使用 gist 管理代码片段

## setting sync 保存配置
由于公司和家里都使用 `VSCode` 作为主要编辑器，同步配置是最紧要的。`VSCode` 提供了`setting sync`插件，很方便我们同步插件配置。引用网上教程：

* 在左侧的 `sidebar` 选中最后一个，搜索 `Sync`，不出意外，你会从前几个中找到下载量很高的那个 `Settings Sync`；
* 安装后，摁下 `Ctrl + Shift + P` 打开控制面板，搜索 `Sync`，选择 `update/upload` 可以上传你的配置，选择 `Download` 会下载远程配置；
* 如果你之前没有使用过 `Sync`，在上传配置的时候，会让你在 `Github` 上创建一个授权码，允许 `IDE` 在你的 `gist` 中创建资源；下载远程配置，你可以直接将 `gist` 的 `id ` 填入。；
* 下载后等待安装，然后重启即可

这里需要将`gist`的`id`记录并保存到磁盘，搞丢了无法一次下载所有配置，只能在`gist`上逐条下载。


## Share Code 保存代码片段
在学习别人代码的时候，常会遇到一些觉得很酷、有用的代码片段。以往的做法就是拿个小本子记下来，或者上传到博客里，但经常在需要的时候找不见了。。。于是，我想，既然使用`github gist`可以保存`VSCode`插件配置，那它也可以保存其它代码吧。

我在`VSCode`插件搜索`gist`，看到了`Share Code`这个插件：Share your Code on your Github Gist, GitLab or Pastebin. hamm,就是它了。

怎么用呢？

Press Ctrl+Shift+P and type in Share Code. Then you can select between Pastebin and GitHub Gist. (anonymous) means you don't have to login to share a file, but you can't edit or remove it later, when you choose this option.


得益于上一步安装并使用`setting sync`，这里不再需要配置 `Github` 授权码了。

接下来，就可以随心所欲的上传代码片段啦。

参考：
[如何快速上手一款 IDE - VSC 配置指南和插件推荐](http://www.barretlee.com/blog/2017/04/21/something-about-vsc/)


