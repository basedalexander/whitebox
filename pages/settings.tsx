/* app/page.tsx */
'use client'

import { useEffect, useState } from 'react'
import { client, exploreProfiles } from '../api'
import Link from 'next/link'

export default function Settings() {
  /* create initial state to hold array of profiles */
  const [profiles, setProfiles] = useState<any>([])
  useEffect(() => {
    fetchProfiles()
  }, [])
  async function fetchProfiles() {
    
  }
  return (
    <div className='pt-20'>
      Settings page
    </div>
  )
}