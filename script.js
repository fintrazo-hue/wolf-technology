// ============================================
// Wolf Technologies Admin Dashboard
// Frontend-Only Demo with Mock Data
// ============================================

// Mock Data Storage
const mockData = {
    users: [
        { id: 1, full_name: 'John Smith', email: 'john@wolftech.com', role: 'super_admin', status: 'active' },
        { id: 2, full_name: 'Sarah Johnson', email: 'sarah@wolftech.com', role: 'admin', status: 'active' },
        { id: 3, full_name: 'Mike Williams', email: 'mike@wolftech.com', role: 'employee', status: 'active' }
    ],

    departments: [
        { id: 1, name: 'Accounts' },
        { id: 2, name: 'Technical' },
        { id: 3, name: 'Marketing' }
    ],

    employees: [
        { id: 1, employee_code: 'EMP001', user_id: 1, full_name: 'John Smith', email: 'john@wolftech.com', designation: 'CTO', department: 'Technical', joining_date: '2023-01-15', status: 'active' },
        { id: 2, employee_code: 'EMP002', user_id: 2, full_name: 'Sarah Johnson', email: 'sarah@wolftech.com', designation: 'Marketing Manager', department: 'Marketing', joining_date: '2023-03-20', status: 'active' },
        { id: 3, employee_code: 'EMP003', user_id: 3, full_name: 'Mike Williams', email: 'mike@wolftech.com', designation: 'Senior Developer', department: 'Technical', joining_date: '2023-05-10', status: 'active' },
        { id: 4, employee_code: 'EMP004', user_id: 4, full_name: 'Emily Brown', email: 'emily@wolftech.com', designation: 'Accountant', department: 'Accounts', joining_date: '2023-07-01', status: 'active' },
        { id: 5, employee_code: 'EMP005', user_id: 5, full_name: 'David Lee', email: 'david@wolftech.com', designation: 'UI/UX Designer', department: 'Technical', joining_date: '2023-08-15', status: 'on_leave' }
    ],

    leads: [
        { id: 1, customer_name: 'Acme Corporation', email: 'contact@acme.com', phone: '555-0101', company: 'Acme Corp', product: 'Enterprise Software', status: 'qualified', priority: 'high', assigned_to: 'John Smith' },
        { id: 2, customer_name: 'Tech Solutions Inc', email: 'info@techsolutions.com', phone: '555-0102', company: 'Tech Solutions', product: 'Cloud Hosting', status: 'contacted', priority: 'medium', assigned_to: 'Sarah Johnson' },
        { id: 3, customer_name: 'Global Industries', email: 'hello@global.com', phone: '555-0103', company: 'Global Industries', product: 'Custom Development', status: 'converted', priority: 'high', assigned_to: 'Mike Williams' },
        { id: 4, customer_name: 'Startup Ventures', email: 'team@startup.com', phone: '555-0104', company: 'Startup Ventures', product: 'SaaS Subscription', status: 'new', priority: 'low', assigned_to: 'Unassigned' },
        { id: 5, customer_name: 'Digital Agency', email: 'contact@digital.com', phone: '555-0105', company: 'Digital Agency', product: 'Marketing Platform', status: 'contacted', priority: 'medium', assigned_to: 'Sarah Johnson' },
        { id: 6, customer_name: 'Innovation Labs', email: 'info@innovation.com', phone: '555-0106', company: 'Innovation Labs', product: 'Analytics Suite', status: 'new', priority: 'high', assigned_to: 'John Smith' }
    ],

    notifications: [
        { id: 1, title: 'New Lead Assigned', message: 'You have been assigned a new lead: Acme Corporation', is_read: false, created_at: new Date(Date.now() - 3600000).toISOString() },
        { id: 2, title: 'Employee Leave Request', message: 'David Lee has requested leave for next week', is_read: false, created_at: new Date(Date.now() - 7200000).toISOString() },
        { id: 3, title: 'Order Completed', message: 'Order #ORD-2024-007 has been completed successfully', is_read: false, created_at: new Date(Date.now() - 10800000).toISOString() },
        { id: 4, title: 'System Update', message: 'System maintenance scheduled for this weekend', is_read: true, created_at: new Date(Date.now() - 86400000).toISOString() },
        { id: 5, title: 'New Team Member', message: 'Welcome Emily Brown to the Accounts department', is_read: true, created_at: new Date(Date.now() - 172800000).toISOString() }
    ],

    orders: [
        { id: 1, status: 'completed' },
        { id: 2, status: 'completed' },
        { id: 3, status: 'completed' },
        { id: 4, status: 'completed' },
        { id: 5, status: 'completed' },
        { id: 6, status: 'failed' },
        { id: 7, status: 'failed' },
        { id: 8, status: 'pending' }
    ]
};

