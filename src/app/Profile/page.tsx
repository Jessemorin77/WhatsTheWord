"use client"
import { getServerAuthSession } from "~/server/auth"
import { api } from "~/trpc/react"
import Image from "next/image"

export default function Profile(){
    const query = api.profile.getById.useQuery()

    const profile = query.data

    return(
        <div>
            <div>
                <h1 className="text-2xl">Profile</h1>
                <Image
                    src={profile?.image}
                    height={200}
                    width={200}
                    alt="Image not Available"
                />
                <h1>{profile?.email}</h1>
                <h1>{profile?.name}</h1>
                <h1>{profile?.credibilityScore}</h1>
            </div>
        </div>
    )
}