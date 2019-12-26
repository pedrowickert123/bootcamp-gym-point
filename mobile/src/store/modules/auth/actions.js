export function signIn(id) {
  return {
    type: '@auth/SIGN_IN',
    payload: { id },
  };
}

export function signOut() {
  return {
    type: '@auth/SIGN_OUT',
  };
}
