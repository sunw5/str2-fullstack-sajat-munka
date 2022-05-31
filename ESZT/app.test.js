const app = require('./app');
const mongoose = require('mongoose');
const supertest = require('supertest');
const config = require('config');
const Person = require('./models/person.model');
const logger = require('./utils/logger');

describe('REST API integration test', () => {
  const insertData = [
    {
      first_name: 'John',
      last_name: 'Test',
      vaccine: 'Pfizer',
    },
    {
      first_name: 'Jill',
      last_name: 'Test',
      vaccine: 'Moderna',
    },
  ];

  beforeEach((done) => {
    const { username, password, host } = config.get('database');
    mongoose
      .connect(`mongodb+srv://${host}`, {
        user: username,
        pass: password,
        // dbName: 'JestDB',
      })
      .then(() => {
        done();
      })
      .catch((err) => {
        logger.error('Could not connect to database', err);
        process.exit();
      });
  });

  afterEach((done) => {
    // mongoose.connection.db.dropDatabase(() => {
      mongoose.connection.db.dropCollection('people', () => {
        mongoose.connection.close(() => {
          done();
        });
      });
    // });
  });

  test('GET /person', () => {
    return Person.insertMany(insertData)
      .then(() => supertest(app).get('/person').expect(200))
      .then((response) => {
        expect(Array.isArray(response.body)).toBeTruthy();
        expect(response.body.length).toEqual(insertData.length);

        response.body.forEach((person, index) => {
          expect(person.first_name).toBe(insertData[index].first_name);
          expect(person.last_name).toBe(insertData[index].last_name);
          expect(person.vaccine).toBe(insertData[index].vaccine);
        });
      });
      
  });

  test('PUT /person/:id/:vaccine', () => {
    return Person.insertMany(insertData)
      .then((res) => {
        const id = res[0]._id.toString();
        return supertest(app).put(`/person/${id}/Johnson`).expect(200);
      })
      .then((res) => {
        expect(res.body.vaccine).toBe('Johnson');
      });
  });
});
