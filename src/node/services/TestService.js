import _ from 'lodash';
import { NotFoundError } from 'server-commons/errors';
import TestModel from '../sequelize/TestModel';

class TestService {
  properties = ['name', 'short_name'];

  async create(body) {
    const model = TestModel.build();
    const fields = this.assign(model, body);
    return model.save({ fields });
  }

  async remove(id) {
    const model = await this.findOne(id);
    await model.destroy();
  }

  async update(id, body) {
    const model = await this.findOne(id);
    const fields = this.assign(model, body);
    return model.save({ fields });
  }

  async findOne(id) {
    const model = await TestModel.findOne({ where: { id } });
    if (!model) {
      throw new NotFoundError('Entity not Found');
    }
    return model;
  }

  async list() {
    return TestModel.findAll();
  }

  // internal

  assign(model, payload) {
    const usablePayload = _.pick(payload, this.properties);
    _.assign(model, usablePayload);
    return _.keys(usablePayload);
  }
}

export default new TestService();
