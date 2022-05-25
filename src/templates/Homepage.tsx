import PostSummaryWithStandfirst from '@components/PostSummaryWithStandfirst/PostSummaryWithStandfirst';
import RichText from '@components/RichText/RichText';
import Tags from '@components/Tags/Tags';
import PageTitle from '@components/Title/Title';
import axios from 'axios';
import Head from 'next/head';
import { useEffect, useState } from 'react';

const usePagedPosts = (page: number, initialPosts: any) => {
  const [isLoading, setIsLoading] = useState(false);
  const [posts, setPosts] = useState(initialPosts);
  const [serverError, setServerError] = useState<any>(null);
  const postsServiceUrl = `/api/posts?page=${page}`;
  
  useEffect(() => {
    if (page === 1) {
      return;
    }
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const resp = await axios.get(postsServiceUrl);
        const data = await resp?.data;

        setPosts(data.posts);
        setIsLoading(false);
      } catch (error) {
        setServerError(error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [page]);

  return { isLoading, posts, serverError };
}
const useTags = () => {
  const [tagsLoading, setTagsLoading] = useState(false);
  const [tags, setTags] = useState([]);
  const [tagsServerError, setTagsServerError] = useState<any>(null);
  const tagsServiceUrl = `/api/tags`;

  useEffect(() => {
    setTagsLoading(true);
    const fetchData = async () => {
      try {
        const resp = await axios.get(tagsServiceUrl);
        const data = await resp?.data;

        setTags(data.tags);
        setTagsLoading(false);
      } catch (error) {
        setTagsServerError(error);
        setTagsLoading(false);
      }
    };

    fetchData();
  }, []);

  return { tagsLoading, tags, tagsServerError };
}

export default function Homepage({ data }: any) {

  const [pageNumber, setPageNumber] = useState(1);
  const { isLoading, posts, serverError } = usePagedPosts(pageNumber, data.content.latestPosts);
  const { tagsLoading, tags, tagsServerError } = useTags();

  if (!posts.length) {
    return (
      <>
        <Head>
          <title>{data.metaTitle || data.content.title}</title>
          <meta
            name="robots"
            content={`${data.seoIndex ? 'index' : 'noindex'}, ${data.seoFollow ? 'follow' : 'nofollow'}`}
          />
        </Head>
        <div className='w-full flex justify-center'>
          <div className='w-3/4'>
            <PageTitle title={data.content.title} standfirst={data.content.description} />
          </div>
        </div>
        <div>There are no posts yet. Stay tuned!</div>
      </>
    )
  }

  return (
    <>
      <Head>
        <title>{data.metaTitle || data.content.title}</title>
        <meta
          name="robots"
          content={`${data.seoIndex ? 'index' : 'noindex'}, ${data.seoFollow ? 'follow' : 'nofollow'}`}
        />
      </Head>
      <div className='w-full flex'>
        <PageTitle title={data.content.title} standfirst={data.content.description} />
      </div>
      <div className='w-full flex'>
        { !!isLoading && <div>Loading...</div> }
        { !!serverError && <div>{serverError.message}</div> }
        { !isLoading && !serverError && (
          <div className="w-full flex justify-center">
            <div className='w-full'>
              <ul className='flex flex-wrap'>
                {posts.map((post: any) => (
                  <li key={post.sys.id} className='mt-12 bg-slate-600 hover:bg-slate-700 rounded-xl p-4 w-full border-lime-200 hover:border-lime-400 border-2'>
                    <PostSummaryWithStandfirst post={post} />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </>
  );
}