module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert(
      'students',
      [
        {
          email: 'pedrowickert98@gmail.com',
          name: 'Pedro Wickert',
          age: 21,
          weight: '71',
          height: '1.71',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          email: 'joazinho@gmail.com',
          name: 'Joãozinho da Silva',
          age: 40,
          weight: '87',
          height: '1.79',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          email: 'mariazinha@gmail.com',
          name: 'Mariazinha',
          age: 21,
          weight: '55',
          height: '1.59',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          email: 'wesley@gmail.com',
          name: 'Wesley Alvez',
          age: 31,
          weight: '90',
          height: '1.80',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          email: 'mauro@gmail.com',
          name: 'Mauro',
          age: 24,
          weight: '83',
          height: '1.84',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          email: 'fernanda@gmail.com',
          name: 'Fernanda da Rosa',
          age: 27,
          weight: '63',
          height: '1.69',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: () => {},
};
