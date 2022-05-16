import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS, MARKS } from "@contentful/rich-text-types";
import { DateFormatter } from "utils/DateFormatter";


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
      <span>{post.authorsCollection.items.length > 1 ? "Authors" : "Author"} &nbsp;</span>
      <div className="flex flex-wrap">
        {post.authorsCollection.items.map((author: any) => (
          <span className='text-lg w-full'>{author.name} @ {DateFormatter.formatDate(new Date(post.sys.publishedAt))}</span>
        ))}
      </div>
      {children}
    </a>
  );
}
export function PostSummaryWithStandfirst({post}: any): React.ReactElement {
  const postsElement = documentToReactComponents(post.standfirst.json, richTextFormattingOptions);
  return (
    
      <div>
        <a
          href={post.linkedFrom.pageCollection.items[0].url} 
          className='w-full flex justify-left py-4'
        >
          <h2 className='text-3xl'>{post.title}</h2>
        </a>
        <span>{post.authorsCollection.items.length > 1 ? "Authors" : "Author"} &nbsp;</span>
        <div className="flex flex-wrap">
        {post.authorsCollection.items.map((author: any) => (
          <span className='text-lg w-full'>{author.name} @ {DateFormatter.formatDate(new Date(post.sys.publishedAt))}</span>
        ))}
      </div>
        <p>{postsElement}</p>
      </div>
  )
}