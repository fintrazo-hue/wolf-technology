const BDProfileModule = (() => {
  const LS_PREFIX = 'wt_bd_';
  const METRICS_TTL = 10 * 60 * 1000;

  const getUserFromUrl = () => {
    const params = new URLSearchParams(window.location.search);
    return params.get('userId');
  };

  const loadMockData = async () => {
    try {
      if (typeof mockData !== 'undefined' && mockData.employees) {
        const bdEmployees = mockData.employees.filter(e => e.department === 'business_development');
        return {
          employees: bdEmployees,
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
      console.warn('Mock data not found, using demo fallback:', error);
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
    return statusMap[status] || { label: status, color: '#6B6B6B' };
  };

  const computeMetrics = (user, leads) => {
    const userLeads = leads.filter(l => l.assignedTo === user.id || l.assignedTo === String(user.id));

    const assignedCount = userLeads.length;
    const closedCount = userLeads.filter(l => l.stage === 'closing' || l.status === 'closed').length;
    const openFollowups = userLeads.filter(l => l.next_followup_at && new Date(l.next_followup_at) > new Date()).length;

    const inactiveLeads = userLeads.filter(l => computeInactivity(l) > 48);
    const inactivityCount = inactiveLeads.length;

    const avgResponseTime = userLeads.length > 0
      ? Math.round(userLeads.reduce((sum, l) => sum + (computeInactivity(l) || 0), 0) / userLeads.length)
      : 0;

    const activityScore = Math.min(100, Math.max(0, 100 - (avgResponseTime / 10)));

    const stageDistribution = {
      'initial_contact': userLeads.filter(l => l.stage === 'initial_contact').length,
      'discovery': userLeads.filter(l => l.stage === 'discovery').length,
      'qualification': userLeads.filter(l => l.stage === 'qualification').length,
      'proposal': userLeads.filter(l => l.stage === 'proposal').length,
      'negotiation': userLeads.filter(l => l.stage === 'negotiation').length,
      'closing': userLeads.filter(l => l.stage === 'closing').length
    };

    return {
      assignedCount,
      closedCount,
      openFollowups,
      inactivityCount,
      inactiveLeads,
      avgResponseTime,
      activityScore,
      stageDistribution,
      userLeads
    };
  };

  const getActivityTrend = (leads, days = 7) => {
    const trend = Array(days).fill(0);
    const now = new Date();

    leads.forEach(lead => {
      const lastActivity = new Date(lead.lastActivity || lead.last_activity_at);
      const daysAgo = Math.floor((now - lastActivity) / (1000 * 60 * 60 * 24));
      if (daysAgo < days) {
        trend[days - 1 - daysAgo]++;
      }
    });

    return trend;
  };

  const renderPerformanceCards = (container, metrics, user) => {
    if (!container) return;

    const cards = `
      <div class="bd-performance-grid">
        <div class="bd-perf-card">
          <div class="bd-perf-icon" style="background: #E0F2FE;">
            <i class="fas fa-tasks" style="color: #0284C7;"></i>
          </div>
          <div class="bd-perf-content">
            <p class="bd-perf-label">Assigned Leads</p>
            <p class="bd-perf-value">${metrics.assignedCount}</p>
          </div>
        </div>

        <div class="bd-perf-card">
          <div class="bd-perf-icon" style="background: #F0FDF4;">
            <i class="fas fa-check-circle" style="color: #10B981;"></i>
          </div>
          <div class="bd-perf-content">
            <p class="bd-perf-label">Closed / Converted</p>
            <p class="bd-perf-value">${metrics.closedCount}</p>
          </div>
        </div>

        <div class="bd-perf-card">
          <div class="bd-perf-icon" style="background: #FEF2F2;">
            <i class="fas fa-exclamation-circle" style="color: #EF4444;"></i>
          </div>
          <div class="bd-perf-content">
            <p class="bd-perf-label">Inactive (>48h)</p>
            <p class="bd-perf-value">${metrics.inactivityCount}</p>
          </div>
        </div>

        <div class="bd-perf-card">
          <div class="bd-perf-icon" style="background: #FEFCE8;">
            <i class="fas fa-clock" style="color: #F59E0B;"></i>
          </div>
          <div class="bd-perf-content">
            <p class="bd-perf-label">Avg Response Time</p>
            <p class="bd-perf-value">${Math.floor(metrics.avgResponseTime / 24)}d</p>
          </div>
        </div>

        <div class="bd-perf-card">
          <div class="bd-perf-icon" style="background: #F3E8FF;">
            <i class="fas fa-chart-pie" style="color: #7C3AED;"></i>
          </div>
          <div class="bd-perf-content">
            <p class="bd-perf-label">Activity Score</p>
            <div style="display: flex; align-items: center; gap: 8px;">
              <div class="bd-progress-ring" style="width: 40px; height: 40px;">
                <svg viewBox="0 0 100 100" style="width: 100%; height: 100%; transform: rotate(-90deg);">
                  <circle cx="50" cy="50" r="45" fill="none" stroke="#E5E7EB" stroke-width="8"/>
                  <circle cx="50" cy="50" r="45" fill="none" stroke="#F4D03F" stroke-width="8"
                    stroke-dasharray="${metrics.activityScore * 2.83}" stroke-dashoffset="0"
                    style="transition: stroke-dasharray 0.3s ease;"/>
                </svg>
                <span style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); font-size: 10px; font-weight: bold;">${Math.round(metrics.activityScore)}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="bd-perf-card">
          <div class="bd-perf-icon" style="background: #FCE7F3;">
            <i class="fas fa-bell" style="color: #EC4899;"></i>
          </div>
          <div class="bd-perf-content">
            <p class="bd-perf-label">Open Follow-ups</p>
            <p class="bd-perf-value">${metrics.openFollowups}</p>
          </div>
        </div>
      </div>
    `;

    container.innerHTML = cards;
  };

  const renderStageChart = (container, metrics) => {
    if (!container) return;

    const stages = metrics.stageDistribution;
    const maxValue = Math.max(...Object.values(stages), 1);
    const colors = ['#0284C7', '#3B82F6', '#8B5CF6', '#EC4899', '#F43F5E', '#F4D03F'];

    let chart = '<div class="bd-stage-chart">';
    Object.entries(stages).forEach(([stage, count], idx) => {
      const percentage = (count / maxValue) * 100;
      const label = stage.replace(/_/g, ' ').toUpperCase();
      chart += `
        <div class="bd-chart-bar">
          <div class="bd-chart-label">${label}</div>
          <div class="bd-chart-value">
            <div class="bd-bar-container">
              <div class="bd-bar" style="width: ${percentage}%; background: ${colors[idx % colors.length]};"></div>
            </div>
            <span>${count}</span>
          </div>
        </div>
      `;
    });
    chart += '</div>';

    container.innerHTML = chart;
  };

  const renderInactivityTracker = (container, metrics) => {
    if (!container) return;

    const inactiveLeads = metrics.inactiveLeads.sort((a, b) =>
      computeInactivity(b) - computeInactivity(a)
    ).slice(0, 5);

    let html = '<div class="bd-inactivity-tracker">';
    html += '<h3 class="bd-section-title">Top 5 Inactive Leads</h3>';

    if (inactiveLeads.length === 0) {
      html += '<p style="text-align: center; color: #6B6B6B; padding: 20px;">No inactive leads</p>';
    } else {
      inactiveLeads.forEach(lead => {
        const hours = computeInactivity(lead);
        const color = getInactivityColor(hours);
        const label = getInactivityLabel(hours);

        html += `
          <div class="bd-inactivity-item">
            <div style="flex: 1;">
              <p class="bd-inactivity-lead">${lead.title || lead.name}</p>
              <p class="bd-inactivity-stage">${lead.stage}</p>
            </div>
            <div style="display: flex; align-items: center; gap: 12px;">
              <span class="bd-inactivity-badge" style="background: ${color}; color: white;">
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

  const renderLeadsTable = (container, leads, user) => {
    if (!container) return;

    let html = `
      <div class="bd-table-container">
        <div class="bd-table-header">
          <input type="text" id="bd-search-input" class="bd-search-input" placeholder="Search leads...">
          <button id="bd-filter-inactive" class="bd-filter-btn">
            <i class="fas fa-filter"></i> Show Inactive
          </button>
        </div>
        <table class="bd-leads-table">
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
          <tbody id="bd-leads-body">
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
        <tr class="bd-table-row" data-lead-id="${lead.id}">
          <td><strong>${lead.title || lead.name}</strong></td>
          <td>${lead.client_name || lead.company}</td>
          <td><span class="bd-stage-badge">${lead.stage}</span></td>
          <td>${getInactivityLabel(inactiveHours)}</td>
          <td>${lead.next_followup_at ? formatDate(lead.next_followup_at) : '-'}</td>
          <td><span class="bd-delay-badge" style="background: ${inactiveColor}; color: white;">${inactiveLabel}</span></td>
          <td><span style="color: ${priorityColor}; font-weight: 600;">${lead.priority.toUpperCase()}</span></td>
          <td>
            <button class="bd-action-btn bd-view-lead" data-lead-id="${lead.id}" title="View Lead">
              <i class="fas fa-eye"></i>
            </button>
            <button class="bd-action-btn bd-add-note" data-lead-id="${lead.id}" title="Add Note">
              <i class="fas fa-plus"></i>
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
    const searchInput = document.getElementById('bd-search-input');
    const filterBtn = document.getElementById('bd-filter-inactive');
    let showOnlyInactive = false;

    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        const rows = document.querySelectorAll('.bd-table-row');
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
        const rows = document.querySelectorAll('.bd-table-row');
        rows.forEach(row => {
          const lead = leads.find(l => l.id === row.dataset.leadId);
          if (!lead) return;
          const isInactive = computeInactivity(lead) > 48;
          row.style.display = (showOnlyInactive && !isInactive) ? 'none' : '';
        });
      });
    }

    document.querySelectorAll('.bd-view-lead').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const leadId = e.currentTarget.dataset.leadId;
        openLeadModal(leads.find(l => l.id === leadId));
      });
    });

    document.querySelectorAll('.bd-add-note').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const leadId = e.currentTarget.dataset.leadId;
        addNoteToLead(leadId);
      });
    });
  };

  const openLeadModal = (lead) => {
    if (!lead) return;

    const modal = document.createElement('div');
    modal.className = 'bd-modal';
    modal.innerHTML = `
      <div class="bd-modal-content">
        <div class="bd-modal-header">
          <h2>${lead.title || lead.name}</h2>
          <button class="bd-modal-close"><i class="fas fa-times"></i></button>
        </div>
        <div class="bd-modal-body">
          <div class="bd-modal-section">
            <h3>Lead Details</h3>
            <div class="bd-modal-grid">
              <div><strong>Client:</strong> ${lead.client_name || lead.company}</div>
              <div><strong>Email:</strong> ${lead.email}</div>
              <div><strong>Phone:</strong> ${lead.phone}</div>
              <div><strong>Stage:</strong> ${lead.stage}</div>
              <div><strong>Status:</strong> ${lead.status}</div>
              <div><strong>Priority:</strong> ${lead.priority}</div>
              <div><strong>Value:</strong> ₹${(lead.value || 0).toLocaleString()}</div>
              <div><strong>Created:</strong> ${formatDate(lead.created_at)}</div>
            </div>
          </div>

          <div class="bd-modal-section">
            <h3>Activity Log</h3>
            <div id="bd-activity-log" class="bd-activity-list"></div>
          </div>

          <div class="bd-modal-section">
            <h3>Add Note</h3>
            <textarea id="bd-note-input" class="bd-note-textarea" placeholder="Add a note..."></textarea>
            <button id="bd-save-note" class="bd-btn-primary">Save Note</button>
          </div>
        </div>
      </div>
      <div class="bd-modal-overlay"></div>
    `;

    document.body.appendChild(modal);

    const closeBtn = modal.querySelector('.bd-modal-close');
    const overlay = modal.querySelector('.bd-modal-overlay');
    const saveNoteBtn = modal.querySelector('#bd-save-note');

    closeBtn.addEventListener('click', () => modal.remove());
    overlay.addEventListener('click', () => modal.remove());

    saveNoteBtn.addEventListener('click', () => {
      const noteText = modal.querySelector('#bd-note-input').value;
      if (noteText.trim()) {
        saveNoteToLead(lead.id, noteText);
        loadLeadActivityLog(lead.id, modal.querySelector('#bd-activity-log'));
        modal.querySelector('#bd-note-input').value = '';
      }
    });

    loadLeadActivityLog(lead.id, modal.querySelector('#bd-activity-log'));
  };

  const saveNoteToLead = (leadId, note) => {
    const key = `${LS_PREFIX}activity_${leadId}`;
    const activities = JSON.parse(localStorage.getItem(key) || '[]');
    activities.push({
      type: 'note',
      text: note,
      timestamp: new Date().toISOString()
    });
    localStorage.setItem(key, JSON.stringify(activities));
  };

  const loadLeadActivityLog = (leadId, container) => {
    const key = `${LS_PREFIX}activity_${leadId}`;
    const activities = JSON.parse(localStorage.getItem(key) || '[]');

    let html = activities.length === 0 ? '<p style="color: #6B6B6B;">No notes yet</p>' : '';
    activities.reverse().forEach(activity => {
      const date = new Date(activity.timestamp);
      const timeStr = date.toLocaleString('en-IN');
      html += `
        <div class="bd-activity-item">
          <small style="color: #6B6B6B;">${timeStr}</small>
          <p>${activity.text}</p>
        </div>
      `;
    });

    container.innerHTML = html;
  };

  const addNoteToLead = (leadId) => {
    const modal = document.createElement('div');
    modal.className = 'bd-modal';
    modal.innerHTML = `
      <div class="bd-modal-content" style="max-width: 500px;">
        <div class="bd-modal-header">
          <h2>Add Note</h2>
          <button class="bd-modal-close"><i class="fas fa-times"></i></button>
        </div>
        <div class="bd-modal-body">
          <textarea id="bd-quick-note" class="bd-note-textarea" placeholder="Add a note..."></textarea>
          <button id="bd-save-quick-note" class="bd-btn-primary" style="width: 100%; margin-top: 12px;">Save Note</button>
        </div>
      </div>
      <div class="bd-modal-overlay"></div>
    `;

    document.body.appendChild(modal);

    const closeBtn = modal.querySelector('.bd-modal-close');
    const overlay = modal.querySelector('.bd-modal-overlay');
    const saveBtn = modal.querySelector('#bd-save-quick-note');

    closeBtn.addEventListener('click', () => modal.remove());
    overlay.addEventListener('click', () => modal.remove());

    saveBtn.addEventListener('click', () => {
      const noteText = modal.querySelector('#bd-quick-note').value;
      if (noteText.trim()) {
        saveNoteToLead(leadId, noteText);
        modal.remove();
        showToast('Note saved successfully');
      }
    });

    modal.querySelector('#bd-quick-note').focus();
  };

  const renderActivityTimeline = (container, leads) => {
    if (!container) return;

    const activities = [];
    leads.forEach(lead => {
      if (lead.lastActivity) {
        activities.push({
          type: 'activity',
          timestamp: lead.lastActivity,
          text: `Activity on ${lead.title || lead.name}`,
          lead
        });
      }
    });

    activities.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    const recent = activities.slice(0, 10);

    let html = '<div class="bd-timeline">';
    recent.forEach(activity => {
      const date = new Date(activity.timestamp);
      const timeStr = date.toLocaleString('en-IN', { hour: '2-digit', minute: '2-digit', day: 'numeric', month: 'short' });
      html += `
        <div class="bd-timeline-item">
          <div class="bd-timeline-marker"></div>
          <div class="bd-timeline-content">
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
    const currentTarget = parseInt(localStorage.getItem(targetKey) || '25', 10);
    const achieved = Math.floor(Math.random() * currentTarget);
    const percentage = Math.round((achieved / currentTarget) * 100);

    let html = `
      <div class="bd-targets-module">
        <div class="bd-targets-header">
          <h3>Monthly Target</h3>
          <button id="bd-edit-target" class="bd-btn-secondary" style="padding: 6px 12px; font-size: 13px;">
            <i class="fas fa-edit"></i> Edit
          </button>
        </div>
        <div class="bd-targets-content">
          <div class="bd-target-item">
            <div class="bd-target-info">
              <p class="bd-target-label">Leads to Convert</p>
              <p class="bd-target-value">${achieved} / ${currentTarget}</p>
            </div>
            <div class="bd-target-bar">
              <div class="bd-target-progress" style="width: ${percentage}%;"></div>
            </div>
            <p class="bd-target-percent">${percentage}% Achieved</p>
          </div>
          <div class="bd-target-item">
            <p class="bd-target-label">Daily Average</p>
            <p class="bd-target-value">${Math.round(currentTarget / 30)} per day</p>
          </div>
        </div>
      </div>
    `;

    container.innerHTML = html;

    document.getElementById('bd-edit-target')?.addEventListener('click', () => {
      const newTarget = prompt('Enter new monthly target:', currentTarget);
      if (newTarget && !isNaN(newTarget)) {
        localStorage.setItem(targetKey, newTarget);
        renderTargetsModule(container, user);
      }
    });
  };

  const showToast = (message) => {
    const toast = document.createElement('div');
    toast.className = 'bd-toast';
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

  const renderTeamTable = (container, users, leads) => {
    if (!container) return;

    let html = `
      <table class="bd-team-table">
        <thead>
          <tr>
            <th>Agent Name</th>
            <th>Assigned Leads</th>
            <th>Closed</th>
            <th>Pending</th>
            <th>Inactivity Count</th>
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
          <td>${metrics.closedCount}</td>
          <td>${metrics.assignedCount - metrics.closedCount}</td>
          <td><span style="color: ${metrics.inactivityCount > 3 ? '#EF4444' : '#10B981'};">${metrics.inactivityCount}</span></td>
          <td><strong>${Math.round(metrics.activityScore)}</strong></td>
          <td>
            <button class="bd-action-btn bd-view-agent" data-user-id="${user.id}" title="View Profile">
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

    document.querySelectorAll('.bd-view-agent').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const userId = e.currentTarget.dataset.userId;
        window.location.href = `profile-bd-agent.html?userId=${userId}`;
      });
    });
  };

  const renderProfileHeader = (user) => {
    const nameEl = document.getElementById('profile-name');
    const roleEl = document.getElementById('profile-role');
    const emailEl = document.getElementById('info-email');
    const phoneEl = document.getElementById('info-phone');
    const joinedEl = document.getElementById('info-joined');
    const statusEl = document.getElementById('info-status');

    if (nameEl) nameEl.textContent = user.name;
    if (roleEl) roleEl.textContent = 'BD Agent';
    if (emailEl) emailEl.textContent = user.email;
    if (phoneEl) phoneEl.textContent = user.phone;
    if (joinedEl) joinedEl.textContent = formatDate(user.joinDate);

    if (statusEl) {
      const statusInfo = getStatusChip(user.status);
      statusEl.innerHTML = `<span style="color: ${statusInfo.color}; font-weight: 600;">${statusInfo.label}</span>`;
    }
  };

  const exportLeadsToCSV = (leads, fileName = 'leads.csv') => {
    const headers = ['Lead ID', 'Title', 'Client', 'Stage', 'Status', 'Priority', 'Assigned Date', 'Last Activity'];
    const rows = leads.map(lead => [
      lead.id,
      lead.title || lead.name,
      lead.client_name || lead.company,
      lead.stage,
      lead.status,
      lead.priority,
      formatDate(lead.created_at),
      getInactivityLabel(computeInactivity(lead))
    ]);

    let csv = headers.join(',') + '\n';
    rows.forEach(row => {
      csv += row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(',') + '\n';
    });

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const initializeBDProfile = async () => {
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

    renderPerformanceCards(
      document.querySelector('.bd-performance-cards'),
      metrics,
      user
    );

    renderStageChart(
      document.querySelector('.bd-stage-chart'),
      metrics
    );

    renderLeadsTable(
      document.querySelector('.bd-leads-table'),
      metrics.userLeads,
      user
    );

    renderInactivityTracker(
      document.querySelector('.bd-inactivity-tracker'),
      metrics
    );

    renderActivityTimeline(
      document.querySelector('.bd-activity-timeline'),
      metrics.userLeads
    );

    renderTargetsModule(
      document.querySelector('.bd-targets-module'),
      user
    );

    document.getElementById('profile-message')?.addEventListener('click', () => {
      showToast(`Message sent to ${user.name}`);
    });

    document.getElementById('profile-export')?.addEventListener('click', () => {
      exportLeadsToCSV(metrics.userLeads, `${user.name}-leads.csv`);
    });
  };

  const initializeBDTeamLeader = async () => {
    const userId = getUserFromUrl();
    if (!userId) return;

    const data = await loadMockData();
    const teamLeader = data.employees.find(e => e.id === userId || String(e.id) === String(userId));
    if (!teamLeader) return;

    renderProfileHeader(teamLeader);

    const agents = data.employees.filter(e => e.teamLeaderId === teamLeader.id);

    renderTeamTable(
      document.querySelector('.bd-team-table'),
      agents,
      data.leads
    );

    const metrics = computeMetrics(teamLeader, data.leads);
    renderPerformanceCards(
      document.querySelector('.bd-performance-cards'),
      metrics,
      teamLeader
    );

    renderStageChart(
      document.querySelector('.bd-stage-chart'),
      metrics
    );

    renderLeadsTable(
      document.querySelector('.bd-leads-table'),
      metrics.userLeads,
      teamLeader
    );

    renderInactivityTracker(
      document.querySelector('.bd-inactivity-tracker'),
      metrics
    );

    renderActivityTimeline(
      document.querySelector('.bd-activity-timeline'),
      metrics.userLeads
    );

    renderTargetsModule(
      document.querySelector('.bd-targets-module'),
      teamLeader
    );

    document.getElementById('profile-message')?.addEventListener('click', () => {
      showToast(`Message sent to ${teamLeader.name}`);
    });

    document.getElementById('profile-export')?.addEventListener('click', () => {
      exportLeadsToCSV(metrics.userLeads, `${teamLeader.name}-leads.csv`);
    });
  };

  const renderDepartmentStats = (container, data) => {
    if (!container) return;

    const bdLeads = data.leads || [];
    const openLeads = bdLeads.filter(l => l.stage !== 'closing').length;
    const closedLeads = bdLeads.filter(l => l.stage === 'closing').length;
    const avgResTime = bdLeads.length > 0
      ? Math.round(bdLeads.reduce((sum, l) => sum + computeInactivity(l), 0) / bdLeads.length)
      : 0;

    let html = `
      <div class="bd-perf-card">
        <div class="bd-perf-icon" style="background: #E0F2FE;"><i class="fas fa-list" style="color: #0284C7;"></i></div>
        <div class="bd-perf-content">
          <p class="bd-perf-label">Total Leads</p>
          <p class="bd-perf-value">${bdLeads.length}</p>
        </div>
      </div>
      <div class="bd-perf-card">
        <div class="bd-perf-icon" style="background: #F0FDF4;"><i class="fas fa-hourglass-half" style="color: #10B981;"></i></div>
        <div class="bd-perf-content">
          <p class="bd-perf-label">Open Follow-ups</p>
          <p class="bd-perf-value">${openLeads}</p>
        </div>
      </div>
      <div class="bd-perf-card">
        <div class="bd-perf-icon" style="background: #FEF2F2;"><i class="fas fa-check-circle" style="color: #EF4444;"></i></div>
        <div class="bd-perf-content">
          <p class="bd-perf-label">Closed Deals</p>
          <p class="bd-perf-value">${closedLeads}</p>
        </div>
      </div>
      <div class="bd-perf-card">
        <div class="bd-perf-icon" style="background: #FEFCE8;"><i class="fas fa-stopwatch" style="color: #F59E0B;"></i></div>
        <div class="bd-perf-content">
          <p class="bd-perf-label">Avg Response Time</p>
          <p class="bd-perf-value">${Math.floor(avgResTime / 24)}d</p>
        </div>
      </div>
    `;

    container.innerHTML = html;
  };

  const renderDepartmentHealth = (container, data) => {
    if (!container) return;

    const bdLeads = data.leads || [];
    const totalValue = bdLeads.reduce((sum, l) => sum + (l.value || 0), 0);
    const inactiveCount = bdLeads.filter(l => computeInactivity(l) > 48).length;

    let html = `
      <div style="background: white; border-radius: 12px; padding: 24px; box-shadow: 0 4px 20px rgba(0,0,0,0.08);">
        <div style="margin-bottom: 16px;">
          <p style="font-size: 12px; color: #6B6B6B; font-weight: 600; text-transform: uppercase;">Pipeline Value</p>
          <p style="font-size: 24px; font-weight: 700; color: #0F0F0F;">₹${(totalValue / 100000).toFixed(1)}L</p>
        </div>
        <div style="margin-bottom: 16px;">
          <p style="font-size: 12px; color: #6B6B6B; font-weight: 600; text-transform: uppercase;">Inactive Leads (>48h)</p>
          <p style="font-size: 24px; font-weight: 700; color: ${inactiveCount > 5 ? '#EF4444' : '#F59E0B'};">${inactiveCount}</p>
        </div>
        <div>
          <p style="font-size: 12px; color: #6B6B6B; font-weight: 600; text-transform: uppercase;">Avg Deal Value</p>
          <p style="font-size: 24px; font-weight: 700; color: #0F0F0F;">₹${bdLeads.length > 0 ? Math.round(totalValue / bdLeads.length / 1000) : 0}K</p>
        </div>
      </div>
    `;

    container.innerHTML = html;
  };

  const renderEscalationPanel = (container, teamLeaders, data) => {
    if (!container) return;

    let html = '<div style="background: white; border-radius: 12px; padding: 24px; box-shadow: 0 4px 20px rgba(0,0,0,0.08);">';

    const escalations = [];
    teamLeaders.forEach(tl => {
      const metrics = computeMetrics(tl, data.leads);
      if (metrics.inactivityCount > 3) {
        escalations.push({
          name: tl.name,
          count: metrics.inactivityCount,
          severity: metrics.inactivityCount > 5 ? 'critical' : 'warning'
        });
      }
    });

    if (escalations.length === 0) {
      html += '<p style="text-align: center; color: #10B981; padding: 20px;"><i class="fas fa-check-circle"></i> All teams performing well</p>';
    } else {
      escalations.forEach(esc => {
        const color = esc.severity === 'critical' ? '#EF4444' : '#F59E0B';
        html += `
          <div style="padding: 12px; background: ${color}15; border-left: 4px solid ${color}; margin-bottom: 12px; border-radius: 4px;">
            <p style="font-weight: 600; color: #0F0F0F;">${esc.name}</p>
            <p style="font-size: 12px; color: #6B6B6B;">${esc.count} inactive leads requiring attention</p>
          </div>
        `;
      });
    }

    html += '</div>';
    container.innerHTML = html;
  };

  const initializeBDManager = async () => {
    const userId = getUserFromUrl();
    const data = await loadMockData();
    let manager;

    if (userId) {
      manager = data.employees.find(e => e.id === userId || String(e.id) === String(userId));
    } else {
      manager = data.employees.find(e => e.position === 'manager');
    }

    if (!manager) {
      console.error('BD Manager not found');
      return;
    }

    renderProfileHeader(manager);

    const teamLeaders = data.employees.filter(e => e.department === 'business_development' && e.position === 'team_leader');

    renderDepartmentStats(document.getElementById('dept-stats'), data);
    renderTeamTable(document.querySelector('.bd-manager-tl-table'), teamLeaders, data.leads);
    renderDepartmentHealth(document.getElementById('dept-health'), data);
    renderEscalationPanel(document.getElementById('escalation-panel'), teamLeaders, data);

    document.getElementById('profile-message')?.addEventListener('click', () => {
      showToast(`Message sent to ${manager.name}`);
    });
  };

  return {
    initBDAgent: initializeBDProfile,
    initBDTeamLeader: initializeBDTeamLeader,
    initBDManager: initializeBDManager,
    computeMetrics,
    computeInactivity
  };
})();

if (document.currentScript?.src.includes('profiles-bd.js')) {
  const path = window.location.pathname;
  if (path.includes('profile-bd-agent')) {
    document.addEventListener('DOMContentLoaded', () => BDProfileModule.initBDAgent());
  } else if (path.includes('profile-bd-teamleader')) {
    document.addEventListener('DOMContentLoaded', () => BDProfileModule.initBDTeamLeader());
  } else if (path.includes('profile-bd-manager')) {
    document.addEventListener('DOMContentLoaded', () => BDProfileModule.initBDManager());
  }
}
