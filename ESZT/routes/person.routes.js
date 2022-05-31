const express = require('express');
const router = express.Router();
const personController = require('../controllers/person.controller.js');

router.post('/', async (req, res, next) => {
  return await personController.create(req, res, next);
});

router.get('/', async (req, res, next) => {
  return personController.getAll(req, res, next);
});

router.get('/count', async (req, res, next) => {
  return personController.getNumberOfVaccinated(req, res, next);  
});

router.get('/vaccinated', async (req, res, next) => {
  return personController.getVaccinatedData(req, res, next);
});

router.get('/:id', async (req, res, next) => {
  return personController.getById(req, res, next);
});

router.get('/:id/vaccinated' , async (req, res, next) => {
  return personController.isVaccinated(req, res, next);
});

router.put('/:id/:vaccine', async (req, res, next) => {
  return personController.updateVaccine(req, res, next);
});

router.delete('/:vaccine', async (req, res, next) => {
  return personController.deleteVaccine(req, res, next);
});

module.exports = router;
