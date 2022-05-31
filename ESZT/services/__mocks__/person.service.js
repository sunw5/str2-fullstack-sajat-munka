const createError = require('http-errors');
const personService = jest.mock('./person.service');

let mockData;

personService.getById = jest.fn((id) => {
  return new Promise((resolve, reject) => {
    const person = mockData.find((person) => person.id === id);    

    person ? resolve(person) : resolve(false);

    // this works too:
    // if (person) {
    //   resolve(person);      
    // } else {
    //   reject(
    //     new createError.NotFound(`Person with id ${id} not found`)        
    //   );
    // }
  });
});

personService.create = jest.fn((person) => {
  return new Promise((resolve, reject) => {
    mockData.push(person);
    resolve(person);
  });
});

personService.updateVaccine = jest.fn((id, vaccine) => {
  return new Promise((resolve, reject) => {
    const person = mockData.find((person) => person.id === id);
    if (!person) {
      reject(
        new createError.NotFound(`Person with id ${id} not found`)
      );
    }
    person.vaccine = vaccine;
    resolve(person);
  });
});

personService.__setMockData = (data) => (mockData = data);

module.exports = personService;
