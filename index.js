const Discord = require('discord.js')
const client = new Discord.Client()

const config = require('./config.json')
const command = require('./command')
const poll = require('./poll')
const welcome = require('./welcome')
const memberCount = require('./member-count')
const mute = require('./mute')


client.on('ready', () => {
  console.log('Bot is ready!')

  memberCount(client)
  welcome(client)
  poll(client)
  mute(client)

  command(client, 'ban', (message) => {
    const { member, mentions } = message

    const tag = `<@${member.id}>`

    if (
      member.hasPermission('ADMINISTRATOR') ||
      member.hasPermission('BAN_MEMBERS')
    ) {
      const target = mentions.users.first()
      if (target) {
        const targetMember = message.guild.members.cache.get(target.id)
        targetMember.ban()
        message.channel.send(`${tag} That user has been`)
      } else {
        message.channel.send(`${tag} Please specify someone to ban.`)
      }
    } else {
      message.channel.send(
        `${tag} You do not have permission to use this command.`
      )
    }
  })

  command(client, 'kick', (message) => {
    const { member, mentions } = message

    const tag = `<@${member.id}>`

    if (
      member.hasPermission('ADMINISTRATOR') ||
      member.hasPermission('KICK_MEMBERS')
    ) {
      const target = mentions.users.first()
      if (target) {
        const targetMember = message.guild.members.cache.get(target.id)
        targetMember.kick()
        message.channel.send(`${tag} That user has kicked`)
      } else {
        message.channel.send(`${tag} Please specify someone to kick.`)
      }
    } else {
      message.channel.send(
        `${tag} You do not have permission to use this command.`
      )
    }
  })

  command(client, 'embed', (message) => {

    const embed = new Discord.MessageEmbed()
      .setTitle('Server Rules')
      .setURL('https://discord.com/terms')
      .setAuthor('Food#0999')
      .setImage(logo)
      .setThumbnail(logo)
      .setFooter('https://github.com/Amogus21/')
      .setColor('#00AAFF')
      .addFields(
        {
          name: 'Rule 1',
          value: 'Common Sense',
          inline: true,
        },
        {
          name: 'Rule 2',
          value: ' No spamming, flooding, racism, threats, leaking personal information,etc',
          inline: true,
        },
        {
          name: 'Rule 3',
          value: 'Each channel has a intended purpose in mind, follow them properly.',
          inline: true,
        },
        {
          name: 'Rule 4',
          value: 'Follow the Terms of Service provided by Discord.',
        },
        {
            name: 'Rule 5',
            value: 'Get straight to the point when DMing any staff member',
            inline: true,
          },
          {
            name: 'Rule 6',
            value: 'Do not send any unecessary DMs',
            inline: true,
          },

      )

    message.channel.send(embed)
  })

  command(client, 'servers', (message) => {
    client.guilds.cache.forEach((guild) => {
      message.channel.send(
        `${guild.name} has a total of ${guild.memberCount} members`
      )
    })
  })

  command(client, ['cc', 'clearchannel'], (message) => {
    if (message.member.hasPermission('ADMINISTRATOR')) {
      message.channel.messages.fetch().then((results) => {
        message.channel.bulkDelete(results)
      })
    }
  })

  command(client, 'status', (message) => {
    const content = message.content.replace('!status ', '')
 
    client.user.setPresence({
      activity: {
        name: content,
        type: 0,
      },
    })
  })
})

client.login(config.token)
