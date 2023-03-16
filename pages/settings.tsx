/* app/page.tsx */
"use client";

import { useEffect, useState } from "react";
import { client, exploreProfiles } from "../api";
import Link from "next/link";

export default function Settings() {
  /* create initial state to hold array of profiles */
  const [profiles, setProfiles] = useState<any>([]);
  useEffect(() => {
    fetchProfiles();
  }, []);
  async function fetchProfiles() {}

  return (
    <div className="pt-20">
      <div className="ml-10"> {/* Div Feed  */}
        <header className=" text-black text-xl font-bold ">Feed</header>
        <h1 className=" ml-2 p-1">DeFi Junk shitposters filter</h1>
        <h1 className=" ml-2 p-1">Exploring on weekends</h1>
        <h1 className=" ml-2 p-1">Suggest opposite view content</h1>
        <h1 className=" ml-2 p-1">Engagement bait Filter</h1>
      </div>
      <div className=" ml-10 p-4"> {/* Div  Connection */}
      <header className=" text-black text-xl font-bold ">Connections</header>
        <h1 className=" ml-2 p-1">DeFi Junk shitposters filter</h1>
        <h1 className=" ml-2 p-1">Exploring on weekends</h1>
        <h1 className=" ml-2 p-1">Suggest opposite view content</h1>
        <h1 className=" ml-2 p-1">Engagement bait Filter</h1>
      </div>
      <div> {/* Div Parameters  */}
      </div>
      <div> {/* Div Code  */}
      </div>
      Settings page
    </div>
  );
}
