import React, { useState, useEffect, useContext } from 'react'; //eslint-disable-line
import { API, graphqlOperation } from 'aws-amplify';
import { Context } from '../AppContext';

export default () => {
  const [, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSubscribed, setSubscribed] = useState(true);
  const { state, ...rest } = useContext(Context);

  const getData = async ({ query, name, params = {}, action = null, dispatch = '' }) => {
    const {
      data: { [name]: result },
    } = await API.graphql(graphqlOperation(query, params));

    if (isSubscribed) {
      setData(result);
      setLoading(false);
      if (action) {
        rest[dispatch]({ type: action, payload: result });
      }
    }
  };

  useEffect(() => {
    return () => {
      setSubscribed(false);
    };
  }, []);

  return [loading, state, getData];
};
