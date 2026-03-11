
AllRouter.AI 是一个统一的大模型网关，旨在为您提供便捷、高效且低成本的 AI 模型接入服务。本手册将从普通用户的视角，带您熟悉平台的核心功能与使用流程。

# 平台概览

AllRouter.AI 整合了 OpenAI、Claude、Llama 等 50+ 知名大模型，通过统一的 API 接口， 让您无需在多个平台间切换即可调用全量 AI 能力。

核心优势：

无缝替换：100% 兼容 OpenAI SDK，仅需修改 base_url 即可接入。

智能路由：根据规则自动选择成本更低或响应更快的模型。

高可用性：支持故障自动切换，确保服务不间断。

实时观测：控制台提供详尽的延迟、Token 用量与成本统计。

# 快速入门

## 注册登录

### 注册

访问https://allrouter.shengjian.net/，点击上方“登录”→“注册”，在弹出的页面中依次输入用户名和密码，最后点击“注册”，即完成用户账号的注册。

![](/docs_images/img_2.png)

![](/docs_images/img_3.png)

### 登录

访问https://allrouter.shengjian.net/，点击上方“登录”，依次输入用户名、密码，点击“继续”即可成功登录AllRouter.AI。

![](/docs_images/img_4.png)

## 操练场

功能描述： 无需编写代码，直接在网页端与各类 AI 模型进行交互测试。

1. 第 1 步： 在左侧菜单栏点击【操练场】菜单。

2. 第 2 步： 在左侧【模型配置】面板的【模型】下拉框中选择目标模型（如 gpt4o ）。

3. 第 3 步： （可选）调节【Temperature】滑块以控制输出的随机性。

4. 第 4 步： 在右侧对话区域底部的文本框中输入您的问题。

5. 第 5 步： 点击输入框右侧的【发送】按钮。

前置条件： 账户余额大于 0。

预期结果： AI 即时返回响应内容，并在下方显示消耗详情。

![](/docs_images/img_5.png)

## 控制台

### 数据看板

登录进入控制台后，您首先看到的是数据看板。这里直观地展示了您的账户状态：

当前余额：实时查看账户剩余额度。

使用统计：包括请求次数、消耗额度及 Tokens 消耗。

资源消耗：包括统计额度、统计Tokens。

数据指标：包括平均TPM、平均RPM。

模型数据分析：通过图表展示不同模型的消耗分布与调用趋势。

![](/docs_images/img_6.png)

### 令牌管理

功能描述： 管理用于 API 调用的密钥（Token），支持额度限制和过期设置。

要开始调用API，您需要创建一个令牌:

1.第一步:点击左侧菜单栏的[令牌管理]。

2.第二步:点击[添加令牌]按钮。

3.第三步:设置令牌名称、额度限制、过期时间和访问限制。

4.第四步:创建成功后，复制生成的令牌(Key)，即可在您的应用中使用。

![](/docs_images/img_7.png)

### 使用日志

使用日志：审计与分析 API 调用 功能描述： 记录所有通过 AllRouter.AI 网关进行的 API 调用详情，便于审计和成本分析。

1. 第 1 步： 在左侧菜单栏中，点击【使用日志】菜单，页面跳转至“使用日志”界面，显示 API 调用记录列表。

2. 第 2 步： 设置查询时间范围。点击日期选择框，在弹出的日历中选择【开始时间】和【结束时间】。

3. 第 3 步： 输入筛选条件。在【令牌名称】、【模型名称】、【分组】或【Request ID】输入框中输入 相关关键词。

4. 第 4 步： 执行查询。点击【查询】按钮，列表刷新并显示符合条件的日志记录。

5. 第 5 步： 查看日志详情。在列表中查看【时间】、【令牌】、【模型】、【花费】等信息。点击末尾的 【详情】按钮查看完整请求和响应。

![](/docs_images/img_8.png)

### 绘图日志

功能描述：记录 Midjourney 等绘图模型的任务执行情况，支持查看状态、进度及生成的图 片。

1. 第 1 步： 在左侧菜单栏中，点击【绘图日志】菜单，页面显示“Midjourney 任务记录”列表。

2. 第 2 步： 搜索特定绘图任务。输入【任务 ID】并选择时间范围，点击【查询】

