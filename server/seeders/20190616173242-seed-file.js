'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
   return queryInterface.bulkInsert('Vendors', [{
      firstname: 'Samuel',
      lastname: 'Manzi',
      email: 'manzi.samuel@andela.com',
      password: 'Manzi56Sam',
      createdAt : new Date(),
      updatedAt : new Date(),
      isadmin: true
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
   queryInterface.bulkDelete('Vendors', [{
      firstname :'Samuel'
    }]);
  }
};
