function crypting(input, table) {
    var input_count = input.length;

    var crypted = "";
    for (var i = 0; i < input_count; i++) {
        var done = false;
        for (key in table) {
            if (key == input[i]) {
                crypted += table[key];
                done = true;
            }
        }
        if (done == false) {
            crypted += "####";
        }
    }
    return crypted;
}

function decrypting(code, table) {
    if (code.length % 4 > 0) {
        return "code not valid";
    }
    var blocks_count = code.length / 4;
    console.log(blocks_count);

    var decrypted = "";
    for (var i = 0; i < blocks_count; i++) {
        var block = code.substr(i * 4, 4);
        console.log(block);
        var done = false;
        for (key in table) {
            if (table[key] == block) {
                decrypted += key;
                done = true;
            }
        }
        if (done == false) {
            decrypted += "•";
        }
    }
    return decrypted;
}
