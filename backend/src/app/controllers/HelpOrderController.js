import * as Yup from 'yup';

import HelpOrder from '../models/HelpOrder';
import Student from '../models/Student';

class HelpOrderController {
  async index(req, res) {
    const page = parseInt(req.query.page || 1, 10);
    const perPage = parseInt(req.query.perPage || 5, 10);

    const studentExists = await Student.findByPk(req.params.id);

    if (!studentExists)
      return res.status(400).json({ error: 'Student not found' });

    const helporders = await HelpOrder.findAndCountAll({
      order: [['created_at', 'DESC']],
      where: { student_id: req.params.id },
      limit: perPage,
      offset: (page - 1) * perPage,
      include: [
        {
          model: Student,
          paranoid: false,
          as: 'student',
          attributes: ['id', 'name'],
        },
      ],
    });

    const totalPage = Math.ceil(helporders.count / perPage);

    return res.json({
      page,
      perPage,
      data: helporders.rows,
      total: helporders.count,
      totalPage,
    });
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      student_id: Yup.number().required(),
      question: Yup.string().required(),
    });

    const { id } = req.params;
    const { question } = req.body;

    if (!(await schema.isValid({ student_id: id, question }))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const student = await Student.findByPk(id);

    if (!student) {
      return res.status(400).json({ error: 'Student does not exist' });
    }

    const { id: help_order_id, student_id } = await HelpOrder.create({
      student_id: id,
      question,
    });

    return res.json({ id: help_order_id, student_id, question });
  }
}

export default new HelpOrderController();
