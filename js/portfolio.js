// Portfolio Manager JavaScript

function showTab(tabName) {
    document.querySelectorAll('.page-section').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('.page-tab').forEach(t => t.classList.remove('active'));
    document.getElementById('tab-' + tabName).classList.add('active');
    event.target.classList.add('active');
    if (tabName === 'gantt') renderGantt();
    if (tabName === 'risk') initRiskCharts();
}

// ===================== GANTT CHART =====================
const ganttProjects = [
    { name: 'NDA Submission Prep', start: 0, duration: 3, color: '#17a2b8', category: 'Regulatory' },
    { name: 'Phase 3 Trial - Oncology', start: 1, duration: 8, color: '#1a2b4a', category: 'R&D' },
    { name: 'Commercial Launch Readiness', start: 1, duration: 4, color: '#d4a574', category: 'Commercial' },
    { name: 'Manufacturing Scale-Up', start: 2, duration: 6, color: '#28a745', category: 'Operations' },
    { name: 'ERP System Upgrade', start: 1, duration: 5, color: '#28a745', category: 'Operations' },
    { name: 'Leadership Dev Program', start: 0, duration: 6, color: '#6f42c1', category: 'People' },
    { name: 'EU Market Expansion', start: 5, duration: 7, color: '#d4a574', category: 'Commercial' },
    { name: 'AI-Powered QC System', start: 3, duration: 5, color: '#28a745', category: 'Operations' },
    { name: 'Phase 2b - Immunology', start: 0, duration: 4, color: '#1a2b4a', category: 'R&D' },
    { name: 'Digital Biomarker Study', start: 6, duration: 6, color: '#1a2b4a', category: 'R&D' },
    { name: 'Supply Chain Resilience', start: 0, duration: 9, color: '#28a745', category: 'Operations' },
    { name: 'MAA Review (EU)', start: 0, duration: 10, color: '#17a2b8', category: 'Regulatory' },
];

function renderGantt() {
    const container = document.getElementById('ganttRows');
    if (!container || container.innerHTML !== '') return;

    container.innerHTML = ganttProjects.map(p => {
        const cells = Array.from({ length: 12 }, (_, i) => {
            const inRange = i >= p.start && i < p.start + p.duration;
            const isFirst = i === p.start;
            const isLast = i === p.start + p.duration - 1;
            if (inRange) {
                const borderRadius = isFirst && isLast ? '6px' : isFirst ? '6px 0 0 6px' : isLast ? '0 6px 6px 0' : '0';
                const label = isFirst ? `<div class="gantt-bar" style="background:${p.color}; left:0; right:0; border-radius:${borderRadius};">${p.name.length > 15 ? p.name.substring(0,14)+'…' : p.name}</div>` : `<div style="position:absolute;top:4px;left:0;right:0;height:20px;background:${p.color};border-radius:${borderRadius};opacity:0.85;"></div>`;
                return `<div class="gantt-cell">${label}</div>`;
            }
            return `<div class="gantt-cell"></div>`;
        }).join('');

        return `
            <div class="gantt-row">
                <div class="gantt-label" title="${p.name}">${p.name}</div>
                ${cells}
            </div>
        `;
    }).join('');
}

// ===================== RISK CHARTS =====================
let riskChartsInit = false;
function initRiskCharts() {
    if (riskChartsInit) return;
    riskChartsInit = true;

    // Risk bubble chart (heat map simulation)
    new Chart(document.getElementById('riskChart'), {
        type: 'bubble',
        data: {
            datasets: [
                {
                    label: 'Critical',
                    data: [
                        { x: 25, y: 95, r: 18, label: 'FDA CRL' },
                        { x: 40, y: 85, r: 15, label: 'Enrollment Delay' }
                    ],
                    backgroundColor: 'rgba(220,53,69,0.7)'
                },
                {
                    label: 'High',
                    data: [
                        { x: 35, y: 75, r: 14, label: 'API Supply' },
                        { x: 20, y: 80, r: 12, label: 'Key Talent' },
                        { x: 15, y: 90, r: 13, label: 'Cybersecurity' }
                    ],
                    backgroundColor: 'rgba(255,102,0,0.7)'
                },
                {
                    label: 'Medium',
                    data: [
                        { x: 30, y: 55, r: 11, label: 'Competitor' },
                        { x: 60, y: 50, r: 10, label: 'IRA Pricing' },
                        { x: 20, y: 60, r: 9, label: 'GMP Inspection' }
                    ],
                    backgroundColor: 'rgba(255,193,7,0.7)'
                },
                {
                    label: 'Low',
                    data: [
                        { x: 50, y: 25, r: 8, label: 'FX Risk' }
                    ],
                    backgroundColor: 'rgba(40,167,69,0.7)'
                }
            ]
        },
        options: {
            responsive: true,
            scales: {
                x: { title: { display: true, text: 'Probability (%)' }, min: 0, max: 80 },
                y: { title: { display: true, text: 'Impact Score' }, min: 0, max: 100 }
            },
            plugins: { legend: { position: 'bottom' } }
        }
    });

    new Chart(document.getElementById('riskCategoryChart'), {
        type: 'doughnut',
        data: {
            labels: ['Regulatory', 'Clinical', 'Supply Chain', 'People', 'Commercial', 'Financial', 'Quality', 'IT/Security'],
            datasets: [{
                data: [2, 1, 1, 1, 1, 2, 1, 1],
                backgroundColor: ['#17a2b8','#1a2b4a','#28a745','#6f42c1','#d4a574','#ffc107','#fd7e14','#dc3545']
            }]
        },
        options: { responsive: true, plugins: { legend: { position: 'right' } } }
    });
}

// ===================== ADD PROJECT =====================
function addProject() {
    const name = prompt('Enter project name:');
    if (!name) return;
    const col = document.querySelector('.kanban-col:first-child');
    const card = document.createElement('div');
    card.className = 'kanban-card';
    card.style.borderLeftColor = '#6c757d';
    card.innerHTML = `
        <h4>${name}</h4>
        <p>New project — click to add details</p>
        <div class="card-meta">
            <span class="card-priority priority-medium">Medium</span>
            <span class="card-due">TBD</span>
        </div>
        <div class="progress-mini"><div class="progress-mini-fill" style="width:0%"></div></div>
    `;
    col.appendChild(card);

    // Update count
    const countEl = col.querySelector('.kanban-count');
    countEl.textContent = parseInt(countEl.textContent) + 1;
}