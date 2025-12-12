$(document).ready(function() {
    const managers = MOCK_DATA.employees.filter(emp => emp.position === 'manager');

    const getDepartmentName = (dept) => {
        const deptMap = {
            'accounts': 'Accounts',
            'technical': 'Technical',
            'marketing': 'Marketing',
            'business_development': 'BD',
            'sales': 'Sales'
        };
        return deptMap[dept] || dept;
    };

    const getProfileUrl = (manager) => {
        const dept = manager.department;
        const deptMap = {
            'accounts': 'accounts',
            'technical': 'technical',
            'marketing': 'marketing',
            'business_development': 'bd',
            'sales': 'sales'
        };
        return `../profiles/profile-${deptMap[dept]}-manager.html?userId=${manager.id}`;
    };

    const tableData = managers.map(manager => [
        manager.id,
        manager.name,
        manager.email,
        getDepartmentName(manager.department),
        manager.id,
        manager.phone,
        `<span class="badge bg-success">${manager.status}</span>`,
        `<button class="btn btn-sm btn-primary view-profile-btn" data-url="${getProfileUrl(manager)}">
            <i class="fas fa-eye"></i> View
        </button>`
    ]);

    const table = $('#managersTable').DataTable({
        data: tableData,
        columns: [
            { title: "ID" },
            { title: "Name" },
            { title: "Email" },
            { title: "Department" },
            { title: "Employee Code" },
            { title: "Phone" },
            { title: "Status" },
            { title: "Actions" }
        ],
        pageLength: 25,
        order: [[0, 'asc']],
        responsive: true
    });

    $('#managersTable').on('click', '.view-profile-btn', function() {
        const url = $(this).data('url');
        window.location.href = url;
    });
});
