export default function CreateCarMenuForm({showCreateCarMenuForm}) {
    return (
        <button className="bg-primary text-white whitespace-nowrap max-w-xs" onClick={showCreateCarMenuForm}>
            Create a new car
        </button>
    )
}