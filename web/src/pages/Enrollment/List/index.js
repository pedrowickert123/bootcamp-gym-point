import React, { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';
import { parseISO, format } from 'date-fns';
import pt from 'date-fns/locale/pt';
import {
  MdAdd,
  MdEdit,
  MdDelete,
  MdCheckCircle,
  MdClose,
} from 'react-icons/md';
import { toast } from 'react-toastify';

import api from '../../../services/api';

import Container from '../../../components/Container';
import ButtonLink from '../../../components/ButtonLink';
import HeaderPage from '../../../components/HeaderPage';
import HeaderTitle from '../../../components/HeaderTitle';
import Pagination from '../../../components/Pagination';
import NotFound from '../../../components/NotFound';

import Alert from '../../../util/alert';

import { Content } from './styles';

export default function EnrollmentList() {
  const [enrollment, setEnrollment] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    perPage: 5,
    count: 0,
    totalPage: 1,
  });

  async function loadEnrollment(page = 1) {
    try {
      const response = await api.get('enrollment', {
        params: {
          page,
          perPage: pagination.perPage,
        },
      });

      response.data.rows = response.data.rows.map(e => ({
        ...e,
        formattedStartDate: format(
          parseISO(e.start_date),
          "dd 'de' MMMM 'de' Y",
          {
            locale: pt,
          }
        ),
        formattedEndDate: format(parseISO(e.end_date), "dd 'de' MMMM 'de' Y", {
          locale: pt,
        }),
      }));
      setEnrollment(response.data.rows);
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

  async function deleteEnrollment(id) {
    try {
      await api.delete(`enrollment/${id}`);

      loadEnrollment();

      toast.success('Aluno deletado com sucesso');
    } catch (err) {
      toast.error('Houve um erro na requisição');
    }
  }

  useEffect(() => {
    loadEnrollment();
  }, []); // eslint-disable-line

  function handleLoadPage(page) {
    loadEnrollment(page);
  }

  function handleDelete(id) {
    Alert.delete().then(res => {
      if (res.value) {
        deleteEnrollment(id);
      }
    });
  }

  return (
    <Container>
      <HeaderPage>
        <HeaderTitle title="Gerenciar matrículas" />
        <ButtonLink to="/enrollment/add" color="#ee4d64">
          <MdAdd color="#fff" size={16} />
          <span>Cadastrar</span>
        </ButtonLink>
      </HeaderPage>

      <Content>
        <table>
          <thead>
            <tr>
              <th>ALUNO</th>
              <th>PLANO</th>
              <th>INÍCIO</th>
              <th>TÉRMINO</th>
              <th>ATIVA</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {enrollment.map(e => (
              <tr key={String(e.id)}>
                <td>{e.student.name}</td>
                <td>{e.plan.title}</td>
                <td>{e.formattedStartDate}</td>
                <td>{e.formattedEndDate}</td>
                <td>
                  {e.active ? (
                    <MdCheckCircle size={24} color="#00cc00" />
                  ) : (
                    <MdClose size={24} color="#ff3300" />
                  )}
                </td>
                <td>
                  <span>
                    <Link to={`/enrollment/${e.id}`}>
                      <MdEdit color="#999" size={24} />
                    </Link>
                  </span>

                  <span>
                    <MdDelete
                      color="#ee4d64"
                      size={24}
                      onClick={() => handleDelete(e.id)}
                    />
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <br />
        {enrollment.length > 0 ? (
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
