import TestHelper from './test.helper';

const { http, sync, expect } = TestHelper;
const { get, post, put } = http;

const PATH = '/v1/test';

describe('Test', () => {
  beforeEach(() => sync());

  it('should create', async () => {
    let response = await get(PATH);
    response.should.have.status(200);
    expect(response.body).with.length(0);

    response = await post(PATH, {
      name: 'This is one name',
      short_name: 'TION'
    });
    response.should.have.status(200);

    response = await get(PATH);
    response.should.have.status(200);
    expect(response.body).with.length(1);
    expect(response.body[0]).to.have.property('name').equal('This is one name');
    expect(response.body[0]).to.have.property('short_name').equal('TION');
  });

  it('should get', async () => {
    let response = await post(PATH, {
      name: 'This is one name',
      short_name: 'TION'
    });
    response.should.have.status(200);
    expect(response.body).to.have.property('id');

    const { id } = response.body;

    response = await get(`${PATH}/${id}`);
    response.should.have.status(200);
    expect(response.body).to.have.property('name').equal('This is one name');
    expect(response.body).to.have.property('short_name').equal('TION');
  });

  it('should update', async () => {
    let response = await post(PATH, {
      name: 'This is one name',
      short_name: 'TION'
    });
    response.should.have.status(200);
    expect(response.body).to.have.property('id');

    const { id } = response.body;

    response = await put(`${PATH}/${id}`, {
      name: 'This is another name',
      short_name: 'TIAN'
    });
    response.should.have.status(200);

    response = await get(`${PATH}/${id}`);
    response.should.have.status(200);
    expect(response.body).to.have.property('name').equal('This is another name');
    expect(response.body).to.have.property('short_name').equal('TIAN');
  });

  it('should delete', async () => {
    let response = await post(PATH, {
      name: 'This is one name',
      short_name: 'TION'
    });
    response.should.have.status(200);
    expect(response.body).to.have.property('id');

    const { id } = response.body;

    response = await get(PATH);
    response.should.have.status(200);
    expect(response.body).with.length(1);

    response = await get(`${PATH}/${id}`);
    response.should.have.status(200);

    response = await http.delete(`${PATH}/${id}`);
    response.should.have.status(200);

    response = await get(`${PATH}/${id}`);
    response.should.have.status(404);

    response = await get(PATH);
    response.should.have.status(200);
    expect(response.body).with.length(0);
  });

});
