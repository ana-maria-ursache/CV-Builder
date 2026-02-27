# Keystroke CV Builder
--> made by: Ursache Ana-Maria

## Details about the project:
Keystroke CV Builder is a high-performance web application designed for professional CV creation. Built with a distinctive "Neo-brutalist" aesthetic, it combines bold typography, high-contrast colors and rigid geometric structures to provide a modern editing experience.

The application allows users to build, edit and manage their professional profiles in real-time. It features dynamic form handling, cloud-based storage via Supabase, PDF generation and automated email delivery. 

### Most used colors: 
![#fffcfa](https://placehold.co/15x15/fffcfa/fffcfa.png) `#fffcfa` | 
![#121110](https://placehold.co/15x15/121110/121110.png) `#121110` | 
![#ff7513](https://placehold.co/15x15/ff7513/ff7513.png) `#ff7513` | 
![#ff820e](https://placehold.co/15x15/ff820e/ff820e.png) `#ff820e` |
![#e54409](https://placehold.co/15x15/e54409/e54409.png) `#e54409` 

---

### Technologies used to make this project: 
--> Core: React.js, Redux Toolkit (State Management).

--> Database and Auth: Supabase.

--> Styling: CSS3 (Ne0-brutalist Design System).

--> PDF Generation: @react-pdf/renderer for in-browser document generation.

--> Utilities: react-i18next (Internationalization), sonner (Toast notifications), emailjs/browser (Email service integration).

---

### Functionalities: 
--> Dynamic UI: Add/remove professional sections (Experience, Education, Projects) on the fly using custom dynamic list components.

--> Cloud Persistence: Secure authentication and cloud storage to save, load and manage multiple CV versions.

--> Export Suite: One-click PDF download, JSON backup and automated email delivery of CVs as PDF attachments.

--> Admin Portal: Secure dashboard for user management, role-based access control, where the admin can promote/demote a user's role.

--> Color Themes: light-theme and dark-theme, both keeping the "Neo-brutalism" style in place. For now, there are only 2 color-themes available, but in the future it will be straightforward to add more.

--> Feedback form: Easy way for the user to send feedback, make a suggestion or complaint.

--> Localization: Multi-language support (English/Romanian). For now, there are only 2 languages available, but in the future it will be straightforward to add more languages to enlarge the client palette.

---

### Main Pages: 
--> Landing Page: A simple design that users will first see at opening the app.

--> CV Builder Editor: The primary interface for data input, featuring nested dynamic sections for granular professional control.

--> PDF Preview Engine: An isolated rendering context that transforms application state into downloadable PDF documents.

--> CV Version History: A gallery view to browse, load, filter and delete previously saved CV states.

--> Admin Dashboard: A secured management layer for administrative oversight.

--> Contact form: Easy way for the admin to receive complaints, feedback or suggestions from the users.

---

### Commands for the setup:
--> cloning: git clone https://github.com/ana-maria-ursache/CV-Builder

--> installation: npm install

--> view: npm run dev (starts the development server via Vite)


## Images:
For better show all the functionalities, color-themes and languages available, the images bellow will be a mix of the this properties on both the browser and mobile view.

### Navbar on browser view
![alt text](/images-for-readme/image-12.png) 

### Navbar on mobile view
![alt text](/images-for-readme/image-13.png) 

### Landing Page
![alt text](/images-for-readme/image-1.png)

### CV Builder Page
![alt text](/images-for-readme/image-2.png)
![alt text](/images-for-readme/image-3.png)

#### Buttons for a unlogged user
![alt text](/images-for-readme/image-4.png)

#### Buttons for a logged user
![alt text](/images-for-readme/image-5.png)  
![alt text](/images-for-readme/email-share-cv.png) 


#### Buttons for user on mobile view
![alt text](/images-for-readme/image-10.png)

### My-CVs Page
![alt text](/images-for-readme/image-6.png) 

### Dashboard Page
![alt text](/images-for-readme/image-11.png)

### Contact Page
![alt text](/images-for-readme/image-9.png) 
![alt text](/images-for-readme/email-contact.png) 
