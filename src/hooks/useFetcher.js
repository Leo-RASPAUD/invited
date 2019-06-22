import React, { useState, useEffect, useContext } from 'react'; //eslint-disable-line
import { API } from 'aws-amplify';
import { Context } from '../AppContext';
import { actions as globalActions } from '../reducers/globalReducer';

export default () => {
  const [loading, setLoading] = useState(true);
  const [isSubscribed, setSubscribed] = useState(true);
  const { state, ...rest } = useContext(Context);

  const handleError = ({ actions, error }) => {
    const isErrorAvailable = actions.find(action => action.name.startsWith('error'));
    if (isErrorAvailable) {
      rest[isErrorAvailable.dispatch]({ type: isErrorAvailable.name, payload: error });
    } else {
      console.error(error);
    }
    setLoading(false);
  };

  const fetchData = async ({ query, params, name, authMode }) => {
    rest.dispatchGlobal({ type: globalActions.resetErrors });
    const {
      data: { [name]: result },
    } = await API.graphql({ query, variables: params, authMode });
    return result;
  };

  const fetcher = async ({ query, name, params = {}, actions = [], authMode = 'AMAZON_COGNITO_USER_POOLS' }) => {
    try {
      const result = await fetchData({ query, params, name, authMode });
      if (isSubscribed) {
        setLoading(false);
        actions
          .filter(action => !action.name.startsWith('error'))
          .forEach(({ name = '', dispatch = '', field = null }) => {
            if (name) {
              rest[dispatch]({ type: name, payload: field ? result[field] : result });
            }
          });
      }
    } catch (error) {
      handleError({ actions, error });
      return error;
    }
  };

  const batchFetcher = async requests => {
    await Promise.all(
      requests.map(async ({ query, name, params = {}, actions = [], authMode = 'AMAZON_COGNITO_USER_POOLS' }) => {
        try {
          const result = await fetchData({ query, params, name, authMode });
          actions
            .filter(action => action.name !== 'error')
            .forEach(({ name = '', dispatch = '', field = null }) => {
              if (name) {
                rest[dispatch]({ type: name, payload: field ? result[field] : result });
              }
            });
        } catch (error) {
          handleError({ actions, error });
        }
      }),
    );
    setLoading(false);
  };

  useEffect(() => {
    return () => {
      setSubscribed(false);
    };
  }, []);

  return { loading, state, fetcher, batchFetcher };
};
