'use client'

import React, { useState } from 'react';
import Image from 'next/image'
import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';

const PromptCard = ({ prompt,handleEdit,handleDelete }) => {
    const {data: session} = useSession()
    const pathName = usePathname()
    const [copied,setCopied] = useState(null)
    const handleCopyPrompt = () => {
        setCopied(prompt.prompt)
        navigator.clipboard.writeText(prompt.prompt)
        setTimeout(() => setCopied(''),3000)
    }
    console.log(prompt);
    return (
        <div className='prompt_card'>
            <div className="flex justify-between items-start gap-5">
                <div className='cursor-pointer flex-1 flex justify-start items-center gap-3'>
                    <Image
                        src={prompt.creator?.image}
                        alt='user_image'
                        width={40}
                        height={40}
                        className='rounded-full object-contain'
                    />
                    <div className='flex flex-col'>
                        <h3 className='font-satoshi font-semibold text-gray-900'>{prompt.creator?.username}</h3>
                        <p className='font-inter text-sm text-gray-500'>{prompt.creator?.email}</p>
                    </div>
                </div>
                <div className="copy_btn" onClick={handleCopyPrompt}>
                    <Image
                    src={`/assets/icons/${copied === prompt.prompt ? 'tick' : 'copy'}.svg`}
                    width={12}
                    height={12}
                    alt='copy_image'
                    />
                </div>
            </div>
            <p className='my-4 font-satoshi text-sm text-gray-700 break-words'>{prompt.prompt}</p>
            <p className='blue_gradient font-inter text-sm cursor-pointer'>{prompt.tag}</p>
            {session?.user.id === prompt.creator._id &&
            pathName === '/profile' && (
                <div className="mt-5 flex-center gap-4 border-t border-gray-100 pt-3">
                    <p className='font-inter text-sm green_gradient cursor-pointer' onClick={() => handleEdit(prompt)}>
                        Edit
                    </p>
                    <p className='font-inter text-sm orange_gradient cursor-pointer' onClick={() => handleDelete(prompt)}>
                        Delete
                    </p>
                </div>
            )
            }
        </div>
    );
};

export default PromptCard;