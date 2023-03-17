import { useContractRead } from "wagmi";
import whiteboxAbi from "../services/whiteboxAbi.json";
import useSWR from 'swr'
 
const getAlgoMetaFromIpfs = async (cid: string) => {
    // console.log("fetching: ", cid);
    const data = await fetch(`https://gateway.ipfs.io/ipfs/${cid}`);
    return data.json();
  };

export default () => {
    const {
        data: authorizedAlgos
      } = useContractRead({
        abi: whiteboxAbi,
        address: "0x78f71f633Ac301b5D52aEA0f60dfaAB45885821b",
        functionName: "getAuthorizedAlgos",
      });
      // console.log(authorizedAlgos);
    
      const { data: algosDataFromIpsf } = useSWR(
        [authorizedAlgos],
        async ([authorizedAlgos]: [string[]]) => {
          const algosData = await Promise.all(
            authorizedAlgos.map(getAlgoMetaFromIpfs)
          );
          return algosData;
        }
      );
      // console.log(algosDataFromIpsf);

      return algosDataFromIpsf
}

