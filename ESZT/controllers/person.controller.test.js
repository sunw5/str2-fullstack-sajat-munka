const createError = require('http-errors');
const { mockRequest, mockResponse } = require('jest-mock-req-res');

const personController = require('./person.controller');
const personService = require('../services/person.service');

jest.mock('../services/person.service');

describe('person controller', () => {
  const mockData = [
    {
      id: 1,
      first_name: 'Fiorenze',
      last_name: 'Dyneley',
      vaccine: 'Pfizer',
    },
    {
      id: 2,
      first_name: 'Owen',
      last_name: 'Jirka',
      vaccine: 'Moderna',
    },
    {
      id: 3,
      first_name: 'Terra',
      last_name: 'Hurdman',
      vaccine: 'Sinofarm',
    },
    {
      id: 4,
      first_name: 'Thomasin',
      last_name: 'de Keep',
      vaccine: 'Sputnik',
    },
    {
      id: 5,
      first_name: 'Lawrence',
      last_name: 'Tearle',
      vaccine: 'Pfizer',
    },
  ];

  let response;
  const nextFunction = jest.fn();

  beforeEach(() => {
    personService.__setMockData(mockData);
    response = mockResponse();
  });

  describe('getById', () => {
    it('should return a person', async () => {
      const request = mockRequest({
        params: {
          id: 1,
        },
      });

      await personController.getById(request, response, nextFunction);
      expect(personService.getById).toHaveBeenCalledWith(1);
      expect(response.json).toHaveBeenCalledWith(mockData[0]);
    });

    it('should return a 404 error', async () => {
      const request = mockRequest({
        params: {
          id: 6,
        },
      });

      await personController.getById(request, response, nextFunction);
      expect(personService.getById).toHaveBeenCalledWith(6);
      expect(nextFunction).toHaveBeenCalledWith(
        new createError.NotFound(`Person with id 6 not found`)
      );
    });
  });

  describe('create', () => {
    it('should create a person', async () => {
      const request = mockRequest({
        body: {
          first_name: 'Jack',
          last_name: 'London',
          vaccine: 'Pfizer',
        },
      });

      await personController.create(request, response, nextFunction);
      expect(personService.create).toHaveBeenCalledWith(request.body);
      expect(response.json).toHaveBeenCalledWith(
        expect.objectContaining({
          first_name: 'Jack',
          last_name: 'London',
          vaccine: 'Pfizer',
        })
      );
    });
  });

  describe('update', () => {
    it('should update a person', async () => {
      const request = mockRequest({
        params: {
          id: 1,
          vaccine: 'Moderna',
        },       
      });

      await personController.updateVaccine(request, response, nextFunction);
      expect(personService.updateVaccine).toHaveBeenCalledWith(request.params.id, request.params.vaccine);
      expect(response.json).toHaveBeenCalledWith(
        expect.objectContaining({
          first_name: 'Fiorenze',
          last_name: 'Dyneley',
          vaccine: 'Moderna',
        })
      );
    });

    it('should return a 404 error', async () => {
      const request = mockRequest({
        params: {
          id: 6,
          vaccine: 'Moderna',
        },        
      });

      await personController.updateVaccine(request, response, nextFunction);      
      expect(personService.updateVaccine).toHaveBeenCalledWith(request.params.id, request.params.vaccine);
      expect(nextFunction).toHaveBeenCalledWith(
        new createError.NotFound(`Person with id ${request.params.id} not found`)
      );
    });
  });
});
