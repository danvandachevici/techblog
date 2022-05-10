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

export const latestPostsQuery = /* GraphQL */`
query getLatestPosts($count: Int = 10) {
  postContentCollection(limit: $count, order:sys_publishedAt_DESC) {
    items {
      sys {
        publishedAt
        id
      }
      title
      heroImage {
        image {
          url
        }
        alternativeText
      }
      standfirst {
        json
      }
      linkedFrom{
        pageCollection(limit:1){
          items {
            url
          }
        }
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
        __typename
        ...on HomeContent {
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
                        title
                        heroImage {
                          image {
                            url
                          }
                          alternativeText
                        }
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

        ...on PostContent {
          title
          heroImage {
            image {
              url
            }
            alternativeText
          }
          standfirst {
            json
          }
          content {
            json
          }
          authorsCollection (limit:2){
            items {
              name
              avatar {
                image {
                  url
                }
                alternativeText
              }
            }
          }
        }
      }
    }
  }
}
`.replace(/(\r\n|\n|\r)/gm, '').replace(/\s+/gm, ' ');