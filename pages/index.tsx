/* app/page.tsx */
'use client'

import { useEffect, useState } from 'react'
import { gql, ApolloClient } from '@apollo/client'
import { client, exploreProfiles, getProfile, getPublications } from '../api'
import { replaceValues } from '@/services/utils/utils'


export default function Home() {

  /* create initial state to hold array of profiles */
  const [profiles, setProfiles] = useState<any>([])
  const [publications, setPublications] = useState<any>([])
    /* using the router we can get the lens handle from the route path */
    const handle = 'stani.lens';


  useEffect(() => {
    init();
  }, [])

  async function init() {
    
    // Get applied algorithms md and parameters.
    // 1. Get Applied algos and their parameters
    // 2. Download only algos by name, they can be cashed in AppliedAlgos service.

    // Prototype query: Get publication from all accounts that "handle" follows
    // (OPTIONALY) get 


    // build query
    // 2. Build query based on the code and the parameters of the algorithms
    // 3. Refresh the feed with that query.
    await refreshFeed();
  }

  async function refreshFeed() {
      const profileData = await fetchProfile(handle);
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

  async function buildQuery(code, params) {
    const processedQueryStr = processQuery(code, params);
    // return gql(processedQueryStr);
  }
  async function processQuery(code, params) {
    const processedQuery = replaceValues(params, code);
    return processedQuery;
  }

  async function QueryFeed(query) {
  //   const queryExample = async () => {
  //     const response = await apolloClient.query({
  //      query: gql(query),
  //    })
  //    console.log('Lens example data: ', response)
  //  }
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

  return (
    <div className="pt-20">
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
  );
}
