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
      <div> {/* Div Feed  */}
      <h1>Teste</h1>
      </div>
      <div> {/* Div  Connection */}
      <h1>Teste 2</h1>
      </div>
      <div> {/* Div Parameters  */}
      </div>
      <div> {/* Div Code  */}
      </div>
      Settings page
    </div>
  );
}
