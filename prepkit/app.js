// PrepKit - AI Interview Preparation App
// Main Application Logic

// ============================================================
// CONFIGURATION & CONSTANTS
// ============================================================

const SECTIONS = [
    { id: 'resume-analysis', name: 'Resume Analysis', icon: '1' },
    { id: 'research-strategy', name: 'Research & Strategy', icon: '2' },
    { id: 'interview-structure', name: 'Interview Structure', icon: '3' },
    { id: 'study-plan', name: 'Study Plan', icon: '4' },
    { id: 'sample-questions', name: 'Sample Questions', icon: '5' },
    { id: 'star-answers', name: 'STAR Answers', icon: '6' },
    { id: 'role-analysis', name: 'Role Analysis', icon: '7' },
    { id: 'stand-apart', name: 'Stand Apart', icon: '8' },
    { id: 'elevator-pitch', name: 'Elevator Pitch', icon: '9' },
    { id: 'technical-prep', name: 'Technical Prep', icon: '10' }
];

const DEMO_SECTIONS = ['resume-analysis', 'research-strategy', 'interview-structure', 'study-plan'];

const API_ENDPOINTS = {
    openai: 'https://api.openai.com/v1/chat/completions',
    anthropic: 'https://api.anthropic.com/v1/messages',
    openrouter: 'https://openrouter.ai/api/v1/chat/completions'
};

const DEFAULT_MODELS = {
    openai: ['gpt-4-turbo-preview', 'gpt-4', 'gpt-3.5-turbo'],
    anthropic: ['claude-3-opus-20240229', 'claude-3-sonnet-20240229', 'claude-3-haiku-20240307'],
    openrouter: ['openai/gpt-4-turbo-preview', 'anthropic/claude-3-opus', 'google/gemini-pro']
};

const STORAGE_KEYS = {
    sessions: 'prepkit_sessions',
    apiSettings: 'prepkit_api_settings'
};

// ============================================================
// STATE MANAGEMENT
// ============================================================

let appState = {
    currentView: 'home',
    sessions: [],
    currentSession: null,
    apiSettings: {
        provider: 'openai',
        apiKey: '',
        model: 'gpt-4-turbo-preview'
    },
    isGenerating: false,
    generatedContent: {}
};

// ============================================================
// DOM ELEMENTS
// ============================================================

const DOM = {
    // Navigation
    sidebar: document.getElementById('sidebar'),
    sidebarToggle: document.getElementById('sidebarToggle'),
    navItems: document.querySelectorAll('.nav-item'),
    apiStatus: document.getElementById('apiStatus'),

    // Views
    homeView: document.getElementById('homeView'),
    resultsView: document.getElementById('resultsView'),
    dashboardView: document.getElementById('dashboardView'),
    settingsView: document.getElementById('settingsView'),

    // Form
    prepForm: document.getElementById('prepForm'),
    resumeInput: document.getElementById('resume'),
    companyInput: document.getElementById('company'),
    jobRoleInput: document.getElementById('jobRole'),
    contextInput: document.getElementById('context'),
    jobUrlInput: document.getElementById('jobUrl'),
    resumeCount: document.getElementById('resumeCount'),
    generateBtn: document.getElementById('generateBtn'),
    demoBtn: document.getElementById('demoBtn'),

    // Results
    resultsTitle: document.getElementById('resultsTitle'),
    resultsSubtitle: document.getElementById('resultsSubtitle'),
    sectionTabs: document.getElementById('sectionTabs'),
    sectionContent: document.getElementById('sectionContent'),
    backToFormBtn: document.getElementById('backToFormBtn'),
    exportPdfBtn: document.getElementById('exportPdfBtn'),

    // Dashboard
    sessionsGrid: document.getElementById('sessionsGrid'),
    emptyDashboard: document.getElementById('emptyDashboard'),
    createFirstBtn: document.getElementById('createFirstBtn'),

    // Settings
    apiProvider: document.getElementById('apiProvider'),
    apiKey: document.getElementById('apiKey'),
    modelSelect: document.getElementById('modelSelect'),
    toggleApiKey: document.getElementById('toggleApiKey'),
    saveApiSettings: document.getElementById('saveApiSettings'),
    exportDataBtn: document.getElementById('exportDataBtn'),
    clearDataBtn: document.getElementById('clearDataBtn'),

    // Loading
    loadingOverlay: document.getElementById('loadingOverlay'),
    loadingTitle: document.getElementById('loadingTitle'),
    loadingSubtitle: document.getElementById('loadingSubtitle'),
    progressBar: document.getElementById('progressBar'),
    progressStatus: document.getElementById('progressStatus'),

    // Toast & Modal
    toastContainer: document.getElementById('toastContainer'),
    confirmModal: document.getElementById('confirmModal'),
    confirmTitle: document.getElementById('confirmTitle'),
    confirmMessage: document.getElementById('confirmMessage'),
    confirmCancel: document.getElementById('confirmCancel'),
    confirmAction: document.getElementById('confirmAction'),
    closeConfirmModal: document.getElementById('closeConfirmModal')
};

