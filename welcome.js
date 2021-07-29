module.exports = (client) => {
    const channelId = '' // welcome channel
    const targetChannelId = '' //channel with rules and info
  
    client.on('guildMemberAdd', (member) => {
      const message = `Please welcome <@${
        member.id
      }> to the server! Please check out ${member.guild.channels.cache
        .get(targetChannelId)
        .toString()}`
  
      const channel = member.guild.channels.cache.get(channelId)
      channel.send(message)
    })
}