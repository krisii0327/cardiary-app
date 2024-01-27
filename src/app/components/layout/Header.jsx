"use client"
import Link from "next/link";
import { FiMenu } from "react-icons/fi";
import { FaCar } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";
import { CiLogout } from "react-icons/ci";
import { AiOutlineProfile } from "react-icons/ai";
import { BiSolidCarGarage } from "react-icons/bi";
import { useState } from "react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { LogIn, LogOut, UserCog, UserPlus, Warehouse } from "lucide-react";

export default function Header() {
    const session = useSession();
    const status = session.status;

    const userCredentials = session.data?.userCredentials;

    const [menu, setMenu] = useState(false);


    return (
        <header className="flex justify-between items-center px-2 py-3 border-b border-gray-400 mx-4 sticky top-0 bg-white z-10">
            <Link href={'/'} className="flex gap-2 items-center">
                <FaCar className="w-7 h-7"/>
                <span className="font-medium text-xl italic text-primary">carDiary Project</span>
            </Link>
            <div onClick={() => setMenu(prev => !prev)} className="flex gap-1 items-center border border-gray-500 p-1 px-2 rounded-lg shadow-box cursor-pointer">
                {userCredentials?.email && (
                    <div>
                        {(userCredentials?.name) && (
                            <div className="font-medium">
                                {userCredentials.name.split(' ')[0]}
                            </div>
                        )}
                        {!(userCredentials?.name) && (
                            <div className="font-medium">
                                {userCredentials.email.split('@')[0]}
                            </div>
                        )}
                    </div>
                )}
                {userCredentials?.email && userCredentials?.image && (
                    <div className="flex items-center">
                        <div className="relative w-6 h-6">
                            <Image src={userCredentials.image} alt='avatar' fill className="rounded-lg" unoptimized={true}/>
                        </div>
                    </div>
                )}
                {!userCredentials?.image && (
                    <FaUser className="w-4 h-4"/>
                )}
                <FiMenu className="w-5 h-5"/>
            </div>
            {menu && (
                <div className="absolute mx-4 -right-2 top-12">
                    <div className="flex flex-col gap-2 items-end border border-gray-500 p-2 px-4 rounded-lg shadow-box bg-white font-medium">
                        {status === 'unauthenticated' && (
                            <>
                                <Link href={'/login'} className="flex items-center gap-2 hover:bg-gray-200 rounded-lg px-2">
                                    <LogIn size={20} strokeWidth={1.5} />
                                    Login
                                </Link>
                                <Link href={'/register'} className="flex items-center gap-2 hover:bg-gray-200 rounded-lg px-2">
                                    <UserPlus size={20} strokeWidth={1.5} />
                                    Register
                                </Link>
                            </>
                        )}
                        {status === 'authenticated' && (
                            <>
                                <Link href={'/profile'} className="flex items-center gap-2 hover:bg-gray-200 rounded-lg px-2">
                                    <UserCog size={20} strokeWidth={1.5}/>
                                    <span>Profile</span>
                                </Link>
                                <Link href={'/profile/garage'} className="flex items-center gap-2 hover:bg-gray-200 rounded-lg px-2">
                                    <Warehouse size={20} strokeWidth={1.5}/>
                                    <span>Garage</span>
                                </Link>
                                <div className="flex items-center gap-2 cursor-pointer hover:bg-gray-200 rounded-lg px-2" onClick={signOut}>
                                    <LogOut size={20} strokeWidth={1.5}/>
                                    <span>Logout</span>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}
      </header>
    )
}