// ============================================================
// INITIALIZATION
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
    loadState();
    setupEventListeners();
    updateAPIStatus();
    checkURLParams();
});

function loadState() {
    // Load sessions from localStorage
    const savedSessions = localStorage.getItem(STORAGE_KEYS.sessions);
    if (savedSessions) {
        try {
            appState.sessions = JSON.parse(savedSessions);
        } catch (e) {
            console.error('Error loading sessions:', e);
            appState.sessions = [];
        }
    }

    // Load API settings
    const savedSettings = localStorage.getItem(STORAGE_KEYS.apiSettings);
    if (savedSettings) {
        try {
            appState.apiSettings = JSON.parse(savedSettings);
            DOM.apiProvider.value = appState.apiSettings.provider;
            DOM.apiKey.value = appState.apiSettings.apiKey;
            updateModelOptions();
            DOM.modelSelect.value = appState.apiSettings.model;
        } catch (e) {
            console.error('Error loading API settings:', e);
        }
    }
}

function saveState() {
    localStorage.setItem(STORAGE_KEYS.sessions, JSON.stringify(appState.sessions));
    localStorage.setItem(STORAGE_KEYS.apiSettings, JSON.stringify(appState.apiSettings));
}

function checkURLParams() {
    const params = new URLSearchParams(window.location.search);
    const sessionId = params.get('id');
    const view = params.get('view');

    if (sessionId && view === 'session') {
        loadSession(sessionId);
    }
}

// ============================================================
// EVENT LISTENERS
// ============================================================

function setupEventListeners() {
    // Navigation
    DOM.navItems.forEach(item => {
        item.addEventListener('click', () => handleNavigation(item.dataset.view));
    });

    DOM.sidebarToggle.addEventListener('click', toggleSidebar);

    // Form
    DOM.prepForm.addEventListener('submit', (e) => {
        e.preventDefault();
        handleGenerate(false);
    });

    DOM.demoBtn.addEventListener('click', () => handleGenerate(true));

    DOM.resumeInput.addEventListener('input', updateCharCount);

    // Results
    DOM.backToFormBtn.addEventListener('click', () => {
        showView('home');
        window.history.pushState({}, '', window.location.pathname);
    });

    DOM.exportPdfBtn.addEventListener('click', exportToPDF);

    // Dashboard
    DOM.createFirstBtn.addEventListener('click', () => handleNavigation('home'));

    // Settings
    DOM.apiProvider.addEventListener('change', handleProviderChange);
    DOM.toggleApiKey.addEventListener('click', toggleApiKeyVisibility);
    DOM.saveApiSettings.addEventListener('click', saveAPISettings);
    DOM.exportDataBtn.addEventListener('click', exportAllData);
    DOM.clearDataBtn.addEventListener('click', () => showConfirmDialog(
        'Clear All Data',
        'Are you sure you want to delete all saved sessions? This action cannot be undone.',
        clearAllData
    ));

    // Modal
    DOM.closeConfirmModal.addEventListener('click', closeConfirmModal);
    DOM.confirmCancel.addEventListener('click', closeConfirmModal);

    // Mobile menu
    addMobileMenuButton();
}

