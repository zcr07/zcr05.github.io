## ✅ 解决步骤：彻底解除语音输入被自动关闭的问题

### 🔧 步骤 1：检查组策略是否禁用了语音输入相关功能⭐

1.  **Win + R**，输入：`gpedit.msc` 打开组策略编辑器。
2.  导航到：

复制编辑`计算机配置 > 管理模板 > 控制面板 > 辅助功能`

看看有没有这些策略项：

-   **“允许语音识别”**（Allow Speech Recognition）
-   **“允许在线语音识别”**（Allow Online Speech Recognition）

如果它们被设置成了“已禁用”，请改成：

-   **未配置** 或 **已启用**

> 修改后请点击“应用”并关闭窗口，不需要重启。

----------

### 🔧 步骤 2：注册表修复

如果组策略无效，我们直接修注册表。

#### 🔹 方法：手动修复

1.  **Win + R**，输入 `regedit`
2.  定位到以下路径：

复制编辑`HKEY_LOCAL_MACHINE\SOFTWARE\Policies\Microsoft\InputPersonalization`

如果你看到以下两个键值，**请删除它们**：

-   `RestrictImplicitTextCollection`
-   `RestrictImplicitInkCollection`

然后继续查找：

复制编辑`HKEY_LOCAL_MACHINE\SOFTWARE\Policies\Microsoft\Speech`

如果有以下键值，也请删除：

-   `AllowSpeechRecognition`
-   `AllowOnlineSpeechRecognition`

> 这些键如果设置为 `0`，就会导致你描述的“选项自动关闭”问题。

----------

### ✅ 步骤 3：重新启用语音输入

完成上述操作后：

1.  打开“设置” > “时间和语言” > “语音识别”
2.  打开：

-   在线语音识别
-   语音输入启动器

确保状态是“开”后重启一次，看是否能保存。

# 配置一个“极简快速版”的 Edge

## ✅ 一次搞定的 Edge 极简优化配置

### 🧹 第一步：关闭累赘功能

在 Edge 地址栏输入：`edge://settings/`，然后：

#### 1.1 👉 关闭后台运行和启动优化

路径：**系统和性能**

-   关闭 **在 Microsoft Edge 关闭后继续运行后台扩展和应用**
-   关闭 **启动增强功能**
-   关闭 **效率模式**（有时候反而会卡）

#### 1.2 👉 关闭推荐和自动化服务

路径：**隐私、搜索和服务**

-   关闭 **Microsoft 让浏览更快、更安全的服务**
-   关闭 **使用网页服务帮助解析导航错误**
-   关闭 **建议你的网站**

#### 1.3 👉 关闭侧边栏

路径：**外观**

-   关闭 **自动显示侧边栏按钮**
-   关闭 **始终显示侧边栏**

#### 1.4 👉 关闭硬件加速（可选，看你机器）

路径：**系统和性能**

-   关闭 **使用硬件加速（需要重启）**  
    👉 **适用于显卡老、或显卡驱动不太稳定的用户。**





<!--stackedit_data:
eyJoaXN0b3J5IjpbLTgwNjE2NDUwMV19
-->
