## 0. Note

- This project is deployed on **Render**.  
- In Render, the server may take some time to start on the first request, so please be patient when making the first API call. 

## 1. Brief Description

This project has been implemented following the given requirements. Not all features could be fully completed, but the implemented functionalities are described below:

- **User Registration:** Users can sign up with email, providing proper validation for credentials.

- **Authentication:** Secure login system using JWT-based authentication.

- **Profile Customization:** Users can select their profile type (Employee or Employer) to customize their experience.

- **Job Search:** Employees can search for jobs using filters such as **title** and **job type**.

- **Job Posting:** Employers can post up to **3 jobs for free**. If they try to post more than 3 jobs, the system **currently only displays a message** saying they cannot post more for free and **each additional job requires $2**. The **actual payment functionality has not been implemented**, so users will just see the message.

- **Job Application:** Employees can apply for jobs through the platform.

- **Create Organization:** Employers can create organizations and manage them.

- **Admin Control:** Admin has full control over all users, jobs, applications, and organizations, including read and delete permissions.

- **Error Handling:** Proper error handling with relevant status codes and messages is implemented for every API endpoint.


## 2. Technology Stack

- **Language:** TypeScript  
- **Framework:** Express.js  
- **Database:** PostgreSQL (Neon)  
- **ORM:** Prisma  
- **Authentication:** JWT  
- **Password Hashing:** Bcrypt  
- **Deployment:** Render  


## 3. Relational Diagram (Backend)

The relational diagram of the backend shows how tables are connected in the Job Portal database.  

