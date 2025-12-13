document.addEventListener('DOMContentLoaded', function() {
  const settings = window.MOCK_DATA?.settings || {};

  const renderSettings = () => {
    const content = document.querySelector('.dashboard-content');
    if (!content) return;

    const settingsHTML = document.createElement('div');
    settingsHTML.className = 'settings-container';
    settingsHTML.innerHTML = `
      <div class="settings-panel">
        <h4>CC Email Addresses</h4>
        <div class="form-group mb-3">
          <div class="list-group">
            ${settings.ccEmails.map(email => `
              <div class="list-group-item d-flex justify-content-between align-items-center">
                <span>${email}</span>
                <button class="btn btn-sm btn-outline-danger">Remove</button>
              </div>
            `).join('')}
          </div>
          <input type="email" class="form-control mt-2" placeholder="Add new email">
          <button class="btn btn-sm btn-primary mt-2">Add Email</button>
        </div>
      </div>

      <hr>

      <div class="settings-panel">
        <h4>Allowed IP Addresses</h4>
        <div class="form-group mb-3">
          <div class="list-group">
            ${settings.allowedIps.map(ip => `
              <div class="list-group-item d-flex justify-content-between align-items-center">
                <span>${ip}</span>
                <button class="btn btn-sm btn-outline-danger">Remove</button>
              </div>
            `).join('')}
          </div>
          <input type="text" class="form-control mt-2" placeholder="Add new IP (e.g., 192.168.1.0/24)">
          <button class="btn btn-sm btn-primary mt-2">Add IP</button>
        </div>
      </div>

      <hr>

      <div class="settings-panel">
        <h4>Payment Gateway Configuration</h4>
        <div class="form-group mb-3">
          ${Object.entries(settings.paymentGateways).map(([gateway, config]) => `
            <div class="card mb-2">
              <div class="card-body">
                <div class="form-check form-switch">
                  <input class="form-check-input" type="checkbox" ${config.enabled ? 'checked' : ''}>
                  <label class="form-check-label">
                    <strong>${gateway.toUpperCase()}</strong> - ${config.mode.toUpperCase()} Mode
                  </label>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <hr>

      <div class="settings-panel">
        <h4>System Banner</h4>
        <div class="form-group">
          <textarea class="form-control" rows="3">${settings.bannerText}</textarea>
          <button class="btn btn-primary mt-2">Update Banner</button>
        </div>
      </div>

      <hr>

      <div class="settings-panel">
        <h4>System Preferences</h4>
        <div class="row">
          <div class="col-md-6">
            <p><strong>Timezone:</strong> ${settings.systemPreferences.timezone}</p>
            <p><strong>Date Format:</strong> ${settings.systemPreferences.dateFormat}</p>
            <p><strong>Currency:</strong> ${settings.systemPreferences.currency}</p>
            <p><strong>Language:</strong> ${settings.systemPreferences.language}</p>
          </div>
          <div class="col-md-6">
            <p><strong>Session Timeout:</strong> ${settings.systemPreferences.sessionTimeout} minutes</p>
            <p><strong>Max Login Attempts:</strong> ${settings.systemPreferences.maxLoginAttempts}</p>
            <p><strong>Auto Backup:</strong> ${settings.systemPreferences.autoBackup ? 'Enabled' : 'Disabled'}</p>
            <p><strong>Backup Frequency:</strong> ${settings.systemPreferences.backupFrequency}</p>
          </div>
        </div>
        <div class="form-check mt-3">
          <input class="form-check-input" type="checkbox" ${settings.systemPreferences.emailNotifications ? 'checked' : ''}>
          <label class="form-check-label">Email Notifications</label>
        </div>
        <div class="form-check">
          <input class="form-check-input" type="checkbox" ${settings.systemPreferences.smsNotifications ? 'checked' : ''}>
          <label class="form-check-label">SMS Notifications</label>
        </div>
      </div>
    `;

    const section = content.querySelector('.data-section');
    if (section) {
      section.replaceWith(settingsHTML);
    } else {
      content.appendChild(settingsHTML);
    }
  };

  renderSettings();
});
