import { GraphQLService } from "services/graphql/graphql.service";

export let fetchLatestPosts = (pageNumber: number) => {
  const graphqlClient = GraphQLService.getInstance();
  return graphqlClient.getLatestPosts(pageNumber, 10).then((posts) => {
    return posts;
  }).catch((exp) => {
    console.error('Exception in api:', exp);
  });
}