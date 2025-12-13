document.addEventListener('DOMContentLoaded', function() {
  const products = window.MOCK_DATA?.products || [];

  const renderProductsTable = () => {
    const tbody = document.querySelector('#productsTable tbody');
    if (!tbody) return;

    tbody.innerHTML = products.map(product => {
      const deptList = product.departments.map(d => d.charAt(0).toUpperCase() + d.slice(1)).join(', ');
      return `
        <tr>
          <td>${product.id}</td>
          <td><strong>${product.name}</strong></td>
          <td>₹${product.price.toLocaleString()}</td>
          <td>${deptList}</td>
          <td>${product.workflowMapping}</td>
          <td>${product.duration}</td>
          <td><span class="badge bg-${product.status === 'active' ? 'success' : 'danger'}">${product.status.toUpperCase()}</span></td>
          <td>
            <button class="btn btn-sm btn-info view-product" data-id="${product.id}">
              <i class="fas fa-eye"></i>
            </button>
          </td>
        </tr>
      `;
    }).join('');

    attachEventListeners();
  };

  const attachEventListeners = () => {
    document.querySelectorAll('.view-product').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const productId = e.currentTarget.dataset.id;
        showProductDetails(productId);
      });
    });
  };

  const showProductDetails = (productId) => {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const modal = document.createElement('div');
    modal.className = 'modal fade show';
    modal.style.display = 'block';
    modal.style.backgroundColor = 'rgba(0,0,0,0.5)';
    modal.innerHTML = `
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">${product.name}</h5>
            <button type="button" class="btn-close" onclick="this.closest('.modal').remove()"></button>
          </div>
          <div class="modal-body">
            <p><strong>Price:</strong> ₹${product.price.toLocaleString()}</p>
            <p><strong>Duration:</strong> ${product.duration}</p>
            <p><strong>Description:</strong> ${product.description}</p>
            <p><strong>Departments:</strong> ${product.departments.map(d => d.charAt(0).toUpperCase() + d.slice(1)).join(', ')}</p>
            <p><strong>Workflow:</strong> ${product.workflowMapping}</p>
            <p><strong>Status:</strong> <span class="badge bg-${product.status === 'active' ? 'success' : 'danger'}">${product.status.toUpperCase()}</span></p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" onclick="this.closest('.modal').remove()">Close</button>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(modal);
  };

  const addProductButtonHandler = () => {
    const btn = document.querySelector('#addProductBtn');
    if (btn) {
      btn.addEventListener('click', () => {
        const formHTML = `
          <form id="addProductForm">
            <div class="mb-3">
              <label class="form-label">Product Name *</label>
              <input type="text" class="form-control" name="productName" required>
            </div>
            <div class="mb-3">
              <label class="form-label">Price (₹) *</label>
              <input type="number" class="form-control" name="price" min="0" step="0.01" required>
            </div>
            <div class="mb-3">
              <label class="form-label">Description *</label>
              <textarea class="form-control" name="description" rows="3" required></textarea>
            </div>
            <div class="mb-3">
              <label class="form-label">Departments *</label>
              <select class="form-select" name="departments" multiple required>
                <option value="accounts">Accounts</option>
                <option value="technical">Technical</option>
                <option value="marketing">Marketing</option>
                <option value="business_development">Business Development</option>
                <option value="sales">Sales</option>
              </select>
            </div>
            <div class="mb-3">
              <label class="form-label">Duration *</label>
              <input type="text" class="form-control" name="duration" placeholder="e.g., 30 days" required>
            </div>
            <button type="submit" class="btn btn-success">Add Product</button>
          </form>
        `;
        FormHandler.createModal('Add New Product', formHTML, (modal, form) => {
          const errors = [];
          const fd = new FormData(form);
          if (!fd.get('productName')) errors.push('Product name is required');
          if (!fd.get('price')) errors.push('Price is required');
          if (!fd.get('description')) errors.push('Description is required');
          if (errors.length > 0) { FormHandler.showErrors(errors); return; }
          FormHandler.closeModal(modal);
          FormHandler.showSuccess('Product added successfully!');
          renderProductsTable();
        });
      });
    }
  };

  renderProductsTable();
  addProductButtonHandler();
});
