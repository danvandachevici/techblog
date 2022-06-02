import PostEmbeddedImage from '@components/PostEmbeddedImage/PostEmbeddedImage';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS, INLINES, MARKS } from '@contentful/rich-text-types';

export default function RichText({ json, links }: any) {
  const blockEntriesHash: any = {};
  const inlineEntriesHash: any = {};

  // generate hash maps
  links?.entries?.block?.forEach((e: any) => {
    blockEntriesHash[e.sys.id] = e;
  });
  links?.entries?.inline?.forEach((e: any) => {
    inlineEntriesHash[e.sys.id] = e;
  });
  // end generate hash maps

  const richTextFormattingOptions: any = {
    renderMark: {
      [MARKS.BOLD]: (text: string) => <span className='font-bold'>{text}</span>,
      [MARKS.CODE]: (text: string) => (
        <div className='w-full flex justify-center'>
          <pre className='bg-gray-300 text-gray-700 w-3/4 p-4 my-8 rounded-lg'>
            {text}
          </pre>
        </div>
      ),
    },
    renderNode: {
      [INLINES.HYPERLINK]: (node: any) => {
        const {
          data: { uri },
          content,
        } = node;

        return (
          <a href={uri} className='text-blue-500 hover:underline'>
            {content[0].value}
          </a>
        );
      },
      [BLOCKS.PARAGRAPH]: (node: any, children: any) => <span>{children}</span>,
      [BLOCKS.EMBEDDED_ENTRY]: (node: any, children: any) => {
        const {
          data: {
            target: {
              sys: { id },
            },
          },
        } = node;
        const linkedItem = blockEntriesHash[id];
        switch (linkedItem.__typename) {
          case 'Image':
            return <PostEmbeddedImage data={linkedItem} />;
        }
      },
    },
    // renderText: (text: string) => text.replace('!', '?'),
  };
  return <>{documentToReactComponents(json, richTextFormattingOptions)}</>;
}
