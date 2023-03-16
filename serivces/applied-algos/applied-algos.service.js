import { LocalStorageService } from '../local-storage.service';

// keeps algorithms, that are chosen by user and keeps parameter setting.
export class AppliedAlgosService {
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
        return algos;1 
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