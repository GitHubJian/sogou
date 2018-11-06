const { execSync } = require('child_process');

const getGitDiffFiles = () => {
    const filesStringInWorkspace = execSync('git diff --name-only'); // 工作区 <Buffer >
    const filesStringInCacheArea = execSync('git diff --cached --name-only'); // 缓存区 <Buffer >
    const gitDiffFiles = (filesStringInWorkspace + filesStringInCacheArea)
        .trim()
        .split('\n')
        .filter(v => {
            return ['.js', '.vue', '.css'].some(v2 => v.endsWith(v2));
        });

    return gitDiffFiles;
};

module.exports = getGitDiffFiles;