3. 第 3 步： 查看绘图结果。点击【结果图片】列中的图片缩略图。

4. 第 4 步： 检查任务状态。 若任务失败，可在【失败原因】列查看具体错误信息。

![](/docs_images/img_9.png)

### 任务日志

功能描述： 记录系统中执行的所有异步任务（如批量处理、长时任务等）的生命周期。

1. 第 1 步： 在左侧菜单栏中，点击【任务日志】菜单。页面进入“任务记录”管理界面。

2. 第 2 步： 筛选任务记录。 输入【任务 ID】或设定时间范围，点击【查询】。

3. 第 3 步： 分析任务耗时。 对比【提交时间】与【结束时间】，了解处理效率。

4. 第 4 步： 自定义显示列。 点击页面右上角的【列设置】按钮，勾选需要显示的字段。

![](/docs_images/img_10.png)

## 个人中心

### 钱包管理

功能描述： 管理账户余额，支持多种支付方式及邀请返利。

1. 第 1 步： 在左侧菜单栏点击【钱包管理】菜单。

2. 第 2 步： 在【充值数量】输入框中输入需充值的金额（单位：美元）。

3. 第 3 步： 在【选择支付方式】下方点击【微信】或【Stripe】图标。

4. 第 4 步： 点击下方【选择充值额度】中的对应档位，或直接点击【支付】。

5. 第 5 步： 扫码或按照支付网关指引完成操作。

前置条件： 拥有有效的支付工具。

预期结果： 支付完成后，【当前余额】实时更新。

![](/docs_images/img_11.png)

支付完成后，进入到“钱包管理”→“账单”中，可以看到账号的充值账单记录。

![](/docs_images/img_24_9.png)

### 个人设置

功能描述： 账号绑定、安全设置、配置额度预警通知、设置界面偏好。

![](/docs_images/img_12.png)

#### 账号绑定

功能描述：可选择与账号所绑定的社交账号类型。

![](/docs_images/img_13.png)

#### 安全设置

功能秒睡：用户设置系统访问令牌、密码管理、PassKey登录、两部验证设置。

![](/docs_images/img_14.png)

#### 偏好设置

功能描述：界面语言和其他个人偏好。

![](/docs_images/img_15.png)

#### 通知配置

功能描述：通知、价格和隐私相关设置。

1. 第 1 步： 在左侧菜单栏点击【个人设置】菜单。

2. 第 2 步： 点击【通知配置】选项卡（位置：页面中部的 Tab 栏）。

3. 第 3 步： 在【额度预警阈值】输入框中设定触发通知的金额数值。

4. 第 4 步： 勾选【通知方式】（如邮件通知）。

5. 第 5 步： 点击底部的【保存设置】按钮。

预期结果： 余额不足时，系统将自动通过指定渠道发送提醒。

![](/docs_images/img_16.png)

#### 价格设置

当模型没有设置价格时仍接受调用，仅当您信任该网站时使用，可能会产生高额费用。

![](/docs_images/img_17.png)

#### 隐私设置

开启后，仅"消费"和"错误"日志将记录您的客户端IP地址。

![](/docs_images/img_18.png)

#### 边栏设置

![](/docs_images/img_19.png)

# 模型广场

功能描述：“模型广场”是 AllRouter.AI 的核心资源库，不仅展示了平台支持的所有 AI 模型，还提供了透明、实时的计费查询功能。用户可以根据官方倍率或充值后的实际成本，精确评估每一款模型的调用代价。

1. 第 1 步： 在页面顶部导航栏中，点击【模型广场】。进入模型列表，默认以卡片形式展示模型 ID 及对应的 1M Tokens 价格。

2. 第 2 步： 掌握两种计费模式。

* 按量计费（Tokens）： 针对文本对话模型，根据输入、补全及缓存读取的 Tokens 数量计费。
* 按次计费（Requests）： 针对绘图、任务等特定模型，每发起一次请求扣除固定费用。

3. 第 3 步： 灵活切换价格显示方式。

* 充值价格显示： 开启此开关，系统将根据您的充值比例自动换算并显示实际扣除的金额。
* 倍率显示： 开启此开关，模型卡片将显示该模型相对于官方价格的计费倍率。