// ============================================================
// NAVIGATION
// ============================================================

function handleNavigation(view) {
    DOM.navItems.forEach(item => {
        item.classList.toggle('active', item.dataset.view === view);
    });

    showView(view);

    if (view === 'dashboard') {
        renderDashboard();
    }

    // Close mobile menu
    DOM.sidebar.classList.remove('mobile-open');
}

function showView(view) {
    appState.currentView = view;

    document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));

    const viewElement = document.getElementById(`${view}View`);
    if (viewElement) {
        viewElement.classList.add('active');
    }
}

function toggleSidebar() {
    DOM.sidebar.classList.toggle('collapsed');
}

function addMobileMenuButton() {
    const btn = document.createElement('button');
    btn.className = 'mobile-menu-btn';
    btn.innerHTML = `
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
        </svg>
    `;
    btn.addEventListener('click', () => {
        DOM.sidebar.classList.toggle('mobile-open');
    });
    document.body.appendChild(btn);
}

// ============================================================
// FORM HANDLING
// ============================================================

function updateCharCount() {
    const count = DOM.resumeInput.value.length;
    DOM.resumeCount.textContent = `${count.toLocaleString()} characters`;
}

async function handleGenerate(isDemo) {
    const resume = DOM.resumeInput.value.trim();
    const company = DOM.companyInput.value.trim();
    const jobRole = DOM.jobRoleInput.value.trim();
    const context = DOM.contextInput.value.trim();
    const jobUrl = DOM.jobUrlInput.value.trim();

    // Validation
    if (!resume || !company || !jobRole) {
        showToast('Please fill in all required fields', 'error');
        return;
    }

    // Check API settings
    if (!appState.apiSettings.apiKey) {
        showToast('Please configure your API key in Settings first', 'error');
        handleNavigation('settings');
        return;
    }

    // Create session
    const session = {
        id: generateId(),
        resume,
        company,
        jobRole,
        context,
        jobUrl,
        createdAt: new Date().toISOString(),
        content: {},
        isDemo
    };

    appState.currentSession = session;
    appState.generatedContent = {};

    // Determine which sections to generate
    const sectionsToGenerate = isDemo
        ? SECTIONS.filter(s => DEMO_SECTIONS.includes(s.id))
        : SECTIONS;

    // Show loading
    showLoading(sectionsToGenerate);

    try {
        // Generate content for each section
        for (let i = 0; i < sectionsToGenerate.length; i++) {
            const section = sectionsToGenerate[i];
            updateProgress(section, 'generating', i, sectionsToGenerate.length);

            const content = await generateSectionContent(section, session);
            appState.generatedContent[section.id] = content;
            session.content[section.id] = content;

            updateProgress(section, 'completed', i + 1, sectionsToGenerate.length);
        }

        // Save session
        appState.sessions.unshift(session);
        saveState();

        // Show results
        hideLoading();
        showResults(session);
        showToast('Interview prep kit generated successfully!', 'success');

    } catch (error) {
        console.error('Generation error:', error);
        hideLoading();
        showToast(`Error generating content: ${error.message}`, 'error');
    }
}

// ============================================================
// CONTENT GENERATION (LLM Integration)
// ============================================================

async function generateSectionContent(section, session) {
    const prompt = getSectionPrompt(section.id, session);

    try {
        const response = await callLLM(prompt);
        return response;
    } catch (error) {
        console.error(`Error generating ${section.name}:`, error);
        throw error;
    }
}

