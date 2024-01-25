import Image from "next/image";
import toast from "react-hot-toast";

export default function EditableImage({imageLink, setImageLink}) {
    async function handleFileChange(ev) {
        const files = ev.target.files;

        if(files?.length === 1) {
            const data = new FormData;
            data.set('file', files[0]);

            const uploadPromise = new Promise(async (resolve, reject) => {
                const response = await fetch('/api/upload', {
                    method: 'POST',
                    body: data,
                });
                const link = await response.json();

                if(response.ok) {
                    resolve();
                    setImageLink(link);
                } else {
                    reject();
                }
            })

/*             const uploadPromise = fetch('/api/upload', {
                method: 'POST',
                body: data,
            }).then(response => {
                if(response.ok) {
                    return response.json().then(link => {
                        setImageLink(link);
                    })
                }
                throw new Error('Something went wrong!');
            }); */

            
            await toast.promise(uploadPromise, {
                loading: 'Uploading...',
                success: 'Upload complete!',
                error: 'Upload error!'
            });
        };
    }

    return (
        <>
        <div className="flex flex-col gap-2 sm:mt-8">
            <div className="bg-gray-100 flex justify-center items-center h-32 w-32 border border-black rounded-lg object-cover">
                {imageLink && (
                    <div className="relative w-full h-full">
                        <Image referrerPolicy="no-referrer" src={imageLink} alt="avatar" fill className="rounded-lg"/>
                    </div>
                )}
                {!imageLink && (
                    <span>No Image</span>
                )}
            </div>
            <label>
                <input type="file" className="hidden" onChange={handleFileChange}/>
                <span className="button-black text-sm items-center sm:text-normal cursor-pointer">Change Image</span>
            </label>
        </div>
        </>
    )
}