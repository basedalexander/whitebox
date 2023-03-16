import { LocalStorageService } from './local-storage.service';

const mockAlgorithmData = require('./mocks/algorithm-mock.json');

// keeps algorithms, that are chosen by user and keeps parameter setting.
export class AppliedAlgorithmsService {
    storageKey = 'whitebox';


    constructor() {
        this.localStorage = new LocalStorageService();
    }

    async addAlgo(algoName, paramsObject) {
        await this.persistAppliedAlgoParams(algoName, paramsObject);
    }

    async removeAlgo(algoName) {
        await this.eraseAppliedAlgoParams(algoName)
    }

    async getAppliedAlgos() {
        const algos = this.localStorage.retrieve(storageKey);
        return algos;
    }

    async persistAppliedAlgoParams(algoName, paramsObject) {
        this.localStorage.save(algoName, paramsObject);
    }

    async eraseAppliedAlgoParams(algoName) {
        this.localStorage.remove(algoName);
    }

    async getAll() {

    }
}