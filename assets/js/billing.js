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

  renderBillingTable();
});
