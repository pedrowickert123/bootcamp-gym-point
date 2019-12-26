import React, { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';
import { MdAdd, MdEdit, MdDelete } from 'react-icons/md';
import { toast } from 'react-toastify';

import api from '../../../services/api';
import { formatBrPrice } from '../../../util/format';

import Container from '../../../components/Container';
import ButtonLink from '../../../components/ButtonLink';
import HeaderPage from '../../../components/HeaderPage';
import HeaderTitle from '../../../components/HeaderTitle';
import Pagination from '../../../components/Pagination';
import NotFound from '../../../components/NotFound';

import Alert from '../../../util/alert';

import { Content } from './styles';

export default function PlanList() {
  const [plans, setPlans] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    perPage: 5,
    count: 0,
    totalPage: 1,
  });

  async function loadPlans(page = 1) {
    try {
      const response = await api.get('plans', {
        params: {
          page,
          perPage: pagination.perPage,
        },
      });

      response.data.rows = response.data.rows.map(plan => ({
        ...plan,
        formattedPrice: formatBrPrice(plan.price),
      }));

      setPlans(response.data.rows);
      setPagination({
        count: response.data.count,
        page,
        perPage: response.data.perPage,
        totalPage: response.data.totalPage,
      });
    } catch (err) {
      console.tron.log(err);
    }
  }

  async function deletePlan(id) {
    try {
      await api.delete(`plans/${id}`);

      loadPlans();

      toast.success('Aluno deletado com sucesso');
    } catch (err) {
      toast.error('Houve um erro na requisição');
    }
  }

  useEffect(() => {
    loadPlans();
  }, []); // eslint-disable-line

  function handleLoadPage(page) {
    loadPlans(page);
  }

  function handleDelete(id) {
    Alert.delete().then(res => {
      if (res.value) {
        deletePlan(id);
      }
    });
  }

  return (
    <Container>
      <HeaderPage>
        <HeaderTitle title="Gerenciar planos" />
        <ButtonLink to="/plans/add" color="#ee4d64">
          <MdAdd color="#fff" size={16} />
          <span>Cadastrar</span>
        </ButtonLink>
      </HeaderPage>

      <Content>
        <table>
          <thead>
            <tr>
              <th>TÍTULO</th>
              <th>DURAÇÃO</th>
              <th>VALOR P/ MÊS</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {plans.map(plan => (
              <tr key={String(plan.id)}>
                <td>{plan.title}</td>
                <td>{plan.duration}</td>
                <td>{plan.formattedPrice}</td>
                <td>
                  <span>
                    <Link to={`/plans/${plan.id}`}>
                      <MdEdit color="#999" size={24} />
                    </Link>
                  </span>

                  <span>
                    <MdDelete
                      color="#ee4d64"
                      size={24}
                      onClick={() => handleDelete(plan.id)}
                    />
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <br />
        {plans.length > 0 ? (
          <Pagination
            page={pagination.page}
            totalPage={pagination.totalPage}
            perPage={pagination.perPage}
            total={pagination.count}
            onLoadPage={handleLoadPage}
          />
        ) : (
          <NotFound />
        )}
      </Content>
    </Container>
  );
}
