import React, { useState, useEffect, useContext } from 'react'; //eslint-disable-line
import { API, graphqlOperation } from 'aws-amplify';
import { Context } from '../AppContext';

export default ({ query, name, params = {}, action = null, dispatch = '' }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSubscribed, setSubscribed] = useState(true);
  const { state, ...rest } = useContext(Context);

  const getData = async () => {
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
    getData(query);
    return () => {
      setSubscribed(false);
    };
  }, []); // eslint-disable-line

  return [loading, state];
};
