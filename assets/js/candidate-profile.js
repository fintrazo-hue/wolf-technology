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
    return [
      {
        channel: 'whatsapp',
        message: 'Hi Rajesh, your interview with TechCorp is scheduled for March 5th at 2 PM. Please confirm.',
        sender: 'Neha Gupta',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString()
      },
      {
        channel: 'email',
        message: 'Interview Invitation - TechCorp Software Solutions',
        sender: 'Neha Gupta',
        timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        channel: 'meeting',
        message: 'Monthly progress review meeting',
        sender: 'Anjali Mehta',
        timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        channel: 'whatsapp',
        message: 'Congratulations! Your resume has been approved. Moving to marketing phase.',
        sender: 'Vikram Patel',
        timestamp: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString()
      }
    ];
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
    document.getElementById('candidate-name').textContent = candidate.name;
    document.getElementById('candidate-id').textContent = candidate.id;
    document.getElementById('candidate-service').textContent = candidate.service;
    document.getElementById('current-department').textContent = candidate.currentDepartment;
    document.getElementById('current-stage').textContent = candidate.currentStage;

    const statusBadge = document.getElementById('status-badge');
    statusBadge.textContent = candidate.status;
    statusBadge.className = `status-badge ${candidate.status.toLowerCase().replace(' ', '-')}`;

    const progressFill = document.getElementById('overall-progress-fill');
    progressFill.style.width = `${candidate.progressPercentage}%`;
    document.getElementById('overall-progress-text').textContent = `${candidate.progressPercentage}%`;

    document.getElementById('last-activity').textContent = calculateInactivity(candidate.lastActivityAt);
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

  const renderCommunications = (communications) => {
    const container = document.getElementById('communication-list');
    container.innerHTML = '';

    communications.forEach(comm => {
      const item = document.createElement('div');
      item.className = 'communication-item';
      item.innerHTML = `
        <div class="comm-icon ${comm.channel}">
          <i class="fab fa-${comm.channel === 'whatsapp' ? 'whatsapp' : comm.channel === 'email' ? 'envelope' : 'video'}"></i>
        </div>
        <div class="comm-content">
          <div class="comm-header">
            <span class="comm-channel">${comm.channel.charAt(0).toUpperCase() + comm.channel.slice(1)}</span>
            <span class="comm-time">${calculateInactivity(comm.timestamp)}</span>
          </div>
          <div class="comm-message">${comm.message}</div>
          <div class="comm-sender">Sent by ${comm.sender}</div>
        </div>
      `;
      container.appendChild(item);
    });
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

  const init = () => {
    const candidateId = getCandidateId();
    const userRole = getCurrentUserRole();

    const candidateData = generateMockCandidateData(candidateId);
    const documents = generateMockDocuments();
    const activities = generateMockActivities();
    const communications = generateMockCommunications();

    renderOverview(candidateData);
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
