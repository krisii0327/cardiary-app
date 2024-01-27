export default function DeleteButton({onDelete, handleConfirm, confirmState}) {
    const deleteHandler = (ev) => {
        onDelete();
        handleConfirm();
    }

    return (
        <>
            {confirmState && (
                <div className="flex justify-center w-full">
                    <div className='flex flex-row gap-6 items-center'>
                        <button onClick={deleteHandler} className="button-black-full h-8">Delete</button>  
                        <button onClick={handleConfirm} className="button-white-full h-8">Cancel</button>  
                    </div>
                </div>
            )} 
        </>
    )
}