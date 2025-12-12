function loadSidebar() {
    const currentPage = window.location.pathname.split('/').pop() || 'dashboard.html';
    const isInPagesDir = window.location.pathname.includes('/pages/');
    const sidebarPath = isInPagesDir ? '../../components/sidebar.html' : 'components/sidebar.html';

    fetch(sidebarPath)
        .then(response => response.text())
        .then(html => {
            // Replace placeholders with correct paths
            if (isInPagesDir) {
                html = html.replace(/LOGO_PATH/g, '../../assets/images/logo.webp');
                html = html.replace(/DASHBOARD_PATH/g, '../../dashboard.html');
                html = html.replace(/PAGES_PATH/g, '..');
                html = html.replace(/PROFILES_DIR_PATH/g, '../../profiles-directory.html');
            } else {
                html = html.replace(/LOGO_PATH/g, 'assets/images/logo.webp');
                html = html.replace(/DASHBOARD_PATH/g, 'dashboard.html');
                html = html.replace(/PAGES_PATH/g, 'pages');
                html = html.replace(/PROFILES_DIR_PATH/g, 'profiles-directory.html');
            }

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
        const hrefPage = href.split('/').pop();
        if (hrefPage === currentPage || (currentPage === '' && hrefPage === 'dashboard.html')) {
            link.closest('.nav-item').classList.add('active');
        } else {
            link.closest('.nav-item').classList.remove('active');
        }
    });
}

function setupLogoutButton() {
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('userEmail');
            const isInPagesDir = window.location.pathname.includes('/pages/');
            window.location.href = isInPagesDir ? '../../index.html' : 'index.html';
        });
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadSidebar);
} else {
    loadSidebar();
}
