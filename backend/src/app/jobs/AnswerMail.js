import Mail from '../../lib/Mail';

class AnswerMail {
  get key() {
    return 'AnswerMail';
  }

  async handle({ data }) {
    await Mail.sendMail({
      to: `${data.student} <${data.email}>`,
      subject: 'Resposta - Gym Point',
      template: 'answer',
      context: {
        student: data.student,
        question: data.question,
        answer: data.answer,
        answer_at: data.answer_at,
      },
    });
  }
}

export default new AnswerMail();
