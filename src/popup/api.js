import axios from 'axios';

const baseURL = "http://127.0.0.1:5000/"

const api = axios.create({
    baseURL: baseURL, headers: {
        'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*',
    }
});


export const loadBot = async (url) => {

    const data = {
        'repo_link': url,
        'model': 'gpt-3.5'
    }


    try {
        return await api.post('load', data, {});
    } catch (error) {
        console.log(error);
        return error;
    }

}

export const askQuestion = async (data) => {
    try {
        return await api.post('talk', data, {});
    } catch (error) {
        console.log(error);
        return error;
    }
}

export const updateModel = async (model) => {

    const data = {
        'model': model
    }

    try {
        return await api.post('model', data, {});
    } catch (error) {
        console.log(error);
        return error;
    }
}





