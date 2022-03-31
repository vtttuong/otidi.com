import React from 'react';

const MarkListTable = ({ markList }) => {
  const markTable = markList.map((mark) => (
    <li key={mark.id}>
      {' '}
      {mark.name}, {mark.lat}, {mark.lng}{' '}
    </li>
  ));

  return <ul>{markTable}</ul>;
};

export default MarkListTable;
