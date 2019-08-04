'use strict';

module.exports = class SkillSearchShop {
    
    constructor() {
        this.required_parameter = {
            genre: {
                message_to_confirm: {
                    type: "template",
                    altText: "お店を検索するね！何を食べたい気分？",
                    template: {
                        type: "buttons",
                        text: "今の気分は？",
                        actions: [
                            {type: "message", label: "軽食", text: "軽食"},
                            {type: "message", label: "がっつり", text: "ごはん"},
                            {type: "message", label: "飲み物", text: "飲み物"},
                            {type: "message", label: "スイーツ", text: "スイーツ"}
                        ]
                    }
                },
                parser: async (value, bot, event, context) => {
                    console.log('called parser: ' + value);
                    if (["軽食", "ごはん", "飲み物", "スイーツ"].includes(value)) {
                        return value;
                    }
                    return new Error();
                },
                reaction: async (error, value, bot, event, context) => {
                    console.log('called reaction' + value);
                    if (error) return;
                    bot.queue({
                        type: "text",
                        text: `わかった！${value}が買えるお店を探すね！`
                    });
                }
            }
                      
        };
    }

    async finish(bot, event, context) {
        await bot.reply({
            type: "text",
            text: `またいつでも呼んでね！`
        });
    }
};