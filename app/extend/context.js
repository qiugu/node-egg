/* eslint-disable */
module.exports = {
  SUCCESS_CODE: 0, // 成功
  NO_LOGIN_CODE: 100, // 未登录
  UNIQUE_CODE: 200, // 唯一性冲突
  ERROR_CODE: 500, // 失败

  // 获取token
  getAccessToken() {
    return this.app.redis.get('token')
  },

  // 设置token
  setToken(data = {}) {
    const { app } = this

    const token = app.jwt.sign(data, app.config.jwt.secret, {
      expiresIn: '12h',
    })

    app.redis.set('token',token)

    return token
  },
  removeToken() {
    this.cookies.set('token', null)
  },

  // 校验token
  async verifyToken() {
    const { app } = this
    const token = await this.getAccessToken(this)
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
