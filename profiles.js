// Profile System Data
const profilesData = {
    departments: {
        accounts: { name: 'Accounts', color: '#3B82F6', icon: '💰' },
        technical: { name: 'Technical', color: '#10B981', icon: '⚙️' },
        marketing: { name: 'Marketing', color: '#F59E0B', icon: '📊' },
        bd: { name: 'Business Development', color: '#8B5CF6', icon: '🤝' },
        sales: { name: 'Sales', color: '#EF4444', icon: '📈' }
    },
    roles: {
        manager: 'Manager',
        teamleader: 'Team Leader',
        agent: 'Agent'
    }
};

// Mock Data Generator
const generateMockData = (role, department) => {
    const dept = profilesData.departments[department];
    const roleName = profilesData.roles[role];

    const names = {
        manager: `${dept.name} Manager`,
        teamleader: `${dept.name} Team Leader`,
        agent: `${dept.name} Agent`
    };

    const commonMetrics = {
        manager: {
            totalEmployees: Math.floor(Math.random() * 30) + 10,
            activeProjects: Math.floor(Math.random() * 15) + 5,
            teamPerformance: Math.floor(Math.random() * 30) + 70,
            completionRate: Math.floor(Math.random() * 20) + 80
        },
        teamleader: {
            teamSize: Math.floor(Math.random() * 12) + 5,
            tasksAssigned: Math.floor(Math.random() * 50) + 20,
            agentPerformance: Math.floor(Math.random() * 25) + 75,
            completionRate: Math.floor(Math.random() * 20) + 80
        },
        agent: {
            tasksAssigned: Math.floor(Math.random() * 20) + 5,
            completed: Math.floor(Math.random() * 15) + 5,
            pending: Math.floor(Math.random() * 8) + 2,
            completionRate: Math.floor(Math.random() * 20) + 75
        }
    };

    return {
        name: names[role],
        role: roleName,
        department: dept.name,
        deptShort: department,
        email: `${role}@wolf-${department}.com`,
        phone: `+1-${Math.floor(Math.random() * 9000000000) + 1000000000}`,
        joinDate: `${Math.floor(Math.random() * 5) + 2020}-01-15`,
        status: 'Active',
        avatar: dept.icon,
        metrics: commonMetrics[role],
        lastUpdated: new Date().toLocaleDateString()
    };
};

// Initialize Profile Page
const initializeProfilePage = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const role = urlParams.get('role');
    const dept = urlParams.get('dept');

    if (!role || !dept) {
        window.location.href = 'index.html';
        return;
    }

    const profileData = generateMockData(role, dept);

    document.title = `${profileData.name} - ${profileData.department}`;
    renderProfileHeader(profileData);
    renderProfileContent(profileData, role);
    setupSidebar(role, dept);
};

const renderProfileHeader = (data) => {
    const header = document.querySelector('.profile-header');
    if (!header) return;

    header.innerHTML = `
        <div class="profile-header-info">
            <div class="profile-avatar">${data.avatar}</div>
            <div class="profile-header-details">
                <h1>${data.name}</h1>
                <div class="role">${data.role}</div>
                <span class="department">${data.department}</span>
            </div>
        </div>
        <div class="profile-header-actions">
            <button class="btn-action" onclick="editProfile()">Edit Profile</button>
            <button class="btn-action" onclick="downloadReport()">Download Report</button>
        </div>
    `;
};

const renderProfileContent = (data, role) => {
    const container = document.querySelector('.profile-content');
    if (!container) return;

    if (role === 'manager') {
        renderManagerContent(data, container);
    } else if (role === 'teamleader') {
        renderTeamLeaderContent(data, container);
    } else if (role === 'agent') {
        renderAgentContent(data, container);
    }
};

