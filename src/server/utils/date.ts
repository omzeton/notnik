export default () => {
    let today = new Date();
    let dd: number | string = today.getDate();
    let mm: number | string = today.getMonth() + 1;
    let minutes: number | string = today.getMinutes();
    let hours: number | string = today.getHours();
    let yyyy = today.getFullYear();
    let date;

    if (dd < 10) {
        dd = "0" + dd;
    }
    if (mm < 10) {
        mm = "0" + mm;
    }
    if (hours < 10) {
        hours = "0" + hours;
    }
    if (minutes < 10) {
        minutes = "0" + minutes;
    }

    date = yyyy + "-" + mm + "-" + dd + " - " + hours + ":" + minutes;

    return date;
};
