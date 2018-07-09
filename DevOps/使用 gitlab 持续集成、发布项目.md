`gitlab`提供了非常强大的[持续集成/发布](https://docs.gitlab.com/ee/ci/README.html)
应用的能力，通过在项目根目录下配置`.gitlab-ci.yml`文件便可享受`gitlab`带来的便捷。

**这里记录我司的`CI/CD flow`：**
* `gitlab`提供`CI/CD`基础服务
* 配置`docker`镜像统一应用所需环境
* 配置`ansible`自动化运维

