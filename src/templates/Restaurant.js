import React from 'react';

export default ({ type, host, date, time, place }) => {
  return (
    <>
      <h1>The {type} of</h1>
      <p>{host}</p>
      <p>please join us</p>
      <p>
        {date}, {time}
      </p>
      <p>{place}</p>
      <p>Reception to follow</p>
    </>
  );
};
