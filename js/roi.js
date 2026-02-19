// ROI & Financial Tools JavaScript

function showTab(tabName) {
    document.querySelectorAll('.page-section').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('.page-tab').forEach(t => t.classList.remove('active'));
    document.getElementById('tab-' + tabName).classList.add('active');
    event.target.classList.add('active');
    if (tabName === 'npv') { calculateNPV(); initNPVChart(); }
    if (tabName === 'tracker') initTrackerCharts();
    if (tabName === 'montecarlo') { runMonteCarlo(); initMCChart(); }
    if (tabName === 'budget') initBudgetCharts();
}

function updateSlider(sliderId, displayId, suffix = '') {
    const val = document.getElementById(sliderId).value;
    document.getElementById(displayId).textContent = val + suffix;
}

// ===================== ROI CALCULATOR =====================
let roiChartInstance = null;

function calculateROI() {
    const revenue = parseFloat(document.getElementById('revenue').value) || 500;
    const employees = parseFloat(document.getElementById('employees').value) || 500;
    const rdSpend = parseFloat(document.getElementById('rdSpend').value) || 100;
    const trials = parseFloat(document.getElementById('trials').value) || 3;
    const implTime = parseFloat(document.getElementById('implTime').value) || 6;

    const toolOps = document.getElementById('tool_ops').checked;
    const toolGrowth = document.getElementById('tool_growth').checked;
    const toolLeadership = document.getElementById('tool_leadership').checked;
    const toolClinical = document.getElementById('tool_clinical').checked;
    const toolRd = document.getElementById('tool_rd').checked;
    const toolIntel = document.getElementById('tool_intel').checked;

    // Value calculations
    const opsValue = toolOps ? revenue * 0.0124 : 0;
    const growthValue = toolGrowth ? revenue * 0.0096 : 0;
    const talentValue = toolLeadership ? employees * 3600 / 1000000 : 0;
    const clinicalValue = toolClinical ? trials * 0.467 : 0;
    const rdValue = toolRd ? rdSpend * 0.006 : 0;
    const intelValue = toolIntel ? revenue * 0.001 : 0;

    const annualValue = opsValue + growthValue + talentValue + clinicalValue + rdValue + intelValue;
    const platformCost = 0.5 + (0.1 * [toolOps,toolGrowth,toolLeadership,toolClinical,toolRd,toolIntel].filter(Boolean).length);
    const implCost = platformCost * (implTime / 12) * 0.3;
    const totalCost = (platformCost * 3) + implCost;
    const netBenefit = (annualValue * 3) - totalCost;
    const roi = ((netBenefit / totalCost) * 100).toFixed(0);
    const payback = (totalCost / annualValue * 12).toFixed(1);

    document.getElementById('totalROI').textContent = roi + '%';
    document.getElementById('netBenefit').textContent = '$' + netBenefit.toFixed(1) + 'M';
    document.getElementById('payback').textContent = payback + ' mo';
    document.getElementById('annualSavings').textContent = '$' + annualValue.toFixed(1) + 'M';
    document.getElementById('opsValue').textContent = '$' + opsValue.toFixed(1) + 'M';
    document.getElementById('growthValue').textContent = '$' + growthValue.toFixed(1) + 'M';
    document.getElementById('talentValue').textContent = '$' + talentValue.toFixed(1) + 'M';
    document.getElementById('clinicalValue').textContent = '$' + clinicalValue.toFixed(1) + 'M';
    document.getElementById('rdValue').textContent = '$' + rdValue.toFixed(1) + 'M';

    updateROIChart(annualValue, platformCost);
}

function updateROIChart(annualValue, cost) {
    const ctx = document.getElementById('roiChart');
    if (!ctx) return;
    if (roiChartInstance) roiChartInstance.destroy();

    const cumValue = [0, annualValue * 0.4, annualValue * 1.1, annualValue * 2.0, annualValue * 3.0];
    const cumCost = [cost * 0.4, cost * 0.7, cost * 1.0, cost * 1.0, cost * 1.0];

    roiChartInstance = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Start', 'Q2', 'Year 1', 'Year 2', 'Year 3'],
            datasets: [
                { label: 'Cumulative Value ($M)', data: cumValue, borderColor: '#28a745', backgroundColor: 'rgba(40,167,69,0.1)', fill: true, tension: 0.4 },
                { label: 'Cumulative Cost ($M)', data: cumCost, borderColor: '#dc3545', borderDash: [5,5], tension: 0.4 }
            ]
        },
        options: { responsive: true, plugins: { legend: { position: 'top' } }, scales: { y: { beginAtZero: true, title: { display: true, text: 'Value ($M)' } } } }
    });
}

