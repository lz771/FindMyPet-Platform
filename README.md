# FindMyPet Platform Description & Goal
  - A pet owner may share list-pet information across different social media platforms or community groups. Community people may find it difficult to find and keep track of these lost-pet posts in their local area because people share many different types of content on these platforms.
  - My project is a web application that provides a platform for people to report, search, and manage lost-pet cases. In the website, pet owners may share information for their lost pet by completing a lost-pet report form on the Report Pet page. The submitted reports will be displayed on the Lost-Pet Gallery page, allowing other users to view and search lost-pet cases in their local area. 
  - The website may introduce new features in the future based on user feedback.

# Core Features
  - Create lost-pet post by completing a report pet form.
  - View all lost-pet reports in the Lost Pet Gallery. 
  - Search and filter all lost-pet reports using a filter form.
  - Users can view all of their active posts on the dashboard.
  - Users can manage(update/delete) their active posts.
  - Require authentication before accessing features, such as post creation and active posts management.

# Technical Stacks
  - Next.js: The main framework of my project. It makes the configuration between front-end and back-end simplier.
  - Neon PostgreSQL database: Stores post, location, and lost-pet data submitted by users, as well as user data. 
  - Cloudinary: Stores media data(pet photos).
  - Prisma: Used it to define database schema and perform database operations(create/retrieve/update/delete post and user data). It makes database operations easier than writing raw sql queries.
  - Clerk: Used for authentication.
  - Tailwind CSS: Page styling.
  - Shadcn/ui: Provides built-in UI components(button, input field, card), which I can use them to makes the website looks better.

# Tools & Resources I Have Used So Far
  - Visual Studio Code: A code editor that allwos me to write codes there and build my project.
  - Git & Github: Version controls and source code backup.
  - Node Package Manager(npm): Install and manage project dependencies and packages.
  - ngrok: Used it for Clerk webhook testing.
  - "Lost animals" open dataset: Used as sample data for lost-pet posts.
  - Zod: A Typescript-first library used to validate form inputs by defining validation schema. I used it to validated form data on the server side, and show error messages to the form ui when validation fails.
  - ChatGPT: Used to help understand and troubleshoot error messages I got during development.

# Dataset and Attribution
  - This project uses the "Lost animals" dataset as sample data for the FindMyPet project
  - Dataset: https://data.kingcounty.gov/Pets/Lost-animals/4f2m-6nv7/about_data
  - Source Link: 	http://www.kingcounty.gov/pets  
  - License: Public Domain
