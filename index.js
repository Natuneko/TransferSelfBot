const config = require("./config.json")
const { Client,WebhookClient } = require("discord.js-selfbot-v13");
const client = new Client({
    checkUpdate: false,
});

const webhookClient = new WebhookClient({
    url:config.transferTo
});

client.on("ready", async () => {
    console.log("Bot Start");
    console.log(`UserID: ${client.user.id}`);
    console.log(`UserName: ${client.user.username}`);
})

client.on("messageCreate", async message => {
    if(message.guildId == config.tranferFrom){

        for(const user in  message.mentions.users){
            message.content = message.content.replace(`<@${user.id}>`,`${"`"}@${user.username}${"`"}`); //ゴリ押し
        };

        for(const role in message.mentions.roles){
            message.content = message.content.replace(`<@&${role.id}>`,`${"`"}@${role.name}${"`"}`); //ゴリ押し
        };

        message.content = message.content.replace("@here","`@here`");
        message.content = message.content.replace("@everyone","`@everyone`");

        if(message.attachments.size){
            const files = message.attachments;
            for(const file in files){
                message.content += "\n"+file.url;
            };
        };

        if(message.channelId != config.mainRoom){
            message.content += " - "+message.channel.name
        };

        webhookClient.send({
            avatarURL:message.author.avatarURL({format:"png"}),
            username:message.author.username,
            content:message.content,
        });
    };
});

client.login(config.token);