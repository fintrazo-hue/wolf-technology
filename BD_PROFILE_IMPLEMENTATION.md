# BD Profile Pages Implementation Guide

## Overview

This document describes the Business Development (BD) profile pages enhancement for the Wolf Technologies Admin Dashboard. All three role-specific profile pages (Agent, Team Leader, Manager) now display comprehensive metrics, lead tracking, inactivity detection, and performance analytics using mock CRM data.

## Architecture

### Client-Side Only (No Backend Required)

- All data loads from `assets/js/mockdata.js` or mock JSON files
- Metrics computed dynamically in browser
- State persisted to localStorage with `wt_bd_` prefix
- No server calls required

### Key Files Modified/Created

1. **assets/js/profiles-bd.js** - Main BD profile module (880+ lines)
   - Data loading and metrics computation
   - UI rendering functions for all components
   - Modal and interaction handling
   - localStorage persistence for notes and targets

2. **assets/css/profiles.css** - Scoped BD styles
   - `.bd-*` namespaced classes only
   - No global theme modifications
   - Responsive design with breakpoints
   - Modal, table, and card styling

3. **pages/profiles/profile-bd-agent.html** - Agent profile page
4. **pages/profiles/profile-bd-teamleader.html** - Team Leader profile page
5. **pages/profiles/profile-bd-manager.html** - Manager profile page
6. **assets/js/mockdata.js** - Mock data (BD users and leads included)

## Features by Role

### BD Agent Profile (`profile-bd-agent.html?userId=E025`)

**Key Metrics:**
- Assigned Leads count
- Closed/Converted deals count
- Open Follow-ups
- Inactivity count (>48 hours)
- Average Response Time
- Activity Score (0-100 visual progress ring)

**Sections:**
- Profile header with contact info & status badge
- Performance metrics cards (6 cards)
- Pipeline by stage (bar chart)
- Monthly target tracker with edit capability
- Inactivity alerts (top 5 critical leads)
- Assigned leads table (sortable, searchable, filterable by inactivity)
- Recent activity timeline
- Quick actions: Message, Export CSV

**Interactions:**
- Click lead row → opens lead modal with:
  - Lead details grid
  - Activity log
  - Add note textarea (persists to localStorage)
- Search input → filters table in real-time
- "Show Inactive" filter button → toggles visibility
- Export CSV → downloads filtered leads as CSV

### BD Team Leader Profile (`profile-bd-teamleader.html?userId=E023`)

**Additional Feature: Team Performance Table**
- Lists all agents under this TL
- Shows: Name, Assigned Leads, Closed, Pending, Inactivity Count, Activity Score
- "View Agent Profile" button → navigates to agent profile

**Sections:** (Extends Agent functionality)
- Team performance table
- Own metrics (same as Agent)
- Pipeline & targets
- All other Agent sections

### BD Manager Profile (`profile-bd-manager.html`; no userId param needed)

**Department-Level View:**
- Department stats: Total Leads, Open Follow-ups, Closed Deals, Avg Response Time
- Team Leaders comparison table
- Department health panel: Pipeline Value, Inactive Count, Avg Deal Value
- Escalation alerts: Lists TLs with >3 inactive leads

**No individual leads table** (focuses on team leadership)

## localStorage Keys

All keys prefixed with `wt_bd_`:

```javascript
wt_bd_activity_{leadId}        // Array of notes added to a lead
wt_bd_metrics_{userId}         // Cached computed metrics
wt_bd_target_{userId}          // Monthly target (default: 25)
```

### Resetting Demo Data

To clear all stored data:

```javascript
// In browser console:
Object.keys(localStorage)
  .filter(k => k.startsWith('wt_bd_'))
  .forEach(k => localStorage.removeItem(k));
```

## Data Schema

### Mock Users (Employee Objects)

