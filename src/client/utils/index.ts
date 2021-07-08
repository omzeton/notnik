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
export const getNoteTitle = (text: string) => {
    const noteText = text.trim().match(/[^#]{1,45}/);
    return noteText ? noteText[0].trim().split(/\r?\n/)[0] : "*empty_note*";
};
