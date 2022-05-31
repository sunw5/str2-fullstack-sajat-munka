const fsp = require('fs').promises;
const { join } = require('path');
const PersonModel = require('../models/person.model');

(async () => {
  try {
    const data = await fsp.readFile(join(__dirname, 'MOCK_DATA.json'), 'utf8');
    const persons = JSON.parse(data);
    await PersonModel.insertMany(persons);
    console.log('Successfully seeded database');
  } catch (error) {
    console.error(error);
  }
}
)();