```javascript
{
  id: 'E025',
  name: 'Sneha Kulkarni',
  email: 'sneha.kulkarni@wolftech.com',
  phone: '+91-9876543243',
  department: 'business_development',
  position: 'agent', // agent | team_leader | manager
  joinDate: '2022-04-15',
  status: 'active', // active | on_leave | inactive
  teamLeaderId: 'E023',
  managerId: 'E022'
}
```

### Mock Leads (Lead Objects)

```javascript
{
  id: 'L001',
  title: 'TechCorp India',
  client_name: 'TechCorp India Pvt Ltd',
  email: 'contact@techcorp.in',
  phone: '+91-9988776655',
  assignedTo: 'E025',
  assignedToName: 'Sneha Kulkarni',
  stage: 'proposal', // initial_contact | discovery | qualification | proposal | negotiation | closing
  status: 'qualified', // new | contacted | qualified | closed
  priority: 'high', // low | medium | high
  created_at: '2024-12-01T10:00:00',
  lastActivity: '2024-12-11T14:30:00',
  next_followup_at: null,
  value: 450000,
  source: 'website' // website | referral | cold_call | linkedin | etc.
}
```

## Inactivity Detection

**Definition:** Leads inactive for >48 hours

**Computation:**
```javascript
const hours = (now - lastActivity) / (1000 * 60 * 60)
```