function getSectionPrompt(sectionId, session) {
    const { resume, jobRole, company, context } = session;

    const baseContext = `Resume: ${resume}
Job Role: ${jobRole}
Company: ${company}
${context ? `Additional Context: ${context}` : ''}

`;

    const prompts = {
        'resume-analysis': baseContext + `Be concise. Format with **bold headers**. Analyze this resume for the ${jobRole} at ${company}. List 3-4 key strengths and 2-3 areas to emphasize. Keep each point to 1-2 sentences.`,

        'research-strategy': baseContext + `Be concise. Format with **bold headers**. Research ${company} and provide: (1) **Top 3-5 Strategic Initiatives** from recent news/announcements (mention specific initiatives but do NOT include URLs), (2) **Culture & Values** (2-3 points), (3) **Interview Tips** (2-3 points). Focus on actionable insights without external links.`,

        'interview-structure': baseContext + `Be concise. Format with **bold headers**. Explain the typical interview process for ${jobRole} at ${company}. List 4-5 stages/rounds. Keep each description to 1-2 sentences.`,

        'study-plan': baseContext + `Be concise. Create a comprehensive 7-day interview prep study plan with a table showing:
- Day number
- Topics/sections to focus on
- Time allocation (hours)
- Percentage of total prep time

Example format:
| Day | Focus Areas | Time (hrs) | % of Total |
|-----|-------------|-----------|-----------|
| 1 | Technical fundamentals | 4 | 40% |

Base the plan on typical interview importance: Technical (40%), Behavioral/STAR (25%), System Design (20%), Role-specific (15%). Include tips for each day.`,

        'sample-questions': baseContext + `Be concise. Provide 8-10 likely interview questions for ${jobRole} at ${company}. Format as **Question:** followed by a 1-2 sentence tip on how to answer it based on the resume. Do NOT include external links.`,

        'star-answers': baseContext + `Be concise. Format with **bold headers**. Provide 4-5 STAR method answers for behavioral questions relevant to ${jobRole} at ${company}. Each answer should be 3-4 sentences (Situation, Task, Action, Result).`,

        'role-analysis': baseContext + `Be concise. Format with **bold headers**. Analyze the ${jobRole} at ${company}. List key responsibilities, required skills (5-6), and typical interview focus areas. Keep each point to 1-2 sentences.`,

        'stand-apart': baseContext + `Be concise. Format with **bold headers**. Provide 3-4 specific ways to stand out for ${jobRole} at ${company} based on the resume. Keep each point to 1-2 sentences.`,

        'elevator-pitch': baseContext + `Be concise. Create a 30-60 second elevator pitch for ${jobRole} at ${company}. Use the candidate's key experiences. Format with **bold headers** for structure. Keep it punchy and memorable.`,

        'technical-prep': baseContext + `Be concise. Format with **bold headers**. List 5-6 key technical topics for ${jobRole} at ${company}. For each topic, provide a 1-2 sentence explanation and 1-2 key concepts to study. You may mention resource names (e.g., "LeetCode", "System Design Primer") but do NOT include URLs.`
    };

    return prompts[sectionId] || 'Generate helpful content for interview preparation.';
}

async function callLLM(prompt) {
    const { provider, apiKey, model } = appState.apiSettings;

    if (provider === 'anthropic') {
        return callAnthropic(prompt, apiKey, model);
    } else {
        return callOpenAICompatible(prompt, apiKey, model, provider);
    }
}

