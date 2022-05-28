import PostBody from '@components/PostBody/PostBody';
import RichText from '@components/RichText/RichText';
import PageTitle from '@components/Title/Title';

export default function Post({ post }: any) {
  // const body = RichText(post.content.content);

  return (
    <div>
      <PageTitle
        title={post.content.title}
        standfirst={post.content.standfirst}
      />
      <PostBody content={post.content.content} />
    </div>
  );
}
