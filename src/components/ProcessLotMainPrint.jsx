import React from 'react';
import ProcessLotBasic from './ProcessLotBasic';

const ProcessLotMainPrint = ({
  showPrint,
  processLot,
  pageStartValue,
  pageEndValue
}) => {
  return (
    <>
      {showPrint && (
        <>
          <ProcessLotBasic
            processLot={processLot}
            pageStartValue={pageStartValue}
            pageEndValue={pageEndValue}
          />
        </>
      )}
    </>
  );
};

export default ProcessLotMainPrint;