// ===================== NPV / IRR =====================
let npvChartInstance = null;

function calculateNPV() {
    const peakRev = parseFloat(document.getElementById('peakRevenue').value) || 800;
    const yearsToPeak = parseInt(document.getElementById('yearsToPeak').value) || 7;
    const rdInv = parseFloat(document.getElementById('rdInvestment').value) || 250;
    const poa = parseFloat(document.getElementById('poa').value) / 100 || 0.65;
    const discount = parseFloat(document.getElementById('discountRate').value) / 100 || 0.10;
    const patentLife = parseInt(document.getElementById('patentLife').value) || 12;
    const cogs = parseFloat(document.getElementById('cogs').value) / 100 || 0.25;

    // Simple NPV calculation
    let npv = -rdInv;
    let cashFlows = [];
    for (let y = 1; y <= patentLife; y++) {
        let rev = y <= yearsToPeak ? peakRev * (y / yearsToPeak) : peakRev * Math.max(0.3, 1 - (y - yearsToPeak) * 0.08);
        let cf = rev * (1 - cogs) * 0.35; // operating margin after tax
        cashFlows.push(cf);
        npv += cf / Math.pow(1 + discount, y);
    }

    const riskAdjNPV = npv * poa;
    const irr = (riskAdjNPV / rdInv * 0.4 + 0.05).toFixed(3);
    const breakeven = Math.ceil(rdInv / (cashFlows[0] || 1)) + 1;

    document.getElementById('npvValue').textContent = '$' + (riskAdjNPV / 1000).toFixed(2) + 'B';
    document.getElementById('irrValue').textContent = (parseFloat(irr) * 100).toFixed(1) + '%';
    document.getElementById('peakNpv').textContent = '$' + (npv / 1000).toFixed(2) + 'B';
    document.getElementById('breakeven').textContent = 'Year ' + Math.min(breakeven, patentLife);
    document.getElementById('peakRevDisplay').textContent = '$' + peakRev + 'M';
    document.getElementById('poaDisplay').textContent = (poa * 100) + '%';
    document.getElementById('rdDisplay').textContent = '$' + rdInv + 'M';
    document.getElementById('patentDisplay').textContent = patentLife + ' years';
    document.getElementById('discountDisplay').textContent = (discount * 100) + '%';

    updateNPVChart(peakRev, yearsToPeak, patentLife, cogs, rdInv);
}

function initNPVChart() { calculateNPV(); }

function updateNPVChart(peakRev, yearsToPeak, patentLife, cogs, rdInv) {
    const ctx = document.getElementById('npvChart');
    if (!ctx) return;
    if (npvChartInstance) npvChartInstance.destroy();

    const years = Array.from({length: patentLife}, (_, i) => 'Year ' + (i+1));
    const revenues = years.map((_, i) => {
        const y = i + 1;
        return y <= yearsToPeak ? peakRev * (y / yearsToPeak) : peakRev * Math.max(0.3, 1 - (y - yearsToPeak) * 0.08);
    });
    const cashFlows = revenues.map(r => r * (1 - cogs) * 0.35);

    npvChartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: years,
            datasets: [
                { label: 'Revenue ($M)', data: revenues, backgroundColor: 'rgba(26,43,74,0.7)', yAxisID: 'y' },
                { label: 'Cash Flow ($M)', data: cashFlows, type: 'line', borderColor: '#d4a574', backgroundColor: 'rgba(212,165,116,0.1)', fill: true, tension: 0.4, yAxisID: 'y' }
            ]
        },
        options: {
            responsive: true,
            plugins: { legend: { position: 'top' } },
            scales: { y: { beginAtZero: true, title: { display: true, text: '$M' } } }
        }
    });
}

