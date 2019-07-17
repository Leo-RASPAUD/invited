export const actions = {
  updateStyles: 'updateStyles',
};

export const dispatchName = 'dispatchStyles';

export const reducer = (state, { payload, type }) => {
  switch (type) {
    case actions.updateStyles: {
      console.log(payload);
      return {
        ...state,
        styles: payload,
      };
    }
    default: {
      return state;
    }
  }
};
