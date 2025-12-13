const TechnicalProfileModule = (() => {
  const LS_PREFIX = 'wt_technical_';

  const generateMockCandidates = () => [
    { id: 'tc1', name: 'Arjun Singh', service: 'Python Development', technical_stage: 'Resume Review', resume_status: 'Approved', training_status: 'Scheduled', project_status: 'Not Assigned', assigned_to_agent: 'agent1', assigned_to_tl: 'tl1', assigned_to_manager: 'mgr1', last_activity: '2025-12-13T10:30:00Z', next_action: '2025-12-14T10:00:00Z', status: 'active', joined: '2025-01-15', activities: [{ type: 'resume_review', date: '2025-01-15', note: 'Resume Approved' }, { type: 'training', date: '2025-12-13', note: 'Training Scheduled' }] },
    { id: 'tc2', name: 'Sneha Patel', service: 'React Development', technical_stage: 'Training Started', resume_status: 'Approved', training_status: 'Started', project_status: 'Not Assigned', assigned_to_agent: 'agent1', assigned_to_tl: 'tl1', assigned_to_manager: 'mgr1', last_activity: '2025-12-12T14:00:00Z', next_action: '2025-12-15T09:00:00Z', status: 'active', joined: '2025-02-10', activities: [{ type: 'resume_review', date: '2025-02-10' }, { type: 'training', date: '2025-12-01', note: 'Training Started' }] },
    { id: 'tc3', name: 'Ravi Kumar', service: 'Node.js Development', technical_stage: 'Project In Progress', resume_status: 'Approved', training_status: 'Completed', project_status: 'In Progress', assigned_to_agent: 'agent1', assigned_to_tl: 'tl1', assigned_to_manager: 'mgr1', last_activity: '2025-12-10T09:15:00Z', next_action: null, status: 'active', joined: '2025-01-20', activities: [{ type: 'resume_review', date: '2025-01-20' }, { type: 'training', date: '2025-02-20', note: 'Training Completed' }, { type: 'project', date: '2025-12-01', note: 'Project Assigned' }] },
    { id: 'tc4', name: 'Pooja Sharma', service: 'JavaScript', technical_stage: 'Resume Review', resume_status: 'Pending', training_status: 'Not Scheduled', project_status: 'Not Assigned', assigned_to_agent: 'agent2', assigned_to_tl: 'tl1', assigned_to_manager: 'mgr1', last_activity: '2025-12-08T16:45:00Z', next_action: '2025-12-16T10:00:00Z', status: 'inactive', joined: '2025-03-05', activities: [{ type: 'resume_review', date: '2025-12-08', note: 'Awaiting review' }] },
    { id: 'tc5', name: 'Vikram Singh', service: 'Java Development', technical_stage: 'Training Started', resume_status: 'Approved', training_status: 'Started', project_status: 'Not Assigned', assigned_to_agent: 'agent2', assigned_to_tl: 'tl1', assigned_to_manager: 'mgr1', last_activity: '2025-12-13T11:00:00Z', next_action: '2025-12-18T14:00:00Z', status: 'active', joined: '2025-02-01', activities: [{ type: 'resume_review', date: '2025-02-01' }, { type: 'training', date: '2025-12-05', note: 'Training Started' }] },
    { id: 'tc6', name: 'Divya Nair', service: 'Python Development', technical_stage: 'Project Completed', resume_status: 'Approved', training_status: 'Completed', project_status: 'Completed', assigned_to_agent: 'agent1', assigned_to_tl: 'tl1', assigned_to_manager: 'mgr1', last_activity: '2025-12-12T13:20:00Z', next_action: null, status: 'active', joined: '2025-01-10', activities: [{ type: 'resume_review', date: '2025-01-10' }, { type: 'training', date: '2025-02-15', note: 'Training Completed' }, { type: 'project', date: '2025-12-12', note: 'Project Completed' }] },
    { id: 'tc7', name: 'Sunil Verma', service: 'React Development', technical_stage: 'Resume Review', resume_status: 'Pending', training_status: 'Not Scheduled', project_status: 'Not Assigned', assigned_to_agent: 'agent2', assigned_to_tl: 'tl2', assigned_to_manager: 'mgr1', last_activity: '2025-12-07T08:00:00Z', next_action: '2025-12-17T10:00:00Z', status: 'inactive', joined: '2025-02-20', activities: [{ type: 'resume_review', date: '2025-12-07', note: 'Under Review' }] },
    { id: 'tc8', name: 'Anjali Gupta', service: 'Node.js Development', technical_stage: 'Project In Progress', resume_status: 'Approved', training_status: 'Completed', project_status: 'In Progress', assigned_to_agent: 'agent3', assigned_to_tl: 'tl2', assigned_to_manager: 'mgr1', last_activity: '2025-12-13T10:30:00Z', next_action: '2025-12-15T11:00:00Z', status: 'active', joined: '2025-03-01', activities: [{ type: 'resume_review', date: '2025-03-01' }, { type: 'training', date: '2025-03-15', note: 'Training Completed' }, { type: 'project', date: '2025-12-01', note: 'Project In Progress' }] },
    { id: 'tc9', name: 'Rohit Reddy', service: 'Java Development', technical_stage: 'Training Scheduled', resume_status: 'Approved', training_status: 'Scheduled', project_status: 'Not Assigned', assigned_to_agent: 'agent3', assigned_to_tl: 'tl2', assigned_to_manager: 'mgr1', last_activity: '2025-12-06T15:00:00Z', next_action: '2025-12-20T09:00:00Z', status: 'inactive', joined: '2025-03-10', activities: [{ type: 'resume_review', date: '2025-03-10' }, { type: 'training', date: '2025-12-20', note: 'Training Scheduled' }] },
    { id: 'tc10', name: 'Meera Joshi', service: 'JavaScript', technical_stage: 'Project In Progress', resume_status: 'Approved', training_status: 'Completed', project_status: 'In Progress', assigned_to_agent: 'agent3', assigned_to_tl: 'tl2', assigned_to_manager: 'mgr1', last_activity: '2025-12-12T09:45:00Z', next_action: '2025-12-16T14:00:00Z', status: 'active', joined: '2025-02-05', activities: [{ type: 'resume_review', date: '2025-02-05' }, { type: 'training', date: '2025-02-28', note: 'Training Completed' }, { type: 'project', date: '2025-12-01', note: 'Project In Progress' }] },
    { id: 'tc11', name: 'Arjun Nair', service: 'Python Development', technical_stage: 'Project Completed', resume_status: 'Approved', training_status: 'Completed', project_status: 'Completed', assigned_to_agent: 'agent1', assigned_to_tl: 'tl1', assigned_to_manager: 'mgr1', last_activity: '2025-12-13T12:15:00Z', next_action: null, status: 'active', joined: '2025-01-25', activities: [{ type: 'resume_review', date: '2025-01-25' }, { type: 'training', date: '2025-02-25', note: 'Training Completed' }, { type: 'project', date: '2025-12-10', note: 'Project Completed' }] },
    { id: 'tc12', name: 'Simran Kaur', service: 'React Development', technical_stage: 'Training Started', resume_status: 'Approved', training_status: 'Started', project_status: 'Not Assigned', assigned_to_agent: 'agent2', assigned_to_tl: 'tl1', assigned_to_manager: 'mgr1', last_activity: '2025-12-11T16:00:00Z', next_action: '2025-12-18T10:00:00Z', status: 'active', joined: '2025-01-30', activities: [{ type: 'resume_review', date: '2025-01-30' }, { type: 'training', date: '2025-12-08', note: 'Training Started' }] },
  ];

  const generateMockAgents = () => [
    { id: 'agent1', name: 'Priya Desai', email: 'priya@wolftech.com', phone: '9876543210', joined: '2024-01-15', status: 'active', role: 'technical_agent', photo: 'https://i.pravatar.cc/150?img=1' },
    { id: 'agent2', name: 'Anil Kumar', email: 'anil@wolftech.com', phone: '9876543211', joined: '2024-02-10', status: 'active', role: 'technical_agent', photo: 'https://i.pravatar.cc/150?img=2' },
    { id: 'agent3', name: 'Deepika Choudhary', email: 'deepika@wolftech.com', phone: '9876543212', joined: '2024-03-05', status: 'active', role: 'technical_agent', photo: 'https://i.pravatar.cc/150?img=3' },
  ];

  const generateMockTeamLeaders = () => [
    { id: 'tl1', name: 'Vikram Sharma', email: 'vikram.tl@wolftech.com', phone: '9876543220', joined: '2023-06-01', status: 'active', role: 'technical_tl', agents: ['agent1', 'agent2'], photo: 'https://i.pravatar.cc/150?img=4' },
    { id: 'tl2', name: 'Pooja Bansal', email: 'pooja.tl@wolftech.com', phone: '9876543221', joined: '2023-07-15', status: 'active', role: 'technical_tl', agents: ['agent3'], photo: 'https://i.pravatar.cc/150?img=5' },
  ];

  const generateMockManagers = () => [
    { id: 'mgr1', name: 'Rajesh Krishnan', email: 'rajesh.mgr@wolftech.com', phone: '9876543230', joined: '2022-01-10', status: 'active', role: 'technical_manager', teamLeaders: ['tl1', 'tl2'], photo: 'https://i.pravatar.cc/150?img=6' },
  ];

  const getUserFromUrl = () => new URLSearchParams(window.location.search).get('userId');
  const getRoleFromUrl = () => {
    const urlRole = new URLSearchParams(window.location.search).get('role');
    if (urlRole) return urlRole;

    const path = window.location.pathname;
    if (path.includes('agent')) return 'technical_agent';
    if (path.includes('teamleader')) return 'technical_tl';
    if (path.includes('manager')) return 'technical_manager';
    return null;
  };

  const loadMockData = () => ({
    agents: generateMockAgents(),
    teamLeaders: generateMockTeamLeaders(),
    managers: generateMockManagers(),
    candidates: generateMockCandidates()
  });

  const mapEmployeeIdToMockId = (empId, role) => {
    const mapping = {
      'E030': 'mgr1',
      'E031': 'tl1',
      'E032': 'tl2',
      'E033': 'agent1',
      'E034': 'agent2',
      'E035': 'agent3',
      'E036': 'agent3'
    };
    return mapping[empId] || empId;
  };

  const computeInactivity = (candidate) => {
    const lastActivity = new Date(candidate.last_activity);
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

  const getStageColor = (stage) => {
    const colors = {
      'Resume Review': '#3B82F6',
      'Training Scheduled': '#8B5CF6',
      'Training Started': '#F59E0B',
      'Project In Progress': '#EC4899',
      'Project Completed': '#10B981'
    };
    return colors[stage] || '#6B7280';
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
    const assigned = candidates.filter(c => c.assigned_to_agent === agent.id);
    const stages = {};

    assigned.forEach(c => {
      stages[c.technical_stage] = (stages[c.technical_stage] || 0) + 1;
    });

    const inactiveCandidates = assigned.filter(c => computeInactivity(c) > 72);
    const pendingReviews = assigned.filter(c => c.resume_status === 'Pending');
    const trainingCompleted = assigned.filter(c => c.training_status === 'Completed').length;
    const projectsCompleted = assigned.filter(c => c.project_status === 'Completed').length;

    return {
      assignedCandidates: assigned.length,
      trainingScheduled: assigned.filter(c => c.training_status === 'Scheduled').length,
      trainingCompleted: trainingCompleted,
      projectsAssigned: assigned.filter(c => c.project_status !== 'Not Assigned').length,
      projectsCompleted: projectsCompleted,
      pendingReviews: pendingReviews.length,
      inactiveCandidates: inactiveCandidates.length,
      workflowStages: stages
    };
  };

  const computeTLMetrics = (tl, candidates, agents) => {
    const tlAgents = agents.filter(a => tl.agents.includes(a.id));
    const assigned = candidates.filter(c => c.assigned_to_tl === tl.id);

    const agentMetrics = tlAgents.map(a => ({
      agent: a,
      candidates: candidates.filter(c => c.assigned_to_agent === a.id).length,
      trainingCompleted: candidates.filter(c => c.assigned_to_agent === a.id && c.training_status === 'Completed').length,
      projectsCompleted: candidates.filter(c => c.assigned_to_agent === a.id && c.project_status === 'Completed').length,
      inactiveCandidates: candidates.filter(c => c.assigned_to_agent === a.id && computeInactivity(c) > 72).length
    }));

    return {
      totalTeamCandidates: assigned.length,
      trainingCompleted: assigned.filter(c => c.training_status === 'Completed').length,
      projectsCompleted: assigned.filter(c => c.project_status === 'Completed').length,
      inactiveCandidates: assigned.filter(c => computeInactivity(c) > 72).length,
      pendingResumeReviews: assigned.filter(c => c.resume_status === 'Pending').length,
      agentMetrics: agentMetrics
    };
  };

  const computeManagerMetrics = (manager, candidates, teamLeaders) => {
    const tlMetrics = teamLeaders.map(tl => ({
      tl: tl,
      candidates: candidates.filter(c => c.assigned_to_tl === tl.id).length,
      trainingCompleted: candidates.filter(c => c.assigned_to_tl === tl.id && c.training_status === 'Completed').length,
      projectsCompleted: candidates.filter(c => c.assigned_to_tl === tl.id && c.project_status === 'Completed').length,
      inactiveCandidates: candidates.filter(c => c.assigned_to_tl === tl.id && computeInactivity(c) > 72).length
    }));

    const totalCandidates = candidates.length;
    const trainingCompletionRate = totalCandidates > 0 ? Math.round((candidates.filter(c => c.training_status === 'Completed').length / totalCandidates) * 100) : 0;
    const projectCompletionRate = candidates.filter(c => c.project_status !== 'Not Assigned').length > 0 ? Math.round((candidates.filter(c => c.project_status === 'Completed').length / candidates.filter(c => c.project_status !== 'Not Assigned').length) * 100) : 0;

    return {
      totalCandidates: totalCandidates,
      trainingCompleted: candidates.filter(c => c.training_status === 'Completed').length,
      projectsCompleted: candidates.filter(c => c.project_status === 'Completed').length,
      trainingCompletionRate: trainingCompletionRate,
      projectCompletionRate: projectCompletionRate,
      inactiveCandidates: candidates.filter(c => computeInactivity(c) > 72).length,
      tlMetrics: tlMetrics,
      criticalBottlenecks: [
        ...candidates.filter(c => c.resume_status === 'Pending' && computeInactivity(c) > 48).map(c => ({ type: 'resume_pending', candidate: c })),
        ...candidates.filter(c => c.training_status === 'Scheduled' && computeInactivity(c) > 48).map(c => ({ type: 'training_not_started', candidate: c })),
        ...candidates.filter(c => c.project_status === 'In Progress' && computeInactivity(c) > 72).map(c => ({ type: 'project_inactive', candidate: c }))
      ]
    };
  };

  const renderAgentProfile = (userId) => {
    const data = loadMockData();
    const agent = data.agents.find(a => a.id === userId);
    if (!agent) return console.error('Agent not found');

    const metrics = computeAgentMetrics(agent, data.candidates);
    const assigned = data.candidates.filter(c => c.assigned_to_agent === agent.id);

    const container = document.querySelector('.profile-container');
    container.innerHTML = `
      <div class="technical-profile">
        <div class="profile-header">
          <div class="header-content">
            <div class="header-left">
              <img src="${agent.photo}" alt="${agent.name}" class="agent-photo">
              <div class="header-info">
                <h1>${agent.name}</h1>
                <span class="role-badge">Technical Agent</span>
                <p><i class="fas fa-envelope"></i>${agent.email}</p>
                <p><i class="fas fa-phone"></i>${agent.phone}</p>
                <p><i class="fas fa-calendar"></i>Joined ${formatDate(agent.joined)}</p>
              </div>
            </div>
            <div class="header-right">
              <span class="status-badge status-${agent.status}">${agent.status.toUpperCase()}</span>
            </div>
          </div>
        </div>

        <div class="metrics-grid">
          <div class="metric-card">
            <div class="metric-label">Assigned Candidates</div>
            <div class="metric-value">${metrics.assignedCandidates}</div>
          </div>
          <div class="metric-card">
            <div class="metric-label">Training Scheduled</div>
            <div class="metric-value">${metrics.trainingScheduled}</div>
          </div>
          <div class="metric-card">
            <div class="metric-label">Training Completed</div>
            <div class="metric-value">${metrics.trainingCompleted}</div>
          </div>
          <div class="metric-card">
            <div class="metric-label">Projects Assigned</div>
            <div class="metric-value">${metrics.projectsAssigned}</div>
          </div>
          <div class="metric-card">
            <div class="metric-label">Projects Completed</div>
            <div class="metric-value">${metrics.projectsCompleted}</div>
          </div>
          <div class="metric-card">
            <div class="metric-label">Pending Reviews</div>
            <div class="metric-value">${metrics.pendingReviews}</div>
          </div>
          <div class="metric-card metric-alert">
            <div class="metric-label">Inactive Candidates</div>
            <div class="metric-value">${metrics.inactiveCandidates}</div>
          </div>
        </div>

        <div class="candidates-section">
          <h2>Assigned Candidates</h2>
          <div class="search-box">
            <input type="text" id="candidateSearch" placeholder="Search candidates...">
          </div>
          <table class="candidates-table">
            <thead>
              <tr>
                <th>Candidate Name</th>
                <th>Service</th>
                <th>Technical Stage</th>
                <th>Resume Status</th>
                <th>Training Status</th>
                <th>Project Status</th>
                <th>Last Activity</th>
                <th>Inactivity</th>
              </tr>
            </thead>
            <tbody id="candidatesTableBody">
              ${assigned.map(c => {
                const inactivity = computeInactivity(c);
                return `
                  <tr>
                    <td>${c.name}</td>
                    <td>${c.service}</td>
                    <td><span class="stage-badge" style="background: ${getStageColor(c.technical_stage)}">${c.technical_stage}</span></td>
                    <td><span class="status-${c.resume_status.toLowerCase().replace(' ', '-')}">${c.resume_status}</span></td>
                    <td><span class="status-${c.training_status.toLowerCase().replace(/\s/g, '-')}">${c.training_status}</span></td>
                    <td><span class="status-${c.project_status.toLowerCase().replace(/\s/g, '-')}">${c.project_status}</span></td>
                    <td>${formatDate(c.last_activity)}</td>
                    <td><span class="inactivity-badge" style="background: ${getInactivityColor(inactivity)}">${getInactivityLabel(inactivity)}</span></td>
                  </tr>
                `;
              }).join('')}
            </tbody>
          </table>
        </div>

        <div class="activity-section">
          <h2>Recent Activity</h2>
          <div class="activity-timeline">
            ${assigned.slice(0, 5).map(c => {
              const latestActivity = c.activities[c.activities.length - 1];
              return `
                <div class="activity-item">
                  <div class="activity-icon"><i class="fas fa-circle"></i></div>
                  <div class="activity-content">
                    <div class="activity-title">${c.name} - ${latestActivity.type.replace(/_/g, ' ')}</div>
                    <div class="activity-note">${latestActivity.note || ''}</div>
                    <div class="activity-date">${formatDate(latestActivity.date)}</div>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      </div>
    `;

    setupTableSearch('candidateSearch', 'candidatesTableBody');
  };

  const renderTLProfile = (userId) => {
    const data = loadMockData();
    const tl = data.teamLeaders.find(t => t.id === userId);
    if (!tl) return console.error('Team Leader not found');

    const metrics = computeTLMetrics(tl, data.candidates, data.agents);

    const container = document.querySelector('.profile-container');
    container.innerHTML = `
      <div class="technical-profile">
        <div class="profile-header">
          <div class="header-content">
            <div class="header-left">
              <img src="${tl.photo}" alt="${tl.name}" class="agent-photo">
              <div class="header-info">
                <h1>${tl.name}</h1>
                <span class="role-badge">Technical Team Leader</span>
                <p><i class="fas fa-envelope"></i>${tl.email}</p>
                <p><i class="fas fa-phone"></i>${tl.phone}</p>
                <p><i class="fas fa-calendar"></i>Joined ${formatDate(tl.joined)}</p>
              </div>
            </div>
            <div class="header-right">
              <span class="status-badge status-${tl.status}">${tl.status.toUpperCase()}</span>
            </div>
          </div>
        </div>

        <div class="metrics-grid">
          <div class="metric-card">
            <div class="metric-label">Team Candidates</div>
            <div class="metric-value">${metrics.totalTeamCandidates}</div>
          </div>
          <div class="metric-card">
            <div class="metric-label">Training Completed</div>
            <div class="metric-value">${metrics.trainingCompleted}</div>
          </div>
          <div class="metric-card">
            <div class="metric-label">Projects Completed</div>
            <div class="metric-value">${metrics.projectsCompleted}</div>
          </div>
          <div class="metric-card">
            <div class="metric-label">Pending Reviews</div>
            <div class="metric-value">${metrics.pendingResumeReviews}</div>
          </div>
          <div class="metric-card metric-alert">
            <div class="metric-label">Inactive Candidates</div>
            <div class="metric-value">${metrics.inactiveCandidates}</div>
          </div>
        </div>

        <div class="team-section">
          <h2>Team Agent Performance</h2>
          <table class="team-table">
            <thead>
              <tr>
                <th>Agent Name</th>
                <th>Assigned Candidates</th>
                <th>Training Completed</th>
                <th>Projects Completed</th>
                <th>Inactive Candidates</th>
              </tr>
            </thead>
            <tbody>
              ${metrics.agentMetrics.map(m => `
                <tr>
                  <td>${m.agent.name}</td>
                  <td>${m.candidates}</td>
                  <td>${m.trainingCompleted}</td>
                  <td>${m.projectsCompleted}</td>
                  <td><span class="alert-badge">${m.inactiveCandidates}</span></td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>

        <div class="candidates-section">
          <h2>Team Candidates Overview</h2>
          <div class="search-box">
            <input type="text" id="candidateSearch" placeholder="Search candidates...">
          </div>
          <table class="candidates-table">
            <thead>
              <tr>
                <th>Candidate Name</th>
                <th>Service</th>
                <th>Technical Stage</th>
                <th>Training Status</th>
                <th>Project Status</th>
                <th>Last Activity</th>
                <th>Inactivity</th>
              </tr>
            </thead>
            <tbody id="candidatesTableBody">
              ${data.candidates.filter(c => c.assigned_to_tl === userId).map(c => {
                const inactivity = computeInactivity(c);
                return `
                  <tr>
                    <td>${c.name}</td>
                    <td>${c.service}</td>
                    <td><span class="stage-badge" style="background: ${getStageColor(c.technical_stage)}">${c.technical_stage}</span></td>
                    <td><span class="status-${c.training_status.toLowerCase().replace(/\s/g, '-')}">${c.training_status}</span></td>
                    <td><span class="status-${c.project_status.toLowerCase().replace(/\s/g, '-')}">${c.project_status}</span></td>
                    <td>${formatDate(c.last_activity)}</td>
                    <td><span class="inactivity-badge" style="background: ${getInactivityColor(inactivity)}">${getInactivityLabel(inactivity)}</span></td>
                  </tr>
                `;
              }).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;

    setupTableSearch('candidateSearch', 'candidatesTableBody');
  };

  const renderManagerProfile = (userId) => {
    const data = loadMockData();
    const manager = data.managers.find(m => m.id === userId);
    if (!manager) return console.error('Manager not found');

    const metrics = computeManagerMetrics(manager, data.candidates, data.teamLeaders);

    const container = document.querySelector('.profile-container');
    container.innerHTML = `
      <div class="technical-profile">
        <div class="profile-header">
          <div class="header-content">
            <div class="header-left">
              <img src="${manager.photo}" alt="${manager.name}" class="agent-photo">
              <div class="header-info">
                <h1>${manager.name}</h1>
                <span class="role-badge">Technical Manager</span>
                <p><i class="fas fa-envelope"></i>${manager.email}</p>
                <p><i class="fas fa-phone"></i>${manager.phone}</p>
                <p><i class="fas fa-calendar"></i>Joined ${formatDate(manager.joined)}</p>
              </div>
            </div>
            <div class="header-right">
              <span class="status-badge status-${manager.status}">${manager.status.toUpperCase()}</span>
            </div>
          </div>
        </div>

        <div class="metrics-grid">
          <div class="metric-card">
            <div class="metric-label">Total Candidates</div>
            <div class="metric-value">${metrics.totalCandidates}</div>
          </div>
          <div class="metric-card">
            <div class="metric-label">Training Completed</div>
            <div class="metric-value">${metrics.trainingCompleted}</div>
          </div>
          <div class="metric-card">
            <div class="metric-label">Training Rate</div>
            <div class="metric-value">${metrics.trainingCompletionRate}%</div>
          </div>
          <div class="metric-card">
            <div class="metric-label">Projects Completed</div>
            <div class="metric-value">${metrics.projectsCompleted}</div>
          </div>
          <div class="metric-card">
            <div class="metric-label">Project Rate</div>
            <div class="metric-value">${metrics.projectCompletionRate}%</div>
          </div>
          <div class="metric-card metric-alert">
            <div class="metric-label">Inactive Candidates</div>
            <div class="metric-value">${metrics.inactiveCandidates}</div>
          </div>
        </div>

        <div class="team-leaders-section">
          <h2>Team Leaders Performance</h2>
          <table class="team-table">
            <thead>
              <tr>
                <th>Team Leader</th>
                <th>Candidates</th>
                <th>Training Completed</th>
                <th>Projects Completed</th>
                <th>Inactive</th>
              </tr>
            </thead>
            <tbody>
              ${metrics.tlMetrics.map(m => `
                <tr>
                  <td>${m.tl.name}</td>
                  <td>${m.candidates}</td>
                  <td>${m.trainingCompleted}</td>
                  <td>${m.projectsCompleted}</td>
                  <td><span class="alert-badge">${m.inactiveCandidates}</span></td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>

        <div class="bottlenecks-section">
          <h2>Critical Bottlenecks (${metrics.criticalBottlenecks.length})</h2>
          <div class="bottlenecks-list">
            ${metrics.criticalBottlenecks.length > 0 ? metrics.criticalBottlenecks.slice(0, 10).map(b => `
              <div class="bottleneck-item">
                <span class="bottleneck-type">${b.type.replace(/_/g, ' ').toUpperCase()}</span>
                <span class="bottleneck-candidate">${b.candidate.name}</span>
                <span class="bottleneck-stage">${b.candidate.technical_stage}</span>
              </div>
            `).join('') : '<p class="no-data">No critical bottlenecks</p>'}
          </div>
        </div>

        <div class="candidates-section">
          <h2>All Department Candidates</h2>
          <table class="candidates-table">
            <thead>
              <tr>
                <th>Candidate Name</th>
                <th>Service</th>
                <th>Technical Stage</th>
                <th>Training Status</th>
                <th>Project Status</th>
                <th>Last Activity</th>
                <th>Inactivity</th>
              </tr>
            </thead>
            <tbody id="candidatesTableBody">
              ${data.candidates.map(c => {
                const inactivity = computeInactivity(c);
                return `
                  <tr>
                    <td>${c.name}</td>
                    <td>${c.service}</td>
                    <td><span class="stage-badge" style="background: ${getStageColor(c.technical_stage)}">${c.technical_stage}</span></td>
                    <td><span class="status-${c.training_status.toLowerCase().replace(/\s/g, '-')}">${c.training_status}</span></td>
                    <td><span class="status-${c.project_status.toLowerCase().replace(/\s/g, '-')}">${c.project_status}</span></td>
                    <td>${formatDate(c.last_activity)}</td>
                    <td><span class="inactivity-badge" style="background: ${getInactivityColor(inactivity)}">${getInactivityLabel(inactivity)}</span></td>
                  </tr>
                `;
              }).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;

    setupTableSearch('candidateSearch', 'candidatesTableBody');
  };

  const setupTableSearch = (searchId, tableBodyId) => {
    const searchInput = document.getElementById(searchId);
    const tableBody = document.getElementById(tableBodyId);

    if (!searchInput || !tableBody) return;

    searchInput.addEventListener('keyup', (e) => {
      const query = e.target.value.toLowerCase();
      const rows = tableBody.querySelectorAll('tr');

      rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        row.style.display = text.includes(query) ? '' : 'none';
      });
    });
  };

  const init = () => {
    let userId = getUserFromUrl();
    const role = getRoleFromUrl();

    if (!role) return console.error('Could not determine role from URL');

    if (!userId) {
      if (role === 'technical_agent') userId = 'agent1';
      else if (role === 'technical_tl') userId = 'tl1';
      else if (role === 'technical_manager') userId = 'mgr1';
    } else {
      userId = mapEmployeeIdToMockId(userId, role);
    }

    if (role === 'technical_agent') renderAgentProfile(userId);
    else if (role === 'technical_tl') renderTLProfile(userId);
    else if (role === 'technical_manager') renderManagerProfile(userId);
  };

  return { init };
})();

document.addEventListener('DOMContentLoaded', TechnicalProfileModule.init);
