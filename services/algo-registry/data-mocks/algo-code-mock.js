const algoMockCode = `
query Publications($id: ProfileId!, $limit: LimitScalar) {
  publications(request: {
    profileId: $id,
    publicationTypes: [POST],
    limit: $limit
  }) {
    items {
      __typename 
      ... on Post {
        ...PostFields
      }
    }
  }
}
fragment PostFields on Post {
  id
  metadata {
    ...MetadataOutputFields
  }
}
fragment MetadataOutputFields on MetadataOutput {
  content
}
`;

export default algoMockCode;