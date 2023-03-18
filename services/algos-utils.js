export function filterBrokenAlgos(algosArray) {
    let res = algosArray?.filter(algo => algo?.name).map(algo => algo)

    // filter out algos with dummy code

    res = res?.filter(obj => {
        if (obj && obj.md && obj.md.code) {
            return obj.md.code.length > 40;
        } else {
            return false;
        }
    });

    return res;
}