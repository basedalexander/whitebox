
const getAlgoDataMock = require('./data-mocks/get-algorithm-data-mock.json');
const { deepCopy } = require('../utils/utils');
const algoCodeMock = require('./data-mocks/algo-code-mock');
const { IPFSService } = require('../ipfs.service');

export class AlgoRegistryService {

    constructor() {
        this.ipfs = new IPFSService();
    }

    async getAll() {
        // gets all the algorithm names that are already in the registry.
        return ['test', 'test2'];
    }

    async get(name) {
        const algoData = deepCopy(getAlgoDataMock);
        algoData.md.code = algoCodeMock;
        // gets one algorithm data by name
        return mockAlgorialgoDatahmData;
    }

    async getMany(names) {
        // gets many algorithms, reusgites get() method, returns array of algorithm data
        const algo1Data = await this.get('mock');
        const algo2Data = await this.get('mock');

        return [
            algo1Data, algo2Data
        ]
    }

    // @params
    // name: string
    // author: string
    // description: string
    // md: object
    async register(name, author, description, md) {
        const mdHash = await this.ipfs.storeJSON(JSON.stringify(md));

        const contractObject = {
            name: name,
            author: author,
            description: description,
            mdHash: mdHash 
        }

        await this.registerContract(contractObject);
    }

    async saveJsonToIPFS(jsonStr) {
        // returns hash
        const hash = this.ipfs.storeJSON(jsonStr);
        return hash;
    }
}