import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import * as Yup from 'yup';

import { Form, Input } from '@rocketseat/unform';
import { addMonths, parseISO, format } from 'date-fns';
import { MdCheck, MdArrowBack } from 'react-icons/md';
import { toast } from 'react-toastify';

import api from '../../../services/api';
import { formatBrPrice } from '~/util/format';

import Container from '../../../components/Container';
import HeaderPage from '../../../components/HeaderPage';
import HeaderTitle from '../../../components/HeaderTitle';
import Button from '../../../components/Button';
import ButtonLink from '../../../components/ButtonLink';
import FormRow from '../../../components/FormRow';
import FormGroup from '../../../components/FormGroup';
import ReactSelect from '../../../components/Select';
import ReactSelectAsync from '../../../components/SelectAsync';

import { Content } from './styles';

const schema = Yup.object().shape({
  student_id: Yup.string().required('O aluno é obrigatório'),
  plan_id: Yup.string().required('O plano é obrigatório'),
  start_date: Yup.string().required('A data de início é obrigatória'),
  end_date: Yup.string(),
});

export default function EnrollmentForm({ history, match }) {
  const { id } = match.params;
  const [enrollment, setEnrollment] = useState({});
  const [plans, setPlans] = useState([]);
  const [students, setStudents] = useState([]);
  const [studentSelected, setStudentSelected] = useState(null);

  useEffect(() => {
    async function loadEnrollment() {
      const response = await api.get(`enrollment/${id}`);

      setEnrollment({
        ...response.data,
        student_id: String(response.data.student_id),
        plan_id: String(response.data.plan_id),
        start_date: format(parseISO(response.data.start_date), "Y'-'MM'-'dd"),
        end_date: format(parseISO(response.data.end_date), "Y'-'MM'-'dd"),
      });
    }

    if (id) {
      loadEnrollment();
    }
  }, [id]); // eslint-disable-line

  useEffect(() => {
    if (enrollment.plan_id && enrollment.start_date && plans.length > 0) {
      const plan = plans.find(p => p.id === enrollment.plan_id);
      const date = addMonths(parseISO(enrollment.start_date), plan.duration);
      setEnrollment({
        ...enrollment,
        // stundent_id: String(enrollment.stundent_id),
        // plan_id: String(enrollment.plan_id),
        end_date: format(date, "Y'-'MM'-'dd"),
        total_price: formatBrPrice(plan.price * plan.duration),
      });
    }
  }, [enrollment.plan_id, enrollment.start_date, plans]); // eslint-disable-line

  async function loadStudents(value = '') {
    const response = await api.get('students', {
      params: {
        q: value,
        page: 1,
        perPage: 10,
      },
    });

    response.data.rows = response.data.rows.map(student => ({
      ...student,
      id: String(student.id),
      age: String(student.age),
      title: student.name,
    }));

    setStudents(response.data.rows);

    return new Promise(resolve => {
      resolve(response.data.rows);
    });
  }

  useEffect(() => {
    async function loadPlans() {
      const response = await api.get('plans');

      response.data.rows = response.data.rows.map(plan => ({
        ...plan,
        id: String(plan.id),
        duration: String(plan.duration),
      }));

      setPlans(response.data.rows);
    }

    loadPlans();
    loadStudents();
  }, [id]);

  async function handleSubmit(data) {
    data.student_id = parseInt(data.student_id, 10);
    data.plan_id = parseInt(data.plan_id, 10);
    data.start_date = data.start_date + ' 11:00:00'; // eslint-disable-line
    try {
      if (!id) {
        await api.post('enrollment', data);
        toast.success('O plano foi criado');
      } else {
        await api.put(`enrollment/${id}`, data);
        toast.success('O plano foi editado');
      }
      history.push('/enrollment');
    } catch (err) {
      toast.success('Falha na requisição');
      console.tron.log(err);
    }
  }

  return (
    <Container>
      <Form initialData={enrollment} schema={schema} onSubmit={handleSubmit}>
        <HeaderPage>
          <HeaderTitle
            title={id ? 'Edição de matrícula' : 'Cadastro de matrícula'}
          />
          <div>
            <ButtonLink to="/enrollment" color="#dddddd">
              <MdArrowBack color="#fff" size={16} />
              <span>Voltar</span>
            </ButtonLink>
            <Button type="submit" color="#ee4d64">
              <MdCheck color="#fff" size={16} />
              <span>SALVAR</span>
            </Button>
          </div>
        </HeaderPage>

        <Content>
          <FormRow>
            <FormGroup>
              <ReactSelectAsync
                label="ALUNO"
                name="student_id"
                options={students}
                value={studentSelected}
                onChange={e =>
                  setEnrollment({ ...enrollment, student_id: e.id })
                }
                // onChange={e => setStudentSelected(e)}
                asyncFunc={loadStudents}
              />
            </FormGroup>
          </FormRow>

          <FormRow>
            <FormGroup>
              <ReactSelect
                name="plan_id"
                label="PLANO"
                value={enrollment.plan_id}
                options={plans}
                onChange={e => setEnrollment({ ...enrollment, plan_id: e.id })}
              />
            </FormGroup>

            <FormGroup>
              <label>DATA DE INÍCIO</label>
              <Input
                type="date"
                name="start_date"
                onChange={e =>
                  setEnrollment({ ...enrollment, start_date: e.target.value })
                }
              />
            </FormGroup>

            <FormGroup>
              <label>DATA DE TÉRMINO</label>
              <Input type="date" name="end_date" disabled />
            </FormGroup>

            <FormGroup>
              <label>VALOR FINAL</label>
              <Input name="total_price" type="text" disabled />
            </FormGroup>
          </FormRow>
        </Content>
      </Form>
    </Container>
  );
}

EnrollmentForm.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
};

EnrollmentForm.defaultProps = {
  history: {},
  match: { params: { id: '' } },
};
