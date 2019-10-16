export default (state, params, reducer) => {
  const newState = reducer(state, params);
  const currentState = JSON.parse(window.sessionStorage.getItem('invited-state')) || {};
  window.sessionStorage.setItem('invited-state', JSON.stringify({ ...currentState, ...newState }));
  return newState;
};
