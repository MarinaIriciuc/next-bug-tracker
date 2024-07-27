import Post from "@/components/Post";

const sleepNow = (delay: number) => new Promise((resolve) => setTimeout(resolve, delay))


export default async function Posts() {
  


  await sleepNow(2000)
  const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
    cache: "no-store"
  })
  const posts = await response.json();



  return (
    <div>
      {posts.map((post: any) => (
        <Post post={post} />
      ))}
    </div>
  )
}
