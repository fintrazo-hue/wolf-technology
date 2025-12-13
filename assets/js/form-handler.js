const FormHandler = {
  validateRequired: (value, fieldName) => {
    if (!value || value.trim() === '') {
      return `${fieldName} is required`;
    }
    return null;
  },

  validateEmail: (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(email)) {
      return 'Please enter a valid email address';
    }
    return null;
  },

  validatePhone: (phone) => {
    const regex = /^[\d\s\-\+\(\)]{10,}$/;
    if (!regex.test(phone)) {
      return 'Please enter a valid phone number';
    }
    return null;
  },

  validateNumber: (value, fieldName) => {
    if (isNaN(value) || value === '') {
      return `${fieldName} must be a valid number`;
    }
    return null;
  },

  validateAmount: (amount) => {
    const num = parseFloat(amount);
    if (isNaN(num) || num <= 0) {
      return 'Amount must be greater than 0';
    }
    return null;
  },

  showErrors: (errors) => {
    const errorContainer = document.querySelector('.form-errors');
    if (!errorContainer) return;

    errorContainer.innerHTML = errors.map(err =>
      `<div class="alert alert-danger alert-dismissible fade show" role="alert">
        <i class="fas fa-exclamation-circle"></i> ${err}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
      </div>`
    ).join('');
    errorContainer.scrollIntoView({ behavior: 'smooth' });
  },

  clearErrors: () => {
    const errorContainer = document.querySelector('.form-errors');
    if (errorContainer) errorContainer.innerHTML = '';
  },

  showSuccess: (message) => {
    toastr.success(message, 'Success!');
  },

  createModal: (title, content, onSubmit) => {
    const modal = document.createElement('div');
    modal.className = 'modal fade show';
    modal.style.display = 'block';
    modal.style.backgroundColor = 'rgba(0,0,0,0.5)';
    modal.innerHTML = `
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">${title}</h5>
            <button type="button" class="btn-close" onclick="this.closest('.modal').remove()"></button>
          </div>
          <div class="modal-body">
            <div class="form-errors"></div>
            ${content}
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(modal);

    const form = modal.querySelector('form');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        onSubmit(modal, form);
      });
    }

    return modal;
  },

  closeModal: (modal) => {
    if (modal && modal.remove) {
      modal.remove();
    }
  }
};