async function callOpenAICompatible(prompt, apiKey, model, provider) {
    const endpoint = API_ENDPOINTS[provider];

    const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`,
            ...(provider === 'openrouter' && { 'HTTP-Referer': window.location.origin })
        },
        body: JSON.stringify({
            model: model,
            messages: [
                {
                    role: 'system',
                    content: 'You are an expert interview preparation coach. Provide concise, actionable advice tailored to the candidate\'s background and target role.'
                },
                {
                    role: 'user',
                    content: prompt
                }
            ],
            max_tokens: 2000,
            temperature: 0.7
        })
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error?.message || 'API request failed');
    }

    const data = await response.json();
    return data.choices[0].message.content;
}

async function callAnthropic(prompt, apiKey, model) {
    // Note: Anthropic requires server-side proxy due to CORS
    // For client-side, we'll provide instructions to use OpenRouter with Claude

    const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': apiKey,
            'anthropic-version': '2023-06-01',
            'anthropic-dangerous-direct-browser-access': 'true'
        },
        body: JSON.stringify({
            model: model,
            max_tokens: 2000,
            messages: [
                {
                    role: 'user',
                    content: prompt
                }
            ],
            system: 'You are an expert interview preparation coach. Provide concise, actionable advice tailored to the candidate\'s background and target role.'
        })
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error?.message || 'API request failed');
    }

    const data = await response.json();
    return data.content[0].text;
}

// ============================================================
// LOADING & PROGRESS
// ============================================================

function showLoading(sections) {
    DOM.loadingOverlay.classList.add('active');
    DOM.progressBar.style.width = '0%';

    // Build progress status
    DOM.progressStatus.innerHTML = sections.map(section => `
        <div class="progress-item" data-section="${section.id}">
            <span class="status-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"></circle>
                </svg>
            </span>
            <span>${section.name}</span>
        </div>
    `).join('');
}

function updateProgress(section, status, current, total) {
    const progressItem = DOM.progressStatus.querySelector(`[data-section="${section.id}"]`);

    if (progressItem) {
        progressItem.classList.remove('active', 'completed');

        if (status === 'generating') {
            progressItem.classList.add('active');
            progressItem.querySelector('.status-icon').innerHTML = `
                <div class="spinner-small"></div>
            `;
        } else if (status === 'completed') {
            progressItem.classList.add('completed');
            progressItem.querySelector('.status-icon').innerHTML = `
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
            `;
        }
    }

    // Update progress bar
    const progress = (current / total) * 100;
    DOM.progressBar.style.width = `${progress}%`;
}

function hideLoading() {
    DOM.loadingOverlay.classList.remove('active');
}

// ============================================================
// RESULTS DISPLAY
// ============================================================

function showResults(session) {
    showView('results');

    // Update header
    DOM.resultsTitle.textContent = `Interview Prep: ${session.company}`;
    DOM.resultsSubtitle.textContent = `${session.jobRole} - Generated ${formatDate(session.createdAt)}`;

    // Determine which sections to show
    const sectionsToShow = session.isDemo
        ? SECTIONS.filter(s => DEMO_SECTIONS.includes(s.id))
        : SECTIONS;

    // Build tabs
    DOM.sectionTabs.innerHTML = sectionsToShow.map((section, index) => `
        <button class="section-tab ${index === 0 ? 'active' : ''}" data-section="${section.id}">
            <span class="tab-number">${section.icon}</span>
            ${section.name}
        </button>
    `).join('');

    // Build content panels
    DOM.sectionContent.innerHTML = sectionsToShow.map((section, index) => `
        <div class="section-panel ${index === 0 ? 'active' : ''}" data-section="${section.id}">
            <div class="section-panel-header">
                <h2>${section.name}</h2>
                <button class="copy-btn" data-section="${section.id}">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                    </svg>
                    Copy
                </button>
            </div>
            <div class="section-body">
                ${formatMarkdown(session.content[section.id] || 'Content not available')}
            </div>
        </div>
    `).join('');

    // Add tab click handlers
    DOM.sectionTabs.querySelectorAll('.section-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            const sectionId = tab.dataset.section;

            // Update active tab
            DOM.sectionTabs.querySelectorAll('.section-tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            // Update active panel
            DOM.sectionContent.querySelectorAll('.section-panel').forEach(p => p.classList.remove('active'));
            DOM.sectionContent.querySelector(`[data-section="${sectionId}"]`).classList.add('active');
        });
    });

    // Add copy handlers
    DOM.sectionContent.querySelectorAll('.copy-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const sectionId = btn.dataset.section;
            const content = session.content[sectionId];
            copyToClipboard(content, btn);
        });
    });

    // Update URL
    window.history.pushState({}, '', `?view=session&id=${session.id}`);
}

function formatMarkdown(text) {
    if (!text) return '';

    // Convert markdown to HTML
    let html = text
        // Headers
        .replace(/^### (.*$)/gim, '<h4>$1</h4>')
        .replace(/^## (.*$)/gim, '<h3>$1</h3>')
        .replace(/^# (.*$)/gim, '<h3>$1</h3>')
        // Bold
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        // Italic
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        // Line breaks
        .replace(/\n\n/g, '</p><p>')
        .replace(/\n/g, '<br>')
        // Lists
        .replace(/^\s*[-*]\s+(.*)$/gim, '<li>$1</li>')
        // Numbered lists
        .replace(/^\s*\d+\.\s+(.*)$/gim, '<li>$1</li>')
        // Tables (basic support)
        .replace(/\|(.+)\|/g, (match) => {
            const cells = match.split('|').filter(c => c.trim());
            const row = cells.map(c => `<td>${c.trim()}</td>`).join('');
            return `<tr>${row}</tr>`;
        });

    // Wrap consecutive list items
    html = html.replace(/(<li>.*?<\/li>)+/gs, '<ul>$&</ul>');

    // Wrap in paragraphs
    if (!html.startsWith('<')) {
        html = `<p>${html}</p>`;
    }

    // Fix table structure
    if (html.includes('<tr>')) {
        html = html.replace(/(<tr>.*?<\/tr>)+/gs, '<table>$&</table>');
    }

    return html;
}

async function copyToClipboard(text, btn) {
    try {
        await navigator.clipboard.writeText(text);
        btn.classList.add('copied');
        btn.innerHTML = `
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            Copied!
        `;

        setTimeout(() => {
            btn.classList.remove('copied');
            btn.innerHTML = `
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                </svg>
                Copy
            `;
        }, 2000);

        showToast('Copied to clipboard!', 'success');
    } catch (err) {
        showToast('Failed to copy', 'error');
    }
}

// ============================================================
// PDF EXPORT
// ============================================================

async function exportToPDF() {
    if (!appState.currentSession) {
        showToast('No session to export', 'error');
        return;
    }

    const session = appState.currentSession;
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Document settings
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 20;
    const contentWidth = pageWidth - (margin * 2);
    let yPos = margin;

    // Colors
    const primaryColor = [59, 130, 246];
    const textColor = [30, 41, 59];
    const mutedColor = [100, 116, 139];

    // Helper function to add a new page if needed
    function checkNewPage(neededSpace = 20) {
        if (yPos + neededSpace > pageHeight - margin) {
            doc.addPage();
            yPos = margin;
            return true;
        }
        return false;
    }

    // Helper function to add wrapped text
    function addWrappedText(text, fontSize, color, lineHeight = 7) {
        doc.setFontSize(fontSize);
        doc.setTextColor(...color);
        const lines = doc.splitTextToSize(text, contentWidth);
        lines.forEach(line => {
            checkNewPage();
            doc.text(line, margin, yPos);
            yPos += lineHeight;
        });
    }

    // Cover Page
    doc.setFillColor(15, 23, 42);
    doc.rect(0, 0, pageWidth, pageHeight, 'F');

    // Logo/Title
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(36);
    doc.setFont('helvetica', 'bold');
    doc.text('PrepKit', pageWidth / 2, 60, { align: 'center' });

    doc.setFontSize(14);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(148, 163, 184);
    doc.text('Interview Preparation Kit', pageWidth / 2, 72, { align: 'center' });

    // Company & Role
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(24);
    doc.setFont('helvetica', 'bold');
    doc.text(session.company, pageWidth / 2, 110, { align: 'center' });

    doc.setFontSize(18);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(148, 163, 184);
    doc.text(session.jobRole, pageWidth / 2, 125, { align: 'center' });

    // Date
    doc.setFontSize(12);
    doc.setTextColor(100, 116, 139);
    doc.text(`Generated: ${formatDate(session.createdAt)}`, pageWidth / 2, 160, { align: 'center' });

    // Table of Contents
    doc.addPage();
    doc.setFillColor(255, 255, 255);
    doc.rect(0, 0, pageWidth, pageHeight, 'F');

    yPos = margin;
    doc.setTextColor(...primaryColor);
    doc.setFontSize(24);
    doc.setFont('helvetica', 'bold');
    doc.text('Table of Contents', margin, yPos);
    yPos += 20;

    const sectionsToExport = session.isDemo
        ? SECTIONS.filter(s => DEMO_SECTIONS.includes(s.id))
        : SECTIONS;

    sectionsToExport.forEach((section, index) => {
        doc.setFontSize(14);
        doc.setTextColor(...textColor);
        doc.text(`${index + 1}. ${section.name}`, margin, yPos);
        yPos += 10;
    });

    // Content Pages
    sectionsToExport.forEach((section, index) => {
        doc.addPage();
        yPos = margin;

        // Section header
        doc.setFillColor(...primaryColor);
        doc.rect(margin, yPos - 5, contentWidth, 15, 'F');
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(16);
        doc.setFont('helvetica', 'bold');
        doc.text(`${index + 1}. ${section.name}`, margin + 5, yPos + 5);
        yPos += 25;

        // Section content
        const content = session.content[section.id] || 'Content not available';

        // Parse and render content
        const lines = content.split('\n');
        lines.forEach(line => {
            checkNewPage(15);

            const trimmedLine = line.trim();

            if (trimmedLine.startsWith('**') && trimmedLine.endsWith('**')) {
                // Bold header
                doc.setFont('helvetica', 'bold');
                doc.setFontSize(12);
                doc.setTextColor(...primaryColor);
                const text = trimmedLine.replace(/\*\*/g, '');
                addWrappedText(text, 12, primaryColor);
                yPos += 3;
            } else if (trimmedLine.startsWith('-') || trimmedLine.startsWith('*') || /^\d+\./.test(trimmedLine)) {
                // List item
                doc.setFont('helvetica', 'normal');
                doc.setFontSize(11);
                const text = trimmedLine.replace(/^[-*]\s*/, '').replace(/^\d+\.\s*/, '');
                const cleanText = text.replace(/\*\*(.*?)\*\*/g, '$1');
                addWrappedText(`  - ${cleanText}`, 11, textColor);
            } else if (trimmedLine.startsWith('|')) {
                // Table row (simplified)
                doc.setFont('helvetica', 'normal');
                doc.setFontSize(10);
                const cells = trimmedLine.split('|').filter(c => c.trim() && !c.includes('---'));
                if (cells.length > 0) {
                    addWrappedText(cells.join(' | '), 10, textColor);
                }
            } else if (trimmedLine) {
                // Regular text
                doc.setFont('helvetica', 'normal');
                doc.setFontSize(11);
                const cleanText = trimmedLine.replace(/\*\*(.*?)\*\*/g, '$1');
                addWrappedText(cleanText, 11, textColor);
            } else {
                // Empty line
                yPos += 5;
            }
        });
    });

    // Save the PDF
    const filename = `PrepKit_${session.company}_${session.jobRole}_${formatDateShort(session.createdAt)}.pdf`;
    doc.save(filename.replace(/\s+/g, '_'));

    showToast('PDF exported successfully!', 'success');
}

// ============================================================
// DASHBOARD
// ============================================================

function renderDashboard() {
    if (appState.sessions.length === 0) {
        DOM.sessionsGrid.style.display = 'none';
        DOM.emptyDashboard.style.display = 'block';
        return;
    }

    DOM.emptyDashboard.style.display = 'none';
    DOM.sessionsGrid.style.display = 'grid';

    DOM.sessionsGrid.innerHTML = appState.sessions.map(session => `
        <div class="session-card" data-id="${session.id}">
            <div class="session-card-header">
                <div>
                    <h3>${session.company}</h3>
                    <p>${session.jobRole}</p>
                </div>
                <span class="session-date">${formatDate(session.createdAt)}</span>
            </div>
            <div class="session-card-footer">
                <span class="sections-count">
                    ${Object.keys(session.content || {}).length} sections
                    ${session.isDemo ? '(Demo)' : ''}
                </span>
                <div class="session-actions">
                    <button class="session-action-btn view-btn" data-id="${session.id}">View</button>
                    <button class="session-action-btn delete" data-id="${session.id}">Delete</button>
                </div>
            </div>
        </div>
    `).join('');

    // Add click handlers
    DOM.sessionsGrid.querySelectorAll('.view-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            loadSession(btn.dataset.id);
        });
    });

    DOM.sessionsGrid.querySelectorAll('.session-action-btn.delete').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            showConfirmDialog(
                'Delete Session',
                'Are you sure you want to delete this session?',
                () => deleteSession(btn.dataset.id)
            );
        });
    });

    // Card click to view
    DOM.sessionsGrid.querySelectorAll('.session-card').forEach(card => {
        card.addEventListener('click', () => {
            loadSession(card.dataset.id);
        });
    });
}

function loadSession(sessionId) {
    const session = appState.sessions.find(s => s.id === sessionId);

    if (session) {
        appState.currentSession = session;
        appState.generatedContent = session.content || {};

        // Populate form
        DOM.resumeInput.value = session.resume;
        DOM.companyInput.value = session.company;
        DOM.jobRoleInput.value = session.jobRole;
        DOM.contextInput.value = session.context || '';
        DOM.jobUrlInput.value = session.jobUrl || '';
        updateCharCount();

        showResults(session);
    } else {
        showToast('Session not found', 'error');
    }
}

function deleteSession(sessionId) {
    appState.sessions = appState.sessions.filter(s => s.id !== sessionId);
    saveState();
    renderDashboard();
    showToast('Session deleted', 'success');
}

// ============================================================
// SETTINGS
// ============================================================

function handleProviderChange() {
    const provider = DOM.apiProvider.value;
    appState.apiSettings.provider = provider;
    updateModelOptions();
}

function updateModelOptions() {
    const provider = appState.apiSettings.provider;
    const models = DEFAULT_MODELS[provider] || DEFAULT_MODELS.openai;

    DOM.modelSelect.innerHTML = models.map(model =>
        `<option value="${model}">${model}</option>`
    ).join('');
}

function toggleApiKeyVisibility() {
    const isPassword = DOM.apiKey.type === 'password';
    DOM.apiKey.type = isPassword ? 'text' : 'password';

    DOM.toggleApiKey.innerHTML = isPassword
        ? `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
            <line x1="1" y1="1" x2="23" y2="23"></line>
          </svg>`
        : `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
            <circle cx="12" cy="12" r="3"></circle>
          </svg>`;
}

function saveAPISettings() {
    appState.apiSettings = {
        provider: DOM.apiProvider.value,
        apiKey: DOM.apiKey.value,
        model: DOM.modelSelect.value
    };

    saveState();
    updateAPIStatus();
    showToast('Settings saved successfully!', 'success');
}

function updateAPIStatus() {
    const hasKey = !!appState.apiSettings.apiKey;
    DOM.apiStatus.classList.toggle('connected', hasKey);
    DOM.apiStatus.querySelector('span').textContent = hasKey
        ? `${appState.apiSettings.provider.toUpperCase()} Connected`
        : 'API Not Connected';
}

function exportAllData() {
    const data = {
        sessions: appState.sessions,
        exportedAt: new Date().toISOString()
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = `prepkit_data_${formatDateShort(new Date().toISOString())}.json`;
    a.click();

    URL.revokeObjectURL(url);
    showToast('Data exported successfully!', 'success');
}

function clearAllData() {
    appState.sessions = [];
    saveState();
    renderDashboard();
    closeConfirmModal();
    showToast('All data cleared', 'success');
}

// ============================================================
// UI UTILITIES
// ============================================================

function showToast(message, type = 'info') {
    const icons = {
        success: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>',
        error: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>',
        warning: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>',
        info: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>'
    };

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
        <span class="toast-icon">${icons[type]}</span>
        <span>${message}</span>
    `;

    DOM.toastContainer.appendChild(toast);

    setTimeout(() => {
        toast.style.animation = 'slideInRight 0.3s ease reverse';
        setTimeout(() => toast.remove(), 300);
    }, 4000);
}

function showConfirmDialog(title, message, onConfirm) {
    DOM.confirmTitle.textContent = title;
    DOM.confirmMessage.textContent = message;
    DOM.confirmModal.classList.add('active');

    // Set up confirm action
    DOM.confirmAction.onclick = () => {
        onConfirm();
        closeConfirmModal();
    };
}

function closeConfirmModal() {
    DOM.confirmModal.classList.remove('active');
}

// ============================================================
// HELPER FUNCTIONS
// ============================================================

function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

function formatDateShort(dateString) {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
}
