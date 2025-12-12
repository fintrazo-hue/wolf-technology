function loadSidebar() {
    const currentPage = window.location.pathname.split('/').pop() || 'dashboard.html';
    const sidebarPath = window.location.pathname.includes('/pages/') ? '../../components/sidebar.html' : 'components/sidebar.html';

    fetch(sidebarPath)
        .then(response => response.text())
        .then(html => {
            const container = document.getElementById('sidebar-container');
            if (container) {
                container.innerHTML = html;
                setActiveNav(currentPage);
                setupLogoutButton();
            }
        })
        .catch(error => console.error('Error loading sidebar:', error));
}

function setActiveNav(currentPage) {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'dashboard.html')) {
            link.closest('.nav-item').classList.add('active');
        } else {
            link.closest('.nav-item').classList.remove('active');
        }
    });
}

function setupLogoutButton() {
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            window.location.href = 'index.html';
        });
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadSidebar);
} else {
    loadSidebar();
}
