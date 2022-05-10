// import IndexNavbar from '@components/Navbars/IndexNavbar';
// import DescriptionSection from '@sections/DescriptionSection/DescriptionSection';
// import HeroSection from '@sections/HeroSection/HeroSection';
// import ServicesOverviewSection from '@sections/ServicesOverviewSection/ServicesOverviewSection';
import FeaturedPosts from '@components/FeaturedPosts/FeaturedPosts';
import PostSummary, { PostSummaryWithStandfirst } from '@components/PostSummary/PostSummary';
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

export default function Homepage({data}: any) {

  const [pageNumber, setPageNumber] = useState(1);
  const {isLoading, posts, serverError} = usePagedPosts(pageNumber);
  
  return (
    <>
      <Head>
        <title>{data.metaTitle}</title>
        <meta
          name="robots"
          content={`${data.seoIndex ? 'index' : 'noindex'}, ${data.seoFollow ? 'follow' : 'nofollow'}`}
        />
      </Head>
      <div className='w-full flex'>
        <div className='w-full sm:w-3/4 flex justify-center'>
          { !!isLoading && <div>Loading...</div>}
          { !!serverError && <div>{serverError.message}</div>}
          { !isLoading && !serverError && (
            <div className='sm:w-1/2'>
              <ul>
                {posts.map((post: any) => (
                  <li key={post.sys.id}>
                    <PostSummaryWithStandfirst post={post} />
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className='hidden sm:flex sm:w-1/4'>
          <FeaturedPosts posts={data.content.featuredPostsCollection.items} />
        </div>
      </div>
    </>
  );
}