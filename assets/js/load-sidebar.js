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
                fixNavigationLinks();
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

function fixNavigationLinks() {
    const isInPagesDir = window.location.pathname.includes('/pages/');
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        let href = link.getAttribute('href');

        if (isInPagesDir) {
            if (href === '../dashboard.html') {
                href = '../../dashboard.html';
            } else if (!href.includes('../../') && !href.startsWith('../')) {
                href = '../' + href;
            }
        }

        link.setAttribute('href', href);
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
            window.location.href = isInPagesDir ? '../../index.html' : '../index.html';
        });
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadSidebar);
} else {
    loadSidebar();
}
