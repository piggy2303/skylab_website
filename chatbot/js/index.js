(function () {

    var chat = {
        
        init: function () {
            this.cacheDOM();
            this.bindEvents();
            this.render();
        },
        cacheDOM: function () {
            this.$chatHistory = $('.chat-history');
            this.$button = $('button');
            this.$textarea = $('#message-to-send');
            this.$chatHistoryList = this.$chatHistory.find('ul');
        },
        bindEvents: function () {
            this.$button.on('click', this.addMessage.bind(this));
            this.$textarea.on('keyup', this.addMessageEnter.bind(this));
        },
        messageToSend: '',
        messageResponses: [
            "Tôi không hiểu  ý bạn",
            'Chào bạn , rất vui được làm quen với bạn',
            "Tên mình là SkyBot",
            "Hiệu trưởng trường Đại học Công nghệ là PGS TS Nguyễn Việt Hà",
            "Mình được nhóm Skylab tạo ra",
            "Không chửi bậy nhé :) tao biết mày là ai đấy :)",
            "Cảm ơn nhé :)",
            "Địt mẹ mày :) đừng tưởng tao ngu",
            "ông chủ Triệu :)"
        ],
        
        processOutput: function (input) {
            console.log(input);

            input = input.trim();
            console.log(input);

            input = input.toLowerCase();
            console.log(input);

            if (input.indexOf("chào") != -1) {
                return 1;
            } else if (input.indexOf("tên") != -1) {
                return 2;
            } else if (input.indexOf("ai") != -1) {
                if (input.indexOf("bạn là") != -1) {
                    return 2;
                } else if (input.indexOf("tạo ra") != -1) {
                    return 4;
                } else if (input.indexOf("hiệu trưởng") != -1) {
                    if (input.indexOf("đại học công nghệ") != -1) {
                        return 3;
                    }
                    return 0;
                }
                else if(input.indexOf("ngu") != -1){
                    if (input.indexOf("đại học công nghệ") != -1) {
                        return 8;
                    }
                    return 0;
                }
                return 0;

            } else if (input.indexOf("dm") != -1 || input.indexOf("địt") != -1 ) {
                return 5;
            } 
            else if (input.indexOf("tuấn anh") != -1 ) {
                if(input.indexOf("đẹp trai") != -1 ||input.indexOf("dz") != -1 ){
                    return 6;
                }
                return 7;
            } 
            else {
                return 0;
            }

        },

        render: function () {
            this.scrollToBottom();
            if (this.messageToSend.trim() !== '') {
                var template = Handlebars.compile($("#message-template").html());
                var context = {
                    messageOutput: this.messageToSend,
                    time: this.getCurrentTime()
                };

                this.$chatHistoryList.append(template(context));
                this.scrollToBottom();
                this.$textarea.val('');

                // responses
                var templateResponse = Handlebars.compile($("#message-response-template").html());
                var indexOutput = this.processOutput(this.messageToSend);
                console.log(indexOutput);

                var contextResponse = {
                    // response: this.getRandomItem(this.messageResponses),
                    response: this.messageResponses[indexOutput],
                    time: this.getCurrentTime()
                };

                setTimeout(function () {
                    this.$chatHistoryList.append(templateResponse(contextResponse));
                    this.scrollToBottom();
                }.bind(this), 1200);

            }

        },

        addMessage: function () {
            this.messageToSend = this.$textarea.val()
            this.render();
        },
        addMessageEnter: function (event) {
            // enter was pressed
            if (event.keyCode === 13) {
                this.addMessage();
            }
        },
        scrollToBottom: function () {
            this.$chatHistory.scrollTop(this.$chatHistory[0].scrollHeight);
        },
        getCurrentTime: function () {
            return new Date().toLocaleTimeString().
            replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3");
        },
        getRandomItem: function (arr) {
            return arr[Math.floor(Math.random() * arr.length)];
        }

    };

    chat.init();

    var searchFilter = {
        options: {
            valueNames: ['name']
        },
        init: function () {
            var userList = new List('people-list', this.options);
            var noItems = $('<li id="no-items-found">No items found</li>');

            userList.on('updated', function (list) {
                if (list.matchingItems.length === 0) {
                    $(list.list).append(noItems);
                } else {
                    noItems.detach();
                }
            });
        }
    };

    searchFilter.init();

})();