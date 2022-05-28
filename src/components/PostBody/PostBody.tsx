import RichText from '@components/RichText/RichText';

export default function PostBody({ content }: any) {
  return (
    <div>
      <RichText json={content.json} links={content.links} />
    </div>
  );
}
