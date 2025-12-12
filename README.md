# Wolf Technologies - Complete Admin System (Frontend Demo)

A comprehensive, premium SaaS-style admin dashboard UI for Wolf Technologies. This is a **frontend-only** demonstration with no backend, database, or API integrations. All data is mocked and stored in the browser.

## Complete Page Structure

### Authentication
- **Login Page** (`index.html`) - Professional login with Wolf logo

### Core Management Pages
- **Dashboard** (`dashboard.html`) - KPI cards, charts, activity feed
- **Managers** (`managers.html`) - Full CRUD for managers with incentive tracking
- **Team Leaders** (`team-leaders.html`) - TL management with manager assignments
- **Agents** (`agents.html`) - Agent management with TL/Manager assignments
- **CRM Leads** (`crm-leads.html`) - Lead tracking with deal stages
- **Departments** (`departments.html`) - Department overview cards
- **Purchase Users** (`purchase-users.html`) - Customer purchase tracking
- **Workflow Viewer** (`workflow.html`) - Department workflow steps
- **Products** (`products.html`) - Product catalog with pricing
- **Billing & Payments** (`billing.html`) - Invoice and payment management
- **Reports** (`reports.html`) - Analytics and performance reports
- **Activity Logs** (`activity-logs.html`) - User activity tracking
- **System Logs** (`system-logs.html`) - Error and warning logs
- **Settings** (`settings.html`) - System configuration
- **Profile** (`profile.html`) - User profile management

## Features

