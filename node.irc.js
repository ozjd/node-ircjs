const net = require('net'),
      tls = require('tls'),
      ircJS = require('ircjs')

class nodeIrcJS extends ircJS {
  constructor(hostname, port, useTLS) {
    super(hostname, port, useTLS)
    if (useTLS === false)
      this._transport = new net.Socket()
    else
      this._transport = new tls.TLSSocket()
    this._setHandlers()
  }

  connect(callback) {
    super.connect(callback)
    // TODO: Make sure disconnected state or throw error
    this._transport.connect(this.client.port, this.client.serverTarget)
  }

  send(data) {
    super.send(data)
    // TODO: Make sure connected state or throw error
    this._transport.write(`${ data }\r\n`)
  }

  _setHandlers() {
    super._setHandlers()
    this._transport
      .on('close', () => { this.emit('disconnect') })
      .on('connect', () => { this.emit('connect', this) })
      .on('data', (data) => { this.emit('data', data.toString()) })
      .on('error', (err) => { this.emit('error', err) })
  }
}

module.exports = nodeIrcJS
