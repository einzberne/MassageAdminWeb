import axios from 'axios';
import { getToken } from './auth';

const success = (res) => {
    let data;
    if (Array.isArray(res)) {
        data = res;
    } else {
        data = {
            ...res
        };
    }

    return {
        status: '200',
        data
    };
};

const callback = (error) => {
    if (!error.response || error.response.status === 500) {
        return {
            httpStatus: 500,
            status: '500',
            message: 'Server Error',
            error
        };
    }
    const { status, message, domain, data } = error.response.data;
    return {
        httpStatus: error.response.status,
        status,
        message,
        domain,
        data
    };
};

const writeOptAuth = (option = {}) => {
    const { headers } = option;

    return {
        ...option,
        headers: {
            ...headers,
            Authorization: `Bearer ${getToken()}`
        }
    };
};

const Http = {
    get: (url, option) => {
        return axios
            .get(url, option)
            .then((res) => success(res.data))
            .catch((err) => callback(err));
    },
    post: (url, form, option) => {
        return axios
            .post(url, form, option)
            .then((res) => success(res.data))
            .catch((err) => callback(err));
    },
    put: (url, form, option) => {
        return axios
            .put(url, form, option)
            .then((res) => success(res.data))
            .catch((err) => callback(err));
    },
    patch: (url, form, option) => {
        return axios
            .patch(url, form, option)
            .then((res) => success(res.data))
            .catch((err) => callback(err));
    }
};

const HttpAuth = {
    get: (url, option) => {
        return axios
            .get(url, writeOptAuth(option))
            .then((res) => success(res.data))
            .catch((err) => callback(err));
    },
    post: (url, form, option) => {
        return axios
            .post(url, form, writeOptAuth(option))
            .then((res) => success(res.data))
            .catch((err) => callback(err));
    },
    put: (url, form, option) => {
        return axios
            .put(url, form, writeOptAuth(option))
            .then((res) => success(res.data))
            .catch((err) => callback(err));
    },
    patch: (url, form, option) => {
        return axios
            .patch(url, form, writeOptAuth(option))
            .then((res) => success(res.data))
            .catch((err) => callback(err));
    },
    delete: (url, option) => {
        return axios
            .delete(url, writeOptAuth(option))
            .then((res) => success(res.data))
            .catch((err) => callback(err));
    }
};

export { Http, HttpAuth };
