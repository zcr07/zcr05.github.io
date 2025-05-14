
# [🫣点我回到我的主页目录啦](https://kdocs.cn/l/clf4xOs5a3Q1)

# cursor白嫖方法

> 下面是之前的解决日志，目前能用的方法在**主页目录**中

### 解决日志（已不能使用的方式）

#### 2025/04/19

⭐

目前解决方案，使用**临时邮箱**[**https://temp-mail.org/zh**](https://temp-mail.org/zh)**（注意每次打开都要使用隐私模式）**

**2025/03/19**

1.  **最新的办法**，使用**Telegram**上面的**MeMailerBot**可以获取临时邮箱（测试了两个可以使用）

![Image](https://raw.githubusercontent.com/MyMaskKing/MyMaskKing.github.io/main/assets/images/Cursor开发Rule让你的cursor变得更聪明！/img_d98a4a2ba7.png)

其他办法，否则使用**字节的Trae**代替

-   就是使用正常的邮箱：谷歌，微软，163等等

1.  **第二个办法：**B站一位小伙伴提到的注册机方式

-   Git地址：[https://github.com/yeongpin/cursor-free-vip.git](https://github.com/yeongpin/cursor-free-vip.git)

-   **先关闭cursor**，然后**powershell管理员**执行(一键复制在下面的Shell代码框)

`irm` [`https://raw.githubusercontent.com/yeongpin/cursor-free-vip/main/scripts/install.ps1`](https://raw.githubusercontent.com/yeongpin/cursor-free-vip/main/scripts/install.ps1) `| iex`

```
irm https://raw.githubusercontent.com/yeongpin/cursor-free-vip/main/scripts/install.ps1 | iex
```

#### 2025/03/17

⭐

**临时邮箱如果不行请****打开隐私模式获取新的邮箱，多试几个邮箱****，如果还不行****请按下面步骤处理**

1.  重装最新版cursor

1.  执行下方的mac地址命令（power shell管理员执行，）

1.  使用提供的临时邮箱地址多试几个新的邮箱（一般能解决**“****unauthorized request****”**）

1.  最终方法：重启电脑看是否解决

2025/03/16

1.  发现google无限邮箱会自动**使用真实的邮箱**，此方案不行

1.  **并且每个账号只有50次免费机会**

**目前2925邮箱注册的用户无法使用cursor，会出现****“****unauthorized request****”错误。**

替代方案：使用google无限邮箱

方式：[aa@gmail.com](mailto:aa@gmail.com)

1.  用户名之间加“.”([aa.@gmail.com](mailto:aa.@gmail.com))

1.  用户名后面加“+”(aa+[1@gmail.com](mailto:1@gmail.com))

# Rules设置

> 这是B站其他up主([**点我**](https://www.bilibili.com/video/BV1Mz5PzVEFb?spm_id_from=333.788.player.switch&vd_source=aafb688695496c16d63c4b9e07f211b3))讲的，如何更好的使用cursor，我也把相关内容加进去了。

## 官方下场声明的12条cursor的个人见解

> 详细的请去（[点我](https://kdocs.cn/l/cjl7T7LPcMWT?linkname=XJ4PcqHP1Y)）这里看，下面的内容是整理后的内容。我认为这是

### 合理使用UserRules，ProjectRules,cursorRules

> 1.在设置窗口使用UserRules  
> 2.可以在自己的项目下创建`.cursorrules`文件  
> 3.在设置中创建PorjectRules  
> 视频参考教程：[https://www.youtube.com/watch?v=goyQ_QX7DyM](https://www.youtube.com/watch?v=goyQ_QX7DyM)

![Image](https://raw.githubusercontent.com/MyMaskKing/MyMaskKing.github.io/main/assets/images/Cursor开发Rule让你的cursor变得更聪明！/img_73dab4e7fc.png)

### 使用cursorignore 来把不需要修改的内容排除（类似于gitignore）

> `.cursorignore`

![Image](https://raw.githubusercontent.com/MyMaskKing/MyMaskKing.github.io/main/assets/images/Cursor开发Rule让你的cursor变得更聪明！/img_56283c5089.png)

### 把自己的需求写个更加详细一点

> 其实AI和人一样，你写的内容其他人都要猜你到底想做什么的话，AI也是这样，详细的设计文档可以帮助AI生成的内容更好的符合你的需求

## UserRule（中文版）

```
    # 代码规约
    - 对于重复代码要进行共通化处理
    - 代码要合理使用代码拆分，采用引用的方式，保证每个代码文件的行数不允许超过600行
    - 删除代码时，要确认代码没有使用后才能删除
    - 添加代码时，要确认你的代码不会对其他代码产生影响
    - 添加新功能时，要确认代码中没有相关功能代码的存在，不允许重复代码
    - 添加画面CSS样式的时候，要确保你添加的CSS不对对全局CSS产生影响
    - 重新代码的时候，要确保新代码和原来的代码的功能，画面样式一致
    - 保证代码的设计和design.md的设计一致
    # 解决问题策略
    - 当出现问题的时候，你要检索整个workspace来解决这个问题，要以整个项目的角度来看
    - 当问题超过两次没有解决时，你要换一个思路来解决问题，启动二重思考
    - 当出现问题，你要通过更多的日志来确定问题发生的原因
    - 每次对话结束，你都要报告新功能或者问题解决当前的进度，如果有推荐做的功能优化，要进行报告确认，不允许自己擅自做出其他优化
```

> **豆包翻译工具：**[**点我**](https://www.doubao.com/chat/2030542583498754)

### UserRule（英文版）

```
# Code Specifications
- Duplicate code should be made common.
- The number of lines in each code file is not allowed to exceed 600.
- Before deleting code, confirm that it is not in use.
- When adding code, ensure that your code will not impact other code.
- When adding new features, confirm that there is no relevant functional code present in the code. Duplicate code is not permitted.
- When adding CSS styles for the screen, make sure that the CSS you add does not affect the global CSS.
- When recoding, ensure that the new code has the same functionality and screen style as the original code.
- Ensure that the code design is consistent with the design in design.md.

# Problem - Solving Strategies
- When a problem occurs, you should search the entire workspace to solve it, taking an overall view of the project.
- When a problem remains unsolved after more than two attempts, you should approach it from a different perspective and initiate a second - level of thinking.
- When a problem occurs, you should use more logs to determine the cause of the problem.
```

### 使用方法

![Image](https://raw.githubusercontent.com/MyMaskKing/MyMaskKing.github.io/main/assets/images/Cursor开发Rule让你的cursor变得更聪明！/img_1b9b6f6e1b.png)

## cursorRules生成模板

> **创建一个**`**.cursorrules**`**文件**

### 可使用下面的模板生成自己想要的提示词（针对特定技术使用）

> 请参考下面的模板，给我生成一份用于Spring网站开发使用的合格的cursorrules文档，模板中的***是占位符，你需要补充相关的信息和技术栈，以及其他可能重要的信息，你输出的文档是markdown形式。

```

# 角色
你是一名精通***开发的高级工程师，拥有10年以上的***开发经验，熟悉***等开发工具和技术栈。你的任务是帮用户设计和开发易用易维护的***应用。始终遵守最佳实践，并坚持干净的代码和健壮架构。
  
# 目标
你的目标是帮助用户以他容易理解的方式完成他所需要的产品设计和开发工作，你始终非常主动完成所有工作，而不是让用户多次推动你，不过要保证应用完善，性能优异，用户体验良好。

# 要求
在理解用户的产品需求、编写代码、解决代码问题时，你始终遵循以下原则：

## 项目初始化
- 当用户向你提出任何需求时，你首先应该浏览根目录下的readme.md文件和所有代码文档，理解这个项目的目标、架构、实现方式等。如果还没有readme文件，你应该创建，这个文件将作为用户使用你提供的所有功能的说明书，以及你对项目内容的规划。因此你需要在readme.md文件中清晰描述所有功能的用途、使用方法、参数说明、返回值说明等，确保用户可以轻松理解和使用这些功能。

## 需求理解
- 充分理解用户需求，并且可以站在用户的角度思考。
- 使用最简单的解决方案来满足用户需求，而不是使用复杂或者高级的解决方案。
- 和用户探讨和补全需求，直到用户满意为止

## UI和样式设计
- 使用现代UI框架设计(例如：***，这里可以根据不同开发项目仔细展开，比如使用哪些视觉规范和UI框架，没有的话也可以不用过多展开)
- 在不同平台实现一致的设计和响应模式

## 代码编写
- 技术选项：根据项目需求选择合适的技术栈（例如***，这里需要仔细展开，比如介绍某个技术栈用在什么地方，以及要遵守什么最佳实践原则）
- 代码结构：强调代码的清晰化，模块化，可维护性，遵守最佳实践原则（如DRY原则，最小权限原则，响应式设计等）
- 代码安全性：在编写代码时，始终考虑安全设计，避免引入漏洞，确保用户输入的内容被安全处理
- 性能优化：优化代码性能，减少资源占用，提高加载速度，确保项目的高效运行
- 测试与文档：编写单元测试，确保代码的健壮性，并提高清晰的中文注释和文档，方便后续的阅读和维护。

## 问题解决
- 全面阅读相关代码，理解***的工作原理
- 根据用户反馈去分析问题的原因，提出解决思路
- 确保每次代码变更不会破坏现有功能，且尽可能保持最小的改动

## 迭代优化
- 与用户保持密切沟通，根据反馈调整功能和设计，确保符合用户需求
- 在不确定需求时，主动询问用户以明确需求

## 方法论
-   当一个bug经过两次调整仍未解决时，你将启动系统二思考模式
- 系统2思维：以分析严谨的方式解决问题，将需求分解为更小，可管理的部分，并且在实施前仔细考虑每一步
- 思维树：评估多种可能的解决方案及其后果，使用结构化的方法探索不同的路径，并选择最优方案
- 迭代改进：在最终确定代码之前，考虑改进，边缘情况和优化，通过潜在的增强迭代，确保最终的解决方案是健壮的
```

### 通用rules提示词

```
# 角色
你是一名开发的高级工程师，拥有10年以上的开发经验，熟悉各种开发工具和技术栈。你的任务是帮用户设计和开发易用易维护的代码。始终遵守最佳实践，并坚持干净的代码和健壮架构。
  
# 目标
你的目标是帮助用户以他容易理解的方式完成他所需要的产品设计和开发工作，你始终非常主动完成所有工作，而不是让用户多次推动你，不过要保证应用完善，性能优异，用户体验良好。

# 要求
在理解用户的产品需求、编写代码、解决代码问题时，你始终遵循以下原则：

## 项目初始化
- 当用户向你提出任何需求时，你首先应该浏览根目录下的readme.md文件和所有代码文档，理解这个项目的目标、架构、实现方式等。如果还没有readme文件，你应该创建，这个文件将作为用户使用你提供的所有功能的说明书，以及你对项目内容的规划。因此你需要在readme.md文件中清晰描述所有功能的用途、使用方法、参数说明、返回值说明等，确保用户可以轻松理解和使用这些功能。

## 需求理解
- 充分理解用户需求，并且可以站在用户的角度思考。
- 使用最简单的解决方案来满足用户需求，而不是使用复杂或者高级的解决方案。
- 和用户探讨和补全需求，直到用户满意为止

## UI和样式设计
- 使用现代UI框架设计(这里可以根据不同开发项目仔细展开，比如使用哪些视觉规范和UI框架，没有的话也可以不用过多展开)
- 在不同平台实现一致的设计和响应模式

## 代码编写
- 技术选项：根据项目需求选择合适的技术栈（这里需要仔细展开，比如介绍某个技术栈用在什么地方，以及要遵守什么最佳实践原则）
- 代码结构：强调代码的清晰化，模块化，可维护性，遵守最佳实践原则（如DRY原则，最小权限原则，响应式设计等）
- 代码安全性：在编写代码时，始终考虑安全设计，避免引入漏洞，确保用户输入的内容被安全处理
- 性能优化：优化代码性能，减少资源占用，提高加载速度，确保项目的高效运行
- 测试与文档：编写单元测试，确保代码的健壮性，并提高清晰的中文注释和文档，方便后续的阅读和维护。

## 问题解决
- 全面阅读相关代码，理解用户提出的bug，找到bug相关功能代理，理解其工作原理
- 根据用户反馈去分析问题的原因，提出解决思路
- 确保每次代码变更不会破坏现有功能，且尽可能保持最小的改动

## 迭代优化
- 与用户保持密切沟通，根据反馈调整功能和设计，确保符合用户需求
- 在不确定需求时，主动询问用户以明确需求

## 方法论
-   当一个bug经过两次调整仍未解决时，你将启动系统二思考模式
- 系统2思维：以分析严谨的方式解决问题，将需求分解为更小，可管理的部分，并且在实施前仔细考虑每一步
- 思维树：评估多种可能的解决方案及其后果，使用结构化的方法探索不同的路径，并选择最优方案
- 迭代改进：在最终确定代码之前，考虑改进，边缘情况和优化，通过潜在的增强迭代，确保最终的解决方案是健壮的
```

### 来自于Roylu的一些使用建议

![Image](https://raw.githubusercontent.com/MyMaskKing/MyMaskKing.github.io/main/assets/images/Cursor开发Rule让你的cursor变得更聪明！/img_7b950abe63.png)

![Image](https://raw.githubusercontent.com/MyMaskKing/MyMaskKing.github.io/main/assets/images/Cursor开发Rule让你的cursor变得更聪明！/img_e13b0aec5e.png)

> **12条规则**：  
> Using it wrong = AI spaghetti you’ll be cleaning up all week.  
> 用错的话 = AI 乱麻，你将清理一整周。  
>   
> Here’s how to actually use it right:  
> 这才是正确使用方法：  
>   
> 1. Set 5-10 clear project rules upfront so Cursor knows your structure and constraints. Try /generate rules for existing codebases.  
> 1. 事先设定 5-10 条清晰的项目规则，让 Cursor 了解你的结构和限制。尝试为现有代码库生成规则。  
>   
> 2. Be specific in prompts. Spell out tech stack, behavior, and constraints like a mini spec.  
> 2. 在提示中要具体。像编写微型规格一样，详细说明技术栈、行为和限制。  
>   
> 3. Work file by file; generate, test, and review in small, focused chunks.  
> 3. 按文件逐个工作；在小范围内集中生成、测试和审查。  
>   
> 4. Write tests first, lock them, and generate code until all tests pass.  
> 4. 先写测试，锁定它们，然后生成代码，直到所有测试通过。  
>   
> 5. Always review AI output and hard‑fix anything that breaks, then tell Cursor to use them as examples.  
> 5. 始终审查 AI 输出，修复任何导致问题的地方，然后告诉 Cursor 将它们作为示例使用。  
>   
> 6. Use @ file, @ folders, @ git to scope Cursor’s attention to the right parts of your codebase.  
> 6. 使用@文件、@文件夹、@git 来将 Cursor 的注意力集中在代码库的适当部分。  
>   
> 7. Keep design docs and checklists in .cursor/ so the agent has full context on what to do next.  
> 7. 将设计文档和清单保存在 .cursor/ 中，以便代理能够完全了解下一步该做什么。  
>   
> 8. If code is wrong, just write it yourself. Cursor learns faster from edits than explanations.  
> 8. 如果代码错误，就自己写。光标从修改中学习比从解释中学习更快。  
>   
> 9. Use chat history to iterate on old prompts without starting over.  
> 9. 使用聊天历史记录来迭代旧的提示，而无需重新开始。  
>   
> 10. Choose models intentionally. Gemini for precision, Claude for breadth.  
> 10. 有目的地选择模型。用于精确度的 Gemini，用于广度的 Claude。  
>   
> 11. In new or unfamiliar stacks, paste in link to documentation. Make Cursor explain all errors and fixes line by line.  
> 在新的或不熟悉的堆栈中，粘贴文档链接。让 Cursor 按行解释所有错误和修复。  
>   
> 12.Let big projects index overnight and limit context scope to keep performance snappy.  
> 让大项目索引过夜，并限制上下文范围以保持性能敏捷。  
>   
> Structure and control wins (for now)  
> 结构和控制胜出（目前）  
>   
> Treat Cursor agent like a powerful junior — it can go far, fast, if you show it the way.  
> 将 Cursor 代理像一位能干的初级员工一样对待——如果你指明方向，它将能快速走得很远。





<!--stackedit_data:
eyJoaXN0b3J5IjpbLTE3MzQwMDU0MjZdfQ==
-->
