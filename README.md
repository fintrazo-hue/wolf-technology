# Wolf Technologies - Super Admin Dashboard

A premium, professional SaaS-style admin dashboard system for Wolf Technologies, featuring comprehensive employee management, lead tracking, and real-time notifications.

## Features

### Authentication System
- Secure login with Supabase authentication
- Email/password authentication
- Session management with automatic redirection
- Password visibility toggle
- Remember me functionality

### Super Admin Dashboard
- **KPI Cards**: Real-time statistics for Users, Purchases, Failed Orders, and Employees
- **Employee Management**: Complete CRUD operations with DataTables
- **Lead Tracking**: Comprehensive lead management with assignment capabilities
- **Notification System**: Real-time notification drawer with unread indicators
- **Profile Management**: User profile viewing and settings
- **Responsive Design**: Mobile-first approach with collapsible sidebar

### Design System
- **Brand Colors**: Yellow (#F4D03F), Black (#0F0F0F), White (#FFFFFF)
- **Typography**: Inter font family with specific sizing hierarchy
- **Components**: Consistent 16px border radius, subtle shadows, 24px padding
- **Responsive Breakpoints**: Mobile, tablet, and desktop optimized

## Technology Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+), jQuery
- **UI Framework**: Bootstrap 5.3.0
- **Data Tables**: DataTables with Bootstrap integration
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Icons**: Font Awesome 6.4.0
- **Notifications**: Toastr
- **Form Controls**: Select2, Flatpickr

## Project Structure

```
├── index.html              # Login page
├── dashboard.html          # Main dashboard
├── style.css              # Complete design system and styles
├── script.js              # Application logic and interactions
├── .env                   # Environment variables (Supabase config)
└── README.md             # This file
```

## Database Schema

### Tables
- **users**: User profiles and roles
- **departments**: Organization departments
- **employees**: Employee records with department links
- **leads**: Customer leads with assignment tracking
- **notifications**: User notification system
- **activity_logs**: Activity tracking
- **orders**: Order records for KPI tracking

### Security
- Row Level Security (RLS) enabled on all tables
- Super admin role with full access
- Regular users with restricted access based on ownership
- Secure authentication policies

## Getting Started

### Prerequisites
- Modern web browser
- Supabase account and project

### Setup

1. **Environment Configuration**
   The `.env` file is already configured with Supabase credentials

2. **Start Development Server**
   ```bash
   python -m http.server 8000
   ```
   Or use any static file server

3. **Access the Application**
   - Login Page: http://localhost:8000/index.html
   - Dashboard: http://localhost:8000/dashboard.html (requires authentication)

### First Time Setup

1. **Create Admin User**
   - Go to your Supabase Dashboard
   - Navigate to Authentication > Users
   - Create a new user with email and password
   - Note the user ID

2. **Add User to Database**
   Run this SQL in Supabase SQL Editor:
   ```sql
   INSERT INTO users (id, email, full_name, role, status)
   VALUES (
     'your-user-id-from-auth',
     'admin@wolftech.com',
     'Admin User',
     'super_admin',
     'active'
   );
   ```

3. **Login**
   - Navigate to the login page
   - Use the credentials you created
   - You'll be redirected to the dashboard

## Features Documentation

### Login System
- **Location**: `index.html`
- **Features**:
  - Centered card layout (380px width)
  - Email and password fields with validation
  - Password visibility toggle
  - Remember me checkbox
  - Loading states with AJAX submission
  - Error handling with Toastr notifications

### Dashboard Navigation
- **Fixed Sidebar**: 260px width with navigation menu
- **Sticky Header**: Dashboard title, search, notifications, profile
- **Navigation Items**:
  - Dashboard (active)
  - Employees
  - Leads
  - Orders
  - Departments
  - Reports
  - Settings

### KPI Cards
Four cards displaying:
1. Total Users (with 12% growth indicator)
2. New Purchases (with 8% growth indicator)
3. Failed Orders (with 3% reduction indicator)
4. Total Employees (no change indicator)

### Employee Management
- **List View**: DataTables with sorting, searching, pagination
- **Columns**: Employee Code, Name, Email, Department, Designation, Joining Date, Status
- **Actions**: View, Edit, Delete
- **Add/Edit Modal**: Comprehensive form with all employee fields
- **Status Badges**: Active (green), Inactive (grey), On Leave (yellow)

### Lead Management
- **List View**: DataTables with sorting, searching, pagination
- **Columns**: Customer Name, Email, Phone, Company, Product, Status, Priority, Assigned To
- **Actions**: View, Edit, Delete
- **Add/Edit Modal**: Complete form with lead assignment
- **Status Badges**: New (blue), Contacted (yellow), Qualified (orange), Converted (green), Lost (red)
- **Priority Badges**: Low (blue), Medium (yellow), High (red)

### Notification System
- **Drawer Interface**: Slides in from right (400px width)
- **Tabs**: All notifications, Unread only
- **Badge**: Shows unread count on bell icon
- **Features**:
  - Real-time notification loading
  - Mark as read on click
  - Time ago formatting
  - Visual distinction for unread items

### Profile & Settings
- **Profile Dropdown**: User info with avatar
- **Menu Items**:
  - My Profile
  - Settings
  - Activity Log
  - Logout
- **Settings Modal**: Theme selection, notification preferences

## Design Guidelines

### Colors
- **Primary**: Brand Yellow (#F4D03F)
- **Background**: Light Grey (#F5F7FA)
- **Text**: Brand Black (#0F0F0F)
- **Success**: Green (#10B981)
- **Warning**: Yellow (#F59E0B)
- **Error**: Red (#EF4444)
- **Info**: Blue (#3B82F6)

### Typography
- **Titles**: 24px, bold
- **Sections**: 18px, bold
- **Body**: 14px, regular
- **Sidebar**: 15px, medium
- **Card Values**: 32px, extra bold

### Spacing System
- XS: 8px
- SM: 16px
- MD: 24px
- LG: 32px
- XL: 48px

### Component Patterns
- **Border Radius**: 16px (cards), 8px (buttons, inputs)
- **Shadows**: Subtle elevation with hover effects
- **Transitions**: 0.3s ease for all interactive elements
- **Hover States**: Transform and color changes

## Responsive Behavior

### Desktop (>992px)
- Full sidebar visible (260px)
- All header elements shown
- Multi-column KPI cards

### Tablet (768px - 992px)
- Collapsible sidebar
- Hidden search bar
- Adjusted spacing

### Mobile (<768px)
- Hidden sidebar (toggle button)
- Single column layout
- Simplified header
- Full-width notification drawer

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Security Features

- Secure authentication with Supabase
- Row Level Security on all tables
- Role-based access control
- Protected routes with automatic redirection
- SQL injection prevention
- XSS protection

## Performance Optimizations

- Lazy loading of data
- Efficient DataTables rendering
- Optimized CSS with variables
- Minimal JavaScript bundle
- CDN-hosted libraries

## Customization

### Brand Colors
Edit the CSS variables in `style.css`:
```css
:root {
    --brand-yellow: #F4D03F;
    --brand-black: #0F0F0F;
    /* ... other variables */
}
```

### Adding New Pages
1. Create new HTML file
2. Include same CSS and JS files
3. Add navigation link in sidebar
4. Implement page-specific logic in script.js

## Troubleshooting

### Login Issues
- Verify Supabase credentials in `.env`
- Check user exists in both auth.users and public.users tables
- Clear browser cache and cookies

### Data Not Loading
- Open browser console for errors
- Verify Supabase RLS policies
- Check network tab for failed requests

### Style Issues
- Clear browser cache
- Check CSS file is loading correctly
- Verify Inter font is loading from Google Fonts

## Development Notes

- All AJAX calls use async/await for better error handling
- DataTables initialized globally for easy access
- Toastr configured for consistent notifications
- Modal forms use validation before submission
- RLS policies ensure data security at database level

## Future Enhancements

- Real-time data synchronization with Supabase Realtime
- Advanced reporting and analytics
- Export functionality (PDF, Excel)
- Email notifications
- Two-factor authentication
- Advanced search and filtering
- Bulk operations
- Dashboard customization
- Mobile app integration

## Support

For issues or questions, contact the development team.

## License

Proprietary - Wolf Technologies © 2024

---

**Built with professional standards for Wolf Technologies**
