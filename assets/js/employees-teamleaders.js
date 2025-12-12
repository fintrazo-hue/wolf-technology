$(document).ready(function() {
    const teamLeaders = MOCK_DATA.employees.filter(emp => emp.position === 'team_leader');

    const getManagerName = (managerId) => {
        const manager = MOCK_DATA.employees.find(e => e.id === managerId);
        return manager ? manager.name : 'N/A';
    };

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

    const getProfileUrl = (tl) => {
        const dept = tl.department;
        const deptMap = {
            'accounts': 'accounts',
            'technical': 'technical',
            'marketing': 'marketing',
            'business_development': 'bd',
            'sales': 'sales'
        };
        return `../profiles/profile-${deptMap[dept]}-teamleader.html?userId=${tl.id}`;
    };

    const tableData = teamLeaders.map(tl => [
        tl.id,
        tl.name,
        tl.email,
        getDepartmentName(tl.department),
        tl.id,
        getManagerName(tl.managerId),
        `<span class="badge bg-success">${tl.status}</span>`,
        `<button class="btn btn-sm btn-primary view-profile-btn" data-url="${getProfileUrl(tl)}">
            <i class="fas fa-eye"></i> View
        </button>`
    ]);

    const table = $('#teamLeadersTable').DataTable({
        data: tableData,
        columns: [
            { title: "ID" },
            { title: "Name" },
            { title: "Email" },
            { title: "Department" },
            { title: "Employee Code" },
            { title: "Reporting Manager" },
            { title: "Status" },
            { title: "Actions" }
        ],
        pageLength: 25,
        order: [[0, 'asc']],
        responsive: true
    });

    $('#teamLeadersTable').on('click', '.view-profile-btn', function() {
        const url = $(this).data('url');
        window.location.href = url;
    });
});
