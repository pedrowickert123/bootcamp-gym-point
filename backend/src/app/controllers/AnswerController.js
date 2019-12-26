import * as Yup from 'yup';
import { format } from 'date-fns';
import pt from 'date-fns/locale/pt';

import HelpOrder from '../models/HelpOrder';
import Student from '../models/Student';

import AnswerMail from '../jobs/AnswerMail';
import Queue from '../../lib/Queue';

class AnswerController {
  async index(req, res) {
    const page = parseInt(req.query.page || 1, 10);
    const perPage = parseInt(req.query.perPage || 5, 10);

    const whereCondition = !req.params.id
      ? ''
      : {
          where: {
            answer: null,
          },
        };

    const helpOrders = await HelpOrder.findAndCountAll({
      whereCondition,
      order: [['created_at', 'DESC']],
      include: [
        {
          model: Student,
          as: 'student',
          paranoid: false,
          attributes: ['id', 'name'],
        },
      ],
      limit: perPage,
      offset: (page - 1) * perPage,
    });

    const totalPage = Math.ceil(helpOrders.count / perPage);

    return res.json({
      ...helpOrders,
      totalPage,
      page,
      perPage,
    });
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      help_order_id: Yup.string().required(),
      answer: Yup.string().required(),
    });

    const { id } = req.params;
    const { answer } = req.body;

    if (!(await schema.isValid({ help_order_id: id, answer }))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const helpOrder = await HelpOrder.findByPk(id);

    if (!helpOrder) {
      return res.status(400).json({ error: 'Help Order does not exist' });
    }

    helpOrder.answer = answer;
    helpOrder.answer_at = new Date();

    await helpOrder.save();

    const { name, email } = await Student.findByPk(helpOrder.student_id);

    await Queue.add(AnswerMail.key, {
      student: name,
      email,
      question: helpOrder.question,
      answer: helpOrder.answer,
      answer_at: format(helpOrder.answer_at, "dd'/'MM'/'yyyy", {
        locale: pt,
      }),
    });

    return res.json(helpOrder);
  }
}

export default new AnswerController();
