# Wolf Technologies - Admin Dashboard (Frontend Demo)

A premium, professional SaaS-style admin dashboard UI for Wolf Technologies. This is a **frontend-only** demonstration with no backend, database, or API integrations. All data is mocked and stored in the browser.

## Features

### Design System
- **Brand Identity**: Wolf Technologies logo with Yellow (#F4D03F) and Black (#0F0F0F) theme
- **Typography**: Inter font family with professional sizing hierarchy
- **Components**: Consistent 16px border radius, subtle shadows, clean spacing
- **Responsive**: Mobile-first design with collapsible sidebar

### Pages & Features

#### Login Page (`index.html`)
- Professional centered card layout (380px width)
- Email and password fields
- Password visibility toggle
- Remember me checkbox
- Loading states with animations
- Mock authentication (any email/password works)

#### Dashboard (`dashboard.html`)
- **Fixed Sidebar**: Navigation menu with Wolf logo
- **Sticky Header**: Search, notifications, profile dropdown
- **KPI Cards**: 4 statistics cards with trend indicators
  - Total Users: 3
  - New Purchases: 5
  - Failed Orders: 2
  - Total Employees: 4

- **Employee Management**:
  - DataTables with sorting, searching, pagination
  - Add/Edit/Delete functionality
  - Status badges (Active, Inactive, On Leave)
  - 5 sample employees

- **Lead Management**:
  - DataTables with full CRUD operations
  - Status tracking (New, Contacted, Qualified, Converted, Lost)
  - Priority levels (Low, Medium, High)
  - Assignment to agents
  - 6 sample leads

- **Notification System**:
  - Sliding drawer interface
  - Unread counter badge
  - Filter by All/Unread
  - Mark as read functionality
  - 5 sample notifications

- **Profile & Settings**:
  - Profile dropdown menu
  - Settings modal
  - Logout functionality

## Technology Stack

**Frontend Only:**
- HTML5, CSS3, JavaScript (ES6+)
- jQuery 3.7.0
- Bootstrap 5.3.0
- DataTables
- Font Awesome 6.4.0
- Toastr notifications
- Select2 dropdowns
- Flatpickr date picker

**No Backend Required:**
- All data stored in JavaScript objects
- Session managed via localStorage
- No database connection
- No API calls

## Quick Start

### 1. Start a Local Server

```bash
# Using Python 3
python -m http.server 8000

# Or using Python 2
python -m SimpleHTTPServer 8000

# Or using Node.js
npx serve

# Or using PHP
php -S localhost:8000
```

### 2. Open in Browser

- **Login**: http://localhost:8000/index.html
- **Dashboard**: http://localhost:8000/dashboard.html

### 3. Login

Enter any email and password - the mock authentication accepts all credentials.

Example:
- Email: `admin@wolftech.com`
- Password: `password`

## Project Structure

```
├── index.html          # Login page
├── dashboard.html      # Main dashboard
├── style.css          # Complete styling (1,500+ lines)
├── script.js          # Frontend logic with mock data
├── public/
│   └── logo.webp      # Wolf Technologies logo
└── README.md          # This file
```

## Mock Data

All data is hardcoded in `script.js` for demonstration:

- **3 Users**: John Smith, Sarah Johnson, Mike Williams
- **3 Departments**: Accounts, Technical, Marketing
- **5 Employees**: Full profiles with designation, department, status
- **6 Leads**: With contact info, status, priority, assignments
- **5 Notifications**: Sample system notifications
- **8 Orders**: For KPI calculations

## Features Demonstration

### Fully Functional UI
- Login/Logout flow with localStorage session
- Responsive sidebar navigation
- Interactive data tables with search/sort/pagination
- Add/Edit/Delete operations (updates mock data in memory)
- Notification drawer with read/unread states
- Modal forms with validation
- Dropdown menus and date pickers
- Loading states and animations
- Toast notifications for user feedback

### No Database Required
- All changes persist only during the browser session
- Refresh the page to reset to original mock data
- No data is saved to server or database

## Design Highlights

### Brand Colors
- Primary: Wolf Yellow (#F4D03F)
- Background: Light Grey (#F5F7FA)
- Text: Black (#0F0F0F)
- Success: Green (#10B981)
- Warning: Orange (#F59E0B)
- Error: Red (#EF4444)
- Info: Blue (#3B82F6)

### Typography Scale
- Titles: 24px, bold
- Sections: 18px, bold
- Body: 14px, regular
- Sidebar: 15px, medium
- Card Values: 32px, extra bold

### Spacing System
- XS: 8px
- SM: 16px
- MD: 24px
- LG: 32px
- XL: 48px

## Responsive Breakpoints

- **Desktop** (>992px): Full sidebar, all features visible
- **Tablet** (768px - 992px): Collapsible sidebar, adjusted layout
- **Mobile** (<768px): Hidden sidebar with toggle, single column, simplified UI

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Customization

### Change Brand Colors

Edit CSS variables in `style.css`:

```css
:root {
    --brand-yellow: #F4D03F;
    --brand-black: #0F0F0F;
    /* ... other variables */
}
```

### Modify Mock Data

Edit the `mockData` object in `script.js`:

```javascript
const mockData = {
    users: [...],
    employees: [...],
    leads: [...],
    // Add your custom data here
};
```

### Add More Features

1. Add HTML structure to `dashboard.html`
2. Style with CSS in `style.css`
3. Implement logic in `script.js`

## What's NOT Included

This is a **frontend-only demo**, so it does NOT include:

- Backend server or API
- Database (Supabase, PostgreSQL, MySQL, etc.)
- Authentication system (no real user accounts)
- Data persistence (refreshing resets all data)
- Email functionality
- File uploads
- Real-time updates
- Production deployment setup

## Use Cases

Perfect for:
- UI/UX demonstrations
- Client presentations
- Design system showcases
- Frontend portfolio projects
- Prototyping and wireframing
- Teaching/learning frontend development
- Testing responsive layouts

## Notes

- **Session Management**: Uses localStorage for simple login state
- **Mock Authentication**: Any email/password combination works
- **Data Persistence**: All changes are temporary (in-memory only)
- **Reset Data**: Refresh the page to restore original mock data
- **No Security**: This is a demo - not production-ready

## Credits

**Built for Wolf Technologies**

- Clean, professional SaaS-style interface
- Premium design with attention to detail
- Responsive and mobile-friendly
- Complete CRUD operations
- Interactive components
- Professional brand integration

---

**Frontend Demo Only** - No backend, database, or API required!
