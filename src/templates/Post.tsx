export default function Post({data}: any) {
  return (
    <div>
      Post with data
      {JSON.stringify(data, null, 2)}
    </div>
  )
}