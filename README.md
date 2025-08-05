## Disaster Management System

Disaster Management System is a full-stack MERN application designed to coordinate emergency aid, broadcast alerts, and manage volunteers efficiently. With distinct modules for Citizens, Volunteers, and Admins, the system ensures fast, organized responses during disasters through role-based features and real-time coordination.

### Key Features

 Aid Request Management
- Citizens can request help via an aid request form (accessible after login)
- Users can track their request status in My Requests
- Admins manage all aid requests centrally

Secure Authentication
- Sign Up / Sign In with email validation
- Email link-based forgot/reset password
- JWT-based session handling for secure access

Role-Based Dashboards
- Dynamic views for Citizen, Volunteer, and Admin
- Dashboard includes Home, About Us, Alerts, Services, Contact, and FAQs

Disaster Alerts System
- View real-time alerts from anywhere
- Admins can send and manage broadcast alerts

Volunteer Management
- Citizens can apply to become volunteers via form
- Admins can review applications and assign tasks
- Volunteers can view assigned works in their dashboard

### Modules

User Management & Authentication
- Common login/signup flow for all users
- Email-based password recovery
- JWT session control and protected routes

Aid Request Flow
- Submit aid request forms after login
- Real-time status updates in My Requests
- Admin dashboard to review and take action

Alerts Module
- Alert dashboard for all users
- Admin interface for creating and managing alerts

Volunteer Management
- Registration form for volunteer onboarding
- Admin tools to approve and assign disaster response tasks
- Volunteer dashboard to view current assignments

## Getting Started

### Prerequisites

- Node.js (v18+)
- MongoDB (local or cloud – MongoDB Atlas)

###Installation Steps

```bash
# Clone the repository
git clone https://github.com/yourusername/disaster-management-system.git
cd disaster-management-system

# Setup Frontend
cd frontend
npm install
npm start

# Setup Backend (in a new terminal)
cd ../backend
npm install
npm run dev
