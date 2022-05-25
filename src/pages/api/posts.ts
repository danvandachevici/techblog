import { NextApiRequest, NextApiResponse } from "next";
import { fetchLatestPosts } from "services/api/api.service";

export default function handler(req: NextApiRequest, res: NextApiResponse) {

  const pageNumber: number = parseInt(req.query.page as string || "0", 10);
  return fetchLatestPosts(pageNumber).then((posts) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json({ posts });
  });
}