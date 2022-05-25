import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS, MARKS } from "@contentful/rich-text-types";

export default function RichText({json, links}: any) {
  const richTextFormattingOptions: any = {
    renderMark: {
      [MARKS.BOLD]: (text: string) => <span className='font-bold'>{text}</span>,
    },
    renderNode: {
      [BLOCKS.PARAGRAPH]: (node: any, children: any) => <div>{children}</div>,
    },
    renderText: (text: string) => text.replace('!', '?'),
  };
  return (
    <>
      {documentToReactComponents(json, richTextFormattingOptions)}
    </>
  );
}