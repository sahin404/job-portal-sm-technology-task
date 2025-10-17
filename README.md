## 0. Note

- This project is deployed on **Render**.  
- The server may take some time to start on the first request, so please be patient when making the first API call. 

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
