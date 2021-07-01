import moment from "moment";

const sleep = time => new Promise(resolve => setTimeout(resolve, time));

const getCurrentDate = () => {
    return [
        moment()
            .locale("ja")
            .format("LL"),
        moment()
            .locale("ja")
            .format("LTS"),
    ];
};

export { sleep, getCurrentDate };
