import PostSummary, { PostSummaryWithStandfirst } from '@components/PostSummary/PostSummary';
import Tags from '@components/Tags/Tags';
import axios from 'axios';
import Head from 'next/head';
import { useEffect, useState } from 'react';

const usePagedPosts = (page: number) => {
  const [isLoading, setIsLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [serverError, setServerError] = useState<any>(null);
  const postsServiceUrl = `/api/postsService?page=${page}`;

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const resp = await axios.get(postsServiceUrl);
        const data = await resp?.data;

        console.log('data:posts', data.posts);

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
  const tagsServiceUrl = `/api/tagsService`;

  useEffect(() => {
    setTagsLoading(true);
    const fetchData = async () => {
      try {
        const resp = await axios.get(tagsServiceUrl);
        const data = await resp?.data;

        console.log('data:tags', data.posts);

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

function HomeTitle() {
  return (
    <div className='w-1/2 flex flex-wrap justify-center'>
      <h1 className='w-full text-4xl'>A tech blog</h1>
      <span className='w-full text-lg'>Welcome to the TechBlog! We hope you'll
        like the topics that you read here. We also highly encourage you
        to interact and give feedback on the contents!</span>
    </div>
  )
}

export default function Homepage({ data }: any) {

  const [pageNumber, setPageNumber] = useState(1);
  const { isLoading, posts, serverError } = usePagedPosts(pageNumber);
  const { tagsLoading, tags, tagsServerError } = useTags();

  return (
    <>
      <Head>
        <title>{data.metaTitle}</title>
        <meta
          name="robots"
          content={`${data.seoIndex ? 'index' : 'noindex'}, ${data.seoFollow ? 'follow' : 'nofollow'}`}
        />
      </Head>
      <div className='w-full flex bg-slate-100 text-slate-800'>
        <div className='w-full sm:w-3/4 flex flex-wrap justify-center'>
          <HomeTitle />

          { !!isLoading && <div>Loading...</div> }
          { !!serverError && <div>{serverError.message}</div> }
          { !isLoading && !serverError && (
            <div className="w-full flex justify-center">
              <div className='sm:w-1/2'>
                <ul className='flex flex-wrap'>
                  {posts.map((post: any) => (
                    <li key={post.sys.id} className='mt-12 bg-slate-200 hover:bg-slate-300 rounded-xl p-4 w-full'>
                      <PostSummaryWithStandfirst post={post} />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>

        <div className='hidden sm:flex sm:w-1/4'>
          { !!tagsLoading && <div>Loading...</div> }
          { !!tagsServerError && <div>{tagsServerError.message}</div> }
          { !tagsLoading && !tagsServerError && <Tags tags={tags} /> }
        </div>
      </div>
    </>
  );
}