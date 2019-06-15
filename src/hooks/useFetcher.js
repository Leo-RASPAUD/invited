import React, { useState, useEffect, useContext } from 'react'; //eslint-disable-line
import { API, graphqlOperation } from 'aws-amplify';
import { Context } from '../AppContext';

export default () => {
  const [, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSubscribed, setSubscribed] = useState(true);
  const { state, ...rest } = useContext(Context);

  const fetcher = async ({ query, name, params = {}, actions = [] }) => {
    const {
      data: { [name]: result },
    } = await API.graphql(graphqlOperation(query, params));
    if (isSubscribed) {
      setData(result);
      setLoading(false);
      actions.forEach(({ name, dispatch, field = null }) => {
        if (name) {
          rest[dispatch]({ type: name, payload: field ? result[field] : result });
        }
      });
    }
  };

  useEffect(() => {
    return () => {
      setSubscribed(false);
    };
  }, []);

  return { loading, state, fetcher };
};
