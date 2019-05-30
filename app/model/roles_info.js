'use strict';
const db = require('../../database/db_config.js');

module.exports = app => {
  const adminSchema = require('../schema/roles_info')(app);
  const RolesInfo = db.defineModel(app, 'roles_info', adminSchema);

  return RolesInfo;
};
