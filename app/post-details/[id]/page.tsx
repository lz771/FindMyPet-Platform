import PostDetailsCard from "@/components/web/PostDetailsCard";
import { prisma } from "@/lib/prisma";

interface PostDetailsPageProps {
  params: Promise<{ id: string }>
}

// Post Details Page: Read post id from url, and display post details based on the post id
export default async function PostDetailsPage({ params }: PostDetailsPageProps) {
  const { id } = await params;

  const post = await prisma.post.findFirst({
    where: { id: Number(id) },
    select: {
      contactEmail: true,

      pet: {
        select: {
          id: true,
          name: true,
          species: true,
          sex: true,
          description: true,
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
            },
          },
        },
      },
    },
  });

  return (
    <div className="flex flex-col items-center space-y-2 my-10 w-full max-w-6xl mx-auto px-5">
      <h1 className="font-bold text-2xl sm:text-5xl text-gray-800 text-nowrap tracking-wider">{post?.pet?.status} {post?.pet?.species} in {post?.pet?.location.city}, {post?.pet?.location.state} {post?.pet?.location.zipcode}</h1>
      {post?.pet ? <PostDetailsCard pet={post.pet} contactEmail={post.contactEmail} /> : `Can not find the post details of post ${id}`}
    </div>
  );
}

