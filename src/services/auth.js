const setToken = (token) => {
    localStorage.setItem('token', JSON.stringify(token));
};

const removeToken = () => {
    localStorage.removeItem('token');
};

const getToken = () => {
    try {
        return JSON.parse(localStorage.getItem('token'));
    } catch (err) {
        removeToken();
        return null;
    }
};

export { setToken, removeToken, getToken };
