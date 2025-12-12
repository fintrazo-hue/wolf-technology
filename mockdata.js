// Wolf Technologies - Complete Mock Data
const MOCK_DATA = {
    managers: [
        { id: 1, firstName: 'Michael', lastName: 'Roberts', email: 'michael.r@wolftech.com', phone: '555-0201', employeeCode: 'MGR001', department: 'Technical', status: 'Active', incentive: 5.5, discountAllowed: true },
        { id: 2, firstName: 'Jennifer', lastName: 'Martinez', email: 'jennifer.m@wolftech.com', phone: '555-0202', employeeCode: 'MGR002', department: 'Sales', status: 'Active', incentive: 6.0, discountAllowed: true },
        { id: 3, firstName: 'David', lastName: 'Anderson', email: 'david.a@wolftech.com', phone: '555-0203', employeeCode: 'MGR003', department: 'Marketing', status: 'Active', incentive: 5.0, discountAllowed: false }
    ],
    
    teamLeaders: [
        { id: 1, name: 'Sarah Thompson', email: 'sarah.t@wolftech.com', phone: '555-0301', employeeCode: 'TL001', department: 'Technical', managerId: 1, managerName: 'Michael Roberts', status: 'Active' },
        { id: 2, name: 'Robert Wilson', email: 'robert.w@wolftech.com', phone: '555-0302', employeeCode: 'TL002', department: 'Sales', managerId: 2, managerName: 'Jennifer Martinez', status: 'Active' },
        { id: 3, name: 'Lisa Chen', email: 'lisa.c@wolftech.com', phone: '555-0303', employeeCode: 'TL003', department: 'Marketing', managerId: 3, managerName: 'David Anderson', status: 'Active' }
    ],
    
    agents: [
        { id: 1, firstName: 'Alex', lastName: 'Johnson', email: 'alex.j@wolftech.com', phone: '555-0401', employeeCode: 'AGT001', department: 'Technical', tlId: 1, tlName: 'Sarah Thompson', managerId: 1, managerName: 'Michael Roberts', status: 'Active' },
        { id: 2, firstName: 'Emma', lastName: 'Davis', email: 'emma.d@wolftech.com', phone: '555-0402', employeeCode: 'AGT002', department: 'Sales', tlId: 2, tlName: 'Robert Wilson', managerId: 2, managerName: 'Jennifer Martinez', status: 'Active' },
        { id: 3, firstName: 'James', lastName: 'Brown', email: 'james.b@wolftech.com', phone: '555-0403', employeeCode: 'AGT003', department: 'Marketing', tlId: 3, tlName: 'Lisa Chen', managerId: 3, managerName: 'David Anderson', status: 'Active' },
        { id: 4, firstName: 'Sophia', lastName: 'Miller', email: 'sophia.m@wolftech.com', phone: '555-0404', employeeCode: 'AGT004', department: 'Technical', tlId: 1, tlName: 'Sarah Thompson', managerId: 1, managerName: 'Michael Roberts', status: 'Active' }
    ],
    
    crmLeads: [
        { id: 1, leadName: 'LEAD-001', clientName: 'Tech Corp Inc', email: 'contact@techcorp.com', phone: '555-1001', linkedin: 'linkedin.com/in/techcorp', visa: 'H1B', source: 'Website', dealStage: 'Qualified', assignedTo: 'Alex Johnson', createdBy: 'Michael Roberts', lastActivity: '2 hours ago', createdDate: '2024-01-15' },
        { id: 2, leadName: 'LEAD-002', clientName: 'Global Solutions', email: 'info@globalsol.com', phone: '555-1002', linkedin: 'linkedin.com/company/global', visa: 'L1', source: 'Referral', dealStage: 'Contacted', assignedTo: 'Emma Davis', createdBy: 'Jennifer Martinez', lastActivity: '1 day ago', createdDate: '2024-01-14' },
        { id: 3, leadName: 'LEAD-003', clientName: 'Innovation Labs', email: 'hello@innovlabs.com', phone: '555-1003', linkedin: 'linkedin.com/company/innovlabs', visa: 'OPT', source: 'LinkedIn', dealStage: 'Proposal Sent', assignedTo: 'James Brown', createdBy: 'David Anderson', lastActivity: '3 hours ago', createdDate: '2024-01-13' }
    ],
    
    products: [
        { id: 1, name: 'Training Program - Full Stack', price: 5000, departments: ['Technical'], status: 'Active', description: 'Complete full stack development training' },
        { id: 2, name: 'Marketing Package - Premium', price: 3500, departments: ['Marketing', 'Sales'], status: 'Active', description: 'Premium marketing consultation package' },
        { id: 3, name: 'Business Development - Starter', price: 2500, departments: ['BD', 'Sales'], status: 'Active', description: 'Business development starter package' }
    ],
    
    purchaseUsers: [
        { id: 1, billingId: 'BILL-001', customerName: 'John Doe', serviceName: 'Training Program - Full Stack', paymentStatus: 'Paid', billingDate: '2024-01-10', referBy: 'Alex Johnson', amount: 5000 },
        { id: 2, billingId: 'BILL-002', customerName: 'Jane Smith', serviceName: 'Marketing Package - Premium', paymentStatus: 'Pending', billingDate: '2024-01-12', referBy: 'Emma Davis', amount: 3500 },
        { id: 3, billingId: 'BILL-003', customerName: 'Bob Wilson', serviceName: 'Business Development - Starter', paymentStatus: 'Paid', billingDate: '2024-01-11', referBy: 'James Brown', amount: 2500 }
    ],
    
    billing: [
        { id: 1, billingId: 'INV-2024-001', customer: 'John Doe', service: 'Training Program', amount: 5000, paymentMode: 'Credit Card', paidStatus: 'Paid', paymentDate: '2024-01-10' },
        { id: 2, billingId: 'INV-2024-002', customer: 'Jane Smith', service: 'Marketing Package', amount: 3500, paymentMode: 'Bank Transfer', paidStatus: 'Pending', paymentDate: '2024-01-12' },
        { id: 3, billingId: 'INV-2024-003', customer: 'Bob Wilson', service: 'BD Package', amount: 2500, paymentMode: 'Cash', paidStatus: 'Paid', paymentDate: '2024-01-11' }
    ],
    
    activityLogs: [
        { id: 1, activity: 'Lead Created', user: 'Michael Roberts', module: 'CRM', timestamp: '2024-01-15 10:30:00', details: 'Created new lead LEAD-001' },
        { id: 2, activity: 'Manager Added', user: 'Admin', module: 'Employees', timestamp: '2024-01-15 09:15:00', details: 'Added new manager Jennifer Martinez' },
        { id: 3, activity: 'Product Updated', user: 'David Anderson', module: 'Products', timestamp: '2024-01-14 16:45:00', details: 'Updated product pricing' }
    ],
    
    systemLogs: [
        { id: 1, type: 'Error', description: 'Database connection timeout', file: 'db.connect.js', line: 45, timestamp: '2024-01-15 11:23:45' },
        { id: 2, type: 'Warning', description: 'High memory usage detected', file: 'system.monitor.js', line: 120, timestamp: '2024-01-15 10:15:30' }
    ],
    
    workflow: {
        Accounts: [
            { step: 1, name: 'Welcome', status: 'completed', completedDate: '2024-01-10' },
            { step: 2, name: 'Candidate Onboard', status: 'completed', completedDate: '2024-01-11' },
            { step: 3, name: 'Get Documents', status: 'in-progress', completedDate: null },
            { step: 4, name: 'Agreement Sent', status: 'pending', completedDate: null },
            { step: 5, name: 'Agreement Signed', status: 'pending', completedDate: null }
        ],
        Technical: [
            { step: 1, name: 'Schedule Training', status: 'completed', completedDate: '2024-01-12' },
            { step: 2, name: 'Training Start', status: 'in-progress', completedDate: null },
            { step: 3, name: 'Project Work', status: 'pending', completedDate: null },
            { step: 4, name: 'Training Completed', status: 'pending', completedDate: null }
        ],
        Marketing: [
            { step: 1, name: 'Initial Training', status: 'completed', completedDate: '2024-01-13' },
            { step: 2, name: 'Marketing Start', status: 'completed', completedDate: '2024-01-14' },
            { step: 3, name: 'Interview Schedule', status: 'in-progress', completedDate: null },
            { step: 4, name: 'Placed', status: 'pending', completedDate: null }
        ]
    }
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = MOCK_DATA;
}
