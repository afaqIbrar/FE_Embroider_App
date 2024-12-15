import BasicPrint from './BasicPrint';

const WorkPrint = ({
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
export default WorkPrint;
