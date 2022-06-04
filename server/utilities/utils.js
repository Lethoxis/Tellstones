const randRoom = () => {
    var result = "";
    var letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    for (var i = 0; i < 4; i += 1) {
        result += letters[Math.floor(Math.random() * 26)];
    }
    return result;
};

// Rand 0 to n
const randNumber = (n) => {
    return Math.floor(Math.random() * (n + 1));
};

module.exports = { randRoom, randNumber };
