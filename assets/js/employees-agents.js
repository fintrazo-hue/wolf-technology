$(document).ready(function() {
    const agents = MOCK_DATA.employees.filter(emp => emp.position === 'agent');

    const getTeamLeaderName = (tlId) => {
        const tl = MOCK_DATA.employees.find(e => e.id === tlId);
        return tl ? tl.name : 'N/A';
    };

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

    const getProfileUrl = (agent) => {
        const dept = agent.department;
        const deptMap = {
            'accounts': 'accounts',
            'technical': 'technical',
            'marketing': 'marketing',
            'business_development': 'bd',
            'sales': 'sales'
        };
        return `../profiles/profile-${deptMap[dept]}-agent.html?userId=${agent.id}`;
    };

    const tableData = agents.map(agent => [
        agent.id,
        agent.name,
        agent.email,
        getDepartmentName(agent.department),
        agent.id,
        getTeamLeaderName(agent.teamLeaderId),
        getManagerName(agent.managerId),
        `<span class="badge bg-success">${agent.status}</span>`,
        `<button class="btn btn-sm btn-primary view-profile-btn" data-url="${getProfileUrl(agent)}">
            <i class="fas fa-eye"></i> View
        </button>`
    ]);

    const table = $('#agentsTable').DataTable({
        data: tableData,
        columns: [
            { title: "ID" },
            { title: "Name" },
            { title: "Email" },
            { title: "Department" },
            { title: "Employee Code" },
            { title: "Team Leader" },
            { title: "Manager" },
            { title: "Status" },
            { title: "Actions" }
        ],
        pageLength: 25,
        order: [[0, 'asc']],
        responsive: true
    });

    $('#agentsTable').on('click', '.view-profile-btn', function() {
        const url = $(this).data('url');
        window.location.href = url;
    });
});