// Current User Session
let currentUser = {
    id: 1,
    full_name: 'Admin User',
    email: 'admin@wolftech.com',
    role: 'super_admin'
};

// ============================================
// Initialize Application
// ============================================
$(document).ready(function() {
    initializeApp();
});

function initializeApp() {
    const currentPage = window.location.pathname;

    if (currentPage.includes('dashboard.html')) {
        // Check if user is logged in
        if (!localStorage.getItem('isLoggedIn')) {
            window.location.href = 'index.html';
            return;
        }
        initDashboard();
    } else {
        initLogin();
    }
}

// ============================================
// Login Page Functions
// ============================================
function initLogin() {
    // Toggle password visibility
    $('#togglePassword').on('click', function() {
        const passwordInput = $('#password');
        const icon = $(this).find('i');

        if (passwordInput.attr('type') === 'password') {
            passwordInput.attr('type', 'text');
            icon.removeClass('fa-eye').addClass('fa-eye-slash');
        } else {
            passwordInput.attr('type', 'password');
            icon.removeClass('fa-eye-slash').addClass('fa-eye');
        }
    });

    // Login form submission
    $('#loginForm').on('submit', function(e) {
        e.preventDefault();
        handleLogin();
    });
}

function handleLogin() {
    const email = $('#email').val();
    const password = $('#password').val();

    // Show loading state
    $('.btn-text').hide();
    $('.btn-loader').show();
    $('#loginBtn').prop('disabled', true);

    // Simulate API call
    setTimeout(() => {
        // Simple mock authentication - any email/password combo works
        if (email && password) {
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('userEmail', email);

            toastr.success('Login successful! Redirecting...');

            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 1000);
        } else {
            toastr.error('Please enter valid credentials');
            $('.btn-text').show();
            $('.btn-loader').hide();
            $('#loginBtn').prop('disabled', false);
        }
    }, 1000);
}

function handleLogout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userEmail');
    toastr.success('Logged out successfully');
    window.location.href = 'index.html';
}

// ============================================
// Dashboard Initialization
// ============================================
function initDashboard() {
    // Initialize components
    initSidebar();
    initHeader();
    initNotifications();
    initDataTables();
    initModals();
    loadDashboardData();

    // Logout handlers
    $('#logoutBtn, #logoutBtnMenu').on('click', function(e) {
        e.preventDefault();
        handleLogout();
    });
}

// ============================================
// Sidebar Functions
// ============================================
function initSidebar() {
    $('#mobileMenuToggle').on('click', function() {
        $('#sidebar').toggleClass('show');
    });

    $(document).on('click', function(e) {
        if (!$(e.target).closest('.sidebar, .mobile-menu-toggle').length) {
            $('#sidebar').removeClass('show');
        }
    });
}

// ============================================
// Header Functions
// ============================================
function initHeader() {
    // Profile dropdown toggle
    $('#profileDropdown').on('click', function(e) {
        e.stopPropagation();
        $('#profileMenu').toggleClass('show');
    });

    $(document).on('click', function(e) {
        if (!$(e.target).closest('#profileDropdown, #profileMenu').length) {
            $('#profileMenu').removeClass('show');
        }
    });

    // Settings modal
    $('#settingsBtn').on('click', function(e) {
        e.preventDefault();
        $('#settingsModal').modal('show');
    });

    // Save settings
    $('#saveSettingsBtn').on('click', function() {
        toastr.success('Settings saved successfully!');
        $('#settingsModal').modal('hide');
    });
}

// ============================================
// Notification Functions
// ============================================
function initNotifications() {
    // Toggle notification drawer
    $('#notificationIcon').on('click', function() {
        $('#notificationDrawer').toggleClass('show');
        loadNotifications();
    });

    $('#closeDrawer').on('click', function() {
        $('#notificationDrawer').removeClass('show');
    });

    // Drawer tabs
    $('.drawer-tab').on('click', function() {
        $('.drawer-tab').removeClass('active');
        $(this).addClass('active');

        const tab = $(this).data('tab');
        loadNotifications(tab);
    });
}

