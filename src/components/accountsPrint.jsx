import BasicPrint from './BasicPrint';

const AccountsPrint = ({ showPrint, workerData, works, printFlag }) => {
  return (
    <>
      {showPrint && (
        <>
          <BasicPrint
            workerData={workerData}
            works={works}
            printFlag={printFlag}
          />
        </>
      )}
    </>
  );
};
export default AccountsPrint;
