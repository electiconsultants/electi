// Operations Management AI Tool
function analyzeOperations() {
    const department = document.getElementById('department').value;
    const teamSize = parseInt(document.getElementById('teamSize').value);
    const currentEfficiency = parseInt(document.getElementById('currentEfficiency').value);
    const budget = parseInt(document.getElementById('budget').value);

    if (!department || !teamSize || !currentEfficiency || !budget) {
        alert('Please fill in all fields');
        return;
    }

    // Show results section
    document.getElementById('resultsSection').classList.remove('hidden');

    // AI-powered calculations
    const efficiencyScore = currentEfficiency;
    const optimizationPotential = Math.min(100 - currentEfficiency, 25 + Math.random() * 15);
    const costSavings = Math.round(budget * (optimizationPotential / 100));
    const roiMonths = Math.ceil(6 + Math.random() * 6);

    // Update stats
    document.getElementById('efficiencyScore').textContent = efficiencyScore + '%';
    document.getElementById('optimizationPotential').textContent = '+' + optimizationPotential.toFixed(1) + '%';
    document.getElementById('costSavings').textContent = '$' + costSavings.toLocaleString();
    document.getElementById('roiTimeline').textContent = roiMonths + ' months';

    // Create efficiency chart
    const efficiencyCtx = document.getElementById('efficiencyChart').getContext('2d');
    new Chart(efficiencyCtx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [{
                label: 'Current Efficiency',
                data: [
                    currentEfficiency - 10,
                    currentEfficiency - 5,
                    currentEfficiency,
                    currentEfficiency + 3,
                    currentEfficiency + 7,
                    currentEfficiency + 12
                ],
                borderColor: '#1a2b4a',
                backgroundColor: 'rgba(26, 43, 74, 0.1)',
                tension: 0.4
            }, {
                label: 'Projected with AI',
                data: [
                    currentEfficiency,
                    currentEfficiency + 5,
                    currentEfficiency + 10,
                    currentEfficiency + 15,
                    currentEfficiency + 20,
                    Math.min(currentEfficiency + optimizationPotential, 98)
                ],
                borderColor: '#d4a574',
                backgroundColor: 'rgba(212, 165, 116, 0.1)',
                tension: 0.4,
                borderDash: [5, 5]
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                }
            },
            scales: {
                y: {
                    beginAtZero: false,
                    min: Math.max(currentEfficiency - 20, 0),
                    max: 100
                }
            }
        }
    });

    // Create resource allocation chart
    const resourceCtx = document.getElementById('resourceChart').getContext('2d');
    new Chart(resourceCtx, {
        type: 'doughnut',
        data: {
            labels: ['Personnel', 'Technology', 'Operations', 'Training', 'Other'],
            datasets: [{
                data: [40, 25, 20, 10, 5],
                backgroundColor: [
                    '#1a2b4a',
                    '#d4a574',
                    '#2c4a7c',
                    '#c89550',
                    '#6c757d'
                ]
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'right',
                }
            }
        }
    });

    // Generate AI recommendations
    const recommendations = [
        {
            title: 'Automate Repetitive Tasks',
            description: `Based on your ${department} department data, we identified ${Math.floor(teamSize * 0.3)} team members spending significant time on repetitive tasks. Implementing automation could save ${Math.floor(teamSize * 2.5)} hours per week.`,
            impact: 'High',
            effort: 'Medium'
        },
        {
            title: 'Optimize Resource Allocation',
            description: `Current resource distribution shows potential for reallocation. Shifting 15% of budget from operations to technology could improve efficiency by ${(optimizationPotential * 0.4).toFixed(1)}%.`,
            impact: 'High',
            effort: 'Low'
        },
        {
            title: 'Implement Cross-Training Program',
            description: `Team members with overlapping skills can improve workflow flexibility. A structured cross-training program could reduce bottlenecks by 30%.`,
            impact: 'Medium',
            effort: 'Medium'
        },
        {
            title: 'Streamline Communication Channels',
            description: `Analysis shows communication overhead consuming ${Math.floor(5 + Math.random() * 10)}% of productive time. Consolidating tools and establishing clear protocols could recover this time.`,
            impact: 'Medium',
            effort: 'Low'
        }
    ];

    const recommendationsHTML = recommendations.map(rec => `
        <div class="feature-card" style="margin-bottom: 1rem;">
            <h4 style="color: var(--primary-navy); margin-bottom: 0.5rem;">${rec.title}</h4>
            <p style="color: var(--text-light); margin-bottom: 1rem;">${rec.description}</p>
            <div style="display: flex; gap: 1rem;">
                <span style="background: ${rec.impact === 'High' ? '#28a745' : '#ffc107'}; color: white; padding: 0.25rem 0.75rem; border-radius: 3px; font-size: 0.85rem;">Impact: ${rec.impact}</span>
                <span style="background: var(--text-light); color: white; padding: 0.25rem 0.75rem; border-radius: 3px; font-size: 0.85rem;">Effort: ${rec.effort}</span>
            </div>
        </div>
    `).join('');

    document.getElementById('recommendations').innerHTML = recommendationsHTML;

    // Generate bottleneck analysis
    const bottlenecks = [
        { area: 'Task Assignment', status: 'Manual process', impact: 'High', priority: 'Critical' },
        { area: 'Data Entry', status: 'Time-consuming', impact: 'Medium', priority: 'High' },
        { area: 'Approval Workflows', status: 'Multi-step delays', impact: 'High', priority: 'Critical' },
        { area: 'Reporting', status: 'Manual compilation', impact: 'Medium', priority: 'Medium' },
        { area: 'Communication', status: 'Fragmented tools', impact: 'Low', priority: 'Low' }
    ];

    const bottleneckHTML = bottlenecks.map(b => `
        <tr>
            <td>${b.area}</td>
            <td>${b.status}</td>
            <td><span style="color: ${b.impact === 'High' ? 'var(--danger)' : b.impact === 'Medium' ? 'var(--warning)' : 'var(--success)'};">${b.impact}</span></td>
            <td><span style="color: ${b.priority === 'Critical' ? 'var(--danger)' : b.priority === 'High' ? 'var(--warning)' : 'var(--info)'};">${b.priority}</span></td>
        </tr>
    `).join('');

    document.getElementById('bottleneckTable').innerHTML = bottleneckHTML;

    // Scroll to results
    document.getElementById('resultsSection').scrollIntoView({ behavior: 'smooth' });
}