function loadNotifications(filter = 'all') {
    let notifications = mockData.notifications;

    if (filter === 'unread') {
        notifications = notifications.filter(n => !n.is_read);
    }

    renderNotifications(notifications);

    // Update badge
    const unreadCount = mockData.notifications.filter(n => !n.is_read).length;
    $('#notificationBadge').text(unreadCount);

    if (unreadCount === 0) {
        $('#notificationBadge').hide();
    } else {
        $('#notificationBadge').show();
    }
}

function renderNotifications(notifications) {
    const container = $('#notificationList');
    container.empty();

    if (notifications.length === 0) {
        container.html('<p class="text-center" style="color: var(--grey-400); padding: 20px;">No notifications</p>');
        return;
    }

    notifications.forEach(notification => {
        const timeAgo = getTimeAgo(notification.created_at);
        const unreadClass = notification.is_read ? '' : 'unread';

        const html = `
            <div class="notification-item ${unreadClass}" data-id="${notification.id}">
                <div class="notification-header">
                    <h4 class="notification-title">${notification.title}</h4>
                    <span class="notification-time">${timeAgo}</span>
                </div>
                <p class="notification-message">${notification.message}</p>
            </div>
        `;

        container.append(html);
    });

    // Mark as read on click
    $('.notification-item').on('click', function() {
        const id = $(this).data('id');
        markNotificationAsRead(id);
        $(this).removeClass('unread');
    });
}

function markNotificationAsRead(id) {
    const notification = mockData.notifications.find(n => n.id === id);
    if (notification) {
        notification.is_read = true;
        loadNotifications();
    }
}

// ============================================
// DataTables Functions
// ============================================
function initDataTables() {
    // Initialize Employee DataTable
    window.employeeTable = $('#employeeTable').DataTable({
        responsive: true,
        pageLength: 10,
        order: [[5, 'desc']],
        columnDefs: [
            {
                targets: -1,
                orderable: false,
                render: function(data, type, row) {
                    return `
                        <button class="action-btn action-btn-view" onclick="viewEmployee(${row.id})" title="View">
                            <i class="fas fa-eye"></i>
                        </button>
                        <button class="action-btn action-btn-edit" onclick="editEmployee(${row.id})" title="Edit">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="action-btn action-btn-delete" onclick="deleteEmployee(${row.id})" title="Delete">
                            <i class="fas fa-trash"></i>
                        </button>
                    `;
                }
            },
            {
                targets: 6,
                render: function(data, type, row) {
                    const badges = {
                        'active': 'badge-success',
                        'inactive': 'badge-secondary',
                        'on_leave': 'badge-warning'
                    };
                    const badgeClass = badges[data] || 'badge-secondary';
                    return `<span class="badge ${badgeClass}">${data.replace('_', ' ')}</span>`;
                }
            }
        ]
    });

    // Initialize Leads DataTable
    window.leadsTable = $('#leadsTable').DataTable({
        responsive: true,
        pageLength: 10,
        order: [[0, 'asc']],
        columnDefs: [
            {
                targets: -1,
                orderable: false,
                render: function(data, type, row) {
                    return `
                        <button class="action-btn action-btn-view" onclick="viewLead(${row.id})" title="View">
                            <i class="fas fa-eye"></i>
                        </button>
                        <button class="action-btn action-btn-edit" onclick="editLead(${row.id})" title="Edit">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="action-btn action-btn-delete" onclick="deleteLead(${row.id})" title="Delete">
                            <i class="fas fa-trash"></i>
                        </button>
                    `;
                }
            },
            {
                targets: 5,
                render: function(data, type, row) {
                    const badges = {
                        'new': 'badge-info',
                        'contacted': 'badge-primary',
                        'qualified': 'badge-warning',
                        'converted': 'badge-success',
                        'lost': 'badge-danger'
                    };
                    const badgeClass = badges[data] || 'badge-secondary';
                    return `<span class="badge ${badgeClass}">${data}</span>`;
                }
            },
            {
                targets: 6,
                render: function(data, type, row) {
                    const badges = {
                        'low': 'badge-info',
                        'medium': 'badge-warning',
                        'high': 'badge-danger'
                    };
                    const badgeClass = badges[data] || 'badge-secondary';
                    return `<span class="badge ${badgeClass}">${data}</span>`;
                }
            }
        ]
    });
}