**Color Coding:**
- 0-24h: Green (#10B981)
- 24-48h: Amber (#F59E0B)
- 48-72h: Orange (#EA8C55)
- 72h+: Red (#EF4444)

**UI Indicators:**
- Delay badge in leads table (colored by inactivity)
- Inactivity count in metrics cards
- Top 5 inactive leads widget

## Performance Metrics Computation

### Key Functions in profiles-bd.js

```javascript
// Compute all KPIs for a user
BDProfileModule.computeMetrics(user, allLeads)
  → returns {
      assignedCount,
      closedCount,
      openFollowups,
      inactivityCount,
      inactiveLeads,
      avgResponseTime,
      activityScore,
      stageDistribution,
      userLeads
    }

// Calculate hours since last activity
BDProfileModule.computeInactivity(lead)
  → returns hours as integer
```

### Activity Score Calculation

```
activityScore = Math.min(100, Math.max(0, 100 - (avgResponseTime / 10)))
```

Higher response time = lower activity score

## Responsive Design

**Desktop (>1024px):** Full 2-column layouts for stage chart + targets

**Tablet (768px - 1024px):**
- Performance grid: 2-3 columns
- Leads table: Font reduced to 12px
- 90% viewport width for modals

**Mobile (<768px):**
- All cards stacked to 1 column
- Table header simplified
- Modal takes 95vw
- Touch-friendly button sizing

## Search & Filter Functionality

### Leads Table Filter
```javascript
// Real-time search across: title, client, stage, priority
// Case-insensitive matching
```

### Inactive Filter Toggle
```javascript
// Click "Show Inactive" button
// Filters to show only leads with inactivity >48h
```

## Export CSV

**Columns Exported:**
```
Lead ID, Title, Client, Stage, Status, Priority, Assigned Date, Last Activity
```

**File naming:** `{UserName}-leads.csv`

**Trigger:** Click "Export CSV" button on profile page

## Modal Interaction

### Lead View Modal

**Triggered by:** Click "View Lead" (eye icon) in leads table

**Content:**
1. Lead Details (grid layout)
2. Activity Log (scrollable list of notes)
3. Add Note textarea + Save button

**Interaction:**
- Save Note → Persists to localStorage under `wt_bd_activity_{leadId}`
- Close Modal → Click X button or outside overlay
- Supports markdown in notes (display as plain text)

### Add Note Modal

**Triggered by:** Click "+" button in leads table

**Simpler version** with just textarea and save button

## Testing the Implementation

### Test Endpoints (URLs)

```
# Agent Profile
/pages/profiles/profile-bd-agent.html?userId=E025

# Team Leader Profile
/pages/profiles/profile-bd-teamleader.html?userId=E023

# Manager Profile
/pages/profiles/profile-bd-manager.html
```

### Manual Test Cases

1. **Load Agent Profile**
   - Verify name, email, phone loaded
   - Verify 6 performance cards render
   - Check stage chart displays correctly
   - Confirm inactive leads show in red

2. **Click Lead Row**
   - Modal opens
   - Lead details visible
   - Can add note
   - Note persists after refresh

3. **Search in Table**
   - Type in search box
   - Table filters in real-time
   - Results match client name or lead title

4. **Toggle Inactive Filter**
   - Click "Show Inactive" button
   - Table filters to show only >48h inactivity
   - Button highlights (active state)

5. **Export CSV**
   - Click "Export CSV" button
   - Browser downloads file
   - CSV contains correct columns and data

6. **Edit Monthly Target**
   - Click "Edit" button on target widget
   - Prompt appears
   - Enter new number
   - Persists after refresh
   - Progress bar updates

## Key Classes & Selectors

### Component Containers

```css
.bd-profile                     /* Main page wrapper */
.bd-section                     /* Section wrapper */
.bd-performance-cards           /* Performance metrics grid */
.bd-stage-chart                 /* Pipeline stage chart */
.bd-leads-table                 /* Leads table container */
.bd-inactivity-tracker          /* Top 5 inactive leads */
.bd-activity-timeline           /* Recent activity list */
.bd-targets-module              /* Monthly target widget */
.bd-team-table                  /* Team performance table (TL/Manager) */
```

### Interaction Elements

```css
.bd-btn-primary                 /* Primary button (yellow) */
.bd-btn-secondary               /* Secondary button (grey) */
.bd-search-input                /* Search input field */
.bd-filter-btn                  /* Filter toggle button */
.bd-action-btn                  /* Small action buttons (eye, plus icons) */
.bd-modal                       /* Modal wrapper */
.bd-modal-content               /* Modal dialog */
.bd-toast                       /* Toast notification */
```

## Style Overrides

All new styles are scoped under `.bd-*` namespace. No global theme variables modified.

Brand colors used (from global theme):
```css
--brand-yellow: #F4D03F
--brand-black: #0F0F0F
--brand-white: #FFFFFF
--grey-100, --grey-200, --grey-300, --grey-400
--info: #3B82F6
--success: #10B981
--warning: #F59E0B
--error: #EF4444
```

## Accessibility

- All buttons have proper `title` attributes
- Modal overlay for keyboard focus trap
- Color not sole indicator (badges include text)
- Form inputs properly labeled
- Keyboard navigation supported (Tab through buttons)

## Performance Considerations

- Metrics cached in localStorage (10-minute TTL)
- Leads table pagination possible (not implemented, but structure supports it)
- Modal rendering on-demand (not pre-rendered)
- SVG progress ring (lightweight, no canvas)
- No external charting library (custom SVG/CSS only)

## Known Limitations

1. **No real-time sync** - Data is static mock
2. **No persistence to backend** - Notes/targets only in localStorage
3. **No multi-select** - Table doesn't support bulk actions yet
4. **No filtering by date range** - Inactivity is only >48h threshold
5. **No export to PDF** - CSV only

## Future Enhancements

1. Backend API integration
2. Real-time lead updates via WebSocket
3. Advanced filtering (date range, custom thresholds)
4. Bulk operations (reassign, archive leads)
5. Lead history with detailed activity log
6. Performance trends over time
7. Notifications for critical inactivity

## Support

For issues or questions about the BD profile implementation:

1. Check browser console for errors
2. Verify mock data is loaded (check `window.MOCK_DATA`)
3. Clear localStorage and refresh:
   ```javascript
   Object.keys(localStorage)
     .filter(k => k.startsWith('wt_bd_'))
     .forEach(k => localStorage.removeItem(k));
   ```
4. Verify userId in URL matches employee IDs in mockdata.js

## Version

- Implementation Date: December 2024
- Mock Data Version: 1.0
- Compatible Browsers: All modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile: Responsive down to 320px width
