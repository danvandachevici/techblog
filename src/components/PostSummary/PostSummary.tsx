import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS, MARKS } from "@contentful/rich-text-types";


const richTextFormattingOptions: any = {
  renderMark: {
    [MARKS.BOLD]: (text: string) => <span className='font-bold'>{text}</span>,
  },
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node: any, children: any) => <div>{children}</div>,
  },
  renderText: (text: string) => text.replace('!', '?'),
};


export default function PostSummary({post, children}: any): React.ReactElement {
  const postsElement = documentToReactComponents(post.standfirst.json, richTextFormattingOptions);
  return (
    <a
      href={post.linkedFrom.pageCollection.items[0].url} 
      className='w-full flex justify-left py-2 cursor-pointer'
    >
      <h2 className='text-3xl'>{post.title}</h2>
      <h3 className='text-lg'>by Dan @ {post.sys.publishedAt}</h3>
      {children}
    </a>
  );
}
export function PostSummaryWithStandfirst({post}: any): React.ReactElement {
  const postsElement = documentToReactComponents(post.standfirst.json, richTextFormattingOptions);
  return (
    <a
      href={post.linkedFrom.pageCollection.items[0].url} 
      className='w-full flex justify-left py-4'
    >
      <div>
        <h2 className='text-3xl'>{post.title}</h2>
        <h3 className='text-lg'>by Dan @ {post.sys.publishedAt}</h3>
        <p>{postsElement}</p>
      </div>
    </a>
  )
}