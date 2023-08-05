const request = require('supertest');
const app = require('./server');

//Snapshot
describe('GET /favourites', () => {
  it('returns a snapshot of the favourites list', async () => {
    const res = await request(app)
      .get('/favourites')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(res.body).toMatchSnapshot();
  });
});

//Unit test
describe('GET /favourites', () => {
  it('returns a JSON response with the favourites list', async () => {
    const res = await request(app)
      .get('/favourites')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(Array.isArray(res.body)).toBe(true);
  });
});
