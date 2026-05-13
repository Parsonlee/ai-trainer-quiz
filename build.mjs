import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function parseJudgeQuestions(content) {
    const questions = [];
    const blocks = content.split(/\n(?=\d+\.\s)/).filter(b => b.trim());

    for (const block of blocks) {
        const match = block.match(/^(\d+)\.\s+([\s\S]*?)$/);
        if (!match) continue;

        const id = parseInt(match[1]);
        let rest = match[2].trim();

        // Extract answer
        const answerMatch = rest.match(/答案：([√×])/);
        if (!answerMatch) continue;
        const answer = answerMatch[1];

        // Extract explanation
        const explMatch = rest.match(/解释：([\s\S]*)/);
        const explanation = explMatch ? explMatch[1].trim() : '';

        // Question text is everything before 答案
        const questionText = rest.split(/答案：/)[0].trim();

        questions.push({
            id,
            type: 'judge',
            question: questionText,
            options: [],
            answer,
            explanation
        });
    }

    return questions;
}

function parseChoiceQuestions(content, type) {
    const questions = [];
    const blocks = content.split(/\n(?=\d+\.\s)/).filter(b => b.trim());

    for (const block of blocks) {
        const match = block.match(/^(\d+)\.\s+([\s\S]*?)$/);
        if (!match) continue;

        const id = parseInt(match[1]);
        let rest = match[2].trim();

        // Extract answer
        const answerMatch = rest.match(/答案：([A-E]+)/);
        if (!answerMatch) continue;
        const answer = answerMatch[1];

        // Extract explanation
        const explMatch = rest.match(/解释：([\s\S]*)/);
        const explanation = explMatch ? explMatch[1].trim() : '';

        // Everything before 答案 is question + options
        const qAndOpts = rest.split(/答案：/)[0].trim();

        // Parse options: (A) text (B) text ...
        // Options may span multiple lines
        const options = [];
        const optRegex = /\(([A-E])\)\s*([\s\S]*?)(?=\([A-E]\)|$)/g;
        let optMatch;
        while ((optMatch = optRegex.exec(qAndOpts)) !== null) {
            const label = optMatch[1];
            const text = optMatch[2].trim().replace(/\n/g, ' ').replace(/\s+/g, ' ');
            if (text) {
                options.push({ label, text });
            }
        }

        // Question text is everything before the first option
        const firstOptIdx = qAndOpts.search(/\([A-E]\)/);
        const questionText = firstOptIdx >= 0
            ? qAndOpts.substring(0, firstOptIdx).trim()
            : qAndOpts.trim();

        questions.push({
            id,
            type,
            question: questionText,
            options,
            answer,
            explanation
        });
    }

    return questions;
}

// Read md files
const mdDir = join(__dirname, '题库md转换');

const judgeContent = readFileSync(join(mdDir, '判断题.md'), 'utf-8');
const singleContent = readFileSync(join(mdDir, '单选题.md'), 'utf-8');
const multiContent = readFileSync(join(mdDir, '多选题.md'), 'utf-8');

// Remove trailing section separators and markdown headers
const cleanJudge = judgeContent.replace(/===\s*单选题\s*===[\s\S]*$/, '').replace(/^#.*\n/, '');
const cleanSingle = singleContent.replace(/===\s*多选题\s*===[\s\S]*$/, '').replace(/^#.*\n/, '');
const cleanMulti = multiContent.replace(/^#.*\n/, '');

const judgeQuestions = parseJudgeQuestions(cleanJudge);
const singleQuestions = parseChoiceQuestions(cleanSingle, 'single');
const multiQuestions = parseChoiceQuestions(cleanMulti, 'multi');

const allQuestions = [...judgeQuestions, ...singleQuestions, ...multiQuestions];

// Write JSON
const outPath = join(__dirname, 'deploy', 'questions.json');
writeFileSync(outPath, JSON.stringify(allQuestions, null, 2), 'utf-8');

console.log(`Parsed: 判断题 ${judgeQuestions.length}, 单选题 ${singleQuestions.length}, 多选题 ${multiQuestions.length}`);
console.log(`Total: ${allQuestions.length} questions -> ${outPath}`);
