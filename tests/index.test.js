import supertest from 'supertest'
import app from '../src/api/app'

describe('Unit Test Suite', () => {
  it('GET /healthz API endpoint', (done) => {
    supertest(app)
      .get('/healthz')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err)
        return done()
      })
  })
  it('GET 405 API endpoint', (done) => {
    supertest(app)
      .get('/randomendpoint')
      .expect(405)
      .end((err, res) => {
        if (err) return done(err)
        return done()
      })
  })
})
