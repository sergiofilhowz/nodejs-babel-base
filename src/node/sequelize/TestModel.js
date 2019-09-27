import { DataTypes } from 'sequelize';
import { sequelize } from 'server-commons/database';

const { BIGINT, STRING } = DataTypes;

export default sequelize.define('TestModel', {
  id: { type: BIGINT, primaryKey: true, autoIncrement: true },
  name: STRING,
  short_name: STRING
}, {
  timestamps: false,
  tableName: 'test_table'
});