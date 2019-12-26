import produce from 'immer';

const INITIAL_STATE = {
  id: null,
  signed: false,
};

export default function auth(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@auth/SIGN_IN': {
        draft.id = action.payload.id;
        draft.signed = true;
        break;
      }
      case '@auth/SIGN_OUT': {
        draft.id = null;
        draft.signed = false;
        break;
      }
      default:
    }
  });
}
