document.addEventListener('DOMContentLoaded', function() {
  const leads = window.MOCK_DATA?.leads || [];
  const employees = window.MOCK_DATA?.employees || [];
  const billing = window.MOCK_DATA?.billing || [];

  const renderReports = () => {
    const reportsContainer = document.querySelector('.dashboard-content');
    if (!reportsContainer) return;

    const reportTabs = createReportTabs();
    reportsContainer.insertBefore(reportTabs, reportsContainer.querySelector('.data-section'));

    renderCandidateProgressReport();
    attachReportTabListeners();
  };

  const createReportTabs = () => {
    const container = document.createElement('div');
    container.className = 'report-tabs mb-3 d-flex gap-2 flex-wrap';
    container.innerHTML = `
      <button class="report-tab active" data-report="candidate">Candidate Progress</button>
      <button class="report-tab" data-report="department">Department Performance</button>
      <button class="report-tab" data-report="lead">Lead Conversion</button>
      <button class="report-tab" data-report="workflow">Workflow Completion</button>
    `;
    return container;
  };

  const attachReportTabListeners = () => {
    document.querySelectorAll('.report-tab').forEach(btn => {
      btn.addEventListener('click', (e) => {
        document.querySelectorAll('.report-tab').forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');

        const report = e.target.dataset.report;
        switch(report) {
          case 'candidate':
            renderCandidateProgressReport();
            break;
          case 'department':
            renderDepartmentPerformanceReport();
            break;
          case 'lead':
            renderLeadConversionReport();
            break;
          case 'workflow':
            renderWorkflowCompletionReport();
            break;
        }
      });
    });
  };

  const renderCandidateProgressReport = () => {
    const tbody = document.querySelector('#reportsTable tbody');
    if (!tbody) return;

    tbody.innerHTML = billing.map((record, idx) => {
      const progressClass = record.onboardingProgress >= 80 ? 'success' : record.onboardingProgress >= 50 ? 'info' : 'warning';
      return `
        <tr>
          <td>${idx + 1}</td>
          <td>${record.candidateName}</td>
          <td>${record.productName}</td>
          <td>${record.assignedDepartment.charAt(0).toUpperCase() + record.assignedDepartment.slice(1)}</td>
          <td>
            <div class="progress" style="height: 20px;">
              <div class="progress-bar bg-${progressClass}" role="progressbar" style="width: ${record.onboardingProgress}%">${record.onboardingProgress}%</div>
            </div>
          </td>
          <td><span class="badge bg-${record.paymentStatus === 'paid' ? 'success' : 'warning'}">${record.paymentStatus.toUpperCase()}</span></td>
        </tr>
      `;
    }).join('');
  };

  const renderDepartmentPerformanceReport = () => {
    const tbody = document.querySelector('#reportsTable tbody');
    if (!tbody) return;

    const deptPerformance = {
      'Accounts': { employees: 7, avgPerformance: 86, leads: 0 },
      'Technical': { employees: 7, avgPerformance: 89, leads: 0 },
      'Marketing': { employees: 7, avgPerformance: 84, leads: 8 },
      'BD': { employees: 7, avgPerformance: 91, leads: 12 },
      'Sales': { employees: 7, avgPerformance: 88, leads: 10 }
    };

    tbody.innerHTML = Object.entries(deptPerformance).map(([dept, data]) => `
      <tr>
        <td>${dept}</td>
        <td>${data.employees}</td>
        <td>${data.leads}</td>
        <td>
          <div class="progress" style="height: 20px;">
            <div class="progress-bar bg-${data.avgPerformance >= 90 ? 'success' : data.avgPerformance >= 80 ? 'info' : 'warning'}"
                 role="progressbar" style="width: ${data.avgPerformance}%">${data.avgPerformance}%</div>
          </div>
        </td>
        <td>${Math.floor(Math.random() * 25 + 45)}K</td>
      </tr>
    `).join('');
  };

  const renderLeadConversionReport = () => {
    const tbody = document.querySelector('#reportsTable tbody');
    if (!tbody) return;

    const stages = ['Initial Contact', 'Qualification', 'Discovery', 'Proposal', 'Negotiation', 'Closing', 'Won'];
    tbody.innerHTML = stages.map((stage, idx) => {
      const count = Math.floor(30 * Math.pow(0.8, idx));
      const conversion = idx > 0 ? Math.floor((count / Math.floor(30 * Math.pow(0.8, idx - 1))) * 100) : 100;

      return `
        <tr>
          <td>${stage}</td>
          <td>${count}</td>
          <td>${conversion}%</td>
          <td><span class="badge bg-${conversion >= 60 ? 'success' : 'warning'}">${conversion >= 60 ? 'Good' : 'Needs Improvement'}</span></td>
        </tr>
      `;
    }).join('');
  };

  const renderWorkflowCompletionReport = () => {
    const tbody = document.querySelector('#reportsTable tbody');
    if (!tbody) return;

    const workflows = [
      { name: 'Accounts Onboarding', completed: 7, pending: 3, avgDays: 5 },
      { name: 'Technical Training', completed: 12, pending: 6, avgDays: 8 },
      { name: 'Marketing Placement', completed: 9, pending: 5, avgDays: 6 },
      { name: 'Lead Management', completed: 14, pending: 8, avgDays: 7 },
      { name: 'Sales Pipeline', completed: 11, pending: 7, avgDays: 9 }
    ];

    tbody.innerHTML = workflows.map(wf => `
      <tr>
        <td>${wf.name}</td>
        <td>${wf.completed}</td>
        <td>${wf.pending}</td>
        <td>${wf.avgDays} days</td>
        <td>
          <div class="progress" style="height: 20px;">
            <div class="progress-bar bg-success" role="progressbar"
                 style="width: ${(wf.completed / (wf.completed + wf.pending)) * 100}%">${Math.round((wf.completed / (wf.completed + wf.pending)) * 100)}%</div>
          </div>
        </td>
      </tr>
    `).join('');
  };

  renderReports();
});
