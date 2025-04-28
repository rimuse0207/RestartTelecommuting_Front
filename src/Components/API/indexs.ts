// import axios from 'axios';

// export const request = axios.create({
//     baseURL: process.env.REACT_APP_API_URL,
//     headers: { Authorization: sessionStorage.getItem('DHKS_TOKEN') },
// });

import axios from 'axios';
export const request = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        // Authorization: sessionStorage.getItem('DHKS_TOKEN'),
        // Authorization: localStorage.getItem('Login_token'),
        id: localStorage.getItem('Login_id'),
    },
});

request.interceptors.request.use(
    config => {
        const token = sessionStorage.getItem('DHKS_TOKEN'); // 최신 Token 가져오기
        if (token) {
            config.headers.Authorization = sessionStorage.getItem('DHKS_TOKEN');
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

export const Axios_Get_Moduls = async (Path_URL: string, Params_Data: any) => {
    try {
        const Axios_Get_Moduls_Axios = await request.get(`${Path_URL}`, {
            params: Params_Data,
        });
        if (Axios_Get_Moduls_Axios.data.status === 200) {
            return Axios_Get_Moduls_Axios.data.data;
        } else if (Axios_Get_Moduls_Axios.data.status === 401) {
            alert('세션이 종료되었습니다. 재 로그인 바랍니다.');
            window.location.href = '/Login_Page';
        } else {
            alert('Error 발생. Axios_Error_Code 1999 IT팀에 문의바랍니다.');
            return false;
        }
    } catch (error) {
        console.log(error);
        return false;
    }
};
export const Axios_Post_Moduls = async (Path_URL: string, Post_Data: any) => {
    try {
        const Axios_Post_Moduls_Axios = await request.post(`${Path_URL}`, Post_Data);

        if (Axios_Post_Moduls_Axios.data.status === 200) {
            return Axios_Post_Moduls_Axios.data.data;
        } else {
            alert('세션이 종료되었습니다. 재 로그인 바랍니다.');
            window.location.href = '/Login_Page';
        }
    } catch (error) {
        console.log(error);
        return false;
    }
};
