const { execSync } = require('child_process');
const fs = require('fs');

const getGitDiffFiles = () => {
    const filesStringInWorkspace = execSync('git diff --name-only'); // 工作区 <Buffer >
    const filesStringInCacheArea = execSync('git diff --cached --name-only'); // 缓存区 <Buffer >
    const gitDiffFiles = (filesStringInWorkspace + filesStringInCacheArea)
        .trim()
        .split('\n')
        .filter(v => {
            return ['.js'].some(v2 => v.endsWith(v2));
        })
        .filter(v => {
            return fs.existsSync(v);
        });

    return Array.from(new Set(gitDiffFiles));
};

module.exports = getGitDiffFiles;
