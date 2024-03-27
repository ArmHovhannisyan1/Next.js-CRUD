'use client'

import React, { useEffect, useState } from 'react';
import Image from 'next/image'
import Link from 'next/link'
import { signIn, signOut, useSession, getProviders } from 'next-auth/react'

const Nav = () => {
    const { data: session } = useSession()
    const [providers, setProviders] = useState(null)
    const [dropdown, setDropDown] = useState(false)

    useEffect(() => {
        const setAsyncProvider = async () => {
            const res = await getProviders()
            setProviders(res)
        }
        setAsyncProvider()
    }, [])
    return (
        <nav className='w-full flex-between pt-4'>
            <Link
                href='/'
                className='flex gap-2'
            >
                <Image
                    src='/assets/images/logo.svg'
                    width={30}
                    height={30}
                    alt='Logo'
                />
                <p className='logo_text'>Promptopia</p>
            </Link>
            <div className="sm:flex hidden">
                {session?.user ? (
                    <div className='gap-3 flex md:gap-5'>
                        <Link
                            href='/create-prompt'
                            className='black_btn'
                        >
                            Create prompt
                        </Link>
                        <button
                            type='button'
                            onClick={signOut}
                            className='outline_btn'
                        >
                            Sign out
                        </button>
                        <Link href='/profile'>
                            <Image
                                src={session?.user.image}
                                width={37}
                                height={37}
                                alt='Logo'
                                className='rounded-full'
                            />
                        </Link>
                    </div>
                ) : (
                    providers && Object.values(providers).map((provider) => (
                        <button type='button' key={provider.name} onClick={() => signIn(provider.id)} className='black_btn'>
                            Sign In
                        </button>
                    ))
                )}
            </div>
            <div className="sm:hidden flex relative">
                {session?.user ? (
                    <div className='flex'>
                        <Image
                            src={session?.user.image}
                            width={37}
                            height={37}
                            alt='Logo'
                            className='rounded-full'
                            onClick={() => setDropDown(prev => !prev)}
                        />
                        {dropdown && (
                            <div className="dropdown">
                                <Link
                                    href='/profile'
                                    className='dropdown_link'
                                    onClick={() => setDropDown(false)}
                                >
                                    My Profile
                                </Link>
                                <Link
                                    href='/create-prompt'
                                    className='dropdown_link'
                                    onClick={() => {
                                        setDropDown(false)
                                        signOut()
                                    }}
                                >
                                    Create Prompt
                                </Link>
                                <button type='button' className='w-full mt-2 black_btn' onClick={() => setDropDown(false)}>
                                    Sign Out
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    providers && Object.values(providers).map((provider) => (
                        <button type='button' key={provider.name} onClick={() => signIn(provider.id)} className='black_btn'>
                            Sign In
                        </button>
                    ))
                )}
            </div>
        </nav>
    );
};

export default Nav;