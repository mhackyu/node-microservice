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
  return db.createTable('locations', {
    id: {
      type: 'int',
      primaryKey: true,
      autoIncrement: true,
    },
    company_id: {
      type: 'int',
      notNull: true
    },
    branch_name: {
      type: 'string',
      length: 50
    },
    address_line_1: {
      type: 'text',
    },
    address_line_2: {
      type: 'text',
    },
    city: {
      type: 'string',
      notNull: true,
      length: 100
    },
    state_or_province: {
      type: 'text',
      notNull: true,
      length: 100
    },
    postal_code: {
      type: 'text',
      notNull: true,
      length: 10
    },
    country: {
      type: 'text',
      notNull: true,
      length: 50
    },
    contact_no: {
      type: 'text'
    },
    longitude: {
      type: 'string',
      notNull: true,
      length: 50
    },
    latitude: {
      type: 'string',
      notNull: true,
      length: 50
    },
    created_at: {
      type: 'datetime',
      defaultValue: 'CURRENT_TIMESTAMP'
    },
    updated_at: {
      type: 'datetime',
    }
  })
};

exports.down = function(db) {
  return db.dropTable('locations');
};

exports._meta = {
  "version": 1
};
