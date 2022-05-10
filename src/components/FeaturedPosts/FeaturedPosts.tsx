import PostSummary from "@components/PostSummary/PostSummary";

export default function FeaturedPosts({posts}: any) {
  return (
    <div>
      <h1>Featured posts</h1>
      <ul>
        {posts.map((post: any) => (
          <li key={post.sys.id}>
            <div><PostSummary post={post} /></div>
          </li>
        ))}
      </ul>
    </div>
  )
}