![Relational Diagram](https://github.com/sahin404/job-portal-sm-technology-task/blob/main/assests/readme/db-relation.png)

## 4. Database Schema

This project uses **PostgreSQL** as the database and **Prisma** as the ORM. The database consists of the following models:

**A. User**  
Represents all users of the platform including Admin, Employer, and Employee.  
- **id**: Primary key, auto-incremented.  
- **name**: User's full name.  
- **email**: Unique email for login.  
- **password**: Hashed password.  
- **role**: User role (`ADMIN`, `EMPLOYER`, `EMPLOYEE`).  
- **createdAt**: Timestamp of account creation.  

**Relationships:**  
- One-to-one with **Profile**  
- One-to-many with **Organization** (as owner)  
- Many-to-many with **Organization** (as member)  
- One-to-many with **Job** (posted jobs)  
- One-to-many with **Application** (applied jobs)  

**B. Profile**  
Stores additional user information.  
- **id**: Primary key.  
- **userId**: Foreign key referencing `User.id` (unique).  
- **resume**: Optional resume link or file path.  

**Relationship:**  
- Belongs to one **User**  


**C. Organization**  
Represents companies or organizations.  
- **id**: Primary key.  
- **name**: Organization name.  
- **ownerId**: Foreign key referencing `User.id` (employer owner).  

**Relationships:**  
- Owned by a **User**  
- Can have multiple **User** members  


**D. Job**  
Represents a job posting.  
- **id**: Primary key.  
- **title**: Job title.  
- **location**: `ONSITE` or `REMOTE`.  
- **description**: Job description.  
- **employerId**: Foreign key referencing `User.id`.  
- **createdAt**: Timestamp of posting.  

**Relationship:**  
- Posted by a **User** (employer)  
- Can have multiple **Application** entries  


**E. Application**  
Represents a job application submitted by an employee.  
- **id**: Primary key.  
- **jobId**: Foreign key referencing `Job.id`.  
- **applicantId**: Foreign key referencing `User.id` (employee).  
- **appliedAt**: Timestamp of application submission.  

**Relationship:**  
- Belongs to one **Job**  
- Submitted by one **User** (applicant)  


**F. Enum: JobLocation**  
Defines possible job locations:  
- `ONSITE`  
- `REMOTE`


## 5. API Routes & Access Control
There are three types of users: Admin, Employer, and Employee. Each has access to specific routes after login with JWT.

### Admin Routes (Admin can manages)

To access these routes, login using the following credentials:  

- **Email:** `sahinraj20@gmail.com`  
- **Password:** `12345678`  

After login, you will receive a **JWT token**. Use this token with  `Bearer token` in the header Authorization to access all routes.  

Alternatively, For testing, use the token 
`Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJzYWhpbnJhajIwQGdtYWlsLmNvbSIsInJvbGUiOiJBRE1JTiIsImlhdCI6MTc2MDcwMTcyMiwiZXhwIjoxNzYxMzA2NTIyfQ.ouR0lQrr5uHU6D1wmpFUqBceaqJLnKv9-APDs70OutA` to access all routes. This token will expire 24 Oct, 2025.

**User Management**

- `GET /api/user/` → Get all users  
- `PUT /api/user/:id` → Update user (Admin or user itself)  
- `DELETE /api/user/:id` → Delete user  

**Organization Management**

- `GET /api/organization/` → Get all organizations  
- `POST /api/organization/` → Create organization  
- `PUT /api/organization/:id` → Update organization  
- `DELETE /api/organization/:id` → Delete organization  

**Job Management**

- `GET /api/job/` → Get all jobs  
- `GET /api/job/search` → Filter/search jobs  
- `POST /api/job/` → Create job  
- `PUT /api/job/:id` → Update job  
- `DELETE /api/job/:id` → Delete job  

**Application Management**

- `POST /api/application/` → Create application  
- `GET /api/application/` → Get all applications  
- `DELETE /api/application/:id` → Delete application  

**Authentication**

- `POST /api/auth/login` → Login  
- `POST /api/auth/signup` → Signup  

---
### Employer Routes (Employer can manage)

To access these routes, login using the following credentials:  

- **Email:** `mrdragon1920@gmail.com`  
- **Password:** `12345678`  

After login, you will receive a **JWT token**. Use this token with `Bearer token` in the `Authorization` header to access all routes.  

Alternatively, for testing, you can use the token:  
`Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJtcmRyYWdvbjE5MjBAZ21haWwuY29tIiwicm9sZSI6IkVNUExPWUVSIiwiaWF0IjoxNzYwNzAyMTg5LCJleHAiOjE3NjEzMDY5ODl9.rWkWKuHb4l6rgrZWmdsYveKnsmgmhNOZy2y8XxVLzhM`

**Job Management (Employer)**

- `GET /api/job/` → Get all jobs  
- `GET /api/job/search` → Filter/search jobs  
- `POST /api/job/` → Create job  
- `PUT /api/job/:id` → Update job  
- `DELETE /api/job/:id` → Delete job  

**Application Management (Employer)**

- `POST /api/application/` → Create application  
- `GET /api/application/` → Get all applications  
- `DELETE /api/application/:id` → Delete application  

**Authentication**

- `POST /api/auth/login` → Login  
- `POST /api/auth/signup` → Signup  

---
### Employee Routes (Employee can manages)

Employee users can access the following routes after logging in and obtaining a valid JWT token. Use the token with `Bearer token` in the `Authorization` header.

**Job Management (Employee)**

- `GET /api/job/` → Get all jobs  
- `GET /api/job/search` → Filter/search jobs  

**Application Management (Employee)**

- `POST /api/application/` → Create application  
- `GET /api/application/` → Get all applications  

**Authentication**

- `POST /api/auth/login` → Login  
- `POST /api/auth/signup` → Signup  


## 5. Instructions to Run Locally
1. Clone the repository
  ```
    git clone https://github.com/sahin404/job-portal-sm-technology-task
    cd job-portal-sm-technologies-task
  ```
2. Install dependencies
  ```
    npm install
  ```
3. Create a .env file
Add your own credentials or use the following example:
  ```
    DATABASE_URL=postgresql://neondb_owner:npg_NL9HpPfKUVs5@ep-icy-term-adgwd71f-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require
    PORT=3000
    EMAIL_USER=mdsahin6240@gmail.com
    EMAIL_PASS=tlmj flmq mylu ried
    JWT_SECRET=samplesecretkey1234
  ```
4. Run the server in development mode
  ```
    npm run dev
  ```
5. After this, your server should be running locally at `http://localhost:3000`.

---
## 6. Live Hosting Link
You can access the live project at: https://job-portal-sm-technology-task-4-q2hz.onrender.com/
