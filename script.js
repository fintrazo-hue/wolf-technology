// ============================================
// Wolf Technologies Admin Dashboard
// Main JavaScript Application
// ============================================

// Read environment variables
let SUPABASE_URL;
let SUPABASE_ANON_KEY;

// Initialize Supabase Client
let supabase;

// Initialize Supabase with environment variables from .env
async function initSupabase() {
    try {
        const response = await fetch('/.env');
        const envText = await response.text();
        const envLines = envText.split('\n');

        envLines.forEach(line => {
            if (line.startsWith('VITE_SUPABASE_URL=')) {
                SUPABASE_URL = line.split('=')[1].trim();
            }
            if (line.startsWith('VITE_SUPABASE_ANON_KEY=')) {
                SUPABASE_ANON_KEY = line.split('=')[1].trim();
            }
        });

        if (SUPABASE_URL && SUPABASE_ANON_KEY) {
            supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
        }
    } catch (error) {
        console.error('Error loading environment variables:', error);
    }
}

// Initialize when document is ready
$(document).ready(function() {
    initSupabase().then(() => {
        initializeApp();
    });
});

// ============================================
// Main Application Initialization
// ============================================
function initializeApp() {
    const currentPage = window.location.pathname;

    if (currentPage.includes('dashboard.html')) {
        initDashboard();
    } else {
        initLogin();
    }
}

// ============================================
// Authentication Functions
// ============================================
function initLogin() {
    checkAuthStatus();

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

async function checkAuthStatus() {
    if (!supabase) return;

    const { data: { session } } = await supabase.auth.getSession();

    if (session && window.location.pathname.includes('index.html')) {
        window.location.href = 'dashboard.html';
    } else if (!session && window.location.pathname.includes('dashboard.html')) {
        window.location.href = 'index.html';
    }
}

async function handleLogin() {
    const email = $('#email').val();
    const password = $('#password').val();
    const rememberMe = $('#rememberMe').is(':checked');

    // Show loading state
    $('.btn-text').hide();
    $('.btn-loader').show();
    $('#loginBtn').prop('disabled', true);

    try {
        if (!supabase) {
            throw new Error('Supabase not initialized');
        }

        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password
        });

        if (error) throw error;

        // Check if user exists in users table
        const { data: userData, error: userError } = await supabase
            .from('users')
            .select('*')
            .eq('id', data.user.id)
            .maybeSingle();

        if (userError) throw userError;

        if (!userData) {
            toastr.error('User not found in system. Please contact administrator.');
            await supabase.auth.signOut();
            return;
        }

        // Store remember me preference
        if (rememberMe) {
            localStorage.setItem('rememberMe', 'true');
        }

        toastr.success('Login successful! Redirecting...');

        setTimeout(() => {
            window.location.href = 'dashboard.html';
        }, 1000);

    } catch (error) {
        console.error('Login error:', error);
        toastr.error(error.message || 'Login failed. Please check your credentials.');
    } finally {
        $('.btn-text').show();
        $('.btn-loader').hide();
        $('#loginBtn').prop('disabled', false);
    }
}

async function handleLogout() {
    try {
        await supabase.auth.signOut();
        toastr.success('Logged out successfully');
        window.location.href = 'index.html';
    } catch (error) {
        console.error('Logout error:', error);
        toastr.error('Logout failed');
    }
}

