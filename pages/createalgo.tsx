/* app/page.tsx */
"use client";

import { useCallback, useEffect, useState, useMemo } from "react";
import {
  useContractWrite,
  usePrepareContractWrite,
} from "wagmi";
import { create } from "ipfs-http-client";
import whiteboxAbi from "../services/whiteboxAbi.json";

const authorization =
  "Basic " +
  Buffer.from(
    "2N8s1cPv6EHziCh6fllvlU5iVtp" + ":" + "81d5b28d2cc4e021c9a5a4812027e8fd"
  ).toString("base64");

const client = create({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
  headers: {
    authorization,
  },
});

const defaultAlgoObj = {
  "author": "0x235",
  "name": "New Algo Name",
  "description": "New Algo Description",
  "md": {
      "instruction": "do this to that",
      "interface": {
          "input": [
              {
                  "type": "string[]",
                  "description": "data time description"
              }
          ],
          "parameters": {
              "parameterA": {
                  "type": "string",
                  "value": "web3",
                  "description": "the beginning of a week"
              },
              "parameterB": {
                  "type": "number",
                  "value": 1,
                  "description": "param B description"
              }
          },
          "output": [
              {
                  "type": "string[]",
                  "description": "List of posts"
              }
          ]
      },
      "version": "1.0",
      "code": ""
  }
}

