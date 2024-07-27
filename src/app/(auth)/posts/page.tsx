import Posts from "@/components/Posts";
import {Suspense} from "react";
export const dynamic = 'force-dynamic'

export default async function PostsPage() {


  return <div>
    <Suspense fallback={<div>Loading...</div>}>
      <Posts />
    </Suspense>
  </div>
}
