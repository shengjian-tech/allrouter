AllRouter.AI is a unified large-model gateway designed to provide convenient, efficient, and cost-effective AI model access. This guide is written from an end-user perspective to help you quickly understand the platform's core capabilities and workflows.

# Platform Overview

AllRouter.AI integrates 50+ well-known large models such as OpenAI, Claude, and Llama. Through a unified API, you can call the full set of AI capabilities without switching across multiple platforms.

Key strengths:

Seamless replacement: 100% compatible with the OpenAI SDK. You can connect by changing only `base_url`.

Smart routing: Automatically chooses lower-cost or faster-response models based on rules.

High availability: Supports automatic failover to keep services uninterrupted.

Real-time observability: The console provides detailed latency, token usage, and cost statistics.

# Quick Start

## Sign Up & Sign In

### Sign Up

Visit https://allrouter.shengjian.net/, click **Login** -> **Register**, enter your username and password on the popup page, and click **Register** to create your account.

![](/docs_images/img_2.png)

![](/docs_images/img_3.png)

### Sign In

Visit https://allrouter.shengjian.net/, click **Login**, enter your username and password, then click **Continue** to sign in to AllRouter.AI.

![](/docs_images/img_4.png)

## Playground

Feature description: Test and interact with AI models directly on the web page, without writing code.

1. Step 1: Click **Playground** in the left sidebar.

2. Step 2: In the left **Model Configuration** panel, choose a target model from the **Model** dropdown (for example, `gpt4o`).

3. Step 3: (Optional) Adjust the **Temperature** slider to control output randomness.

4. Step 4: Enter your prompt in the input box at the bottom of the right chat area.

5. Step 5: Click **Send** on the right side of the input box.

Prerequisite: Your account balance must be greater than 0.

Expected result: The AI returns a response immediately, and usage details are shown below.

![](/docs_images/img_5.png)

## Console

### Dashboard

After signing in and entering the console, you first see the dashboard. It gives a clear overview of your account status:

Current balance: View remaining account credit in real time.

Usage statistics: Includes request count, consumed credit, and token usage.

Resource consumption: Includes total consumed credit and total consumed tokens.

Data metrics: Includes average TPM and average RPM.

Model analytics: Charts show usage distribution and trend by model.

![](/docs_images/img_6.png)

### Token Management

Feature description: Manage API access keys (tokens), including credit limits and expiration settings.

To start calling APIs, you need to create a token:

1. Step 1: Click **Token Management** in the left sidebar.

2. Step 2: Click the **Add Token** button.

3. Step 3: Set token name, credit limit, expiration time, and access restrictions.

4. Step 4: After creation, copy the generated token key and use it in your application.

![](/docs_images/img_7.png)

### Usage Logs

Feature description: Record all API calls made through the AllRouter.AI gateway for auditing and cost analysis.

1. Step 1: Click **Usage Logs** in the left sidebar to open the usage log list.

2. Step 2: Set a query time range. Click the date picker and choose **Start Time** and **End Time**.

3. Step 3: Enter filter conditions. Type keywords in **Token Name**, **Model Name**, **Group**, or **Request ID**.

4. Step 4: Run the query. Click **Search** to refresh the list with matching logs.

5. Step 5: View log details. Check **Time**, **Token**, **Model**, **Cost**, etc., and click **Details** to see full request/response data.

![](/docs_images/img_8.png)

### Image Logs

Feature description: Record the execution of image-generation tasks (for example Midjourney), including status, progress, and generated images.

1. Step 1: Click **Image Logs** in the left sidebar to open the Midjourney task list.

2. Step 2: Search for a specific drawing task by entering **Task ID**, selecting a time range, and clicking **Search**.

3. Step 3: View generated images by clicking thumbnails in the **Result Image** column.

4. Step 4: Check task status. If a task fails, view details in the **Failure Reason** column.

![](/docs_images/img_9.png)

### Task Logs

Feature description: Record the lifecycle of all asynchronous tasks in the system (such as batch processing and long-running tasks).

1. Step 1: Click **Task Logs** in the left sidebar to enter the task management page.

2. Step 2: Filter task records by entering **Task ID** or setting a time range, then click **Search**.

3. Step 3: Analyze processing duration by comparing **Submission Time** and **End Time**.

4. Step 4: Customize visible columns by clicking **Column Settings** in the top-right corner.

![](/docs_images/img_10.png)

## Personal Center

### Wallet Management

Feature description: Manage account balance, with support for multiple payment methods and referral rebates.

1. Step 1: Click **Wallet Management** in the left sidebar.

2. Step 2: Enter the top-up amount (USD) in **Top-up Amount**.

3. Step 3: Choose a payment method by clicking **WeChat** or **Stripe**.

4. Step 4: Choose a predefined amount in **Select Top-up Amount**, or click **Pay** directly.

5. Step 5: Complete the payment by scanning the code or following the payment gateway instructions.

Prerequisite: You have a valid payment method.

Expected result: After payment succeeds, **Current Balance** updates in real time.

![](/docs_images/img_11.png)

### Personal Settings

Feature description: Account binding, security settings, quota alerts, and UI preferences.