function setScenario(type, el) {
    document.querySelectorAll('.scenario-tab').forEach(t => t.classList.remove('active'));
    el.classList.add('active');
    const scenarios = {
        base: { peakRevenue: 800, poa: 65, discountRate: 10, rdInvestment: 250 },
        optimistic: { peakRevenue: 1200, poa: 80, discountRate: 8, rdInvestment: 200 },
        pessimistic: { peakRevenue: 400, poa: 40, discountRate: 15, rdInvestment: 300 }
    };
    const s = scenarios[type];
    Object.keys(s).forEach(key => {
        const el = document.getElementById(key);
        if (el) el.value = s[key];
    });
    document.getElementById('poa').value = s.poa;
    document.getElementById('discountRate').value = s.discountRate;
    updateSlider('poa', 'poaVal', '%');
    updateSlider('discountRate', 'discountRateVal', '%');
    calculateNPV();
}

// ===================== VALUE TRACKER =====================
function initTrackerCharts() {
    if (window.trackerInit) return;
    window.trackerInit = true;

    new Chart(document.getElementById('trackerChart'), {
        type: 'bar',
        data: {
            labels: ['Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb'],
            datasets: [
                { label: 'Operations', data: [0.9, 1.1, 1.2, 1.4, 1.5, 1.6], backgroundColor: '#1a2b4a' },
                { label: 'Growth', data: [0.7, 0.9, 1.0, 1.1, 1.2, 1.3], backgroundColor: '#d4a574' },
                { label: 'Leadership', data: [0.3, 0.35, 0.38, 0.42, 0.45, 0.48], backgroundColor: '#28a745' },
                { label: 'Clinical', data: [0.1, 0.15, 0.22, 0.28, 0.35, 0.40], backgroundColor: '#17a2b8' },
                { label: 'R&D', data: [0.05, 0.08, 0.10, 0.12, 0.15, 0.18], backgroundColor: '#6f42c1' }
            ]
        },
        options: { responsive: true, plugins: { legend: { position: 'top' } }, scales: { x: { stacked: true }, y: { stacked: true, title: { display: true, text: 'Value ($M)' } } } }
    });

    new Chart(document.getElementById('trackerPieChart'), {
        type: 'doughnut',
        data: {
            labels: ['Operations', 'Growth', 'Leadership', 'Clinical', 'R&D', 'Intelligence'],
            datasets: [{ data: [41, 32, 12, 9, 4, 2], backgroundColor: ['#1a2b4a','#d4a574','#28a745','#17a2b8','#6f42c1','#fd7e14'] }]
        },
        options: { responsive: true, plugins: { legend: { position: 'right' } } }
    });
}

// ===================== MONTE CARLO =====================
let mcChartInstance = null;

function runMonteCarlo() {
    const baseRev = parseFloat(document.getElementById('mcBaseRev').value) || 284;
    const growth = parseFloat(document.getElementById('mcGrowth').value) / 100 || 0.18;
    const vol = parseFloat(document.getElementById('mcVolatility').value) / 100 || 0.08;
    const years = parseInt(document.getElementById('mcYears').value) || 5;

    // Simple Monte Carlo approximation
    const p50 = baseRev * Math.pow(1 + growth, years);
    const p90 = baseRev * Math.pow(1 + growth + vol * 1.28, years);
    const p10 = baseRev * Math.pow(1 + growth - vol * 1.28, years);
    const confidence = Math.min(95, Math.max(30, 50 + (growth / vol) * 15));

    document.getElementById('mcP50').textContent = '$' + p50.toFixed(0) + 'M';
    document.getElementById('mcP90').textContent = '$' + p90.toFixed(0) + 'M';
    document.getElementById('mcP10').textContent = '$' + p10.toFixed(0) + 'M';
    document.getElementById('mcConfidence').textContent = confidence.toFixed(0) + '%';

    updateMCChart(baseRev, growth, vol, years);
}

function initMCChart() { runMonteCarlo(); }

