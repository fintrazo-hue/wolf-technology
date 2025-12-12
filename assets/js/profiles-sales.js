const SalesProfileModule = (() => {
  const LS_PREFIX = 'wt_sales_';
  const METRICS_TTL = 10 * 60 * 1000;

  const getUserFromUrl = () => {
    const params = new URLSearchParams(window.location.search);
    return params.get('userId');
  };

  const loadMockData = async () => {
    try {
      if (typeof mockData !== 'undefined') {
        return {
          employees: [
            ...mockData.agents.map(a => ({ ...a, id: a.id, position: 'agent', name: a.firstName + ' ' + a.lastName })),
            ...mockData.teamLeaders.map(tl => ({ ...tl, position: 'team_leader' })),
            ...mockData.managers.map(m => ({ ...m, id: m.id, position: 'manager', name: m.firstName + ' ' + m.lastName }))
          ],
          leads: mockData.leads || [],
          activityLogs: mockData.activityLogs || []
        };
      }
      if (typeof MOCK_DATA !== 'undefined') {
        return MOCK_DATA;
      }
      const response = await fetch('/data/leads.json');
      if (!response.ok) throw new Error('Failed to load mock data');
      return await response.json();
    } catch (error) {
      console.warn('Mock data not found:', error);
      return {
        employees: [],
        leads: [],
        activityLogs: []
      };
    }
  };

  const computeInactivity = (lead) => {
    const lastActivity = new Date(lead.lastActivity || lead.last_activity_at);
    const now = new Date();
    const hours = Math.floor((now - lastActivity) / (1000 * 60 * 60));
    return hours;
  };

  const getInactivityColor = (hours) => {
    if (hours < 24) return '#10B981';
    if (hours < 48) return '#F59E0B';
    if (hours < 72) return '#EA8C55';
    return '#EF4444';
  };

  const getInactivityLabel = (hours) => {
    if (hours < 1) return 'Just now';
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  };

  const formatDate = (dateStr) => {
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch {
      return dateStr;
    }
  };

  const getStatusChip = (status) => {
    const statusMap = {
      active: { label: 'Active', color: '#10B981' },
      on_leave: { label: 'On Leave', color: '#F59E0B' },
      inactive: { label: 'Inactive', color: '#EF4444' }
    };
    return statusMap[status?.toLowerCase()] || { label: status, color: '#6B6B6B' };
  };

  const computeMetrics = (user, leads) => {
    const userLeads = leads.filter(l => l.assignedTo === user.id || l.assignedTo === String(user.id));

    const stageDistribution = {
      'new': userLeads.filter(l => l.stage === 'new' || l.stage === 'lead_generation').length,
      'contacted': userLeads.filter(l => l.stage === 'contacted' || l.stage === 'initial_contact').length,
      'qualified': userLeads.filter(l => l.stage === 'qualified').length,
      'proposal': userLeads.filter(l => l.stage === 'proposal').length,
      'negotiation': userLeads.filter(l => l.stage === 'negotiation').length,
      'closing': userLeads.filter(l => l.stage === 'closing').length,
      'won': userLeads.filter(l => l.stage === 'won' || l.stage === 'closed').length,
      'lost': userLeads.filter(l => l.stage === 'lost').length
    };

    const assignedCount = userLeads.length;
    const contactedCount = stageDistribution.contacted;
    const qualifiedCount = stageDistribution.qualified;
    const proposalCount = stageDistribution.proposal;
    const wonCount = stageDistribution.won;
    const lostCount = stageDistribution.lost;

    const openFollowups = userLeads.filter(l => l.next_followup_at && new Date(l.next_followup_at) > new Date()).length;
    const inactiveLeads = userLeads.filter(l => computeInactivity(l) > 48);
    const inactivityCount = inactiveLeads.length;
    const overdueFollowups = userLeads.filter(l => l.next_followup_at && new Date(l.next_followup_at) < new Date()).length;

    const avgResponseTime = userLeads.length > 0
      ? Math.round(userLeads.reduce((sum, l) => sum + (computeInactivity(l) || 0), 0) / userLeads.length)
      : 0;

    const conversionRate = assignedCount > 0
      ? Math.round((qualifiedCount / assignedCount) * 100)
      : 0;

    const winRate = assignedCount > 0
      ? Math.round((wonCount / assignedCount) * 100)
      : 0;

    const activityScore = Math.min(100, Math.max(0, 100 - (avgResponseTime / 10)));

    return {
      assignedCount,
      contactedCount,
      qualifiedCount,
      proposalCount,
      wonCount,
      lostCount,
      openFollowups,
      inactivityCount,
      overdueFollowups,
      avgResponseTime,
      conversionRate,
      winRate,
      activityScore,
      stageDistribution,
      inactiveLeads,
      userLeads
    };
  };

  const renderPerformanceCards = (container, metrics) => {
    if (!container) return;

    const cards = `
      <div class="sales-perf-grid">
        <div class="sales-perf-card">
          <div class="sales-perf-icon" style="background: #E0F2FE;"><i class="fas fa-list" style="color: #0284C7;"></i></div>
          <div class="sales-perf-content">
            <p class="sales-perf-label">Total Leads</p>
            <p class="sales-perf-value">${metrics.assignedCount}</p>
          </div>
        </div>

        <div class="sales-perf-card">
          <div class="sales-perf-icon" style="background: #F0FDF4;"><i class="fas fa-phone" style="color: #10B981;"></i></div>
          <div class="sales-perf-content">
            <p class="sales-perf-label">Contacted</p>
            <p class="sales-perf-value">${metrics.contactedCount}</p>
          </div>
        </div>

        <div class="sales-perf-card">
          <div class="sales-perf-icon" style="background: #FEF3C7;"><i class="fas fa-check-circle" style="color: #F59E0B;"></i></div>
          <div class="sales-perf-content">
            <p class="sales-perf-label">Qualified</p>
            <p class="sales-perf-value">${metrics.qualifiedCount}</p>
          </div>
        </div>

        <div class="sales-perf-card">
          <div class="sales-perf-icon" style="background: #F3E8FF;"><i class="fas fa-file-alt" style="color: #7C3AED;"></i></div>
          <div class="sales-perf-content">
            <p class="sales-perf-label">Proposals</p>
            <p class="sales-perf-value">${metrics.proposalCount}</p>
          </div>
        </div>

        <div class="sales-perf-card">
          <div class="sales-perf-icon" style="background: #ECFDF5;"><i class="fas fa-trophy" style="color: #059669;"></i></div>
          <div class="sales-perf-content">
            <p class="sales-perf-label">Won</p>
            <p class="sales-perf-value">${metrics.wonCount}</p>
          </div>
        </div>

        <div class="sales-perf-card">
          <div class="sales-perf-icon" style="background: #FEF2F2;"><i class="fas fa-times-circle" style="color: #DC2626;"></i></div>
          <div class="sales-perf-content">
            <p class="sales-perf-label">Lost</p>
            <p class="sales-perf-value">${metrics.lostCount}</p>
          </div>
        </div>

        <div class="sales-perf-card">
          <div class="sales-perf-icon" style="background: #FEF2F2;"><i class="fas fa-bell" style="color: #EF4444;"></i></div>
          <div class="sales-perf-content">
            <p class="sales-perf-label">Overdue Follow-ups</p>
            <p class="sales-perf-value">${metrics.overdueFollowups}</p>
          </div>
        </div>

        <div class="sales-perf-card">
          <div class="sales-perf-icon" style="background: #FEFCE8;"><i class="fas fa-stopwatch" style="color: #F59E0B;"></i></div>
          <div class="sales-perf-content">
            <p class="sales-perf-label">Avg Response</p>
            <p class="sales-perf-value">${Math.floor(metrics.avgResponseTime / 24)}d</p>
          </div>
        </div>
      </div>
    `;

    container.innerHTML = cards;
  };

  const renderPipelineChart = (container, metrics) => {
    if (!container) return;

    const stages = metrics.stageDistribution;
    const maxValue = Math.max(...Object.values(stages), 1);
    const colors = ['#6B7280', '#0284C7', '#3B82F6', '#8B5CF6', '#EC4899', '#F43F5E', '#10B981', '#EF4444'];

    let chart = '<div class="sales-pipeline-chart">';
    Object.entries(stages).forEach(([stage, count], idx) => {
      const percentage = (count / maxValue) * 100;
      const label = stage.replace(/_/g, ' ').toUpperCase();
      chart += `
        <div class="sales-chart-bar">
          <div class="sales-chart-label">${label}</div>
          <div class="sales-chart-value">
            <div class="sales-bar-container">
              <div class="sales-bar" style="width: ${percentage}%; background: ${colors[idx % colors.length]};"></div>
            </div>
            <span>${count}</span>
          </div>
        </div>
      `;
    });
    chart += '</div>';

    container.innerHTML = chart;
  };

  const renderLeadsTable = (container, leads) => {
    if (!container) return;

    let html = `
      <div class="sales-table-container">
        <div class="sales-table-header">
          <input type="text" id="sales-search-input" class="sales-search-input" placeholder="Search leads...">
          <button id="sales-filter-inactive" class="sales-filter-btn">
            <i class="fas fa-filter"></i> Inactive
          </button>
        </div>
        <table class="sales-leads-table">
          <thead>
            <tr>
              <th>Lead</th>
              <th>Client</th>
              <th>Stage</th>
              <th>Last Activity</th>
              <th>Next Follow-up</th>
              <th>Delay</th>
              <th>Priority</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody id="sales-leads-body">
    `;

    leads.forEach(lead => {
      const inactiveHours = computeInactivity(lead);
      const inactiveColor = getInactivityColor(inactiveHours);
      const inactiveLabel = getInactivityLabel(inactiveHours);
      const priorityColor = {
        'high': '#EF4444',
        'medium': '#F59E0B',
        'low': '#10B981'
      }[lead.priority] || '#6B6B6B';

      html += `
        <tr class="sales-table-row" data-lead-id="${lead.id}">
          <td><strong>${lead.name || lead.title}</strong></td>
          <td>${lead.company || lead.client_name}</td>
          <td><span class="sales-stage-badge">${lead.stage}</span></td>
          <td>${getInactivityLabel(inactiveHours)}</td>
          <td>${lead.next_followup_at ? formatDate(lead.next_followup_at) : '-'}</td>
          <td><span class="sales-delay-badge" style="background: ${inactiveColor}; color: white;">${inactiveLabel}</span></td>
          <td><span style="color: ${priorityColor}; font-weight: 600;">${lead.priority?.toUpperCase()}</span></td>
          <td>
            <button class="sales-action-btn sales-view-lead" data-lead-id="${lead.id}" title="View Lead">
              <i class="fas fa-eye"></i>
            </button>
          </td>
        </tr>
      `;
    });

    html += `
          </tbody>
        </table>
      </div>
    `;

    container.innerHTML = html;
    setupTableInteractions(leads);
  };

  const setupTableInteractions = (leads) => {
    const searchInput = document.getElementById('sales-search-input');
    const filterBtn = document.getElementById('sales-filter-inactive');
    let showOnlyInactive = false;

    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        const rows = document.querySelectorAll('.sales-table-row');
        rows.forEach(row => {
          const text = row.textContent.toLowerCase();
          const matchesSearch = text.includes(query);
          const isInactive = computeInactivity(leads.find(l => l.id === row.dataset.leadId)) > 48;
          const shouldShow = matchesSearch && (!showOnlyInactive || isInactive);
          row.style.display = shouldShow ? '' : 'none';
        });
      });
    }

    if (filterBtn) {
      filterBtn.addEventListener('click', () => {
        showOnlyInactive = !showOnlyInactive;
        filterBtn.classList.toggle('active');
        const rows = document.querySelectorAll('.sales-table-row');
        rows.forEach(row => {
          const lead = leads.find(l => l.id === row.dataset.leadId);
          if (!lead) return;
          const isInactive = computeInactivity(lead) > 48;
          row.style.display = (showOnlyInactive && !isInactive) ? 'none' : '';
        });
      });
    }

    document.querySelectorAll('.sales-view-lead').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const leadId = e.currentTarget.dataset.leadId;
        openLeadModal(leads.find(l => l.id === leadId));
      });
    });
  };

  const openLeadModal = (lead) => {
    if (!lead) return;

    const modal = document.createElement('div');
    modal.className = 'sales-modal';
    modal.innerHTML = `
      <div class="sales-modal-content">
        <div class="sales-modal-header">
          <h2>${lead.name || lead.title}</h2>
          <button class="sales-modal-close"><i class="fas fa-times"></i></button>
        </div>
        <div class="sales-modal-body">
          <div class="sales-modal-section">
            <h3>Lead Details</h3>
            <div class="sales-modal-grid">
              <div><strong>Client:</strong> ${lead.company || lead.client_name}</div>
              <div><strong>Email:</strong> ${lead.email}</div>
              <div><strong>Phone:</strong> ${lead.phone}</div>
              <div><strong>Stage:</strong> ${lead.stage}</div>
              <div><strong>Priority:</strong> ${lead.priority}</div>
              <div><strong>Value:</strong> ₹${(lead.value || 0).toLocaleString()}</div>
              <div><strong>Progress:</strong> ${lead.progress || 0}%</div>
              <div><strong>Created:</strong> ${formatDate(lead.created_at || new Date().toISOString())}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="sales-modal-overlay"></div>
    `;

    document.body.appendChild(modal);

    const closeBtn = modal.querySelector('.sales-modal-close');
    const overlay = modal.querySelector('.sales-modal-overlay');

    closeBtn.addEventListener('click', () => modal.remove());
    overlay.addEventListener('click', () => modal.remove());
  };

  const renderInactivityTracker = (container, metrics) => {
    if (!container) return;

    const inactiveLeads = metrics.inactiveLeads.sort((a, b) =>
      computeInactivity(b) - computeInactivity(a)
    ).slice(0, 5);

    let html = '<div class="sales-inactivity-tracker">';
    html += '<h3 class="sales-section-title">Top 5 Inactive Leads</h3>';

    if (inactiveLeads.length === 0) {
      html += '<p style="text-align: center; color: #6B6B6B; padding: 20px;">No inactive leads</p>';
    } else {
      inactiveLeads.forEach(lead => {
        const hours = computeInactivity(lead);
        const color = getInactivityColor(hours);
        const label = getInactivityLabel(hours);

        html += `
          <div class="sales-inactivity-item">
            <div style="flex: 1;">
              <p class="sales-inactivity-lead">${lead.name || lead.title}</p>
              <p class="sales-inactivity-stage">${lead.stage}</p>
            </div>
            <div style="display: flex; align-items: center; gap: 12px;">
              <span class="sales-inactivity-badge" style="background: ${color}; color: white;">
                ${label}
              </span>
            </div>
          </div>
        `;
      });
    }

    html += '</div>';
    container.innerHTML = html;
  };

  const renderActivityTimeline = (container, leads) => {
    if (!container) return;

    const activities = [];
    leads.forEach(lead => {
      if (lead.lastActivity) {
        activities.push({
          type: 'activity',
          timestamp: lead.lastActivity,
          text: `Activity on ${lead.name || lead.title}`,
          lead
        });
      }
    });

    activities.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    const recent = activities.slice(0, 10);

    let html = '<div class="sales-timeline">';
    recent.forEach(activity => {
      const date = new Date(activity.timestamp);
      const timeStr = date.toLocaleString('en-IN', { hour: '2-digit', minute: '2-digit', day: 'numeric', month: 'short' });
      html += `
        <div class="sales-timeline-item">
          <div class="sales-timeline-marker"></div>
          <div class="sales-timeline-content">
            <p>${activity.text}</p>
            <small>${timeStr}</small>
          </div>
        </div>
      `;
    });
    html += '</div>';

    container.innerHTML = html;
  };

  const renderTargetsModule = (container, user) => {
    if (!container) return;

    const userId = user.id;
    const targetKey = `${LS_PREFIX}target_${userId}`;
    const currentTarget = parseInt(localStorage.getItem(targetKey) || '50', 10);
    const achieved = Math.floor(Math.random() * currentTarget);
    const percentage = Math.round((achieved / currentTarget) * 100);

    let html = `
      <div class="sales-targets-module">
        <div class="sales-targets-header">
          <h3>Monthly Targets</h3>
          <button id="sales-edit-target" class="sales-btn-secondary" style="padding: 6px 12px; font-size: 13px;">
            <i class="fas fa-edit"></i> Edit
          </button>
        </div>
        <div class="sales-targets-content">
          <div class="sales-target-item">
            <div class="sales-target-info">
              <p class="sales-target-label">Leads Target</p>
              <p class="sales-target-value">${achieved} / ${currentTarget}</p>
            </div>
            <div class="sales-target-bar">
              <div class="sales-target-progress" style="width: ${percentage}%;"></div>
            </div>
            <p class="sales-target-percent">${percentage}% Achieved</p>
          </div>
        </div>
      </div>
    `;

    container.innerHTML = html;

    document.getElementById('sales-edit-target')?.addEventListener('click', () => {
      const newTarget = prompt('Enter new monthly target:', currentTarget);
      if (newTarget && !isNaN(newTarget)) {
        localStorage.setItem(targetKey, newTarget);
        renderTargetsModule(container, user);
      }
    });
  };

  const showToast = (message) => {
    const toast = document.createElement('div');
    toast.className = 'sales-toast';
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => {
      toast.classList.add('show');
    }, 10);
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  };

  const renderProfileHeader = (user) => {
    const nameEl = document.getElementById('profile-name');
    const roleEl = document.getElementById('profile-role');
    const emailEl = document.getElementById('info-email');
    const phoneEl = document.getElementById('info-phone');
    const joinedEl = document.getElementById('info-joined');
    const statusEl = document.getElementById('info-status');

    if (nameEl) nameEl.textContent = user.name;
    if (roleEl) roleEl.textContent = 'Sales Agent';
    if (emailEl) emailEl.textContent = user.email;
    if (phoneEl) phoneEl.textContent = user.phone;
    if (joinedEl) joinedEl.textContent = formatDate(user.joinDate || new Date().toISOString());

    if (statusEl) {
      const statusInfo = getStatusChip(user.status);
      statusEl.innerHTML = `<span style="color: ${statusInfo.color}; font-weight: 600;">${statusInfo.label}</span>`;
    }
  };

  const renderTeamTable = (container, users, leads) => {
    if (!container) return;

    let html = `
      <table class="sales-team-table">
        <thead>
          <tr>
            <th>Agent Name</th>
            <th>Assigned</th>
            <th>Qualified</th>
            <th>Won</th>
            <th>Lost</th>
            <th>Inactive</th>
            <th>Activity Score</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
    `;

    users.forEach(user => {
      const metrics = computeMetrics(user, leads);
      html += `
        <tr>
          <td><strong>${user.name}</strong></td>
          <td>${metrics.assignedCount}</td>
          <td>${metrics.qualifiedCount}</td>
          <td>${metrics.wonCount}</td>
          <td>${metrics.lostCount}</td>
          <td><span style="color: ${metrics.inactivityCount > 3 ? '#EF4444' : '#10B981'};">${metrics.inactivityCount}</span></td>
          <td><strong>${Math.round(metrics.activityScore)}</strong></td>
          <td>
            <button class="sales-action-btn sales-view-agent" data-user-id="${user.id}" title="View Profile">
              <i class="fas fa-user-circle"></i>
            </button>
          </td>
        </tr>
      `;
    });

    html += `
        </tbody>
      </table>
    `;

    container.innerHTML = html;

    document.querySelectorAll('.sales-view-agent').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const userId = e.currentTarget.dataset.userId;
        window.location.href = `profile-sales-agent.html?userId=${userId}`;
      });
    });
  };

  const renderDepartmentStats = (container, data) => {
    if (!container) return;

    const salesLeads = data.leads.filter(l => l.department === 'sales');
    const qualified = salesLeads.filter(l => l.stage === 'qualified').length;
    const won = salesLeads.filter(l => l.stage === 'won' || l.stage === 'closing').length;
    const avgResTime = salesLeads.length > 0
      ? Math.round(salesLeads.reduce((sum, l) => sum + computeInactivity(l), 0) / salesLeads.length)
      : 0;

    let html = `
      <div class="sales-perf-grid-compact">
        <div class="sales-perf-card">
          <div class="sales-perf-icon" style="background: #E0F2FE;"><i class="fas fa-list" style="color: #0284C7;"></i></div>
          <div class="sales-perf-content">
            <p class="sales-perf-label">Total Leads</p>
            <p class="sales-perf-value">${salesLeads.length}</p>
          </div>
        </div>
        <div class="sales-perf-card">
          <div class="sales-perf-icon" style="background: #FEF3C7;"><i class="fas fa-check-circle" style="color: #F59E0B;"></i></div>
          <div class="sales-perf-content">
            <p class="sales-perf-label">Qualified</p>
            <p class="sales-perf-value">${qualified}</p>
          </div>
        </div>
        <div class="sales-perf-card">
          <div class="sales-perf-icon" style="background: #ECFDF5;"><i class="fas fa-trophy" style="color: #059669;"></i></div>
          <div class="sales-perf-content">
            <p class="sales-perf-label">Won</p>
            <p class="sales-perf-value">${won}</p>
          </div>
        </div>
        <div class="sales-perf-card">
          <div class="sales-perf-icon" style="background: #FEFCE8;"><i class="fas fa-stopwatch" style="color: #F59E0B;"></i></div>
          <div class="sales-perf-content">
            <p class="sales-perf-label">Avg Response</p>
            <p class="sales-perf-value">${Math.floor(avgResTime / 24)}d</p>
          </div>
        </div>
      </div>
    `;

    container.innerHTML = html;
  };

  const initializeSalesAgent = async () => {
    const userId = getUserFromUrl();
    if (!userId) {
      console.error('No userId in URL');
      return;
    }

    const data = await loadMockData();
    const user = data.employees.find(e => e.id === userId || String(e.id) === String(userId));

    if (!user) {
      console.error('User not found:', userId);
      return;
    }

    const metrics = computeMetrics(user, data.leads);

    renderProfileHeader(user);
    renderPerformanceCards(document.querySelector('.sales-performance-cards'), metrics);
    renderPipelineChart(document.querySelector('.sales-pipeline-chart'), metrics);
    renderLeadsTable(document.querySelector('.sales-leads-table'), metrics.userLeads);
    renderInactivityTracker(document.querySelector('.sales-inactivity-tracker'), metrics);
    renderActivityTimeline(document.querySelector('.sales-activity-timeline'), metrics.userLeads);
    renderTargetsModule(document.querySelector('.sales-targets-module'), user);
  };

  const initializeSalesTeamLeader = async () => {
    const userId = getUserFromUrl();
    if (!userId) return;

    const data = await loadMockData();
    const teamLeader = data.employees.find(e => e.id === userId || String(e.id) === String(userId));
    if (!teamLeader) return;

    renderProfileHeader(teamLeader);

    const agents = data.employees.filter(e => e.tlId === teamLeader.id || e.teamLeaderId === teamLeader.id);

    renderTeamTable(document.querySelector('.sales-team-table'), agents, data.leads);

    const metrics = computeMetrics(teamLeader, data.leads);
    renderPerformanceCards(document.querySelector('.sales-performance-cards'), metrics);
    renderPipelineChart(document.querySelector('.sales-pipeline-chart'), metrics);
    renderLeadsTable(document.querySelector('.sales-leads-table'), metrics.userLeads);
    renderInactivityTracker(document.querySelector('.sales-inactivity-tracker'), metrics);
    renderActivityTimeline(document.querySelector('.sales-activity-timeline'), metrics.userLeads);
    renderTargetsModule(document.querySelector('.sales-targets-module'), teamLeader);
  };

  const initializeSalesManager = async () => {
    const data = await loadMockData();
    const manager = data.employees.find(e => e.department === 'Sales' && e.position === 'manager');

    if (!manager) {
      console.error('Sales Manager not found');
      return;
    }

    renderProfileHeader(manager);

    const teamLeaders = data.employees.filter(e => e.department === 'Sales' && e.position === 'team_leader');
    renderTeamTable(document.querySelector('.sales-manager-tl-table'), teamLeaders, data.leads);
    renderDepartmentStats(document.getElementById('dept-stats'), data);
    renderPipelineChart(document.querySelector('.sales-department-pipeline'), computeMetrics(manager, data.leads));
  };

  return {
    initSalesAgent: initializeSalesAgent,
    initSalesTeamLeader: initializeSalesTeamLeader,
    initSalesManager: initializeSalesManager,
    computeMetrics,
    computeInactivity
  };
})();

if (document.currentScript?.src.includes('profiles-sales.js')) {
  const path = window.location.pathname;
  if (path.includes('profile-sales-agent')) {
    document.addEventListener('DOMContentLoaded', () => SalesProfileModule.initSalesAgent());
  } else if (path.includes('profile-sales-teamleader')) {
    document.addEventListener('DOMContentLoaded', () => SalesProfileModule.initSalesTeamLeader());
  } else if (path.includes('profile-sales-manager')) {
    document.addEventListener('DOMContentLoaded', () => SalesProfileModule.initSalesManager());
  }
}
