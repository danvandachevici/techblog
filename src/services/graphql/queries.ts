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

export const tagsListingQuery = /* GraphQL */`
query getTagsListing($maxCount: Int = 100) {
  tagCollection(limit: $maxCount) {
    items {
      name
      linkedFrom {
        tagContentCollection(limit:1){
          items {
            linkedFrom {
              pageCollection(limit: 1) {
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
`;

export const latestPostsQuery = /* GraphQL */`
query getLatestPosts($count: Int = 10) {
  postContentCollection(limit: $count, order:sys_firstPublishedAt_DESC) {
    items {
      sys {
        publishedAt
        id
      }
      title
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
        firstPublishedAt
      }
      seoIndex
      seoFollow
      content {
        __typename
        ...on HomeContent {
          hiddenTitle
          featuredTagsCollection(limit:100){
            items {
              name
              linkedFrom {
                tagContentCollection(limit:1) {
                  items {
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