import FilterForm from "@/components/web/FilterForm";
import PostCard from "@/components/web/PostCard";
import { Sex, Species, Status } from "@/generated/prisma/enums";
import { heapSort } from "@/lib/heapSort";
import { prisma } from "@/lib/prisma";

export default async function LostPetGalleryPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  // Read submitted filter form data from url
  const filterValues = await searchParams;
  const speciesValue = filterValues.species === "All" ? undefined : filterValues.species as Species;
  const statusValue = filterValues.status as Status || undefined;
  const sexValue = filterValues.sex === "All" ? undefined : filterValues.sex as Sex;
  const stateValue = filterValues.state === "All" ? undefined : filterValues.state as string;
  const cityValue = filterValues.city as string || undefined;
  const zipcodeValue = filterValues.zipcode as string || undefined;
  const petNameValue = filterValues.petName as string || undefined;
  const petIDValue = Number(filterValues.petID) || undefined;
  const sortByValue = filterValues.sortBy as string;

  // Fetch post data
  const posts = await prisma.post.findMany({
    // Filter posts based on submitted filter form data
    where: {
      pet: {
        AND: [
          { species: speciesValue },
          { status: statusValue },
          { sex: sexValue },
          { name: petNameValue },
          { id: petIDValue },
        ],

        location: {
          AND: [
            { state: stateValue },
            { city: cityValue },
            { zipcode: zipcodeValue },
          ],
        },
      },
    },

    select: {
      id: true,
      createdAt: true,
      lastModifiedAt: true,

      pet: {
        select: {
          id: true,
          name: true,
          sex: true,
          species: true,
          dateLastSeen: true,
          status: true,

          location: {
            select: {
              city: true,
              state: true,
              zipcode: true,
            },
          },

          image: {
            select: {
              imgUrl: true,
              imgAltText: true,
            }
          },
        },
      },
    },
  });

  // Sort posts
  if (sortByValue === "Most recently updated")
    heapSort(posts, "lastModifiedAt");
  else
    heapSort(posts, "createdAt"); 
    
  const status = statusValue ? statusValue.toLowerCase() : "lost"; // Conditionally rendering the status: lost or reunited

  return (
    <div className="flex flex-col space-y-6">
      <FilterForm />

      <h1 className="text-center">
        {posts.length != 0 ? `There are ${posts.length} ${status} pets are reported on FindMyPet Platform` : `No ${status} pets found`}
      </h1>

      <div className="grid grid-cols-1 2xl:grid-cols-2 2xl:px-70 gap-3">
        {posts.map((post) => (
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