const renderManagerContent = (data, container) => {
    const m = data.metrics;

    container.innerHTML = `
        <div class="profile-tabs">
            <button class="profile-tab active" onclick="switchTab('dashboard')">Dashboard</button>
            <button class="profile-tab" onclick="switchTab('team')">Team Performance</button>
            <button class="profile-tab" onclick="switchTab('reports')">Reports</button>
            <button class="profile-tab" onclick="switchTab('activity')">Activity Logs</button>
        </div>

        <div id="dashboard" class="tab-content">
            <div class="profile-grid">
                <div class="profile-card">
                    <div class="profile-card-title"><i class="fas fa-users"></i> Team Overview</div>
                    <div class="metric">
                        <span class="metric-label">Total Employees</span>
                        <span class="metric-value">${m.totalEmployees}</span>
                    </div>
                    <div class="metric">
                        <span class="metric-label">Active Projects</span>
                        <span class="metric-value">${m.activeProjects}</span>
                    </div>
                    <div class="metric">
                        <span class="metric-label">Department Lead</span>
                        <span class="metric-value success">✓</span>
                    </div>
                </div>

                <div class="profile-card">
                    <div class="profile-card-title"><i class="fas fa-chart-line"></i> Performance</div>
                    <div class="metric">
                        <span class="metric-label">Team Performance</span>
                        <span class="metric-value success">${m.teamPerformance}%</span>
                    </div>
                    <div class="progress-bar">
                        <div class="progress-bar-fill" style="width: ${m.teamPerformance}%"></div>
                    </div>
                    <div class="metric" style="margin-top: 12px;">
                        <span class="metric-label">Completion Rate</span>
                        <span class="metric-value">${m.completionRate}%</span>
                    </div>
                    <div class="progress-bar">
                        <div class="progress-bar-fill" style="width: ${m.completionRate}%"></div>
                    </div>
                </div>

                <div class="profile-card">
                    <div class="profile-card-title"><i class="fas fa-cog"></i> Department Status</div>
                    <div class="metric">
                        <span class="metric-label">Status</span>
                        <span class="status-badge active">Active</span>
                    </div>
                    <div class="metric">
                        <span class="metric-label">Last Update</span>
                        <span class="metric-value" style="font-size: 14px;">${data.lastUpdated}</span>
                    </div>
                    <div class="metric">
                        <span class="metric-label">Contact</span>
                        <span class="metric-value" style="font-size: 13px;">${data.email}</span>
                    </div>
                </div>
            </div>

            <div class="profile-card">
                <div class="profile-card-title"><i class="fas fa-tasks"></i> Exception Handling</div>
                <div class="task-list">
                    <div class="task-item">
                        <input type="checkbox" class="task-checkbox" checked>
                        <div class="task-content">
                            <div class="task-content-title">Review underperforming agents</div>
                            <div class="task-content-meta">Due: Today</div>
                        </div>
                        <span class="task-priority high">High</span>
                    </div>
                    <div class="task-item">
                        <input type="checkbox" class="task-checkbox">
                        <div class="task-content">
                            <div class="task-content-title">Monthly performance review meeting</div>
                            <div class="task-content-meta">Due: Tomorrow</div>
                        </div>
                        <span class="task-priority medium">Medium</span>
                    </div>
                    <div class="task-item">
                        <input type="checkbox" class="task-checkbox">
                        <div class="task-content">
                            <div class="task-content-title">Update team targets and KPIs</div>
                            <div class="task-content-meta">Due: Next week</div>
                        </div>
                        <span class="task-priority medium">Medium</span>
                    </div>
                </div>
            </div>
        </div>

        <div id="team" class="tab-content" style="display: none;">
            <div class="profile-card">
                <div class="profile-card-title"><i class="fas fa-chart-bar"></i> Team Performance Metrics</div>
                <table class="profile-table">
                    <thead>
                        <tr>
                            <th>Team Member</th>
                            <th>Performance</th>
                            <th>Tasks</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Team Leader 1</td>
                            <td><span class="status-badge active">85%</span></td>
                            <td>24/25</td>
                            <td><span class="status-badge active">Active</span></td>
                        </tr>
                        <tr>
                            <td>Team Leader 2</td>
                            <td><span class="status-badge active">78%</span></td>
                            <td>18/20</td>
                            <td><span class="status-badge active">Active</span></td>
                        </tr>
                        <tr>
                            <td>Team Leader 3</td>
                            <td><span class="status-badge pending">65%</span></td>
                            <td>13/20</td>
                            <td><span class="status-badge pending">At Risk</span></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <div id="reports" class="tab-content" style="display: none;">
            <div class="reports-grid">
                <div class="report-box" onclick="generateReport('daily')">
                    <div class="report-icon">📅</div>
                    <div class="report-title">Daily Report</div>
                    <div class="report-desc">Today's activity summary</div>
                </div>
                <div class="report-box" onclick="generateReport('weekly')">
                    <div class="report-icon">📊</div>
                    <div class="report-title">Weekly Report</div>
                    <div class="report-desc">This week's metrics</div>
                </div>
                <div class="report-box" onclick="generateReport('monthly')">
                    <div class="report-icon">📈</div>
                    <div class="report-title">Monthly Report</div>
                    <div class="report-desc">Monthly performance</div>
                </div>
                <div class="report-box" onclick="generateReport('performance')">
                    <div class="report-icon">⭐</div>
                    <div class="report-title">Performance Analysis</div>
                    <div class="report-desc">Detailed analytics</div>
                </div>
            </div>
        </div>

        <div id="activity" class="tab-content" style="display: none;">
            <div class="profile-card">
                <div class="profile-card-title"><i class="fas fa-history"></i> Activity Timeline</div>
                <div class="activity-list">
                    <div class="activity-item">
                        <div class="activity-icon">📢</div>
                        <div class="activity-content">
                            <h4>Team Announcement Posted</h4>
                            <p>Updated quarterly targets for all departments</p>
                            <p style="color: var(--grey-300); font-size: 12px;">2 hours ago</p>
                        </div>
                    </div>
                    <div class="activity-item">
                        <div class="activity-icon">✅</div>
                        <div class="activity-content">
                            <h4>Performance Review Completed</h4>
                            <p>Reviewed performance for 3 team leaders</p>
                            <p style="color: var(--grey-300); font-size: 12px;">1 day ago</p>
                        </div>
                    </div>
                    <div class="activity-item">
                        <div class="activity-icon">📝</div>
                        <div class="activity-content">
                            <h4>Report Generated</h4>
                            <p>Monthly performance report exported</p>
                            <p style="color: var(--grey-300); font-size: 12px;">3 days ago</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
};

const renderTeamLeaderContent = (data, container) => {
    const m = data.metrics;

    container.innerHTML = `
        <div class="profile-tabs">
            <button class="profile-tab active" onclick="switchTab('dashboard')">Dashboard</button>
            <button class="profile-tab" onclick="switchTab('team')">My Team</button>
            <button class="profile-tab" onclick="switchTab('tasks')">Tasks</button>
            <button class="profile-tab" onclick="switchTab('workflow')">Workflow</button>
        </div>

        <div id="dashboard" class="tab-content">
            <div class="profile-grid">
                <div class="profile-card">
                    <div class="profile-card-title"><i class="fas fa-users"></i> Team Management</div>
                    <div class="metric">
                        <span class="metric-label">Team Size</span>
                        <span class="metric-value">${m.teamSize}</span>
                    </div>
                    <div class="metric">
                        <span class="metric-label">Tasks Assigned</span>
                        <span class="metric-value">${m.tasksAssigned}</span>
                    </div>
                    <div class="metric">
                        <span class="metric-label">Team Status</span>
                        <span class="status-badge active">Operational</span>
                    </div>
                </div>

                <div class="profile-card">
                    <div class="profile-card-title"><i class="fas fa-chart-line"></i> Agent Performance</div>
                    <div class="metric">
                        <span class="metric-label">Avg Performance</span>
                        <span class="metric-value success">${m.agentPerformance}%</span>
                    </div>
                    <div class="progress-bar">
                        <div class="progress-bar-fill" style="width: ${m.agentPerformance}%"></div>
                    </div>
                    <div class="metric" style="margin-top: 12px;">
                        <span class="metric-label">Completion Rate</span>
                        <span class="metric-value">${m.completionRate}%</span>
                    </div>
                    <div class="progress-bar">
                        <div class="progress-bar-fill" style="width: ${m.completionRate}%"></div>
                    </div>
                </div>

                <div class="profile-card">
                    <div class="profile-card-title"><i class="fas fa-briefcase"></i> Quick Actions</div>
                    <div style="display: flex; flex-direction: column; gap: 8px;">
                        <button class="btn-action" style="width: 100%; text-align: left;">Assign Task</button>
                        <button class="btn-action" style="width: 100%; text-align: left;">Review Progress</button>
                        <button class="btn-action" style="width: 100%; text-align: left;">Submit EOD Report</button>
                    </div>
                </div>
            </div>

            <div class="profile-card">
                <div class="profile-card-title"><i class="fas fa-tasks"></i> Pending Actions</div>
                <div class="task-list">
                    <div class="task-item">
                        <input type="checkbox" class="task-checkbox" checked>
                        <div class="task-content">
                            <div class="task-content-title">Review agent submissions</div>
                            <div class="task-content-meta">3 pending reviews</div>
                        </div>
                        <span class="task-priority high">High</span>
                    </div>
                    <div class="task-item">
                        <input type="checkbox" class="task-checkbox">
                        <div class="task-content">
                            <div class="task-content-title">Assign new leads to agents</div>
                            <div class="task-content-meta">12 leads available</div>
                        </div>
                        <span class="task-priority medium">Medium</span>
                    </div>
                    <div class="task-item">
                        <input type="checkbox" class="task-checkbox">
                        <div class="task-content">
                            <div class="task-content-title">Schedule performance meeting</div>
                            <div class="task-content-meta">Due: This Friday</div>
                        </div>
                        <span class="task-priority low">Low</span>
                    </div>
                </div>
            </div>
        </div>

        <div id="team" class="tab-content" style="display: none;">
            <div class="profile-card">
                <div class="profile-card-title"><i class="fas fa-users"></i> Team Members</div>
                <table class="profile-table">
                    <thead>
                        <tr>
                            <th>Agent Name</th>
                            <th>Performance</th>
                            <th>Tasks</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Agent 1</td>
                            <td><span class="status-badge active">82%</span></td>
                            <td>8/10</td>
                            <td><span class="status-badge active">Online</span></td>
                        </tr>
                        <tr>
                            <td>Agent 2</td>
                            <td><span class="status-badge active">76%</span></td>
                            <td>7/10</td>
                            <td><span class="status-badge active">Online</span></td>
                        </tr>
                        <tr>
                            <td>Agent 3</td>
                            <td><span class="status-badge warning">68%</span></td>
                            <td>6/10</td>
                            <td><span class="status-badge pending">Idle</span></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <div id="tasks" class="tab-content" style="display: none;">
            <div class="profile-card">
                <div class="profile-card-title"><i class="fas fa-list-check"></i> Task Management</div>
                <div class="task-list">
                    <div class="task-item">
                        <input type="checkbox" class="task-checkbox" checked>
                        <div class="task-content">
                            <div class="task-content-title">Lead Follow-up - Client ABC</div>
                            <div class="task-content-meta">Assigned: Agent 1</div>
                        </div>
                        <span class="task-priority high">High</span>
                    </div>
                    <div class="task-item">
                        <input type="checkbox" class="task-checkbox" checked>
                        <div class="task-content">
                            <div class="task-content-title">Process Order - Client XYZ</div>
                            <div class="task-content-meta">Assigned: Agent 2</div>
                        </div>
                        <span class="task-priority high">High</span>
                    </div>
                    <div class="task-item">
                        <input type="checkbox" class="task-checkbox">
                        <div class="task-content">
                            <div class="task-content-title">Documentation Review</div>
                            <div class="task-content-meta">Assigned: Agent 3</div>
                        </div>
                        <span class="task-priority medium">Medium</span>
                    </div>
                </div>
            </div>
        </div>

        <div id="workflow" class="tab-content" style="display: none;">
            <div class="profile-grid-2">
                <div class="profile-card">
                    <div class="profile-card-title">Step 1: Lead Assignment</div>
                    <div class="progress-bar">
                        <div class="progress-bar-fill" style="width: 100%;"></div>
                    </div>
                    <span class="status-badge active">Completed</span>
                </div>
                <div class="profile-card">
                    <div class="profile-card-title">Step 2: Initial Contact</div>
                    <div class="progress-bar">
                        <div class="progress-bar-fill" style="width: 75%;"></div>
                    </div>
                    <span class="status-badge active">In Progress</span>
                </div>
                <div class="profile-card">
                    <div class="profile-card-title">Step 3: Negotiation</div>
                    <div class="progress-bar">
                        <div class="progress-bar-fill" style="width: 40%;"></div>
                    </div>
                    <span class="status-badge pending">Pending</span>
                </div>
                <div class="profile-card">
                    <div class="profile-card-title">Step 4: Closure</div>
                    <div class="progress-bar">
                        <div class="progress-bar-fill" style="width: 0%;"></div>
                    </div>
                    <span class="status-badge inactive">Not Started</span>
                </div>
            </div>
        </div>
    `;
};

const renderAgentContent = (data, container) => {
    const m = data.metrics;

    container.innerHTML = `
        <div class="profile-tabs">
            <button class="profile-tab active" onclick="switchTab('dashboard')">Dashboard</button>
            <button class="profile-tab" onclick="switchTab('tasks')">My Tasks</button>
            <button class="profile-tab" onclick="switchTab('progress')">Progress</button>
            <button class="profile-tab" onclick="switchTab('timeline')">Timeline</button>
        </div>

        <div id="dashboard" class="tab-content">
            <div class="profile-grid">
                <div class="profile-card">
                    <div class="profile-card-title"><i class="fas fa-tasks"></i> Task Summary</div>
                    <div class="metric">
                        <span class="metric-label">Assigned</span>
                        <span class="metric-value">${m.tasksAssigned}</span>
                    </div>
                    <div class="metric">
                        <span class="metric-label">Completed</span>
                        <span class="metric-value success">${m.completed}</span>
                    </div>
                    <div class="metric">
                        <span class="metric-label">Pending</span>
                        <span class="metric-value warning">${m.pending}</span>
                    </div>
                </div>

                <div class="profile-card">
                    <div class="profile-card-title"><i class="fas fa-chart-line"></i> Performance</div>
                    <div class="metric">
                        <span class="metric-label">Completion Rate</span>
                        <span class="metric-value success">${m.completionRate}%</span>
                    </div>
                    <div class="progress-bar">
                        <div class="progress-bar-fill" style="width: ${m.completionRate}%"></div>
                    </div>
                    <div class="metric" style="margin-top: 12px;">
                        <span class="metric-label">Status</span>
                        <span class="status-badge active">On Track</span>
                    </div>
                </div>

                <div class="profile-card">
                    <div class="profile-card-title"><i class="fas fa-clipboard-list"></i> Today's Action</div>
                    <div style="display: flex; flex-direction: column; gap: 8px;">
                        <button class="btn-action" style="width: 100%; text-align: left;">View Leads</button>
                        <button class="btn-action" style="width: 100%; text-align: left;">Submit EOD Report</button>
                    </div>
                </div>
            </div>

            <div class="profile-card">
                <div class="profile-card-title"><i class="fas fa-inbox"></i> Inquiry/Lead Management</div>
                <table class="profile-table">
                    <thead>
                        <tr>
                            <th>Inquiry ID</th>
                            <th>Status</th>
                            <th>Progress</th>
                            <th>Due</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>INQ-001</td>
                            <td><span class="status-badge active">In Progress</span></td>
                            <td>75%</td>
                            <td>Today</td>
                        </tr>
                        <tr>
                            <td>INQ-002</td>
                            <td><span class="status-badge active">In Progress</span></td>
                            <td>50%</td>
                            <td>Tomorrow</td>
                        </tr>
                        <tr>
                            <td>INQ-003</td>
                            <td><span class="status-badge pending">Pending</span></td>
                            <td>0%</td>
                            <td>Next week</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <div id="tasks" class="tab-content" style="display: none;">
            <div class="profile-card">
                <div class="profile-card-title"><i class="fas fa-list"></i> My Tasks</div>
                <div class="task-list">
                    <div class="task-item">
                        <input type="checkbox" class="task-checkbox" checked>
                        <div class="task-content">
                            <div class="task-content-title">Follow-up Call - Lead #001</div>
                            <div class="task-content-meta">Started 2 hours ago</div>
                        </div>
                        <span class="task-priority high">High</span>
                    </div>
                    <div class="task-item">
                        <input type="checkbox" class="task-checkbox" checked>
                        <div class="task-content">
                            <div class="task-content-title">Send Proposal Document</div>
                            <div class="task-content-meta">Due today</div>
                        </div>
                        <span class="task-priority high">High</span>
                    </div>
                    <div class="task-item">
                        <input type="checkbox" class="task-checkbox">
                        <div class="task-content">
                            <div class="task-content-title">Schedule Demo Meeting</div>
                            <div class="task-content-meta">Due tomorrow</div>
                        </div>
                        <span class="task-priority medium">Medium</span>
                    </div>
                </div>
            </div>
        </div>

        <div id="progress" class="tab-content" style="display: none;">
            <div class="profile-grid-2">
                <div class="profile-card">
                    <div class="profile-card-title">Step 1: Initial Contact</div>
                    <div class="progress-bar">
                        <div class="progress-bar-fill" style="width: 100%;"></div>
                    </div>
                    <span class="status-badge active">Completed</span>
                </div>
                <div class="profile-card">
                    <div class="profile-card-title">Step 2: Requirement Analysis</div>
                    <div class="progress-bar">
                        <div class="progress-bar-fill" style="width: 100%;"></div>
                    </div>
                    <span class="status-badge active">Completed</span>
                </div>
                <div class="profile-card">
                    <div class="profile-card-title">Step 3: Proposal Sent</div>
                    <div class="progress-bar">
                        <div class="progress-bar-fill" style="width: 60%;"></div>
                    </div>
                    <span class="status-badge active">In Progress</span>
                </div>
                <div class="profile-card">
                    <div class="profile-card-title">Step 4: Negotiation</div>
                    <div class="progress-bar">
                        <div class="progress-bar-fill" style="width: 0%;"></div>
                    </div>
                    <span class="status-badge inactive">Not Started</span>
                </div>
            </div>
        </div>

        <div id="timeline" class="tab-content" style="display: none;">
            <div class="profile-card">
                <div class="profile-card-title"><i class="fas fa-history"></i> Activity Timeline</div>
                <div class="activity-list">
                    <div class="activity-item">
                        <div class="activity-icon">📞</div>
                        <div class="activity-content">
                            <h4>Initial Client Call</h4>
                            <p>Discussed requirements with client XYZ</p>
                            <p style="color: var(--grey-300); font-size: 12px;">Today at 10:30 AM</p>
                        </div>
                    </div>
                    <div class="activity-item">
                        <div class="activity-icon">📧</div>
                        <div class="activity-content">
                            <h4>Proposal Sent</h4>
                            <p>Sent detailed proposal and pricing details</p>
                            <p style="color: var(--grey-300); font-size: 12px;">Today at 2:15 PM</p>
                        </div>
                    </div>
                    <div class="activity-item">
                        <div class="activity-icon">✅</div>
                        <div class="activity-content">
                            <h4>EOD Report Submitted</h4>
                            <p>Daily progress report for today completed</p>
                            <p style="color: var(--grey-300); font-size: 12px;">Yesterday at 5:00 PM</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
};

