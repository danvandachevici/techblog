import { fetchLatestPosts } from 'services/api/api.service';
import { GraphQLService } from '../services/graphql/graphql.service';

const formatPaths = (pages: any[]): any[] => {
  return pages.map((page: any) => {
    if (page.url === '/') {
      return {
        params: {
          url: [],
          id: page.sys.id
        }
      }
    }
    
    return {
      params: {
        url: page.url.split('/'),
        id: page.sys.id
      }
    }
  });
}

const contentMapping: any = {
  HomeContent: (data: any) => {
    const Homepage = require('../templates/Homepage').default;
    return <Homepage data={data} />;
  },
  PostContent: (data: any) => {
    const Post = require('../templates/Post').default;
    return <Post post={data} />;
  }
}

export default function PageComponent(data: any) {
  
  if (
    !!data &&
    !!data.content &&
    !!data.content.__typename && 
    !!contentMapping[data.content.__typename]
  ) {
    return (
      <div className='w-full h-screen flex justify-center bg-slate-800 text-slate-200 pt-10 overflow-scroll'>
        <div className='w-full sm:w-3/4'>
          {contentMapping[data.content.__typename](data)}
        </div>
      </div>
    )
  }

  const Custom404 = require('../templates/404').default;
  return <Custom404 />;
}

export function getStaticProps(context:any) {
  const graphqlService = GraphQLService.getInstance();

  let url = '/';
  if (context.params?.url) {
    url = `/${context.params.url.join('/')}`;
  }
  
  return graphqlService.getPageByUrl(url).then((data) => {
    
    if (data.content.__typename === 'HomeContent') {
      return fetchLatestPosts(1).then((latestPosts) => {
        data.content.latestPosts = latestPosts;
        return {
          props: {
            ...data
          },
        };
      });
    }
    return {
      props: {
        ...data
      },
    };
  }).catch((exp) => {
    console.error('exception fetching data', exp);
    return {
      props: {
        content: {
          __typename: '404'
        },
        url: context.params.url,
        id: null,
        publishedAt: null
      }
    }    
  });
}
export function getStaticPaths() {
  const graphqlService = GraphQLService.getInstance();
  return graphqlService.getAllRoutes().then((pages) => {  
    
    const paths = formatPaths(pages);
    return {
      paths: paths,
      fallback: true,
    }
  });
}