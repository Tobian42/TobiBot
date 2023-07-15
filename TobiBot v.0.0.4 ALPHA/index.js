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
    const Database  = require("easy-json-database")
    
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
    var owner_of_the_bot, status_step, milliseconds, status2, status_type, member_xp, temp, member_level, weeks, days, hours, minutes, seconds, temp_lvl, needed_xp;
    
    
    await s4d.client.login('enter token here').catch((e) => {
            const tokenInvalid = true;
            const tokenError = e;
            if (e.toString().toLowerCase().includes("token")) {
                throw new Error("An invalid bot token was provided!")
            } else {
                throw new Error("Privileged Gateway Intents are not enabled! Please go to https://discord.com/developers and turn on all of them.")
            }
        });
    
    const LXP = new Database('./Level-System.json')
    s4d.client.on('ready', async () => {
      owner_of_the_bot = 844834622118035500;
      s4d.client.user.setPresence({status: "online",activities:[{name:'V.0.0.4',type:"PLAYING"}]});
    
    });
    
    s4d.client.on('messageCreate', async (s4dmessage) => {
            if (s4dmessage.author.bot) {
                return;
            }
    
          /*
          Status changer
          */
         if (status_step == 1) {
        if (((s4dmessage.author).id) == '844834622118035457') {
          if (String((s4dmessage.content)).includes(String('1'))) {
            status2 = 1;
            status_step = 2;
            s4dmessage.channel.send({content:String((['now set my type: ','\n','1 = Listening','\n','2 = Watching','\n','3 = Competing','\n','4 = Playing'].join('')))});
          } else if (String((s4dmessage.content)).includes(String('2'))) {
            status2 = 2;
            status_step = 2;
            s4dmessage.channel.send({content:String((['now set my type: ','\n','1 = Listening','\n','2 = Watching','\n','3 = Competing','\n','4 = Playing'].join('')))});
          } else if (String((s4dmessage.content)).includes(String('3'))) {
            status2 = 3;
            status_step = 2;
            s4dmessage.channel.send({content:String((['now set my type: ','\n','1 = Listening','\n','2 = Watching','\n','3 = Competing','\n','4 = Playing'].join('')))});
          } else if (String((s4dmessage.content)).includes(String('4'))) {
            status2 = 4;
            status_step = 2;
            s4dmessage.channel.send({content:String((['now set my type: ','\n','1 = Listening','\n','2 = Watching','\n','3 = Competing','\n','4 = Playing'].join('')))});
          } else {
            s4dmessage.channel.send({content:String('Can\'t find any numbers in your messages. Try again!')});
          }
        }
      } else if (status_step == 2) {
        if (((s4dmessage.author).id) == '844834622118035457') {
          if (String((s4dmessage.content)).includes(String('1'))) {
            status_type = 1;
            status_step = 3;
            s4dmessage.channel.send({content:String('type a text now:')});
          } else if (String((s4dmessage.content)).includes(String('2'))) {
            status_type = 2;
            status_step = 3;
            s4dmessage.channel.send({content:String('type a text now:')});
          } else if (String((s4dmessage.content)).includes(String('3'))) {
            status_type = 3;
            status_step = 3;
            s4dmessage.channel.send({content:String('type a text now:')});
          } else if (String((s4dmessage.content)).includes(String('4'))) {
            status_type = 4;
            status_step = 3;
            s4dmessage.channel.send({content:String('type a text now:')});
          } else {
            s4dmessage.channel.send({content:String('Can\'t find any numbers in your messages. Try again!')});
          }
        }
      } else if (status_step == 3) {
        if (((s4dmessage.author).id) == '844834622118035457') {
          try {
            if (status2 == 1) {
              if (status_type == 1) {
                s4d.client.user.setPresence({status: "online",activities:[{name:(s4dmessage.content),type:"LISTENING"}]});
              } else if (status_type == 2) {
                s4d.client.user.setPresence({status: "online",activities:[{name:(s4dmessage.content),type:"WATCHING"}]});
              } else if (status_type == 3) {
                s4d.client.user.setPresence({status: "online",activities:[{name:(s4dmessage.content),type:"COMPETING"}]});
              } else if (status_type == 4) {
                s4d.client.user.setPresence({status: "online",activities:[{name:(s4dmessage.content),type:"PLAYING"}]});
              }
            } else if (status2 == 2) {
              if (status_type == 1) {
                s4d.client.user.setPresence({status: "offline",activities:[{name:(s4dmessage.content),type:"LISTENING"}]});
              } else if (status_type == 2) {
                s4d.client.user.setPresence({status: "offline",activities:[{name:(s4dmessage.content),type:"WATCHING"}]});
              } else if (status_type == 3) {
                s4d.client.user.setPresence({status: "offline",activities:[{name:(s4dmessage.content),type:"COMPETING"}]});
              } else if (status_type == 4) {
                s4d.client.user.setPresence({status: "offline",activities:[{name:(s4dmessage.content),type:"PLAYING"}]});
              }
            } else if (status2 == 3) {
              if (status_type == 1) {
                s4d.client.user.setPresence({status: "idle",activities:[{name:(s4dmessage.content),type:"LISTENING"}]});
              } else if (status_type == 2) {
                s4d.client.user.setPresence({status: "idle",activities:[{name:(s4dmessage.content),type:"WATCHING"}]});
              } else if (status_type == 3) {
                s4d.client.user.setPresence({status: "idle",activities:[{name:(s4dmessage.content),type:"COMPETING"}]});
              } else if (status_type == 4) {
                s4d.client.user.setPresence({status: "idle",activities:[{name:(s4dmessage.content),type:"PLAYING"}]});
              }
            } else if (status2 == 4) {
              if (status_type == 1) {
                s4d.client.user.setPresence({status: "dnd",activities:[{name:(s4dmessage.content),type:"LISTENING"}]});
              } else if (status_type == 2) {
                s4d.client.user.setPresence({status: "dnd",activities:[{name:(s4dmessage.content),type:"WATCHING"}]});
              } else if (status_type == 3) {
                s4d.client.user.setPresence({status: "dnd",activities:[{name:(s4dmessage.content),type:"COMPETING"}]});
              } else if (status_type == 4) {
                s4d.client.user.setPresence({status: "dnd",activities:[{name:(s4dmessage.content),type:"PLAYING"}]});
              }
            }
            status_step = 0;
            s4dmessage.channel.send({content:String('done')});
    
          } catch (err) {
            s4dmessage.channel.send({content:String('error')});
    
          }}
      }
    
          /*
          Level System
          */
         if (LXP.has(String(('xp-' + String(s4dmessage.member.id))))) {
        member_xp = LXP.get(String(('xp-' + String(s4dmessage.member.id))));
        member_level = LXP.get(String(('level-' + String(s4dmessage.member.id))));
        if (!member_xp) {
          member_xp = 0;
        } else if (!member_level) {
          member_level = 0;
        }
        LXP.set(String(('xp-' + String(s4dmessage.member.id))), (member_xp + 1));
        member_xp = member_xp + 1;
        temp_lvl = member_level;
        needed_xp = 2;
        while (temp_lvl >= 1) {
          needed_xp = (typeof needed_xp === 'number' ? needed_xp : 0) + needed_xp * 1.3;
          temp_lvl = (typeof temp_lvl === 'number' ? temp_lvl : 0) + -1;
        }
        if (member_xp >= needed_xp) {
          LXP.set(String(('level-' + String(s4dmessage.member.id))), (member_level + 1));
          member_level = member_level + 1;
          try {
            s4d.client.channels.cache.find((channel) => channel.name === 'levels').send({content:String((['Congratulations, ',s4dmessage.author,'you jumped to level ',member_level,'!!'].join('')))});
    
          } catch (err) {
            (s4dmessage.guild).channels.create('levels', { type: 'GUILD_TEXT' }).then(async cat => {  s4d.client.channels.cache.find((channel) => channel.name === 'levels').send({content:String((['Congratulations, ',s4dmessage.author,'you jumped to level ',member_level,'!!'].join('')))});
            });
    
          }}
      }
    
        });
    
    s4d.client.on('interactionCreate', async (interaction) => {
            let member = interaction.guild.members.cache.get(interaction.member.user.id)
              if ((interaction.commandName) == 'ping') {
        await interaction.reply({ content: ('my ping is: ' + String(s4d.client.ws.ping)), ephemeral: false, components: [] });
      }
      if ((interaction.commandName) == 'info') {
        if ((s4d.client.uptime) != null) {
          milliseconds = (s4d.client.uptime);
          temp = milliseconds / 604800000;
          weeks = Math.floor(temp);
          temp = temp - weeks;
          temp = temp * 7;
          days = Math.floor(temp);
          temp = temp - days;
          temp = temp * 24;
          hours = Math.floor(temp);
          temp = temp - hours;
          temp = temp * 60;
          minutes = Math.floor(temp);
          temp = temp - minutes;
          temp = temp * 60;
          seconds = Math.floor(temp);
        }
        await interaction.reply({ content: (['Ping: **',s4d.client.ws.ping,'**','\n','Uptime: ','\n','Weeks: ' + String(weeks),'\n','Days: ' + String(days),'\n','Hours: ' + String(hours),'\n','Minutes: ' + String(minutes),'\n','Seconds: ' + String(seconds)].join('')), ephemeral: false, components: [] });
      }
      if ((interaction.commandName) == 'sudo') {
        if (((interaction.member).id) == owner_of_the_bot) {
          if ((interaction.options.getString('command')) == 'reboot') {
            await interaction.reply({ content: ('reboot, uptime: ' + String(s4d.client.uptime)), ephemeral: false, components: [] });
            s4d.client.user.setPresence({status: "idle",activities:[{name:'my dreams',type:"WATCHING"}]});
            console.log('rebooting...');
            await delay(Number(0.5)*1000);
            exec('sudo reboot');
          } else if ((interaction.options.getString('command')) == 'poweroff') {
            await interaction.reply({ content: ('poweroff, uptime: ' + String(s4d.client.uptime)), ephemeral: false, components: [] });
            s4d.client.user.setPresence({status: "idle",activities:[{name:'my dreams',type:"WATCHING"}]});
            console.log('Shutting down the Bot...');
            await delay(Number(0.5)*1000);
            s4d.client.destroy();
          } else if ((interaction.options.getString('command')) == 'status -c') {
            await interaction.reply({ content: (['what would you like to change my status to? Type: ','\n','1 = Online','\n','2 = Offline (work in progress)','\n','3 = Idle','\n','4 = Do not disturb'].join('')), ephemeral: false, components: [] });
            status_step = 1;
          } else if ((interaction.options.getString('command')) == 'status' || (interaction.options.getString('command')) == 'status -i') {
            await interaction.reply({ content: (['-c change status','\n','-i shows this message'].join('')), ephemeral: false, components: [] });
          } else {
            await interaction.reply({ content: 'unknow command', ephemeral: false, components: [] });
          }
        } else {
          await interaction.reply({ content: 'you are not my owner  :angry: ', ephemeral: false, components: [] });
        }
      }
      if ((interaction.commandName) == 'version') {
        if ((interaction.options.getString('choice')) == 'curV') {
          await interaction.reply({ content: 'I am currently running version **0.0.4 ALPHA**', ephemeral: false, components: [] });
        }
        if ((interaction.options.getString('choice')) == 'hisV') {
          await interaction.reply({ content: ([['Version: 0.0.1 ALPHA: ','28.06.2023-04.07.2023','\n'].join(''),['Version: 0.0.2 ALPHA: ','04.07.2023-07.07.2023','\n'].join(''),['Version: 0.0.3 ALPHA: ','07.07.2023-15.07.2023','\n'].join(''),['current: ','15.07.2023-...','\n'].join('')].join('')), ephemeral: false, components: [] });
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
              await interaction.reply({ content: (['successfully set ',s4d.client.channels.cache.find((channel) => channel.name === 'warnings'),' as a warnings channel','\n','DO NOT FORGET TO SET THE PERMISSIONS FOR THE CHANNEL :warning: '].join('')), ephemeral: false, components: [] });
            }
          }
          if ((interaction.options.getSubcommandGroup()) == 'view') {
            if ((interaction.options.getSubcommand()) == 'all') {
              await interaction.reply({ content: (['Channel list:','\n','Logs: ','-work in progress-','\n','Warnings: ',s4d.client.channels.cache.find((channel) => channel.name === 'warnings')].join('')), ephemeral: false, components: [] });
            }
          }
        }
      }
      if ((interaction.commandName) == 'warn') {
        if ((interaction.member).kickable) {
          await interaction.reply({ content: 'you don\'t have permissions to use this interaction :smiling_face_with_tear: ', ephemeral: false, components: [] });
        } else {
          try {
            s4d.client.channels.cache.find((channel) => channel.name === 'warnings').send({content:String(([interaction.options.getUser('user'),' you got warned for: ',interaction.options.getString('reason'),'\n','by: ',interaction.member].join('')))});
            await interaction.reply({ content: 'success ', ephemeral: false, components: [] });
    
          } catch (err) {
            await interaction.reply({ content: 'An error accord try: ** /channel create warnings  ** to fix the problem, else contact the server owner', ephemeral: false, components: [] });
    
          }}
      }
      if ((interaction.commandName) == 'leveling') {
        if (LXP.has(String(('xp-' + String((interaction.member).id))))) {
          if ((interaction.options.getString('type')) == 'lvl') {
            await interaction.reply({ content: ([interaction.member,', you are currently level: ',LXP.get(String(('level-' + String((interaction.member).id))))].join('')), ephemeral: false, components: [] });
          } else if ((interaction.options.getString('type')) == 'xp') {
            await interaction.reply({ content: ([interaction.member,', you have ',LXP.get(String(('xp-' + String((interaction.member).id)))),' experience'].join('')), ephemeral: false, components: [] });
          }
        } else {
          await interaction.reply({ content: 'you are not singed up for the leveling system', ephemeral: false, components: [] });
        }
      }
      if ((interaction.commandName) == 'functions') {
        if (LXP.has(String(('xp-' + String((interaction.member).id))))) {
          LXP.delete(String(('xp-' + String((interaction.member).id))));
          LXP.delete(String(('level-' + String((interaction.member).id))));
          await interaction.reply({ content: 'successfully singed out', ephemeral: false, components: [] });
        } else {
          LXP.set(String(('xp-' + String((interaction.member).id))), 0);
          LXP.set(String(('level-' + String((interaction.member).id))), 0);
          await interaction.reply({ content: 'you got singed up for the leveling system, to undo this use this interaction again', ephemeral: false, components: [] });
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
          name: 'sudo',
      		description: 'owner only',
      		options: [
              {
              type: 3,
        			name: 'command',
        			description: 'sudo rasbian/discord',
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
          		description: 'shows you all channels',
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
            type: 6,
        	name: 'user',
            required: true,
        	description: 'choose the user that you want to warn',
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
      },{
          name: 'leveling',
      		description: 'XP leveling system',
      		options: [
              {
              type: 3,
        			name: 'type',
        			description: 'choose what exactly you want to know',
        			required: true,
              choices: [
                  {
              name: String('level'),
              value: String('lvl')
          },{
              name: String('experience'),
              value: String('xp')
          },
              ]
        },
          ]
      },{
          name: 'functions',
      		description: 'turn on functions',
      		options: [
              {
              type: 3,
        			name: 'function',
        			description: 'choose what exactly you want to know',
        			required: true,
              choices: [
                  {
              name: String('leveling'),
              value: String('lvling')
          },
              ]
        },
          ]
      },
    ],{
        debug: false,
    
    });
    
    return s4d
})();