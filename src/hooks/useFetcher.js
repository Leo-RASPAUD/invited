import React, { useState, useEffect, useContext } from 'react'; //eslint-disable-line
import { API, graphqlOperation } from 'aws-amplify';
import { Context } from '../AppContext';

export default () => {
  const [loading, setLoading] = useState(true);
  const [isSubscribed, setSubscribed] = useState(true);
  const { state, ...rest } = useContext(Context);

  const handleError = ({ actions, error }) => {
    const isErrorAvailable = actions.find(action => action.name === 'error');
    if (isErrorAvailable) {
      rest[isErrorAvailable.dispatch]({ type: isErrorAvailable.name, payload: isErrorAvailable.payload });
    } else {
      console.error(error);
    }
  };

  const fetchData = async ({ query, params, name }) => {
    const {
      data: { [name]: result },
    } = await API.graphql(graphqlOperation(query, params));
    return result;
  };

  const fetcher = async ({ query, name, params = {}, actions = [] }) => {
    try {
      const result = await fetchData({ query, params, name });
      if (isSubscribed) {
        setLoading(false);
        actions
          .filter(action => action.name !== 'error')
          .forEach(({ name = '', dispatch = '', field = null }) => {
            if (name) {
              rest[dispatch]({ type: name, payload: field ? result[field] : result });
            }
          });
      }
    } catch (error) {
      handleError({ actions, error });
    }
  };

  const batchFetcher = async requests => {
    await Promise.all(
      requests.map(async ({ query, name, params = {}, actions = [] }) => {
        try {
          const result = await fetchData({ query, params, name });
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