// ============================================
// Load Dashboard Data
// ============================================
function loadDashboardData() {
    // Load user profile
    const userEmail = localStorage.getItem('userEmail') || 'admin@wolftech.com';
    $('#userName').text(currentUser.full_name);
    $('#profileViewName').text(currentUser.full_name);
    $('#profileViewRole').text('SUPER ADMIN');

    const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(currentUser.full_name)}&background=F4D03F&color=0F0F0F&bold=true`;
    $('.profile-avatar, #profileViewAvatar').attr('src', avatarUrl);

    // Load KPIs
    loadKPIs();

    // Load Employees
    loadEmployees();

    // Load Leads
    loadLeads();

    // Load Departments for dropdowns
    loadDepartments();

    // Load Agents for lead assignment
    loadAgents();
}

function loadKPIs() {
    // Total Users
    $('#totalUsers').text(mockData.users.length);

    // New Purchases (completed orders)
    const purchasesCount = mockData.orders.filter(o => o.status === 'completed').length;
    $('#newPurchase').text(purchasesCount);

    // Failed Orders
    const failedCount = mockData.orders.filter(o => o.status === 'failed').length;
    $('#orderFail').text(failedCount);

    // Employees Count
    const employeesCount = mockData.employees.filter(e => e.status === 'active').length;
    $('#employeesCount').text(employeesCount);
}

function loadEmployees() {
    window.employeeTable.clear();

    mockData.employees.forEach(employee => {
        window.employeeTable.row.add({
            id: employee.id,
            0: employee.employee_code,
            1: employee.full_name,
            2: employee.email,
            3: employee.department,
            4: employee.designation,
            5: new Date(employee.joining_date).toLocaleDateString(),
            6: employee.status
        });
    });

    window.employeeTable.draw();
}

function loadLeads() {
    window.leadsTable.clear();

    mockData.leads.forEach(lead => {
        window.leadsTable.row.add({
            id: lead.id,
            0: lead.customer_name,
            1: lead.email,
            2: lead.phone,
            3: lead.company,
            4: lead.product,
            5: lead.status,
            6: lead.priority,
            7: lead.assigned_to
        });
    });

    window.leadsTable.draw();
}

function loadDepartments() {
    const departmentSelects = $('#employeeDepartment, #leadDepartment');
    departmentSelects.empty().append('<option value="">Select Department</option>');

    mockData.departments.forEach(dept => {
        departmentSelects.append(`<option value="${dept.id}">${dept.name}</option>`);
    });
}

function loadAgents() {
    const agentSelect = $('#leadAssignedTo');
    agentSelect.empty().append('<option value="">Select Agent</option>');

    mockData.users.forEach(user => {
        agentSelect.append(`<option value="${user.id}">${user.full_name} (${user.role})</option>`);
    });
}

// ============================================
// Modal Functions
// ============================================
function initModals() {
    // Initialize Select2
    $('.select2').select2({
        theme: 'bootstrap-5'
    });

    // Initialize Datepicker
    if (typeof flatpickr !== 'undefined') {
        flatpickr('.datepicker', {
            dateFormat: 'Y-m-d',
            defaultDate: new Date()
        });
    }

    // Add Employee Modal
    $('#addEmployeeBtn').on('click', function() {
        resetEmployeeForm();
        $('#employeeModalLabel').html('<i class="fas fa-user-plus"></i> Add New Employee');
        $('#employeeModal').modal('show');
    });

    // Save Employee
    $('#saveEmployeeBtn').on('click', function() {
        saveEmployee();
    });

    // Add Lead Modal
    $('#addLeadBtn').on('click', function() {
        resetLeadForm();
        $('#leadModalLabel').html('<i class="fas fa-user-plus"></i> Add New Lead');
        $('#leadModal').modal('show');
    });

    // Save Lead
    $('#saveLeadBtn').on('click', function() {
        saveLead();
    });
}

function resetEmployeeForm() {
    $('#employeeForm')[0].reset();
    $('#employeeId').val('');
}

function resetLeadForm() {
    $('#leadForm')[0].reset();
    $('#leadId').val('');
}

// ============================================
// Employee CRUD Functions
// ============================================
function saveEmployee() {
    const employeeId = $('#employeeId').val();
    const isEdit = employeeId !== '';

    const employeeData = {
        id: isEdit ? parseInt(employeeId) : mockData.employees.length + 1,
        employee_code: $('#employeeCode').val(),
        full_name: $('#employeeFullName').val(),
        email: $('#employeeEmail').val(),
        designation: $('#employeeDesignation').val(),
        department: $('#employeeDepartment option:selected').text(),
        joining_date: $('#employeeJoiningDate').val(),
        status: $('#employeeStatus').val()
    };

    if (isEdit) {
        const index = mockData.employees.findIndex(e => e.id === parseInt(employeeId));
        if (index !== -1) {
            mockData.employees[index] = { ...mockData.employees[index], ...employeeData };
        }
        toastr.success('Employee updated successfully!');
    } else {
        mockData.employees.push(employeeData);
        toastr.success('Employee added successfully!');
    }

    $('#employeeModal').modal('hide');
    loadEmployees();
    loadKPIs();
}

window.editEmployee = function(id) {
    const employee = mockData.employees.find(e => e.id === id);
    if (employee) {
        $('#employeeModalLabel').html('<i class="fas fa-user-edit"></i> Edit Employee');
        $('#employeeId').val(employee.id);
        $('#employeeCode').val(employee.employee_code);
        $('#employeeFullName').val(employee.full_name);
        $('#employeeEmail').val(employee.email);
        $('#employeeDesignation').val(employee.designation);
        $('#employeeJoiningDate').val(employee.joining_date);
        $('#employeeStatus').val(employee.status);
        $('#employeeModal').modal('show');
    }
}

window.viewEmployee = function(id) {
    const employee = mockData.employees.find(e => e.id === id);
    if (employee) {
        toastr.info(`Viewing profile for ${employee.full_name}`);
        $('#profileViewModal').modal('show');
    }
}

window.deleteEmployee = function(id) {
    if (confirm('Are you sure you want to delete this employee?')) {
        const index = mockData.employees.findIndex(e => e.id === id);
        if (index !== -1) {
            mockData.employees.splice(index, 1);
            toastr.success('Employee deleted successfully!');
            loadEmployees();
            loadKPIs();
        }
    }
}

// ============================================
// Lead CRUD Functions
// ============================================
function saveLead() {
    const leadId = $('#leadId').val();
    const isEdit = leadId !== '';

    const leadData = {
        id: isEdit ? parseInt(leadId) : mockData.leads.length + 1,
        customer_name: $('#leadCustomerName').val(),
        email: $('#leadEmail').val(),
        phone: $('#leadPhone').val(),
        company: $('#leadCompany').val(),
        product: $('#leadProduct').val(),
        status: $('#leadStatus').val(),
        priority: $('#leadPriority').val(),
        assigned_to: $('#leadAssignedTo option:selected').text() || 'Unassigned'
    };

    if (isEdit) {
        const index = mockData.leads.findIndex(l => l.id === parseInt(leadId));
        if (index !== -1) {
            mockData.leads[index] = { ...mockData.leads[index], ...leadData };
        }
        toastr.success('Lead updated successfully!');
    } else {
        mockData.leads.push(leadData);
        toastr.success('Lead added successfully!');
    }

    $('#leadModal').modal('hide');
    loadLeads();
}

window.editLead = function(id) {
    const lead = mockData.leads.find(l => l.id === id);
    if (lead) {
        $('#leadModalLabel').html('<i class="fas fa-user-edit"></i> Edit Lead');
        $('#leadId').val(lead.id);
        $('#leadCustomerName').val(lead.customer_name);
        $('#leadEmail').val(lead.email);
        $('#leadPhone').val(lead.phone);
        $('#leadCompany').val(lead.company);
        $('#leadProduct').val(lead.product);
        $('#leadStatus').val(lead.status);
        $('#leadPriority').val(lead.priority);
        $('#leadModal').modal('show');
    }
}

window.viewLead = function(id) {
    const lead = mockData.leads.find(l => l.id === id);
    if (lead) {
        toastr.info(`Viewing details for ${lead.customer_name}`);
        $('#profileViewModal').modal('show');
    }
}

window.deleteLead = function(id) {
    if (confirm('Are you sure you want to delete this lead?')) {
        const index = mockData.leads.findIndex(l => l.id === id);
        if (index !== -1) {
            mockData.leads.splice(index, 1);
            toastr.success('Lead deleted successfully!');
            loadLeads();
        }
    }
}

// ============================================
// Utility Functions
// ============================================
function getTimeAgo(date) {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);

    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + ' years ago';

    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + ' months ago';

    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + ' days ago';

    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + ' hours ago';

    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + ' minutes ago';

    return Math.floor(seconds) + ' seconds ago';
}
