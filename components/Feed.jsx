'use client'
import React, { useEffect, useState } from 'react';
import PromptCard from './PromptCard';

const PromptCardList = ({ data }) => {
    return (
        <div className="mt-16 prompt_layout">
            {data && data.map(prompt => (
                <PromptCard
                    key={prompt._id}
                    prompt={prompt}
                />
            ))}
        </div>
    )
}

const Feed = () => {
    const [posts, setPosts] = useState('')

    useEffect(() => {
        const fetchPosts = async () => {
            const res = await fetch('/api/prompt')
            const data = await res.json()
            setPosts(data)
        }
        console.log(posts);
        fetchPosts()
    }, [])

    return (
        <section className='feed'>
            <PromptCardList
                data={posts}
            />
        </section>
    );
};

export default Feed;