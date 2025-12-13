document.addEventListener('DOMContentLoaded', function() {
  const systemLogs = window.MOCK_DATA?.systemLogs || [];

  const renderSystemLogsTable = () => {
    const tbody = document.querySelector('#systemLogsTable tbody');
    if (!tbody) return;

    const stats = {
      errors: systemLogs.filter(l => l.level === 'error').length,
      warnings: systemLogs.filter(l => l.level === 'warning').length,
      info: systemLogs.filter(l => l.level === 'info').length
    };

    renderLogStats(stats);

    tbody.innerHTML = systemLogs.map(log => {
      const levelColor = log.level === 'error' ? 'danger' : log.level === 'warning' ? 'warning' : 'info';
      const timeAgo = getTimeAgo(log.timestamp);

      return `
        <tr>
          <td>${log.id}</td>
          <td><span class="badge bg-${levelColor}">${log.level.toUpperCase()}</span></td>
          <td><strong>${log.module.toUpperCase()}</strong></td>
          <td>${log.message}</td>
          <td>${log.details}</td>
          <td>${log.ipAddress}</td>
          <td>${timeAgo}</td>
        </tr>
      `;
    }).join('');
  };

  const renderLogStats = (stats) => {
    const statsContainer = document.querySelector('.dashboard-content');
    if (!statsContainer.querySelector('.log-stats')) {
      const statsHTML = document.createElement('div');
      statsHTML.className = 'row mb-4 log-stats';
      statsHTML.innerHTML = `
        <div class="col-md-4">
          <div class="card text-center border-danger">
            <div class="card-body">
              <h4 class="text-danger">${stats.errors}</h4>
              <p class="text-muted">Errors</p>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card text-center border-warning">
            <div class="card-body">
              <h4 class="text-warning">${stats.warnings}</h4>
              <p class="text-muted">Warnings</p>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card text-center border-info">
            <div class="card-body">
              <h4 class="text-info">${stats.info}</h4>
              <p class="text-muted">Info Logs</p>
            </div>
          </div>
        </div>
      `;
      statsContainer.insertBefore(statsHTML, statsContainer.querySelector('.data-section'));
    }
  };

  const getTimeAgo = (timestamp) => {
    const now = new Date();
    const date = new Date(timestamp);
    const diff = now - date;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);

    if (minutes < 60) return `${minutes}m ago`;
    return `${hours}h ago`;
  };

  renderSystemLogsTable();
});
