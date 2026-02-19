// Succession & Talent JavaScript

function showTab(tabName) {
    document.querySelectorAll('.page-section').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('.page-tab').forEach(t => t.classList.remove('active'));
    document.getElementById('tab-' + tabName).classList.add('active');
    event.target.classList.add('active');
    if (tabName === 'ninebox') initNineBoxCharts();
    if (tabName === 'culture') initCultureCharts();
    if (tabName === 'analytics') initAnalyticsCharts();
}

// Init 9-box charts on load
window.addEventListener('load', () => { initNineBoxCharts(); });

function initNineBoxCharts() {
    if (window.nineboxInit) return;
    window.nineboxInit = true;

    new Chart(document.getElementById('nineboxChart'), {
        type: 'doughnut',
        data: {
            labels: ['Future Leaders', 'Rising Stars', 'High Performers', 'Core Players', 'Rough Diamonds', 'Steady Contributors', 'Specialists', 'Needs Support', 'At Risk'],
            datasets: [{
                data: [4, 3, 3, 4, 2, 3, 2, 2, 1],
                backgroundColor: ['#0066cc','#28a745','#20c997','#6f42c1','#ff6600','#ffc107','#17a2b8','#fd7e14','#dc3545']
            }]
        },
        options: { responsive: true, plugins: { legend: { position: 'right', labels: { font: { size: 11 } } } } }
    });

    new Chart(document.getElementById('hipoRetentionChart'), {
        type: 'line',
        data: {
            labels: ['Q1 25', 'Q2 25', 'Q3 25', 'Q4 25', 'Q1 26'],
            datasets: [
                { label: 'HiPo Retention %', data: [88, 90, 91, 93, 95], borderColor: '#28a745', backgroundColor: 'rgba(40,167,69,0.1)', fill: true, tension: 0.4 },
                { label: 'Overall Retention %', data: [86, 87, 88, 90, 92], borderColor: '#d4a574', borderDash: [5,5], tension: 0.4 }
            ]
        },
        options: { responsive: true, plugins: { legend: { position: 'top' } }, scales: { y: { min: 80, max: 100, title: { display: true, text: 'Retention %' } } } }
    });
}

function initCultureCharts() {
    if (window.cultureInit) return;
    window.cultureInit = true;

    new Chart(document.getElementById('engagementChart'), {
        type: 'line',
        data: {
            labels: ['Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb'],
            datasets: [
                { label: 'Engagement Score', data: [68, 69, 70, 69, 71, 72, 71, 73, 73, 74, 74, 74], borderColor: '#28a745', backgroundColor: 'rgba(40,167,69,0.1)', fill: true, tension: 0.4 },
                { label: 'Industry Benchmark', data: [65, 65, 66, 66, 65, 66, 67, 67, 67, 68, 68, 68], borderColor: '#d4a574', borderDash: [5,5], tension: 0.4 }
            ]
        },
        options: { responsive: true, plugins: { legend: { position: 'top' } }, scales: { y: { min: 55, max: 85, title: { display: true, text: 'Score (%)' } } } }
    });

    new Chart(document.getElementById('deptEngagementChart'), {
        type: 'bar',
        data: {
            labels: ['R&D', 'Clinical', 'Commercial', 'Operations', 'Regulatory', 'Finance', 'HR'],
            datasets: [
                { label: 'Engagement %', data: [78, 76, 72, 74, 71, 75, 80], backgroundColor: ['#28a745','#28a745','#ffc107','#28a745','#ffc107','#28a745','#28a745'] },
                { label: 'Target (70%)', data: [70,70,70,70,70,70,70], type: 'line', borderColor: '#dc3545', borderDash: [5,5], pointRadius: 0 }
            ]
        },
        options: { responsive: true, plugins: { legend: { position: 'top' } }, scales: { y: { min: 50, max: 95, title: { display: true, text: 'Engagement %' } } } }
    });
}

function initAnalyticsCharts() {
    if (window.analyticsInit) return;
    window.analyticsInit = true;

    new Chart(document.getElementById('turnoverChart'), {
        type: 'bar',
        data: {
            labels: ['R&D', 'Clinical', 'Commercial', 'Operations', 'Regulatory', 'Finance', 'HR'],
            datasets: [
                { label: 'Voluntary Turnover %', data: [9, 7, 11, 6, 8, 5, 7], backgroundColor: '#d4a574' },
                { label: 'Industry Avg %', data: [14, 12, 16, 11, 13, 10, 12], backgroundColor: 'rgba(26,43,74,0.3)' }
            ]
        },
        options: { responsive: true, plugins: { legend: { position: 'top' } }, scales: { y: { beginAtZero: true, title: { display: true, text: 'Turnover %' } } } }
    });

    new Chart(document.getElementById('hiringChart'), {
        type: 'line',
        data: {
            labels: ['Q1 25', 'Q2 25', 'Q3 25', 'Q4 25', 'Q1 26'],
            datasets: [
                { label: 'New Hires', data: [18, 22, 19, 25, 21], borderColor: '#28a745', backgroundColor: 'rgba(40,167,69,0.1)', fill: true, tension: 0.4 },
                { label: 'Attrition', data: [12, 10, 11, 9, 8], borderColor: '#dc3545', backgroundColor: 'rgba(220,53,69,0.1)', fill: true, tension: 0.4 }
            ]
        },
        options: { responsive: true, plugins: { legend: { position: 'top' } }, scales: { y: { beginAtZero: true, title: { display: true, text: 'Headcount' } } } }
    });

    new Chart(document.getElementById('trainingChart'), {
        type: 'bar',
        data: {
            labels: ['Operations Excellence', 'Growth & Commercial', 'Leadership', 'Regulatory', 'Digital & AI', 'GMP/Quality'],
            datasets: [
                { label: 'Completion Rate %', data: [88, 82, 91, 95, 74, 98], backgroundColor: ['#1a2b4a','#d4a574','#28a745','#17a2b8','#6f42c1','#fd7e14'] }
            ]
        },
        options: { responsive: true, plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true, max: 100, title: { display: true, text: 'Completion %' } } } }
    });

    new Chart(document.getElementById('diversityChart'), {
        type: 'radar',
        data: {
            labels: ['Gender Diversity', 'Ethnic Diversity', 'Age Diversity', 'Geographic Diversity', 'Educational Diversity', 'Functional Diversity'],
            datasets: [
                { label: 'Your Company', data: [72, 65, 78, 70, 85, 80], backgroundColor: 'rgba(212,165,116,0.2)', borderColor: '#d4a574', borderWidth: 2, pointBackgroundColor: '#d4a574' },
                { label: 'Industry Avg', data: [60, 55, 65, 58, 72, 68], backgroundColor: 'rgba(26,43,74,0.1)', borderColor: '#1a2b4a', borderDash: [5,5], borderWidth: 2 }
            ]
        },
        options: { responsive: true, scales: { r: { beginAtZero: true, max: 100 } }, plugins: { legend: { position: 'bottom' } } }
    });
}