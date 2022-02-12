const { MessageEmbed, Client } = require('discord.js');
const client = new Client({ intents: 32767, allowedMentions: {parse: ['roles', 'users', 'everyone'], repliedUser: false}, ws: {properties: {$browser: 'Discord iOS'}}});

const { color, prefix} = require('./Settings/settings');

require('dotenv').config()

const db = require('pro.db');

client.on("ready", () => {
    console.clear()
    console.log(`LOGIN: ${client.user.tag}\nID: ${client.user.id}\nLINK: https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot`)
});


let antibots = JSON.parse(fs.readFileSync('./Data/antibots.json', 'utf8'));
client.on('message', message => {
  if (message.content.startsWith(prefix + "antibots on")) {
    if (!message.channel.guild) return message.reply('**❌ `-` This Command Only For Servers**');
    if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('**Sorry But You Dont Have Permission** `ADMINISTRATOR`');
    antibots[message.guild.id] = {
      onoff: 'On',
    }
    message.channel
    .send({ embed: new Discord.MessageEmbed().setDescription("Loading....") })
    .then(function(m) {
      setTimeout(function() {
        m.edit({
          embed: new Discord.MessageEmbed().setDescription("**✅ `-` the antibote has been on**")
        });
      }, 1000);
    });
    fs.writeFile("./Data/antibots.json", JSON.stringify(antibots), (err) => {
      if (err) console.error(err)
        .catch(err => {
          console.error(err);
        });
    });
  }

})


client.on('message', message => {
  if (message.content.startsWith(prefix + "antibots off")) {
    if (!message.channel.guild) return message.reply('**❌ `-` This Command Only For Servers**');
    if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('**Sorry But You Dont Have Permission** `ADMINISTRATOR`');
    antibots[message.guild.id] = {
      onoff: 'Off',
    }
 message.channel
            .send({ embed: new Discord.MessageEmbed().setDescription("Loading....") })
            .then(function(m) {
              setTimeout(function() {
                m.edit({
                  embed: new Discord.MessageEmbed().setDescription("**❌ `-` the antibote has been off**")
                });
              }, 1000);
            });
            fs.writeFile("./Data/antibots.json", JSON.stringify(antibots), (err) => {
                if (err) console.error(err)
                  .catch(err => {
                    console.error(err);
                  });
              });
  }

})

client.on("guildMemberAdd", member => {
  if (!antibots[member.guild.id]) antibots[member.guild.id] = {
    onoff: 'Off'
  }
  if (antibots[member.guild.id].onoff === 'Off') return;
  if (member.user.bot) return member.kick()
})

fs.writeFile("./Data/antibots.json", JSON.stringify(antibots), (err) => {
  if (err) console.error(err)
    .catch(err => {
      console.error(err);
    });

})


client.on("message", async message => {
    if(message.content.startsWith(prefix + "antibots on")) {
        message.channel
    .send({ embed: new Discord.MessageEmbed().setDescription("Loading....") })
    .then(function(m) {
      setTimeout(function() {
          await db.set(`guild_${message.guild.id}`, "on")
        m.edit({
          embed: new Discord.MessageEmbed().setDescription("**✅ `-` the antibote has been on**")
        });
      }, 1000);
    });
    }
});

client.on("guildMemberAdd", member => {
    if(db.get(`guild_${member.guild.id}`) === "on") return;
    if (member.user.bot) return member.kick()
});


client.on("message", async message => {
    if(message.content.startsWith(prefix + "check")) {
        if(db.get(`guild_${message.guild.id}`) === "on") return message.channel.send("**Done**");
    }
});


const ms = require(`ms`)
const config = require(
    "./Settings/settings"
);

