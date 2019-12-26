import React, { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';
import { MdAdd, MdEdit, MdDelete } from 'react-icons/md';
import { toast } from 'react-toastify';

import api from '../../../services/api';

import Container from '../../../components/Container';
import ButtonLink from '../../../components/ButtonLink';
import InputSearch from '../../../components/InputSearch';
import HeaderPage from '../../../components/HeaderPage';
import HeaderTitle from '../../../components/HeaderTitle';
import Pagination from '../../../components/Pagination';
import NotFound from '../../../components/NotFound';

import Alert from '../../../util/alert';

import { Content } from './styles';

export default function StudentList() {
  const [students, setStudents] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [pagination, setPagination] = useState({
    page: 1,
    perPage: 5,
    count: 0,
    totalPage: 1,
  });

  async function loadStudents(page = 1, value = '') {
    try {
      if (value) setSearchText(value);
      const response = await api.get('students', {
        params: {
          q: value || searchText,
          page,
          perPage: pagination.perPage,
        },
      });

      setStudents(response.data.rows);
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

  async function deleteStudent(id) {
    try {
      await api.delete(`students/${id}`);

      loadStudents();

      toast.success('Aluno deletado com sucesso');
    } catch (err) {
      toast.error('Houve um erro na requisição');
    }
  }

  useEffect(() => {
    loadStudents();
  }, []); // eslint-disable-line

  const handleSearch = value => {
    loadStudents(1, value);
  };

  function handleLoadPage(page) {
    loadStudents(page);
  }

  function handleDelete(id) {
    Alert.delete().then(res => {
      if (res.value) {
        deleteStudent(id);
      }
    });
  }

  return (
    <Container>
      <HeaderPage>
        <HeaderTitle title="Gerenciar alunos" />
        <div>
          <ButtonLink to="/students/add" color="#ee4d64">
            <MdAdd color="#fff" size={16} />
            <span>Cadastrar</span>
          </ButtonLink>

          <InputSearch handleSearch={handleSearch} />
        </div>
      </HeaderPage>

      <Content>
        <table>
          <thead>
            <tr>
              <th>NOME</th>
              <th>E-MAIL</th>
              <th>IDADE</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {students.map(student => (
              <tr key={String(student.id)}>
                <td>{student.name}</td>
                <td>{student.email}</td>
                <td>{student.age}</td>
                <td>
                  <span>
                    <Link to={`/students/${student.id}`}>
                      <MdEdit color="#999" size={24} />
                    </Link>
                  </span>

                  <span>
                    <MdDelete
                      color="#ee4d64"
                      size={24}
                      onClick={() => handleDelete(student.id)}
                    />
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <br />
        {students.length > 0 ? (
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
