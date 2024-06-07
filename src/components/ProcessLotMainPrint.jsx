import React from 'react';
import ProcessLotBasic from './ProcessLotBasic';

const ProcessLotMainPrint = ({ showPrint, processLot }) => {
  return (
    <>
      {showPrint && (
        <>
          <ProcessLotBasic processLot={processLot} />
        </>
      )}
    </>
  );
};

export default ProcessLotMainPrint;
