module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert(
      'enrollments',
      [
        {
          student_id: 1,
          plan_id: 1,
          start_date: '2020-01-01 00:00:00',
          end_date: '2020-02-01 00:00:00',
          price: 129,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          student_id: 2,
          plan_id: 1,
          start_date: '2020-01-01 00:00:00',
          end_date: '2020-02-01 00:00:00',
          price: 129,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          student_id: 3,
          plan_id: 2,
          start_date: '2020-01-01 00:00:00',
          end_date: '2020-04-01 00:00:00',
          price: 327,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          student_id: 4,
          plan_id: 1,
          start_date: '2019-01-01 00:00:00',
          end_date: '2019-02-01 00:00:00',
          price: 129,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          student_id: 5,
          plan_id: 1,
          start_date: '2019-10-01 00:00:00',
          end_date: '2019-10-01 00:00:00',
          price: 129,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          student_id: 5,
          plan_id: 3,
          start_date: '2020-03-21 00:00:00',
          end_date: '2020-09-21 00:00:00',
          price: 534,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: () => {},
};
