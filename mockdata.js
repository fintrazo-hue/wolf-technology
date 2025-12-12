const MOCK_DATA = {
  departments: [
    { id: 'accounts', name: 'Accounts', color: '#10B981', icon: '💰' },
    { id: 'technical', name: 'Technical', color: '#3B82F6', icon: '⚙️' },
    { id: 'marketing', name: 'Marketing', color: '#F59E0B', icon: '📢' },
    { id: 'business_development', name: 'Business Development', color: '#8B5CF6', icon: '🤝' },
    { id: 'sales', name: 'Sales', color: '#EF4444', icon: '💼' }
  ],

  positions: [
    { id: 'manager', name: 'Manager', level: 3 },
    { id: 'team_leader', name: 'Team Leader', level: 2 },
    { id: 'agent', name: 'Agent', level: 1 }
  ],

  employees: [
    { id: 'E001', name: 'Rajesh Kumar', email: 'rajesh.kumar@wolftech.com', department: 'accounts', position: 'manager', phone: '+91-9876543210', joinDate: '2022-01-15', avatar: 'https://i.pravatar.cc/150?img=12', status: 'active', performance: 92, tasksCompleted: 190, efficiency: 92 },
    { id: 'E002', name: 'Priya Sharma', email: 'priya.sharma@wolftech.com', department: 'accounts', position: 'team_leader', managerId: 'E001', phone: '+91-9876543211', joinDate: '2022-03-20', avatar: 'https://i.pravatar.cc/150?img=45', status: 'active', performance: 88, tasksCompleted: 160, efficiency: 88 },
    { id: 'E003', name: 'Amit Patel', email: 'amit.patel@wolftech.com', department: 'accounts', position: 'team_leader', managerId: 'E001', phone: '+91-9876543212', joinDate: '2022-04-10', avatar: 'https://i.pravatar.cc/150?img=13', status: 'active', performance: 85, tasksCompleted: 148, efficiency: 85 },
    { id: 'E004', name: 'Neha Gupta', email: 'neha.gupta@wolftech.com', department: 'accounts', position: 'agent', teamLeaderId: 'E002', managerId: 'E001', phone: '+91-9876543213', joinDate: '2022-06-01', avatar: 'https://i.pravatar.cc/150?img=47', status: 'active', performance: 90, tasksCompleted: 135, efficiency: 90 },
    { id: 'E005', name: 'Vikram Singh', email: 'vikram.singh@wolftech.com', department: 'accounts', position: 'agent', teamLeaderId: 'E002', managerId: 'E001', phone: '+91-9876543214', joinDate: '2022-07-15', avatar: 'https://i.pravatar.cc/150?img=14', status: 'active', performance: 82, tasksCompleted: 118, efficiency: 82 },
    { id: 'E006', name: 'Anjali Mehta', email: 'anjali.mehta@wolftech.com', department: 'accounts', position: 'agent', teamLeaderId: 'E003', managerId: 'E001', phone: '+91-9876543215', joinDate: '2022-08-20', avatar: 'https://i.pravatar.cc/150?img=48', status: 'active', performance: 87, tasksCompleted: 127, efficiency: 87 },
    { id: 'E007', name: 'Rohit Verma', email: 'rohit.verma@wolftech.com', department: 'accounts', position: 'agent', teamLeaderId: 'E003', managerId: 'E001', phone: '+91-9876543216', joinDate: '2022-09-10', avatar: 'https://i.pravatar.cc/150?img=15', status: 'active', performance: 79, tasksCompleted: 110, efficiency: 79 },

    { id: 'E008', name: 'Suresh Reddy', email: 'suresh.reddy@wolftech.com', department: 'technical', position: 'manager', phone: '+91-9876543220', joinDate: '2021-11-10', avatar: 'https://i.pravatar.cc/150?img=33', status: 'active', performance: 94, tasksCompleted: 205, efficiency: 94 },
    { id: 'E009', name: 'Kavita Iyer', email: 'kavita.iyer@wolftech.com', department: 'technical', position: 'team_leader', managerId: 'E008', phone: '+91-9876543221', joinDate: '2022-02-15', avatar: 'https://i.pravatar.cc/150?img=49', status: 'active', performance: 91, tasksCompleted: 172, efficiency: 91 },
    { id: 'E010', name: 'Arjun Nair', email: 'arjun.nair@wolftech.com', department: 'technical', position: 'team_leader', managerId: 'E008', phone: '+91-9876543222', joinDate: '2022-03-25', avatar: 'https://i.pravatar.cc/150?img=34', status: 'active', performance: 89, tasksCompleted: 160, efficiency: 89 },
    { id: 'E011', name: 'Deepika Joshi', email: 'deepika.joshi@wolftech.com', department: 'technical', position: 'agent', teamLeaderId: 'E009', managerId: 'E008', phone: '+91-9876543223', joinDate: '2022-05-10', avatar: 'https://i.pravatar.cc/150?img=44', status: 'active', performance: 93, tasksCompleted: 142, efficiency: 93 },
    { id: 'E012', name: 'Karan Malhotra', email: 'karan.malhotra@wolftech.com', department: 'technical', position: 'agent', teamLeaderId: 'E009', managerId: 'E008', phone: '+91-9876543224', joinDate: '2022-06-20', avatar: 'https://i.pravatar.cc/150?img=51', status: 'active', performance: 86, tasksCompleted: 128, efficiency: 86 },
    { id: 'E013', name: 'Simran Kaur', email: 'simran.kaur@wolftech.com', department: 'technical', position: 'agent', teamLeaderId: 'E010', managerId: 'E008', phone: '+91-9876543225', joinDate: '2022-08-05', avatar: 'https://i.pravatar.cc/150?img=43', status: 'active', performance: 88, tasksCompleted: 135, efficiency: 88 },
    { id: 'E014', name: 'Rahul Desai', email: 'rahul.desai@wolftech.com', department: 'technical', position: 'agent', teamLeaderId: 'E010', managerId: 'E008', phone: '+91-9876543226', joinDate: '2022-09-15', avatar: 'https://i.pravatar.cc/150?img=52', status: 'active', performance: 84, tasksCompleted: 122, efficiency: 84 },

    { id: 'E015', name: 'Manish Agarwal', email: 'manish.agarwal@wolftech.com', department: 'marketing', position: 'manager', phone: '+91-9876543230', joinDate: '2021-12-01', avatar: 'https://i.pravatar.cc/150?img=53', status: 'active', performance: 90, tasksCompleted: 188, efficiency: 90 },
    { id: 'E016', name: 'Pooja Bansal', email: 'pooja.bansal@wolftech.com', department: 'marketing', position: 'team_leader', managerId: 'E015', phone: '+91-9876543231', joinDate: '2022-02-10', avatar: 'https://i.pravatar.cc/150?img=26', status: 'active', performance: 87, tasksCompleted: 165, efficiency: 87 },
    { id: 'E017', name: 'Sanjay Rao', email: 'sanjay.rao@wolftech.com', department: 'marketing', position: 'team_leader', managerId: 'E015', phone: '+91-9876543232', joinDate: '2022-03-15', avatar: 'https://i.pravatar.cc/150?img=54', status: 'active', performance: 85, tasksCompleted: 152, efficiency: 85 },
    { id: 'E018', name: 'Ritu Singh', email: 'ritu.singh@wolftech.com', department: 'marketing', position: 'agent', teamLeaderId: 'E016', managerId: 'E015', phone: '+91-9876543233', joinDate: '2022-05-20', avatar: 'https://i.pravatar.cc/150?img=32', status: 'active', performance: 91, tasksCompleted: 158, efficiency: 91 },
    { id: 'E019', name: 'Gaurav Chopra', email: 'gaurav.chopra@wolftech.com', department: 'marketing', position: 'agent', teamLeaderId: 'E016', managerId: 'E015', phone: '+91-9876543234', joinDate: '2022-06-25', avatar: 'https://i.pravatar.cc/150?img=55', status: 'active', performance: 83, tasksCompleted: 138, efficiency: 83 },
    { id: 'E020', name: 'Nisha Pandey', email: 'nisha.pandey@wolftech.com', department: 'marketing', position: 'agent', teamLeaderId: 'E017', managerId: 'E015', phone: '+91-9876543235', joinDate: '2022-07-30', avatar: 'https://i.pravatar.cc/150?img=31', status: 'active', performance: 86, tasksCompleted: 148, efficiency: 86 },
    { id: 'E021', name: 'Aditya Khanna', email: 'aditya.khanna@wolftech.com', department: 'marketing', position: 'agent', teamLeaderId: 'E017', managerId: 'E015', phone: '+91-9876543236', joinDate: '2022-09-05', avatar: 'https://i.pravatar.cc/150?img=56', status: 'active', performance: 80, tasksCompleted: 132, efficiency: 80 },

    { id: 'E022', name: 'Vivek Saxena', email: 'vivek.saxena@wolftech.com', department: 'business_development', position: 'manager', phone: '+91-9876543240', joinDate: '2021-10-15', avatar: 'https://i.pravatar.cc/150?img=57', status: 'active', performance: 95, tasksCompleted: 215, efficiency: 95 },
    { id: 'E023', name: 'Divya Pillai', email: 'divya.pillai@wolftech.com', department: 'business_development', position: 'team_leader', managerId: 'E022', phone: '+91-9876543241', joinDate: '2022-01-20', avatar: 'https://i.pravatar.cc/150?img=28', status: 'active', performance: 92, tasksCompleted: 185, efficiency: 92 },
    { id: 'E024', name: 'Harish Bhat', email: 'harish.bhat@wolftech.com', department: 'business_development', position: 'team_leader', managerId: 'E022', phone: '+91-9876543242', joinDate: '2022-02-25', avatar: 'https://i.pravatar.cc/150?img=58', status: 'active', performance: 89, tasksCompleted: 172, efficiency: 89 },
    { id: 'E025', name: 'Sneha Kulkarni', email: 'sneha.kulkarni@wolftech.com', department: 'business_development', position: 'agent', teamLeaderId: 'E023', managerId: 'E022', phone: '+91-9876543243', joinDate: '2022-04-15', avatar: 'https://i.pravatar.cc/150?img=38', status: 'active', performance: 94, tasksCompleted: 168, efficiency: 94 },
    { id: 'E026', name: 'Mohit Jain', email: 'mohit.jain@wolftech.com', department: 'business_development', position: 'agent', teamLeaderId: 'E023', managerId: 'E022', phone: '+91-9876543244', joinDate: '2022-05-25', avatar: 'https://i.pravatar.cc/150?img=59', status: 'active', performance: 87, tasksCompleted: 152, efficiency: 87 },
    { id: 'E027', name: 'Tanvi Shah', email: 'tanvi.shah@wolftech.com', department: 'business_development', position: 'agent', teamLeaderId: 'E024', managerId: 'E022', phone: '+91-9876543245', joinDate: '2022-07-10', avatar: 'https://i.pravatar.cc/150?img=24', status: 'active', performance: 90, tasksCompleted: 160, efficiency: 90 },
    { id: 'E028', name: 'Ashish Dubey', email: 'ashish.dubey@wolftech.com', department: 'business_development', position: 'agent', teamLeaderId: 'E024', managerId: 'E022', phone: '+91-9876543246', joinDate: '2022-08-15', avatar: 'https://i.pravatar.cc/150?img=60', status: 'active', performance: 85, tasksCompleted: 145, efficiency: 85 },

    { id: 'E029', name: 'Sandeep Thakur', email: 'sandeep.thakur@wolftech.com', department: 'sales', position: 'manager', phone: '+91-9876543250', joinDate: '2021-09-10', avatar: 'https://i.pravatar.cc/150?img=61', status: 'active', performance: 93, tasksCompleted: 208, efficiency: 93 },
    { id: 'E030', name: 'Meera Nambiar', email: 'meera.nambiar@wolftech.com', department: 'sales', position: 'team_leader', managerId: 'E029', phone: '+91-9876543251', joinDate: '2022-01-05', avatar: 'https://i.pravatar.cc/150?img=25', status: 'active', performance: 90, tasksCompleted: 182, efficiency: 90 },
    { id: 'E031', name: 'Nikhil Bhatt', email: 'nikhil.bhatt@wolftech.com', department: 'sales', position: 'team_leader', managerId: 'E029', phone: '+91-9876543252', joinDate: '2022-02-15', avatar: 'https://i.pravatar.cc/150?img=62', status: 'active', performance: 88, tasksCompleted: 168, efficiency: 88 },
    { id: 'E032', name: 'Priyanka Menon', email: 'priyanka.menon@wolftech.com', department: 'sales', position: 'agent', teamLeaderId: 'E030', managerId: 'E029', phone: '+91-9876543253', joinDate: '2022-04-20', avatar: 'https://i.pravatar.cc/150?img=22', status: 'active', performance: 92, tasksCompleted: 165, efficiency: 92 },
    { id: 'E033', name: 'Vishal Tiwari', email: 'vishal.tiwari@wolftech.com', department: 'sales', position: 'agent', teamLeaderId: 'E030', managerId: 'E029', phone: '+91-9876543254', joinDate: '2022-05-30', avatar: 'https://i.pravatar.cc/150?img=63', status: 'active', performance: 86, tasksCompleted: 148, efficiency: 86 },
    { id: 'E034', name: 'Swati Mishra', email: 'swati.mishra@wolftech.com', department: 'sales', position: 'agent', teamLeaderId: 'E031', managerId: 'E029', phone: '+91-9876543255', joinDate: '2022-07-05', avatar: 'https://i.pravatar.cc/150?img=23', status: 'active', performance: 89, tasksCompleted: 158, efficiency: 89 },
    { id: 'E035', name: 'Akash Sinha', email: 'akash.sinha@wolftech.com', department: 'sales', position: 'agent', teamLeaderId: 'E031', managerId: 'E029', phone: '+91-9876543256', joinDate: '2022-08-20', avatar: 'https://i.pravatar.cc/150?img=64', status: 'active', performance: 84, tasksCompleted: 142, efficiency: 84 }
  ],

  targets: {
    accounts: {
      manager: {
        invoicesProcessed: { value: 150, unit: 'invoices' },
        billingIssuesResolved: { value: 50, unit: 'issues' },
        revenueManaged: { value: 5000000, unit: '₹' }
      },
      team_leader: {
        onboardingsCompleted: { value: 80, unit: 'onboardings' },
        workflowStepsManaged: { value: 200, unit: 'steps' },
        documentationAccuracy: { value: 95, unit: '%' }
      },
      agent: {
        customersOnboarded: { value: 60, unit: 'customers' },
        documentsCollected: { value: 180, unit: 'documents' },
        agreementsSigned: { value: 55, unit: 'agreements' }
      }
    },
    technical: {
      manager: {
        trainingSessionsSupervised: { value: 100, unit: 'sessions' },
        qualityScore: { value: 90, unit: '%' },
        teamProductivity: { value: 85, unit: '%' }
      },
      team_leader: {
        onboardingsManaged: { value: 50, unit: 'onboardings' },
        resumesCreated: { value: 45, unit: 'resumes' },
        trainingsScheduled: { value: 60, unit: 'trainings' }
      },
      agent: {
        candidatesTrained: { value: 40, unit: 'candidates' },
        projectsMonitored: { value: 30, unit: 'projects' },
        technicalSessions: { value: 50, unit: 'sessions' }
      }
    },
    marketing: {
      manager: {
        campaignsSupervised: { value: 30, unit: 'campaigns' },
        teamPerformance: { value: 85, unit: '%' },
        budgetUtilization: { value: 90, unit: '%' }
      },
      team_leader: {
        applicationsTracked: { value: 100, unit: 'applications' },
        interviewsScheduled: { value: 80, unit: 'interviews' },
        conversionRate: { value: 40, unit: '%' }
      },
      agent: {
        leadsGenerated: { value: 120, unit: 'leads' },
        followUpsCompleted: { value: 150, unit: 'follow-ups' },
        interviewsUpdated: { value: 75, unit: 'interviews' }
      }
    },
    business_development: {
      manager: {
        dealsSupervised: { value: 40, unit: 'deals' },
        revenueTarget: { value: 8000000, unit: '₹' },
        teamEfficiency: { value: 88, unit: '%' }
      },
      team_leader: {
        leadsAssigned: { value: 100, unit: 'leads' },
        followUpCycles: { value: 200, unit: 'cycles' },
        conversionRate: { value: 35, unit: '%' }
      },
      agent: {
        leadsHandled: { value: 80, unit: 'leads' },
        dealsClosed: { value: 25, unit: 'deals' },
        activityUpdates: { value: 250, unit: 'updates' }
      }
    },
    sales: {
      manager: {
        revenuePipeline: { value: 10000000, unit: '₹' },
        dealsSupervised: { value: 60, unit: 'deals' },
        conversionRate: { value: 45, unit: '%' }
      },
      team_leader: {
        agentPerformance: { value: 88, unit: '%' },
        pipelineManaged: { value: 5000000, unit: '₹' },
        dealsMonitored: { value: 50, unit: 'deals' }
      },
      agent: {
        leadsQualified: { value: 70, unit: 'leads' },
        dealsClosed: { value: 30, unit: 'deals' },
        revenueGenerated: { value: 2000000, unit: '₹' }
      }
    }
  },

  performanceData: {
    E001: { invoicesProcessed: 142, billingIssuesResolved: 48, revenueManaged: 4850000 },
    E002: { onboardingsCompleted: 75, workflowStepsManaged: 185, documentationAccuracy: 94 },
    E003: { onboardingsCompleted: 68, workflowStepsManaged: 172, documentationAccuracy: 92 },
    E004: { customersOnboarded: 58, documentsCollected: 174, agreementsSigned: 52 },
    E005: { customersOnboarded: 51, documentsCollected: 153, agreementsSigned: 46 },
    E006: { customersOnboarded: 54, documentsCollected: 162, agreementsSigned: 49 },
    E007: { customersOnboarded: 48, documentsCollected: 144, agreementsSigned: 43 },

    E008: { trainingSessionsSupervised: 96, qualityScore: 92, teamProductivity: 87 },
    E009: { onboardingsManaged: 48, resumesCreated: 43, trainingsScheduled: 58 },
    E010: { onboardingsManaged: 46, resumesCreated: 41, trainingsScheduled: 54 },
    E011: { candidatesTrained: 39, projectsMonitored: 28, technicalSessions: 48 },
    E012: { candidatesTrained: 35, projectsMonitored: 26, technicalSessions: 44 },
    E013: { candidatesTrained: 37, projectsMonitored: 27, technicalSessions: 46 },
    E014: { candidatesTrained: 34, projectsMonitored: 25, technicalSessions: 42 },

    E015: { campaignsSupervised: 28, teamPerformance: 87, budgetUtilization: 92 },
    E016: { applicationsTracked: 95, interviewsScheduled: 78, conversionRate: 42 },
    E017: { applicationsTracked: 88, interviewsScheduled: 72, conversionRate: 38 },
    E018: { leadsGenerated: 115, followUpsCompleted: 145, interviewsUpdated: 72 },
    E019: { leadsGenerated: 102, followUpsCompleted: 128, interviewsUpdated: 65 },
    E020: { leadsGenerated: 108, followUpsCompleted: 136, interviewsUpdated: 68 },
    E021: { leadsGenerated: 98, followUpsCompleted: 122, interviewsUpdated: 62 },

    E022: { dealsSupervised: 39, revenueManaged: 7850000, teamEfficiency: 90 },
    E023: { leadsAssigned: 98, followUpCycles: 195, conversionRate: 38 },
    E024: { leadsAssigned: 92, followUpCycles: 182, conversionRate: 34 },
    E025: { leadsHandled: 78, dealsClosed: 26, activityUpdates: 245 },
    E026: { leadsHandled: 72, dealsClosed: 23, activityUpdates: 228 },
    E027: { leadsHandled: 75, dealsClosed: 24, activityUpdates: 235 },
    E028: { leadsHandled: 68, dealsClosed: 21, activityUpdates: 218 },

    E029: { revenuePipeline: 9850000, dealsSupervised: 58, conversionRate: 48 },
    E030: { agentPerformance: 90, pipelineManaged: 4950000, dealsMonitored: 49 },
    E031: { agentPerformance: 86, pipelineManaged: 4650000, dealsMonitored: 46 },
    E032: { leadsQualified: 68, dealsClosed: 29, revenueGenerated: 2050000 },
    E033: { leadsQualified: 62, dealsClosed: 26, revenueGenerated: 1850000 },
    E034: { leadsQualified: 65, dealsClosed: 28, revenueGenerated: 1950000 },
    E035: { leadsQualified: 58, dealsClosed: 24, revenueGenerated: 1750000 }
  },

  leads: [
    { id: 'L001', name: 'TechCorp India', company: 'TechCorp India Pvt Ltd', email: 'contact@techcorp.in', phone: '+91-9988776655', status: 'qualified', department: 'business_development', assignedTo: 'E025', assignedToName: 'Sneha Kulkarni', lastActivity: '2024-12-11T14:30:00', lastWorkedBy: 'E025', lastWorkedByName: 'Sneha Kulkarni', value: 450000, stage: 'proposal', source: 'website', priority: 'high', progress: 65, notes: 'Interested in enterprise solution' },
    { id: 'L002', name: 'Digital Solutions', company: 'Digital Solutions Ltd', email: 'info@digitalsol.com', phone: '+91-9988776656', status: 'contacted', department: 'business_development', assignedTo: 'E026', assignedToName: 'Mohit Jain', lastActivity: '2024-12-10T16:45:00', lastWorkedBy: 'E023', lastWorkedByName: 'Divya Pillai', value: 320000, stage: 'discovery', source: 'referral', priority: 'medium', progress: 40, notes: 'Requires technical demo' },
    { id: 'L003', name: 'SmartBiz Corp', company: 'SmartBiz Corporation', email: 'hello@smartbiz.co', phone: '+91-9988776657', status: 'qualified', department: 'sales', assignedTo: 'E032', assignedToName: 'Priyanka Menon', lastActivity: '2024-12-11T10:20:00', lastWorkedBy: 'E032', lastWorkedByName: 'Priyanka Menon', value: 580000, stage: 'negotiation', source: 'cold_call', priority: 'high', progress: 75, notes: 'Pricing negotiation ongoing' },
    { id: 'L004', name: 'Global Tech', company: 'Global Tech Services', email: 'sales@globaltech.in', phone: '+91-9988776658', status: 'new', department: 'business_development', assignedTo: 'E027', assignedToName: 'Tanvi Shah', lastActivity: '2024-12-09T09:15:00', lastWorkedBy: 'E027', lastWorkedByName: 'Tanvi Shah', value: 280000, stage: 'initial_contact', source: 'linkedin', priority: 'low', progress: 20, notes: 'First contact made via LinkedIn' },
    { id: 'L005', name: 'Innovation Labs', company: 'Innovation Labs Pvt Ltd', email: 'contact@innovlabs.com', phone: '+91-9988776659', status: 'qualified', department: 'sales', assignedTo: 'E033', assignedToName: 'Vishal Tiwari', lastActivity: '2024-12-11T15:00:00', lastWorkedBy: 'E030', lastWorkedByName: 'Meera Nambiar', value: 720000, stage: 'closing', source: 'website', priority: 'high', progress: 85, notes: 'Contract review in progress' },
    { id: 'L006', name: 'NextGen Systems', company: 'NextGen Systems Inc', email: 'info@nextgen.co.in', phone: '+91-9988776660', status: 'contacted', department: 'business_development', assignedTo: 'E028', assignedToName: 'Ashish Dubey', lastActivity: '2024-12-08T11:30:00', lastWorkedBy: 'E028', lastWorkedByName: 'Ashish Dubey', value: 390000, stage: 'qualification', source: 'email_campaign', priority: 'medium', progress: 35, notes: 'Budget confirmation pending' },
    { id: 'L007', name: 'CloudFirst Solutions', company: 'CloudFirst Solutions', email: 'sales@cloudfirst.in', phone: '+91-9988776661', status: 'qualified', department: 'sales', assignedTo: 'E034', assignedToName: 'Swati Mishra', lastActivity: '2024-12-10T13:45:00', lastWorkedBy: 'E034', lastWorkedByName: 'Swati Mishra', value: 510000, stage: 'proposal', source: 'partner', priority: 'high', progress: 60, notes: 'Proposal submitted, awaiting feedback' },
    { id: 'L008', name: 'DataDrive Inc', company: 'DataDrive Inc', email: 'contact@datadrive.com', phone: '+91-9988776662', status: 'new', department: 'marketing', assignedTo: 'E018', assignedToName: 'Ritu Singh', lastActivity: '2024-12-11T08:00:00', lastWorkedBy: 'E018', lastWorkedByName: 'Ritu Singh', value: 150000, stage: 'lead_generation', source: 'social_media', priority: 'low', progress: 15, notes: 'Found through social media campaign' },
    { id: 'L009', name: 'Enterprise Hub', company: 'Enterprise Hub Ltd', email: 'hello@enterhub.in', phone: '+91-9988776663', status: 'contacted', department: 'marketing', assignedTo: 'E019', assignedToName: 'Gaurav Chopra', lastActivity: '2024-12-09T14:20:00', lastWorkedBy: 'E016', lastWorkedByName: 'Pooja Bansal', value: 210000, stage: 'nurturing', source: 'webinar', priority: 'medium', progress: 30, notes: 'Attended recent webinar' },
    { id: 'L010', name: 'FutureTech Group', company: 'FutureTech Group', email: 'info@futuretech.co', phone: '+91-9988776664', status: 'qualified', department: 'business_development', assignedTo: 'E025', assignedToName: 'Sneha Kulkarni', lastActivity: '2024-12-11T12:00:00', lastWorkedBy: 'E025', lastWorkedByName: 'Sneha Kulkarni', value: 640000, stage: 'proposal', source: 'trade_show', priority: 'high', progress: 70, notes: 'Met at industry trade show' },
    { id: 'L011', name: 'Synergy Solutions', company: 'Synergy Solutions Pvt Ltd', email: 'contact@synergy.in', phone: '+91-9988776665', status: 'qualified', department: 'sales', assignedTo: 'E035', assignedToName: 'Akash Sinha', lastActivity: '2024-12-11T16:30:00', lastWorkedBy: 'E031', lastWorkedByName: 'Nikhil Bhatt', value: 480000, stage: 'negotiation', source: 'referral', priority: 'high', progress: 78, notes: 'Referred by existing client' },
    { id: 'L012', name: 'Apex Technologies', company: 'Apex Technologies Ltd', email: 'sales@apextech.com', phone: '+91-9988776666', status: 'contacted', department: 'business_development', assignedTo: 'E026', assignedToName: 'Mohit Jain', lastActivity: '2024-12-10T10:15:00', lastWorkedBy: 'E026', lastWorkedByName: 'Mohit Jain', value: 350000, stage: 'discovery', source: 'cold_call', priority: 'medium', progress: 45, notes: 'Initial discovery call completed' },
    { id: 'L013', name: 'Velocity Systems', company: 'Velocity Systems Inc', email: 'info@velocity.co.in', phone: '+91-9988776667', status: 'new', department: 'marketing', assignedTo: 'E020', assignedToName: 'Nisha Pandey', lastActivity: '2024-12-08T15:45:00', lastWorkedBy: 'E020', lastWorkedByName: 'Nisha Pandey', value: 180000, stage: 'lead_generation', source: 'google_ads', priority: 'low', progress: 12, notes: 'Generated through Google Ads campaign' },
    { id: 'L014', name: 'ProBiz Enterprises', company: 'ProBiz Enterprises', email: 'hello@probiz.in', phone: '+91-9988776668', status: 'qualified', department: 'sales', assignedTo: 'E032', assignedToName: 'Priyanka Menon', lastActivity: '2024-12-11T11:00:00', lastWorkedBy: 'E032', lastWorkedByName: 'Priyanka Menon', value: 590000, stage: 'closing', source: 'website', priority: 'high', progress: 82, notes: 'Ready to sign, final review pending' },
    { id: 'L015', name: 'InnoWave Tech', company: 'InnoWave Technologies', email: 'contact@innowave.com', phone: '+91-9988776669', status: 'contacted', department: 'business_development', assignedTo: 'E027', assignedToName: 'Tanvi Shah', lastActivity: '2024-12-09T12:30:00', lastWorkedBy: 'E024', lastWorkedByName: 'Harish Bhat', value: 420000, stage: 'qualification', source: 'linkedin', priority: 'medium', progress: 38, notes: 'LinkedIn connection established' },
    { id: 'L016', name: 'AlphaTech Solutions', company: 'AlphaTech Solutions Ltd', email: 'info@alphatech.in', phone: '+91-9988776670', status: 'qualified', department: 'sales', assignedTo: 'E033', assignedToName: 'Vishal Tiwari', lastActivity: '2024-12-10T14:00:00', lastWorkedBy: 'E033', lastWorkedByName: 'Vishal Tiwari', value: 530000, stage: 'proposal', source: 'partner', priority: 'high', progress: 68, notes: 'Partner introduction, proposal sent' },
    { id: 'L017', name: 'MegaSoft Corporation', company: 'MegaSoft Corp', email: 'sales@megasoft.co', phone: '+91-9988776671', status: 'new', department: 'marketing', assignedTo: 'E021', assignedToName: 'Aditya Khanna', lastActivity: '2024-12-11T09:00:00', lastWorkedBy: 'E021', lastWorkedByName: 'Aditya Khanna', value: 195000, stage: 'nurturing', source: 'email_campaign', priority: 'low', progress: 18, notes: 'Responded to email campaign' },
    { id: 'L018', name: 'Quantum Systems', company: 'Quantum Systems Pvt Ltd', email: 'contact@quantum.in', phone: '+91-9988776672', status: 'qualified', department: 'business_development', assignedTo: 'E028', assignedToName: 'Ashish Dubey', lastActivity: '2024-12-11T13:15:00', lastWorkedBy: 'E028', lastWorkedByName: 'Ashish Dubey', value: 670000, stage: 'negotiation', source: 'referral', priority: 'high', progress: 72, notes: 'Price and timeline negotiation' },
    { id: 'L019', name: 'Zenith Innovations', company: 'Zenith Innovations Ltd', email: 'hello@zenith.com', phone: '+91-9988776673', status: 'contacted', department: 'marketing', assignedTo: 'E018', assignedToName: 'Ritu Singh', lastActivity: '2024-12-10T11:45:00', lastWorkedBy: 'E018', lastWorkedByName: 'Ritu Singh', value: 240000, stage: 'lead_generation', source: 'social_media', priority: 'medium', progress: 25, notes: 'Active on social media' },
    { id: 'L020', name: 'Pinnacle Group', company: 'Pinnacle Business Group', email: 'info@pinnacle.in', phone: '+91-9988776674', status: 'qualified', department: 'sales', assignedTo: 'E034', assignedToName: 'Swati Mishra', lastActivity: '2024-12-11T15:45:00', lastWorkedBy: 'E034', lastWorkedByName: 'Swati Mishra', value: 610000, stage: 'closing', source: 'website', priority: 'high', progress: 88, notes: 'Final approval stage' },
    { id: 'L021', name: 'CoreTech Services', company: 'CoreTech Services Ltd', email: 'contact@coretech.co', phone: '+91-9988776675', status: 'new', department: 'business_development', assignedTo: 'E025', assignedToName: 'Sneha Kulkarni', lastActivity: '2024-12-08T10:00:00', lastWorkedBy: 'E025', lastWorkedByName: 'Sneha Kulkarni', value: 310000, stage: 'initial_contact', source: 'cold_call', priority: 'low', progress: 22, notes: 'Cold call outreach made' },
    { id: 'L022', name: 'BrightPath Solutions', company: 'BrightPath Solutions', email: 'sales@brightpath.in', phone: '+91-9988776676', status: 'contacted', department: 'marketing', assignedTo: 'E019', assignedToName: 'Gaurav Chopra', lastActivity: '2024-12-09T15:30:00', lastWorkedBy: 'E019', lastWorkedByName: 'Gaurav Chopra', value: 265000, stage: 'nurturing', source: 'webinar', priority: 'medium', progress: 32, notes: 'Webinar participant, follow-up sent' },
    { id: 'L023', name: 'EliteWare Systems', company: 'EliteWare Systems Inc', email: 'info@eliteware.com', phone: '+91-9988776677', status: 'qualified', department: 'sales', assignedTo: 'E035', assignedToName: 'Akash Sinha', lastActivity: '2024-12-11T10:45:00', lastWorkedBy: 'E035', lastWorkedByName: 'Akash Sinha', value: 555000, stage: 'proposal', source: 'partner', priority: 'high', progress: 64, notes: 'Partner-sourced opportunity' },
    { id: 'L024', name: 'NexusPoint Tech', company: 'NexusPoint Technologies', email: 'hello@nexuspoint.in', phone: '+91-9988776678', status: 'qualified', department: 'business_development', assignedTo: 'E026', assignedToName: 'Mohit Jain', lastActivity: '2024-12-10T12:20:00', lastWorkedBy: 'E023', lastWorkedByName: 'Divya Pillai', value: 495000, stage: 'discovery', source: 'linkedin', priority: 'high', progress: 52, notes: 'Discovery phase active' },
    { id: 'L025', name: 'Momentum Solutions', company: 'Momentum Solutions Ltd', email: 'contact@momentum.co', phone: '+91-9988776679', status: 'contacted', department: 'marketing', assignedTo: 'E020', assignedToName: 'Nisha Pandey', lastActivity: '2024-12-11T14:10:00', lastWorkedBy: 'E020', lastWorkedByName: 'Nisha Pandey', value: 220000, stage: 'lead_generation', source: 'google_ads', priority: 'medium', progress: 28, notes: 'PPC campaign lead' },
    { id: 'L026', name: 'Summit Enterprises', company: 'Summit Enterprises Pvt Ltd', email: 'info@summit.in', phone: '+91-9988776680', status: 'qualified', department: 'sales', assignedTo: 'E032', assignedToName: 'Priyanka Menon', lastActivity: '2024-12-11T16:00:00', lastWorkedBy: 'E032', lastWorkedByName: 'Priyanka Menon', value: 690000, stage: 'negotiation', source: 'referral', priority: 'high', progress: 80, notes: 'High-value opportunity, negotiations underway' },
    { id: 'L027', name: 'Catalyst Systems', company: 'Catalyst Systems Inc', email: 'sales@catalyst.com', phone: '+91-9988776681', status: 'new', department: 'business_development', assignedTo: 'E027', assignedToName: 'Tanvi Shah', lastActivity: '2024-12-08T13:00:00', lastWorkedBy: 'E027', lastWorkedByName: 'Tanvi Shah', value: 340000, stage: 'initial_contact', source: 'trade_show', priority: 'low', progress: 16, notes: 'Trade show contact' },
    { id: 'L028', name: 'Vertex Technologies', company: 'Vertex Technologies Ltd', email: 'contact@vertex.in', phone: '+91-9988776682', status: 'qualified', department: 'sales', assignedTo: 'E033', assignedToName: 'Vishal Tiwari', lastActivity: '2024-12-11T12:30:00', lastWorkedBy: 'E030', lastWorkedByName: 'Meera Nambiar', value: 575000, stage: 'closing', source: 'website', priority: 'high', progress: 86, notes: 'Close to deal closure' },
    { id: 'L029', name: 'PrimeTech Group', company: 'PrimeTech Business Group', email: 'hello@primetech.co', phone: '+91-9988776683', status: 'contacted', department: 'marketing', assignedTo: 'E021', assignedToName: 'Aditya Khanna', lastActivity: '2024-12-10T09:45:00', lastWorkedBy: 'E021', lastWorkedByName: 'Aditya Khanna', value: 285000, stage: 'nurturing', source: 'email_campaign', priority: 'medium', progress: 36, notes: 'Email campaign engagement' },
    { id: 'L030', name: 'Horizon Systems', company: 'Horizon Systems Pvt Ltd', email: 'info@horizon.in', phone: '+91-9988776684', status: 'qualified', department: 'business_development', assignedTo: 'E028', assignedToName: 'Ashish Dubey', lastActivity: '2024-12-11T11:30:00', lastWorkedBy: 'E028', lastWorkedByName: 'Ashish Dubey', value: 625000, stage: 'proposal', source: 'partner', priority: 'high', progress: 66, notes: 'Proposal under review' }
  ],

  dashboardStats: {
    totalEmployees: 35,
    totalLeads: 30,
    activeProjects: 87,
    monthlyRevenue: 12500000,
    departments: {
      accounts: { employees: 7, activeLeads: 0, revenue: 4850000, performance: 86 },
      technical: { employees: 7, activeLeads: 0, revenue: 0, performance: 89 },
      marketing: { employees: 7, activeLeads: 8, revenue: 1850000, performance: 84 },
      business_development: { employees: 7, activeLeads: 12, revenue: 3500000, performance: 91 },
      sales: { employees: 7, activeLeads: 10, revenue: 2300000, performance: 88 }
    }
  },

  activityLogs: [
    { id: 'A001', employeeId: 'E025', employeeName: 'Sneha Kulkarni', leadId: 'L001', leadName: 'TechCorp India', action: 'Updated proposal', timestamp: '2024-12-11T14:30:00', department: 'business_development' },
    { id: 'A002', employeeId: 'E032', employeeName: 'Priyanka Menon', leadId: 'L003', leadName: 'SmartBiz Corp', action: 'Sent contract for negotiation', timestamp: '2024-12-11T10:20:00', department: 'sales' },
    { id: 'A003', employeeId: 'E033', employeeName: 'Vishal Tiwari', leadId: 'L005', leadName: 'Innovation Labs', action: 'Moved to closing stage', timestamp: '2024-12-11T15:00:00', department: 'sales' },
    { id: 'A004', employeeId: 'E025', employeeName: 'Sneha Kulkarni', leadId: 'L010', leadName: 'FutureTech Group', action: 'Submitted proposal document', timestamp: '2024-12-11T12:00:00', department: 'business_development' },
    { id: 'A005', employeeId: 'E032', employeeName: 'Priyanka Menon', leadId: 'L014', leadName: 'ProBiz Enterprises', action: 'Scheduled closing meeting', timestamp: '2024-12-11T11:00:00', department: 'sales' }
  ]
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = MOCK_DATA;
}
