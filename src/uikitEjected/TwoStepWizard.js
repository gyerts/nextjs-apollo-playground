import React, { useState } from 'react';

export const TwoStepWizard = ({ children, initialState = null }) => {
  const [selectedOption, setOption] = useState(initialState);

  const selectOption = value => setOption(value);
  const resetOption = () => setOption(null);

  return (
    <React.Fragment>
      {children({
        selectedOption,
        selectOption,
        resetOption
      })}
    </React.Fragment>
  );
};
