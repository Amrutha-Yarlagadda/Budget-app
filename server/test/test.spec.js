var assert = require('assert');
var utils = require('../utils');

describe('server', function () {
  describe('groupByMonth', function () {
    it('should group all the expenses by month', function () {
     let expensesList = [
        {
          id: 1,
          title: 'Room',
          amount: 100,
          userId: 1000084,
          categoryId: 1,
          createdDate: '2023-11-11T00:00:00.000Z',
          modifiedAt: '2023-11-23T22:27:00.000Z'
        },
        {
          id: 2,
          title: 'GARAGE',
          amount: 100,
          userId: 1000084,
          categoryId: 1,
          createdDate: '2023-11-11T00:00:00.000Z',
          modifiedAt: '2023-11-23T22:27:00.000Z'
        },
        {
          id: 3,
          title: 'Food',
          amount: 100,
          userId: 1000084,
          categoryId: 2,
          createdDate: '2023-11-11T00:00:00.000Z',
          modifiedAt: '2023-11-23T22:27:00.000Z'
        },
        {
          id: 4,
          title: 'Room',
          amount: 300,
          userId: 1000084,
          categoryId: 1,
          createdDate: '2023-10-10T00:00:00.000Z',
          modifiedAt: '2023-11-23T22:27:00.000Z'
        },
        {
          id: 5,
          title: 'GARAGE',
          amount: 100,
          userId: 1000084,
          categoryId: 1,
          createdDate: '2023-10-10T00:00:00.000Z',
          modifiedAt: '2023-11-23T22:27:00.000Z'
        },
        {
          id: 6,
          title: 'Food',
          amount: 100,
          userId: 1000084,
          categoryId: 2,
          createdDate: '2023-10-10T00:00:00.000Z',
          modifiedAt: '2023-11-23T22:27:00.000Z'
        },
        {
          id: 7,
          title: 'Room',
          amount: 100,
          userId: 1000084,
          categoryId: 1,
          createdDate: '2023-09-09T00:00:00.000Z',
          modifiedAt: '2023-11-23T22:27:00.000Z'
        },
        {
          id: 8,
          title: 'GARAGE',
          amount: 300,
          userId: 1000084,
          categoryId: 1,
          createdDate: '2023-09-09T00:00:00.000Z',
          modifiedAt: '2023-11-23T22:27:00.000Z'
        },
        {
          id: 9,
          title: 'Food',
          amount: 100,
          userId: 1000084,
          categoryId: 2,
          createdDate: '2023-09-09T00:00:00.000Z',
          modifiedAt: '2023-11-23T22:27:00.000Z'
        },
        {
          id: 10,
          title: 'Room',
          amount: 100,
          userId: 1000084,
          categoryId: 1,
          createdDate: '2023-07-07T00:00:00.000Z',
          modifiedAt: '2023-11-23T22:27:00.000Z'
        },
        {
          id: 11,
          title: 'GARAGE',
          amount: 300,
          userId: 1000084,
          categoryId: 1,
          createdDate: '2023-07-07T00:00:00.000Z',
          modifiedAt: '2023-11-23T22:27:00.000Z'
        },
        {
          id: 12,
          title: 'Food',
          amount: 100,
          userId: 1000084,
          categoryId: 2,
          createdDate: '2023-07-07T00:00:00.000Z',
          modifiedAt: '2023-11-23T22:27:00.000Z'
        },
        {
          id: 1000060,
          title: 'BlueMoon',
          amount: 22,
          userId: 1000084,
          categoryId: 2,
          createdDate: '2023-11-03T00:00:00.000Z',
          modifiedAt: '2023-11-26T15:19:32.000Z'
        },
        {
          id: 1000061,
          title: 'Mutton',
          amount: 33,
          userId: 1000084,
          categoryId: 1,
          createdDate: '2023-11-07T00:00:00.000Z',
          modifiedAt: '2023-11-26T15:22:22.000Z'
        },
        {
          id: 1000062,
          title: 'Chicken',
          amount: 11,
          userId: 1000084,
          categoryId: 1,
          createdDate: '2023-11-01T00:00:00.000Z',
          modifiedAt: '2023-11-26T15:23:04.000Z'
        },
        {
          id: 1000063,
          title: 'Biryani',
          amount: 30,
          userId: 1000084,
          categoryId: 4,
          createdDate: '2023-11-17T00:00:00.000Z',
          modifiedAt: '2023-11-26T16:30:31.000Z'
        }
      ]

      let categories  = [
        { id: 1, name: 'RENT', userId: 1000084, limit: 4000 },
         {id: 2, name: 'GROCESRIES',userId: 1000084, limit: 1000},
         { id: 3, name: 'TEST', userId: 1000084, limit: 123 },
         { id: 4, name: 'COMMUTE', userId: 1000084, limit: 500 }
      ]
      let groupByMonth = utils.groupByMonth(expensesList, categories)
      assert.deepEqual(groupByMonth, [
        { month: 'July', amount: 500, limit: 5623 },
        { month: 'September', amount: 500, limit: 5623 },
        { month: 'October', amount: 500, limit: 5623 },
        { month: 'November', amount: 396, limit: 5623 }
      ]);
    });
  });
});