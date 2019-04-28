let date = new Date(),
	day = date.getDate(),
	hour = date.getHours(),
	minutes = date.getMinutes(),
	month = date.getMonth();

if (hour < 9) {
	hour = '0' + hour;
}
hour += ":";
if (minutes < 9) {
	minutes = '0' + minutes;
}
hour += minutes;

// Add 0 if day is less than 9
if (day < 9) {
	day = '0' + day;
}
// Add 0 if month is less than 9
if (month < 9) {
	month = '0' + month;
}

const intro = {
	day: day.toString(),
	fKey: null,
	header: "Welcome!",
	hour: hour.toString(),
	id: '00000',
	img: 'https://firebasestorage.googleapis.com/v0/b/notnik-app.appspot.com/o/assets%2Fsample-bg.jpg?alt=media&token=c040c1be-cc24-4caa-b709-bbb7dd8b0b52',
	month: month.toString(),
	textBody: "<div>Thank you for registering in Notnik!</div><div>To create a new entry press the plush button in the main view.<div>To edit an entry simply click on the desired element and start typing.<div>For background image press the small button in top right corner when you're viewing full entry.</div><div>To save all your changes press the middle blue button on the sidebar.</div><div>To delete an entry click the cross sign located in the top right corner of every entry.</div><div>That's it!</div><div>I hope that you enjoy using this app and that it will become useful. Happy writing!</div>",
	userId: null,
	year: date.getFullYear().toString()
}

module.exports = intro;