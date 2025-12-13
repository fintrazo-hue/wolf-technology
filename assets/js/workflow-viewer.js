document.addEventListener('DOMContentLoaded', function() {
  const workflows = window.MOCK_DATA?.workflows || {};
  const accountsData = window.MOCK_DATA?.accountsOnboarding || [];

  const renderWorkflowTabs = () => {
    const workflowSelect = document.querySelector('.workflow-select') || createWorkflowSelect();
    if (!workflowSelect) return;

    const tabs = Object.keys(workflows).map(key => {
      const dept = key === 'business_development' ? 'BD' : key.charAt(0).toUpperCase() + key.slice(1);
      return `<button class="workflow-tab" data-workflow="${key}">${dept}</button>`;
    }).join('');

    workflowSelect.innerHTML = tabs;
    attachWorkflowListeners();
    showWorkflow(Object.keys(workflows)[0]);
  };

  const createWorkflowSelect = () => {
    const section = document.querySelector('.data-section');
    if (!section) return null;
    const container = document.createElement('div');
    container.className = 'workflow-select mb-3 d-flex gap-2 flex-wrap';
    section.insertBefore(container, section.querySelector('.data-table-container'));
    return container;
  };

  const attachWorkflowListeners = () => {
    document.querySelectorAll('.workflow-tab').forEach(btn => {
      btn.addEventListener('click', (e) => {
        document.querySelectorAll('.workflow-tab').forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        showWorkflow(e.target.dataset.workflow);
      });
    });
  };

  const showWorkflow = (workflowKey) => {
    const workflow = workflows[workflowKey];
    if (!workflow) return;

    const container = document.querySelector('.workflow-container') || createWorkflowContainer();
    const steps = workflow.steps || [];
    const midpoint = Math.ceil(steps.length / 2);

    const stepsHTML = steps.map((step, idx) => {
      const completed = Math.random() > 0.4;
      const pending = !completed;
      return `
        <div class="workflow-step ${completed ? 'completed' : 'pending'}" style="flex: 1;">
          <div class="step-circle">${idx + 1}</div>
          <div class="step-label">${step}</div>
          <div class="step-status">${completed ? '✓ Complete' : '⏳ Pending'}</div>
        </div>
      `;
    }).join('');

    const stats = {
      completed: steps.filter((_, idx) => idx < midpoint).length,
      pending: steps.length - midpoint,
      totalDays: Math.floor(Math.random() * 15) + 5
    };

    container.innerHTML = `
      <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
        <h5>${workflow.name}</h5>
        <p class="text-muted">${workflow.description}</p>
        <div class="row mt-3">
          <div class="col-md-3"><strong>${stats.completed}</strong> Completed</div>
          <div class="col-md-3"><strong>${stats.pending}</strong> Pending</div>
          <div class="col-md-3"><strong>${stats.totalDays}</strong> Avg Days</div>
          <div class="col-md-3"><strong>5</strong> Assigned Users</div>
        </div>
      </div>
      <div style="display: flex; align-items: center; gap: 10px; overflow-x: auto; padding: 20px 0;">
        ${stepsHTML}
      </div>
    `;
  };

  const createWorkflowContainer = () => {
    const section = document.querySelector('.data-section');
    if (!section) return null;
    const container = document.createElement('div');
    container.className = 'workflow-container';
    section.appendChild(container);
    return container;
  };

  const renderWorkflowTable = () => {
    const tbody = document.querySelector('#workflowTable tbody');
    if (!tbody) return;

    const rows = accountsData.slice(0, 10).map(record => {
      const stepsCompleted = record.completedSteps.length;
      const totalSteps = record.completedSteps.length + (record.status === 'completed' ? 0 : 2);

      return `
        <tr>
          <td>${record.id}</td>
          <td>${record.billingId}</td>
          <td>${record.customerName}</td>
          <td><span class="badge bg-${record.status === 'completed' ? 'success' : record.status === 'in_progress' ? 'info' : 'warning'}">${record.status.replace('_', ' ').toUpperCase()}</span></td>
          <td>${stepsCompleted}/${totalSteps}</td>
          <td>${record.currentStep}</td>
          <td>${new Date(record.lastUpdate).toLocaleDateString()}</td>
        </tr>
      `;
    }).join('');

    tbody.innerHTML = rows;
  };

  const addWorkflowButtonHandler = () => {
    const btn = document.querySelector('#addWorkflowBtn');
    if (btn) {
      btn.addEventListener('click', () => {
        const formHTML = `
          <form id="addWorkflowForm">
            <div class="mb-3">
              <label class="form-label">Record ID *</label>
              <input type="text" class="form-control" name="recordId" required>
            </div>
            <div class="row">
              <div class="col-md-6 mb-3">
                <label class="form-label">Billing ID *</label>
                <input type="text" class="form-control" name="billingId" required>
              </div>
              <div class="col-md-6 mb-3">
                <label class="form-label">Customer Name *</label>
                <input type="text" class="form-control" name="customerName" required>
              </div>
            </div>
            <div class="mb-3">
              <label class="form-label">Current Step *</label>
              <input type="text" class="form-control" name="currentStep" placeholder="e.g., KYC Verification" required>
            </div>
            <div class="mb-3">
              <label class="form-label">Workflow Status *</label>
              <select class="form-select" name="status" required>
                <option value="in_progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="pending">Pending</option>
              </select>
            </div>
            <button type="submit" class="btn btn-success">Add Workflow Record</button>
          </form>
        `;
        FormHandler.createModal('Add Workflow Record', formHTML, (modal, form) => {
          const errors = [];
          const fd = new FormData(form);
          if (!fd.get('recordId')) errors.push('Record ID is required');
          if (!fd.get('billingId')) errors.push('Billing ID is required');
          if (!fd.get('customerName')) errors.push('Customer name is required');
          if (errors.length > 0) { FormHandler.showErrors(errors); return; }
          FormHandler.closeModal(modal);
          FormHandler.showSuccess('Workflow record added successfully!');
          renderWorkflowTable();
        });
      });
    }
  };

  renderWorkflowTabs();
  renderWorkflowTable();
  addWorkflowButtonHandler();
});
