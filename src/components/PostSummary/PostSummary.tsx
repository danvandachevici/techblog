import RichText from '@components/RichText/RichText';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS, MARKS } from '@contentful/rich-text-types';
import { PropTypes } from '@material-ui/core';
import { PropsWithChildren, ReactNode } from 'react';
import { DateFormatter } from 'utils/DateFormatter';

export interface PostSummaryProps {
  children?: ReactNode | undefined;
  post: any;
}
export default function PostSummary({
  post,
  children,
}: PostSummaryProps): React.ReactElement {
  if (
    !post ||
    !post.linkedFrom ||
    !post.linkedFrom.pageCollection ||
    !post.linkedFrom.pageCollection.items.length
  ) {
    return <div>This post is not ready yet. Stay tuned!</div>;
  }

  return (
    <div>
      <a
        href={post.linkedFrom.pageCollection.items[0].url}
        className='w-full flex flex-wrap justify-left py-2 cursor-pointer'
      >
        <h2 className='w-full text-3xl'>{post.title}</h2>
      </a>
      <div className='w-full'>
        <span>
          {post.authorsCollection.items.length > 1 ? 'Authors ' : 'Author '}
        </span>
        {post.authorsCollection.items.map((author: any, index: number) => (
          <a
            key={author.name.toLowerCase()}
            href={`/about-${author.name.toLowerCase()}`}
            className='text-lg w-full'
          >
            {author.name}
            {index < post.authorsCollection.items.length - 1 && ', '}
          </a>
        ))}
        <span>
          {' '}
          @ {DateFormatter.formatDate(new Date(post.sys.publishedAt))}
        </span>
      </div>
      {!!children && children}
    </div>
  );
}
