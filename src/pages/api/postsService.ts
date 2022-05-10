import { NextApiRequest, NextApiResponse } from "next";
import { GraphQLService } from "services/graphql/graphql.service";

export default function handler(req: NextApiRequest, res: NextApiResponse) {

  const graphqlClient = GraphQLService.getInstance();

  const pageNumber: number = parseInt(req.query.page as string || "0", 10);

  return graphqlClient.getLatestPosts(pageNumber, 10).then((posts) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json({ posts })
  }).catch((exp) => {
    console.error('Exception in api:', exp);
  });
}