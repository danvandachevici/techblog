import RichText from "@components/RichText/RichText";

export default function PageTitle({title, standfirst}: {title: string, standfirst: any}) {
  console.log('title params:', title, standfirst);
  return (
    <div>
      <h1 className='text-4xl px-8 py-12'>{title}</h1>

      <p className='text-md'><RichText json={standfirst.json} links={standfirst.links}/></p>
    </div>
  )
}
