/* app/page.tsx */
'use client'

import { useEffect, useState, useMemo } from 'react'
import { gql, ApolloClient } from '@apollo/client'
import { client, exploreProfiles, getProfile, getPublications } from '../api'
import { replaceValues } from '@/services/utils/utils'
import { filterBrokenAlgos } from '../services/algos-utils'
import useStoredAlgos from "@/services/useStoredAlgos";




export default function Home() {
  const [publications, setPublications] = useState<any>([])
  const defaultHandle = 'stani.lens';
  const [selectedAlgoIndex, setSelectedAlgoIndex] = useState<any>(0);


  useEffect(() => {
    init();
    setSelectedAlgoIndex(0);
  }, [])

  // ======= this mess is to fetch and transfortm algos data to render.
  const [storedAlgos, algoHashes] = useStoredAlgos();
  if (storedAlgos) {
    console.log(storedAlgos);
  }
  
  const processedAlgos = useMemo(() => {
    storedAlgos?.forEach((algo, index) => {
      algo.hash = algoHashes?.[index];
    });
    const res = filterBrokenAlgos(storedAlgos)
    return res
  }, [storedAlgos])

  if (processedAlgos) {
    console.log('processed algos');
    console.log(processedAlgos)
  }
  // ===== mess ends

  async function init() {
    await refreshFeed();
  }

  async function refreshFeed() {
      const profileData = await fetchProfile(defaultHandle);
      const publications: any = await fetchPubs(profileData);
      const feedItems = publications.data.publications.items;
      setPublications(feedItems);
      console.log('feed refreshed');
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
    
    console.log(`profile ${handle} fetched`);
    console.log(profileData);

    return profileData;
  }
  
  async function fetchPubs(profileData) {
    try {
      const result = await client.query({
        query: getPublications,
        variables: {
            id: profileData.id, limit: 50
        }
      })

      console.log('publications fetched');
      console.log(result);

      return result;
    } catch(e) {
      console.error(`error downloading publication for ${profileData.handle} \n ${e}`);
    }
  }
  
  async function handleRefresh() {
    await refreshFeed();
    console.log('refresh executed');
  }

  function onAlgoClick(index) {
    setSelectedAlgoIndex(index);
    console.log("algo click index ", index);
  }

  return (
    <div className="pt-20">
      <div>
      <div className="ml-10 w-min">
              <header className="text-black text-xl font-bold w-min">
                Select Algo
              </header>
              <div>
                {processedAlgos?.map((algo, index) => (
                  <div key={algo.name} style={index === selectedAlgoIndex ? { color: 'blue' } : { color: 'black' }}
                    onClick={() => onAlgoClick(index)}
                    className="ml-2 p-1 hover:text-violet-700 truncate w-min"
                  >
                    {algo.name}
                  </div>
                ))}
              </div>
            </div>
      </div>

      <div>
        <div className="flex flex-col justify-center items-center ">
        <input
          type="text"
          placeholder="What's new?"
          className="border-teal-700 w-96 rounded"
          style={{ paddingLeft: '10px', paddingRight: '20px' }}
        />
        </div>
        <div className="flex flex-col justify-center items-center ">
          <button onClick={handleRefresh}>REFRESH</button>
        </div>

        <div className="flex flex-col items-center justify-cente w-2/5 mx-auto mt-10  rounded-xl ">
        {
              publications.map(pub => (
                <div key={pub.id} className='shadow p-10 rounded mb-8 w-2/3'>
                  <p>{pub.metadata.content}</p>
                </div>
              ))
          }
        </div>
      </div>
    </div>
  );
}
