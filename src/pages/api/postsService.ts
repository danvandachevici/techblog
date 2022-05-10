import { NextApiRequest, NextApiResponse } from "next";
import { GraphQLService } from "services/graphql/graphql.service";

export default function handler(req: NextApiRequest, res: NextApiResponse) {

  const graphqlClient = GraphQLService.getInstance();

  return graphqlClient.getLatestPosts().then((posts) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json({ posts })
  }).catch((exp) => {
    console.log('Exception in api:', exp);
    
  });
  
}