import * as Yup from 'yup';
import { addMonths, parseISO, format } from 'date-fns';
import pt from 'date-fns/locale/pt';

import Enrollment from '../models/Enrollment';
import Plan from '../models/Plan';
import Student from '../models/Student';

import WellcomeMail from '../jobs/WellcomeMail';
import Queue from '../../lib/Queue';

class EnrollmentController {
  async index(req, res) {
    const page = parseInt(req.query.page || 1, 10);
    const perPage = parseInt(req.query.perPage || 5, 10);

    const entollment = await Enrollment.findAndCountAll({
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['id', 'name'],
        },
        {
          model: Plan,
          as: 'plan',
          attributes: ['id', 'title'],
        },
      ],
      attributes: ['id', 'start_date', 'end_date', 'price', 'active'],
      limit: perPage,
      offset: (page - 1) * perPage,
    });

    const totalPage = Math.ceil(entollment.count / perPage);

    return res.json({
      ...entollment,
      totalPage,
      page,
      perPage,
    });
  }

  async find(req, res) {
    const { id } = req.params;

    const enrollment = await Enrollment.findByPk(id);
    if (!enrollment) {
      return res.status(404).json({ error: 'Enrollment not found.' });
    }

    return res.json(enrollment);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      student_id: Yup.number().required(),
      plan_id: Yup.number().required(),
      start_date: Yup.date().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { student_id, plan_id, start_date } = req.body;

    const student = await Student.findByPk(student_id);

    if (!student) {
      return res.status(400).json({ error: 'Student does not exist' });
    }

    const plan = await Plan.findByPk(plan_id);

    if (!plan) {
      return res.status(400).json({ error: 'Plan does not exist' });
    }

    const totalPrice = Number(plan.price * plan.duration);

    const { id, end_date, price } = await Enrollment.create({
      student_id,
      plan_id,
      start_date,
      end_date: addMonths(parseISO(start_date), plan.duration),
      price: totalPrice,
    });

    await Queue.add(WellcomeMail.key, {
      student: student.name,
      email: student.email,
      plan: plan.title,
      end_date: format(end_date, "dd'/'MM'/'yyyy", {
        locale: pt,
      }),
      price,
    });

    return res.json({
      id,
      student_id,
      plan_id,
      start_date,
      end_date,
      price,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      plan_id: Yup.number().required(),
      start_date: Yup.date().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { id } = req.params;
    const { plan_id, start_date } = req.body;

    const enrollment = await Enrollment.findByPk(id);

    if (!enrollment) {
      return res.status(400).json({ error: 'Enrollment does not exist' });
    }

    const plan = await Plan.findByPk(plan_id);

    if (!plan) {
      return res.status(400).json({ error: 'Plan does not exist' });
    }

    enrollment.price = Number(plan.price * plan.duration);
    enrollment.plan_id = plan_id;
    enrollment.start_date = parseISO(start_date);
    enrollment.end_date = addMonths(parseISO(start_date), plan.duration);

    const { student_id, end_date, price } = await enrollment.save();

    return res.json({
      id,
      student_id,
      plan_id,
      start_date,
      end_date,
      price,
    });
  }

  async delete(req, res) {
    const { id } = req.params;

    const enrollment = await Enrollment.findByPk(id);

    await enrollment.destroy();

    return res.json(enrollment);
  }
}

export default new EnrollmentController();
