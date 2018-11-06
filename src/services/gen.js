import axios from 'axios';

export const getApiList = body => {
    return axios
        .get('gen/list', {
            body
        })
        .then(res => {
            return res;
        });
};

export const getApiById = id => {
    return axios.get(`gen/api/${id}`).then(res => {
        return res;
    });
};

export const saveApi = body => {
    return axios.post('gen/api', { project: 'test', ...body }).then(res => {
        console.log(res);
    });
};
