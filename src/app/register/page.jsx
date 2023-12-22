"use client"
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";

export default function RegisterPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [creatingUser, setCreatingUser] = useState(false);
    const [userCreated, setUserCreated] = useState(false);
    const [error, setError] = useState(false);

    async function handleFormSubmit(ev) {
        ev.preventDefault();
        setUserCreated(false);
        setError(false);
        setCreatingUser(true);
        const response = await fetch('/api/register', {
            method: 'POST',
            body: JSON.stringify({email, password}),
            headers: {'Content-Type': 'application/json'},
        });
        if(response.ok) {
            toast.success('User created!');
            setUserCreated(true);
        }
        else {
            setError(true);
        }
        setCreatingUser(false); 
    }

    return (
        <section className="mt-16 mb-32">
            <div className="border border-black bg-gray-100/50 rounded-lg mx-auto p-4 max-w-sm">
                <form className="flex flex-col max-w-xs mx-auto" onSubmit={handleFormSubmit}>
                    <span className="text-size text-center mt-4 mb-2">
                        Register
                    </span>
                    <span className="text-gray-500 leading-4">
                        Email
                    </span>
                    <input type="email" placeholder="email" value={email} onChange={ev => setEmail(ev.target.value)} disabled={creatingUser}/>
                    <span className="text-gray-500 leading-4">
                        Password
                    </span>
                    <input type="password" placeholder="password" value={password} onChange={ev => setPassword(ev.target.value)} disabled={creatingUser}/>
                    <button type="submit" className="bg-primary text-white border-0 mt-2 mb-2" disabled={creatingUser}>
                        Register
                    </button>
                    <span className="text-gray-500 text-center mb-2 py-2">
                        or login with provider
                    </span>
                    <button onClick={() => signIn('google', {callbackUrl:'/'})} className="flex gap-2 items-center justify-center bg-white mb-2">
                        <Image src={'/google.png'} alt={'google'} width={24} height={24} />
                        <span className="text-black">Login with Google</span>
                    </button>
                    <div className="flex items-center justify-center my-4 text-gray-500 border-t border-black/50 pt-4 mb-4 gap-2">
                        Existing account? 
                        <Link className="underline text-primary" href={'/login'}>Login</Link>
                    </div>
                </form>
            </div>
        </section>
    )
}