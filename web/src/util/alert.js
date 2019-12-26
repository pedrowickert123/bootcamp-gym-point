import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const Alert = {
  delete: async () => {
    return MySwal.fire({
      title: 'Você deseja DELETAR este registro ?',
      text: 'Esta ação não poderá ser desfeita!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Excluir',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#ee4d64',
      cancelButtonColor: '#ddd',
      focusConfirm: true,
      reverseButtons: true,
    });
  },
};

export default Alert;