client.on("message", async message => {
    if(message.content.startsWith(prefix + "boost")) {
        let args = message.content.split(" ").slice(1).join(" ")
        let embed = new Discord.MessageEmbed()
            .setTitle(`Something wrong!`)
            .setColor(`RED`)
            .setDescription(`Please provide valid date of boost start\nExample: 2021/12/31`)
            .setTimestamp()
            .setFooter(message.member.user.username, message.member.user.avatarURL());
        if (!args) return message.channel.send(embed);

        let argstime = Date.parse(args)

        if (!argstime) return message.channel.send(embed);

        let mo1 = argstime + 2629746000
        let mo2 = argstime + 2629746000 * 2
        let mo3 = argstime + 2629746000 * 3
        let mo6 = argstime + 2629746000 * 6
        let mo9 = argstime + 2629746000 * 9
        let mo12 = argstime + 2629746000 * 12
        let mo15 = argstime + 2629746000 * 15
        let mo18 = argstime + 2629746000 * 18
        let mo24 = argstime + 2629746000 * 24
        

        let timeupgrade = ``;
        let level = ``;
        let emoji = ``;

        if (mo1 > Date.now()) {
            timeupgrade = new Date(mo1).toLocaleDateString()
            level = `1`
            emoji = config.boost['1m']
        } else if (mo2 > Date.now()) {
            timeupgrade = new Date(mo2).toLocaleDateString()
            level = `2`
            emoji = config.boost['2m']
        } else if (mo3 > Date.now()) {
            timeupgrade = new Date(mo3).toLocaleDateString()
            level = `3`
            emoji = config.boost['3m']
        } else if (mo6 > Date.now()) {
            timeupgrade = new Date(mo6).toLocaleDateString()
            level = `4`
            emoji = config.boost['6m']
        } else if (mo9 > Date.now()) {
            timeupgrade = new Date(mo9).toLocaleDateString()
            level = `5`
            emoji = config.boost['9m']
        } else if (mo12 > Date.now()) {
            timeupgrade = new Date(mo12).toLocaleDateString()
            level = `6`
            emoji = config.boost['12m']
        } else if (mo15 > Date.now()) {
            timeupgrade = new Date(mo15).toLocaleDateString()
            level = `7`
            emoji = config.boost['15m']
        } else if (mo18 > Date.now()) {
            timeupgrade = new Date(mo18).toLocaleDateString()
            level = `8`
            emoji = config.boost['18m']
        } else if (mo24 > Date.now()) {
            timeupgrade = new Date(mo24).toLocaleDateString()
            level = `9`
            emoji = config.boost['24m']
        }   else if (argstime >= mo24) return message.channel.send(
            "لفل مكس"
        )

        try {
            let embed2 = new Discord.MessageEmbed()
                .setTitle(`Calculating boost badge`)
                .setColor(`PURPLE`)
                .setDescription(`Your boost badge will upgrade at ${timeupgrade}\nin ${ms(Date.parse(timeupgrade) - Date.now())} to level ${level} ${emoji}`)
                .setTimestamp()
                .setFooter(message.member.user.username, message.member.user.avatarURL());

                message.channel.send(embed2)
        } catch {
            return message.channel.send("🙄 | **Something wrong!**")
        }
    }
});


client.on("message", async message => {
    if (message.content.toLowerCase() === prefix + "bt") {
       if (!message.channel.guild) return message.reply('**❌ `-` This Command Only For Servers**');
        //--------------------------------------S T A R T---------------------------------------
  
          const embed = new Discord.MessageEmbed()
          .setDescription("Click the menu below to view help menu!");
  
          const embed1 = new Discord.MessageEmbed()
          .setColor("GREEN")
          .setDescription("Hlep 1");
  
          const embed2 = new Discord.MessageEmbed()
          .setColor("BLUE")
          .setDescription("Hlep 2");
  
          const embed3 = new Discord.MessageEmbed()
          .setColor("RED")
          .setDescription("Hlep 3");
  
  
          //-----------------------------OPTIONS----------------------
  
          let option1 = new MessageMenuOption()
          .setLabel('Help Menu 1')
          .setEmoji('1️⃣')
          .setValue('option1')
          .setDescription('This is just a help menu number 1')
  
          let option2 = new MessageMenuOption()
          .setLabel('Help Menu 2')
          .setEmoji('2️⃣')
          .setValue('option2')
          .setDescription('This is just a help menu number 2')
  
          let option3 = new MessageMenuOption()
          .setLabel('Help Menu 3')
          .setEmoji('3️⃣')
          .setValue('option3')
          .setDescription('This is just a help menu number 3')
          
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