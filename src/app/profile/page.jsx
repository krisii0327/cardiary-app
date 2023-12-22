"use client"
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { redirect } from "next/navigation";
import EditableImage from "@/app/components/layout/EditableImage";
import toast from "react-hot-toast";

export default function ProfilePage() {
    const session = useSession();
    const {status} = session;
    const email = session?.data?.userCredentials?.email;
    const [profileFetched, setProfileFetched] = useState(false);

    const [name, setName] = useState('');
    //const [image, setImage] = useState(user?.image || '');
    const [phone, setPhone] = useState('');
    const [streetAddress, setStreetAddress] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');

    useEffect(() => {
        if (status === 'authenticated') {
          fetch('/api/profile').then(response => {
            response.json().then(data => {
              setName(data.name);
              setPhone(data.phone);
              setStreetAddress(data.streetAddress);
              setPostalCode(data.postalCode);
              setCity(data.city);
              setCountry(data.country);
              //setIsAdmin(data.admin);
              setProfileFetched(true);
            });
          });
        }
      }, [session, status]);

    async function handleProfileInfoUpdate(ev, data) {
        ev.preventDefault();
        await fetch('/api/profile', {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data),
        });
    }

    if(status === 'loading') {
        return 'Loading...'
    } else if (status === 'unauthenticated' && !profileFetched) {
        return redirect('/login');
    }

    return (
        <section className="max-w-xl sm:mx-auto">
            <div>
                <div className="sm:flex gap-6">
                    <div className="mb-2 sm:mb-0 flex flex-col items-center gap-2">
                        <EditableImage image={session?.data?.userCredentials?.image}/>
                        <button className="button-black whitespace-nowrap text-sm items-center sm:text-normal">Change Password</button>
                    </div>
                    <form className="grow" onSubmit={ev => handleProfileInfoUpdate(ev, {name, email, city, postalCode, streetAddress, phone, country})}>
                        <label className="leading-4">Name</label>
                        <input type="text" value={name || ''} onChange={ev => setName(ev.target.value)}/>
                        <label className="leading-4">Email</label>
                        <input type="email" value={email} disabled={true} className="bg-gray-200 cursor-not-allowed"/>
                        <label className="leading-4">Phone</label>
                        <input type="tel" value={phone || ''} onChange={ev => setPhone(ev.target.value)}/>
                        <div className="flex flex-col sm:flex-row sm:gap-4">
                            <div className="block">
                                <label className="leading-4">PostalCode</label>
                                <input type="text" value={postalCode || ''} onChange={ev => setPostalCode(ev.target.value)}/>
                            </div>
                            <div className="block">
                                <label className="leading-4">City</label>
                                <input type="text" value={city || ''} onChange={ev => setCity(ev.target.value)}/>
                            </div>
                        </div>
                        <label className="leading-4">Address</label>
                        <input type="text" value={streetAddress || ''} onChange={ev => setStreetAddress(ev.target.value)}/>
                        <label className="leading-4">Country</label>
                        <input type="text" value={country || ''} onChange={ev => setCountry(ev.target.value)}/>
                        <div className="flex justify-center mt-6">
                            <button type="submit" className="bg-primary w-2/3">
                                Save
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    )
}