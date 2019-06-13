'use strict'
const Subscription = require('egg').Subscription

/**
 * 定时获取消息通知任务
 */
class UpdateMessage extends Subscription {
  static get schedule() {
    return {
      interval: '12h',
      type: 'all',
      immediate: true,
    }
  }

  async subscribe() {
    const { ctx } = this
    const res = await ctx.service.personal.getMessage()
    ctx.logger.info('schedule update message finish')
    ctx.app.cache = res
  }
}

module.exports = UpdateMessage
