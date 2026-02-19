// Assessment & KPI JavaScript

function showTab(tabName) {
    document.querySelectorAll('.page-section').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('.page-tab').forEach(t => t.classList.remove('active'));
    document.getElementById('tab-' + tabName).classList.add('active');
    event.target.classList.add('active');
    if (tabName === 'benchmarking') initBenchmarkCharts();
    if (tabName === 'kpi') initKPICharts();
}

function setRater(type, el) {
    document.querySelectorAll('.rater-tab').forEach(t => t.classList.remove('active'));
    el.classList.add('active');
    if (type === 'results') {
        calculateAssessment();
    }
}

// ===================== STAR RATINGS =====================
function rate(star, value) {
    const group = star.closest('.rating-stars');
    const stars = group.querySelectorAll('.star');
    stars.forEach((s, i) => {
        s.classList.toggle('active', i < value);
    });
    group.dataset.value = value;
}

function getGroupValue(group) {
    return parseInt(group.dataset.value || 0);
}

// ===================== ASSESSMENT =====================
const competencyNames = {
    sci: 'Scientific Leadership',
    str: 'Strategic Vision',
    col: 'Collaboration',
    inn: 'Innovation Culture',
    reg: 'Regulatory Intelligence',
    tal: 'Talent Development'
};

function calculateAssessment() {
    const scores = {};
    const allGroups = document.querySelectorAll('.rating-stars');
    let totalScore = 0;
    let count = 0;

    allGroups.forEach(group => {
        const comp = group.dataset.competency;
        if (!comp) return;
        const prefix = comp.replace(/\d+$/, '');
        const val = getGroupValue(group) || Math.floor(Math.random() * 2) + 3;
        if (!scores[prefix]) scores[prefix] = [];
        scores[prefix].push(val);
        totalScore += val;
        count++;
    });

    const avgScores = {};
    Object.keys(scores).forEach(key => {
        avgScores[key] = (scores[key].reduce((a, b) => a + b, 0) / scores[key].length).toFixed(1);
    });

    const overall = count > 0 ? (totalScore / count).toFixed(1) : 3.8;

    // Show results panel
    const panel = document.getElementById('assessmentResults');
    panel.classList.add('show');

    const grid = document.getElementById('resultsGrid');
    grid.innerHTML = Object.keys(avgScores).map(key => `
        <div class="result-item">
            <div class="result-score">${avgScores[key]}/5</div>
            <div class="result-label">${competencyNames[key] || key}</div>
        </div>
    `).join('') + `
        <div class="result-item" style="background:rgba(212,165,116,0.3);">
            <div class="result-score">${overall}/5</div>
            <div class="result-label">Overall Score</div>
        </div>
    `;

    // Draw radar chart
    drawRadarChart(avgScores);

    // Show development plan
    showDevPlan(avgScores);

    panel.scrollIntoView({ behavior: 'smooth' });
}

function drawRadarChart(scores) {
    const ctx = document.getElementById('radarChart');
    if (!ctx) return;

    if (window.radarChartInstance) window.radarChartInstance.destroy();

    const labels = Object.keys(scores).map(k => competencyNames[k] || k);
    const data = Object.values(scores).map(Number);
    const industryAvg = [3.8, 3.6, 3.9, 3.5, 3.7, 3.8];
    const topPerformer = [4.7, 4.5, 4.8, 4.6, 4.4, 4.9];

    window.radarChartInstance = new Chart(ctx, {
        type: 'radar',
        data: {
            labels,
            datasets: [
                { label: 'You', data, backgroundColor: 'rgba(212,165,116,0.2)', borderColor: '#d4a574', pointBackgroundColor: '#d4a574', borderWidth: 2 },
                { label: 'Industry Avg', data: industryAvg, backgroundColor: 'rgba(26,43,74,0.1)', borderColor: '#1a2b4a', borderDash: [5,5], borderWidth: 2, pointBackgroundColor: '#1a2b4a' },
                { label: 'Top Performer', data: topPerformer, backgroundColor: 'rgba(40,167,69,0.1)', borderColor: '#28a745', borderDash: [3,3], borderWidth: 1, pointBackgroundColor: '#28a745' }
            ]
        },
        options: {
            responsive: true,
            scales: { r: { beginAtZero: true, max: 5, ticks: { stepSize: 1 } } },
            plugins: { legend: { position: 'bottom' } }
        }
    });
}

function showDevPlan(scores) {
    const plan = document.getElementById('devPlan');
    const items = document.getElementById('devPlanItems');
    plan.style.display = 'block';

    const devActions = {
        sci: { action: 'Attend 2 scientific conferences per year; subscribe to key journals; join external scientific advisory boards', priority: 'med' },
        str: { action: 'Complete strategic leadership program; engage external strategy consultants; conduct annual scenario planning workshops', priority: 'high' },
        col: { action: 'Implement cross-functional project teams; establish external partnership framework; quarterly stakeholder mapping', priority: 'med' },
        inn: { action: 'Launch innovation lab or incubator; implement psychological safety training; create fail-fast experimentation framework', priority: 'high' },
        reg: { action: 'Engage FDA/EMA in pre-submission meetings; hire regulatory affairs VP; implement regulatory intelligence platform', priority: 'med' },
        tal: { action: 'Launch mentorship program; implement succession planning; conduct annual talent reviews with development plans', priority: 'low' }
    };

    const sorted = Object.keys(scores).sort((a, b) => scores[a] - scores[b]);

    items.innerHTML = sorted.map(key => {
        const score = scores[key];
        const priority = score < 3 ? 'high' : score < 4 ? 'med' : 'low';
        const priorityLabel = priority === 'high' ? 'HIGH' : priority === 'med' ? 'MED' : 'LOW';
        return `
            <div class="dev-item">
                <div class="dev-priority priority-${priority}">${priorityLabel}</div>
                <div>
                    <strong style="color:#1a2b4a;">${competencyNames[key]}</strong> — Score: ${score}/5<br>
                    <span style="font-size:0.85rem; color:#6c757d;">${devActions[key]?.action || 'Focus on continuous improvement in this area.'}</span>
                </div>
            </div>
        `;
    }).join('');
}

