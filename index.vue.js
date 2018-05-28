var app = new Vue({
    el: '#app',
    data: {
        left: "",
        right: "",
        table: {},
        seed: "1",
        table_string: ""
    },
    methods: {
        crypt: function () {
            this.right = this.crypting(this.left.toLowerCase(), this.table);
        },
        decrypt: function () {
            this.right = this.decrypting(this.left, this.table);
        },
        crypting: function (input, table) {
            var crypted = "";
            for (var i = 0; i < input.length; i++) {
                var done = false;
                for (key in table) {
                    if (key == input[i]) {
                        crypted += table[key];
                        done = true;
                    }
                }
                if (done == false) {
                    crypted += "########";
                }
            }
            return crypted;
        },
        decrypting: function (code, table) {
            if (code.length % 8 > 0) {
                return "code not valid";
            }
            var decrypted = "";
            for (var i = 0; i < code.length / 8; i++) {
                var block = code.substr(i * 8, 8);
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
        },
        generate: function () {
            table_string = "{";
            var alphabet = ["а", "б", "в", "г", "д", "е", "ё", "ж", "з", "и", "й", "к", "л", "м", "н", "о", "п", "р", "с", "т", "у", "ф", "х", "ц", "ч", "ш", "щ", "ъ", "ы", "ь", "э", "ю", "я", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "!", "?", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", " ", ".", ",", "(", ")", "{", "}", "&quot;", ":", ";", "_", "+", "-", "=", "*", "/", "<", ">", "[", "]", "@", "#", "$", "%", "^", "&", "№", "`", "~"];
            var salt = this.seed;
            alphabet.forEach(function (letter, key, alphabet) {
                table_string += '"' + letter + '": "' + sha256(letter + salt).substr(0, 8) + '", ';
            });
            table_string = table_string.replace(/,\s*$/, "");
            table_string = table_string.replace('"\"', '"\\\"');
            table_string = table_string.replace('"""', '"\""');
            table_string += "}";
            this.table = JSON.parse(table_string);
            this.right = "";
        }
    },
    mounted: function () {
        this.generate();
    }
})
