export function filterBrokenAlgos(algosArray) {
    const res = algosArray?.filter(algo => algo?.name).map(algo => algo)
    return res;
}