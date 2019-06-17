/* eslint-disable */
module.exports = {
  SUCCESS_CODE: 0, // 成功
  NO_LOGIN_CODE: 100, // 未登录
  UNIQUE_CODE: 200, // 唯一性冲突
  ERROR_CODE: 500, // 失败

  // 获取token
  getAccessToken() {
    const uuid = this.cookies.get('uuid', { 
      encrypt:true,
      signed: true
    })
    if (!uuid) {
      this.verifyFail(ERROR_CODE, '登陆时效，请重新登陆')
    }
    return this.app.redis.get(uuid)
  },

  // 设置token
  async setToken(data = {}) {
    const { app } = this

    let { uuid } = data
    this.logger.info(app.config.keys)
    const token = app.jwt.sign(data, app.config.jwt.secret, {
      expiresIn: '12h',
    })

    await app.redis.set(uuid, token)

    this.cookies.set('uuid', uuid, {
      maxAge: 1000 * 60 * 60 * 12,
      encrypt: true,
      signed: true
    })

    return token
  },
  removeToken() {
    this.cookies.set('uuid', null)
  },

  // 校验token
  async verifyToken(token) {
    const { app } = this
    const verifyResult = await new Promise(resolve => {
      app.jwt.verify(token, app.config.jwt.secret, (err, decoded) => {
        if (err) {
          if (err.name === 'TokenExpiredError') {
            // this.setToken({ name, userUuid, userName, userType }) // 刷新token
            resolve({ verify: false, message: err.message })
          } else {
            resolve({ verify: false, message: err.message })
          }
        } else {
          resolve({ verify: true, message: decoded })
        }
      })
    })

    if (!verifyResult.verify) {
      this.verifyFail(401, verifyResult.message)
      return false
    } else {
      return true
    }
  },

  // 校验token失败
  verifyFail(code, message) {
    this.body = { code, message }
    this.status = code
  },
}
