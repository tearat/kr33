var app = new Vue({
    el: '#app',
    data: {
        left: "",
        right: "",
        temp: "",
        table: {},
        seed: "1",
        help: false
    },
    methods: {
        swap: function () {
            this.temp = this.left;
            this.left = this.right;
            this.right = this.temp;
        },
        toggle_help: function () {
            this.help = this.help ? false : true;
        },
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
                    crypted += "••••••••";
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
            var alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZабвгдеёжзийклмнопрстуфхцчшщъыьэюяАБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ1234567890!№;%:?*()@#$%^&/|+-=_.,<>{}[]`~ ";
            var salt = this.seed;
            for (i=0; i<alphabet.length; i++) {
                table_string += '"' + alphabet[i] + '": "' + sha256(alphabet[i] + salt).substr(0, 8) + '", ';
            }
            table_string = table_string.replace(/,\s*$/, "");
            table_string = table_string.replace('"\"', '"\\\"');
            table_string = table_string.replace('"""', '"\""');
            table_string += "}";
            this.table = JSON.parse(table_string);
        }
    },
    mounted: function () {
        this.generate();
    }
})