export default function Createalgo() {
  // 1. Fetch all algo names from AlgoRegistryServices.getAll()
  // 2. Fetch each algo by names and store them into an array "algorithms"
  // 3. Use AppliedAlgosService to get names of algorithms that were selected by user in settings
  // 4. Also use the same service to get stored parameter values.
  // 5. Render list of applied algorithms
  // 6. On algo select - it should render interface into interface and code into code component

  const [algos, setAlgos] = useState<any>([]);
  const [ipfsHash, setIpfsHash] = useState("");

  const [newAlgoName, setNewAlgoName] = useState<any>(defaultAlgoObj.name);
  const [newAlgoDescription, setNewAlgoDescription] = useState<any>(defaultAlgoObj.description);
  const [newAlgoVersion, setNewAlgoVersion] = useState<any>(defaultAlgoObj.md.version);
  const [newAlgoInstruction, setNewAlgoInstruction] = useState<any>(defaultAlgoObj.md.instruction);
  const [newAlgoParams, setNewAlgoParams] = useState<any>(defaultAlgoObj.md.interface.parameters);
  const [newAlgoCode, setNewAlgoCode] = useState<any>(defaultAlgoObj.md.code);
  
  const newAlgoObj = useMemo(() => {
    return {
      author: "0x8D60843A8B19c97375d1d67da1AC9049dDd807DC",
      name: newAlgoName,
      description: newAlgoDescription,
      md: {
        "instruction": newAlgoInstruction,
        "interface": {
            "input": [
                {
                    "type": "string[]",
                    "description": "data time description"
                }
            ],
            "parameters": newAlgoParams,
            "output": [
                {
                    "type": "string[]",
                    "description": "List of posts"
                }
            ]
        },
        version: newAlgoVersion,
        code: newAlgoCode 
    }

    }
  }, [newAlgoName, newAlgoDescription, newAlgoVersion, newAlgoInstruction, newAlgoParams, newAlgoCode])


  function onParamsChangeHandler(e) {
    const valueStr = e.target.value;
    let result;
    try {
      result = JSON.parse(valueStr);
    } catch (e) {
      throw new Error(`error updating params`);
    }
    setNewAlgoParams(result);
  }


  function onCodeChangeHandler(e) { 
    const valueStr = e.target.value;
    setNewAlgoCode(valueStr);
  }


  useEffect(() => {
  }, []);

  // saves contract data to ipfs and stores hash  
  const saveIpfsHash = useCallback(async () => {
    console.log(newAlgoObj);
    const val = JSON.stringify(newAlgoObj);
    console.log("saving data: ", val);
    const { cid } = await client.add(val);
    return setIpfsHash(cid.toString());
  }, [newAlgoObj]);

  const { config } = usePrepareContractWrite({
    abi: whiteboxAbi,
    address: "0x78f71f633Ac301b5D52aEA0f60dfaAB45885821b",
    functionName: "saveAndAuthorizeAlgo",
    args: [ipfsHash],
  });

  // puts hash into algo object and registers it within the contract registry smart contract
  const { write } = useContractWrite(config);

  return (
    <div className="pt-20" style={{ whiteSpace: "nowrap", display: "flex" }}>
      <div style={{ display: "flex" }}>
        <div style={{ padding: "2px", flexGrow: 1 }}>
          <div className="w-1/2 p-5">
            {" "}
            {/* Div Feed and Connections  */}
            <div className="ml-10 w-min">
              <header className="text-black text-xl font-bold w-min">
                Details:
              </header>

              <hr />
              
              <div>
                <input name='name' type="text" defaultValue={defaultAlgoObj.name} onChange={(e) => setNewAlgoName(e.target.value)} />
                <p>Name</p>
              </div>

              <hr />

              <div>
                <input name='description' type="text" defaultValue={defaultAlgoObj.description} onChange={(e) => setNewAlgoDescription(e.target.value)} />
                <p>Description:</p>
              </div>

              <hr />

              <div>
                <input name='version' type="text" defaultValue={defaultAlgoObj.md.version} onChange={(e) => setNewAlgoVersion(e.target.value)} />
                <p>Version:</p>
              </div>

              <hr />
              <div>
                <input name='instruction' type="text" defaultValue={defaultAlgoObj.md.instruction} onChange={(e) => setNewAlgoInstruction(e.target.value)} />
                <p>Instruction:</p>
              </div>

              <hr />

            </div>
          </div>
        </div>
        <div>
          <div className="item" style={{ flexBasis: "33%" }}>
            {/* Div Parameters  */}
            <div className=" w-full">
              <div className="w-80 h-83 border rounded-lg overflow-hidden">
                <div className="flex flex-col h-full">
                  <div className="bg-gray-100 p-4">
                    <h1 className="text-lg font-bold">Parameters</h1>
                  </div>
                  <div
                    className="flex-grow overflow-auto h-full"
                    style={{ maxHeight: "60vh" }}
                  >
                    <textarea onChange={(e) => onParamsChangeHandler(e)} className="w-full h-96" defaultValue={ newAlgoParams ? JSON.stringify(newAlgoParams, null, 4):  "" }></textarea>
                  </div>
                </div>
              </div>
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
                      className="flex-grow overflow-auto h-full"
                      style={{ maxHeight: "60vh" }}
                    >
                      <pre className="whitespace-pre-wrap text-sm font-mono">
                        <textarea onChange={(e) => onCodeChangeHandler(e)} className="w-full h-96" defaultValue={ newAlgoCode? newAlgoCode: "" }>
                        </textarea>
                      </pre>
                    </div>
                  </div>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                  width: "100%",
                }}
              >
                <button onClick={saveIpfsHash} className="inline-block mt-5 ml-10 rounded-full border-2 border-neutral-800 px-3 pt-1 pb-[3px] text-xs font-medium uppercase leading-normal text-neutral-800 transition duration-150 ease-in-out hover:border-neutral-800 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-neutral-800 focus:border-neutral-800 focus:text-neutral-800 focus:outline-none focus:ring-0 active:border-neutral-900 active:text-neutral-900 dark:border-neutral-900 dark:text-neutral-900 dark:hover:border-neutral-900 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10 dark:hover:text-neutral-900 dark:focus:border-neutral-900 dark:focus:text-neutral-900 dark:active:border-neutral-900 dark:active:text-neutral-900">PACK ALGO</button>
                <button onClick={write} disabled={!ipfsHash} className="inline-block mt-5 ml-10 rounded-full border-2 border-neutral-800 px-3 pt-1 pb-[3px] text-xs font-medium uppercase leading-normal text-neutral-800 transition duration-150 ease-in-out hover:border-neutral-800 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-neutral-800 focus:border-neutral-800 focus:text-neutral-800 focus:outline-none focus:ring-0 active:border-neutral-900 active:text-neutral-900 dark:border-neutral-900 dark:text-neutral-900 dark:hover:border-neutral-900 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10 dark:hover:text-neutral-900 dark:focus:border-neutral-900 dark:focus:text-neutral-900 dark:active:border-neutral-900 dark:active:text-neutral-900">
                  SEND TO REGISTRY
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
