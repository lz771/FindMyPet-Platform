# Testing Instruction
The application currently primarily uses manual black-box testing to test the core features of the project, including creating posts, searching and filtering posts, deleting posts, and updating posts. Testers are required to interact with the website's UI to perform these tests.

## Create Post Testing 
| Test Case | Test Case Description | Expected Result |
|---|---|---|
| #1 | Create post with validated form data | Post succesffully created and stored in the database | 
| #2 | Create post with invalidated form data  | Validation fails, and display validation errors on the form alongs with values the user entered in the input fields |
| #3 | Create post with missing required input field data | Same result as in test case #2 |
| #4 | Create post, but unauthenticated (The user is not signed in or they are signed in but have no record in the database/system) | Post creation fails, and an error message is displayed on the screen |

## Search & Filter Posts Testing 
| Test Case | Test Case Description | Expected Result |
|---|---|---|
| #1 | Search keywords or filter criteria are validated | Display posts matching the search keywords and filter criteria |
| #2 | Enter search keywords or filter criteria that return no results | Display "no results" message |
| #3 | Inputs with leading or trailing whitespace | Ignore leading and trailing whitespace and display the same expected results as in test case #1 |
| #4 | Inputs with uppercase letters | Display the same expected results as in test case #1 regardless of letter casing |

## Delete Post Testing 
| Test Case | Test Case Description | Expected Result |
|---|---|---|
| #1 | Delete post by post id | The post record is deleted from the database, and the corresponding pet photo stored in Cloudinary is deleted as well |
| #2 | Delete post by post id, but the post not belong to the user | Post deletion fails, and an error message is displayed on the screen |
| #3 | Delete post by post id, but unauthenticated | Same result as in test case #2 |

## Update Post Testing  
| Test Case | Test Case Description | Expected Result |
|---|---|---|
| #1 | Update post with validated form data | Post is successfully updated |
| #2 | Update post with invalidated form data | Validation fails, and display validation errors on the form alongs with values the user entered in the input fields |
| #3 | Update post, but not the post owner | Post update fails, and an error message is displayed on the form |
| #4 | Update post, but unauthenticated | Same result as in test case #3 |