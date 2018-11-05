import axios from 'axios';

export const getUserById = id => {
    return axios.get('api/user/getUserById/1').then(res => {
        return res;
    });
};
export const getUserByIdMock = id => {
    return axios.get('mock/user/getUserById/2').then(res => {
        return res;
    });
};
