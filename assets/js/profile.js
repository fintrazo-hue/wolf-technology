document.addEventListener('DOMContentLoaded', function() {
  const renderProfile = () => {
    const content = document.querySelector('.dashboard-content');
    if (!content) return;

    const profileHTML = document.createElement('div');
    profileHTML.className = 'profile-container';
    profileHTML.innerHTML = `
      <div class="row">
        <div class="col-md-4 text-center mb-4">
          <div class="card">
            <div class="card-body">
              <img src="https://ui-avatars.com/api/?name=Admin+Super&background=F4D03F&color=0F0F0F&bold=true&size=150"
                   class="rounded-circle mb-3" style="width: 150px; height: 150px;">
              <h4>Super Admin</h4>
              <p class="text-muted">Administrator Account</p>
              <button class="btn btn-primary btn-sm">Change Photo</button>
            </div>
          </div>
        </div>
        <div class="col-md-8">
          <div class="card mb-3">
            <div class="card-header">
              <h5>Personal Details</h5>
            </div>
            <div class="card-body">
              <div class="row mb-3">
                <div class="col-md-6">
                  <label class="form-label">First Name</label>
                  <input type="text" class="form-control" value="Admin" readonly>
                </div>
                <div class="col-md-6">
                  <label class="form-label">Last Name</label>
                  <input type="text" class="form-control" value="Super" readonly>
                </div>
              </div>
              <div class="mb-3">
                <label class="form-label">Email</label>
                <input type="email" class="form-control" value="admin@wolftech.com" readonly>
              </div>
              <div class="row mb-3">
                <div class="col-md-6">
                  <label class="form-label">Phone</label>
                  <input type="tel" class="form-control" value="+91-9876543210" readonly>
                </div>
                <div class="col-md-6">
                  <label class="form-label">Department</label>
                  <input type="text" class="form-control" value="Administration" readonly>
                </div>
              </div>
              <button class="btn btn-primary">Edit Profile</button>
            </div>
          </div>

          <div class="card mb-3">
            <div class="card-header">
              <h5>Change Password</h5>
            </div>
            <div class="card-body">
              <div class="mb-3">
                <label class="form-label">Current Password</label>
                <input type="password" class="form-control" placeholder="Enter current password">
              </div>
              <div class="mb-3">
                <label class="form-label">New Password</label>
                <input type="password" class="form-control" placeholder="Enter new password">
              </div>
              <div class="mb-3">
                <label class="form-label">Confirm Password</label>
                <input type="password" class="form-control" placeholder="Confirm new password">
              </div>
              <button class="btn btn-success">Update Password</button>
            </div>
          </div>

          <div class="card">
            <div class="card-header">
              <h5>Role Information</h5>
            </div>
            <div class="card-body">
              <p><strong>Role:</strong> Super Administrator</p>
              <p><strong>Assigned Since:</strong> 2023-01-01</p>
              <p><strong>Permissions:</strong> Full Access</p>
              <div class="mt-3">
                <h6>Capabilities:</h6>
                <ul>
                  <li>Manage all departments</li>
                  <li>View all analytics and reports</li>
                  <li>Manage system settings</li>
                  <li>Manage user accounts</li>
                  <li>Access audit logs</li>
                  <li>Configure payment gateways</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    const section = content.querySelector('.data-section');
    if (section) {
      section.replaceWith(profileHTML);
    } else {
      content.appendChild(profileHTML);
    }
  };

  renderProfile();
});