4. 第 4 步： 利用侧边栏精准定位模型。在左侧【供应商】区域点击特定图标，或在【计费类型】中选择【按量计费】。

5. 第 5 步： 搜索与复制模型 ID。在顶部搜索框输入关键字，找到目标后点击卡片右上角的【复制】图标。

6. 第 6 步： 批量操作与视图切换。

* 表格视图： 点击右上角【表格视图】，以更紧凑的列表形式对比多个模型的价格。
* 预期结果： 极大提升开发者在多模型环境下的配置效率。

![](/docs_images/img_20.png)

# 使用示例

以在 Claude Code 中使用 AllRouter 的方法为例。

## 步骤一：安装 Claude Code

前提条件：

* 您需要安装 [Node.js 18 或更新版本环境](https://nodejs.org/en/download/" \t "https://docs.bigmodel.cn/cn/coding-plan/tool/_blank)
* MacOS 用户推荐使用 [nvm 方式安装 Nodejs](https://nodejs.org/en/download/" \t "https://docs.bigmodel.cn/cn/coding-plan/tool/_blank) 或 [Homebrew 方式](https://formulae.brew.sh/formula/node" \t "https://docs.bigmodel.cn/cn/coding-plan/tool/_blank)。不推荐直接安装包安装(后续可能会遇到权限问题)
* Windows 用户还需安装 [Git for Windows](https://git-scm.com/download/win" \t "https://docs.bigmodel.cn/cn/coding-plan/tool/_blank)

进入命令行界面，安装 Claude Code

npm install -g @anthropic-ai/claude-code

运行如下命令，查看安装结果，若显示版本号则表示安装成功

claude --version

## 步骤二：配置 AllRouter

1. 第一步：注册账号

访问 AllRouter平台，点击右上角的「注册/登录」按钮，按照提示完成账号注册登录流程。

2. 第二步：获取API Key

登录后，在个人中心页面，点击 API Keys，创建一个新的 API Key。

要开始调用 API，您需要事先在allrouter平台创建一个令牌：

* （1）点击左侧菜单栏的 【令牌管理】。
* （2）点击 【添加令牌】 按钮。
* （3）设置令牌名称、额度限制、过期时间和访问限制。
* （4）创建成功后，复制生成的令牌（Key），即可在您的应用中使用。

![](/docs_images/img_21.png)

复制API Keys 信息。

![](/docs_images/img_22.png)

3. 第三步：配置环境变量

通过在 MacOS、Linux 或 Windows 中设置环境变量（以手动配置为例）。

支持 MacOS & Linux & Windows, 注意不同系统配置文件路径不一样。注意需保证修改的 JSON 文件格式正确性(比如多或少)。

```bash
# 编辑或新增 `settings.json` 文件
# MacOS & Linux 为 `~/.claude/settings.json`
# Windows 为 `用户目录/.claude/settings.json`
# 新增或修改里面的 env 字段
# 注意替换里面的 `your_allrouter_api_key` 为您上一步获取到的 API Key
```

```json
{
  "env": {
    "ANTHROPIC_AUTH_TOKEN": "your_allrouter_api_key",
    "ANTHROPIC_BASE_URL": "https://allrouter.shengjian.net/v1",
    "API_TIMEOUT_MS": "3000000",
    "CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC": 1
  }
}
```

```bash
# 再编辑或新增 `.claude.json` 文件
# MacOS & Linux 为 `~/.claude.json`
# Windows 为 `用户目录/.claude.json`
# 新增 `hasCompletedOnboarding` 参数
```

```json
{
  "hasCompletedOnboarding": true
}
```

配置效果：

```env
ANTHROPIC_AUTH_TOKEN=令牌API Keys 密钥
ANTHROPIC_BASE_URL=https://allrouter.shengjian.net/v1
ANTHROPIC_MODEL=令牌名称
```

![](/docs_images/img_23.png)

## 步骤三：开始使用 Claude Code

配置完成后，进入一个您的代码工作目录，在终端中执行 claude 命令即可开始使用 Claude Code。

▲ 若遇到「Do you want to use this API key」选择 Yes 即可。

![](/docs_images/img_24.png)

