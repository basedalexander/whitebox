/* app/page.tsx */
"use client";

import { useCallback, useEffect, useState } from "react";
import {
  useContractWrite,
  usePrepareContractWrite,
} from "wagmi";
import { create } from "ipfs-http-client";
import AlgoRegistryService from "../services/algo-registry/algoregistry.service";
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

const newAlgoObj = {
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
      "code": "{ ... }"
  }
}

const parametersMock = {
  "author": "0x8D60843A8B19c97375d1d67da1AC9049dDd807DC",
  "name": "Exploration for weekends",
  "description": "Content of your choosing for weekend, select area of interests that you want to explore",
  "mdhash": "hashstring",
  "md": {
      "instruction": "do this to that",
      "interface": {
          "input": [
              {
                  "type": "string[]",
                  "description": "list of interets"
              }
          ],
          "parameters": {
              "weekStartsOn": {
                  "type": "string",
                  "value": "Friday",
                  "acceptedValues": [
                      "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
                  ],
                  "description": "the beginning of a week"
              },
              "weekEndsOn": {
                  "type": "string",
                  "value": "Sunday",
                  "acceptedValues": [
                      "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
                  ],
                  "description": "the beginning of a week"
              },
              "interests": {
                  "type": "string[]",
                  "value": [],
                  "description": "List of topics you are interested in"
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
};

export default function Createalgo() {
  let algoRegistryService = new AlgoRegistryService();

  // 1. Fetch all algo names from AlgoRegistryServices.getAll()
  // 2. Fetch each algo by names and store them into an array "algorithms"
  // 3. Use AppliedAlgosService to get names of algorithms that were selected by user in settings
  // 4. Also use the same service to get stored parameter values.
  // 5. Render list of applied algorithms
  // 6. On algo select - it should render interface into interface and code into code component

  const [algos, setAlgos] = useState<any>([]); // array of serivces/algo-registry/data-mocks/get-algorithm-data-mock.json
  const [createdAlgoObj, setCreatedAlgoObj] = useState<any>(parametersMock); // serivces/algo-registry/data-mocks/get-algorithm-data-mock.json
  const [ipfsHash, setIpfsHash] = useState("");

  useEffect(() => {
  }, []);

  // console.log(ipfsHash);

  const saveIpfsHash = useCallback(async () => {
    const val = JSON.stringify(createdAlgoObj);
    console.log("saving data: ", val);
    const { cid } = await client.add(val);
    return setIpfsHash(cid.toString());
  }, [createdAlgoObj]);

  const { config } = usePrepareContractWrite({
    abi: whiteboxAbi,
    address: "0x78f71f633Ac301b5D52aEA0f60dfaAB45885821b",
    functionName: "saveAndAuthorizeAlgo",
    args: [ipfsHash],
  });
  const { write } = useContractWrite(config);


  const [text, setText] = useState('');

  const handleChange = (e) => {
    // update new algo object with the latest update, could be done automaticaly with react?
  };


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
                <input type="text" value={newAlgoObj.name} onChange={handleChange} />
                <p>Name</p>
              </div>

              <hr />

              <div>
                <input type="text" value={newAlgoObj.description} onChange={handleChange} />
                <p>Description:</p>
              </div>

              <hr />

              <div>
                <input type="text" value={newAlgoObj.md.version} onChange={handleChange} />
                <p>Version:</p>
              </div>

              <hr />
              <div>
                <input type="text" value={newAlgoObj.md.instruction} onChange={handleChange} />
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
                    className="flex-grow overflow-auto"
                    style={{ maxHeight: "60vh" }}
                  >
                    <code>{JSON.stringify(newAlgoObj.md.interface.parameters)}</code>
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
                      className="flex-grow overflow-auto"
                      style={{ maxHeight: "60vh" }}
                    >
                      <pre className="whitespace-pre-wrap text-sm font-mono">
                        <code>
                          {JSON.stringify(newAlgoObj.md.code)}
                        </code>
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
                <button onClick={saveIpfsHash}>[SAVE IPFS HASH]</button>
                <button onClick={write} disabled={!ipfsHash}>
                  [SAVE AND AUTHORIZE]
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