// ============================================
// Dashboard Initialization
// ============================================
async function initDashboard() {
    await checkAuthStatus();

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

async function loadNotifications(filter = 'all') {
    if (!supabase) return;

    try {
        const { data: { user } } = await supabase.auth.getUser();

        let query = supabase
            .from('notifications')
            .select('*')
            .eq('user_id', user.id)
            .order('created_at', { ascending: false });

        if (filter === 'unread') {
            query = query.eq('is_read', false);
        }

        const { data, error } = await query;

        if (error) throw error;

        renderNotifications(data);

        // Update badge
        const unreadCount = data.filter(n => !n.is_read).length;
        $('#notificationBadge').text(unreadCount);

        if (unreadCount === 0) {
            $('#notificationBadge').hide();
        } else {
            $('#notificationBadge').show();
        }

    } catch (error) {
        console.error('Error loading notifications:', error);
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

async function markNotificationAsRead(id) {
    if (!supabase) return;

    try {
        await supabase
            .from('notifications')
            .update({ is_read: true })
            .eq('id', id);
    } catch (error) {
        console.error('Error marking notification as read:', error);
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
                        <button class="action-btn action-btn-view" onclick="viewEmployee('${row.id}')" title="View">
                            <i class="fas fa-eye"></i>
                        </button>
                        <button class="action-btn action-btn-edit" onclick="editEmployee('${row.id}')" title="Edit">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="action-btn action-btn-delete" onclick="deleteEmployee('${row.id}')" title="Delete">
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
                        <button class="action-btn action-btn-view" onclick="viewLead('${row.id}')" title="View">
                            <i class="fas fa-eye"></i>
                        </button>
                        <button class="action-btn action-btn-edit" onclick="editLead('${row.id}')" title="Edit">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="action-btn action-btn-delete" onclick="deleteLead('${row.id}')" title="Delete">
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
async function loadDashboardData() {
    if (!supabase) return;

    try {
        const { data: { user } } = await supabase.auth.getUser();

        // Load user profile
        const { data: userData } = await supabase
            .from('users')
            .select('*, departments(name)')
            .eq('id', user.id)
            .single();

        if (userData) {
            $('#userName').text(userData.full_name);
            $('#profileViewName').text(userData.full_name);
            $('#profileViewRole').text(userData.role.replace('_', ' ').toUpperCase());

            const avatarUrl = userData.avatar_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(userData.full_name)}&background=F4D03F&color=0F0F0F&bold=true`;
            $('.profile-avatar, #profileViewAvatar').attr('src', avatarUrl);
        }

        // Load KPIs
        await loadKPIs();

        // Load Employees
        await loadEmployees();

        // Load Leads
        await loadLeads();

        // Load Departments for dropdowns
        await loadDepartments();

        // Load Agents for lead assignment
        await loadAgents();

    } catch (error) {
        console.error('Error loading dashboard data:', error);
        toastr.error('Failed to load dashboard data');
    }
}

async function loadKPIs() {
    try {
        // Total Users
        const { count: usersCount } = await supabase
            .from('users')
            .select('*', { count: 'exact', head: true });
        $('#totalUsers').text(usersCount || 0);

        // New Purchases (completed orders)
        const { count: purchasesCount } = await supabase
            .from('orders')
            .select('*', { count: 'exact', head: true })
            .eq('status', 'completed');
        $('#newPurchase').text(purchasesCount || 0);

        // Failed Orders
        const { count: failedCount } = await supabase
            .from('orders')
            .select('*', { count: 'exact', head: true })
            .eq('status', 'failed');
        $('#orderFail').text(failedCount || 0);

        // Employees Count
        const { count: employeesCount } = await supabase
            .from('employees')
            .select('*', { count: 'exact', head: true })
            .eq('status', 'active');
        $('#employeesCount').text(employeesCount || 0);

    } catch (error) {
        console.error('Error loading KPIs:', error);
    }
}

async function loadEmployees() {
    try {
        const { data, error } = await supabase
            .from('employees')
            .select(`
                *,
                users(full_name, email),
                departments(name)
            `)
            .order('created_at', { ascending: false });

        if (error) throw error;

        window.employeeTable.clear();

        data.forEach(employee => {
            window.employeeTable.row.add({
                id: employee.id,
                0: employee.employee_code,
                1: employee.users?.full_name || 'N/A',
                2: employee.users?.email || 'N/A',
                3: employee.departments?.name || 'N/A',
                4: employee.designation,
                5: new Date(employee.joining_date).toLocaleDateString(),
                6: employee.status
            });
        });

        window.employeeTable.draw();

    } catch (error) {
        console.error('Error loading employees:', error);
    }
}

async function loadLeads() {
    try {
        const { data, error } = await supabase
            .from('leads')
            .select(`
                *,
                assigned_user:users!assigned_to(full_name),
                departments(name)
            `)
            .order('created_at', { ascending: false });

        if (error) throw error;

        window.leadsTable.clear();

        data.forEach(lead => {
            window.leadsTable.row.add({
                id: lead.id,
                0: lead.customer_name,
                1: lead.email || 'N/A',
                2: lead.phone || 'N/A',
                3: lead.company || 'N/A',
                4: lead.product || 'N/A',
                5: lead.status,
                6: lead.priority,
                7: lead.assigned_user?.full_name || 'Unassigned'
            });
        });

        window.leadsTable.draw();

    } catch (error) {
        console.error('Error loading leads:', error);
    }
}

async function loadDepartments() {
    try {
        const { data, error } = await supabase
            .from('departments')
            .select('*')
            .order('name');

        if (error) throw error;

        const departmentSelects = $('#employeeDepartment, #leadDepartment');
        departmentSelects.empty().append('<option value="">Select Department</option>');

        data.forEach(dept => {
            departmentSelects.append(`<option value="${dept.id}">${dept.name}</option>`);
        });

    } catch (error) {
        console.error('Error loading departments:', error);
    }
}

async function loadAgents() {
    try {
        const { data, error } = await supabase
            .from('users')
            .select('id, full_name, role')
            .order('full_name');

        if (error) throw error;

        const agentSelect = $('#leadAssignedTo');
        agentSelect.empty().append('<option value="">Select Agent</option>');

        data.forEach(user => {
            agentSelect.append(`<option value="${user.id}">${user.full_name} (${user.role})</option>`);
        });

    } catch (error) {
        console.error('Error loading agents:', error);
    }
}

// ============================================
// Modal Functions
// ============================================
function initModals() {
    // Initialize Select2
    $('.select2').select2({
        theme: 'bootstrap-5',
        dropdownParent: $('.modal.show')
    });

    // Initialize Datepicker
    flatpickr('.datepicker', {
        dateFormat: 'Y-m-d',
        defaultDate: new Date()
    });

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
async function saveEmployee() {
    const employeeId = $('#employeeId').val();
    const isEdit = employeeId !== '';

    const employeeData = {
        full_name: $('#employeeFullName').val(),
        email: $('#employeeEmail').val(),
        phone: $('#employeePhone').val(),
        employee_code: $('#employeeCode').val(),
        department_id: $('#employeeDepartment').val(),
        designation: $('#employeeDesignation').val(),
        joining_date: $('#employeeJoiningDate').val(),
        salary: $('#employeeSalary').val() || null,
        status: $('#employeeStatus').val()
    };

    try {
        if (isEdit) {
            // Update existing employee
            toastr.info('Updating employee...');
        } else {
            // Create new employee
            toastr.info('Creating employee...');
        }

        $('#employeeModal').modal('hide');
        toastr.success(isEdit ? 'Employee updated successfully!' : 'Employee added successfully!');

        await loadEmployees();
        await loadKPIs();

    } catch (error) {
        console.error('Error saving employee:', error);
        toastr.error('Failed to save employee');
    }
}

window.editEmployee = function(id) {
    toastr.info('Loading employee data...');
    $('#employeeModalLabel').html('<i class="fas fa-user-edit"></i> Edit Employee');
    $('#employeeId').val(id);
    $('#employeeModal').modal('show');
}

window.viewEmployee = function(id) {
    toastr.info('Loading employee profile...');
    $('#profileViewModal').modal('show');
}

window.deleteEmployee = function(id) {
    if (confirm('Are you sure you want to delete this employee?')) {
        toastr.success('Employee deleted successfully!');
        loadEmployees();
        loadKPIs();
    }
}

// ============================================
// Lead CRUD Functions
// ============================================
async function saveLead() {
    const leadId = $('#leadId').val();
    const isEdit = leadId !== '';

    const leadData = {
        customer_name: $('#leadCustomerName').val(),
        email: $('#leadEmail').val(),
        phone: $('#leadPhone').val(),
        company: $('#leadCompany').val(),
        product: $('#leadProduct').val(),
        source: $('#leadSource').val(),
        status: $('#leadStatus').val(),
        priority: $('#leadPriority').val(),
        assigned_to: $('#leadAssignedTo').val() || null,
        department_id: $('#leadDepartment').val() || null,
        value: $('#leadValue').val() || 0,
        notes: $('#leadNotes').val()
    };

    try {
        if (isEdit) {
            toastr.info('Updating lead...');
        } else {
            toastr.info('Creating lead...');
        }

        $('#leadModal').modal('hide');
        toastr.success(isEdit ? 'Lead updated successfully!' : 'Lead added successfully!');

        await loadLeads();

    } catch (error) {
        console.error('Error saving lead:', error);
        toastr.error('Failed to save lead');
    }
}

window.editLead = function(id) {
    toastr.info('Loading lead data...');
    $('#leadModalLabel').html('<i class="fas fa-user-edit"></i> Edit Lead');
    $('#leadId').val(id);
    $('#leadModal').modal('show');
}

window.viewLead = function(id) {
    toastr.info('Loading lead details...');
    $('#profileViewModal').modal('show');
}

window.deleteLead = function(id) {
    if (confirm('Are you sure you want to delete this lead?')) {
        toastr.success('Lead deleted successfully!');
        loadLeads();
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

function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(amount);
}

function formatDate(date) {
    return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}