function resetAssessment() {
    document.querySelectorAll('.star').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('.rating-stars').forEach(g => delete g.dataset.value);
    document.getElementById('assessmentResults').classList.remove('show');
    document.getElementById('devPlan').style.display = 'none';
    if (window.radarChartInstance) window.radarChartInstance.destroy();
}

// ===================== BENCHMARK CHARTS =====================
let benchmarkChartsInit = false;
function initBenchmarkCharts() {
    if (benchmarkChartsInit) return;
    benchmarkChartsInit = true;

    new Chart(document.getElementById('benchmarkRadar'), {
        type: 'radar',
        data: {
            labels: ['Operations', 'R&D', 'Commercial', 'People & Culture', 'Regulatory', 'Innovation'],
            datasets: [
                { label: 'Your Company', data: [72, 78, 65, 70, 68, 74], backgroundColor: 'rgba(212,165,116,0.2)', borderColor: '#d4a574', borderWidth: 2, pointBackgroundColor: '#d4a574' },
                { label: 'Industry Median', data: [50, 50, 50, 50, 50, 50], backgroundColor: 'rgba(26,43,74,0.1)', borderColor: '#1a2b4a', borderDash: [5,5], borderWidth: 2 },
                { label: 'Top Quartile', data: [85, 88, 82, 84, 80, 87], backgroundColor: 'rgba(40,167,69,0.1)', borderColor: '#28a745', borderDash: [3,3], borderWidth: 1 }
            ]
        },
        options: { responsive: true, scales: { r: { beginAtZero: true, max: 100 } }, plugins: { legend: { position: 'bottom' } } }
    });

    new Chart(document.getElementById('trendChart'), {
        type: 'line',
        data: {
            labels: ['Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb'],
            datasets: [
                { label: 'Overall Score', data: [58, 61, 63, 65, 64, 67, 69, 70, 71, 72, 73, 74], borderColor: '#d4a574', backgroundColor: 'rgba(212,165,116,0.1)', fill: true, tension: 0.4 },
                { label: 'Industry Median', data: [50, 50, 51, 51, 50, 52, 52, 51, 52, 53, 52, 53], borderColor: '#1a2b4a', borderDash: [5,5], tension: 0.4 }
            ]
        },
        options: { responsive: true, plugins: { legend: { position: 'top' } }, scales: { y: { beginAtZero: false, min: 40, max: 90 } } }
    });
}

function updateBenchmarks() {
    // Simulate benchmark update on profile change
    document.querySelectorAll('.benchmark-bar-you').forEach(bar => {
        const current = parseInt(bar.style.width);
        const variation = (Math.random() - 0.5) * 20;
        const newWidth = Math.max(20, Math.min(95, current + variation));
        bar.style.width = newWidth + '%';
    });
}

// ===================== KPI CHARTS =====================
let kpiChartsInit = false;
function initKPICharts() {
    if (kpiChartsInit) return;
    kpiChartsInit = true;

    new Chart(document.getElementById('kpiTrendChart'), {
        type: 'line',
        data: {
            labels: ['Q1 2025', 'Q2 2025', 'Q3 2025', 'Q4 2025', 'Q1 2026'],
            datasets: [
                { label: 'Revenue ($M)', data: [58, 65, 72, 89, 284], borderColor: '#28a745', backgroundColor: 'rgba(40,167,69,0.1)', fill: true, tension: 0.4, yAxisID: 'y' },
                { label: 'R&D Spend ($M)', data: [10, 11, 12, 15, 48], borderColor: '#d4a574', borderDash: [5,5], tension: 0.4, yAxisID: 'y1' }
            ]
        },
        options: {
            responsive: true,
            plugins: { legend: { position: 'top' } },
            scales: {
                y: { type: 'linear', position: 'left', title: { display: true, text: 'Revenue ($M)' } },
                y1: { type: 'linear', position: 'right', title: { display: true, text: 'R&D Spend ($M)' }, grid: { drawOnChartArea: false } }
            }
        }
    });

    new Chart(document.getElementById('kpiAchievementChart'), {
        type: 'bar',
        data: {
            labels: ['Operations', 'R&D', 'Commercial', 'People', 'Quality', 'Finance'],
            datasets: [
                { label: 'KPIs Met', data: [4, 3, 3, 4, 2, 5], backgroundColor: '#28a745' },
                { label: 'KPIs At Risk', data: [1, 1, 1, 0, 2, 0], backgroundColor: '#ffc107' },
                { label: 'KPIs Missed', data: [0, 0, 1, 0, 1, 0], backgroundColor: '#dc3545' }
            ]
        },
        options: {
            responsive: true,
            plugins: { legend: { position: 'top' } },
            scales: { x: { stacked: true }, y: { stacked: true, title: { display: true, text: 'Number of KPIs' } } }
        }
    });
}