/* REFRESH TOKEN */
const saveRefreshToken = (token: unknown) => {
    sessionStorage.setItem("refresh-token", JSON.stringify(token));
};
const getRefreshToken = () => {
    const token = <string>sessionStorage.getItem("refresh-token");
    return JSON.parse(token);
};

/* ACCESS TOKEN */
const saveAccessToken = (token: unknown) => {
    sessionStorage.setItem("access-token", JSON.stringify(token));
};
const getAccessToken = () => {
    const token = <string>sessionStorage.getItem("access-token");
    return JSON.parse(token);
};

export { saveRefreshToken, getRefreshToken, saveAccessToken, getAccessToken };
