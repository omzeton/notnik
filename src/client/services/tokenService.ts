/* REFRESH TOKEN */
const saveRefreshToken = (token: unknown) => {
    sessionStorage.setItem("refresh-token", JSON.stringify(token));
};
const getRefreshToken = (): string => {
    const token = <string>sessionStorage.getItem("refresh-token");
    const parsedToken = JSON.parse(token);
    return parsedToken;
};
const deleteRefreshToken = () => {
    sessionStorage.removeItem("refresh-token");
};

/* ACCESS TOKEN */
const saveAccessToken = (token: unknown) => {
    sessionStorage.setItem("access-token", JSON.stringify(token));
};
const getAccessToken = (): string => {
    const token = <string>sessionStorage.getItem("access-token");
    const parsedToken = JSON.parse(token);
    return parsedToken;
};
const deleteAccessToken = () => {
    sessionStorage.removeItem("access-token");
};

export { saveRefreshToken, getRefreshToken, deleteRefreshToken, saveAccessToken, getAccessToken, deleteAccessToken };
