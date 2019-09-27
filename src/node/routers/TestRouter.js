import { RestController, GET, POST, PUT, DELETE } from 'server-commons/router';
import testService from '../services/TestService';

@RestController('/v1/test')
export default class TestRouter {

  @GET('/')
  async list() {
    return testService.list();
  }

  @GET('/:id')
  async get({ params }) {
    return testService.findOne(params.id);
  }

  @POST('/')
  async create({ body }) {
    return testService.create(body);
  }

  @PUT('/:id')
  async update({ params, body }) {
    await testService.update(params.id, body);
  }

  @DELETE('/:id')
  async remove({ params }) {
    await testService.remove(params.id);
  }

}
