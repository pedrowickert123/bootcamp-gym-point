import Mail from '../../lib/Mail';

class WellcomeMail {
  get key() {
    return 'WellcomeMail';
  }

  async handle({ data }) {
    await Mail.sendMail({
      to: `${data.student} <${data.email}>`,
      subject: 'Boas Vindas - Gym Point',
      template: 'wellcome',
      context: {
        student: data.student,
        plan: data.plan,
        end_date: data.end_date,
        price: `R$ ${Number(data.price).toLocaleString('pt-BR', {
          minimumFractionDigits: 2,
        })}`,
      },
    });
  }
}

export default new WellcomeMail();
