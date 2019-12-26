import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import * as Yup from 'yup';

import { Form, Input } from '@rocketseat/unform';
import { MdCheck, MdArrowBack } from 'react-icons/md';
import { toast } from 'react-toastify';

import api from '../../../services/api';

import Container from '../../../components/Container';
import HeaderPage from '../../../components/HeaderPage';
import HeaderTitle from '../../../components/HeaderTitle';
import Button from '../../../components/Button';
import ButtonLink from '../../../components/ButtonLink';
import FormRow from '../../../components/FormRow';
import FormGroup from '../../../components/FormGroup';

import { Content } from './styles';

const schema = Yup.object().shape({
  name: Yup.string().required('O nome é obrigatório'),
  email: Yup.string()
    .email('O e-mail é inválido')
    .required('O e-mail é obrigatório'),
  age: Yup.string().required('A idade é obrigatória'),
  weight: Yup.string().required('O peso é obrigatório'),
  height: Yup.string().required('A altura é obrigatória'),
});

export default function StudentForm({ history, match }) {
  const { id } = match.params;
  const [student, setStudent] = useState({});

  useEffect(() => {
    async function loadStudent() {
      const response = await api.get(`students/${id}`);
      setStudent(response.data);
    }

    if (id) {
      loadStudent();
    }
  }, [id]);

  async function handleSubmit(data) {
    try {
      if (!id) {
        await api.post('students', data);
        toast.success('O estudante foi criado');
      } else {
        await api.put(`students/${id}`, data);
        toast.success('O estudante foi editado');
      }
      history.push('/students');
    } catch (err) {
      toast.success('Falha na requisição');
      console.tron.log(err);
    }
  }

  return (
    <Container>
      <Form initialData={student} schema={schema} onSubmit={handleSubmit}>
        <HeaderPage>
          <HeaderTitle title={id ? 'Edição de aluno' : 'Cadastro de aluno'} />
          <div>
            <ButtonLink to="/students" color="#dddddd">
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
              <label>NOME COMPLETO</label>
              <Input name="name" type="text" />
            </FormGroup>
          </FormRow>

          <FormRow>
            <FormGroup>
              <label>E-MAIL</label>
              <Input name="email" type="email" />
            </FormGroup>
          </FormRow>

          <FormRow>
            <FormGroup>
              <label>IDADE</label>
              <Input name="age" type="text" />
            </FormGroup>

            <FormGroup>
              <label>PESO (em kg)</label>
              <Input name="weight" type="text" />
            </FormGroup>

            <FormGroup>
              <label>ALTURA</label>
              <Input name="height" type="text" />
            </FormGroup>
          </FormRow>
        </Content>
      </Form>
    </Container>
  );
}

StudentForm.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
};

StudentForm.defaultProps = {
  history: {},
  match: { params: { id: '' } },
};
