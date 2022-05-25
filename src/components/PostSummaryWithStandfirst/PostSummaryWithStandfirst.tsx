import PostSummary from "@components/PostSummary/PostSummary";
import RichText from "@components/RichText/RichText";

export default function PostSummaryWithStandfirst({post}: any): React.ReactElement {
  const standfirst = RichText(post.standfirst);
  return (
    <PostSummary post={post}>
      <p>{standfirst}</p>
    </PostSummary>
  )
}