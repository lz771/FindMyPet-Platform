interface PetDetailsPageProps {
  params: Promise<{ id: string }>
}

// Dynamic route for Pet Details Page
export default async function PetDetailsPage({ params }: PetDetailsPageProps) {
  const { id } = await params;
  return (
    
    <div>
      <h1>This is the Pet Details Page: {id}</h1>
    </div>
  );
}

