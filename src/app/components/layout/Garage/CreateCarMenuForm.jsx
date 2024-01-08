export default function CreateCarMenuForm({showCarMenuForm}) {
    return (
        <button className="bg-primary text-white whitespace-nowrap max-w-xs" onClick={showCarMenuForm}>
            Create a new car
        </button>
    )
}