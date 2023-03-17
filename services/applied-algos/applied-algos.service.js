import { deepCopy } from 'ethers/lib/utils';
import { LocalStorageService } from '../local-storage.service';
const appliedAlgoDataMock = require('./data-mocks/applied-algos-mock.json');

// persists algorithms that user added and it's parameters in local storage
export class AppliedAlgosService {
    // @todo store all the parameters in local storage under namespace "whitebox". Example whitebox.algoname = {weekStartsOn: "Friday", ... }
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

    // returns services/applied-algos/data-mocks/applied-algos-mock.json
    async getAppliedAlgos() {
        // @todo use localstorage
        // const algos = this.localStorage.retrieve(storageKey);
        const algos = JSON.parse(JSON.stringify(appliedAlgoDataMock));
        return algos;
    }

    // use format: serivces/applied-algos/data-mocks/applied-algos-mock.json
    async persistAppliedAlgoParams(algoName, paramsObject) {
        this.localStorage.save(algoName, paramsObject);
    }

    async eraseAppliedAlgoParams(algoName) {
        this.localStorage.remove(algoName);
    }

    async getAll() {

    }
}