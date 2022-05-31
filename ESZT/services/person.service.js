const Person = require('../models/person.model');
const mongoose = require('mongoose');


const create = async (person) => {  
  const newPerson = new Person(person);
  const result = await newPerson.save();
  return result;
};

const getAll = async () => {
  return Person.find({});
};

const getById = async (id) => { 
  if( !mongoose.Types.ObjectId.isValid(id) ) return false;
  // const result = await Person.findById(id);
  return Person.findById(id);
};

const updateVaccine = async (id, vaccine) => {    
  if( !mongoose.Types.ObjectId.isValid(id) ) return false;  
  const updatedPerson = await Person.findByIdAndUpdate(id, {vaccine: vaccine}, {new: true});
  // console.log(updatedPerson);
  return updatedPerson;  
};

const deleteVaccine = async (vaccine) => {
  return await Person.deleteMany({vaccine: vaccine});
};

const getVaccinated = async () => {
  return await Person.find({vaccine: {$ne: null}});
};

const getNumberOfVaccinated = async () => {
  return (await getVaccinated()).length;
};

const getVaccinatedData = async () => {
  return await getVaccinated();
};

module.exports = {
  create,
  getAll,
  getById,
updateVaccine,
  getNumberOfVaccinated,
  getVaccinated,
  deleteVaccine,
  getVaccinatedData
};
