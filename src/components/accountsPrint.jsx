import BasicPrint from './BasicPrint';

const AccountsPrint = ({
  showPrint,
  workerData,
  works,
  totalAmount,
  totalAmountGiven,
  balance
}) => {
  return (
    <>
      {showPrint && (
        <>
          <BasicPrint
            workerData={workerData}
            works={works}
            totalAmount={totalAmount}
            totalAmountGiven={totalAmountGiven}
            balance={balance}
          />
        </>
      )}
    </>
  );
};
export default AccountsPrint;
