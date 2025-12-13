document.addEventListener('DOMContentLoaded', function() {
  const billing = window.MOCK_DATA?.billing || [];

  const renderBillingTable = () => {
    const tbody = document.querySelector('#billingTable tbody');
    if (!tbody) return;

    const stats = calculateBillingStats();
    renderBillingStats(stats);

    tbody.innerHTML = billing.map(record => {
      return `
        <tr>
          <td>${record.invoiceNumber}</td>
          <td>${record.billingId}</td>
          <td>${record.candidateName}</td>
          <td>${record.productName}</td>
          <td>₹${record.amount.toLocaleString()}</td>
          <td><span class="badge bg-${record.paymentStatus === 'paid' ? 'success' : 'warning'}">${record.paymentStatus.toUpperCase()}</span></td>
          <td>${record.paymentMode ? record.paymentMode.replace('_', ' ').toUpperCase() : '-'}</td>
          <td>${new Date(record.billingDate).toLocaleDateString()}</td>
          <td>
            <div class="progress" style="height: 20px;">
              <div class="progress-bar" role="progressbar" style="width: ${record.onboardingProgress}%"
                   aria-valuenow="${record.onboardingProgress}" aria-valuemin="0" aria-valuemax="100">${record.onboardingProgress}%</div>
            </div>
          </td>
        </tr>
      `;
    }).join('');
  };

  const calculateBillingStats = () => {
    const total = billing.length;
    const paid = billing.filter(b => b.paymentStatus === 'paid').length;
    const pending = billing.filter(b => b.paymentStatus === 'pending').length;
    const totalAmount = billing.reduce((sum, b) => sum + b.amount, 0);
    const paidAmount = billing.filter(b => b.paymentStatus === 'paid').reduce((sum, b) => sum + b.amount, 0);

    return { total, paid, pending, totalAmount, paidAmount };
  };

  const renderBillingStats = (stats) => {
    const statsContainer = document.querySelector('.dashboard-content');
    if (!statsContainer.querySelector('.billing-stats')) {
      const statsHTML = document.createElement('div');
      statsHTML.className = 'row mb-4 billing-stats';
      statsHTML.innerHTML = `
        <div class="col-md-3">
          <div class="card text-center">
            <div class="card-body">
              <h4>${stats.total}</h4>
              <p class="text-muted">Total Invoices</p>
            </div>
          </div>
        </div>
        <div class="col-md-3">
          <div class="card text-center">
            <div class="card-body">
              <h4>${stats.paid}</h4>
              <p class="text-muted">Paid</p>
            </div>
          </div>
        </div>
        <div class="col-md-3">
          <div class="card text-center">
            <div class="card-body">
              <h4>${stats.pending}</h4>
              <p class="text-muted">Pending</p>
            </div>
          </div>
        </div>
        <div class="col-md-3">
          <div class="card text-center">
            <div class="card-body">
              <h4>₹${(stats.paidAmount / 100000).toFixed(1)}L</h4>
              <p class="text-muted">Amount Received</p>
            </div>
          </div>
        </div>
      `;
      statsContainer.insertBefore(statsHTML, statsContainer.querySelector('.data-section'));
    }
  };

  const addBillingButtonHandler = () => {
    const btn = document.querySelector('#addBillingBtn');
    if (btn) {
      btn.addEventListener('click', () => {
        const formHTML = `
          <form id="addBillingForm">
            <div class="row">
              <div class="col-md-6 mb-3">
                <label class="form-label">Invoice Number *</label>
                <input type="text" class="form-control" name="invoiceNumber" required>
              </div>
              <div class="col-md-6 mb-3">
                <label class="form-label">Billing ID *</label>
                <input type="text" class="form-control" name="billingId" required>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6 mb-3">
                <label class="form-label">Candidate Name *</label>
                <input type="text" class="form-control" name="candidateName" required>
              </div>
              <div class="col-md-6 mb-3">
                <label class="form-label">Product/Service *</label>
                <input type="text" class="form-control" name="productName" required>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6 mb-3">
                <label class="form-label">Amount (₹) *</label>
                <input type="number" class="form-control" name="amount" min="0" required>
              </div>
              <div class="col-md-6 mb-3">
                <label class="form-label">Payment Status *</label>
                <select class="form-select" name="paymentStatus" required>
                  <option value="paid">Paid</option>
                  <option value="pending">Pending</option>
                </select>
              </div>
            </div>
            <button type="submit" class="btn btn-success">Add Billing Record</button>
          </form>
        `;
        FormHandler.createModal('Add Billing Record', formHTML, (modal, form) => {
          const errors = [];
          const fd = new FormData(form);
          if (!fd.get('invoiceNumber')) errors.push('Invoice number is required');
          if (!fd.get('candidateName')) errors.push('Candidate name is required');
          if (!fd.get('amount')) errors.push('Amount is required');
          if (errors.length > 0) { FormHandler.showErrors(errors); return; }
          FormHandler.closeModal(modal);
          FormHandler.showSuccess('Billing record added successfully!');
          renderBillingTable();
        });
      });
    }
  };

  renderBillingTable();
  addBillingButtonHandler();
});
