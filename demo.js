const nodeIrcJS = require('./node.irc.js')

const sock = new nodeIrcJS('irc.irc7.com', 6697, true)
  .on('disconnect', () => console.log('*** Disconnected ***'))

  .on('ACTION', (text) => console.log(`* ${ sock.event.nick } ${ text }`))
  .on('JOIN', (special) => console.log(`* ${ sock.event.nick } has joined ${ sock.event.target }`))
  .on('PRIVMSG', (text) => console.log(`<${ sock.event.nick }> ${ text }`))
  .on('NOTICE', (text) => console.log(`-${ sock.event.nick }- ${ text }`))
  .on('CTCP', (cmd, text) => console.log(`[${ sock.event.nick } ${ cmd }] ${ text }`))
  .on('CTCPREPLY', (cmd, text) => console.log(`[${ sock.event.nick } ${ cmd } reply] ${ text }`))

sock.connect((sock) => {
  console.log('*** Connected ***')
  sock.send('JOIN %#The\\bLobby')
})
