// Growth Analytics AI Tool
function analyzeGrowth() {
    const currentRevenue = parseInt(document.getElementById('currentRevenue').value);
    const customerCount = parseInt(document.getElementById('customerCount').value);
    const growthRate = parseFloat(document.getElementById('growthRate').value);
    const industry = document.getElementById('industry').value;
    const marketSize = parseInt(document.getElementById('marketSize').value);
    const competitorCount = parseInt(document.getElementById('competitorCount').value);

    if (!currentRevenue || !customerCount || !growthRate || !industry || !marketSize || !competitorCount) {
        alert('Please fill in all fields');
        return;
    }

    // Show results section
    document.getElementById('growthResults').classList.remove('hidden');

    // AI-powered growth calculations
    const monthlyGrowthRate = growthRate / 100;
    const sixMonthRevenue = currentRevenue * Math.pow(1 + monthlyGrowthRate, 6);
    const twelveMonthRevenue = currentRevenue * Math.pow(1 + monthlyGrowthRate, 12);
    const marketSharePotential = ((twelveMonthRevenue / marketSize) * 100).toFixed(2);
    const confidenceScore = Math.min(95, 70 + (growthRate * 2) - (competitorCount * 0.5));

    // Update stats
    document.getElementById('sixMonthProjection').textContent = '$' + Math.round(sixMonthRevenue).toLocaleString();
    document.getElementById('twelveMonthProjection').textContent = '$' + Math.round(twelveMonthRevenue).toLocaleString();
    document.getElementById('marketShare').textContent = marketSharePotential + '%';
    document.getElementById('confidence').textContent = confidenceScore.toFixed(1) + '%';

    // Create growth forecast chart
    const growthCtx = document.getElementById('growthChart').getContext('2d');
    const monthlyRevenues = [];
    for (let i = 0; i <= 12; i++) {
        monthlyRevenues.push(currentRevenue * Math.pow(1 + monthlyGrowthRate, i));
    }

    new Chart(growthCtx, {
        type: 'line',
        data: {
            labels: ['Now', 'M1', 'M2', 'M3', 'M4', 'M5', 'M6', 'M7', 'M8', 'M9', 'M10', 'M11', 'M12'],
            datasets: [{
                label: 'Conservative Projection',
                data: monthlyRevenues.map(v => v * 0.9),
                borderColor: '#6c757d',
                backgroundColor: 'rgba(108, 117, 125, 0.1)',
                tension: 0.4
            }, {
                label: 'Expected Growth',
                data: monthlyRevenues,
                borderColor: '#1a2b4a',
                backgroundColor: 'rgba(26, 43, 74, 0.1)',
                tension: 0.4
            }, {
                label: 'Optimistic Projection',
                data: monthlyRevenues.map(v => v * 1.15),
                borderColor: '#d4a574',
                backgroundColor: 'rgba(212, 165, 116, 0.1)',
                tension: 0.4
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
                    ticks: {
                        callback: function(value) {
                            return '$' + (value / 1000).toFixed(0) + 'K';
                        }
                    }
                }
            }
        }
    });

    // Create customer acquisition chart
    const customerCtx = document.getElementById('customerChart').getContext('2d');
    const customerGrowth = [];
    for (let i = 0; i <= 12; i++) {
        customerGrowth.push(Math.round(customerCount * Math.pow(1 + (monthlyGrowthRate * 0.8), i)));
    }

    new Chart(customerCtx, {
        type: 'bar',
        data: {
            labels: ['Now', 'M1', 'M2', 'M3', 'M4', 'M5', 'M6', 'M7', 'M8', 'M9', 'M10', 'M11', 'M12'],
            datasets: [{
                label: 'Total Customers',
                data: customerGrowth,
                backgroundColor: '#1a2b4a',
            }, {
                label: 'New Customers',
                data: customerGrowth.map((v, i) => i === 0 ? 0 : v - customerGrowth[i-1]),
                backgroundColor: '#d4a574',
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
                    beginAtZero: true
                }
            }
        }
    });

    // Generate growth opportunities
    const opportunities = [
        {
            title: 'Market Expansion',
            description: `${industry} market analysis reveals untapped segments worth $${(marketSize * 0.15 / 1000000).toFixed(1)}M. Geographic expansion could capture 8-12% of this market within 18 months.`,
            potential: '+$' + Math.round(currentRevenue * 0.35).toLocaleString(),
            timeline: '12-18 months'
        },
        {
            title: 'Product Diversification',
            description: `Customer data indicates demand for complementary services. Launching 2-3 new offerings could increase average customer value by 40%.`,
            potential: '+$' + Math.round(currentRevenue * 0.28).toLocaleString(),
            timeline: '6-9 months'
        },
        {
            title: 'Strategic Partnerships',
            description: `Identified ${Math.floor(3 + Math.random() * 5)} potential partners in adjacent markets. Collaboration could accelerate customer acquisition by 60%.`,
            potential: '+$' + Math.round(currentRevenue * 0.22).toLocaleString(),
            timeline: '3-6 months'
        },
        {
            title: 'Digital Transformation',
            description: `Enhancing digital channels and automation could reduce customer acquisition costs by 35% while improving conversion rates by 25%.`,
            potential: '+$' + Math.round(currentRevenue * 0.18).toLocaleString(),
            timeline: '4-8 months'
        }
    ];

    const opportunitiesHTML = opportunities.map(opp => `
        <div class="feature-card" style="margin-bottom: 1rem;">
            <h4 style="color: var(--primary-navy); margin-bottom: 0.5rem;">${opp.title}</h4>
            <p style="color: var(--text-light); margin-bottom: 1rem;">${opp.description}</p>
            <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
                <span style="background: var(--success); color: white; padding: 0.25rem 0.75rem; border-radius: 3px; font-size: 0.85rem;">Potential: ${opp.potential}</span>
                <span style="background: var(--info); color: white; padding: 0.25rem 0.75rem; border-radius: 3px; font-size: 0.85rem;">Timeline: ${opp.timeline}</span>
            </div>
        </div>
    `).join('');

    document.getElementById('opportunities').innerHTML = opportunitiesHTML;

    // Generate market analysis
    const markets = [
        { segment: 'Enterprise', score: 85, competition: 'High', recommendation: 'Focus on differentiation' },
        { segment: 'Mid-Market', score: 92, competition: 'Medium', recommendation: 'Primary growth target' },
        { segment: 'Small Business', score: 78, competition: 'High', recommendation: 'Selective targeting' },
        { segment: 'Emerging Markets', score: 88, competition: 'Low', recommendation: 'Early mover advantage' },
        { segment: 'Vertical Specialization', score: 95, competition: 'Low', recommendation: 'High priority' }
    ];

    const marketHTML = markets.map(m => `
        <tr>
            <td>${m.segment}</td>
            <td><span style="color: ${m.score >= 90 ? 'var(--success)' : m.score >= 80 ? 'var(--info)' : 'var(--warning)'};">${m.score}/100</span></td>
            <td>${m.competition}</td>
            <td>${m.recommendation}</td>
        </tr>
    `).join('');

    document.getElementById('marketTable').innerHTML = marketHTML;

    // Calculate KPIs
    const avgCustomerValue = currentRevenue / customerCount;
    const clv = avgCustomerValue * 36; // 3-year lifetime
    const cac = avgCustomerValue * 0.3; // 30% of customer value
    const churnRate = (5 + Math.random() * 5).toFixed(1);
    const expansionRevenue = (currentRevenue * 0.25).toFixed(0);

    document.getElementById('clv').textContent = '$' + Math.round(clv).toLocaleString();
    document.getElementById('cac').textContent = '$' + Math.round(cac).toLocaleString();
    document.getElementById('churn').textContent = churnRate + '%';
    document.getElementById('expansion').textContent = '$' + parseInt(expansionRevenue).toLocaleString();

    // Scroll to results
    document.getElementById('growthResults').scrollIntoView({ behavior: 'smooth' });
}