# FindMyPet Platform Project Goal
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

# Optional Features / Enhancement:
  - Email Notification: Users will be informed by email when a lost-pet post with location last seen nearby their city.
  - Account Settings: Users are able to manage their account settings on the dashboard, including updating their username and city, and delete accounts.
  - Map: Have a map on the Post Details Page, showing the last seen location on the map.
  - Bookmark: When logged-in users view the post details on the Post Details page, they can bookmark the post and save it to their dashboard for future review. On the Dashboard page, logged in users are able to view or remove bookmarked posts in their dashboard.
  - Sorting Posts: Implements a “Sort By” feature in the Lost-Pet Gallery that allows users to sort posts by most recently posted.

# Technical Stacks
  - Next.js: A full-stack framework that used to build both the user interface and back-end of my application.
  - Neon PostgreSQL database: Stores post, location, and lost-pet data submitted by users, as well as user data. 
  - Cloudinary: Stores media data(pet photos).
  - Prisma: Used to define database schema and perform database operations(create/retrieve/update/delete post and user data). It makes writing database operations easier than writing raw SQL queries.
  - Clerk: Provides built-in UI components and authentication features, so I don't need to implement the authentication logic myself. 
  - Tailwind CSS: Page styling.
  - Shadcn/ui: Provides built-in UI components(button, input field, card), which I can use to make the UI of my website components look better.

# Tools & Resources I Have Used So Far
  - Visual Studio Code: A code editor. Allows me to write code and build my project.
  - Git & Github: Version controls and source code backup.
  - Node Package Manager(npm): Install and manage project dependencies and packages.
  - ngrok: Used for Clerk webhook testing.
  - "Lost animals" open dataset: Used as sample data for lost-pet posts.
  - Zod: A Typescript-first library used to validate form inputs by defining validation schema. I used it to validated form data on the server side, and show error messages to the form ui when validation fails.

# AI Usage During Development
  - ChatGPT: Used to help me understand error messages I got during development, and concepts of new technologies/tools(Next.js, Prisma, Tailwind css).

# Dataset and Attribution
  - This project uses the "Lost animals" dataset as sample data for the FindMyPet platform project
  - Dataset: https://data.kingcounty.gov/Pets/Lost-animals/4f2m-6nv7/about_data
  - Source Link: 	http://www.kingcounty.gov/pets  
  - License: Public Domain

# Use cases:
1. Sharing Lost Pet Information:
  - Logged in users may share information for their lost pet on the website by completing a report pet form on Report Pet Page.
  - Users have to fill out required fields before submit, such as location last seen, date last seen, pet’s species, etc.
  - The lost pet report will then display on the Lost-Pet gallery after the form is submitted.
2. Browse Lost Pet Posts:
  - All users are able to access the Lost-Pet Gallery, and browse all the lost-pet posts the website has collected so far. By using a filter form on the gallery, users are able to search and filter all lost-pet posts.
  - The filter form accepts search terms(pet name, id, city, zip code) and filter terms(valid status, sex, state, species).
  - No posts are displayed if the user enters an invalid search/filter term. A message is displayed on the page to notify the user that no matching posts were found.
3. Manage Lost-Pet Posts:
  - If a logged-in user wants to update a post they created on the website, they can go to the Edit Post page. The user can update information such as location, date last seen, description, pet name, species, sex, status, and photo through the “Edit Post” form.
  - After the form is submitted and form data is validated, the updated information synchronized with the PostgreSQL database. Besides that, a user can delete the post by clicking the “Delete” button on the Edit Post page.

# Constraints:
  - The dataset I found contains data fields I don’t need for my project, which means that I need to clean the data before importing it to my PostgreSQL database.
  - Limited to the United States and is not available globally.
  - Only supports reporting lost pets, it does not include the feature to report found pets.
