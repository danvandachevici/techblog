import RichText from "@components/RichText/RichText";
import PageTitle from "@components/Title/Title";

export default function Post({post}: any) {
  console.log('post here:', post);

  return (
    <div>
      <PageTitle title={post.content.title} standfirst={post.content.standfirst} />
    </div>
  )
}