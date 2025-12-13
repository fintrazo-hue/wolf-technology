document.addEventListener('DOMContentLoaded', function() {
  const billing = window.MOCK_DATA?.billing || [];

  const renderPurchaseTable = () => {
    const tbody = document.querySelector('#purchaseTable tbody');
    if (!tbody) return;

    tbody.innerHTML = billing.map(record => {
      return `
        <tr>
          <td>${record.billingId}</td>
          <td>${record.candidateName}</td>
          <td>${record.productName}</td>
          <td>₹${record.amount.toLocaleString()}</td>
          <td><span class="badge bg-${record.paymentStatus === 'paid' ? 'success' : 'warning'}">${record.paymentStatus.toUpperCase()}</span></td>
          <td>${record.assignedDepartment.charAt(0).toUpperCase() + record.assignedDepartment.slice(1)}</td>
          <td>
            <div class="progress" style="height: 20px;">
              <div class="progress-bar" role="progressbar" style="width: ${record.onboardingProgress}%"
                   aria-valuenow="${record.onboardingProgress}" aria-valuemin="0" aria-valuemax="100">${record.onboardingProgress}%</div>
            </div>
          </td>
          <td>
            <button class="btn btn-sm btn-info view-purchase" data-id="${record.id}">
              <i class="fas fa-eye"></i>
            </button>
          </td>
        </tr>
      `;
    }).join('');

    attachEventListeners();
  };

  const attachEventListeners = () => {
    document.querySelectorAll('.view-purchase').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const recordId = e.currentTarget.dataset.id;
        showPurchaseDetails(recordId);
      });
    });
  };

  const showPurchaseDetails = (recordId) => {
    const record = billing.find(b => b.id === recordId);
    if (!record) return;

    const statusColor = record.paymentStatus === 'paid' ? 'success' : 'warning';
    const modal = document.createElement('div');
    modal.className = 'modal fade show';
    modal.style.display = 'block';
    modal.style.backgroundColor = 'rgba(0,0,0,0.5)';
    modal.innerHTML = `
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Purchase Details - ${record.candidateName}</h5>
            <button type="button" class="btn-close" onclick="this.closest('.modal').remove()"></button>
          </div>
          <div class="modal-body">
            <p><strong>Billing ID:</strong> ${record.billingId}</p>
            <p><strong>Invoice:</strong> ${record.invoiceNumber}</p>
            <p><strong>Service:</strong> ${record.productName}</p>
            <p><strong>Amount:</strong> ₹${record.amount.toLocaleString()}</p>
            <p><strong>Payment Status:</strong> <span class="badge bg-${statusColor}">${record.paymentStatus.toUpperCase()}</span></p>
            <p><strong>Payment Mode:</strong> ${record.paymentMode ? record.paymentMode.replace('_', ' ').toUpperCase() : 'N/A'}</p>
            <p><strong>Billing Date:</strong> ${new Date(record.billingDate).toLocaleDateString()}</p>
            ${record.paidDate ? `<p><strong>Paid Date:</strong> ${new Date(record.paidDate).toLocaleDateString()}</p>` : ''}
            <p><strong>Department:</strong> ${record.assignedDepartment.charAt(0).toUpperCase() + record.assignedDepartment.slice(1)}</p>
            <p><strong>Onboarding Progress:</strong> ${record.onboardingProgress}%</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" onclick="this.closest('.modal').remove()">Close</button>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(modal);
  };

  const addPurchaseButtonHandler = () => {
    const btn = document.querySelector('#addPurchaseBtn');
    if (btn) {
      btn.addEventListener('click', () => {
        const formHTML = `
          <form id="addPurchaseForm">
            <div class="row">
              <div class="col-md-6 mb-3">
                <label class="form-label">Billing ID *</label>
                <input type="text" class="form-control" name="billingId" required>
              </div>
              <div class="col-md-6 mb-3">
                <label class="form-label">Candidate Name *</label>
                <input type="text" class="form-control" name="candidateName" required>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6 mb-3">
                <label class="form-label">Service *</label>
                <input type="text" class="form-control" name="service" placeholder="e.g., Java Training" required>
              </div>
              <div class="col-md-6 mb-3">
                <label class="form-label">Amount (₹) *</label>
                <input type="number" class="form-control" name="amount" min="0" required>
              </div>
            </div>
            <div class="row">
              <div class="col-md-4 mb-3">
                <label class="form-label">Payment Status *</label>
                <select class="form-select" name="paymentStatus" required>
                  <option value="paid">Paid</option>
                  <option value="pending">Pending</option>
                </select>
              </div>
              <div class="col-md-4 mb-3">
                <label class="form-label">Department *</label>
                <select class="form-select" name="department" required>
                  <option value="">Select Department</option>
                  <option value="accounts">Accounts</option>
                  <option value="technical">Technical</option>
                  <option value="marketing">Marketing</option>
                  <option value="business_development">Business Development</option>
                  <option value="sales">Sales</option>
                </select>
              </div>
              <div class="col-md-4 mb-3">
                <label class="form-label">Onboarding % *</label>
                <input type="number" class="form-control" name="progress" min="0" max="100" required>
              </div>
            </div>
            <button type="submit" class="btn btn-success">Add Purchase Record</button>
          </form>
        `;
        FormHandler.createModal('Add Purchase Record', formHTML, (modal, form) => {
          const errors = [];
          const fd = new FormData(form);
          if (!fd.get('billingId')) errors.push('Billing ID is required');
          if (!fd.get('candidateName')) errors.push('Candidate name is required');
          if (!fd.get('service')) errors.push('Service name is required');
          if (errors.length > 0) { FormHandler.showErrors(errors); return; }
          FormHandler.closeModal(modal);
          FormHandler.showSuccess('Purchase record added successfully!');
          renderPurchaseTable();
        });
      });
    }
  };

  renderPurchaseTable();
  addPurchaseButtonHandler();
});