![](/docs_images/img_12.png)

#### Account Binding

Feature description: Choose and manage social accounts linked to your profile.

![](/docs_images/img_13.png)

#### Security Settings

Feature description: Configure access token, password management, Passkey login, and two-factor verification.

![](/docs_images/img_14.png)

#### Preferences

Feature description: Interface language and other personal preferences.

![](/docs_images/img_15.png)

#### Notification Settings

Feature description: Notification, pricing, and privacy-related settings.

1. Step 1: Click **Personal Settings** in the left sidebar.

2. Step 2: Click the **Notification Settings** tab in the middle tab bar.

3. Step 3: Set the trigger amount in **Quota Alert Threshold**.

4. Step 4: Select **Notification Method** (for example, email notification).

5. Step 5: Click **Save Settings** at the bottom.

Expected result: When your balance is low, the system automatically sends alerts through the selected channel.

![](/docs_images/img_16.png)

#### Price Settings

If a model has no price configured, calls may still be accepted. Use this only when you trust the site, because unexpected high costs may occur.

![](/docs_images/img_17.png)

#### Privacy Settings

When enabled, only **consumption** and **error** logs record the client IP address.

![](/docs_images/img_18.png)

#### Sidebar Settings

![](/docs_images/img_19.png)

# Model Marketplace

Feature description: **Model Marketplace** is the core model catalog of AllRouter.AI. It shows all supported AI models and provides transparent, real-time pricing queries. Based on official multipliers or your top-up conversion, you can accurately evaluate call costs for each model.

1. Step 1: In the top navigation bar, click **Model Marketplace**. You enter the model list, which shows model IDs and 1M token prices in card view by default.

2. Step 2: Understand two billing modes.

* Token-based billing: For text/chat models, cost is based on input, completion, and cache-read tokens.
* Request-based billing: For certain models such as image generation or tasks, each request charges a fixed fee.

3. Step 3: Switch price display modes flexibly.

* Top-up price display: Turn on this switch to convert and show actual charged amounts based on your top-up ratio.
* Multiplier display: Turn on this switch to show each model's billing multiplier relative to official pricing.

4. Step 4: Locate models precisely with the sidebar. In the left **Provider** area, click a specific icon, or choose **Token-based billing** under **Billing Type**.

5. Step 5: Search and copy model IDs. Enter keywords in the top search box, then click the **Copy** icon in the top-right corner of the target card.

6. Step 6: Batch operations and view switching.

* Table view: Click **Table View** in the top-right corner to compare multiple model prices in a compact list.
* Expected result: Greatly improves configuration efficiency in multi-model scenarios.

![](/docs_images/img_20.png)

# Usage Example

The example below shows how to use AllRouter in Claude Code.

## Step 1: Install Claude Code

Prerequisites:

* Install [Node.js 18 or later](https://nodejs.org/en/download/).
* On macOS, it is recommended to install Node.js via [nvm](https://github.com/nvm-sh/nvm) or [Homebrew](https://formulae.brew.sh/formula/node). Direct package installation is not recommended due to potential permission issues.
* On Windows, also install [Git for Windows](https://git-scm.com/download/win).

Open your terminal and install Claude Code:

npm install -g @anthropic-ai/claude-code

Run the following command to verify installation. If a version is shown, installation succeeded:

claude --version

## Step 2: Configure AllRouter

1. Step 1: Register an account.

Visit the AllRouter platform, click **Register/Login** in the upper-right corner, and complete registration and login as prompted.

2. Step 2: Get an API key.

After login, go to your personal center, click **API Keys**, and create a new API key.

To start API calls, you must first create a token on the AllRouter platform:

* (1) Click **Token Management** in the left sidebar.
* (2) Click **Add Token**.
* (3) Set token name, credit limit, expiration time, and access restrictions.
* (4) After creation, copy the generated token key for use in your app.

![](/docs_images/img_21.png)

Copy the API key information.

![](/docs_images/img_22.png)

3. Step 3: Configure environment variables.

Set environment variables in macOS, Linux, or Windows (manual configuration example below).

macOS, Linux, and Windows are all supported, but configuration file paths differ by system. Ensure JSON format is valid when editing.

```bash
# Edit or create `settings.json`
# macOS & Linux: `~/.claude/settings.json`
# Windows: `<user-home>/.claude/settings.json`
# Add or update the `env` section
# Replace `your_allrouter_api_key` with the API key from the previous step
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
# Then edit or create `.claude.json`
# macOS & Linux: `~/.claude.json`
# Windows: `<user-home>/.claude.json`
# Add `hasCompletedOnboarding`
```

```json
{
  "hasCompletedOnboarding": true
}
```

Configuration result:

```env
ANTHROPIC_AUTH_TOKEN=Token API key
ANTHROPIC_BASE_URL=https://allrouter.shengjian.net/v1
ANTHROPIC_MODEL=Token name
```

![](/docs_images/img_23.png)

## Step 3: Start using Claude Code

After configuration, open your code working directory and run the `claude` command in terminal to start using Claude Code.

If you see **Do you want to use this API key**, choose **Yes**.

![](/docs_images/img_24.png)
