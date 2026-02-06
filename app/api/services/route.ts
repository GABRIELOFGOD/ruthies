export async function GET() {
  const services = [
    {
      id: 1,
      name: "Personal Shopping",
      description: "Transform your wardrobe with curated picks.",
      price: 250,
      tag: "Starting at",
      features: [
        "Curated wardrobe updates",
        "Seasonal trend analysis",
        "Sourcing rare & unique pieces",
      ],
      cta: "Book a Consultation",
      variant: "primary",
    },
    {
      id: 2,
      name: "Closet Audit",
      description: "Streamline and reimagine what you own.",
      price: 400,
      tag: "Starting at",
      features: [
        "Outfit reimagination & lookbook",
        "Strategic decluttering session",
      ],
      cta: "Learn More",
      variant: "secondary",
    },
    {
      id: 3,
      name: "Virtual Styling",
      description: "Global style consulting on the go.",
      price: 150,
      tag: "Session",
      features: [],
      cta: "Book Digital Session",
      variant: "secondary",
    },
  ];

  return Response.json(services);
}
