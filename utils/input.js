const prompts = require('prompts');

let questions = [
    {
        type: 'text',
        name: 'username',
        message: 'What is your GitHub username?'
    },
    {
        type: 'number',
        name: 'age',
        message: 'How old are you?'
    },
    {
        type: 'text',
        name: 'about',
        message: 'Tell something about yourself',
        initial: 'Why should I?'
    }
];
const input = async () => {
    let response = await prompts(questions);
    return response;
};

module.exports = input;
