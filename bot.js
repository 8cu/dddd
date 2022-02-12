const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');
const moment = require('moment');
const cnfg = JSON.parse(fs.readFileSync('./config.json', 'utf8'));
const price = require('./Settings/price');
const { color, prefix} = require('./Settings/settings');
const db = require("pro.db");
const disbut = require("discord-buttons")
disbut(client) 
const { MessageButton, MessageActionRow } = require("discord-buttons");
const { MessageMenuOption, MessageMenu } = require("discord-buttons");
////////////
require('dotenv').config()
const owner_id = "543833811637633024"

var statuss = [`${prefix}help`,"dev: Shadow"]
var secound = 5; 
client.on("ready", () =>{
    var shadow = `-------> .${client.user.tag} Started succesfuly with no problems. <-------`
    var Z2p = [{
        Bot: client.user.tag,
        Servers: client.guilds.cache.size,
        Channels: client.channels.cache.size
    }]
    console.log(shadow)
    console.table(Z2p)
    //////////////////////////////////////////////////////
    var timeing = Math.floor(secound*1000);
    setInterval(function(){
        var ammount = statuss.length;
        var num = Math.floor(Math.random() * ammount);
        client.user.setActivity(statuss[num], {type: 'PLAYING', url: 'https://www.twitch.tv/ZombieX'})
    }, timeing)
});


client.on("message", message => {
  if (message.content.toLowerCase() === prefix + "ping") {
   if (!message.channel.guild) return;
   let start = Date.now();
    message.channel.send({ embed: new Discord.MessageEmbed().setColor(color).setDescription(`Time Take : ${Date.now() - start}ms \nPing : ${client.ws.ping}`) })
  }
});


client.on('message', shadow => {
  var args = shadow.content.split(' ').slice('1').join(" ")
  if(shadow.content.startsWith(prefix + "say")){
    shadow.delete();
 if(shadow.author.bot || !shadow.guild) return shadow.reply("this command for server only")
 if(!shadow.member.hasPermission("MANAGE_GUILD")) return shadow.channel.reply("you dont have a permission")
    shadow.channel.send(args)
  }
})

client.on('message', message => {
if (message.author.bot) return;
if (!message.content.startsWith(prefix)) return;
let command = message.content.split(" ")[0];
command = command.slice(prefix.length);
let MADE = message.content.split(" ");
let BY = message.content.split(" ");
let BESHO = message.content.split(" ").slice(2);
if (command === "embed") {
    if (!BY[1])
      return message.channel.send(`> :x: **Usage: ${prefix}embed \`(image-link)\` \`(description)\` **\n error image link not found لا يمكننى العثور على صوره`).catch(console.error);
    if (!BESHO[0])
      return message.channel.send(`> :x: **Usage: ${prefix}embed \`(image-link)\` \`(description)\` **\n error i can't find description لا يمكننى العثور على وصف`).catch(console.error);
    message.delete()
  message.channel.send(new Discord.MessageEmbed().setDescription(`${BESHO.join(" ")}`).setImage(`${BY[1]}`).setColor(color)).catch(console.error);
}
});


client.on("message", async message => {

  if (message.content.toLowerCase() === prefix + "profile") {
  if (!message.channel.guild) return;
    message.channel.startTyping();

    setTimeout(() => {

      message.channel.stopTyping();

    })
    message.channel.send(`https://api.probot.io/profile/${message.author.id}`)
    // message.channel.send({

    //     files: [

    //       {

    //         name: "profile.png",

    //         attachment: `https://api.probot.io/profile/${message.author.id}`

    //       }

    //     ]

    //   })

  }

});
/////////////////////////////
client.on("message", message => {
  if (message.content.toLowerCase() === prefix + "bans") {
  if (!message.channel.guild) return;
if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('❌|**\`ADMINISTRATOR\`لا توجد لديك رتبة`**');    
    message.guild
      .fetchBans()
      .then(bans => message.channel.send(`**\`${bans.size}\` Bans**`))
      .catch(error => {
        message.channel.send(error.message);
      });
  }
});


///////////Code dreba
client.on("message", message => {
    if (!message.channel.guild) return;  
    let args = message.content.split(" ").slice(1).join(" ");
    if (!message.content.startsWith(prefix)) return;
    if (message.content.toLowerCase().startsWith(prefix + "tax")) {
    if (args.endsWith("m")) args = args.replace(/m/gi, "") * 1000000;
    else if (args.endsWith("k")) args = args.replace(/k/gi, "") * 1000;
    let args2 = parseInt(args)
    let tax = Math.floor(args2 * (20) / (19) + (1))
    let tax2 = Math.floor(args2 * (20) / (19) + (1)-(args2))
    let tax3 = Math.floor(tax2 * (20) / (19) + (1))
    let tax4 = Math.floor(tax2 + tax3 + args2)
    if(!args) return message.reply('** حط المبلغ**')
    let embed = new Discord.MessageEmbed()
    .setColor(color)
    .addFields(
      {
      name:"Tax:", value:`${tax}`
 
      },
      {
      name:"Mid:", value:`${tax4}`
 
      })
    .setFooter(`By  : ${message.author.username}`, `${message.author.displayAvatarURL()}`)
    .setThumbnail(message.author.displayAvatarURL())
    .setTimestamp()
 
        message.channel.send(embed)
    }
});

