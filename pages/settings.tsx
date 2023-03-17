/* app/page.tsx */
"use client";

import { useEffect, useState } from "react";
import AlgoRegistryService from '../services/algo-registry/algoregistry.service';
import { AppliedAlgosService } from '../services/applied-algos/applied-algos.service';

export default function Settings() {

  let algoRegistryService = new AlgoRegistryService();
  let appliedAlgosService = new AppliedAlgosService();
  
  // 1. Fetch all algo names from AlgoRegistryServices.getAll()
  // 2. Fetch each algo by names and store them into an array "algorithms"
  // 3. Use AppliedAlgosService to get names of algorithms that were selected by user in settings
  // 4. Also use the same service to get stored parameter values.
  // 5. Render list of applied algorithms
  // 6. On algo select - it should render interface into interface and code into code component

  const [algos, setAlgos] = useState<any>([]); // array of serivces/algo-registry/data-mocks/get-algorithm-data-mock.json
  const [appliedAlgos, setAppliedAlgos] = useState<any>([]);
  const selectedAlgoName = ''; // used to identify a selected algo in the list
  
  useEffect(() => {
    fetchAlgos()
    fetchAppliedAlgos()
    init()
  }, []);

  async function init() {
    // @todo get applied alogs and save them into appliedAlgos
    // filter out algos that are not applied
    // marge applied algo parameter values into algo.md.interface.parameters fields under field value for each param.
    // display all that.
  }

  async function fetchAlgos() {
    const names = await algoRegistryService.getNames();
    const algos = await algoRegistryService.getMany(names);
    console.log('algos loaded');
    console.log(algos);
    setAlgos(algos);;
  }
  async function fetchAppliedAlgos() {
    const appliedAlgos = await appliedAlgosService.getAppliedAlgos();
    console.log('appliedAlgos loaded');
    console.log(appliedAlgos);
    setAppliedAlgos(appliedAlgos);
  }

  async function onParamsSave() {
    // 1. the the whole object of parameters, transform it to save into appliedAlgoService format.
    const paramsToSave = {};
    await appliedAlgosService.addAlgo(selectedAlgoName, paramsToSave);
    console.log('params saved');
  }

  async function onAlgoClick() {
    // 1. save selected algo name into variable selectedAlgoName
    // 2. Render the insides of the algo into parameters and code components
    console.log('algo click');
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
                Feed
              </header>
              <div>
              { algos.map(algo => (
              <div onClick={onAlgoClick} className="ml-2 p-1 hover:text-violet-700 truncate w-min">
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
          <button onClick={onParamsSave}>SAVE PARAMS</button>
            {" "}
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
                    <div className="p-4">Weekend starts on: Friday</div>
                    <div className="p-4">Weekend ends on: Sunday</div>
                    <div className="p-4">Topics to explore:</div>
                    <div className="flex flex-col space-y-4 p-4">
                      <div className="bg-white border rounded-lg shadow-md p-4">
                        <h2 className="text-lg font-bold mb-2">Longevity</h2>
                      </div>
                      <div className="bg-white border rounded-lg shadow-md p-4">
                        <h2 className="text-lg font-bold mb-2">Space Tech</h2>
                      </div>
                      <div className="bg-white border rounded-lg shadow-md p-4">
                        <h2 className="text-lg font-bold mb-2">
                          Web3 software development
                        </h2>
                      </div>
                      <div className="bg-white border rounded-lg shadow-md p-4">
                        <h2 className="text-lg font-bold mb-2">Topic 4</h2>
                      </div>
                      <div className="bg-white border rounded-lg shadow-md p-4">
                        <h2 className="text-lg font-bold mb-2">Topic 5</h2>
                      </div>
                      <div className="bg-white border rounded-lg shadow-md p-4">
                        <h2 className="text-lg font-bold mb-2">Topic 6</h2>
                      </div>
                      <div className="bg-white border rounded-lg shadow-md p-4">
                        <h2 className="text-lg font-bold mb-2">Topic 7</h2>
                      </div>
                    </div>
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
                  <h1 className="text-lg font-bold">Exemplo de código</h1>
                </div>
                <div className="flex flex-col space-y-4 p-4">
                  <div className="bg-white border rounded-lg shadow-md p-4">
                    <div
                      className="flex-grow overflow-auto"
                      style={{ maxHeight: "60vh" }}
                    >
                      <pre className="whitespace-pre-wrap text-sm font-mono">
                        <code>
                          {`import Web3 from 'web3';

const web3 = new Web3('https://ropsten.infura.io/v3/your-project-id');

const contractAddress = '0x123456789abcdef...';
const abi = [{"constant":false,"inputs":[{"name":"_value","type":"uint256"}],"name":"setValue","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getValue","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"}];

const contractInstance = new web3.eth.Contract(abi, contractAddress);

const setValue = async () => {
  const accounts = await web3.eth.getAccounts();
  const value = '1000';
  await contractInstance.methods.setValue(value).send({ from: accounts[0] });
};

const getValue = async () => {
  const value = await contractInstance.methods.getValue().call();
  console.log(value);
};

setValue();
getValue();`}
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
