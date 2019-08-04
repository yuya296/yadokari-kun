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
                            { type: "message", label: "軽食", text: "軽食" },
                            { type: "message", label: "がっつり", text: "ごはん" },
                            { type: "message", label: "飲み物", text: "飲み物" },
                            { type: "message", label: "スイーツ", text: "スイーツ" }
                        ]
                    }
                },
                // parser: async (value, bot, event, context) => {
                //     console.log('called parser: ' + value);
                //     if (["軽食", "ごはん", "飲み物", "スイーツ"].includes(value)) {
                //         return value;
                //     }
                //     return new Error();
                // },
                // reaction: async (error, value, bot, event, context) => {
                //     console.log('called reaction' + value);
                //     if (error) return;
                //     bot.queue({
                //         type: "text",
                //         text: `わかった！${value}が買えるお店を探すね！`
                //     });
                // },
                parser: async (value, bot, event, context) => {
                    if (["軽食", "ごはん", "飲み物", "スイーツ"].includes(value)) {
                        return value;
                    }

                    throw new Error();
                },
                reaction: async (error, value, bot, event, context) => {
                    if (error) return;

                    bot.queue({
                        type: "text",
                        text: `わかった！！${value}が買えるお店を探すね。`
                    });
                }
            }

        };
    }

    async finish(bot, event, context) {
        // await bot.reply({
        //     type: "text",
        //     text: `またいつでも呼んでね！`
        // });


        await bot.reply(this.create_msg(context.confirmed.genre));


    }


    create_msg(genre) {
        let json;
        let msg;
        switch(genre) {
            case '食事':
                json = require('../db/mogiten/food.json');
                break;
            case '軽食':
                json = require('../db/mogiten/light.json');
                break;                
        }

        if (json) {
            let columns = [];
            Object.keys(json).forEach(key => {
                columns.push({
                    title: key.name,
                    text: key.description,
                    actions: [
                        {type: "uri", label: "詳細", uri: "https://google.com/"}
                    ]
                });
            });

            console.log("columns: " + columns);

            msg = {
                type: "carousel",
                columns: columns,
            };
        } else {
            msg = {
                type: "text",
                text: "お店が見つからないよう！"
            };
        }

        return msg;
        
    }

    
};