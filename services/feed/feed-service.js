import { gql } from '@apollo/client'
import { client, exploreProfiles, getProfile, getPublications } from '../../api'
const defaultHandle = 'stani.lens';


export default class  FeedService {
    async getPublications(user, inputData, params, code) {
        const profileData = await this._fetchProfile(defaultHandle);
        const publications = await this._fetchPubs(profileData);
        const feedItems = publications.data.publications.items;
        return feedItems;
    }

    async _fetchProfile(handle) {
        const returnedProfile = await client.query({
          query: getProfile,
          variables: { handle }
        })
        const profileData = { ...returnedProfile.data.profile }
        /* format their picture if it is not in the right format */
        const picture = profileData.picture
        if (picture && picture.original && picture.original.url) {
          if (picture.original.url.startsWith('ipfs://')) {
            let result = picture.original.url.substring(7, picture.original.url.length)
            profileData.avatarUrl = `http://lens.infura-ipfs.io/ipfs/${result}`
          } else {
            profileData.avatarUrl = profileData.picture.original.url
          }
        }
        
        console.log(`profile ${handle} fetched`);
        console.log(profileData);
    
        return profileData;
      }

      async _fetchPubs(profileData) {
        try {
          const result = await client.query({
            query: getPublications,
            variables: {
                id: profileData.id, limit: 50
            }
          })
    
          console.log('publications fetched');
          console.log(result);
    
          return result;
        } catch(e) {
          console.error(`error downloading publication for ${profileData.handle} \n ${e}`);
        }
      }
}