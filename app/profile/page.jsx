'use client'
import Profile from '@components/Profile';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const MyProfile = () => {
    const { data: session } = useSession()
    const router = useRouter()
    const [posts, setPosts] = useState([])
    useEffect(() => {
        const fetchMyPosts = async () => {
            const res = await fetch(`/api/user/${session?.user.id}/posts`)
            console.log(res);
            const data = await res.json()
            setPosts(data)
        }
        if (session?.user.id) fetchMyPosts()
    }, [])

    const handleEdit = (prompt) => {
        router.push(`/update-prompt?id=${prompt._id}`)
    }

    const handleDelete = async (prompt) => {
        const hasConfirmed = confirm('Are you sure to delete this prompt')
        if (hasConfirmed) {
            try {
                fetch(`api/prompt/${prompt._id.toString()}`,
                    {
                        method: 'DELETE'
                    }
                )
                const filteredPosts = posts.filter(p => p._id !== prompt.id)
                setPosts(filteredPosts)
            } catch (error) {
                console.log(error);
            }
        }
    }
    return (
        <Profile
            name='My'
            desc='Welcome to your personalized profile page'
            data={posts}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
        />
    );
};

export default MyProfile;