/* app/page.tsx */
'use client'

import { useEffect, useState } from 'react'
import { client, exploreProfiles, authenticate, challenge, getProfile, getPublications } from '../api'
import Link from 'next/link'

export default function Home() {

  /* create initial state to hold array of profiles */
  const [profiles, setProfiles] = useState<any>([])
  const [publications, setPublications] = useState<any>([])
    /* using the router we can get the lens handle from the route path */
    const handle = 'stani.lens';


  useEffect(() => {
    init();
    fetchProfiles();
  }, [])

  async function init() {

  }

  async function refreshFeed() {
      // const profileData = await fetchProfile(handle);
      // const publications: any = await getPublications(profileData);
      // const feedItems = publications.data.publications.items;
      // setPublications(feedItems);
      // console.log('feed refreshed');
  }

  async function fetchProfile(handle) {
    const returnedProfile = await client.query({
      query: getProfile,
      variables: { handle }
    })
    const profileData = { ...returnedProfile.data.profile }
    /* format their picture if it is not in the right format */
    const picture = profileData.picture
    if (picture && picture.original && picture.original.url) {
      if (picture.original.url.startsWith('ipfs://')) {
        let result = picture.original.url.substring(7, picture.original.url.length)
        profileData.avatarUrl = `http://lens.infura-ipfs.io/ipfs/${result}`
      } else {
        profileData.avatarUrl = profileData.picture.original.url
      }
    }

    return profileData;
  }

  async function getPublications(profileData) {
    try {
      const result = await client.query({
        query: getPublications,
        variables: {
            id: profileData.id, limit: 50
        }
      })

      return result;
    } catch(e) {
      
    }
  }
  
  async function fetchProfiles() {
    try {
      /* fetch profiles from Lens API */
      let response = await client.query({ query: exploreProfiles })
      /* loop over profiles, create properly formatted ipfs image links */
      let profileData = await Promise.all(response.data.exploreProfiles.items.map(async profileInfo => {
        let profile = { ...profileInfo }
        let picture = profile.picture
        if (picture && picture.original && picture.original.url) {
          if (picture.original.url.startsWith('ipfs://')) {
            let result = picture.original.url.substring(7, picture.original.url.length)
            profile.avatarUrl = `http://lens.infura-ipfs.io/ipfs/${result}`
          } else {
            profile.avatarUrl = picture.original.url
          }
        }
        return profile
      }))

      /* update the local state with the profiles array */
      setProfiles(profileData)
    } catch (err) {
      console.log({ err })
    }
  }

  async function handleRefresh() {
    await fetchProfiles();
    await refreshFeed();
    console.log('refresh executed');
  }

  return (
    <div className="pt-20">
      <div className="flex flex-col justify-center items-center ">
      <input
        type="text"
        placeholder="Digite algo aqui!"
        className="border-teal-700 bg-gray-300 w-96 rounded"
        style={{ paddingLeft: '10px', paddingRight: '20px' }}
      />
      </div>
      <div className="flex flex-col justify-center items-center ">
        <button onClick={handleRefresh}>REFRESH</button>
      </div>

      <div className="flex flex-col items-center justify-cente w-2/5 mx-auto mt-10 bg-gray-400 rounded-xl ">
        {profiles.map((profile) => (
          <div
            key={profile.id}
            className="flex flex-col items-center justify-center mt-10 bg-white rounded-xl w-2/3"
          >
            <div className="flex items-center w-full">
              <img
                className="w-10 h-10 rounded-full ml-5"
                src={profile.avatarUrl || "https://picsum.photos/200"}
              />
              <div className="w-full ml-5">
                <p className="text-xl font-bold">{profile.name}</p>
                <p className="text-base text-gray-400">{profile.bio}</p>
              </div>
            </div>
            <Link href={`/profile/${profile.handle}`}>
              <p className="cursor-pointer text-violet-600 text-lg font-medium text-center mt-2 mb-2">
                {profile.handle}
              </p>
            </Link>
            <p className="text-pink-600 text-sm font-medium text-center">
              {profile.stats.totalFollowers} Followers
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
