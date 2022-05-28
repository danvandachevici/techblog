import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS, MARKS } from '@contentful/rich-text-types';

export default function RichText({ json, links }: any) {
  const richTextFormattingOptions: any = {
    renderMark: {
      [MARKS.BOLD]: (text: string) => <span className='font-bold'>{text}</span>,
    },
    renderNode: {
      [BLOCKS.PARAGRAPH]: (node: any, children: any) => <div>{children}</div>,
      [BLOCKS.EMBEDDED_ENTRY]: (node: any, children: any) => {
        const {
          data: {
            target: {
              sys: { id, type, linkType },
            },
          },
        } = node;
        const linkedItem = links.entries.block.find(
          (link: any) => link.sys.id === id
        );

        // const { title, file, description } = fields;
        // const { url } = file;
        return (
          <div>
            <img src={linkedItem.image.url} alt={linkedItem.alternativeText} />
          </div>
        );
      },
    },
    // renderText: (text: string) => text.replace('!', '?'),
  };
  return <>{documentToReactComponents(json, richTextFormattingOptions)}</>;
}
