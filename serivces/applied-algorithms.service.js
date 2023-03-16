import { LocalStorageService } from './local-storage.service';

const mockAlgorithmData = require('./mocks/algorithm-mock.json');

export class AppliedAlgorithmsService {
    storageKey = 'whitebox';

    algos = new Map();

    constructor() {
        this.localStorage = new LocalStorageService();
    }


    async getAppliedAlgos() {
        const algos = this.localStorage.retrieve(storageKey);
        return algos;
    }

    async persistAppliedAlgoParams(algoName, parametersObj) {
        this.localStorage.save(algoName, parametersObj);
    }

    async eraseAppliedAlgoParams(algoName) {
        this.localStorage.remove(algoName);
    }

    async getAll() {

    }
}