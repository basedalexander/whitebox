const getAlgoDataMock = require('./data-mocks/get-algorithm-data-mock.json');
const { deepCopy } = require('../utils/utils');
const algoCodeMock = require('./data-mocks/algo-code-mock');
const { IPFSService } = require('../ipfs.service');

export default class AlgoRegistryService {

    constructor() {
        this.ipfs = new IPFSService();
    }

    async getAll() {
        // gets all the algorithm names that are already in the registry.
        return ['Exploration of weekends v.1', 'Exploration of weekends v.2'];
    }

    // returns services/algo-registry/data-mocks/get-algorithm-data-mock.json
    // .md JSON is stored in IPFS and retrieved by hash.
    async get(name) {
        const algoData = deepCopy(getAlgoDataMock);
        algoData.name = name;
        algoData.md.code = algoCodeMock;
        // gets one algorithm data by name
        return mockAlgorialgoDatahmData;
    }

    async getMany(names) {
        const promises = names.map(name => {
            return this.get(name);
        })

        const result = await Promise.all(promises);
        return result;
    }

    // @params
    // name: string
    // author: string
    // description: string
    // mdHash - store 'md' json in ipfs and store it's hash in .mdHash
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