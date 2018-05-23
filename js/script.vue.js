var app = new Vue({
    el: '#app',
    data: {
        text: "",
        code: "",
        table: {}
    },
    methods: {
        load_table: function () {
            var loaded;
            $.ajax({
                url: "/table/table.json",
                cache: false,
                async: false,
            }).done(function (data) {
                loaded = data;
            });
            if (loaded != undefined) {
                this.table = loaded;
            } else {
                console.log('error table loading');
            }
        },
        crypt: function () {
            this.code = this.crypting(this.text.toLowerCase(), this.table);
        },
        decrypt: function () {
            this.text = this.decrypting(this.code, this.table);
        },
        crypting: function (input, table) {
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
                    crypted += "########";
                }
            }
            return crypted;
        },
        decrypting: function (code, table) {
            if (code.length % 8 > 0) {
                return "code not valid";
            }
            var blocks_count = code.length / 8;

            var decrypted = "";
            for (var i = 0; i < blocks_count; i++) {
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
        }
    },
    mounted: function () {
        this.load_table();
    }
})
