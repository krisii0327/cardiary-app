"use client"
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { signIn } from "next-auth/react";

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginInProgress, setLoginInProgress] = useState(false)

    async function handleForSubmit(ev) {
        ev.preventDefault();

        setLoginInProgress(true);

        await signIn('credentials', {email, password, callbackUrl:'/'});

        setLoginInProgress(false);
    }

    return (
        <section className="mt-16 mb-32">
            <div className="border border-black bg-gray-100/50 rounded-lg mx-auto p-4 max-w-sm">
                <form className="flex flex-col max-w-xs mx-auto" onSubmit={handleForSubmit}>
                    <span className="text-size text-center mt-4 mb-2">
                        Login
                    </span>
                    <span className="text-gray-500 leading-4">
                        Email
                    </span>
                    <input type="email" placeholder="email" value={email} onChange={ev => setEmail(ev.target.value)} disabled={loginInProgress}/>
                    <span className="text-gray-500 leading-4">
                        Password
                    </span>
                    <input type="password" placeholder="password" value={password} onChange={ev => setPassword(ev.target.value)} disabled={loginInProgress}/>
                    <button type="submit" className="bg-primary text-white border-0 mt-2 mb-2" disabled={loginInProgress}>
                        Login
                    </button>
                    <span className="text-gray-500 text-center mb-2 py-2">
                        or login with provider
                    </span>
                    <button onClick={() => signIn('google', {callbackUrl:'/'})} className="flex gap-2 items-center justify-center bg-white mb-2" disabled={loginInProgress}>
                        <Image src={'/google.png'} alt={'google'} width={24} height={24} />
                        <span className="text-black">Login with Google</span>
                    </button>
                    <div className="flex items-center justify-center my-4 text-gray-500 border-t border-black/50 pt-4 mb-4 gap-2">
                        You are not a member? 
                        <Link className="underline text-primary" href={'/register'}>Register</Link>
                    </div>
                </form>
            </div>
        </section>
    )
}