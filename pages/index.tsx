/* app/page.tsx */
'use client'

import { useEffect, useState, useMemo } from 'react'
import { filterBrokenAlgos } from '../services/algos-utils'
import useStoredAlgos from "@/services/useStoredAlgos";
import FeedService from '@/services/feed/feed-service'

const feedService = new FeedService();

export default function Home() {
  const [publications, setPublications] = useState<any>([])
  const [selectedAlgoIndex, setSelectedAlgoIndex] = useState<any>(0);

  useEffect(() => {
    init();
    setSelectedAlgoIndex(0);
  }, [])

  // ======= this mess is to fetch and transfortm algos data to render.
  const [storedAlgos, algoHashes] = useStoredAlgos();
  if (storedAlgos) {
    console.log('fetched raw algorithms from contract')
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
    console.log('algorithms have been processed');
    console.log(processedAlgos)
  }
  // ===== mess ends

  async function init() {
    await refreshFeed();
  }

  async function refreshFeed() {
      let currentAlgo;
      if (processedAlgos) { currentAlgo = processedAlgos[selectedAlgoIndex]; }
      const userData = await getUserData();
      const user = await getCurrentUser();

      const feedItems = await feedService.getPublications(user, userData, currentAlgo);
      setPublications(feedItems);
      console.log('feed refreshed');
  }

  async function getUserData() {
    return [];  // mock for now
  }

  async function getCurrentUser() {
    return '0x8D60843A8B19c97375d1d67da1AC9049dDd807DC';
  }

  async function handleRefresh() {
    await refreshFeed();
    console.log('refresh executed');
  }

  async function onAlgoClick(index) {
    setSelectedAlgoIndex(index);
    await refreshFeed();
    console.log("algo click index ", index);
  }

  return (
    <div className="pt-20">
      <div>
      <div className="ml-10 w-min">
              <header className="text-black text-xl font-bold">
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
      <div className="flex flex-col justify-center items-center">
  <input
    type="text"
    placeholder="What's new?"
    className="border-teal-700 w-96 rounded shadow-lg"
    style={{ paddingLeft: '10px', paddingRight: '20px', fontSize: '1.2rem' }}
  />
</div>
        <div className="flex flex-col justify-center items-center ">
          <button onClick={handleRefresh} className="inline-block mt-5 ml-10 rounded-full border-2 border-neutral-800 px-3 pt-1 pb-[3px] text-xs font-medium uppercase leading-normal text-neutral-800 transition duration-150 ease-in-out hover:border-neutral-800 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-neutral-800 focus:border-neutral-800 focus:text-neutral-800 focus:outline-none focus:ring-0 active:border-neutral-900 active:text-neutral-900 dark:border-neutral-900 dark:text-neutral-900 dark:hover:border-neutral-900 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10 dark:hover:text-neutral-900 dark:focus:border-neutral-900 dark:focus:text-neutral-900 dark:active:border-neutral-900 dark:active:text-neutral-900">REFRESH</button>
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
