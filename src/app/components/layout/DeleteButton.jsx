import useState from "react"

export default function DeleteButton({onDelete, handleConfirm, confirmState}) {
    const deleteHandler = (ev) => {
        onDelete();
        handleConfirm();
    }

    return (
        <>
            {confirmState && (
                <div className="flex justify-center w-full">
                    <div className="flex flex-row gap-6 p-6">
                        <button onClick={deleteHandler} className="button-black-full">Delete</button>  
                        <button onClick={handleConfirm} className="button-white-full">Cancel</button>  
                    </div>
                </div>
            )} 
        </>
    )
}