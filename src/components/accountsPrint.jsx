import BasicPrint from "./BasicPrint";

const AccountsPrint = ({ showPrint,workerData }) => {
    return (
        <>
            {
                showPrint && (
                    <>
                        <BasicPrint workerData={workerData}/>
                    </>
                )
            }
        </>
    )
}
export default AccountsPrint;