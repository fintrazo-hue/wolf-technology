document.addEventListener('DOMContentLoaded', function() {
  const departments = window.MOCK_DATA?.departments || [];
  const employees = window.MOCK_DATA?.employees || [];
  const dashboardStats = window.MOCK_DATA?.dashboardStats || {};

  const getDepartmentStats = () => {
    return {
      accounts: {
        name: 'Accounts',
        managers: employees.filter(e => e.department === 'accounts' && e.position === 'manager').length,
        teamLeaders: employees.filter(e => e.department === 'accounts' && e.position === 'team_leader').length,
        agents: employees.filter(e => e.department === 'accounts' && e.position === 'agent').length,
        activeWorkflows: 12,
        pendingTasks: 8,
        inactiveCandidates: 3
      },
      technical: {
        name: 'Technical',
        managers: employees.filter(e => e.department === 'technical' && e.position === 'manager').length,
        teamLeaders: employees.filter(e => e.department === 'technical' && e.position === 'team_leader').length,
        agents: employees.filter(e => e.department === 'technical' && e.position === 'agent').length,
        activeWorkflows: 18,
        pendingTasks: 15,
        inactiveCandidates: 2
      },
      marketing: {
        name: 'Marketing',
        managers: employees.filter(e => e.department === 'marketing' && e.position === 'manager').length,
        teamLeaders: employees.filter(e => e.department === 'marketing' && e.position === 'team_leader').length,
        agents: employees.filter(e => e.department === 'marketing' && e.position === 'agent').length,
        activeWorkflows: 14,
        pendingTasks: 10,
        inactiveCandidates: 4
      },
      business_development: {
        name: 'Business Development',
        managers: employees.filter(e => e.department === 'business_development' && e.position === 'manager').length,
        teamLeaders: employees.filter(e => e.department === 'business_development' && e.position === 'team_leader').length,
        agents: employees.filter(e => e.department === 'business_development' && e.position === 'agent').length,
        activeWorkflows: 16,
        pendingTasks: 12,
        inactiveCandidates: 1
      },
      sales: {
        name: 'Sales',
        managers: employees.filter(e => e.department === 'sales' && e.position === 'manager').length,
        teamLeaders: employees.filter(e => e.department === 'sales' && e.position === 'team_leader').length,
        agents: employees.filter(e => e.department === 'sales' && e.position === 'agent').length,
        activeWorkflows: 15,
        pendingTasks: 11,
        inactiveCandidates: 2
      }
    };
  };

  const renderDepartmentsTable = () => {
    const tbody = document.querySelector('#departmentsTable tbody');
    if (!tbody) return;

    const stats = getDepartmentStats();
    const deptKeys = Object.keys(stats);

    tbody.innerHTML = deptKeys.map(key => {
      const dept = stats[key];
      const totalEmployees = dept.managers + dept.teamLeaders + dept.agents;
      const healthScore = 100 - (dept.inactiveCandidates * 5 + dept.pendingTasks * 2);

      return `
        <tr>
          <td>${key.toUpperCase()}</td>
          <td><strong>${dept.name}</strong></td>
          <td>${dept.managers}</td>
          <td>${dept.teamLeaders}</td>
          <td>${dept.agents}</td>
          <td>${totalEmployees}</td>
          <td><span class="badge bg-success">${dept.activeWorkflows} Active</span></td>
          <td><span class="badge bg-warning">${dept.pendingTasks} Pending</span></td>
          <td><span class="badge bg-secondary">${dept.inactiveCandidates} Inactive</span></td>
          <td>
            <div class="progress" style="height: 20px;">
              <div class="progress-bar ${healthScore >= 80 ? 'bg-success' : healthScore >= 60 ? 'bg-warning' : 'bg-danger'}"
                   role="progressbar" style="width: ${healthScore}%" aria-valuenow="${healthScore}"
                   aria-valuemin="0" aria-valuemax="100">${healthScore}%</div>
            </div>
          </td>
          <td>
            <button class="btn btn-sm btn-primary view-dept" data-dept="${key}">
              <i class="fas fa-eye"></i>
            </button>
          </td>
        </tr>
      `;
    }).join('');

    attachEventListeners();
  };

  const attachEventListeners = () => {
    document.querySelectorAll('.view-dept').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const deptKey = e.currentTarget.dataset.dept;
        showDepartmentDetails(deptKey);
      });
    });
  };

  const showDepartmentDetails = (deptKey) => {
    const stats = getDepartmentStats();
    const dept = stats[deptKey];
    const deptEmployees = employees.filter(e => e.department === deptKey);

    const modal = document.createElement('div');
    modal.className = 'modal fade show';
    modal.style.display = 'block';
    modal.style.backgroundColor = 'rgba(0,0,0,0.5)';
    modal.innerHTML = `
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">${dept.name} Department Details</h5>
            <button type="button" class="btn-close" onclick="this.closest('.modal').remove()"></button>
          </div>
          <div class="modal-body">
            <div class="row mb-3">
              <div class="col-md-3 text-center">
                <h4>${deptEmployees.length}</h4>
                <p>Total Employees</p>
              </div>
              <div class="col-md-3 text-center">
                <h4>${dept.activeWorkflows}</h4>
                <p>Active Workflows</p>
              </div>
              <div class="col-md-3 text-center">
                <h4>${dept.pendingTasks}</h4>
                <p>Pending Tasks</p>
              </div>
              <div class="col-md-3 text-center">
                <h4>${dept.inactiveCandidates}</h4>
                <p>Inactive Candidates</p>
              </div>
            </div>
            <hr>
            <h6>Team Members</h6>
            <table class="table table-sm">
              <thead><tr><th>Name</th><th>Position</th><th>Email</th><th>Performance</th></tr></thead>
              <tbody>
                ${deptEmployees.map(emp => `
                  <tr>
                    <td>${emp.name}</td>
                    <td>${emp.position.replace('_', ' ').toUpperCase()}</td>
                    <td>${emp.email}</td>
                    <td><span class="badge bg-${emp.performance >= 90 ? 'success' : emp.performance >= 80 ? 'info' : 'warning'}">${emp.performance}%</span></td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" onclick="this.closest('.modal').remove()">Close</button>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(modal);
  };

  renderDepartmentsTable();
});
