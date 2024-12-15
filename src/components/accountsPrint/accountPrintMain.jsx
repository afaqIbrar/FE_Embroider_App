import AccountBasic from "./accountBasic";

const AccountPrint = ({
  showPrint,
  workerData,
  accounts,
}) => {
  return (
    <>
      {showPrint && (
        <>
          <AccountBasic
            workerData={workerData}
            accounts={accounts}
          />
        </>
      )}
    </>
  );
};
export default AccountPrint;
