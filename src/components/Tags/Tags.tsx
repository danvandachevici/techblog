import Link from "next/link";

export default function Tags({tags}: any) {
  
  return (
    <div>
      <h1>Tags in this blog</h1>
      <ul>
        {tags.map((tag: any) => (
          <li key={tag.name}>
            <Link href={tag.linkedFrom.tagContentCollection.items[0].linkedFrom.pageCollection.items[0].url}>{tag.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}