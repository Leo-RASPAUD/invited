import React, { useState, useEffect } from 'react'; //eslint-disable-line
import { API, graphqlOperation } from 'aws-amplify';
export default ({ query, name, params = {}, withUser = false }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSubscribed, setSubscribed] = useState(true);

  const getData = async () => {
    const {
      data: { [name]: result },
    } = await API.graphql(graphqlOperation(query, params));
    if (isSubscribed) {
      setData(result);
      setLoading(false);
    }
  };

  useEffect(() => {
    getData(query);
    return () => {
      setSubscribed(false);
    };
  }, []); // eslint-disable-line

  return [loading, data];
};
