const personService = require('../services/person.service');
const createError = require('http-errors');
const logger = require('../utils/logger');

// fetch('http://localhost:3000/person', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({
//       first_name: 'Jill',
//       last_name: 'London',
//       vaccine: 'Pfizer'
//     })
//   }).then(res=>res.json()).then(res=>console.log(res))

const create = async (req, res, next) => {
  try {
    const { first_name, last_name, vaccine } = req.body;
    if (!first_name || !last_name || !vaccine) {
      return next(
        new createError.BadRequest('Missing first_name or last_name or vaccine')
      );
    }
    const person = { first_name, last_name, vaccine };
    const queryResult = await personService.create(person);
    logger.debug(`Created person ${JSON.stringify(queryResult)}`);
    res.json(person);
  } catch (error) {
    next(error);
  }
};

const getAll = async (req, res, next) => {
  try {
    const allPeople = await personService.getAll();
    logger.debug(`Returned ${allPeople.length} people`);
    res.json(allPeople);
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const person = await personService.getById(id);
    if (!person) {      
      return next(
        new createError.NotFound(`Person with id ${req.params.id} not found`)
      );
    }
    logger.debug(`Returned person ${JSON.stringify(person)}`);
    res.json(person);
  } catch (error) {
    next(error);
  }
};

const isVaccinated = async (req, res, next) => {
  try {
    const person = await personService.getById(req.params.id);
    if (!person) {      
      return next(
        new createError.NotFound(`Person with id ${req.params.id} not found`)
      );
    }
    logger.debug(`Returned person with id: ${person.id}`);
    res.json(person.vaccine === null ? false : true);
  } catch (error) {
    next(error);
  }
};

// fetch('http://localhost:3000/person/1/Moderna', {
//     method: 'PUT',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: ""
//   }).then(res=>res.json()).then(d=>console.log(d))

const updateVaccine = async (req, res, next) => {
  try {
    const person = await personService.updateVaccine(
      req.params.id,
      req.params.vaccine
    );    
    if (!person) {
      return next(new createError(404, `Person with id ${req.params.id} not found`));
    }
    logger.debug(`Updated person ${JSON.stringify(person)}`);
    res.json(person);
  } catch (error) {
    next(error);
  }
};

// fetch(`http://localhost:3000/person/Pfizer`, {
//   method: 'DELETE',
// }).then(res=>console.log(res))

const deleteVaccine = async (req, res, next) => {
  try {    
    const result = await personService.deleteVaccine(req.params.vaccine);
    if (!result) {      
      return next(new createError(404, 'Vaccine not found'));
    }
    logger.debug(`Deleted people ${result.deletedCount}`);
    res.json(true);
  } catch (error) {
    next(error);
  }
};

const getNumberOfVaccinated = async (req, res, next) => {
  try {
    const count = await personService.getNumberOfVaccinated();    
    logger.debug(`Returned ${count} people`);
    res.json(count);
  } catch (error) {
    next(error);
  }
};

const getVaccinatedData = async (req, res, next) => {
  try {
    const data = await personService.getVaccinatedData();
    logger.debug(`Returned ${data.length} people`);
    res.json(data);
  } catch (error) {
    next(error);
  }
};

module.exports = { create, getAll, getById, isVaccinated, updateVaccine, deleteVaccine, getNumberOfVaccinated, getVaccinatedData };
