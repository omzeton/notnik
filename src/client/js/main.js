const map = (value, x1, y1, x2, y2) => ((value - x1) * (y2 - x2)) / (y1 - x1) + x2;
const lerp = (start, end, amt) => (1 - amt) * start + amt * end;

console.log("Hello from Webpack");