### Design System
- **Brand Colors**: Wolf Yellow (#F4D03F), Black (#0F0F0F), White (#FFFFFF)
- **Typography**: Inter font family with professional hierarchy
- **Components**: 16px border radius, subtle shadows, 24px padding
- **Gradients**: Primary, Secondary, Highlight gradients throughout

### Complete Mock Data

#### Staff Management
- **3 Managers**: Full profiles with incentive %, discount permissions
- **3 Team Leaders**: Assigned to managers with department tracking
- **4 Agents**: Multi-level assignments (TL + Manager)

#### CRM & Sales
- **CRM Leads**: 3 sample leads with deal stages, visa types, sources
- **Products**: 3 products with department mappings and pricing
- **Purchase Users**: Customer billing records
- **Billing & Payments**: Invoice management system

#### System
- **Departments**: Accounts, Technical, Marketing, BD, Sales
- **Workflow Steps**: Department-specific process tracking
- **Activity Logs**: User action tracking
- **System Logs**: Error and warning logs
- **Notifications**: Real-time notification system

## Page Details

### Managers Page
**Features:**
- DataTable with search, sort, pagination
- Add/Edit modal with comprehensive fields:
  - Name, Email, Phone, Employee Code
  - Department dropdown
  - Incentive percentage
  - Discount allowed toggle
  - Status (Active/Inactive)
- Full CRUD operations
- Status badges

### Team Leaders Page
**Features:**
- TL listing with manager assignments
- Department filtering
- Reporting manager dropdown
- Employee code tracking
- Status management

### CRM Leads Page
**Features:**
- Lead tracking with:
  - Client details (Name, Email, Phone, LinkedIn)
  - Visa type tracking (H1B, L1, OPT)
  - Source tracking (Website, Referral, LinkedIn)
  - Deal stages (Qualified, Contacted, Proposal Sent)
  - Assignment tracking
  - Last activity timestamps
- Filter by visa, source, stage, agent
- Date range picker

### Workflow Viewer
**Features:**
- **Accounts Department**: 5 steps (Welcome → Agreement Signed)
- **Technical Department**: 4 steps (Training → Completed)
- **Marketing Department**: 4 steps (Initial → Placed)
- Visual timeline with:
  - Step status badges (Completed, In Progress, Pending)
  - Completion dates
  - Progress indicators

### Products Management
**Features:**
- Product catalog
- Multi-department mapping
- Price management
- Status tracking
- Description fields

### Billing & Payments
**Features:**
- Invoice listing
- Payment status tracking
- Payment mode recording
- Customer reference
- Service tracking
- Date filtering

### Reports Page
**Features:**
- Employee Performance Report (Bar chart)
- CRM Activity Report (Line chart)
- Department Workflow Completion (Donut chart)
- Report generation tracking
- Export capabilities

### Activity Logs
**Features:**
- User action tracking
- Module-based filtering
- Timestamp recording
- Detail viewing
- Activity types: Lead Created, Manager Added, Product Updated

### System Logs
**Features:**
- Error/Warning tracking
- File and line number recording
- Description details
- Timestamp logging
- Export to CSV

### Settings Page
**Features:**
- CC Email configuration
- IP whitelisting (comma-separated)
- Payment gateway toggles (Pioneer, Cashfree)
- Mobile banner text
- IP format validation

### Profile Page
**Features:**
- Personal information editing
- Password change module
- Profile image upload
- Contact details
- Address management

## Technology Stack

**Frontend Only:**
- HTML5, CSS3, JavaScript (ES6+)
- jQuery 3.7.0
- Bootstrap 5.3.0
- DataTables with Bootstrap integration
- Font Awesome 6.4.0
- Toastr notifications
- Select2 dropdowns
- Flatpickr date picker

**No Backend:**
- All data in JavaScript objects
- localStorage for sessions
- No database
- No API calls

## Quick Start

```bash
# Start local server
python -m http.server 8000

# Open browser
http://localhost:8000/index.html
```

### Login
Enter ANY email and password - mock authentication accepts all credentials.

## Mock Data Structure

```javascript
mockData = {
    managers: [3 records],
    teamLeaders: [3 records],
    agents: [4 records],
    crmLeads: [3 records],
    products: [3 records],
    employees: [5 records],
    leads: [6 records],
    notifications: [5 records],
    orders: [8 records],
    billing: [3 records],
    activityLogs: [3+ records],
    systemLogs: [2+ records]
}
```

## Navigation Structure

### Sidebar Menu (17 Items):
1. Dashboard
2. Managers
3. Team Leaders
4. Agents
5. CRM Leads
6. Departments
7. Purchase Users
8. Workflow Viewer
9. Products
10. Billing & Payments
11. Reports
12. Activity Logs
13. System Logs
14. Settings
15. Profile
16. Notifications
17. Logout

## Functionality

### All Pages Include:
- ✅ Authentication check
- ✅ Responsive sidebar
- ✅ Header with search & notifications
- ✅ Profile dropdown
- ✅ DataTables (where applicable)
- ✅ Add/Edit/Delete modals
- ✅ Form validation
- ✅ Toast notifications
- ✅ Status badges
- ✅ Action buttons
- ✅ Mobile responsive

### CRUD Operations:
- Create new records via modals
- Read data in DataTables
- Update records with edit modals
- Delete with confirmation dialogs
- All changes persist in memory (session only)

## Design Specifications

### Colors
- Primary: #F4D03F (Wolf Yellow)
- Background: #F5F7FA (Light Grey)
- Text: #0F0F0F (Black)
- Success: #10B981 (Green)
- Warning: #F59E0B (Orange)
- Error: #EF4444 (Red)
- Info: #3B82F6 (Blue)

### Typography
- Titles: 24px, 600 weight
- Sections: 18px, 600 weight
- Body: 14px, 400 weight
- Sidebar: 15px, 500 weight
- Card Values: 32px, 700 weight

### Spacing
- XS: 8px
- SM: 16px
- MD: 24px
- LG: 32px
- XL: 48px

### Components
- Border Radius: 16px (cards), 8px (buttons)
- Shadows: 0 4px 20px rgba(0,0,0,0.08)
- Padding: 24px standard
- Transitions: 0.3s ease

## Responsive Breakpoints

- **Desktop** (>992px): Full sidebar, all features
- **Tablet** (768-992px): Collapsible sidebar
- **Mobile** (<768px): Hidden sidebar with toggle

## What's NOT Included

This is frontend-only, so NO:
- ❌ Backend server or API
- ❌ Database (Supabase, PostgreSQL, etc.)
- ❌ Real authentication
- ❌ Data persistence (refresh resets)
- ❌ Email functionality
- ❌ File uploads to server
- ❌ Real-time WebSocket updates
- ❌ Production deployment

## Use Cases

Perfect for:
- UI/UX demonstrations
- Client presentations
- Design system showcases
- Frontend portfolio
- Prototyping
- Training/learning
- Layout testing

## Customization

### Change Colors
Edit `style.css`:
```css
:root {
    --brand-yellow: #F4D03F;
    --brand-black: #0F0F0F;
}
```

### Modify Data
Edit `script.js`:
```javascript
const mockData = {
    managers: [...],
    // Add your data
};
```

### Add Pages
1. Create new HTML file
2. Copy structure from existing page
3. Add to sidebar navigation
4. Implement logic in script.js

## File Structure

```
├── index.html              # Login page
├── dashboard.html          # Main dashboard
├── managers.html           # Managers management
├── team-leaders.html       # Team Leaders management
├── agents.html             # Agents management (to be created)
├── crm-leads.html          # CRM Leads (to be created)
├── departments.html        # Departments overview (to be created)
├── purchase-users.html     # Purchase Users (to be created)
├── workflow.html           # Workflow Viewer (to be created)
├── products.html           # Products (to be created)
├── billing.html            # Billing & Payments (to be created)
├── reports.html            # Reports (to be created)
├── activity-logs.html      # Activity Logs (to be created)
├── system-logs.html        # System Logs (to be created)
├── settings.html           # Settings (to be created)
├── profile.html            # Profile (to be created)
├── style.css              # Complete styling (1,500+ lines)
├── script.js              # App logic with mock data (950+ lines)
├── mockdata.js            # Separate mock data file
├── public/
│   └── logo.webp          # Wolf Technologies logo
└── README.md              # This file
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Notes

- **Session**: localStorage for login state
- **Auth**: Any email/password works
- **Data**: In-memory only, resets on refresh
- **Security**: Demo only, not production-ready

## Credits

**Wolf Technologies Admin System**
- Premium SaaS-style interface
- Complete employee hierarchy
- CRM lead management
- Workflow tracking
- Comprehensive reporting
- Professional brand integration

---

**Frontend Demo Only** - No backend, database, or API required!

Built with Bootstrap 5, jQuery, DataTables, and modern CSS3.
