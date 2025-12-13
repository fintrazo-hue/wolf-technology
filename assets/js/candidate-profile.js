document.addEventListener('DOMContentLoaded', function() {
  const getCandidateId = () => {
    const params = new URLSearchParams(window.location.search);
    return params.get('candidateId') || 'CAND001';
  };

  const getCurrentUserRole = () => {
    return localStorage.getItem('userRole') || 'super_admin';
  };

  const generateMockCandidateData = (candidateId) => {
    const candidateData = {
      id: candidateId,
      name: 'Rajesh Kumar',
      email: 'rajesh.kumar@example.com',
      phone: '+91 98765 43210',
      altPhone: '+91 87654 32109',
      dob: '1995-06-15',
      gender: 'Male',
      city: 'Mumbai',
      state: 'Maharashtra',
      country: 'India',
      education: 'B.Tech in Computer Science',
      experience: '3',
      visa: 'H1B Ready',
      service: 'Java Full Stack Developer',
      currentDepartment: 'Marketing',
      currentStage: 'Interview Scheduling',
      status: 'Active',
      progressPercentage: 65,
      lastActivityAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),

      journey: [
        {
          event: 'Lead Created',
          date: '2024-01-15T10:00:00Z',
          department: 'BD/Sales',
          performedBy: 'Amit Sharma (BD Agent)',
          note: 'Lead generated from website inquiry'
        },
        {
          event: 'Lead Assigned',
          date: '2024-01-15T11:30:00Z',
          department: 'BD/Sales',
          performedBy: 'System',
          note: 'Assigned to Amit Sharma'
        },
        {
          event: 'Payment Completed',
          date: '2024-01-20T14:00:00Z',
          department: 'BD/Sales',
          performedBy: 'Rajesh Kumar (Candidate)',
          note: 'Payment of ₹50,000 received'
        },
        {
          event: 'Accounts Onboarding Started',
          date: '2024-01-21T09:00:00Z',
          department: 'Accounts',
          performedBy: 'Priya Singh (Accounts Agent)',
          note: 'Welcome email sent'
        },
        {
          event: 'Documents Collected',
          date: '2024-01-23T16:00:00Z',
          department: 'Accounts',
          performedBy: 'Priya Singh (Accounts Agent)',
          note: 'All personal documents received'
        },
        {
          event: 'Agreement Signed',
          date: '2024-01-25T12:00:00Z',
          department: 'Accounts',
          performedBy: 'Rajesh Kumar (Candidate)',
          note: 'Service agreement digitally signed'
        },
        {
          event: 'Accounts Onboarding Completed',
          date: '2024-01-26T10:00:00Z',
          department: 'Accounts',
          performedBy: 'Priya Singh (Accounts Agent)',
          note: 'Candidate moved to Technical department'
        },
        {
          event: 'Technical Training Started',
          date: '2024-01-29T09:00:00Z',
          department: 'Technical',
          performedBy: 'Vikram Patel (Technical TL)',
          note: 'Resume building and project training initiated'
        },
        {
          event: 'Project Assigned',
          date: '2024-02-05T10:00:00Z',
          department: 'Technical',
          performedBy: 'Vikram Patel (Technical TL)',
          note: 'E-commerce web application project assigned'
        },
        {
          event: 'Technical Training Completed',
          date: '2024-02-20T17:00:00Z',
          department: 'Technical',
          performedBy: 'Vikram Patel (Technical TL)',
          note: 'Project completed successfully, resume approved'
        },
        {
          event: 'Marketing Started',
          date: '2024-02-22T09:00:00Z',
          department: 'Marketing',
          performedBy: 'Neha Gupta (Marketing Agent)',
          note: 'Profile submission to clients initiated'
        },
        {
          event: 'Interview Scheduled',
          date: '2024-03-01T11:00:00Z',
          department: 'Marketing',
          performedBy: 'Neha Gupta (Marketing Agent)',
          note: 'Interview with TechCorp scheduled for March 5th'
        }
      ],

      accounts: {
        workflow: [
          { step: 'Welcome', status: 'Completed', lastUpdated: '2024-01-21', pendingSince: 0 },
          { step: 'Candidate Onboard', status: 'Completed', lastUpdated: '2024-01-22', pendingSince: 0 },
          { step: 'Documents Collected', status: 'Completed', lastUpdated: '2024-01-23', pendingSince: 0 },
          { step: 'Agreement Sent', status: 'Completed', lastUpdated: '2024-01-24', pendingSince: 0 },
          { step: 'Agreement Signed', status: 'Completed', lastUpdated: '2024-01-25', pendingSince: 0 }
        ],
        agent: 'Priya Singh',
        teamLeader: 'Rahul Verma'
      },

      technical: {
        resumeStatus: 'Approved',
        trainingStatus: 'Completed',
        trainer: 'Vikram Patel',
        projectStatus: 'Completed',
        projectCompletion: 100,
        notes: 'Excellent performance during training. Completed E-commerce project with advanced features including payment gateway integration, user authentication, and admin dashboard. Code quality is very good.',
        agent: 'Suresh Reddy',
        teamLeader: 'Vikram Patel'
      },

      marketing: {
        startDate: '2024-02-22',
        profilesSubmitted: 8,
        interviewsScheduled: 3,
        interviewsAttended: 2,
        placementStatus: 'In Progress',
        nextFollowup: '2024-03-05',
        feedback: 'First interview with TechSolutions went well, technical round cleared. Second interview with DataSystems - waiting for feedback. Third interview scheduled with TechCorp on March 5th.',
        agent: 'Neha Gupta',
        teamLeader: 'Anjali Mehta'
      },

      bdSales: {
        leadSource: 'Website Inquiry',
        callsMade: 5,
        followups: 8,
        conversionDate: '2024-01-20',
        stageHistory: [
          { stage: 'New Lead', date: '2024-01-15' },
          { stage: 'Contacted', date: '2024-01-15' },
          { stage: 'Qualified', date: '2024-01-17' },
          { stage: 'Proposal Sent', date: '2024-01-18' },
          { stage: 'Negotiation', date: '2024-01-19' },
          { stage: 'Won', date: '2024-01-20' }
        ],
        notes: 'Candidate was very interested in Java Full Stack program. Compared with 2-3 other institutes. Chose us because of project-based training and placement support.'
      }
    };

    return candidateData;
  };

  const generateMockDocuments = () => {
    return {
      personal: [
        { name: 'Aadhar Card.pdf', uploadedBy: 'Rajesh Kumar', uploadedDate: '2024-01-23', status: 'Approved' },
        { name: 'PAN Card.pdf', uploadedBy: 'Rajesh Kumar', uploadedDate: '2024-01-23', status: 'Approved' },
        { name: 'Passport.pdf', uploadedBy: 'Rajesh Kumar', uploadedDate: '2024-01-23', status: 'Approved' }
      ],
      resume: [
        { name: 'Resume_v1.pdf', uploadedBy: 'Rajesh Kumar', uploadedDate: '2024-01-23', status: 'Rejected' },
        { name: 'Resume_v2.pdf', uploadedBy: 'Vikram Patel', uploadedDate: '2024-02-10', status: 'Approved' },
        { name: 'Resume_Final.pdf', uploadedBy: 'Vikram Patel', uploadedDate: '2024-02-20', status: 'Approved' }
      ],
      agreements: [
        { name: 'Service_Agreement.pdf', uploadedBy: 'System', uploadedDate: '2024-01-24', status: 'Approved' },
        { name: 'NDA.pdf', uploadedBy: 'System', uploadedDate: '2024-01-24', status: 'Approved' }
      ],
      certificates: [
        { name: 'BTech_Certificate.pdf', uploadedBy: 'Rajesh Kumar', uploadedDate: '2024-01-23', status: 'Approved' },
        { name: 'Experience_Letter.pdf', uploadedBy: 'Rajesh Kumar', uploadedDate: '2024-01-23', status: 'Approved' }
      ]
    };
  };

  const generateMockActivities = () => {
    return [
      {
        type: 'followup',
        title: 'Interview Followup',
        description: 'Called candidate to confirm interview with TechCorp on March 5th',
        user: 'Neha Gupta',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString()
      },
      {
        type: 'stage_change',
        title: 'Stage Updated',
        description: 'Stage changed from "Profile Submission" to "Interview Scheduling"',
        user: 'System',
        timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        type: 'note',
        title: 'Internal Note Added',
        description: 'Candidate has good communication skills. Strong technical background.',
        user: 'Neha Gupta',
        timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        type: 'workflow',
        title: 'Technical Training Completed',
        description: 'Project completed successfully with 100% completion',
        user: 'Vikram Patel',
        timestamp: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString()
      }
    ];
  };

  const generateMockCommunications = () => {
    return {
      'Amit Sharma': {
        role: 'BD Agent',
        department: 'BD/Sales',
        messages: [
          {
            channel: 'whatsapp',
            message: 'Hi Rajesh, welcome to Wolf Technologies! I am Amit, your BD representative. I will help you throughout the onboarding process.',
            timestamp: new Date('2024-01-15T10:30:00Z').toISOString()
          },
          {
            channel: 'call',
            message: 'Initial consultation call - Discussed service requirements and expectations. Duration: 45 minutes.',
            timestamp: new Date('2024-01-15T15:00:00Z').toISOString()
          },
          {
            channel: 'whatsapp',
            message: 'Thank you for the call. Please find the payment link: [Payment Link]. Once payment is completed, we will start the process.',
            timestamp: new Date('2024-01-16T09:00:00Z').toISOString()
          },
          {
            channel: 'email',
            message: 'Payment Confirmation - Your payment of ₹50,000 has been received. Moving you to Accounts department for onboarding.',
            timestamp: new Date('2024-01-20T16:00:00Z').toISOString()
          }
        ]
      },
      'Priya Singh': {
        role: 'Accounts Agent',
        department: 'Accounts',
        messages: [
          {
            channel: 'email',
            message: 'Welcome to Wolf Technologies Accounts Department! Please check the attached documents that need to be filled and submitted.',
            timestamp: new Date('2024-01-21T09:30:00Z').toISOString()
          },
          {
            channel: 'whatsapp',
            message: 'Hi Rajesh, have you checked the email? Please let me know if you have any questions regarding the documents.',
            timestamp: new Date('2024-01-22T11:00:00Z').toISOString()
          },
          {
            channel: 'whatsapp',
            message: 'Documents received! Everything looks good. I am now preparing your service agreement.',
            timestamp: new Date('2024-01-23T17:00:00Z').toISOString()
          },
          {
            channel: 'email',
            message: 'Service Agreement - Please review and digitally sign the attached agreement document.',
            timestamp: new Date('2024-01-24T10:00:00Z').toISOString()
          },
          {
            channel: 'whatsapp',
            message: 'Agreement signed successfully! Your accounts onboarding is complete. You will now be moved to Technical department.',
            timestamp: new Date('2024-01-26T10:30:00Z').toISOString()
          }
        ]
      },
      'Vikram Patel': {
        role: 'Technical Team Leader',
        department: 'Technical',
        messages: [
          {
            channel: 'whatsapp',
            message: 'Hello Rajesh! I am Vikram from Technical department. We will be working on your resume and technical training.',
            timestamp: new Date('2024-01-29T09:30:00Z').toISOString()
          },
          {
            channel: 'meeting',
            message: 'Resume review and planning session - Discussed background, skills, and project ideas. Duration: 60 minutes.',
            timestamp: new Date('2024-01-29T14:00:00Z').toISOString()
          },
          {
            channel: 'email',
            message: 'Updated Resume Draft - Please review your new resume and provide feedback.',
            timestamp: new Date('2024-02-01T11:00:00Z').toISOString()
          },
          {
            channel: 'whatsapp',
            message: 'Great! Your project is coming along well. E-commerce application is 70% complete. Keep up the good work!',
            timestamp: new Date('2024-02-15T16:00:00Z').toISOString()
          },
          {
            channel: 'whatsapp',
            message: 'Congratulations! Your resume has been approved and your project is complete. Moving you to Marketing for interview process.',
            timestamp: new Date('2024-02-21T10:00:00Z').toISOString()
          }
        ]
      },
      'Neha Gupta': {
        role: 'Marketing Agent',
        department: 'Marketing',
        messages: [
          {
            channel: 'whatsapp',
            message: 'Hi Rajesh! I am Neha from Marketing. I will help you with interview scheduling and preparation.',
            timestamp: new Date('2024-02-22T09:00:00Z').toISOString()
          },
          {
            channel: 'call',
            message: 'Interview preparation call - Discussed common interview questions and best practices. Duration: 30 minutes.',
            timestamp: new Date('2024-02-23T15:00:00Z').toISOString()
          },
          {
            channel: 'whatsapp',
            message: 'Great news! I have scheduled your first interview with TechCorp Solutions on March 1st at 11 AM. Details sent via email.',
            timestamp: new Date('2024-02-27T10:30:00Z').toISOString()
          },
          {
            channel: 'email',
            message: 'Interview Details - TechCorp Solutions | Position: Java Full Stack Developer | Date: March 1, 2024 | Time: 11:00 AM | Mode: Video Call',
            timestamp: new Date('2024-02-27T10:35:00Z').toISOString()
          },
          {
            channel: 'whatsapp',
            message: 'How did your interview go with TechCorp? Please share your feedback.',
            timestamp: new Date('2024-03-01T14:00:00Z').toISOString()
          },
          {
            channel: 'whatsapp',
            message: 'Your next interview is scheduled with GlobalTech Inc on March 5th at 2 PM. Please confirm your availability.',
            timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString()
          }
        ]
      },
      'Anjali Mehta': {
        role: 'Marketing Manager',
        department: 'Marketing',
        messages: [
          {
            channel: 'meeting',
            message: 'Monthly progress review meeting - Discussed interview performance and areas of improvement.',
            timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
          },
          {
            channel: 'email',
            message: 'Progress Report - You have attended 3 interviews so far. Keep up the positive attitude!',
            timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString()
          }
        ]
      }
    };
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const calculateInactivity = (lastActivityAt) => {
    const lastActivity = new Date(lastActivityAt);
    const now = new Date();
    const diffHours = Math.floor((now - lastActivity) / (1000 * 60 * 60));

    if (diffHours < 1) return 'Just now';
    if (diffHours < 24) return `${diffHours}h ago`;
    const days = Math.floor(diffHours / 24);
    return `${days}d ago`;
  };

  const renderOverview = (candidate) => {
    document.getElementById('breadcrumb-name').textContent = candidate.name;
    document.getElementById('candidate-name-header').textContent = candidate.name;
    document.getElementById('candidate-name').textContent = candidate.name;
    document.getElementById('candidate-id').textContent = candidate.id;
    document.getElementById('candidate-service').textContent = candidate.service;
    document.getElementById('current-stage-text').textContent = candidate.currentStage;

    const statusBadge = document.getElementById('status-badge');
    statusBadge.textContent = candidate.status;
    statusBadge.className = `status-badge ${candidate.status.toLowerCase().replace(' ', '-')}`;

    const deptBadge = document.getElementById('dept-badge');
    deptBadge.textContent = candidate.currentDepartment;

    const progressFill = document.getElementById('overall-progress-fill');
    progressFill.style.width = `${candidate.progressPercentage}%`;
    document.getElementById('overall-progress-text').textContent = `${candidate.progressPercentage}%`;

    document.getElementById('last-activity').textContent = calculateInactivity(candidate.lastActivityAt);
  };

  const renderKPIs = (candidate) => {
    document.getElementById('kpi-accounts-status').textContent = candidate.accounts.workflow[4].status;
    document.getElementById('kpi-accounts-detail').textContent = `All steps ${candidate.accounts.workflow[4].status.toLowerCase()}`;

    const kpiAccountsDetail = document.getElementById('kpi-accounts-detail');
    kpiAccountsDetail.className = candidate.accounts.workflow[4].status === 'Completed' ? 'kpi-trend positive' : 'kpi-trend neutral';

    document.getElementById('kpi-technical-status').textContent = candidate.technical.projectStatus;
    document.getElementById('kpi-technical-detail').textContent = `${candidate.technical.projectCompletion}% complete`;

    const kpiTechnicalDetail = document.getElementById('kpi-technical-detail');
    kpiTechnicalDetail.className = candidate.technical.projectCompletion === 100 ? 'kpi-trend positive' : 'kpi-trend neutral';

    document.getElementById('kpi-marketing-count').textContent = candidate.marketing.interviewsAttended;
    document.getElementById('kpi-marketing-detail').textContent = `${candidate.marketing.interviewsScheduled} scheduled`;

    const startDate = new Date(candidate.journey[0].date);
    const now = new Date();
    const daysDiff = Math.floor((now - startDate) / (1000 * 60 * 60 * 24));
    document.getElementById('kpi-days-count').textContent = daysDiff;
    document.getElementById('kpi-days-detail').textContent = `Since ${formatDate(candidate.journey[0].date)}`;
  };

  const renderPersonalDetails = (candidate) => {
    document.getElementById('info-name').textContent = candidate.name;
    document.getElementById('info-email').textContent = candidate.email;
    document.getElementById('info-phone').textContent = candidate.phone;
    document.getElementById('info-alt-phone').textContent = candidate.altPhone;
    document.getElementById('info-dob').textContent = formatDate(candidate.dob);
    document.getElementById('info-gender').textContent = candidate.gender;
    document.getElementById('info-city').textContent = candidate.city;
    document.getElementById('info-state').textContent = candidate.state;
    document.getElementById('info-country').textContent = candidate.country;
    document.getElementById('info-education').textContent = candidate.education;
    document.getElementById('info-experience').textContent = candidate.experience;
    document.getElementById('info-visa').textContent = candidate.visa;
  };

  const renderJourneyTimeline = (journey) => {
    const container = document.getElementById('journey-timeline');
    container.innerHTML = '';

    journey.forEach(event => {
      const item = document.createElement('div');
      item.className = 'timeline-item completed';
      item.innerHTML = `
        <div class="timeline-header">
          <span class="timeline-title">${event.event}</span>
          <span class="timeline-date">${formatDateTime(event.date)}</span>
        </div>
        <div class="timeline-details">
          <strong>${event.department}</strong> • ${event.performedBy}
        </div>
        ${event.note ? `<div class="timeline-note">${event.note}</div>` : ''}
      `;
      container.appendChild(item);
    });
  };

  const renderAccountsProgress = (accounts) => {
    const container = document.getElementById('accounts-workflow');
    container.innerHTML = '';

    accounts.workflow.forEach(step => {
      const item = document.createElement('div');
      item.className = `workflow-step ${step.status.toLowerCase()}`;
      item.innerHTML = `
        <div class="workflow-step-icon">
          <i class="fas fa-${step.status === 'Completed' ? 'check-circle' : 'clock'}"></i>
        </div>
        <div class="workflow-step-content">
          <div class="workflow-step-title">${step.step}</div>
          <div class="workflow-step-info">Last updated: ${step.lastUpdated}</div>
        </div>
        <span class="workflow-step-status status-badge ${step.status.toLowerCase()}">${step.status}</span>
      `;
      container.appendChild(item);
    });

    document.getElementById('accounts-agent').textContent = accounts.agent;
    document.getElementById('accounts-tl').textContent = accounts.teamLeader;
  };

  const renderTechnicalProgress = (technical) => {
    const resumeStatus = document.getElementById('tech-resume-status');
    resumeStatus.textContent = technical.resumeStatus;
    resumeStatus.className = `status-badge ${technical.resumeStatus.toLowerCase()}`;

    const trainingStatus = document.getElementById('tech-training-status');
    trainingStatus.textContent = technical.trainingStatus;
    trainingStatus.className = `status-badge ${technical.trainingStatus.toLowerCase()}`;

    document.getElementById('tech-trainer').textContent = technical.trainer;

    const projectStatus = document.getElementById('tech-project-status');
    projectStatus.textContent = technical.projectStatus;
    projectStatus.className = `status-badge ${technical.projectStatus.toLowerCase()}`;

    const projectProgress = document.getElementById('tech-project-progress');
    projectProgress.style.width = `${technical.projectCompletion}%`;
    document.getElementById('tech-project-percent').textContent = `${technical.projectCompletion}%`;

    document.getElementById('tech-notes').textContent = technical.notes;
    document.getElementById('technical-agent').textContent = technical.agent;
    document.getElementById('technical-tl').textContent = technical.teamLeader;
  };

  const renderMarketingProgress = (marketing) => {
    document.getElementById('marketing-start-date').textContent = formatDate(marketing.startDate);
    document.getElementById('marketing-profiles-count').textContent = marketing.profilesSubmitted;
    document.getElementById('marketing-interviews-scheduled').textContent = marketing.interviewsScheduled;
    document.getElementById('marketing-interviews-attended').textContent = marketing.interviewsAttended;

    const placementStatus = document.getElementById('marketing-placement-status');
    placementStatus.textContent = marketing.placementStatus;
    placementStatus.className = `status-badge ${marketing.placementStatus.toLowerCase().replace(' ', '-')}`;

    document.getElementById('marketing-next-followup').textContent = formatDate(marketing.nextFollowup);
    document.getElementById('marketing-feedback').textContent = marketing.feedback;
    document.getElementById('marketing-agent').textContent = marketing.agent;
    document.getElementById('marketing-tl').textContent = marketing.teamLeader;
  };

  const renderBDSalesInfo = (bdSales) => {
    document.getElementById('bd-lead-source').textContent = bdSales.leadSource;
    document.getElementById('bd-calls-made').textContent = bdSales.callsMade;
    document.getElementById('bd-followups').textContent = bdSales.followups;
    document.getElementById('bd-conversion-date').textContent = formatDate(bdSales.conversionDate);
    document.getElementById('bd-notes').textContent = bdSales.notes;

    const stageHistoryContainer = document.getElementById('bd-stage-history');
    stageHistoryContainer.innerHTML = '';

    bdSales.stageHistory.forEach(stage => {
      const item = document.createElement('div');
      item.className = 'timeline-item completed';
      item.innerHTML = `
        <div class="timeline-header">
          <span class="timeline-title">${stage.stage}</span>
          <span class="timeline-date">${formatDate(stage.date)}</span>
        </div>
      `;
      stageHistoryContainer.appendChild(item);
    });
  };

  const renderDocuments = (documents) => {
    const renderDocList = (docs, containerId) => {
      const container = document.getElementById(containerId);
      container.innerHTML = '';

      if (docs.length === 0) {
        container.innerHTML = '<p style="color: #64748b; font-size: 14px;">No documents uploaded</p>';
        return;
      }

      docs.forEach(doc => {
        const item = document.createElement('div');
        item.className = 'document-item';
        item.innerHTML = `
          <div class="doc-icon">
            <i class="fas fa-file-pdf"></i>
          </div>
          <div class="doc-info">
            <div class="doc-name">${doc.name}</div>
            <div class="doc-meta">
              Uploaded by ${doc.uploadedBy} on ${doc.uploadedDate} •
              <span class="status-badge ${doc.status.toLowerCase()}">${doc.status}</span>
            </div>
          </div>
          <div class="doc-actions">
            <button title="Preview"><i class="fas fa-eye"></i></button>
            <button title="Download"><i class="fas fa-download"></i></button>
          </div>
        `;
        container.appendChild(item);
      });
    };

    renderDocList(documents.personal, 'docs-personal');
    renderDocList(documents.resume, 'docs-resume');
    renderDocList(documents.agreements, 'docs-agreements');
    renderDocList(documents.certificates, 'docs-certificates');
  };

  const renderActivities = (activities) => {
    const container = document.getElementById('activity-list');
    container.innerHTML = '';

    activities.forEach(activity => {
      const iconMap = {
        followup: 'phone',
        stage_change: 'exchange-alt',
        note: 'sticky-note',
        workflow: 'tasks'
      };

      const item = document.createElement('div');
      item.className = 'activity-item';
      item.innerHTML = `
        <div class="activity-icon">
          <i class="fas fa-${iconMap[activity.type] || 'info-circle'}"></i>
        </div>
        <div class="activity-content">
          <div class="activity-header">
            <span class="activity-title">${activity.title}</span>
            <span class="activity-time">${calculateInactivity(activity.timestamp)}</span>
          </div>
          <div class="activity-description">${activity.description}</div>
          <div class="activity-user">By ${activity.user}</div>
        </div>
      `;
      container.appendChild(item);
    });
  };

  const getChannelIcon = (channel) => {
    const icons = {
      whatsapp: 'fa-whatsapp',
      email: 'fa-envelope',
      call: 'fa-phone-alt',
      meeting: 'fa-video'
    };
    return icons[channel] || 'fa-comment';
  };

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  let allCommunications = {};
  let currentFilter = 'all';

  const renderCommunications = (communications) => {
    allCommunications = communications;

    if (!communications || typeof communications !== 'object') {
      return;
    }

    const employees = Object.keys(communications);
    if (employees.length === 0) {
      return;
    }

    renderEmployeeList(currentFilter);
    setupCommunicationFilters();
  };

  const renderEmployeeList = (filter = 'all') => {
    const listContainer = document.getElementById('employee-list-container');
    const countElement = document.getElementById('employee-count');

    if (!listContainer) return;

    listContainer.innerHTML = '';

    const employees = Object.keys(allCommunications);
    let filteredCount = 0;

    employees.forEach(employeeName => {
      const employee = allCommunications[employeeName];
      if (!employee || !employee.messages) return;

      const filteredMessages = filter === 'all'
        ? employee.messages
        : employee.messages.filter(msg => msg.channel === filter);

      if (filteredMessages.length === 0) return;

      filteredCount++;
      const lastMessage = filteredMessages[filteredMessages.length - 1];

      const employeeItem = document.createElement('div');
      employeeItem.className = 'employee-list-item';
      employeeItem.setAttribute('data-employee', employeeName);
      employeeItem.onclick = () => selectEmployee(employeeName, filter);

      employeeItem.innerHTML = `
        <div class="employee-avatar">${getInitials(employeeName)}</div>
        <div class="employee-info">
          <div class="employee-name">${employeeName}</div>
          <div class="employee-last-message">${lastMessage.message.substring(0, 40)}...</div>
        </div>
        <div class="employee-list-meta">
          <div class="employee-time">${calculateInactivity(lastMessage.timestamp)}</div>
          ${filteredMessages.length > 1 ? `<span class="chat-count">${filteredMessages.length}</span>` : ''}
        </div>
      `;

      listContainer.appendChild(employeeItem);
    });

    if (countElement) {
      countElement.textContent = filteredCount;
    }
  };

  const selectEmployee = (employeeName, filter = 'all') => {
    document.querySelectorAll('.employee-list-item').forEach(item => {
      item.classList.remove('active');
    });

    const selectedItem = document.querySelector(`[data-employee="${employeeName}"]`);
    if (selectedItem) {
      selectedItem.classList.add('active');
    }

    renderChatPanel(employeeName, filter);
  };

  const renderChatPanel = (employeeName, filter = 'all') => {
    const chatPanel = document.getElementById('chat-panel');
    if (!chatPanel) return;

    const employee = allCommunications[employeeName];
    if (!employee) return;

    const filteredMessages = filter === 'all'
      ? employee.messages
      : employee.messages.filter(msg => msg.channel === filter);

    let messagesHTML = '';
    filteredMessages.forEach((msg, index) => {
      const isReceived = index % 2 === 0;
      messagesHTML += `
        <div class="chat-message ${isReceived ? 'received' : 'sent'}">
          <div class="chat-bubble">
            <div class="chat-bubble-text">${msg.message}</div>
            <div class="chat-bubble-footer">
              <span class="chat-channel-badge ${msg.channel}">
                <i class="fas ${getChannelIcon(msg.channel)}"></i>
                ${msg.channel.toUpperCase()}
              </span>
              <span class="chat-bubble-time">${formatTime(msg.timestamp)}</span>
            </div>
          </div>
        </div>
      `;
    });

    chatPanel.innerHTML = `
      <div class="chat-header">
        <div class="employee-avatar">${getInitials(employeeName)}</div>
        <div class="employee-info">
          <div class="employee-name">${employeeName}</div>
          <div class="employee-role">${employee.role} • ${employee.department}</div>
        </div>
      </div>
      <div class="chat-messages-container">
        ${messagesHTML}
      </div>
    `;

    const messagesContainer = chatPanel.querySelector('.chat-messages-container');
    if (messagesContainer) {
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  const renderRoleBasedActions = (userRole) => {
    const headerActions = document.getElementById('header-actions');
    headerActions.innerHTML = '';

    if (userRole === 'super_admin' || userRole === 'manager') {
      headerActions.innerHTML = `
        <button class="btn btn-secondary" id="reassign-btn">
          <i class="fas fa-user-edit"></i> Reassign
        </button>
        <button class="btn btn-warning" id="hold-btn">
          <i class="fas fa-pause"></i> Put On Hold
        </button>
        <button class="btn btn-danger" id="drop-btn">
          <i class="fas fa-times"></i> Drop
        </button>
      `;
    } else if (userRole === 'team_leader' || userRole === 'agent') {
      headerActions.innerHTML = `
        <button class="btn btn-primary" id="update-workflow-btn">
          <i class="fas fa-edit"></i> Update Progress
        </button>
        <button class="btn btn-secondary" id="add-note-btn">
          <i class="fas fa-sticky-note"></i> Add Note
        </button>
      `;
    }
  };

  const setupTabSwitching = () => {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const targetTab = btn.getAttribute('data-tab');

        tabBtns.forEach(b => b.classList.remove('active'));
        tabContents.forEach(c => c.classList.remove('active'));

        btn.classList.add('active');
        document.getElementById(`${targetTab}-tab`).classList.add('active');
      });
    });
  };

  const setupSubtabSwitching = () => {
    const subtabBtns = document.querySelectorAll('.subtab-btn');
    const subtabContents = document.querySelectorAll('.subtab-content');

    subtabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const targetSubtab = btn.getAttribute('data-subtab');

        subtabBtns.forEach(b => b.classList.remove('active'));
        subtabContents.forEach(c => c.classList.remove('active'));

        btn.classList.add('active');
        document.getElementById(`${targetSubtab}-subtab`).classList.add('active');
      });
    });
  };

  const setupCommunicationFilters = () => {
    const filterBtns = document.querySelectorAll('.filter-btn');

    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const filter = btn.getAttribute('data-filter');
        currentFilter = filter;

        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        renderEmployeeList(filter);

        const chatPanel = document.getElementById('chat-panel');
        if (chatPanel) {
          chatPanel.innerHTML = `
            <div class="chat-panel-placeholder">
              <i class="fas fa-comments"></i>
              <p>Select a contact to view conversation</p>
            </div>
          `;
        }
      });
    });

    const searchInput = document.getElementById('employee-search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const employeeItems = document.querySelectorAll('.employee-list-item');
        let visibleCount = 0;

        employeeItems.forEach(item => {
          const employeeName = item.getAttribute('data-employee').toLowerCase();
          if (employeeName.includes(searchTerm)) {
            item.style.display = 'flex';
            visibleCount++;
          } else {
            item.style.display = 'none';
          }
        });

        const countElement = document.getElementById('employee-count');
        if (countElement) {
          countElement.textContent = visibleCount;
        }
      });
    }
  };

  const init = () => {
    const candidateId = getCandidateId();
    const userRole = getCurrentUserRole();

    const candidateData = generateMockCandidateData(candidateId);
    const documents = generateMockDocuments();
    const activities = generateMockActivities();
    const communications = generateMockCommunications();

    renderOverview(candidateData);
    renderKPIs(candidateData);
    renderPersonalDetails(candidateData);
    renderJourneyTimeline(candidateData.journey);
    renderAccountsProgress(candidateData.accounts);
    renderTechnicalProgress(candidateData.technical);
    renderMarketingProgress(candidateData.marketing);
    renderBDSalesInfo(candidateData.bdSales);
    renderDocuments(documents);
    renderActivities(activities);
    renderCommunications(communications);
    renderRoleBasedActions(userRole);

    setupTabSwitching();
    setupSubtabSwitching();
  };

  init();
});
