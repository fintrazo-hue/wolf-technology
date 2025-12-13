document.addEventListener('DOMContentLoaded', function() {
  let leads = [...(window.MOCK_DATA?.leads || [])];
  const employees = window.MOCK_DATA?.employees || [];

  const addLeadButtonHandler = () => {
    const btn = document.querySelector('#addLeadBtn');
    if (btn) {
      btn.addEventListener('click', showAddLeadForm);
    }
  };

  const showAddLeadForm = () => {
    const formHTML = `
      <form id="addLeadForm">
        <div class="row">
          <div class="col-md-6 mb-3">
            <label class="form-label">Lead Name *</label>
            <input type="text" class="form-control" name="leadName" required>
          </div>
          <div class="col-md-6 mb-3">
            <label class="form-label">Email *</label>
            <input type="email" class="form-control" name="email" required>
          </div>
        </div>
        <div class="row">
          <div class="col-md-6 mb-3">
            <label class="form-label">Phone *</label>
            <input type="tel" class="form-control" name="phone" required>
          </div>
          <div class="col-md-6 mb-3">
            <label class="form-label">Company *</label>
            <input type="text" class="form-control" name="company" required>
          </div>
        </div>
        <div class="row">
          <div class="col-md-4 mb-3">
            <label class="form-label">Lead Stage *</label>
            <select class="form-select" name="stage" required>
              <option value="">Select Stage</option>
              <option value="Initial Contact">Initial Contact</option>
              <option value="Qualified">Qualified</option>
              <option value="In Discussion">In Discussion</option>
              <option value="Proposal Sent">Proposal Sent</option>
              <option value="Negotiation">Negotiation</option>
            </select>
          </div>
          <div class="col-md-4 mb-3">
            <label class="form-label">Assigned To *</label>
            <select class="form-select" name="assignedTo" required>
              <option value="">Select Agent</option>
              <option value="Raj Sharma">Raj Sharma</option>
              <option value="Priya Singh">Priya Singh</option>
              <option value="Amit Kumar">Amit Kumar</option>
            </select>
          </div>
          <div class="col-md-4 mb-3">
            <label class="form-label">Priority *</label>
            <select class="form-select" name="priority" required>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
        </div>
        <div class="mb-3">
          <label class="form-label">Lead Value (₹) *</label>
          <input type="number" class="form-control" name="value" min="0" required>
        </div>
        <button type="submit" class="btn btn-success">Add Lead</button>
      </form>
    `;

    FormHandler.createModal('Add New Lead', formHTML, (modal, form) => {
      const errors = [];
      const formData = new FormData(form);

      if (!formData.get('leadName')) errors.push('Lead name is required');
      if (!formData.get('email')) errors.push('Email is required');
      if (!formData.get('phone')) errors.push('Phone is required');
      if (!formData.get('company')) errors.push('Company is required');

      if (errors.length > 0) {
        FormHandler.showErrors(errors);
        return;
      }

      const newLead = {
        id: (leads.length + 1).toString(),
        name: formData.get('leadName'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        company: formData.get('company'),
        stage: formData.get('stage'),
        assignedToName: formData.get('assignedTo'),
        priority: formData.get('priority'),
        value: parseInt(formData.get('value')),
        lastActivity: new Date().toISOString(),
        progress: 25
      };

      leads.push(newLead);
      FormHandler.closeModal(modal);
      FormHandler.showSuccess('Lead added successfully!');
      renderLeadsTable();
    });
  };

  const renderLeadsTable = () => {
    const tbody = document.querySelector('#crmLeadsTable tbody');
    if (!tbody) return;

    tbody.innerHTML = leads.map(lead => {
      const daysInactive = Math.floor((new Date() - new Date(lead.lastActivity)) / (1000 * 60 * 60 * 24));
      const inactivityClass = daysInactive > 3 ? 'text-danger' : daysInactive > 1 ? 'text-warning' : 'text-success';

      return `
        <tr>
          <td>${lead.id}</td>
          <td><strong>${lead.name}</strong></td>
          <td>${lead.company}</td>
          <td>${lead.email}</td>
          <td>${lead.phone}</td>
          <td><span class="badge bg-${getStageColor(lead.stage)}">${formatStage(lead.stage)}</span></td>
          <td>${lead.assignedToName}</td>
          <td><span class="badge bg-${getPriorityColor(lead.priority)}">${lead.priority.toUpperCase()}</span></td>
          <td><span class="${inactivityClass}">${daysInactive}d ago</span></td>
          <td>
            <div class="progress" style="height: 20px;">
              <div class="progress-bar" role="progressbar" style="width: ${lead.progress}%"
                   aria-valuenow="${lead.progress}" aria-valuemin="0" aria-valuemax="100">${lead.progress}%</div>
            </div>
          </td>
          <td>
            <button class="btn btn-sm btn-primary view-lead" data-id="${lead.id}">
              <i class="fas fa-eye"></i>
            </button>
            <button class="btn btn-sm btn-warning edit-lead" data-id="${lead.id}">
              <i class="fas fa-edit"></i>
            </button>
          </td>
        </tr>
      `;
    }).join('');

    attachEventListeners();
  };

  const getStageColor = (stage) => {
    const colors = {
      'initial_contact': 'secondary',
      'qualification': 'info',
      'discovery': 'primary',
      'proposal': 'warning',
      'negotiation': 'orange',
      'closing': 'success',
      'lead_generation': 'secondary',
      'nurturing': 'info'
    };
    return colors[stage] || 'secondary';
  };

  const getPriorityColor = (priority) => {
    const colors = { 'high': 'danger', 'medium': 'warning', 'low': 'secondary' };
    return colors[priority] || 'secondary';
  };

  const formatStage = (stage) => {
    return stage.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  };

  const attachEventListeners = () => {
    document.querySelectorAll('.view-lead').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const leadId = e.currentTarget.dataset.id;
        showLeadDetails(leadId);
      });
    });

    document.querySelectorAll('.edit-lead').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const leadId = e.currentTarget.dataset.id;
        alert(`Edit functionality for lead ${leadId} - Coming soon!`);
      });
    });
  };

  const showLeadDetails = (leadId) => {
    const lead = leads.find(l => l.id === leadId);
    if (!lead) return;

    const modal = document.createElement('div');
    modal.className = 'modal fade show';
    modal.style.display = 'block';
    modal.style.backgroundColor = 'rgba(0,0,0,0.5)';
    modal.innerHTML = `
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Lead Details: ${lead.name}</h5>
            <button type="button" class="btn-close" onclick="this.closest('.modal').remove()"></button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-md-6">
                <p><strong>Company:</strong> ${lead.company}</p>
                <p><strong>Email:</strong> ${lead.email}</p>
                <p><strong>Phone:</strong> ${lead.phone}</p>
                <p><strong>Source:</strong> ${formatStage(lead.source)}</p>
              </div>
              <div class="col-md-6">
                <p><strong>Stage:</strong> <span class="badge bg-${getStageColor(lead.stage)}">${formatStage(lead.stage)}</span></p>
                <p><strong>Priority:</strong> <span class="badge bg-${getPriorityColor(lead.priority)}">${lead.priority.toUpperCase()}</span></p>
                <p><strong>Value:</strong> ₹${lead.value.toLocaleString()}</p>
                <p><strong>Progress:</strong> ${lead.progress}%</p>
              </div>
            </div>
            <hr>
            <p><strong>Assigned To:</strong> ${lead.assignedToName} (${lead.department})</p>
            <p><strong>Last Activity:</strong> ${new Date(lead.lastActivity).toLocaleString()}</p>
            <p><strong>Notes:</strong> ${lead.notes}</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" onclick="this.closest('.modal').remove()">Close</button>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(modal);
  };

  const renderStats = () => {
    const statsContainer = document.querySelector('.dashboard-content');
    if (!statsContainer) return;

    const totalLeads = leads.length;
    const qualifiedLeads = leads.filter(l => l.status === 'qualified').length;
    const highPriority = leads.filter(l => l.priority === 'high').length;
    const totalValue = leads.reduce((sum, l) => sum + l.value, 0);

    const statsHTML = `
      <div class="row mb-4">
        <div class="col-md-3">
          <div class="card text-center">
            <div class="card-body">
              <h3>${totalLeads}</h3>
              <p class="text-muted">Total Leads</p>
            </div>
          </div>
        </div>
        <div class="col-md-3">
          <div class="card text-center">
            <div class="card-body">
              <h3>${qualifiedLeads}</h3>
              <p class="text-muted">Qualified</p>
            </div>
          </div>
        </div>
        <div class="col-md-3">
          <div class="card text-center">
            <div class="card-body">
              <h3>${highPriority}</h3>
              <p class="text-muted">High Priority</p>
            </div>
          </div>
        </div>
        <div class="col-md-3">
          <div class="card text-center">
            <div class="card-body">
              <h3>₹${(totalValue / 1000000).toFixed(1)}M</h3>
              <p class="text-muted">Pipeline Value</p>
            </div>
          </div>
        </div>
      </div>
    `;

    statsContainer.insertAdjacentHTML('afterbegin', statsHTML);
  };

  renderStats();
  renderLeadsTable();
  addLeadButtonHandler();
});
