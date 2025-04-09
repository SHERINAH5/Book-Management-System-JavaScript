WITU Cohort 4 JavaScript Semester Project (To be done in groups of 2)
Submission Date: Before Wednesday April 10th, 2025
Presentation Date: April 11th, 2025
📄Book Management System - Requirements Document
Project Overview
The Book Management System is a simple CRUD (Create, Read, Update, Delete)
application that allows users to manage a collection of books. The system will provide
features to add, edit, delete, and search books, along with additional functionalities like
organizing books using tabs and allowing image uploads for each book.
Features & Functionalities
Core Features (CRUD Operations)
Add a Book: Users can enter book details and upload an image. The form will open in a
modal.
Edit a Book: Clicking "Edit" will open a modal with the book's details pre-filled.
Delete a Book: Books can be removed from the list.
View Books: Books are displayed in a tabbed layout (e.g., "All Books", "Favorites",
"Unread", "Read").

Additional Functionalities
Search as You Type: Books will be filtered in real-time as users enter search keywords.
Tabs for Organizing Books:
• All Books (default)
• Favorites (books marked as favorite)
• Unread (books marked as unread)

• Read (books that have been read)
Book Cover Image Upload: Users must upload a book cover image when adding a book.
Data Structure & Storage
Book Object Structure (Stored in Local Storage)
Each book will be stored as an object in an array inside localStorage.
{
id: "1a2b3c", // Unique ID for each book
title: "JavaScript Essentials",
author: "John Doe",
genre: "Programming",
status: "Unread", // Options: "Read", "Unread"
favorite: false, // Boolean value
image: "image-url" // Local base64 or file path
}
Data Storage Method
• Use localStorage to persist book data across page reloads.
• Store books as an array of objects in localStorage.

User Interface (UI) Design
HTML Structure
• Header: Includes search input for filtering books.
• Tabs: "All Books", "Favorites", "Unread", "Read".
• Book List: Display books inside a responsive grid layout.
• Modals:
o Add Book Modal (Form for adding a book).
o Edit Book Modal (Form pre-filled with book details).

Bootstrap UI Components
• Tabs for book categories.

• Modal Windows for adding/editing books.
• Grid System for displaying books.
Functional Breakdown
Adding a Book
1. User clicks "Add Book" → Modal opens.
2. Form fields: title, author, genre, status, image upload.
3. On form submit:
a. Validate inputs (all fields are required).
b. Convert image to Base64 (for display/storage).
c. Save book object in localStorage.
d. Refresh the book list.

Editing a Book
1. Click "Edit" on a book card → Modal opens with book details.
2. User updates fields and submits form.
3. Update book details in localStorage and refresh list.

Deleting a Book
1. Click "Delete" → Confirm dialog appears.
2. Remove book from localStorage and refresh the list.

Searching Books
1. User types in search input (live filtering).
2. Books are filtered by title or author in real-time.
Marking a Book as Favorite
1. Click the icon to toggle "Favorite" status.
2. The book moves to the "Favorites" tab.

Technologies Used
Frontend
HTML - Structure
CSS & Bootstrap - Styling & Layout
JavaScript (Vanilla JS) - CRUD Operations, Filtering, Local Storage
Storage
LocalStorage - Stores books persistently