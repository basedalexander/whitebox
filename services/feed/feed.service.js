export class FeedService {
    defaultProfileId = 'stani.lens';

    constructor() {
        
    }

    async query(profileId, params) {
        const pId = profileId || this.defaultProfileId;

    }
}