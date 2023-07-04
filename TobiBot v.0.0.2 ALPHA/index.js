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
    await s4d.client.login('insert token here').catch((e) => {
            const tokenInvalid = true;
            const tokenError = e;
            if (e.toString().toLowerCase().includes("token")) {
                throw new Error("An invalid bot token was provided!")
            } else {
                throw new Error("Privileged Gateway Intents are not enabled! Please go to https://discord.com/developers and turn on all of them.")
            }
        });
    
    s4d.client.on('ready', async () => {
      s4d.client.user.setPresence({status: "online",activities:[{name:'ob auf Tobianien alles rund läuft',type:"WATCHING"}]});
    
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
          name: 'sudo',
      		description: 'owner only',
      		options: [
              {
              type: 3,
        			name: 'command',
        			description: 'sudo linux',
        			required: true,
              choices: [
    
              ]
        },
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
      },{
          name: 'channel',
      		description: 'sets a channel for logs/warnings',
      		options: [
              {
            name: 'create',
        		description: 'sets this channel to:',
            type: 2,
        		options: [
                {
              name: 'logs',
          		description: 'tell the bot to send any kind of logs in this channel',
              type: 1,
          		options: [
    
              ]
          },{
              name: 'warnings',
          		description: 'tell the bot to send any kind of warnings in this channel',
              type: 1,
          		options: [
    
              ]
          },
            ]
        },{
            name: 'view',
        		description: 'show you a or multiple channel that are set for a specific action',
            type: 2,
        		options: [
                {
              name: 'all',
          		description: 'schows you all channels',
              type: 1,
          		options: [
    
              ]
          },
            ]
        },
          ]
      },{
          name: 'warn',
      		description: 'warn a user (this server only)',
      		options: [
              {
              type: 3,
        			name: 'user',
        			description: '@ a user who you want to warn',
        			required: true,
              choices: [
    
              ]
        },{
              type: 3,
        			name: 'reason',
        			description: 'write a good reason why you warned the user',
        			required: true,
              choices: [
    
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
        await interaction.reply({ content: ('my ping is: ' + String(s4d.client.ws.ping)), ephemeral: false, components: [] });
      }
      if ((interaction.commandName) == 'info') {
        await interaction.reply({ content: (['Ping: **',s4d.client.ws.ping,'**','\n','Uptime (in ms): **',s4d.client.uptime,'**'].join('')), ephemeral: false, components: [] });
      }
      if ((interaction.commandName) == 'sudo') {
        if (((interaction.member).id) == '844834622118035457') {
          if ((interaction.options.getString('command')) == 'reboot') {
            await interaction.reply({ content: ('reboot, uptime: ' + String(s4d.client.uptime)), ephemeral: false, components: [] });
            s4d.client.user.setPresence({status: "idle",activities:[{name:'my dreams',type:"WATCHING"}]});
            console.log('rebooting...');
            await delay(Number(0.5)*1000);
            exec('sudo reboot');
          }
          if ((interaction.options.getString('command')) == 'poweroff') {
            await interaction.reply({ content: ('poweroff, uptime: ' + String(s4d.client.uptime)), ephemeral: false, components: [] });
            s4d.client.user.setPresence({status: "idle",activities:[{name:'my dreams',type:"WATCHING"}]});
            console.log('Shutting down the Bot...');
            await delay(Number(0.5)*1000);
            s4d.client.destroy();
          }
        } else {
          await interaction.reply({ content: 'you are not my owner  :angry: ', ephemeral: false, components: [] });
        }
      }
      if ((interaction.commandName) == 'version') {
        if ((interaction.options.getString('choice')) == 'curV') {
          await interaction.reply({ content: 'I am currently running version **0.0.2 ALPHA**', ephemeral: false, components: [] });
        }
        if ((interaction.options.getString('choice')) == 'hisV') {
          await interaction.reply({ content: (String(['Version: 0.0.1 ALPHA: ','28.06.2023-04.07.2023','\n'].join('')) + String(['current: ','04.07.2023-...','\n'].join(''))), ephemeral: false, components: [] });
        }
      }
      if ((interaction.commandName) == 'channel') {
        if ((interaction.member).kickable) {
          await interaction.reply({ content: 'you don\'t have permissions to use this interaction :smiling_face_with_tear: ', ephemeral: false, components: [] });
        } else {
          if ((interaction.options.getSubcommandGroup()) == 'create') {
            if ((interaction.options.getSubcommand()) == 'logs') {
              await interaction.reply({ content: 'work in progress...', ephemeral: false, components: [] });
            }
            if ((interaction.options.getSubcommand()) == 'warnings') {
              (interaction.guild).channels.create('warnings', {
                      type: 'text'
                  });
              await interaction.reply({ content: (['successfully set ',s4d.client.channels.cache.find((channel) => channel.name === 'warnings'),' as a warnings channel'].join('')), ephemeral: false, components: [] });
            }
          }
          if ((interaction.options.getSubcommandGroup()) == 'view') {
            if ((interaction.options.getSubcommand()) == 'all') {
              await interaction.reply({ content: (['Channel list:','\n','Logs: ','','\n','Warnings: ',s4d.client.channels.cache.find((channel) => channel.name === 'warnings')].join('')), ephemeral: false, components: [] });
            }
          }
        }
      }
      if ((interaction.commandName) == 'warn') {
        if ((interaction.member).kickable) {
          await interaction.reply({ content: 'you don\'t have permissions to use this interaction :smiling_face_with_tear: ', ephemeral: false, components: [] });
        } else {
          await interaction.reply({ content: ':thumbsup: ', ephemeral: false, components: [] });
          s4d.client.channels.cache.find((channel) => channel.name === 'warnings').send({content:String(([interaction.options.getString('user'),' you got warned for: ',interaction.options.getString('reason')].join('')))});
        }
      }
    
        });
    
    return s4d
})();