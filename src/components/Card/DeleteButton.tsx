import { TrashIcon } from "@heroicons/react/24/outline"

type ButtonProps = {
    handleDelete: () => void
}

export default function DeleteButton ({ handleDelete }: ButtonProps) {

    return (
        <>
            <button 
                className="btn bg-transparent hover:bg-gray-100"
                onClick={handleDelete}
            > 
                <TrashIcon className="text-red-400" width={22} height={22} />
            </button>
            
        </>
    )
}


