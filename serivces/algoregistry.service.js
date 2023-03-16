
const mockAlgorithmData = require('./mocks');
const { deepCopy } = require('./utils/utils');

class AlgoRegistryService {
    async getAll() {
        // gets all the algorithm names that are already in the registry.
        return ['test', 'test2'];
    }

    async get(name) {
        // gets one algorithm data by name
        return mockAlgorithmData;
    }

    async getMany(names) {
        // gets many algorithms, reuses get() method, returns array of algorithm data
        const copy = deepCopy(mockAlgorithmData);
        return [
            mockAlgorithmData, copy
        ]
    }

    async register(name, author, description, algoString) {
        // 1. Creates a new object entry using algoRegistry.sol smart contract with method "register
        // 2. Saves json that is in "md" field into ipfs
        // 3. Takes hash of saved file and puts it into mdHash field.
        // 4. Calls smartContract method to create the new entry
    }
}