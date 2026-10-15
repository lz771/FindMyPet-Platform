import FilterForm from "@/components/web/FilterForm";
import PostCard from "@/components/web/PostCard";
import { prisma } from "@/lib/prisma";

export default async function LostPetGalleryPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {

  const { species = '', status = '', sex = '', state = '', city = '', zipcode = '', petName = '', petID = '' } = await searchParams;

  const posts = await prisma.post.findMany({
    select: {
      id: true,
      createdAt: true,

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

    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="flex flex-col space-y-6">
      <FilterForm />

      <h1 className="text-center">
        {posts.length != 0 ? `There are ${posts.length} lost pets are reported on FindMyPet Platform` : "No lost pets found"}
      </h1>

      <div className="grid grid-cols-1 2xl:grid-cols-2 2xl:px-70 gap-3">
        {posts.map((post) => (
          <div key={post.id} className="my-1">
            {<PostCard post={post} />}
          </div>
        ))}
      </div>
    </div>
  );
}