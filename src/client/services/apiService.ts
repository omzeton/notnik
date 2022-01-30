import store from "@/store";
import axios from "axios";
import { getAccessToken } from "./tokenService";

const axiosInstance = axios.create({
    baseURL: `${window.location.origin}/api`,
    headers: { "Content-Type": "application/json" },
});

const protectedRoutes = ["journal/entries", "journal/new", "journal/sync", "journal/remove-entry"];

axiosInstance.interceptors.request.use(
    request => {
        if (request.url && protectedRoutes.includes(request.url)) {
            const accessToken = getAccessToken();
            request.headers = {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            };
        }
        return request;
    },
    error => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
    response => {
        let isLoggedIn = false;
        if (response.config.url && protectedRoutes.includes(response.config.url)) {
            isLoggedIn = true;
        } else {
            isLoggedIn = false;
        }
        store.dispatch("auth/SET_IS_LOGGED_IN", isLoggedIn);
        return response;
    },
    error => {
        if (process.env.NODE_ENV === "development") console.log(error);

        // TODO: If access token is expired redirect to front page

        return Promise.reject(error);
    }
);

export default axiosInstance;
