'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db) {
  return db.createTable('companies', {
    id: {
      type: 'int',
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: 'string',
      notNul: true
    },
    logo: {
      type: 'text',
    },
    created_at: {
      type: 'datetime',
      defaultValue: 'CURRENT_TIMESTAMP'
    },
    updated_at: {
      type: 'datetime',
    }
  });
};

exports.down = function(db) {
  return db.dropTable('companies');
};

exports._meta = {
  "version": 1
};
