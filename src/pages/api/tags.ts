import { NextApiRequest, NextApiResponse } from "next";
import { GraphQLService } from "services/graphql/graphql.service";

export default function handler(req: NextApiRequest, res: NextApiResponse) {

  const graphqlClient = GraphQLService.getInstance();

  return graphqlClient.getTags(100).then((tags) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json({ tags })
  }).catch((exp: any) => {
    console.error('Exception in api:', exp);
  });
}