function generator() {
    var result = "";
    var alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", " ", "!", ",", "."]

    var code = 0;
    for (var k = 0; k < alphabet.length; k++) {
        code++;
        if (code.toString().length == 1) {
            code = "000" + code;
        }
        if (code.toString().length == 2) {
            code = "00" + code;
        }
        if (code.toString().length == 3) {
            code = "0" + code;
        }
        result += '"' + alphabet[k] + '": "' + code + '"' + ",<br>"
    }
    return result;
}