client.on("message", message => {
  if (message.content.startsWith(prefix + "setnick")) {
    if (!message.guild.member(message.author).hasPermission("MANAGE_NICKNAMES"))
      return pingmessage.channel.send("Please Check Your Permission.");
    if (!message.guild.member(client.user).hasPermission("MANAGE_NICKNAMES"))
      return message.channel.send("Please Check My Permission.");
    let user = message.mentions.users.first();
    
    if (!user) return message.channel.send(`**>>> ${prefix}nick @mention nickname**`);
    let args = message.content
      .split(" ")
      .slice(2)
      .join(" ");
    if (!args)
      message.guild
        .member(user)
        .setNickname("")
        .then(m => {
          message.channel.send(
            " " + user.username + " has been reseted nickname "
          );
        })
        .catch(error => {
          message.channel.send("Error: **" + error.message + "**");
        });
    message.guild
      .member(user)
      .setNickname(args)
      .then(m => {
        let embed = new Discord.MessageEmbed()
          .setTitle("Nicknamed User!")
          .setColor(color)
          .setDescription(
            "User: ```" +
              user.username +
              "```\nBy: ```" +
              message.author.username +
              "```\nNickname: ```" +
              args +
              "``` "
          );
        message.channel.send(embed);
      })
      .catch(error => {
        message.channel.send("Error: **" + error.message + "** ");
      });
  }
});
client.on('message', message => {
    if (message.content=== `${prefix}avatar` || message.content=== `${prefix}a` || message.content=== `avatar` || message.content=== `a`) {
         if (!message.channel.guild) return; 
      var user = message.mentions.users.first() || message.author
      if (!user) return ('**❌ Error**')
      let abdel = new Discord.MessageEmbed()
        .setTitle('Avatar Link')
        .setURL(user.displayAvatarURL({ size: 2048, dynamic: true }))
        .setColor(color)
        .setImage(user.avatarURL({ size: 512, dynamic: true }))
        .setFooter(`Requested By ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
        .setAuthor(user.tag, user.displayAvatarURL({ dynamic: true }))
      message.channel.send(abdel).then(m => {
        console.log('Successfully Avatar Sent To The Requester ✅')
      }).catch(() => {
        return console.log('❌ Something Went Wrong')
      })
    }
});

//////////////CLEAR//////////////
client.on("message", async message => {
    let command = message.content.toLowerCase().split(" ")[0];
    command = command.slice(prefix.length);
    if (command == "clear" || command == "مسح") {
        message.delete({ timeout: 0 })
        if (!message.channel.guild) return message.reply(`** This Command For Servers Only !**`);
        if (!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send(`> ** You don't have permissions MANAGE_GUILD ❌**`);
        if (!message.guild.member(client.user).hasPermission('MANAGE_GUILD')) return message.channel.send(`> ** I don't have permissions MANAGE_GUILD ❌**`);
        let args = message.content.split(" ").slice(1)
        let messagecount = parseInt(args);
        if (args > 100) return message.channel.send(
            new Discord.MessageEmbed()
            .setDescription(`الحد الاقصى 100 رسالة`)
            .setColor(color)
        ).then(messages => messages.delete({ timeout: 1000 }))
        if (!messagecount) messagecount = '100';
        message.channel.messages.fetch({ limit: 100 }).then(messages => message.channel.bulkDelete(messagecount)).then(msgs => {
            message.channel.send(
                    (`\`\`\`js
${msgs.size} message has been deleted.\`\`\``)
            ).then(messages =>
                messages.delete({ timeout: 1000 }));
        })
    }
});

client.on("message", message => {
  if (message.content.toLowerCase() === prefix + "lock" || message.content.toLowerCase() === prefix + "قفل" || message.content.toLowerCase() === "اقفل") {
   if (!message.channel.guild) return;    
    if (!message.channel.guild || message.author.bot) return;
    if (!message.member.hasPermission("MANAGE_MESSAGES"))
      return message.channel
        .send("**Please Check Your Permssion**")
        .then(m => m.delete({ timeout: 5000 }));
    message.channel.updateOverwrite(message.guild.id, { SEND_MESSAGES: false });
    let lock = new Discord.MessageEmbed()
    .setColor(color)
    message.channel.send(`🔒 <#${message.channel.id}> **has been locked.**`);
  }
  if (message.content.toLowerCase() === prefix + "unlock" || message.content.toLowerCase() === prefix + "فتح" || message.content.toLowerCase() === "افتح") {
    if (!message.channel.guild || message.author.bot) return;
    if (!message.member.hasPermission("MANAGE_MESSAGES"))
      return message.channel
        .send("**Please Check Your Permssion**")
        .then(m => m.delete({ timeout: 5000 }));
    message.channel.updateOverwrite(message.guild.id, { SEND_MESSAGES: true });
    let unlock = new Discord.MessageEmbed()
    message.channel.send(`🔓 <#${message.channel.id}> **has been unlocked.**`);
  }
});

client.on("message", async (message) => {
  if (message.author.bot || !message.guild || !message.content.startsWith(prefix)) return;
  const args = message.content.slice(prefix.length).trim().split(/ +/), commandName = args.shift().toLowerCase();
  if (["ban", "kick"].includes(commandName)) {
    let mode = commandName;
    if (!message.member.hasPermission(mode == "kick" ? "KICK_MEMBERS" : "BAN_MEMBERS")) return message.channel.send("**❌ | You don't have Permissions do to this.**");
    let user = message.guild.member(message.mentions.users.first() || message.guild.members.cache.find(x => x.id == args[0]));
    if (!user) return message.channel.send("**❌ | Member not found!**");
    let bot = message.guild.member(client.user);
    if (user.user.id == client.user.id) return message.channel.send("lol no");
    if (user.user.id == message.guild.owner.id) return message.channel.send(`**:x: | You can't ${mode} the owner!**`);
    if (user.roles.highest.position >= message.member.roles.highest.position && message.author.id !== message.guild.ownerID) return message.channel.send(`**:x: | You can't ${mode} people higher ranked than yourself!**`);
    if (user.roles.highest.position >= bot.roles.highest.position) return message.channel.send(`**:x: | I can't ${mode} people who are higher ranked than me!**`);
    if (!user[`${mode == "ban" ? "bann" : mode}able`]) return message.channel.send(`**:x: | Specified user is not ${mode}able.**`);
    user[mode](mode == "ban" ? { days: 7, reason: `Banned by ${message.author.tag}` } : `Kicked by ${message.author.tag}`)
      .then(() => message.channel.send(`**✅ ${mode == "ban" ? "Bann" : mode}ed __${user.user.tag}__ (ID: \`${user.user.id}\`)**`))
      .catch(console.error);
  }
});



client.on('message', async message => {
        if (message.content.toLowerCase() === prefix + "user") {
      if (!message.channel.guild) return;    
let user = message.mentions.users.first() || client.users.cache.get(message.content.split(' ')[1]) || message.author;

        var userInvites = message.guild.fetchInvites().then(invites => invites.find(invite => invite.inviter.id === user));

        var useAmount = userInvites.uses;

          let user1 = new Discord.MessageEmbed()
          .setColor(color)

 .addField(`**Joined Discord:**`, ` \`${moment(user.createdTimestamp).format('YYYY/MM/DD h:mm')}\`
**${moment(user.createdTimestamp).fromNow()}**`, true)

.addField(`**Joined server:**`,
 `\`\`${moment(message.guild.member(user).joinedAt).format('YYYY/MM/DD h:mm')}\`\`
**${moment(message.guild.member(user).joinedTimestamp).fromNow()} ** `, true)

//.addField("**Status:**", ` \`\`${message.guild.member(user).presence.status}\`\``, true)

.setThumbnail(user.avatarURL({ dynamic: true, size: 1024 }))

.setFooter(`${message.author.tag}`, message.author.avatarURL({dynamic:true}))



message.channel.send(user1); 
  }
});

 client.on("message", message => {
      if (!message.channel.guild) return;

      if (message.content === prefix + "ls") {
      if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('❌|**\`ADMINISTRATOR\`لا توجد لديك رتبة`**');  
        if (!message.channel.guild) return;          
        var list_all = [];
        message.guild.members.cache.forEach(bb => {
          if (!bb.user.bot) return;
          list_all.push(`<@${bb.user.id}>`);
        });
        message.channel.send(list_all.join(", "));
      }
    });


///////////////////////////////////////


client.on('message' , message => {
let user = message.mentions.users.first()|| client.users.cache.get(message.content.split(' ')[1])
if(message.content.startsWith(prefix + 'unban')) {
      if (!message.channel.guild) return;      
if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('❌|**\`ADMINISTRATOR\`لا توجد لديك رتبة`**');
if(!user) return  message.channel.send(`:face_with_monocle: - I can't find this member id`);
message.guild.unban(user);
message.guild.owner.send(`>>> لقد تم فك الباند عن الشخص \n ${user} \n By : <@${message.author.id}>`)
var embed = new Discord.MessaeEmbed()
.setThumbnail(message.author.avatarURL())
.setColor("RANDOM")
.setTitle('**>>> Unban** !')
.addField('**>>> User Unban :** ', `${user}` , true)
.addField('**>>> By :**' ,       ` <@${message.author.id}> ` , true)
.setAuthor(message.guild.name)
message.channel.send(embed)
}});

/////////////////////

client.on("message", message => {
  if(message.content === `${prefix}server`) {
      if (!message.channel.guild) return;        
    let server = new Discord.MessageEmbed()
      .setFooter(message.author.username, message.author.displayAvatarURL())
      .setTimestamp()
      .setColor(color)
      .addField("👑 Owned By:", "<@" + message.guild.owner + "> (🆔 :\`" + message.guild.owner.id + "\`)", false)
      .addField("📆 Create Date:", "" + moment(message.guild.createdTimestamp).format("YYYY/M/D HH:mm:ss") + " ", true)
      .addField("💬 Channels:", " `# " + message.guild.channels.cache.filter(m => m.type === 'text').size + "` `🔊 " + message.guild.channels.cache.filter(m => m.type === 'voice').size + "`", true)
      .addField("👥 Members", `\` ${message.guild.memberCount}/${message.guild.members.cache.filter(m => m.presence.status !== "offline").size} Online \``, true)
      .addField("💤 AfkChannel", `\`AfkChannel: ${message.guild.afkChannel || "Empty"}\nAfkTime: ${message.guild.afkTimeout}\` `, true)
      .addField("🌍 Region", `\`${message.guild.region}\``, true)
      .addField("✅ Verification", `\`${message.guild.verificationLevel}\``, true)
      .addField("⚙️ SystemChannel", `\`SystemChannel:\` ${message.guild.systemChannel || "Empty"}`, true)
      .addField("🔐 More", `\`Roles: ${message.guild.roles.cache.size}\nEmojis: ${message.guild.emojis.cache.size}\` `, true)
      .addField("✨ Premium", `\`Boosts: ${message.guild.premiumSubscriptionCount}/3\``, true)
    message.channel.send(server)
  }
})


client.on('message', message =>{
    if(message.content === prefix +"hide"){
       if (!message.channel.guild) return;         
    if(!message.member.hasPermission('MANAGE_CHANNELS')) return message.reply(' ** You dont have `MANAGE_CHANNELS` permission **');
    let everyone = message.guild.roles.cache.find(shadow => shadow.name === '@everyone');
            message.channel.createOverwrite(everyone, {
                  VIEW_CHANNEL : false
                }).then(() => {
                    const embed = new Discord.MessageEmbed()
                    .setTitle(`Hide Command`)                
                    .setColor(color)
                   //.setThumbnail(message.guild.iconURL())
                    .setDescription(`Channel Hided Successfully ! ✅`)
                    //.setFooter(`By ${message.author.username}`)
                    .setFooter(`Dev By: Shadow`)
                    message.channel.send(embed)
                    })
    }
});

client.on('message', message =>{
    if(message.content === prefix +"show"){
      if (!message.channel.guild) return;    
    if(!message.member.hasPermission('MANAGE_CHANNELS')) return message.reply(' ** You dont have `MANAGE_CHANNELS` permission **');
    let everyone = message.guild.roles.cache.find(Shadow => Shadow.name === '@everyone');
            message.channel.createOverwrite(everyone, {
                   VIEW_CHANNEL: true
                }).then(() => {
                    const embed = new Discord.MessageEmbed()
                    .setTitle(`Show Command`)
                    .setColor(color)
                    //.setThumbnail(message.guild.iconURL())
                    .setDescription(`Channel Showed Successfully ! ✅`)
                    .setFooter(`Dev By: Shadow`)
                    //.setFooter(`By ${message.author.username}`)
                    message.channel.send(embed)
                    })
    }
});


client.on("message", function(message) {
    if (message.author.bot) return;
  if (message.content.startsWith(prefix + 'setname')){
  if (!message.channel.guild) return;    
  if(message.author.id !== owner_id) return;  
  var args = message.content.split(" ").slice(1).join(" ");
  client.user.setUsername(args);
  const embed = new Discord.MessageEmbed()
  .setTitle(`Done New Name is \`${args}\` `)
  .setColor(color)
  message.channel.send(embed)
  }
});

client.on("message",message=>{
    if (message.author.bot) return;
    if (!message.channel.guild) return;
  if(message.content.startsWith(prefix+"setavatar")){
  if (!message.channel.guild) return;     
    if(message.author.id !== owner_id) return;
    let args = message.content.split(" ").slice(1).join(" ");
    if(!args) return;
    client.user.setAvatar(args)
  const embed = new Discord.MessageEmbed()
  .setTitle(`✅ : Done New Avatar`)
  .setImage(`${args}`)
  .setColor(color)
  message.channel.send(embed)
  }
});



client.on('message', msg => {
    if (msg.content === prefix + 'createcolors') {
    if (!msg.channel.guild) return;   
    if (!msg.member.hasPermission("ADMINISTRATOR")) return msg.reply('**You dont have `ADMINISTRATOR` permission **');
        msg.guild.roles.create({
            data: {
                name: "1",
                color: "#FFB6C1",
                permissions: []
            }
        })
        msg.guild.roles.create({
            data: {
                name: "2",
                color: "#FFC0CB",
                permissions: []
            }
        })
        msg.guild.roles.create({
            data: {
                name: "3",
                color: "#FF69B4",
                permissions: []
            }
        })
        msg.guild.roles.create({
            data: {
                name: "4",
                color: "#FF1493",
                permissions: []
            }
        })
        msg.guild.roles.create({
            data: {
                name: "5",
                color: "#DB7093",
                permissions: []
            }
        })
        msg.guild.roles.create({
            data: {
                name: "6",
                color: "#C71585",
                permissions: []
            }
        })
        msg.guild.roles.create({
            data: {
                name: "7",
                color: "#E6E6FA",
                permissions: []
            }
        })
        msg.guild.roles.create({
            data: {
                name: "8",
                color: "#D8BFD8",
                permissions: []
            }
        })
        msg.guild.roles.create({
            data: {
                name: "8",
                color: "#DDA0DD",
                permissions: []
            }
        })
        msg.guild.roles.create({
            data: {
                name: "9",
                color: "#DA70D6",
                permissions: []
            }
        })
        msg.guild.roles.create({
            data: {
                name: "10",
                color: "#EE82EE",
                permissions: []
            }
        })
        msg.guild.roles.create({
            data: {
                name: "11",
                color: "#FF00FF",
                permissions: []
            }
        })
        msg.guild.roles.create({
            data: {
                name: "12",
                color: "#BA55D3",
                permissions: []
            }
        })
        msg.guild.roles.create({
            data: {
                name: "13",
                color: "#9932CC",
                permissions: []
            }
        })
        msg.guild.roles.create({
            data: {
                name: "14",
                color: "#9400D3",
                permissions: []
            }
        })
        msg.guild.roles.create({
            data: {
                name: "15",
                color: "#8A2BE2",
                permissions: []
            }
        })
        msg.guild.roles.create({
            data: {
                name: "16",
                color: "#8B008B",
                permissions: []
            }
        })
        msg.guild.roles.create({
            data: {
                name: "17",
                color: "#800080",
                permissions: []
            }
        })
        msg.guild.roles.create({
            data: {
                name: "18",
                color: "#9370DB",
                permissions: []
            }
        })
        msg.guild.roles.create({
            data: {
                name: "19",
                color: "#7B68EE",
                permissions: []
            }
        })
        msg.guild.roles.create({
            data: {
                name: "20",
                color: "#6A5ACD",
                permissions: []
            }
        })
        msg.guild.roles.create({
            data: {
                name: "21",
                color: "#483D8B",
                permissions: []
            }
        })
        msg.guild.roles.create({
            data: {
                name: "22",
                color: "#663399",
                permissions: []
            }
        })
        msg.guild.roles.create({
            data: {
                name: "23",
                color: "#4B0082",
                permissions: []
            }
        })
        msg.guild.roles.create({
            data: {
                name: "24",
                color: "#FFA07A",
                permissions: []
            }
        })
        msg.guild.roles.create({
            data: {
                name: "25",
                color: "#FA8072",
                permissions: []
            }
        })
        msg.guild.roles.create({
            data: {
                name: "26",
                color: "#E9967A",
                permissions: []
            }
        })
        msg.guild.roles.create({
            data: {
                name: "27",
                color: "#F08080",
                permissions: []
            }
        })
        msg.guild.roles.create({
            data: {
                name: "28",
                color: "#CD5C5C",
                permissions: []
            }
        })
        msg.guild.roles.create({
            data: {
                name: "29",
                color: "#DC143C",
                permissions: []
            }
        })
        msg.guild.roles.create({
            data: {
                name: "30",
                color: "    #FF0000",
                permissions: []
            }
        })
        msg.guild.roles.create({
            data: {
                name: "31",
                color: "#B22222",
                permissions: []
            }
        })
        msg.guild.roles.create({
            data: {
                name: "32",
                color: "#8B0000",
                permissions: []
            }
        })
        msg.guild.roles.create({
            data: {
                name: "33",
                color: "#FFA500",
                permissions: []
            }
        })
        msg.guild.roles.create({
            data: {
                name: "34",
                color: "#FF8C00",
                permissions: []
            }
        })
        msg.guild.roles.create({
            data: {
                name: "35",
                color: "#FF7F50",
                permissions: []
            }
        })
        msg.guild.roles.create({
            data: {
                name: "36",
                color: "#FF6347",
                permissions: []
            }
        })
        msg.guild.roles.create({
            data: {
                name: "37",
                color: "#FF4500",
                permissions: []
            }
        })
        msg.guild.roles.create({
            data: {
                name: "38",
                color: "#FFD700",
                permissions: []
            }
        })
        msg.guild.roles.create({
            data: {
                name: "39",
                color: "#FFFFE0",
                permissions: []
            }
        })
        msg.guild.roles.create({
            data: {
                name: "40",
                color: "#FFFACD",
                permissions: []
            }
        })
        msg.guild.roles.create({
            data: {
                name: "41",
                color: "#FAFAD2",
                permissions: []
            }
        })
        msg.guild.roles.create({
            data: {
                name: "42",
                color: "    #FFEFD5",
                permissions: []
            }
        })
        msg.guild.roles.create({
            data: {
                name: "43",
                color: "#FFE4B5",
                permissions: []
            }
        })
        msg.guild.roles.create({
            data: {
                name: "44",
                color: "#FFDAB9",
                permissions: []
            }
        })
        msg.guild.roles.create({
            data: {
                name: "45",
                color: "#EEE8AA",
                permissions: []
            }
        })
        msg.guild.roles.create({
            data: {
                name: "46",
                color: "#F0E68C",
                permissions: []
            }
        })
        msg.guild.roles.create({
            data: {
                name: "47",
                color: "#BDB76B",
                permissions: []
            }
        })
        msg.guild.roles.create({
            data: {
                name: "48",
                color: "#ADFF2F",
                permissions: []
            }
        })
        msg.guild.roles.create({
            data: {
                name: "49",
                color: "#7FFF00",
                permissions: []
            }
        })
        msg.guild.roles.create({
            data: {
                name: "50",
                color: "#7CFC00",
                permissions: []
            }
        })
        msg.guild.roles.create({
            data: {
                name: "51",
                color: "#00FF00",
                permissions: []
            }
        })
 
        msg.guild.roles.create({
            data: {
                name: "52",
                color: "#32CD32",
                permissions: []
            }
        })
        msg.guild.roles.create({
            data: {
                name: "53",
                color: "#98FB98",
                permissions: []
            }
        })
        msg.guild.roles.create({
            data: {
                name: "54",
                color: "#90EE90",
                permissions: []
            }
        })
        msg.guild.roles.create({
            data: {
                name: "55",
                color: "#00FA9A",
                permissions: []
            }
        })
        msg.guild.roles.create({
            data: {
                name: "56",
                color: "#00FF7F",
                permissions: []
            }
        })
        msg.guild.roles.create({
            data: {
                name: "57",
                color: "#3CB371",
                permissions: []
            }
        })
        msg.guild.roles.create({
            data: {
                name: "58",
                color: "#2E8B57",
                permissions: []
            }
        })
        msg.guild.roles.create({
            data: {
                name: "59",
                color: "#2E8B57",
                permissions: []
            }
        })
        msg.guild.roles.create({
            data: {
                name: "60",
                color: "#008000",
                permissions: []
            }
        })
        msg.guild.roles.create({
            data: {
                name: "61",
                color: "#006400",
                permissions: []
            }
        })
        msg.guild.roles.create({
            data: {
                name: "62",
                color: "#9ACD32",
                permissions: []
            }
        })
        msg.guild.roles.create({
            data: {
                name: "63",
                color: "#6B8E23",
                permissions: []
            }
        })
        msg.guild.roles.create({
            data: {
                name: "64",
                color: "#556B2F",
                permissions: []
            }
        })
        msg.guild.roles.create({
            data: {
                name: "65",
                color: "#66CDAA",
                permissions: []
            }
        })
        msg.guild.roles.create({
            data: {
                name: "66",
                color: "#8FBC8F",
                permissions: []
            }
        })
        msg.guild.roles.create({
            data: {
                name: "67",
                color: "#20B2AA",
                permissions: []
            }
        })
        msg.guild.roles.create({
            data: {
                name: "68",
                color: "#008B8B",
                permissions: []
            }
        })
        msg.guild.roles.create({
            data: {
                name: "69",
                color: "#008080",
                permissions: []
            }
        })
        msg.guild.roles.create({
            data: {
                name: "70",
                color: "#00FFFF",
                permissions: []
            }
        })
        msg.guild.roles.create({
            data: {
                name: "71",
                color: "#E0FFFF",
                permissions: []
            }
        })
        msg.guild.roles.create({
            data: {
                name: "72",
                color: "#AFEEEE",
                permissions: []
            }
        })
        msg.guild.roles.create({
            data: {
                name: "73",
                color: "#7FFFD4",
                permissions: []
            }
        })
        msg.guild.roles.create({
            data: {
                name: "74",
                color: "#40E0D0",
                permissions: []
            }
        })
        msg.guild.roles.create({
            data: {
                name: "75",
                color: "#48D1CC",
                permissions: []
            }
        })
        msg.guild.roles.create({
            data: {
                name: "76",
                color: "#00CED1",
                permissions: []
            }
        })
        msg.guild.roles.create({
            data: {
                name: "77",
                color: "#5F9EA0",
                permissions: []
            }
        })
        msg.guild.roles.create({
            data: {
                name: "78",
                color: "#4682B4",
                permissions: []
            }
        })
        msg.guild.roles.create({
            data: {
                name: "79",
                color: "#B0C4DE",
                permissions: []
            }
        })
        msg.guild.roles.create({
            data: {
                name: "80",
                color: "#ADD8E6",
                permissions: []
            }
        })
        msg.guild.roles.create({
            data: {
                name: "81",
                color: "#B0E0E6",
                permissions: []
            }
        })
        msg.guild.roles.create({
            data: {
                name: "82",
                color: "#87CEFA",
                permissions: []
            }
        })
        msg.guild.roles.create({
            data: {
                name: "83",
                color: "#87CEEB",
                permissions: []
            }
        })
        msg.guild.roles.create({
            data: {
                name: "84",
                color: "#6495ED",
                permissions: []
            }
        })
        msg.guild.roles.create({
            data: {
                name: "85",
                color: "#00BFFF",
                permissions: []
            }
        })
        msg.guild.roles.create({
            data: {
                name: "86",
                color: "#1E90FF",
                permissions: []
            }
        })
        msg.guild.roles.create({
            data: {
                name: "87",
                color: "#4169E1",
                permissions: []
            }
        })
        msg.guild.roles.create({
            data: {
                name: "88",
                color: "#0000FF",
                permissions: []
            }
        })
        msg.guild.roles.create({
            data: {
                name: "89",
                color: "#0000CD",
                permissions: []
            }
        })
        msg.guild.roles.create({
            data: {
                name: "90",
                color: "#00008B",
                permissions: []
            }
        })
        msg.guild.roles.create({
            data: {
                name: "91",
                color: "#000080",
                permissions: []
            }
        })
        msg.guild.roles.create({
            data: {
                name: "92",
                color: "#191970",
                permissions: []
            }
        })
        msg.guild.roles.create({
            data: {
                name: "93",
                color: "#FFF8DC",
                permissions: []
            }
        })
        msg.guild.roles.create({
            data: {
                name: "94",
                color: "#FFEBCD",
                permissions: []
            }
        })
        msg.guild.roles.create({
            data: {
                name: "95",
                color: "#FFE4C4",
                permissions: []
            }
        })
        msg.guild.roles.create({
            data: {
                name: "96",
                color: "#FFDEAD",
                permissions: []
            }
        })
        msg.guild.roles.create({
            data: {
                name: "97",
                color: "#F5DEB3",
                permissions: []
            }
        })
        msg.guild.roles.create({
            data: {
                name: "98",
                color: "#DEB887",
                permissions: []
            }
        })
        msg.guild.roles.create({
            data: {
                name: "99",
                color: "#D2B48C",
                permissions: []
            }
        })
        msg.guild.roles.create({
            data: {
                name: "100",
                color: "#BC8F8F",
                permissions: []
            }
        })
        msg.guild.roles.create({
            data: {
                name: "101",
                color: "#F4A460",
                permissions: []
            }
        })
        msg.guild.roles.create({
            data: {
                name: "102",
                color: "#DAA520",
                permissions: []
            }
        })
        msg.guild.roles.create({
            data: {
                name: "103",
                color: "#B8860B",
                permissions: []
            }
        })
        msg.guild.roles.create({
            data: {
                name: "104",
                color: "#CD853F",
                permissions: []
            }
        })
        msg.guild.roles.create({
            data: {
                name: "105",
                color: "#D2691E",
                permissions: []
            }
        })
        msg.guild.roles.create({
            data: {
                name: "106",
                color: "#808000",
                permissions: []
            }
        })
        msg.guild.roles.create({
            data: {
                name: "107",
                color: "#8B4513",
                permissions: []
            }
        })
        msg.guild.roles.create({
            data: {
                name: "108",
                color: "#A0522D",
                permissions: []
            }
        })
        msg.guild.roles.create({
            data: {
                name: "109",
                color: "#A52A2A",
                permissions: []
            }
        })
        msg.guild.roles.create({
            data: {
                name: "110",
                color: "#800000",
                permissions: []
            }
        })
        msg.guild.roles.create({
            data: {
                name: "111",
                color: "#FFFFFF",
                permissions: []
            }
        })
        msg.guild.roles.create({
            data: {
                name: "112",
                color: "#FFFAFA",
                permissions: []
            }
        })
        msg.guild.roles.create({
            data: {
                name: "113",
                color: "#F0FFF0",
                permissions: []
            }
        })
        msg.guild.roles.create({
            data: {
                name: "114",
                color: "#F5FFFA",
                permissions: []
            }
        })
        msg.guild.roles.create({
            data: {
                name: "115",
                color: "#F0FFFF",
                permissions: []
            }
        })
        msg.guild.roles.create({
            data: {
                name: "116",
                color: "#F0F8FF",
                permissions: []
            }
        })
        msg.guild.roles.create({
            data: {
                name: "117",
                color: "#F8F8FF",
                permissions: []
            }
        })
        msg.guild.roles.create({
            data: {
                name: "118",
                color: "#F5F5F5",
                permissions: []
            }
        })
        msg.guild.roles.create({
            data: {
                name: "119",
                color: "#FFF5EE",
                permissions: []
            }
        })
        msg.guild.roles.create({
            data: {
                name: "120",
                color: "#F5F5DC",
                permissions: []
            }
        })
        msg.guild.roles.create({
            data: {
                name: "121",
                color: "#FDF5E6",
                permissions: []
            }
        })
        msg.guild.roles.create({
            data: {
                name: "122",
                color: "#FFFAF0",
                permissions: []
            }
        })
        msg.guild.roles.create({
            data: {
                name: "123",
                color: "#FFFFF0",
                permissions: []
            }
        })
        msg.guild.roles.create({
            data: {
                name: "124",
                color: "#FAEBD7",
                permissions: []
            }
        })
        msg.guild.roles.create({
            data: {
                name: "125",
                color: "#FAF0E6",
                permissions: []
            }
        })
        msg.guild.roles.create({
            data: {
                name: "126",
                color: "#FFF0F5",
                permissions: []
            }
        })
        msg.guild.roles.create({
            data: {
                name: "127",
                color: "#FFE4E1",
                permissions: []
            }
        })
        msg.guild.roles.create({
            data: {
                name: "128",
                color: "#DCDCDC",
                permissions: []
            }
        })
        msg.guild.roles.create({
            data: {
                name: "129",
                color: "#D3D3D3",
                permissions: []
            }
        })
        msg.guild.roles.create({
            data: {
                name: "130",
                color: "#C0C0C0",
                permissions: []
            }
        })
        msg.guild.roles.create({
            data: {
                name: "131",
                color: "#f7f7f7",
                permissions: []
            }
        })
        msg.guild.roles.create({
            data: {
                name: "132",
                color: "#b2b2b2",
                permissions: []
            }
        })
        msg.guild.roles.create({
            data: {
                name: "133",
                color: "#6f6c6c",
                permissions: []
            }
        })
        msg.guild.roles.create({
            data: {
                name: "134",
                color: "#4d4646",
                permissions: []
            }
        })
        msg.guild.roles.create({
            data: {
                name: "135",
                color: "#4c4c4c",
                permissions: []
            }
        })
        msg.guild.roles.create({
            data: {
                name: "136",
                color: "#2F4F4F",
                permissions: []
            }
        })
        msg.guild.roles.create({
            data: {
                name: "137",
                color: "#040000",
                permissions: []
            }
        })
        const embed1 = new Discord.MessageEmbed()
            .setTitle("🕑 **Preparing your server color rules ...**")
            .setColor(color)
            .setFooter(`Request By ${msg.author.username}`)
            .setTimestamp()
        const embed2 = new Discord.MessageEmbed()
            .setTitle("✅ **Your colors is ready**")
            .setColor(color)
            .setFooter(`Request By ${msg.author.username}`)
            .setTimestamp()
        msg.channel.send(embed1).then(m => {
            setTimeout(() => {
                m.delete()
                m.channel.send(embed2)
            }, 30000)
        })
    }
})






client.on("message", Message => {
    if (!Message.guild || Message.author.bot) return;
 if(Message.content === `${prefix}help`){
             let e2 = cnfg['emojis'].help;
    if (!Message.channel.guild) return; 
    	var gen = new Discord.MessageEmbed()
    	.setColor(color)
    	.setTitle(`✉️ General Commands`)
    	.setThumbnail(Message.author.avatarURL({dynamic: true}))
    	.setDescription(`
> ${prefix}**ping ${e2 || 'help'} لأظهار بنج البوت**       
> ${prefix}**user ${e2 || 'help'} لأظهار معلومات حسابك**         
> ${prefix}**profile ${e2 || 'help'} لاظهار بروفايلك**
> ${prefix}**tax ${e2 || 'help'} حسب ضريبة التحويل**
> ${prefix}**server ${e2 || 'help'} لأظهار معلومات سيرفر**
`)
      .setFooter(Message.author.tag, Message.author.avatarURL({dynamic: true}))
      var admin = new Discord.MessageEmbed()
      .setColor(color)
    	.setTitle(`🤖 Admin Commands`)
    	.setThumbnail(Message.author.avatarURL({dynamic: true}))
    	.setDescription(`
> ${prefix}**createcolors ${e2 || 'help'} لعمل رولات ألوان**  
> ${prefix}**setroom ${e2 || 'help'} تثبيت البوت في روم**     
> ${prefix}**clear ${e2 || 'help'} مسح الشات**
> ${prefix}**hide ${e2 || 'help'} لاخفاء الروم**
> ${prefix}**show ${e2 || 'help'} لأظهار الروم**
> ${prefix}**ban ${e2 || 'help'} تبنيد عضو**
> ${prefix}**unban ${e2 || 'help'} فك الباند عن عضو**
> ${prefix}**ls ${e2 || 'help'} لعرض قأمت البوتات** 
> ${prefix}**kick ${e2 || 'help'} طرد عضو**
> ${prefix}**lock ${e2 || 'help'} قفل شات**
> ${prefix}**unlock ${e2 || 'help'} فتح شات**
> ${prefix}**setnick ${e2 || 'help'} تغير اسمك بالسيرفر**
> ${prefix}**bans ${e2 || 'help'} لعرض قأمة الباند **   
`)
      .setFooter(Message.author.tag, Message.author.avatarURL({dynamic: true}))
  
        var Embed1 = new Discord.MessageEmbed().setColor(color).setTitle(`Help Commands`).setDescription(`Click :lock: to see protection commands\nClick 🤖 to see admin Commands.\nClick ✉️ to see protection commands`)
            .setThumbnail(Message.author.avatarURL({dynamic: true}))
            .setFooter(Message.author.tag, Message.author.avatarURL({dynamic: true}))
        Message.channel.send(Embed1).then(async (Msg) => {
            Msg.react("🔒").then(() => {
                Msg.react("🤖").then(() => {})
                   Msg.react("✉️").then(() => {})
                let xFilter = (reaction, user) => {
                    return reaction.emoji.name === "🤖" && user.id === Message.author.id;
                };
                let proFilter = (reaction, user) => {
                    return reaction.emoji.name === "🔒" && user.id === Message.author.id;
                };
                let gene = (reaction, user) => {
                    return reaction.emoji.name === "✉️" && user.id === Message.author.id;
                };
     
                let xCollect = Msg.createReactionCollector(xFilter, {
                    time: 1000 * 64
                });
                let proCollect = Msg.createReactionCollector(proFilter, {
                    time: 1000 * 64
                });
                let gene1 = Msg.createReactionCollector(gene, {
                    time: 1000 * 64
                });
        
                xCollect.on("collect", () => {
                    Msg.edit(admin);
                });
                proCollect.on("collect", () => {
                    var proEmbed = new Discord.MessageEmbed()
                    .setColor(color)
                        .setTitle(`Protection Commands`)
                        .setDescription(`3333333333`)
                        .setThumbnail(Message.author.avatarURL({dynamic: true}))
                        .setFooter(Message.author.tag, Message.author.avatarURL({dynamic: true}))
                    Msg.edit(proEmbed);
                })
                gene1.on("collect", () => {
                    Msg.edit(gen);
                });
                proCollect.on("collect", () => {
                    var proEmbed = new Discord.MessageEmbed()
                    .setColor(color)
                        .setTitle(`Protection Commands`)
                        .setDescription(`> ${prefix}**antibots on/off ${e2 || 'help'} مانع دخول بوتات**`)
                        .setThumbnail(Message.author.avatarURL({dynamic: true}))
                        .setFooter(Message.author.tag, Message.author.avatarURL({dynamic: true}))
                    Msg.edit(proEmbed);
                })

            })
        })
    }
})


client.on("message", function(message) {
 if(message.content === `${prefix}help owner`){
   //var emoji = `<a:5d:810972763601764363>`
                let e2 = cnfg['emojis'].help;
  if (!message.channel.guild) return;    
  if(message.author.id !== owner_id) return;  
  const embed = new Discord.MessageEmbed()
  .setTitle(`Developer Help`)
  .setDescription(`
  ${prefix}**setname ${e2 || 'help'} تغير اسم البوت** 
  ${prefix}**setavatar ${e2 || 'help'} تغير صوره البوت**
  ${prefix}**set-icon ${e2 || 'help'} تغير صوره السيرفر**
  ${prefix}**set-banner ${e2 || 'help'} تغير بنر السيرفر**
  ${prefix}**set-server-name ${e2 || 'help'} تغير اسم السيرفر**
  ${prefix}**say ${e2 || 'help'} لجعل البوت يرد ما تقول**
  ${prefix}**embed ${e2 || 'help'} لجعل البوت يرد ما تقول بايمبد**
  `)
  .setColor(color)
  message.channel.send(embed)
  }
});




client.on("message",async message => {
  if(!message.guild) return;
   let args = message.content.split(" ").slice(1).join(" ")
     if(message.content.startsWith(prefix + "set-icon")) {
         if(!message.guild.member(client.user).hasPermission('ADMINISTRATOR')) return;
        if(!message.guild.member(message.author).hasPermission('ADMINISTRATOR')) return;
            
            message.guild.setIcon(`${args}`)
              message.channel.send(`✅`)
 
   }
});
  
  
client.on("message",async message => {
  if(!message.guild) return;
   let args = message.content.split(" ").slice(1).join(" ")
     if(message.content.startsWith(prefix + "set-banner")) {
         if(!message.guild.member(client.user).hasPermission('ADMINISTRATOR')) return;
        if(!message.guild.member(message.author).hasPermission('ADMINISTRATOR')) return;
         if(!args.includes("//")) return message.channel.send(`❎ - Thats isn't real link`)
           message.guild.setBanner(`${args}`)
             message.channel.send(`✅`)
 
           
   }
});
 
client.on("message",async message => {
  if(!message.guild) return;
   let args = message.content.split(" ").slice(1).join(" ")
     if(message.content.startsWith(prefix + "set-server-name")) {
         if(!message.guild.member(client.user).hasPermission('ADMINISTRATOR')) return;
        if(!message.guild.member(message.author).hasPermission('ADMINISTRATOR')) return;
            message.guild.setName(`${args}`)
             message.channel.send(`✅`)
   }
});



client.on("message", async message => {
    if (message.author.bot) return;
    if (!message.channel.guild) return;
    if (message.guild.id != 908826429138042910) return;
    if (message.channel.id != 937533842389090334) return;
    let args = message.content
      .split(" ")
      .slice(0)
      .join(" "); if (message.author.bot) return;
      if (args.endsWith("m")) args = args.replace(/m/gi, "") * 1000000;
  else if (args.endsWith("k")) args = args.replace(/k/gi, "") * 1000;
    if (!message.guild) return;
      let args2 = parseInt(args)
      let tax = Math.floor(args2 * (20) / (19) + (1))
      let errorembed3 = new Discord.MessageEmbed()
      .setTitle(`**:information_source: Error**`)
      .setColor(color)
      .setDescription(`**It Must be a number**`)
      .setFooter(`${client.user.username}`);
      if (!args2) return message.reply(errorembed3);
      let errorembed2 = new Discord.MessageEmbed()
      .setTitle(`**:information_source: Error**`)
      .setColor(color)
      .setDescription(`**Must Be A Number**`)
      .setFooter(`${client.user.username}`);
      if (isNaN(args2)) return message.reply(errorembed2);
      let errorembed = new Discord.MessageEmbed()
      .setTitle(`**:information_source: Error**`)
      .setColor(color)
      .setDescription(`**Must The Number Larger 1**`)
      .setFooter(`${client.user.username}`);
      if (args2 < 1) return message.reply(errorembed);
  
     message.reply(tax);
  });




client.on("message", async message => {// نيترو
    if (message.author.bot) return;
    if (!message.channel.guild) return;
    if(message.content.startsWith("nitro")) {
        let embed = new Discord.MessageEmbed()
        .setTitle("Pubg Price:")
        .setDescription(`**
        Nitro gaming ✅ ${price.nitroC}

        Nitro classic ✅ ${price.nitroG}
        
        Nitro gaming 3 Months ✅ ${price.nitroG3m}
        **`)
        .setColor(color)
        message.channel.send(embed)
    }
});
client.on("message", async message => { // ببجي
    if (message.author.bot) return;
    if (!message.channel.guild) return;
    if(message.content.startsWith("pubg")) {
        let embed = new Discord.MessageEmbed()
        .setTitle("Pubg Price:")
        .setDescription(`**
        UC 

        UC
        
        UC
        **`)
        .setColor(color)
        message.channel.send(embed)
    }
});
client.on("message", async message => { // نتفلكس
    if (message.author.bot) return;
    if (!message.channel.guild) return;
    if(message.content.startsWith("netflix")) {
        let embed = new Discord.MessageEmbed()
        .setTitle("Netflix Price:")
        .setDescription(`**
        Netflix
        Netflix
        Netflix
        Netflix
        **`)
        .setColor(color)
        message.channel.send(embed)
    }
});
client.on("message", async message => { /// اسنتا
    if (message.author.bot) return;
    if (!message.channel.guild) return;
    if(message.content.startsWith("insta")) {
        let embed = new Discord.MessageEmbed()
        .setTitle("Insta Price:")
        .setDescription(`**
        Insta
        Insta
        Insta
        Insta
        **`)
        .setColor(color)
        message.channel.send(embed)
    }
});
client.on("message", async message => { /// اسبوتفاي 
    if (message.author.bot) return;
    if (!message.channel.guild) return;
    if(message.content.startsWith("spotify")) {
        let embed = new Discord.MessageEmbed()
        .setTitle("Spotify Price:")
        .setDescription(`**
        Spotify
        Spotify
        Spotify
        Spotify
        **`)
        .setColor(color)
        message.channel.send(embed)
    }
});
client.on("message", async message => { // ديزين
    if (message.author.bot) return;
    if (!message.channel.guild) return;
    if(message.content.startsWith("design")) { 
        let embed = new Discord.MessageEmbed()
        .setTitle("Design Price:")
        .setDescription(`**
        Design
        Design
        Design
        **`)
        .setColor(color)
        message.channel.send(embed)
    }
});

client.on("message", async message => { // كريدت
    if (message.author.bot) return;
    if (!message.channel.guild) return;
    if(message.content.startsWith("credit")) {
        let embed = new Discord.MessageEmbed()
        .setTitle("Credit Price:")
        .setDescription(`**
        credit
        credit
        credit
        credit
        **`)
        .setColor(color)
        message.channel.send(embed)
    }
});
client.on("message", async message => { /// بوت
    if (message.author.bot) return;
    if(message.content.startsWith("bot")) {
        let embed = new Discord.MessageEmbed()
        .setTitle("Bot Price:")
        .setDescription(`**
        Bot
        Bot
        Bot
        Bot
        **`)
        .setColor(color)
        message.channel.send(embed)
    }
});
client.on("message", async message => { /// تيك توك 
    if (message.author.bot) return;
    if (!message.channel.guild) return;
    if(message.content.startsWith("tiktok")) {
        let embed = new Discord.MessageEmbed()
        .setTitle("Tiktok Price:")
        .setDescription(`**
        Tiktok
        Tiktok
        Tiktok
        Tiktok
        **`)
        .setColor(color)
        message.channel.send(embed)
    }
});
client.on("message", async message => { // ديزين
    if (message.author.bot) return;
    if (!message.channel.guild) return;
    if(message.content.startsWith("vote")) { 
        let embed = new Discord.MessageEmbed()
        .setTitle("Vote Price:")
        .setDescription(`**
        Vote
        Vote
        Vote
        **`)
        .setColor(color)
        message.channel.send(embed)
    }
});



client.on("message", async message => {
    if (message.author.bot) return;
    if (!message.channel.guild) return;
    if(message.content.startsWith(prefix + "antibots on")) {
        await db.set(`guild_${message.guild.id}`, "on")
        message.channel
    .send({ embed: new Discord.MessageEmbed().setDescription("Loading....") })
    .then(function(m) {
      setTimeout(function() {
        m.edit({
          embed: new Discord.MessageEmbed().setDescription("**✅ `-` the antibote has been on**")
        });
      }, 1000);
    });
    }
});
client.on("message", async message => {
    if (message.author.bot) return;
    if (!message.channel.guild) return;
    if(message.content.startsWith(prefix + "antibots off")) {
        await db.delete(`guild_${message.guild.id}`)
        message.channel
    .send({ embed: new Discord.MessageEmbed().setDescription("Loading....") })
    .then(function(m) {
      setTimeout(function() {
        m.edit({
          embed: new Discord.MessageEmbed().setDescription("**✅ `-` the antibote has been off**")
        });
      }, 1000);
    });
    }
});
client.on("guildMemberAdd", member => {
    if(!db.get(`guild_${member.guild.id}`) === "on") return;
    if (member.user.bot) return member.kick()
});


client.on("message", async message => {
    if (message.author.bot) return;
    if (!message.channel.guild) return;
    if(message.content.startsWith(prefix + "check")) {
        if(db.get(`guild_${message.guild.id}`) === "on") return message.channel.send("**Done**");
    }
});



client.on("message", async message => {
    if(!message.author.bot) return;
    if(message.content.startsWith("اهلا")) {
        let embed = new Discord.MessageEmbed()
        .setAuthor(client.user.username , client.user.avatarURL())
        .setDescription(`**
        مــن فـضـلك اجــب عـلـي الاسـئلـه الـتالـيه <:txs1:940376873744080926> 

<a:917974254325223434:929265164744794142> إســمـك

<a:917974254325223434:929265164744794142> نــوع الـرول الــي بـتـقـدم عـليـها 

<a:917974254325223434:929265164744794142> إشـتـغـلت فـين قـبـل كـدا 

<a:917974254325223434:929265164744794142> ارســل 10  تقـيـيمـات مـن سـيـرفـرات مـخـتلـفه

        **`)
        .setImage("https://media.discordapp.net/attachments/928420013336035468/941124129380266055/756782631672086619.gif")
        .setColor(color)
        .setTimestamp()
        //.setThumbnail(message.guild.iconURL({dynamic:true}))
        .setFooter(message.guild.name, message.guild.iconURL({dynamic:true}));
        setTimeout(function(){
            message.channel.send(embed)
        }, 2000);
    }
});
client.on("message", async message => {
    if (!message.author.bot) return;
    if(message.content.startsWith("𝗪𝗘𝗟𝗖𝗢𝗠𝗘")) {
        let embed = new Discord.MessageEmbed()
        .setAuthor(client.user.username , client.user.avatarURL())
        .setDescription(`> **Please write your request ** <:txs1:940376873744080926>
    
        > **بـرجــاء كـتـابــه غــرضـك كـمـا هـو مـوضــح** <:txs1:940376873744080926>
        
        > <:886608688121520129:929265280193003582> <a:emoji_45:941043787768139837> **Pubg**
        
        > <a:927733367900893184:929265173569626123> <a:emoji_45:941043787768139837> **Nitro**
        
        > <:emoji_51:941122861282758747> <a:emoji_45:941043787768139837> **Visa**
        
        > <:886832995544207380:929265142527574096> <a:emoji_45:941043787768139837> **Netflix**
        
        > <:886608678831161414:929265279404503050> <a:emoji_45:941043787768139837> **Spotify**
        
        > <a:probot:921925777702924308> <a:emoji_45:941043787768139837> **Credit**
        
        > <:emoji_46:941121756331122698> <a:emoji_45:941043787768139837> **Design**
        
        > <a:emoji_47:941121807459680316> <a:emoji_45:941043787768139837> **Bot**
        
        > <a:emoji_47:941121790032379994> <a:emoji_45:941043787768139837> **Tiktok**
        
        > <:emoji_49:941121864909062164> <a:emoji_45:941043787768139837> **Insta**
        
        > <a:emoji_50:941122190869422120> <a:emoji_45:941043787768139837> **Vote**`)
        .setImage("https://media.discordapp.net/attachments/928420013336035468/941124129380266055/756782631672086619.gif")
        .setColor(color)
        .setTimestamp()
        //.setThumbnail(message.guild.iconURL({dynamic:true}))
        .setFooter(message.guild.name, message.guild.iconURL({dynamic:true}));
        setTimeout(function(){
            message.channel.send(embed)
            //message.channel.send({embed: embed, content:"||@everyone||"})
        }, 2000);
    }
});

client.on("message", async message => {
    if (message.author.bot) return;
    if (!message.channel.guild) return;
    if(message.content === `${prefix}buy`) {
        let embed = new Discord.MessageEmbed()
        .setDescription(`**
       > ${prefix}buy pubg <:886608688121520129:929265280193003582>
       > ${prefix}buy nitro <a:927733367900893184:929265173569626123>
       > ${prefix}buy visa <:emoji_51:941122861282758747>
       > ${prefix}buy netflix <:886832995544207380:929265142527574096>
       > ${prefix}buy spotify <:886608678831161414:929265279404503050>
       > ${prefix}buy credit <a:probot:921925777702924308>
       > ${prefix}buy design <:emoji_46:941121756331122698>
       > ${prefix}buy bot <a:emoji_47:941121807459680316>
       > ${prefix}buy tiktok <a:emoji_47:941121790032379994>
       > ${prefix}buy insta <:emoji_49:941121864909062164>
       > ${prefix}buy vote <a:emoji_50:941122190869422120>
        **`)
        .setTitle("Buy Menu:")
        .setImage("https://media.discordapp.net/attachments/928420013336035468/941124129380266055/756782631672086619.gif")
        .setColor(color)
        message.channel.send(embed)
    }
});

client.on("message", async message => {
    if (message.author.bot) return;
    if (!message.channel.guild) return;
    if(message.content === `${prefix}buy pubg`) {
        message.channel.send(
            `**<a:886856760214843393:929265298564067381>   please wait while the seller responds to you 

<a:886856760214843393:929265298564067381> من فضلك انتظر حتي يتم الرد عليك من قبل البائع 

<a:886856760214843393:929265298564067381> <@&928373569426178098>
            **`
        )
    }
});
client.on("message", async message => {
    if (message.author.bot) return;
    if (!message.channel.guild) return;
    if(message.content.startsWith(`${prefix}buy nitro`)) {
        message.channel.send(
            `**<a:886856760214843393:929265298564067381>   please wait while the seller responds to you 

<a:886856760214843393:929265298564067381> من فضلك انتظر حتي يتم الرد عليك من قبل البائع 

<a:886856760214843393:929265298564067381> <@&928373570273439775>
            **`
        )
    }
});
client.on("message", async message => {
    if (message.author.bot) return;
    if (!message.channel.guild) return;
    if(message.content === `${prefix}buy visa`) {
        message.channel.send(
            `**<a:886856760214843393:929265298564067381>   please wait while the seller responds to you 

<a:886856760214843393:929265298564067381> من فضلك انتظر حتي يتم الرد عليك من قبل البائع 
<a:886856760214843393:929265298564067381> <@&941423582720966667>
            **`
        )
    }
})
client.on("message", async message => {
    if (message.author.bot) return;
    if (!message.channel.guild) return;
    if(message.content.startsWith(`${prefix}buy netflix`)) {
        message.channel.send(
            `**<a:886856760214843393:929265298564067381>   please wait while the seller responds to you 

<a:886856760214843393:929265298564067381> من فضلك انتظر حتي يتم الرد عليك من قبل البائع 
<a:886856760214843393:929265298564067381> <@&928373571762413618>
            **`
        )
    }
});
client.on("message", async message => {
    if (message.author.bot) return;
    if (!message.channel.guild) return;
    if(message.content === `${prefix}buy spotify`) {
        message.channel.send(
            `**<a:886856760214843393:929265298564067381>   please wait while the seller responds to you 

<a:886856760214843393:929265298564067381> من فضلك انتظر حتي يتم الرد عليك من قبل البائع 
<a:886856760214843393:929265298564067381> <@&928373572827742238>
            **`
        )
    }
})
client.on("message", async message => {
    if (message.author.bot) return;
    if (!message.channel.guild) return;
    if(message.content.startsWith(`${prefix}buy credit`)) {
        message.channel.send(
            `**<a:886856760214843393:929265298564067381>   please wait while the seller responds to you 

<a:886856760214843393:929265298564067381> من فضلك انتظر حتي يتم الرد عليك من قبل البائع 
<a:886856760214843393:929265298564067381> <@&941423598223122502>
            **`
        )
    }
});
client.on("message", async message => {
    if (message.author.bot) return;
    if (!message.channel.guild) return;
    if(message.content === `${prefix}buy design`) {
        message.channel.send(
            `**<a:886856760214843393:929265298564067381>   please wait while the seller responds to you 

<a:886856760214843393:929265298564067381> من فضلك انتظر حتي يتم الرد عليك من قبل البائع 
<a:886856760214843393:929265298564067381> <@&928373573670797363>
            **`
        )
    }
})
client.on("message", async message => {
    if (message.author.bot) return;
    if (!message.channel.guild) return;
    if(message.content.startsWith(`${prefix}buy bot`)) {
        message.channel.send(
            `**<a:886856760214843393:929265298564067381>   please wait while the seller responds to you 

<a:886856760214843393:929265298564067381> من فضلك انتظر حتي يتم الرد عليك من قبل البائع 
 <a:886856760214843393:929265298564067381> <@&937866396505874442>
            **`
        )
    }
});
///
client.on("message", async message => {
    if (message.author.bot) return;
    if (!message.channel.guild) return;
    if(message.content === `${prefix}buy tiktok`) {
        message.channel.send(
            `**<a:886856760214843393:929265298564067381>   please wait while the seller responds to you 

<a:886856760214843393:929265298564067381> من فضلك انتظر حتي يتم الرد عليك من قبل البائع 
<a:886856760214843393:929265298564067381> <@&941424796971974716>
            **`
        )
    }
})
client.on("message", async message => {
    if (message.author.bot) return;
    if (!message.channel.guild) return;
    if(message.content.startsWith(`${prefix}buy insta`)) {
        message.channel.send(
            `**<a:886856760214843393:929265298564067381>   please wait while the seller responds to you 

<a:886856760214843393:929265298564067381> من فضلك انتظر حتي يتم الرد عليك من قبل البائع 
<a:886856760214843393:929265298564067381> <@&941424753057624065>
            **`
        )
    }
});
client.on("message", async message => {
    if (message.author.bot) return;
    if (!message.channel.guild) return;
    if(message.content === `${prefix}buy vote`) {
        message.channel.send(
            `**<a:886856760214843393:929265298564067381>   please wait while the seller responds to you 

<a:886856760214843393:929265298564067381> من فضلك انتظر حتي يتم الرد عليك من قبل البائع 
<a:886856760214843393:929265298564067381> <@&928373578494255114>
            **`
        )
    }
});

client.on('message', async message => {
    if (message.content.startsWith(prefix + "come")) {
        if (message.author.bot) return;
        if (!message.channel.guild) return;
        let mention = message.mentions.members.first();
        if (!mention) return message.channel.send("**Please mention Someone**");
        if(mention.id === message.author.id) return message.channel.send("**لا تمنشن نفسك يا اهبل**");
        var embed = new Discord.MessageEmbed()
        .setAuthor(client.user.username , client.user.avatarURL())
        .setDescription(`
        > ✅ **Done Send Privet to Seller ${mention}**

        > **Please Wait Come Seller**
        `)
        .setThumbnail(message.guild.iconURL({dynamic:true}))
        .setTimestamp()
        .setFooter(message.author.username, message.author.avatarURL({dynamic:true}))
        message.channel.send(embed)
        mention.send(`**⚠️ ${mention} { <#${message.channel.id}> } تم طلبك هنا من فضلك come to Ticket  ⚠️**`).catch(err => {
            return message.channel.send("**❌ `-` DM closed**")
        });
    }
});

///////////////////////////////

client.on("message", message => {
    if (message.author.bot) return;
    if (!message.channel.guild) return;
    if (message.guild.id != 908826429138042910) return;
    if (message.channel.id != 941488572182200371) return;
    if (message.author.id === client.user.id) return;
    var embed = new Discord.MessageEmbed()
    .setImage("https://media.discordapp.net/attachments/928420013336035468/941124129380266055/756782631672086619.gif")
    .setColor("#FF0000")
    message.channel.send(embed)
    message.react("<a:8865332862083645851:929265149662085122>")
    message.react("<a:886534149731651594:929265282944499802>")
});
client.on("message", message => {
    if (message.author.bot) return;
    if (!message.channel.guild) return;
    if (message.guild.id != 908826429138042910) return;
    if (message.channel.id != 928388308193656862) return;
    if (message.author.id === client.user.id) return;
    var embed = new Discord.MessageEmbed()
    .setImage("https://media.discordapp.net/attachments/928420013336035468/941124129380266055/756782631672086619.gif")
    .setColor("#FF0000")
    message.channel.send(embed)
    message.react("<a:8865332862083645851:929265149662085122>")
    message.react("<a:886534149731651594:929265282944499802>")
});
client.on("message", message => {
    if (message.author.bot) return;
    if (!message.channel.guild) return;
    if (message.guild.id != 908826429138042910) return;
    if (message.channel.id != 928388260420517928) return;
    if (message.author.id === client.user.id) return;
    var embed = new Discord.MessageEmbed()
    .setImage("https://media.discordapp.net/attachments/928420013336035468/941124129380266055/756782631672086619.gif")
    .setColor("#FF0000")
    message.channel.send(embed)
    message.react("<a:8865332862083645851:929265149662085122>")
    message.react("<a:886534149731651594:929265282944499802>")
});



client.on("message", async message => {
    if (message.content.toLowerCase() === prefix + "bt") {
        let e2 = cnfg['emojis'].help;
       if (!message.channel.guild) return message.reply('**❌ `-` This Command Only For Servers**');
        //--------------------------------------S T A R T---------------------------------------
  
          const embed = new Discord.MessageEmbed()
          .setDescription("Click the menu below to view help menu!");
  
          const embed1 = new Discord.MessageEmbed()
          .setColor(color)
          .setTitle(`✉️ General Commands`)
          .setThumbnail(message.author.avatarURL({dynamic: true}))
          .setDescription(`
  > ${prefix}**ping ${e2 || 'help'} لأظهار بنج البوت**       
  > ${prefix}**user ${e2 || 'help'} لأظهار معلومات حسابك**         
  > ${prefix}**profile ${e2 || 'help'} لاظهار بروفايلك**
  > ${prefix}**tax ${e2 || 'help'} حسب ضريبة التحويل**
  > ${prefix}**server ${e2 || 'help'} لأظهار معلومات سيرفر**
  `)
        .setFooter(message.author.tag, message.author.avatarURL({dynamic: true}));
  
          const embed2 = new Discord.MessageEmbed()
          .setColor(color)
          .setTitle(`🤖 Admin Commands`)
          .setThumbnail(message.author.avatarURL({dynamic: true}))
          .setDescription(`
  > ${prefix}**createcolors ${e2 || 'help'} لعمل رولات ألوان**  
  > ${prefix}**setroom ${e2 || 'help'} تثبيت البوت في روم**     
  > ${prefix}**clear ${e2 || 'help'} مسح الشات**
  > ${prefix}**hide ${e2 || 'help'} لاخفاء الروم**
  > ${prefix}**show ${e2 || 'help'} لأظهار الروم**
  > ${prefix}**ban ${e2 || 'help'} تبنيد عضو**
  > ${prefix}**unban ${e2 || 'help'} فك الباند عن عضو**
  > ${prefix}**ls ${e2 || 'help'} لعرض قأمت البوتات** 
  > ${prefix}**kick ${e2 || 'help'} طرد عضو**
  > ${prefix}**lock ${e2 || 'help'} قفل شات**
  > ${prefix}**unlock ${e2 || 'help'} فتح شات**
  > ${prefix}**setnick ${e2 || 'help'} تغير اسمك بالسيرفر**
  > ${prefix}**bans ${e2 || 'help'} لعرض قأمة الباند **   
  `)
        .setFooter(message.author.tag, message.author.avatarURL({dynamic: true}));
  
          const embed3 = new Discord.MessageEmbed()
          .setColor(color)
          .setTitle(`Protection Commands`)
          .setDescription(`> ${prefix}**antibots on/off ${e2 || 'help'} مانع دخول بوتات**`)
          .setThumbnail(message.author.avatarURL({dynamic: true}))
          .setFooter(message.author.tag, message.author.avatarURL({dynamic: true}));
  
  
          //-----------------------------OPTIONS----------------------
  
          let option1 = new MessageMenuOption()
          .setLabel('General Commands')
          .setEmoji('1️⃣')
          .setValue('option1')
          .setDescription('This is just a General Commands')
  
          let option2 = new MessageMenuOption()
          .setLabel('Admin Commands')
          .setEmoji('2️⃣')
          .setValue('option2')
          .setDescription('This is just a Admin Commands')
  
          let option3 = new MessageMenuOption()
          .setLabel('Protection Commands')
          .setEmoji('3️⃣')
          .setValue('option3')
          .setDescription('This is just a Protection Commands')

          let option4 = new MessageMenuOption()
          .setLabel('Delete')
          .setEmoji('3️⃣')
          .setValue('option4')
          .setDescription('Delete')
          
      let select = new MessageMenu()
          .setID('selector')
          .setPlaceholder('Click here to view the help menu!')
          .setMaxValues(1)
          .setMinValues(1)
          .addOptions(option1, option2, option3)
  
          //-----------------------------OPTIONS----------------------
      
      const Sendmenu = await message.channel.send(embed, select);
  
      const filter = ( button ) => button.clicker.user.id === message.author.id; //if only the message author click then  it will work
      let collector = Sendmenu.createMenuCollector(filter, { time : 90000 });
  
      collector.on("collect" , (b) => {
          if(b.values[0] == "option1") {
              Sendmenu.edit(embed1, select)
          }
  
          if(b.values[0] == "option2") {
              Sendmenu.edit(embed2, select)
          }
  
          if(b.values[0] == "option3") {
              Sendmenu.edit(embed3, select)
          }
  
          b.reply.defer();
      })
  
      collector.on("end", (b) => {
          Sendmenu.edit("This help menu is expired! Please retype the command to view again.")
      })
      }
});
client.login(process.env.TOKEN);