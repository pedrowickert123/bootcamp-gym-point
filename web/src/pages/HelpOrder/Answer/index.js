import React from 'react';
import PropTypes from 'prop-types';
import * as Yup from 'yup';

import { MdClose } from 'react-icons/md';
import { Form, Textarea } from '@rocketseat/unform';

import Button from '../../../components/Button';

import { Modal, Container, Header, Content } from './styles';

const schema = Yup.object().shape({
  id: Yup.string(),
  answer: Yup.string().required('A resposta é obrigatória'),
});

export default function Answer({ modal, setModal, handleSubmit }) {
  return (
    <Modal>
      <Container>
        <Header>
          <span>PERGUNTA DO ALUNO</span>
          <MdClose
            size={24}
            color="#666"
            onClick={() => setModal({ ...modal, isOpen: false })}
          />
        </Header>

        <Content>
          <p>{modal.question}</p>

          <span>SUA RESPOSTA</span>
          {!modal.answer ? (
            <Form schema={schema} onSubmit={handleSubmit}>
              <Textarea name="answer" rows="10" />
              <Button type="submit" color="#ee4d64">
                {!modal.submitting ? 'Responder aluno' : 'Respondendo...'}
              </Button>
            </Form>
          ) : (
            modal.answer
          )}
        </Content>
      </Container>
    </Modal>
  );
}

Answer.propTypes = {
  modal: PropTypes.objectOf(PropTypes.string).isRequired,
  setModal: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};
