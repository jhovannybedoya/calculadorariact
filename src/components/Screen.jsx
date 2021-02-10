import React from 'react';

const Screen = ({num, numScreen}) => {

    return (
        <div className="screen">
            <input type="text"
                   placeholder="0"
                   id="screen-result"
                   value={num}
                   onChange={numScreen}></input>
        </div>
    )
};

export default Screen;