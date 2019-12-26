import * as Yup from 'yup';
import { subDays, startOfDay, endOfDay } from 'date-fns';
import { Op } from 'sequelize';

import Checkin from '../models/Checkin';
import Student from '../models/Student';

class CheckinController {
  async index(req, res) {
    const { id } = req.params;
    const chenkins = await Checkin.findAll({
      where: {
        student_id: id,
      },
      order: [['created_at', 'DESC']],
    });

    return res.json(chenkins);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      student_id: Yup.number().required(),
    });

    const { id } = req.params;

    if (!(await schema.isValid({ student_id: id }))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const student = await Student.findByPk(id);

    if (!student) {
      return res.status(400).json({ error: 'Student does not exist' });
    }

    const checkins = await Checkin.findAll({
      where: {
        student_id: id,
        created_at: {
          [Op.between]: [
            startOfDay(subDays(startOfDay(new Date()), 7)),
            endOfDay(new Date()),
          ],
        },
      },
    });

    if (checkins.length >= 5) {
      return res.status(401).json({ error: 'You can not checkin' });
    }

    const checkin = await Checkin.create({ student_id: id });

    return res.json(checkin);
  }
}

export default new CheckinController();
