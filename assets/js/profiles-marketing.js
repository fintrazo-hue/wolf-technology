const MarketingProfileModule = (() => {
  const LS_PREFIX = 'wt_marketing_';

  const generateMockCandidates = () => [
    { id: 'mc1', name: 'Amit Kumar', service: 'Email Marketing', stage: 'Profile Submitted', assignedAgent: 'agent1', assignedTL: 'tl1', assignedManager: 'mgr1', lastActivity: '2025-12-12T10:30:00Z', nextFollowup: '2025-12-14T10:00:00Z', status: 'active', joined: '2025-01-15', activities: [{ type: 'training', date: '2025-01-15', note: 'Initial Training' }, { type: 'profile_submit', date: '2025-12-12', note: 'Profile Submitted' }] },
    { id: 'mc2', name: 'Priya Singh', service: 'Social Media', stage: 'Interview Scheduled', assignedAgent: 'agent1', assignedTL: 'tl1', assignedManager: 'mgr1', lastActivity: '2025-12-11T14:00:00Z', nextFollowup: '2025-12-15T09:00:00Z', status: 'active', joined: '2025-02-10', activities: [{ type: 'training', date: '2025-02-10' }, { type: 'profile_submit', date: '2025-12-05' }, { type: 'interview', date: '2025-12-15', note: 'Interview scheduled' }] },
    { id: 'mc3', name: 'Rajesh Patel', service: 'Content Writing', stage: 'Marketing Started', assignedAgent: 'agent1', assignedTL: 'tl1', assignedManager: 'mgr1', lastActivity: '2025-12-10T09:15:00Z', nextFollowup: null, status: 'active', joined: '2025-01-20', activities: [{ type: 'training', date: '2025-01-20' }] },
    { id: 'mc4', name: 'Neha Gupta', service: 'Email Marketing', stage: 'Initial Training', assignedAgent: 'agent2', assignedTL: 'tl1', assignedManager: 'mgr1', lastActivity: '2025-12-08T16:45:00Z', nextFollowup: '2025-12-16T10:00:00Z', status: 'inactive', joined: '2025-03-05', activities: [{ type: 'training', date: '2025-03-05' }] },
    { id: 'mc5', name: 'Vikram Singh', service: 'SEO', stage: 'Interview Attended', assignedAgent: 'agent2', assignedTL: 'tl1', assignedManager: 'mgr1', lastActivity: '2025-12-13T11:00:00Z', nextFollowup: '2025-12-18T14:00:00Z', status: 'active', joined: '2025-02-01', activities: [{ type: 'training', date: '2025-02-01' }, { type: 'profile_submit', date: '2025-12-08' }, { type: 'interview', date: '2025-12-13', note: 'Interview attended' }] },
    { id: 'mc6', name: 'Anjali Verma', service: 'Email Marketing', stage: 'Placed', assignedAgent: 'agent1', assignedTL: 'tl1', assignedManager: 'mgr1', lastActivity: '2025-12-12T13:20:00Z', nextFollowup: null, status: 'active', joined: '2025-01-10', activities: [{ type: 'training', date: '2025-01-10' }, { type: 'profile_submit', date: '2025-12-02' }, { type: 'interview', date: '2025-12-05' }, { type: 'placement', date: '2025-12-12', note: 'Placed' }] },
    { id: 'mc7', name: 'Sunil Joshi', service: 'Social Media', stage: 'Profile Submitted', assignedAgent: 'agent2', assignedTL: 'tl2', assignedManager: 'mgr1', lastActivity: '2025-12-07T08:00:00Z', nextFollowup: '2025-12-17T10:00:00Z', status: 'inactive', joined: '2025-02-20', activities: [{ type: 'training', date: '2025-02-20' }, { type: 'profile_submit', date: '2025-12-10' }] },
    { id: 'mc8', name: 'Divya Reddy', service: 'Content Writing', stage: 'Marketing Started', assignedAgent: 'agent3', assignedTL: 'tl2', assignedManager: 'mgr1', lastActivity: '2025-12-13T10:30:00Z', nextFollowup: '2025-12-15T11:00:00Z', status: 'active', joined: '2025-03-01', activities: [{ type: 'training', date: '2025-03-01' }] },
    { id: 'mc9', name: 'Rohit Kumar', service: 'SEO', stage: 'Initial Training', assignedAgent: 'agent3', assignedTL: 'tl2', assignedManager: 'mgr1', lastActivity: '2025-12-06T15:00:00Z', nextFollowup: '2025-12-20T09:00:00Z', status: 'inactive', joined: '2025-03-10', activities: [{ type: 'training', date: '2025-03-10' }] },
    { id: 'mc10', name: 'Meera Rao', service: 'Email Marketing', stage: 'Interview Scheduled', assignedAgent: 'agent3', assignedTL: 'tl2', assignedManager: 'mgr1', lastActivity: '2025-12-12T09:45:00Z', nextFollowup: '2025-12-16T14:00:00Z', status: 'active', joined: '2025-02-05', activities: [{ type: 'training', date: '2025-02-05' }, { type: 'profile_submit', date: '2025-12-09' }, { type: 'interview', date: '2025-12-16' }] },
    { id: 'mc11', name: 'Arjun Nair', service: 'Social Media', stage: 'Interview Attended', assignedAgent: 'agent1', assignedTL: 'tl1', assignedManager: 'mgr1', lastActivity: '2025-12-13T12:15:00Z', nextFollowup: '2025-12-20T10:00:00Z', status: 'active', joined: '2025-01-25', activities: [{ type: 'training', date: '2025-01-25' }, { type: 'profile_submit', date: '2025-12-06' }, { type: 'interview', date: '2025-12-12' }] },
    { id: 'mc12', name: 'Simran Kaur', service: 'Content Writing', stage: 'Placed', assignedAgent: 'agent2', assignedTL: 'tl1', assignedManager: 'mgr1', lastActivity: '2025-12-11T16:00:00Z', nextFollowup: null, status: 'active', joined: '2025-01-30', activities: [{ type: 'training', date: '2025-01-30' }, { type: 'profile_submit', date: '2025-12-03' }, { type: 'interview', date: '2025-12-08' }, { type: 'placement', date: '2025-12-11' }] },
  ];

  const generateMockAgents = () => [
    { id: 'agent1', name: 'Raj Sharma', email: 'raj@wolftech.com', phone: '9876543210', joined: '2024-01-15', status: 'active', role: 'marketing_agent' },
    { id: 'agent2', name: 'Priya Chopra', email: 'priya@wolftech.com', phone: '9876543211', joined: '2024-02-10', status: 'active', role: 'marketing_agent' },
    { id: 'agent3', name: 'Vikram Das', email: 'vikram@wolftech.com', phone: '9876543212', joined: '2024-03-05', status: 'active', role: 'marketing_agent' },
  ];

  const generateMockTeamLeaders = () => [
    { id: 'tl1', name: 'Anjali Verma', email: 'anjali.tl@wolftech.com', phone: '9876543220', joined: '2023-06-01', status: 'active', role: 'marketing_tl', agents: ['agent1', 'agent2'] },
    { id: 'tl2', name: 'Rohan Gupta', email: 'rohan.tl@wolftech.com', phone: '9876543221', joined: '2023-07-15', status: 'active', role: 'marketing_tl', agents: ['agent3'] },
  ];

  const generateMockManagers = () => [
    { id: 'mgr1', name: 'Neha Singh', email: 'neha.mgr@wolftech.com', phone: '9876543230', joined: '2022-01-10', status: 'active', role: 'marketing_manager', teamLeaders: ['tl1', 'tl2'] },
  ];

  const getUserFromUrl = () => new URLSearchParams(window.location.search).get('userId');
  const getRoleFromUrl = () => new URLSearchParams(window.location.search).get('role');

  const loadMockData = () => ({
    agents: generateMockAgents(),
    teamLeaders: generateMockTeamLeaders(),
    managers: generateMockManagers(),
    candidates: generateMockCandidates()
  });

  const computeInactivity = (candidate) => {
    const lastActivity = new Date(candidate.lastActivity);
    const now = new Date();
    return Math.floor((now - lastActivity) / (1000 * 60 * 60));
  };

  const getInactivityLabel = (hours) => {
    if (hours < 1) return 'Just now';
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  };

  const getInactivityColor = (hours) => {
    if (hours < 48) return '#10B981';
    if (hours < 72) return '#F59E0B';
    return '#EF4444';
  };

  const formatDate = (dateStr) => {
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' });
    } catch {
      return dateStr;
    }
  };

  const computeAgentMetrics = (agent, candidates) => {
    const assigned = candidates.filter(c => c.assignedAgent === agent.id);
    const stages = {};
    const stageNames = ['Initial Training', 'Marketing Started', 'Profile Submitted', 'Interview Scheduled', 'Interview Attended', 'Placed'];

    stageNames.forEach(stage => {
      stages[stage] = assigned.filter(c => c.stage === stage).length;
    });

    const inactiveCandidates = assigned.filter(c => computeInactivity(c) > 72);
    const pendingFollowup = assigned.filter(c => !c.nextFollowup || new Date(c.nextFollowup) < new Date());

    return {
      assignedUsers: assigned.length,
      profilesSubmitted: stages['Profile Submitted'] + stages['Interview Scheduled'] + stages['Interview Attended'] + stages['Placed'],
      interviewsScheduled: stages['Interview Scheduled'] + stages['Interview Attended'] + stages['Placed'],
      interviewsAttended: stages['Interview Attended'] + stages['Placed'],
      placements: stages['Placed'],
      pendingFollowup: pendingFollowup.length,
      inactiveUsers: inactiveCandidates.length,
      candidatesByStage: stages,
      candidates: assigned
    };
  };

  const computeTLMetrics = (tl, candidates, agents) => {
    const agentIds = tl.agents || [];
    const teamCandidates = candidates.filter(c => agentIds.includes(c.assignedAgent));
    const inactiveCandidates = teamCandidates.filter(c => computeInactivity(c) > 72);

    const agentMetrics = agentIds.map(agentId => {
      const agent = agents.find(a => a.id === agentId);
      const metrics = computeAgentMetrics(agent, candidates);
      return { agent, metrics };
    });

    const stages = {};
    ['Initial Training', 'Marketing Started', 'Profile Submitted', 'Interview Scheduled', 'Interview Attended', 'Placed'].forEach(stage => {
      stages[stage] = teamCandidates.filter(c => c.stage === stage).length;
    });

    return {
      totalCandidates: teamCandidates.length,
      agentPerformance: agentMetrics,
      inactiveCount: inactiveCandidates.length,
      candidatesByStage: stages,
      candidates: teamCandidates
    };
  };

  const computeManagerMetrics = (candidates, agents, teamLeaders) => {
    const inactiveCandidates = candidates.filter(c => computeInactivity(c) > 72);
    const stages = {};
    ['Initial Training', 'Marketing Started', 'Profile Submitted', 'Interview Scheduled', 'Interview Attended', 'Placed'].forEach(stage => {
      stages[stage] = candidates.filter(c => c.stage === stage).length;
    });

    const placements = stages['Placed'];
    const conversionRate = candidates.length > 0 ? Math.round((placements / candidates.length) * 100) : 0;

    const tlMetrics = teamLeaders.map(tl => {
      const metrics = computeTLMetrics(tl, candidates, agents);
      return { tl, metrics };
    });

    return {
      totalCandidates: candidates.length,
      totalPlacements: placements,
      conversionRate,
      inactiveCount: inactiveCandidates.length,
      candidatesByStage: stages,
      tlPerformance: tlMetrics
    };
  };

  const renderAgentProfile = (userId) => {
    const data = loadMockData();
    const agent = data.agents.find(a => a.id === userId);
    if (!agent) return console.error('Agent not found');

    const metrics = computeAgentMetrics(agent, data.candidates);
    const container = document.querySelector('.profile-container');
    if (!container) return;

    container.innerHTML = `
      <div class="marketing-profile">
        <div class="profile-header">
          <div class="header-info">
            <h1>${agent.name}</h1>
            <p class="role-badge">Marketing Agent</p>
            <p class="email"><i class="fas fa-envelope"></i> ${agent.email}</p>
            <p class="phone"><i class="fas fa-phone"></i> ${agent.phone}</p>
            <p class="joined"><i class="fas fa-calendar"></i> Joined: ${formatDate(agent.joined)}</p>
            <span class="status-badge" style="background: #D1FAE5; color: #047857;">${agent.status.toUpperCase()}</span>
          </div>
        </div>

        <div class="section">
          <h2>Performance Overview</h2>
          <div class="perf-grid">
            <div class="perf-card">
              <div class="perf-icon" style="background: #E0F2FE;"><i class="fas fa-users" style="color: #0284C7;"></i></div>
              <div class="perf-content">
                <p class="perf-label">Assigned Users</p>
                <p class="perf-value">${metrics.assignedUsers}</p>
              </div>
            </div>
            <div class="perf-card">
              <div class="perf-icon" style="background: #F3E8FF;"><i class="fas fa-file" style="color: #A855F7;"></i></div>
              <div class="perf-content">
                <p class="perf-label">Profiles Submitted</p>
                <p class="perf-value">${metrics.profilesSubmitted}</p>
              </div>
            </div>
            <div class="perf-card">
              <div class="perf-icon" style="background: #FEF3C7;"><i class="fas fa-calendar-check" style="color: #D97706;"></i></div>
              <div class="perf-content">
                <p class="perf-label">Interviews Scheduled</p>
                <p class="perf-value">${metrics.interviewsScheduled}</p>
              </div>
            </div>
            <div class="perf-card">
              <div class="perf-icon" style="background: #DBEAFE;"><i class="fas fa-users-viewfinder" style="color: #3B82F6;"></i></div>
              <div class="perf-content">
                <p class="perf-label">Interviews Attended</p>
                <p class="perf-value">${metrics.interviewsAttended}</p>
              </div>
            </div>
            <div class="perf-card">
              <div class="perf-icon" style="background: #DCFCE7;"><i class="fas fa-check-circle" style="color: #22C55E;"></i></div>
              <div class="perf-content">
                <p class="perf-label">Placements</p>
                <p class="perf-value">${metrics.placements}</p>
              </div>
            </div>
            <div class="perf-card">
              <div class="perf-icon" style="background: #FEE2E2;"><i class="fas fa-exclamation-circle" style="color: #EF4444;"></i></div>
              <div class="perf-content">
                <p class="perf-label">Inactive Users</p>
                <p class="perf-value">${metrics.inactiveUsers}</p>
              </div>
            </div>
          </div>
        </div>

        <div class="section">
          <h2>Workflow Progress</h2>
          <div class="workflow-bars">
            ${Object.entries(metrics.candidatesByStage).map(([stage, count]) => `
              <div class="workflow-item">
                <div class="workflow-label">${stage} (${count})</div>
                <div class="workflow-bar">
                  <div class="workflow-fill" style="width: ${metrics.assignedUsers > 0 ? (count / metrics.assignedUsers) * 100 : 0}%; background: #0284C7;"></div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <div class="section">
          <h2>Assigned Users</h2>
          <div class="table-responsive">
            <table class="marketing-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Service</th>
                  <th>Stage</th>
                  <th>Last Activity</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                ${metrics.candidates.map(c => `
                  <tr>
                    <td>${c.name}</td>
                    <td>${c.service}</td>
                    <td><span class="stage-badge">${c.stage}</span></td>
                    <td><span style="color: ${getInactivityColor(computeInactivity(c))};">${getInactivityLabel(computeInactivity(c))}</span></td>
                    <td><span class="status-badge" style="background: ${c.status === 'active' ? '#D1FAE5' : '#FEE2E2'}; color: ${c.status === 'active' ? '#047857' : '#991B1B'};">${c.status.toUpperCase()}</span></td>
                    <td><button class="btn-view" onclick="alert('View ${c.name}')">View</button></td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;
  };

  const renderTLProfile = (userId) => {
    const data = loadMockData();
    const tl = data.teamLeaders.find(t => t.id === userId);
    if (!tl) return console.error('Team Leader not found');

    const metrics = computeTLMetrics(tl, data.candidates, data.agents);
    const container = document.querySelector('.profile-container');
    if (!container) return;

    container.innerHTML = `
      <div class="marketing-profile">
        <div class="profile-header">
          <div class="header-info">
            <h1>${tl.name}</h1>
            <p class="role-badge">Marketing Team Leader</p>
            <p class="email"><i class="fas fa-envelope"></i> ${tl.email}</p>
            <p class="phone"><i class="fas fa-phone"></i> ${tl.phone}</p>
            <p class="joined"><i class="fas fa-calendar"></i> Joined: ${formatDate(tl.joined)}</p>
            <span class="status-badge" style="background: #D1FAE5; color: #047857;">${tl.status.toUpperCase()}</span>
          </div>
        </div>

        <div class="section">
          <h2>Team Performance</h2>
          <div class="perf-grid">
            <div class="perf-card">
              <div class="perf-icon" style="background: #E0F2FE;"><i class="fas fa-users" style="color: #0284C7;"></i></div>
              <div class="perf-content">
                <p class="perf-label">Total Candidates</p>
                <p class="perf-value">${metrics.totalCandidates}</p>
              </div>
            </div>
            <div class="perf-card">
              <div class="perf-icon" style="background: #DCFCE7;"><i class="fas fa-check-circle" style="color: #22C55E;"></i></div>
              <div class="perf-content">
                <p class="perf-label">Total Placements</p>
                <p class="perf-value">${metrics.candidatesByStage['Placed'] || 0}</p>
              </div>
            </div>
            <div class="perf-card">
              <div class="perf-icon" style="background: #FEE2E2;"><i class="fas fa-exclamation-circle" style="color: #EF4444;"></i></div>
              <div class="perf-content">
                <p class="perf-label">Inactive Users</p>
                <p class="perf-value">${metrics.inactiveCount}</p>
              </div>
            </div>
          </div>
        </div>

        <div class="section">
          <h2>Agent Performance</h2>
          <div class="table-responsive">
            <table class="marketing-table">
              <thead>
                <tr>
                  <th>Agent Name</th>
                  <th>Assigned</th>
                  <th>Submitted</th>
                  <th>Interviews</th>
                  <th>Placements</th>
                  <th>Inactive</th>
                </tr>
              </thead>
              <tbody>
                ${metrics.agentPerformance.map(({ agent, metrics: m }) => `
                  <tr>
                    <td>${agent.name}</td>
                    <td>${m.assignedUsers}</td>
                    <td>${m.profilesSubmitted}</td>
                    <td>${m.interviewsScheduled}</td>
                    <td>${m.placements}</td>
                    <td>${m.inactiveUsers}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>

        <div class="section">
          <h2>Workflow Distribution</h2>
          <div class="workflow-bars">
            ${Object.entries(metrics.candidatesByStage).map(([stage, count]) => `
              <div class="workflow-item">
                <div class="workflow-label">${stage} (${count})</div>
                <div class="workflow-bar">
                  <div class="workflow-fill" style="width: ${metrics.totalCandidates > 0 ? (count / metrics.totalCandidates) * 100 : 0}%; background: #0284C7;"></div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  };

  const renderManagerProfile = (userId) => {
    const data = loadMockData();
    const manager = data.managers.find(m => m.id === userId);
    if (!manager) return console.error('Manager not found');

    const metrics = computeManagerMetrics(data.candidates, data.agents, data.teamLeaders);
    const container = document.querySelector('.profile-container');
    if (!container) return;

    container.innerHTML = `
      <div class="marketing-profile">
        <div class="profile-header">
          <div class="header-info">
            <h1>${manager.name}</h1>
            <p class="role-badge">Marketing Manager</p>
            <p class="email"><i class="fas fa-envelope"></i> ${manager.email}</p>
            <p class="phone"><i class="fas fa-phone"></i> ${manager.phone}</p>
            <p class="joined"><i class="fas fa-calendar"></i> Joined: ${formatDate(manager.joined)}</p>
            <span class="status-badge" style="background: #D1FAE5; color: #047857;">${manager.status.toUpperCase()}</span>
          </div>
        </div>

        <div class="section">
          <h2>Department KPIs</h2>
          <div class="perf-grid">
            <div class="perf-card">
              <div class="perf-icon" style="background: #E0F2FE;"><i class="fas fa-chart-pie" style="color: #0284C7;"></i></div>
              <div class="perf-content">
                <p class="perf-label">Total Candidates</p>
                <p class="perf-value">${metrics.totalCandidates}</p>
              </div>
            </div>
            <div class="perf-card">
              <div class="perf-icon" style="background: #DCFCE7;"><i class="fas fa-check-double" style="color: #22C55E;"></i></div>
              <div class="perf-content">
                <p class="perf-label">Placements</p>
                <p class="perf-value">${metrics.totalPlacements}</p>
              </div>
            </div>
            <div class="perf-card">
              <div class="perf-icon" style="background: #FEF3C7;"><i class="fas fa-percentage" style="color: #D97706;"></i></div>
              <div class="perf-content">
                <p class="perf-label">Conversion Rate</p>
                <p class="perf-value">${metrics.conversionRate}%</p>
              </div>
            </div>
            <div class="perf-card">
              <div class="perf-icon" style="background: #FEE2E2;"><i class="fas fa-exclamation-triangle" style="color: #EF4444;"></i></div>
              <div class="perf-content">
                <p class="perf-label">Inactive Users</p>
                <p class="perf-value">${metrics.inactiveCount}</p>
              </div>
            </div>
          </div>
        </div>

        <div class="section">
          <h2>Team Leader Performance</h2>
          <div class="table-responsive">
            <table class="marketing-table">
              <thead>
                <tr>
                  <th>TL Name</th>
                  <th>Total Candidates</th>
                  <th>Placements</th>
                  <th>Conversion %</th>
                  <th>Inactive</th>
                </tr>
              </thead>
              <tbody>
                ${metrics.tlPerformance.map(({ tl, metrics: m }) => `
                  <tr>
                    <td>${tl.name}</td>
                    <td>${m.totalCandidates}</td>
                    <td>${m.candidatesByStage['Placed'] || 0}</td>
                    <td>${m.totalCandidates > 0 ? Math.round(((m.candidatesByStage['Placed'] || 0) / m.totalCandidates) * 100) : 0}%</td>
                    <td>${m.inactiveCount}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>

        <div class="section">
          <h2>Workflow Funnel</h2>
          <div class="workflow-bars">
            ${Object.entries(metrics.candidatesByStage).map(([stage, count]) => `
              <div class="workflow-item">
                <div class="workflow-label">${stage} (${count})</div>
                <div class="workflow-bar">
                  <div class="workflow-fill" style="width: ${metrics.totalCandidates > 0 ? (count / metrics.totalCandidates) * 100 : 0}%; background: #0284C7;"></div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  };

  const init = () => {
    const userId = getUserFromUrl();
    const role = getRoleFromUrl();

    if (!userId || !role) return console.error('Missing userId or role');

    if (role === 'marketing_agent') renderAgentProfile(userId);
    else if (role === 'marketing_tl') renderTLProfile(userId);
    else if (role === 'marketing_manager') renderManagerProfile(userId);
  };

  return { init };
})();

document.addEventListener('DOMContentLoaded', MarketingProfileModule.init);
