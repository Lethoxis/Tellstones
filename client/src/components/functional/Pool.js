import React from 'react';

const Pool = ({state, handleClickPool}) => {
  return (
    <div style={{flexDirection: "column"}}>
      {state.pool.map(stone => (
        <p><button style={{height: "50px", width: "50px", borderRadius: "25px"}}
                   onClick={() => handleClickPool(stone)}>
          <img src="/public/images/sword" alt=""/>
        </button></p>
      ))}
    </div>
  );
}

export default Pool;
