export default function PostEmbeddedImage({ data }: any) {
  return (
    <div className='px-8 my-12'>
      <img src={data.image.url} alt={data.alternativeText} />
    </div>
  );
}
