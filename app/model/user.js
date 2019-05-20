'use strict';
const db = require('../../database/db_config.js');

module.exports = app => {
  const adminSchema = require('../schema/user.js')(app);
  const Admin = db.defineModel(app, 'user', adminSchema);

  /**
   * 查找管理员
   * @param {object} { uuid, attributes } - 条件
   * @return {object|null} - 查找结果
   */
  Admin.get = async ({ uuid, attributes }) => {
    return await Admin.findOne({
      attributes,
      where: { uuid },
    });
  };

  /**
   * 修改密码
   * @param {object} params - 条件
   * @return {string} - uuid
   */
  Admin.savePasswordModify = async params => {
    const { uuid, oldPassword, password, lastModifierId, lastModifierName } = params;
    const updateField = { password, lastModifierId, lastModifierName };
    const result = await Admin.update(updateField, { where: { uuid, password: oldPassword } });

    app.checkUpdate(result, '旧密码不正确');

    return uuid;
  };

  return Admin;
};