function updateMCChart(baseRev, growth, vol, years) {
    const ctx = document.getElementById('mcChart');
    if (!ctx) return;
    if (mcChartInstance) mcChartInstance.destroy();

    const labels = ['Now', ...Array.from({length: years}, (_, i) => 'Year ' + (i+1))];
    const p50 = labels.map((_, i) => baseRev * Math.pow(1 + growth, i));
    const p90 = labels.map((_, i) => baseRev * Math.pow(1 + growth + vol * 1.28, i));
    const p10 = labels.map((_, i) => baseRev * Math.pow(1 + growth - vol * 1.28, i));
    const p75 = labels.map((_, i) => baseRev * Math.pow(1 + growth + vol * 0.67, i));
    const p25 = labels.map((_, i) => baseRev * Math.pow(1 + growth - vol * 0.67, i));

    mcChartInstance = new Chart(ctx, {
        type: 'line',
        data: {
            labels,
            datasets: [
                { label: 'P90 (Upside)', data: p90, borderColor: '#28a745', borderDash: [5,5], fill: false, tension: 0.4 },
                { label: 'P75', data: p75, borderColor: '#17a2b8', borderDash: [3,3], fill: false, tension: 0.4 },
                { label: 'P50 (Base)', data: p50, borderColor: '#d4a574', borderWidth: 3, fill: false, tension: 0.4 },
                { label: 'P25', data: p25, borderColor: '#ffc107', borderDash: [3,3], fill: false, tension: 0.4 },
                { label: 'P10 (Downside)', data: p10, borderColor: '#dc3545', borderDash: [5,5], fill: false, tension: 0.4 }
            ]
        },
        options: { responsive: true, plugins: { legend: { position: 'top' } }, scales: { y: { title: { display: true, text: 'Revenue ($M)' } } } }
    });
}

// ===================== BUDGET PLANNER =====================
let budgetPieInstance = null, budgetOutcomeInstance = null;

function updateBudgetSlider(sliderId, displayId) {
    const val = document.getElementById(sliderId).value;
    document.getElementById(displayId).textContent = val + '%';
}

function updateBudget() {
    const total = parseFloat(document.getElementById('totalBudget').value) || 100;
    const rd = parseInt(document.getElementById('rdPct_slider').value);
    const comm = parseInt(document.getElementById('commPct_slider').value);
    const ops = parseInt(document.getElementById('opsPct_slider').value);
    const ga = parseInt(document.getElementById('gaPct_slider').value);
    const tech = parseInt(document.getElementById('techPct_slider').value);
    const sum = rd + comm + ops + ga + tech;

    document.getElementById('totalBudgetDisplay').textContent = '$' + total + 'M';
    document.getElementById('allocatedDisplay').textContent = '$' + (total * sum / 100).toFixed(1) + 'M (' + sum + '%)';

    updateBudgetPieChart(rd, comm, ops, ga, tech);
}

function initBudgetCharts() {
    updateBudget();
    if (window.budgetOutcomeInit) return;
    window.budgetOutcomeInit = true;

    budgetOutcomeInstance = new Chart(document.getElementById('budgetOutcomeChart'), {
        type: 'bar',
        data: {
            labels: ['R&D Heavy\n(45/20/15/10/10)', 'Balanced\n(35/25/20/12/8)', 'Commercial Heavy\n(25/35/20/12/8)', 'Digital First\n(30/25/20/10/15)'],
            datasets: [
                { label: 'Revenue Growth (%)', data: [22, 18, 28, 20], backgroundColor: '#1a2b4a' },
                { label: 'Pipeline Value ($B)', data: [3.2, 2.4, 1.8, 2.6], backgroundColor: '#d4a574' },
                { label: 'Operational Efficiency (%)', data: [15, 20, 18, 28], backgroundColor: '#28a745' }
            ]
        },
        options: { responsive: true, plugins: { legend: { position: 'top' } }, scales: { y: { beginAtZero: true } } }
    });
}

function updateBudgetPieChart(rd, comm, ops, ga, tech) {
    const ctx = document.getElementById('budgetPieChart');
    if (!ctx) return;
    if (budgetPieInstance) budgetPieInstance.destroy();

    budgetPieInstance = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['R&D', 'Commercial', 'Operations', 'G&A', 'Digital/Tech'],
            datasets: [{ data: [rd, comm, ops, ga, tech], backgroundColor: ['#1a2b4a','#d4a574','#28a745','#6c757d','#17a2b8'] }]
        },
        options: { responsive: true, plugins: { legend: { position: 'right' } } }
    });
}

// Initialize on load
window.addEventListener('load', () => {
    calculateROI();
    updateROIChart(14.8, 0.5);
});