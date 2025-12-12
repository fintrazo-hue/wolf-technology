const AccountsProfileModule = (() => {
  const LS_PREFIX = 'wt_account_';
  const WORKFLOW_STEPS = [
    'Welcome to Wolf Technologies',
    'Candidate Onboard',
    'Get Documents',
    'Agreement Sent',
    'Agreement Signed'
  ];

  const loadMockData = async () => {
    if (typeof MOCK_DATA !== 'undefined') {
      return MOCK_DATA;
    }
    return {};
  };

  const getUserFromUrl = () => {
    const params = new URLSearchParams(window.location.search);
    return params.get('userId');
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '-';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  const formatTime = (dateStr) => {
    if (!dateStr) return '-';
    const date = new Date(dateStr);
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  const getHoursAgo = (dateStr) => {
    if (!dateStr) return null;
    const date = new Date(dateStr);
    const now = new Date();
    const hours = Math.floor((now - date) / (1000 * 60 * 60));
    return hours;
  };

  const getInactivityStatus = (hours) => {
    if (!hours) return { color: '#10B981', label: 'Active' };
    if (hours < 24) return { color: '#10B981', label: 'Active' };
    if (hours < 48) return { color: '#F59E0B', label: 'Low' };
    if (hours < 72) return { color: '#EA8C55', label: 'Medium' };
    return { color: '#EF4444', label: 'High' };
  };

  const getStepIndex = (stepName) => {
    return WORKFLOW_STEPS.indexOf(stepName);
  };

  const computeMetrics = (user, onboardingData, userRole) => {
    let assigned = 0, completed = 0, pending = 0, agreementSent = 0, agreementSigned = 0, overdue = 0;
    let avgTime = 0, totalTime = 0;

    if (userRole === 'agent') {
      assigned = onboardingData.filter(o => o.assignedAgent === user.id).length;
      onboardingData.filter(o => o.assignedAgent === user.id).forEach(o => {
        if (o.status === 'completed') completed++;
        if (o.status === 'in_progress' || o.status === 'pending') pending++;
        if (o.agreement.sent_at && !o.agreement.signed_at) agreementSent++;
        if (o.agreement.signed_at) agreementSigned++;
        if (o.status === 'pending' && o.daysInProcess > 5) overdue++;
        totalTime += o.daysInProcess || 0;
      });
    } else if (userRole === 'team_leader') {
      assigned = onboardingData.filter(o => o.assignedTL === user.id).length;
      onboardingData.filter(o => o.assignedTL === user.id).forEach(o => {
        if (o.status === 'completed') completed++;
        if (o.status === 'in_progress' || o.status === 'pending') pending++;
        if (o.agreement.sent_at && !o.agreement.signed_at) agreementSent++;
        if (o.agreement.signed_at) agreementSigned++;
        if (o.status === 'pending' && o.daysInProcess > 5) overdue++;
        totalTime += o.daysInProcess || 0;
      });
    } else if (userRole === 'manager') {
      assigned = onboardingData.length;
      onboardingData.forEach(o => {
        if (o.status === 'completed') completed++;
        if (o.status === 'in_progress' || o.status === 'pending') pending++;
        if (o.agreement.sent_at && !o.agreement.signed_at) agreementSent++;
        if (o.agreement.signed_at) agreementSigned++;
        if (o.status === 'pending' && o.daysInProcess > 5) overdue++;
        totalTime += o.daysInProcess || 0;
      });
    }

    avgTime = assigned > 0 ? Math.round(totalTime / assigned) : 0;

    return { assigned, completed, pending, agreementSent, agreementSigned, overdue, avgTime };
  };

  const renderProfileHeader = (user) => {
    const headerContainer = document.getElementById('profile-header');
    if (!headerContainer) return;

    const roleLabel = {
      agent: 'Account Agent',
      team_leader: 'Account Team Leader',
      manager: 'Accounts Manager'
    }[user.position] || user.position;

    const html = `
      <div class="profile-header-content">
        <div class="profile-avatar">
          <img src="${user.avatar || 'https://i.pravatar.cc/150?img=0'}" alt="${user.name}">
        </div>
        <div class="profile-info">
          <h1>${user.name}</h1>
          <p class="profile-role">${roleLabel}</p>
          <p class="profile-email"><i class="fas fa-envelope"></i> ${user.email}</p>
          <p class="profile-phone"><i class="fas fa-phone"></i> ${user.phone}</p>
          <div class="profile-meta">
            <span><i class="fas fa-calendar"></i> Joined: ${formatDate(user.joinDate)}</span>
            <span class="status-badge ${user.status}">${user.status.toUpperCase()}</span>
          </div>
        </div>
      </div>
    `;

    headerContainer.innerHTML = html;
  };

  const renderPerformanceCards = (container, metrics) => {
    if (!container) return;

    const cards = [
      { label: 'Assigned Users', value: metrics.assigned, icon: 'fas fa-users', color: '#3B82F6' },
      { label: 'Completed', value: metrics.completed, icon: 'fas fa-check-circle', color: '#10B981' },
      { label: 'Pending', value: metrics.pending, icon: 'fas fa-hourglass-half', color: '#F59E0B' },
      { label: 'Agreement Sent', value: metrics.agreementSent, icon: 'fas fa-file-contract', color: '#8B5CF6' },
      { label: 'Agreement Signed', value: metrics.agreementSigned, icon: 'fas fa-file-check', color: '#EC4899' },
      { label: 'Overdue Tasks', value: metrics.overdue, icon: 'fas fa-exclamation-circle', color: '#EF4444' },
      { label: 'Avg Days', value: metrics.avgTime, icon: 'fas fa-clock', color: '#06B6D4' }
    ];

    let html = '<div class="perf-cards-grid">';
    cards.forEach(card => {
      html += `
        <div class="perf-card">
          <div class="perf-card-icon" style="background: ${card.color}20; color: ${card.color};">
            <i class="${card.icon}"></i>
          </div>
          <div class="perf-card-content">
            <p class="perf-label">${card.label}</p>
            <p class="perf-value">${card.value}</p>
          </div>
        </div>
      `;
    });
    html += '</div>';

    container.innerHTML = html;
  };

  const renderWorkflowProgressBar = (container, onboardingData, userRole, userId) => {
    if (!container) return;

    let filtered = onboardingData;
    if (userRole === 'agent') filtered = onboardingData.filter(o => o.assignedAgent === userId);
    if (userRole === 'team_leader') filtered = onboardingData.filter(o => o.assignedTL === userId);

    const total = filtered.length;
    const completed = filtered.filter(o => o.status === 'completed').length;
    const inProgress = filtered.filter(o => o.status === 'in_progress').length;
    const pending = filtered.filter(o => o.status === 'pending').length;

    const completedPct = total > 0 ? Math.round((completed / total) * 100) : 0;
    const inProgressPct = total > 0 ? Math.round((inProgress / total) * 100) : 0;

    const html = `
      <div class="workflow-summary">
        <h3>Workflow Summary</h3>
        <div class="workflow-bar">
          <div class="bar-segment completed" style="width: ${completedPct}%" title="Completed: ${completed}"></div>
          <div class="bar-segment in-progress" style="width: ${inProgressPct}%" title="In Progress: ${inProgress}"></div>
          <div class="bar-segment pending" style="width: ${100 - completedPct - inProgressPct}%" title="Pending: ${pending}"></div>
        </div>
        <div class="workflow-stats">
          <span><i class="fas fa-check-circle" style="color: #10B981;"></i> ${completed}/${total} Completed</span>
          <span><i class="fas fa-spinner" style="color: #F59E0B;"></i> ${inProgress}/${total} In Progress</span>
          <span><i class="fas fa-circle" style="color: #CBD5E1;"></i> ${pending}/${total} Pending</span>
        </div>
      </div>
    `;

    container.innerHTML = html;
  };

  const renderWorkflowTable = (container, onboardingData, userRole, userId) => {
    if (!container) return;

    let filtered = onboardingData;
    if (userRole === 'agent') filtered = onboardingData.filter(o => o.assignedAgent === userId);
    if (userRole === 'team_leader') filtered = onboardingData.filter(o => o.assignedTL === userId);

    let html = `
      <div class="workflow-table-container">
        <h3>Workflow Details</h3>
        <table class="workflow-table">
          <thead>
            <tr>
              <th>Billing ID</th>
              <th>Customer</th>
              <th>Service</th>
              <th>Current Step</th>
              <th>Progress</th>
              <th>Last Update</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
    `;

    filtered.forEach(billing => {
      const stepIndex = getStepIndex(billing.currentStep);
      const progressPct = stepIndex >= 0 ? Math.round(((stepIndex + 1) / WORKFLOW_STEPS.length) * 100) : 0;
      const hoursAgo = getHoursAgo(billing.lastUpdate);
      const inactivity = getInactivityStatus(hoursAgo);
      const statusBadge = billing.status === 'completed' ? '<span class="status-badge completed">Completed</span>'
                        : billing.status === 'in_progress' ? '<span class="status-badge in-progress">In Progress</span>'
                        : '<span class="status-badge pending">Pending</span>';

      html += `
        <tr>
          <td><strong>${billing.billingId}</strong></td>
          <td>${billing.customerName}</td>
          <td>${billing.serviceName}</td>
          <td>
            <div class="step-badge">${billing.currentStep.substring(0, 20)}...</div>
          </td>
          <td>
            <div class="progress-bar">
              <div class="progress-fill" style="width: ${progressPct}%"></div>
            </div>
            <span class="progress-text">${progressPct}%</span>
          </td>
          <td>${formatDate(billing.lastUpdate)} ${formatTime(billing.lastUpdate)}</td>
          <td>${statusBadge}</td>
          <td>
            <button class="workflow-view-btn" data-billing-id="${billing.id}" title="View Details">
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

    document.querySelectorAll('.workflow-view-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const billingId = e.currentTarget.dataset.billingId;
        const billing = onboardingData.find(o => o.id === billingId);
        if (billing) showWorkflowModal(billing);
      });
    });
  };

  const renderPendingWorkTracker = (container, onboardingData) => {
    if (!container) return;

    const docsNeeded = onboardingData.filter(o => o.currentStep === 'Get Documents' && getHoursAgo(o.lastUpdate) > 48).length;
    const agreementPending = onboardingData.filter(o => o.currentStep === 'Agreement Sent' && getHoursAgo(o.lastUpdate) > 48).length;
    const inactive48h = onboardingData.filter(o => {
      const hours = getHoursAgo(o.lastUpdate);
      return hours && hours > 48 && hours <= 72;
    }).length;
    const inactive72h = onboardingData.filter(o => {
      const hours = getHoursAgo(o.lastUpdate);
      return hours && hours > 72;
    }).length;

    const html = `
      <div class="pending-work-tracker">
        <h3>Pending Work Tracker</h3>
        <div class="tracker-grid">
          <div class="tracker-item">
            <div class="tracker-icon" style="background: #FEF3C7; color: #F59E0B;">
              <i class="fas fa-file-upload"></i>
            </div>
            <div class="tracker-content">
              <p class="tracker-label">Documents Needed</p>
              <p class="tracker-value">${docsNeeded}</p>
            </div>
          </div>
          <div class="tracker-item">
            <div class="tracker-icon" style="background: #FEE2E2; color: #EF4444;">
              <i class="fas fa-file-contract"></i>
            </div>
            <div class="tracker-content">
              <p class="tracker-label">Agreements Pending</p>
              <p class="tracker-value">${agreementPending}</p>
            </div>
          </div>
          <div class="tracker-item">
            <div class="tracker-icon" style="background: #FEF3C7; color: #F59E0B;">
              <i class="fas fa-clock"></i>
            </div>
            <div class="tracker-content">
              <p class="tracker-label">Inactive 48-72h</p>
              <p class="tracker-value">${inactive48h}</p>
            </div>
          </div>
          <div class="tracker-item">
            <div class="tracker-icon" style="background: #FEE2E2; color: #EF4444;">
              <i class="fas fa-exclamation-triangle"></i>
            </div>
            <div class="tracker-content">
              <p class="tracker-label">Inactive 72h+</p>
              <p class="tracker-value">${inactive72h}</p>
            </div>
          </div>
        </div>
      </div>
    `;

    container.innerHTML = html;
  };

  const renderRecentActivity = (container, onboardingData) => {
    if (!container) return;

    const activities = [];
    onboardingData.forEach(o => {
      if (o.agreement.signed_at) activities.push({
        type: 'agreement_signed',
        customer: o.customerName,
        time: o.agreement.signed_at,
        description: `Agreement signed for ${o.customerName}`
      });
      if (o.agreement.sent_at) activities.push({
        type: 'agreement_sent',
        customer: o.customerName,
        time: o.agreement.sent_at,
        description: `Agreement sent to ${o.customerName}`
      });
    });

    activities.sort((a, b) => new Date(b.time) - new Date(a.time));
    activities.splice(10);

    let html = `
      <div class="activity-timeline">
        <h3>Recent Activity</h3>
        <div class="timeline">
    `;

    activities.forEach(activity => {
      const iconColor = activity.type === 'agreement_signed' ? '#10B981' : '#8B5CF6';
      const icon = activity.type === 'agreement_signed' ? 'fas fa-check-circle' : 'fas fa-file-export';

      html += `
        <div class="timeline-item">
          <div class="timeline-marker" style="background: ${iconColor};">
            <i class="${icon}"></i>
          </div>
          <div class="timeline-content">
            <p class="timeline-description">${activity.description}</p>
            <p class="timeline-time">${formatDate(activity.time)} ${formatTime(activity.time)}</p>
          </div>
        </div>
      `;
    });

    html += `
        </div>
      </div>
    `;

    container.innerHTML = html;
  };

  const renderTeamPerformance = (container, employees, onboardingData) => {
    if (!container) return;

    const teamLeaders = employees.filter(e => e.department === 'accounts' && e.position === 'team_leader');
    const agents = employees.filter(e => e.department === 'accounts' && e.position === 'agent');

    let html = `
      <div class="team-performance">
        <h3>Team Performance</h3>
        <table class="team-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Role</th>
              <th>Assigned</th>
              <th>Completed</th>
              <th>Pending</th>
              <th>Efficiency</th>
            </tr>
          </thead>
          <tbody>
    `;

    const allTeam = [...teamLeaders, ...agents];
    allTeam.forEach(member => {
      const isAgent = member.position === 'agent';
      const assigned = onboardingData.filter(o =>
        isAgent ? o.assignedAgent === member.id : o.assignedTL === member.id
      ).length;
      const completed = onboardingData.filter(o =>
        (isAgent ? o.assignedAgent === member.id : o.assignedTL === member.id) && o.status === 'completed'
      ).length;
      const pending = assigned - completed;
      const efficiency = assigned > 0 ? Math.round((completed / assigned) * 100) : 0;

      html += `
        <tr>
          <td><strong>${member.name}</strong></td>
          <td><span class="role-badge">${member.position === 'team_leader' ? 'TL' : 'Agent'}</span></td>
          <td>${assigned}</td>
          <td>${completed}</td>
          <td>${pending}</td>
          <td>
            <div class="efficiency-bar">
              <div class="efficiency-fill" style="width: ${efficiency}%; background: ${efficiency >= 80 ? '#10B981' : efficiency >= 60 ? '#F59E0B' : '#EF4444'};"></div>
            </div>
            <span>${efficiency}%</span>
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
  };

  const renderDepartmentKPIs = (container, onboardingData) => {
    if (!container) return;

    const total = onboardingData.length;
    const completed = onboardingData.filter(o => o.status === 'completed').length;
    const pending = onboardingData.filter(o => o.status === 'pending' || o.status === 'in_progress').length;
    const assigned = onboardingData.filter(o => o.assignedAgent).length;
    const overdueCount = onboardingData.filter(o => o.daysInProcess > 5).length;
    const docDelayCount = onboardingData.filter(o => o.currentStep === 'Get Documents' && getHoursAgo(o.lastUpdate) > 72).length;

    const slaCompliance = total > 0 ? Math.round(((total - overdueCount) / total) * 100) : 100;

    const kpis = [
      { label: 'Total Users', value: total, icon: 'fas fa-users' },
      { label: 'Assigned', value: assigned, icon: 'fas fa-user-check' },
      { label: 'Completed', value: completed, icon: 'fas fa-check-double' },
      { label: 'Pending', value: pending, icon: 'fas fa-hourglass-end' },
      { label: 'SLA Compliance', value: `${slaCompliance}%`, icon: 'fas fa-chart-line' },
      { label: 'Doc Delays', value: docDelayCount, icon: 'fas fa-exclamation' }
    ];

    let html = '<div class="dept-kpis-grid">';
    kpis.forEach(kpi => {
      html += `
        <div class="kpi-card">
          <div class="kpi-icon" style="color: #3B82F6;">
            <i class="${kpi.icon}"></i>
          </div>
          <div class="kpi-content">
            <p class="kpi-label">${kpi.label}</p>
            <p class="kpi-value">${kpi.value}</p>
          </div>
        </div>
      `;
    });
    html += '</div>';

    container.innerHTML = html;
  };

  const renderEscalationPanel = (container, onboardingData) => {
    if (!container) return;

    const escalations = [];

    onboardingData.forEach(o => {
      const daysInDocs = o.currentStep === 'Get Documents' ? o.daysInProcess : 0;
      const hoursInAgreement = o.currentStep === 'Agreement Sent' ? getHoursAgo(o.lastUpdate) : 0;
      const hoursSinceTouch = getHoursAgo(o.lastUpdate);

      if (daysInDocs > 3) {
        escalations.push({
          severity: 'high',
          type: 'docs',
          icon: 'fas fa-file-upload',
          message: `${o.customerName} stuck in Documents for ${o.daysInProcess} days`,
          color: '#EF4444'
        });
      }
      if (hoursInAgreement && hoursInAgreement > 48) {
        escalations.push({
          severity: 'high',
          type: 'agreement',
          icon: 'fas fa-file-contract',
          message: `${o.customerName} awaiting agreement signature for ${Math.round(hoursInAgreement / 24)} days`,
          color: '#EA8C55'
        });
      }
      if (hoursSinceTouch && hoursSinceTouch > 72) {
        escalations.push({
          severity: 'medium',
          type: 'inactive',
          icon: 'fas fa-clock',
          message: `${o.customerName} untouched for ${Math.round(hoursSinceTouch / 24)} days`,
          color: '#F59E0B'
        });
      }
    });

    escalations.sort((a, b) => {
      const severityOrder = { high: 0, medium: 1, low: 2 };
      return severityOrder[a.severity] - severityOrder[b.severity];
    });

    let html = `
      <div class="escalation-panel">
        <h3>Escalations & Alerts (${escalations.length})</h3>
        ${escalations.length === 0 ? '<p class="no-data">No active escalations</p>' : ''}
        <div class="escalation-list">
    `;

    escalations.forEach(esc => {
      html += `
        <div class="escalation-item" style="border-left: 4px solid ${esc.color};">
          <div class="escalation-icon" style="color: ${esc.color};">
            <i class="${esc.icon}"></i>
          </div>
          <div class="escalation-content">
            <p class="escalation-message">${esc.message}</p>
          </div>
        </div>
      `;
    });

    html += `
        </div>
      </div>
    `;

    container.innerHTML = html;
  };

  const renderTargetsSection = (container, user, metrics) => {
    if (!container) return;

    const lsKey = `${LS_PREFIX}targets_${user.id}`;
    const savedTarget = JSON.parse(localStorage.getItem(lsKey)) || { onboardings: 60 };

    const targetValue = savedTarget.onboardings || 60;
    const progress = metrics.completed;
    const remaining = Math.max(0, targetValue - progress);
    const progressPct = Math.min(100, Math.round((progress / targetValue) * 100));

    const html = `
      <div class="targets-section">
        <h3>Monthly Targets</h3>
        <div class="target-widget">
          <div class="target-circle">
            <svg viewBox="0 0 120 120" class="progress-ring">
              <circle cx="60" cy="60" r="50" class="ring-bg"></circle>
              <circle cx="60" cy="60" r="50" class="ring-fill" style="stroke-dasharray: ${Math.PI * 100 * (progressPct / 100)}, ${Math.PI * 100};"></circle>
              <text x="60" y="65" text-anchor="middle" class="ring-text">${progressPct}%</text>
            </svg>
          </div>
          <div class="target-details">
            <p class="target-label">Onboardings Target</p>
            <p class="target-value">${progress} / ${targetValue}</p>
            <p class="target-remaining">Remaining: ${remaining}</p>
            <div class="target-actions">
              <button class="target-edit-btn" data-user-id="${user.id}">Edit Target</button>
              <button class="target-export-btn">Export CSV</button>
            </div>
          </div>
        </div>
      </div>
    `;

    container.innerHTML = html;

    const editBtn = container.querySelector('.target-edit-btn');
    if (editBtn) {
      editBtn.addEventListener('click', () => {
        const newTarget = prompt('Enter new target:', targetValue);
        if (newTarget && !isNaN(newTarget)) {
          localStorage.setItem(lsKey, JSON.stringify({ onboardings: parseInt(newTarget) }));
          location.reload();
        }
      });
    }

    const exportBtn = container.querySelector('.target-export-btn');
    if (exportBtn) {
      exportBtn.addEventListener('click', () => {
        alert('CSV export placeholder - would export assigned users to CSV');
      });
    }
  };

  const showWorkflowModal = (billing) => {
    const modal = document.getElementById('workflow-modal');
    if (!modal) return;

    const stepsHtml = WORKFLOW_STEPS.map((step, idx) => {
      const isCompleted = billing.completedSteps.includes(step);
      const isCurrent = billing.currentStep === step;
      return `
        <div class="modal-step ${isCompleted ? 'completed' : ''} ${isCurrent ? 'current' : ''}">
          <div class="step-number">${idx + 1}</div>
          <div class="step-name">${step}</div>
        </div>
      `;
    }).join('');

    const documentsHtml = Object.entries(billing.documents).map(([doc, status]) => `
      <div class="doc-row">
        <span>${doc.replace('_', ' ')}</span>
        <span class="doc-status ${status}">${status.toUpperCase()}</span>
      </div>
    `).join('');

    const modalContent = `
      <div class="modal-content">
        <div class="modal-header">
          <h2>${billing.customerName}</h2>
          <button class="modal-close" onclick="document.getElementById('workflow-modal').style.display='none';">&times;</button>
        </div>
        <div class="modal-body">
          <div class="modal-section">
            <h3>Billing Details</h3>
            <p><strong>Billing ID:</strong> ${billing.billingId}</p>
            <p><strong>Service:</strong> ${billing.serviceName}</p>
            <p><strong>Status:</strong> ${billing.status.toUpperCase()}</p>
            <p><strong>Agent:</strong> ${billing.assignedAgentName}</p>
            <p><strong>Team Leader:</strong> ${billing.assignedTLName}</p>
          </div>
          <div class="modal-section">
            <h3>Workflow Progress</h3>
            <div class="modal-workflow">${stepsHtml}</div>
          </div>
          <div class="modal-section">
            <h3>Documents</h3>
            <div class="modal-documents">${documentsHtml}</div>
          </div>
          <div class="modal-section">
            <h3>Agreement</h3>
            <p><strong>Sent:</strong> ${formatDate(billing.agreement.sent_at)}</p>
            <p><strong>Signed:</strong> ${formatDate(billing.agreement.signed_at)}</p>
          </div>
        </div>
      </div>
    `;

    modal.innerHTML = modalContent;
    modal.style.display = 'block';
  };

  const initializeAgent = async () => {
    const data = await loadMockData();
    const userId = getUserFromUrl();
    const user = data.employees?.find(e => e.id === userId && e.department === 'accounts' && e.position === 'agent');

    if (!user) {
      console.error('Agent not found');
      document.body.innerHTML = '<h2>Agent not found</h2>';
      return;
    }

    const onboardingData = data.accountsOnboarding || [];
    const metrics = computeMetrics(user, onboardingData, 'agent');

    renderProfileHeader(user);
    renderPerformanceCards(document.getElementById('perf-cards'), metrics);
    renderWorkflowProgressBar(document.getElementById('workflow-progress'), onboardingData, 'agent', userId);
    renderWorkflowTable(document.getElementById('workflow-table'), onboardingData, 'agent', userId);
    renderPendingWorkTracker(document.getElementById('pending-tracker'), onboardingData);
    renderRecentActivity(document.getElementById('recent-activity'), onboardingData);
    renderTargetsSection(document.getElementById('targets-section'), user, metrics);
  };

  const initializeTeamLeader = async () => {
    const data = await loadMockData();
    const userId = getUserFromUrl();
    const user = data.employees?.find(e => e.id === userId && e.department === 'accounts' && e.position === 'team_leader');

    if (!user) {
      console.error('Team Leader not found');
      document.body.innerHTML = '<h2>Team Leader not found</h2>';
      return;
    }

    const onboardingData = data.accountsOnboarding || [];
    const metrics = computeMetrics(user, onboardingData, 'team_leader');

    renderProfileHeader(user);
    renderPerformanceCards(document.getElementById('perf-cards'), metrics);
    renderWorkflowProgressBar(document.getElementById('workflow-progress'), onboardingData, 'team_leader', userId);
    renderTeamPerformance(document.getElementById('team-performance'), data.employees, onboardingData);
    renderWorkflowTable(document.getElementById('workflow-table'), onboardingData, 'team_leader', userId);
    renderPendingWorkTracker(document.getElementById('pending-tracker'), onboardingData);
    renderRecentActivity(document.getElementById('recent-activity'), onboardingData);
    renderTargetsSection(document.getElementById('targets-section'), user, metrics);
  };

  const initializeManager = async () => {
    const data = await loadMockData();
    const userId = getUserFromUrl();
    const user = data.employees?.find(e => e.id === userId && e.department === 'accounts' && e.position === 'manager');

    if (!user) {
      console.error('Manager not found');
      document.body.innerHTML = '<h2>Manager not found</h2>';
      return;
    }

    const onboardingData = data.accountsOnboarding || [];
    const metrics = computeMetrics(user, onboardingData, 'manager');

    renderProfileHeader(user);
    renderDepartmentKPIs(document.getElementById('dept-kpis'), onboardingData);
    renderPerformanceCards(document.getElementById('perf-cards'), metrics);
    renderTeamPerformance(document.getElementById('team-performance'), data.employees, onboardingData);
    renderWorkflowProgressBar(document.getElementById('workflow-progress'), onboardingData, 'manager', userId);
    renderEscalationPanel(document.getElementById('escalation-panel'), onboardingData);
    renderWorkflowTable(document.getElementById('workflow-table'), onboardingData, 'manager', userId);
    renderRecentActivity(document.getElementById('recent-activity'), onboardingData);
  };

  return {
    initAgent: initializeAgent,
    initTeamLeader: initializeTeamLeader,
    initManager: initializeManager,
    showWorkflowModal
  };
})();

document.addEventListener('DOMContentLoaded', () => {
  const pageType = document.body.dataset.pageType;
  if (pageType === 'agent') AccountsProfileModule.initAgent();
  if (pageType === 'team_leader') AccountsProfileModule.initTeamLeader();
  if (pageType === 'manager') AccountsProfileModule.initManager();
});
