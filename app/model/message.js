'use strict'
const db = require('../../database/db_config.js')
const uuidv1 = require('uuid/v1')

module.exports = app => {
  const messageSchema = require('../schema/message.js')(app)
  const Message = db.defineModel(app, 'message', messageSchema)

  Message.getMessageList = async () => {
    return await Message.findAll({
      attributes: [
        'id',
        'datetime',
        [ 'mess_type', 'mesType' ],
        [ 'mes_content', 'mesContent' ]],
    })
  }

  Message.leaveMessage = async ({ username, email, message }) => {
    return await Message.create({
      id: uuidv1(),
      username,
      email,
      datetime: new Date(),
      mes_content: message,
      mess_type: '0',
      createdTime: new Date(),
      lastModifiedTime: new Date(),
      version: 0,
    })
  }

  return Message
}
