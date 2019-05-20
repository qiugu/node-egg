/* eslint-disable strict */
module.exports = {
  // 设置token
  setToken(data = {}) {
    const { app } = this;
    let { uuid, roles, username, name } = data;

    // 如果需要得到精确的结果，需要自己另加额外的控制标志位
    if (decodeURI(name) === name) {
      name = encodeURI(name);
    }

    const token = app.jwt.sign(data, app.config.jwt.secret, {
      expiresIn: '12h',
    });
    const cookieConfig = {
      maxAge: 1000 * 3600 * 24 * 7,
      httpOnly: true,
      overwrite: true,
      signed: false,
    };

    this.cookies.set('token', token, cookieConfig);
    this.cookies.set('name', name, cookieConfig);
    this.cookies.set('userUuid', uuid, cookieConfig);
    this.cookies.set('username', username, cookieConfig);
    this.cookies.set('roles', roles, cookieConfig);

    return token;
  },
};
