[x] 需要添加目录跳转功能（已实现）
[x] 数据错误：
   - ✅ 156题的解释中包含了157题（已修复）
   - ✅ 判断题一共有300，目前只有286（已补全到300题）
[x] 数据与逻辑分离：
   - ✅ 创建 build.mjs 构建脚本（md -> questions.json）
   - ✅ index.html 移除内联数据，改为 fetch 加载
   - ✅ 运行 `npm run build` 即可从 md 生成最新数据

[ ] Bug: 顶栏答错数与错题本数量不一致
   - 现象：顶栏显示答错83题，但错题本只有33题
   - 原因：`renderStats()` 基于 `state.answered` 计算错题数（答错后重做答对，`answered` 中仍存原错误答案），
     而错题本基于 `Storage.getWrongList()`（答对后会 `removeWrong`）。两者统计口径不同
   - 修复方向：统一统计口径，使顶栏错题数与错题本一致

[ ] Bug: 切换题目类型时进度丢失
   - 现象：切换题目类型后，页面跳转到该类型的第一题，而非上次答题进度
   - 原因：`State.setCategory()` 中 `current.currentIndex = 0` 硬编码重置为0
   - 修复方向：为每个分类保存独立的进度索引，切换时恢复对应分类的进度
