import BasicPrint from './BasicPrint';

const AccountsPrint = ({
  showPrint,
  workerData,
  works,
}) => {
  return (
    <>
      {showPrint && (
        <>
          <BasicPrint
            workerData={workerData}
            works={works}
          />
        </>
      )}
    </>
  );
};
export default AccountsPrint;
