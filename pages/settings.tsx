/* app/page.tsx */
"use client";

import { useEffect, useMemo, useState } from "react";

import useStoredAlgos from "@/services/useStoredAlgos";
import { filterBrokenAlgos } from '../services/algos-utils'
import LocalStorageService from "@/services/local-storage.service";

export default function Settings() {
  let localStorageService = new LocalStorageService();

  const [algos, setAlgos] = useState<any>([]);
  const [selectedAlgoIndex, setSelectedAlgoIndex] = useState<any>([]);

  useEffect(() => {
    localStorageService.init();
  setSelectedAlgoIndex(0);

  }, []);

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

  async function onParamsSave() {
    console.log(processedAlgos[selectedAlgoIndex].md.interface.parameters);
  }

  function onAlgoClick(index) {
    setSelectedAlgoIndex(index);
    console.log("algo click index ", index);
  }

  return (
    <div className="pt-20" style={{ whiteSpace: "nowrap", display: "flex" }}>
      <div style={{ display: "flex" }}>
        <div style={{ padding: "2px", flexGrow: 1 }}>
          <div className="w-1/2 p-5">
            {" "}
            {/* Div Feed and Connections  */}
            <div className="ml-10 w-min">
              <header className="text-black text-xl font-bold w-min">
                All feed algos available
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
              <button className="inline-block mt-5 ml-10 rounded-full border-2 border-neutral-800 px-3 pt-1 pb-[3px] text-xs font-medium uppercase leading-normal text-neutral-800 transition duration-150 ease-in-out hover:border-neutral-800 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-neutral-800 focus:border-neutral-800 focus:text-neutral-800 focus:outline-none focus:ring-0 active:border-neutral-900 active:text-neutral-900 dark:border-neutral-900 dark:text-neutral-900 dark:hover:border-neutral-900 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10 dark:hover:text-neutral-900 dark:focus:border-neutral-900 dark:focus:text-neutral-900 dark:active:border-neutral-900 dark:active:text-neutral-900">
                Add algo
              </button>
            </div>
          </div>
        </div>
        <div>
          <div className="item" style={{ flexBasis: "33%" }}>

            {" "}
            {/* Div Parameters  */}
            <div className="w-full h-100">
              <div className="w-80 h-full border rounded-lg overflow-hidden">
                <div className="flex flex-col h-full">
                  <div className="bg-gray-100 p-4">
                    <h1 className="text-lg font-bold">Parameters</h1>
                  </div>
                  <div className="h-full">
                    <textarea
                      className="w-full h-96"
                      defaultValue={ processedAlgos ? JSON.stringify(processedAlgos[selectedAlgoIndex]?.md.interface.parameters, null, 2) : '' }
                      onChange={(e) => {
                        try {
                          const value = JSON.parse(e.target.value);
                          // faça algo com o valor atualizado (por exemplo, armazenar em um estado)
                        } catch (error) {
                          console.log("Erro ao parsear JSON: ", error);
                        }
                      }}
                    />
                  </div>
                </div>
              </div>
              <button 
              className="inline-block mt-2 ml-5 rounded-full border-2 border-neutral-800 px-3 pt-1 pb-[3px] text-xs font-medium uppercase leading-normal text-neutral-800 transition duration-150 ease-in-out hover:border-neutral-800 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-neutral-800 focus:border-neutral-800 focus:text-neutral-800 focus:outline-none focus:ring-0 active:border-neutral-900 active:text-neutral-900 dark:border-neutral-900 dark:text-neutral-900 dark:hover:border-neutral-900 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10 dark:hover:text-neutral-900 dark:focus:border-neutral-900 dark:focus:text-neutral-900 dark:active:border-neutral-900 dark:active:text-neutral-900"
              onClick={onParamsSave}>SAVE PARAMS</button>
            </div>
          </div>
        </div>
      </div>
      <div>
        {" "}
        {/* Div Code  */}
        <div className="item ml-10" style={{ width: "600px", height: "100px" }}>
          <div className="w-fit">
            <div className="w-full border rounded-lg overflow-hidden">
              <div className="flex flex-col">
                <div className="bg-gray-100 p-4">
                  <h1 className="text-lg font-bold">Code</h1>
                </div>
                <div className="flex flex-col space-y-4 p-4">
                  <div className="bg-white border rounded-lg shadow-md p-4">
                    <div
                      className="flex-grow overflow-auto"
                      style={{ maxHeight: "60vh" }}
                    >
                      <pre className="whitespace-pre-wrap text-sm font-mono">
                        <code>
                          { processedAlgos? processedAlgos[selectedAlgoIndex]?.md.code: "" }
                        </code>
                      </pre>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

