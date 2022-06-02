import CodeEditor from '@components/CodeEditor/CodeEditor';
import RichText from '@components/RichText/RichText';

export default function PostBody({ content }: any) {
  return (
    <div className='w-full flex flex-wrap'>
      <div className='w-1/2 pr-10'>
        <RichText json={content.json} links={content.links} />
      </div>
      <div className='w-1/2 pl-10'>
        <CodeEditor />
      </div>
    </div>
  );
}