const setupSidebar = (role, dept) => {
    const sidebar = document.querySelector('.profile-sidebar');
    if (!sidebar) return;

    const deptData = profilesData.departments[dept];

    sidebar.innerHTML = `
        <div class="profile-sidebar-header">
            <div class="profile-sidebar-logo">W</div>
            <div class="profile-sidebar-brand">Wolf Tech</div>
        </div>
        <nav class="profile-nav">
            <a href="?role=${role}&dept=${dept}" class="profile-nav-item active">
                <i class="fas fa-home"></i> My Profile
            </a>
            <a href="index.html" class="profile-nav-item">
                <i class="fas fa-th"></i> Dashboard
            </a>
            <a href="#" class="profile-nav-item">
                <i class="fas fa-chart-bar"></i> Analytics
            </a>
            <a href="#" class="profile-nav-item">
                <i class="fas fa-file-alt"></i> Reports
            </a>
            <a href="#" class="profile-nav-item">
                <i class="fas fa-cog"></i> Settings
            </a>
            <a href="index.html" class="profile-nav-item">
                <i class="fas fa-sign-out-alt"></i> Logout
            </a>
        </nav>
    `;
};

const switchTab = (tabName) => {
    const tabs = document.querySelectorAll('.profile-tab');
    const contents = document.querySelectorAll('.tab-content');

    contents.forEach(content => content.style.display = 'none');
    tabs.forEach(tab => tab.classList.remove('active'));

    const activeTab = Array.from(tabs).find(t => t.textContent.toLowerCase().includes(tabName));
    const activeContent = document.getElementById(tabName);

    if (activeTab) activeTab.classList.add('active');
    if (activeContent) activeContent.style.display = 'block';
};

const editProfile = () => {
    alert('Edit profile functionality would open a modal form here.');
};

const downloadReport = () => {
    alert('Report download initiated. The system would generate and download a PDF report.');
};

const generateReport = (type) => {
    alert(`${type.charAt(0).toUpperCase() + type.slice(1)} report generated successfully!`);
};

document.addEventListener('DOMContentLoaded', initializeProfilePage);
