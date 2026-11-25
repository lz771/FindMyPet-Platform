import FilterForm from "@/components/web/FilterForm";
import PostCard from "@/components/web/PostCard";
import { heapSort } from "@/lib/heapSort";
import { getMatchingPosts } from "../actions/post.action";

export default async function LostPetGalleryPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const searchAndFilterValues = await searchParams;
  const sortByValue = searchAndFilterValues.sortBy;
  const statusValue = searchAndFilterValues.status as string;

  // Get posts that match the search and filter conditions
  const result = await getMatchingPosts(searchAndFilterValues);

  // Sort posts
  if (sortByValue === "Most recently updated")
    heapSort(result.posts, "lastModifiedAt");
  else
    heapSort(result.posts, "createdAt");

  // Dynamically render the status in search results message: lost or reunited
  const status = statusValue ? statusValue.toLowerCase() : "lost";

  return (
    <div className="flex flex-col space-y-6">
      <FilterForm />

      <h1 className="text-center">
        {result.posts.length != 0 ? `There are ${result.posts.length} ${status} pets matching in your search` : `No ${status} pets match in your search`}
      </h1>

      <div className="grid grid-cols-1 2xl:grid-cols-2 2xl:px-70 gap-3">
        {result.posts.map((post) => (
          <div key={post.id} className="my-1">
            {<PostCard
              id={post.id}
              createdAt={post.createdAt}
              lastModifiedAt={post.lastModifiedAt}
              pet={post.pet} />}
          </div>
        ))}
      </div>
    </div>
  );
}