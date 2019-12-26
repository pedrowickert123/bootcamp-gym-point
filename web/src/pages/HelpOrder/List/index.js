import React, { useState, useEffect } from 'react';

import { MdQuestionAnswer, MdRemoveRedEye } from 'react-icons/md';
import { toast } from 'react-toastify';

import api from '../../../services/api';

import Container from '../../../components/Container';
import HeaderPage from '../../../components/HeaderPage';
import HeaderTitle from '../../../components/HeaderTitle';
import Pagination from '../../../components/Pagination';
import NotFound from '../../../components/NotFound';

import Answer from '../Answer/index';

import { Content } from './styles';

export default function StudentList() {
  const [helpOrders, setHelpOrders] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    perPage: 5,
    count: 0,
    totalPage: 1,
  });

  const [modal, setModal] = useState({});

  async function loadHelpOrders(page = 1) {
    try {
      const response = await api.get('help-orders', {
        params: {
          page,
          perPage: pagination.perPage,
        },
      });
      setHelpOrders(response.data.rows);
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

  useEffect(() => {
    loadHelpOrders();
  }, []); // eslint-disable-line

  function handleLoadPage(page) {
    loadHelpOrders(page);
  }

  async function handleSubmit(data) {
    setModal({ ...modal, submitting: false });
    try {
      await api.post(`help-orders/${modal.question_id}/answer`, data);
      toast.success('A pergunta foi respondida');
      setModal({ isOpen: false, submitting: false });
      loadHelpOrders();
    } catch (err) {
      toast.success('Falha na requisição');
      setModal({ ...modal, submitting: false });
    }
  }

  return (
    <>
      <Container>
        <HeaderPage>
          <HeaderTitle title="Pedidos de auxílio" />
        </HeaderPage>

        <Content>
          <table>
            <thead>
              <tr>
                <th>ALUNO</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {helpOrders.map(help_order => (
                <tr key={String(help_order.id)}>
                  <td>{help_order.student.name}</td>
                  <td>
                    <span>
                      {help_order.answer ? (
                        <MdRemoveRedEye
                          color="#999"
                          size={24}
                          onClick={() =>
                            setModal({
                              ...modal,
                              question: help_order.question,
                              answer: help_order.answer,
                              question_id: help_order.id,
                              isOpen: true,
                            })
                          }
                        />
                      ) : (
                        <MdQuestionAnswer
                          color="#999"
                          size={24}
                          onClick={() =>
                            setModal({
                              ...modal,
                              question: help_order.question,
                              answer: help_order.answer,
                              question_id: help_order.id,
                              isOpen: true,
                            })
                          }
                        />
                      )}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <br />
          {helpOrders.length > 0 ? (
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
      {modal.isOpen && (
        <Answer modal={modal} setModal={setModal} handleSubmit={handleSubmit} />
      )}
    </>
  );
}
