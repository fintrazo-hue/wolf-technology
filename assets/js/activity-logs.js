document.addEventListener('DOMContentLoaded', function() {
  const activityLogs = window.MOCK_DATA?.activityLogs || [];

  const renderActivityTable = () => {
    const tbody = document.querySelector('#activityLogsTable tbody');
    if (!tbody) return;

    tbody.innerHTML = activityLogs.map(log => {
      const timeAgo = getTimeAgo(log.timestamp);
      return `
        <tr>
          <td>${log.id}</td>
          <td>${log.employeeName}</td>
          <td>${log.leadName || 'N/A'}</td>
          <td>${log.action}</td>
          <td><span class="badge bg-secondary">${log.department}</span></td>
          <td>${timeAgo}</td>
        </tr>
      `;
    }).join('');
  };

  const getTimeAgo = (timestamp) => {
    const now = new Date();
    const date = new Date(timestamp);
    const diff = now - date;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  renderActivityTable();
});
