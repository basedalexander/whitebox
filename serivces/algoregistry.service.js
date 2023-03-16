
const mockAlgorithmData = require('./mocks');
const { deepCopy } = require('./utils/utils');

class AlgoRegistry {
    async getAll() {
        return ['test', 'test2'];
    }

    async get(name) {
        return mockAlgorithmData;
    }

    async getMany(names) {
        const copy = deepCopy(mockAlgorithmData);
        return [
            mockAlgorithmData, copy
        ]
    }
}