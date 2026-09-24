interface PostDetailsPageProps {
  params: Promise<{ id: string }>
}

// Dynamic route for Post Details Page
export default async function PostDetailsPage({ params }: PostDetailsPageProps) {
  const { id } = await params;
  return (
    
    <div>
      <h1>This is the Post Details Page: {id}</h1>
    </div>
  );
}

