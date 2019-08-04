'use strict';

module.exports = class SkillSearchShop {
    
    constructor() {
        this.required_parameter = {
            genre: {
                message_to_confirm: {
                    type: "template",
                    altText: "何を食べたい気分？",
                    template: {
                        type: "buttons",
                        text: "今の気分は？",
                        actions: [
                            {type: "message", label: "甘いもの", text: "かき氷"},
                            {type: "message", label: "しょっぱいもの", text: "ホットドッグ"}
                        ]
                    }
                }
            },
            parser: async (value, bot, event, context) => {
                return value;
            },
            reaction: async (error, value, bot, event, context) => {
                if (error) return;
                bot.queue({
                    type: "text",
                    text: `わかった！${value}を探すね！`
                });
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