import moment from "moment";

export const sleep = (time: number): Promise<void> => new Promise(resolve => setTimeout(resolve, time));
export const getClock = (): string[] => {
    return [
        moment()
            .locale("ja")
            .format("LL"),
        moment()
            .locale("ja")
            .format("LTS"),
    ];
};
