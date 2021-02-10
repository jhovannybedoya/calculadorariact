import React from 'react';

const Buttons = ({className, value, addValue}) => {

    return (
        <div className={className}>
            <button
                value={value}
                onClick={addValue}>
                    {value}
            </button>
        </div>
    )
};

export default Buttons;