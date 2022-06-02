import PostBody from '@components/PostBody/PostBody';
import PageTitle from '@components/Title/Title';

export default function Post({ post }: any) {
  return (
    <div>
      <PageTitle
        title={post.content.title}
        standfirst={post.content.standfirst}
      />
      <div className='mt-12'>
        <PostBody content={post.content.content} />
      </div>
    </div>
  );
}
