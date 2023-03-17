/* app/page.tsx */
"use client";

import { useEffect, useState } from "react";
import AlgoRegistryService from '../services/algo-registry/algoregistry.service';

const parametersMock = {
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
  const [createdAlgoObj, setCreatedAlgoObj] = useState<any>([]); // serivces/algo-registry/data-mocks/get-algorithm-data-mock.json
  
  useEffect(() => {
    init()
  }, []);

  async function init() {

  }

  async function onParamsSave() {
    const paramsToSave = {};
    console.log('params saved');
  }

  async function onRegisterClick() {
    // construct prepare algo object and register in in algoRegistryService.
    console.log('create algo click');
  }

  async function onCodeSaveClick() {
    console.log('code save clicked')
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
                Details
              </header>
              <div>
                Name: 
                <input type="text" />
              </div>
              <div>
                Description: 
                <input type="text" />
              </div>
              <div>
                Version: 
                <input type="text" />
              </div>
              <div>
                instructions: 
                <input type="text" />
              </div>

              <button onClick={onRegisterClick}>[REGISTER ALGO]</button>
            </div>
          </div>
        </div>
        <div>
          <div className="item" style={{ flexBasis: "33%" }}>
          <button onClick={onParamsSave}>[SAVE PARAMS]</button>
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
                    <code>
                      {JSON.stringify(parametersMock)}
                    </code>
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
        <button onClick={onCodeSaveClick}>[SAVE CODE]</button>
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
