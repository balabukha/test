import React from 'react';
import { Link } from 'react-router-dom';

const Entry = () => {
  return (
    <div className="entry-wrap">
      <Link to="/main">
        <button className="default-button">с библиотекой Ant Design</button>
      </Link>
      <Link to="/extra">
        <button className="default-button">без использования библиотек</button>
      </Link>
    </div>
  );
};

export default Entry;
