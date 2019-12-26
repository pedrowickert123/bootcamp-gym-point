import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { Form, Input } from '@rocketseat/unform';
import { MdCheck, MdArrowBack } from 'react-icons/md';
import { toast } from 'react-toastify';

import api from '../../../services/api';
import { formatCurrency, formatBrPrice } from '../../../util/format';

import Container from '../../../components/Container';
import HeaderPage from '../../../components/HeaderPage';
import HeaderTitle from '../../../components/HeaderTitle';
import Button from '../../../components/Button';
import ButtonLink from '../../../components/ButtonLink';
import FormRow from '../../../components/FormRow';
import FormGroup from '../../../components/FormGroup';
import InputCurrency from '../../../components/InputCurrency';

import { Content } from './styles';

const schema = Yup.object().shape({
  title: Yup.string().required('O título é obrigatório'),
  duration: Yup.string().required('A duração é obrigatória'),
  price: Yup.string().required('O preço é obrigatório'),
  total_price: Yup.string(),
});

export default function PlanForm({ history, match }) {
  const { id } = match.params;
  const [plan, setPlan] = useState({});

  const totalPrice = useMemo(() => {
    if (plan.duration && plan.price) {
      return formatBrPrice(plan.duration * formatCurrency(plan.price));
    }

    return formatBrPrice(0);
  }, [plan]);

  useEffect(() => {
    async function loadPlan() {
      const response = await api.get(`plans/${id}`);
      setPlan({
        ...response.data,
        price: formatBrPrice(response.data.price, false),
      });
    }

    if (id) {
      loadPlan();
    }
  }, [id]);

  async function handleSubmit(data) {
    data.price = formatCurrency(plan.price);
    try {
      if (!id) {
        await api.post('plans', data);
        toast.success('O plano foi criado');
      } else {
        await api.put(`plans/${id}`, data);
        toast.success('O plano foi editado');
      }
      history.push('/plans');
    } catch (err) {
      toast.success('Falha na requisição');
      console.tron.log(err);
    }
  }

  return (
    <Container>
      <Form initialData={plan} schema={schema} onSubmit={handleSubmit}>
        <HeaderPage>
          <HeaderTitle title={id ? 'Edição de plano' : 'Cadastro de plano'} />
          <div>
            <ButtonLink to="/plans" color="#dddddd">
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
              <label>TÍTULO</label>
              <Input name="title" type="text" />
            </FormGroup>
          </FormRow>

          <FormRow>
            <FormGroup>
              <label>DURAÇÃO (em meses)</label>
              <Input
                name="duration"
                type="number"
                onChange={e => setPlan({ ...plan, duration: e.target.value })}
              />
            </FormGroup>

            <FormGroup>
              <label>PREÇO MENSAL</label>
              <InputCurrency
                name="price"
                value={plan.price}
                onChange={e => setPlan({ ...plan, price: e })}
              />
            </FormGroup>

            <FormGroup>
              <label>PREÇO TOTAL</label>
              <InputCurrency name="total_price" value={totalPrice} disabled />
            </FormGroup>
          </FormRow>
        </Content>
      </Form>
    </Container>
  );
}

PlanForm.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
};

PlanForm.defaultProps = {
  history: {},
  match: { params: { id: '' } },
};
