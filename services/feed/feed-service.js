import { gql } from '@apollo/client'
import { client, exploreProfiles, getProfile, getPublications } from '../../api'
const defaultHandle = 'stani.lens';


export default class  FeedService {
    async getPublications(user, inputData, algorithmData) {
        if (!algorithmData) {
            return [];
        }

        const handledData = await this._handleAlgoData(algorithmData);
        const profileData = await this._fetchProfile(handledData);
        const publications = await this._fetchPubs(profileData);
        const feedItems = publications.data.publications.items;
        return feedItems;
    }

    async _fetchProfile(fetchProfileData) {
        const returnedProfile = await client.query({
          query: getProfile,
          variables: { handle: fetchProfileData }
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
        
        console.log(`profile ${fetchProfileData} fetched`);
        console.log(profileData);
    
        return profileData;
      }

      async _handleAlgoData(algorithmData) {
        let result = 'kozlovchad.lens'
        if (algorithmData.hash === "QmUCx569wi9N8QsiXghEPTiZEYCuVxWCLDz3kD3mjSK1eF") {
            result = 'stani.lens'
        } else if (algorithmData.hash === "QmYuTit2sL8TKAurJav7mooKukphcpXoRNYASg1nvgoKxW") {
            result = 'sasicodes.lens'
        }

        return result;
      }

      async _fetchPubs(fetchData) {
        try {
          const result = await client.query({
            query: getPublications,
            variables: {
                id: fetchData.id, limit: 50
            }
          })
    
          console.log('publications fetched');
          console.log(result);
    
          return result;
        } catch(e) {
          console.error(`error downloading publication for ${fetchData.handle} \n ${e}`);
        }
      }
}