export const pageListingQuery = /* GraphQL */`
query pageListingQuery($count: Int = 10, $skip: Int = 0){
  pageCollection(limit: $count, skip: $skip) {
    items {
      url
      sys{
        id
        publishedAt
      }
    }
  }
}
`.replace(/(\r\n|\n|\r)/gm, '').replace(/\s+/gm, ' ');

export const pageByUrlQuery = /* GraphQL */`
query getPage ($url: String!) {
  pageCollection(limit:1, where:{url: $url}) {
    items {
      sys {
        id
        publishedAt
      }
      seoIndex
      seoFollow
      content {
        ...on HomeContent {
          __typename
          hiddenTitle
          featuredPostsCollection(limit:5) {
            items {
              title
              heroImage {
                image {url}
                alternativeText
              }
              standfirst{
                json
                links {
                  entries {
                    inline {
                      ...on PostContent {
                        linkedFrom {
                          pageCollection(limit:1) {
                            items {
                              url
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
`.replace(/(\r\n|\n|\r)/gm, '').replace(/\s+/gm, ' ');