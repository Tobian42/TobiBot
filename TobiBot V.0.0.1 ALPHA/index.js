(async()=>{
    // default imports
    const events = require('events');
    const { exec } = require("child_process")
    const logs = require("discord-logs")
    const Discord = require("discord.js")
    const { 
        MessageEmbed, 
        MessageButton, 
        MessageActionRow, 
        Intents, 
        Permissions, 
        MessageSelectMenu 
    }= require("discord.js")
    const fs = require('fs');
    let process = require('process');
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    // block imports
    const os = require("os-utils");
    const ms = require("ms")
    let https = require("https")
    const synchronizeSlashCommands = require('@frostzzone/discord-sync-commands');
    
    // define s4d components (pretty sure 90% of these arnt even used/required)
    let s4d = {
        Discord,
        fire:null,
        joiningMember:null,
        reply:null,
        player:null,
        manager:null,
        Inviter:null,
        message:null,
        notifer:null,
        checkMessageExists() {
            if (!s4d.client) throw new Error('You cannot perform message operations without a Discord.js client')
            if (!s4d.client.readyTimestamp) throw new Error('You cannot perform message operations while the bot is not connected to the Discord API')
        }
    };

    // check if d.js is v13
    if (!require('./package.json').dependencies['discord.js'].startsWith("^13.")) {
      let file = JSON.parse(fs.readFileSync('package.json'))
      file.dependencies['discord.js'] = '^13.15.1'
      fs.writeFileSync('package.json', JSON.stringify(file, null, 4))
      exec('npm i')
      throw new Error("Seems you arent using v13 please re-run or run `npm i discord.js@13.12.0`");
    }

    // check if discord-logs is v2
    if (!require('./package.json').dependencies['discord-logs'].startsWith("^2.")) {
      let file = JSON.parse(fs.readFileSync('package.json'))
      file.dependencies['discord-logs'] = '^2.0.0'
      fs.writeFileSync('package.json', JSON.stringify(file, null, 4))
      exec('npm i')
      throw new Error("discord-logs must be 2.0.0. please re-run or if that fails run `npm i discord-logs@2.0.0` then re-run");
    }

    // create a new discord client
    s4d.client = new s4d.Discord.Client({
        intents: [
            Object.values(s4d.Discord.Intents.FLAGS).reduce((acc, p) => acc | p, 0)
        ],
        partials: [
            "REACTION", 
            "CHANNEL"
        ]
    });

    // when the bot is connected say so
    s4d.client.on('ready', () => {
        console.log(s4d.client.user.tag + " is alive!")
    })

    // upon error print "Error!" and the error
    process.on('uncaughtException', function (err) {
        console.log('Error!');
        console.log(err);
    });

    // give the new client to discord-logs
    logs(s4d.client);

    // pre blockly code
    

    // blockly code
    await s4d.client.login((process.env[String('TOKEN')])).catch((e) => {
            const tokenInvalid = true;
            const tokenError = e;
            if (e.toString().toLowerCase().includes("token")) {
                throw new Error("An invalid bot token was provided!")
            } else {
                throw new Error("Privileged Gateway Intents are not enabled! Please go to https://discord.com/developers and turn on all of them.")
            }
        });
    
    const http = require('http');
    const server = http.createServer((req, res) => {
        res.writeHead(200);
        res.end('This site was created to keep bot on 25/8');
    });
    server.listen(3000);
    
    s4d.client.on('ready', async () => {
      s4d.client.user.setPresence({status: "online",activities:[{name:'ob auf Tobianien alles rund läuft',type:"WATCHING"}]});
    
    });
    
    s4d.client.on('interactionCreate', async (interaction) => {
            let member = interaction.guild.members.cache.get(interaction.member.user.id)
              if ((interaction.commandName) == 'ping') {
        await interaction.reply({ content: ('my ping is: ' + String(s4d.client.ws.ping)), ephemeral: false, components: [] });
      }
      if ((interaction.commandName) == 'info') {
        await interaction.reply({ content: (['Ping: **',s4d.client.ws.ping,'**','\n','Uptime (in ms): **',s4d.client.uptime,'**'].join('')), ephemeral: false, components: [] });
      }
      if ((interaction.commandName) == 'poweroff') {
        if (((interaction.member).id) == '844834622118035457') {
          await interaction.reply({ content: (['shutting down after being online for: **',s4d.client.uptime,'ms**'].join('')), ephemeral: false, components: [] });
          s4d.client.user.setPresence({status: "offline",activities:[{name:'my dreams',type:"WATCHING"}]});
          s4d.client.destroy();
        } else {
          await interaction.reply({ content: 'you are not my owner  :angry: ', ephemeral: false, components: [] });
        }
      }
      if ((interaction.commandName) == 'version') {
        if ((interaction.options.getString('choice')) == 'curV') {
          await interaction.reply({ content: 'I am currently running version **0.0.1 ALPHA**', ephemeral: false, components: [] });
        }
        if ((interaction.options.getString('choice')) == 'hisV') {
          await interaction.reply({ content: 'this is my first version', ephemeral: false, components: [] });
        }
      }
    
        });
    
    synchronizeSlashCommands(s4d.client, [
      {
          name: 'ping',
      		description: 'test bot ping',
      		options: [
    
          ]
      },{
          name: 'info',
      		description: 'shows you some infos about the bot',
      		options: [
    
          ]
      },{
          name: 'poweroff',
      		description: 'owner only',
      		options: [
    
          ]
      },{
          name: 'version',
      		description: 'shows you the bot version',
      		options: [
              {
              type: 3,
        			name: 'choice',
        			description: 'choose what exactly you want to know',
        			required: true,
              choices: [
                  {
              name: String('current'),
              value: String('curV')
          },{
              name: String('history'),
              value: String('hisV')
          },
              ]
        },
          ]
      },
    ],{
        debug: false,
    
    });
    
    s4d.client.on('interactionCreate', async (interaction) => {
            let member = interaction.guild.members.cache.get(interaction.member.user.id)
              if ((interaction.commandName) == 'ping') {
        // true - only the person who t=did the comamnd can see it
        //
        // false - everyone can see it
        //
        //
        //
        //
        //
        //
        await interaction.reply({ content: 'Pong!', ephemeral: false, components: [] });
      }
      if ((interaction.commandName) == 'say') {
        // true - only the person who t=did the comamnd can see it
        //
        // false - everyone can see it
        //
        //
        //
        //
        //
        //
        await interaction.reply({ content: (interaction.options.getString('text')), ephemeral: false, components: [] });
      }
      if ((interaction.commandName) == 'sub') {
        if ((interaction.options.getSubcommand()) == 'hi') {
          // true - only the person who t=did the comamnd can see it
          //
          // false - everyone can see it
          //
          //
          //
          //
          //
          //
          await interaction.reply({ content: 'Hello', ephemeral: false, components: [] });
        }
        if ((interaction.options.getSubcommand()) == 'bye') {
          // true - only the person who t=did the comamnd can see it
          //
          // false - everyone can see it
          //
          //
          //
          //
          //
          //
          await interaction.reply({ content: 'Ok bye :(', ephemeral: false, components: [] });
        }
      }
      if ((interaction.commandName) == 'group') {
        if ((interaction.options.getSubcommandGroup()) == 'one') {
          if ((interaction.options.getSubcommand()) == 'ok') {
            // true - only the person who t=did the comamnd can see it
            //
            // false - everyone can see it
            //
            //
            //
            //
            //
            //
            await interaction.reply({ content: 'ok', ephemeral: false, components: [] });
          }
        }
      }
      if ((interaction.commandName) == 'choose') {
        if ((interaction.options.getString('choice')) == 'bberb') {
          // true - only the person who t=did the comamnd can see it
          //
          // false - everyone can see it
          //
          //
          //
          //
          //
          //
          await interaction.reply({ content: 'You chose the Big Berd', ephemeral: false, components: [] });
        }
        if ((interaction.options.getString('choice')) == 'sberb') {
          // true - only the person who t=did the comamnd can see it
          //
          // false - everyone can see it
          //
          //
          //
          //
          //
          //
          await interaction.reply({ content: 'You chose the Small Berd', ephemeral: false, components: [] });
        }
        if ((interaction.options.getString('choice')) == 'knoif') {
          // true - only the person who t=did the comamnd can see it
          //
          // false - everyone can see it
          //
          //
          //
          //
          //
          //
          await interaction.reply({ content: 'Why do you want a knife', ephemeral: false, components: [] });
        }
      }
    
        });
    
    return s4d
})();