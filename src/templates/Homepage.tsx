// import IndexNavbar from '@components/Navbars/IndexNavbar';
// import DescriptionSection from '@sections/DescriptionSection/DescriptionSection';
// import HeroSection from '@sections/HeroSection/HeroSection';
// import ServicesOverviewSection from '@sections/ServicesOverviewSection/ServicesOverviewSection';
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
        console.log('resp', resp);
        
        const data = await resp?.data;

        //todo: posts here, instead of data
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
  console.log('posts', posts);
  
  

  return (
    <>
      <Head>
        <title>{data.metaTitle}</title>
        <meta name="robots" content={`${data.seoFollow && 'follow'} ${data.seoIndex && 'index'}`} />
      </Head>
      { !!isLoading && <div>Loading...</div>}
      { !!serverError && <div>{serverError.message}</div>}
      { !isLoading && !serverError && (
        <div className='w-full justify-center'>
          <ul className='list-none w-36'>
            {posts.map((post: any) => (
              <li key={post.id}>
                <a href={`/posts/${post.title}`}>{post.title}</a>
              </li>
            ))}
          </ul>
        </div>

      )}
    </>
  );
}