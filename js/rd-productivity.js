// R&D Productivity AI Tool
function analyzeRD() {
    const pipelineSize = parseInt(document.getElementById('pipelineSize').value);
    const rdBudget = parseFloat(document.getElementById('rdBudget').value);
    const rdStaff = parseInt(document.getElementById('rdStaff').value);
    const discoveryPrograms = parseInt(document.getElementById('discoveryPrograms').value);
    const preclinicalPrograms = parseInt(document.getElementById('preclinicalPrograms').value);
    const clinicalPrograms = parseInt(document.getElementById('clinicalPrograms').value);

    if (!pipelineSize || !rdBudget || !rdStaff || !discoveryPrograms || !preclinicalPrograms || !clinicalPrograms) {
        alert('Please fill in all fields');
        return;
    }

    // Show results section
    document.getElementById('rdResults').classList.remove('hidden');

    // AI-powered R&D calculations
    const costPerProgram = (rdBudget / pipelineSize);
    const staffPerProgram = (rdStaff / pipelineSize);
    
    // Calculate efficiency score based on multiple factors
    const budgetEfficiency = Math.min(100, (10 / costPerProgram) * 100);
    const staffEfficiency = Math.min(100, (staffPerProgram / 5) * 100);
    const pipelineBalance = Math.min(100, 100 - Math.abs(33.3 - (discoveryPrograms/pipelineSize*100)));
    const efficiencyScore = ((budgetEfficiency + staffEfficiency + pipelineBalance) / 3).toFixed(0);
    
    const pipelineVelocity = (pipelineSize * 0.3).toFixed(1);
    const successProb = Math.min(95, 60 + (efficiencyScore * 0.3));

    // Update stats
    document.getElementById('efficiencyScore').textContent = efficiencyScore + '%';
    document.getElementById('costPerProgram').textContent = '$' + costPerProgram.toFixed(1) + 'M';
    document.getElementById('pipelineVelocity').textContent = pipelineVelocity;
    document.getElementById('successProb').textContent = successProb.toFixed(0) + '%';

    // Create pipeline distribution chart
    const pipelineCtx = document.getElementById('pipelineChart').getContext('2d');
    new Chart(pipelineCtx, {
        type: 'doughnut',
        data: {
            labels: ['Discovery', 'Preclinical', 'Clinical'],
            datasets: [{
                data: [discoveryPrograms, preclinicalPrograms, clinicalPrograms],
                backgroundColor: ['#1a2b4a', '#d4a574', '#2c4a7c']
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

    // Create resource allocation chart
    const resourceCtx = document.getElementById('resourceChart').getContext('2d');
    new Chart(resourceCtx, {
        type: 'bar',
        data: {
            labels: ['Discovery', 'Preclinical', 'Clinical', 'CMC/Manufacturing', 'Regulatory'],
            datasets: [{
                label: 'Budget Allocation (%)',
                data: [25, 20, 35, 15, 5],
                backgroundColor: '#1a2b4a'
            }, {
                label: 'Recommended (%)',
                data: [30, 25, 30, 10, 5],
                backgroundColor: '#d4a574'
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
                    beginAtZero: true,
                    max: 40
                }
            }
        }
    });

    // Generate AI recommendations
    const recommendations = [
        {
            title: 'Optimize Portfolio Balance',
            description: `Current pipeline shows ${((discoveryPrograms/pipelineSize)*100).toFixed(0)}% in discovery, ${((preclinicalPrograms/pipelineSize)*100).toFixed(0)}% in preclinical, and ${((clinicalPrograms/pipelineSize)*100).toFixed(0)}% in clinical. Industry best practice suggests 40-30-30 distribution. Consider rebalancing to reduce late-stage attrition risk and maintain sustainable flow.`,
            impact: 'High',
            savings: '$' + (rdBudget * 0.15).toFixed(1) + 'M/year'
        },
        {
            title: 'Implement AI-Driven Target Identification',
            description: `Machine learning models can analyze genomic data, protein structures, and disease pathways to identify novel targets 50% faster. Investment of $${(rdBudget * 0.05).toFixed(1)}M in AI platforms could accelerate ${Math.floor(discoveryPrograms * 0.4)} discovery programs by 6-12 months.`,
            impact: 'High',
            savings: '$' + (rdBudget * 0.20).toFixed(1) + 'M/year'
        },
        {
            title: 'Enhance Preclinical Efficiency',
            description: `Current preclinical programs average ${(rdBudget * 0.25 / preclinicalPrograms).toFixed(1)}M per program. Implementing predictive toxicology models and optimized study designs could reduce costs by 30% while maintaining regulatory standards. Focus on ${Math.floor(preclinicalPrograms * 0.6)} programs for immediate impact.`,
            impact: 'High',
            savings: '$' + (rdBudget * 0.075).toFixed(1) + 'M/year'
        },
        {
            title: 'Accelerate Clinical Development',
            description: `Adaptive trial designs and biomarker-driven patient selection can reduce clinical program timelines by 25%. For ${clinicalPrograms} clinical programs, this translates to ${(clinicalPrograms * 6).toFixed(0)} months saved and $${(rdBudget * 0.12).toFixed(1)}M in cost reduction.`,
            impact: 'High',
            savings: '$' + (rdBudget * 0.12).toFixed(1) + 'M/year'
        },
        {
            title: 'Strengthen External Innovation',
            description: `Current R&D productivity suggests opportunity for strategic partnerships. Allocate ${((rdBudget * 0.15)).toFixed(1)}M (15% of budget) to in-licensing, academic collaborations, and biotech partnerships to expand pipeline without proportional cost increase.`,
            impact: 'Medium',
            savings: 'Pipeline expansion'
        },
        {
            title: 'Optimize Resource Allocation',
            description: `With ${rdStaff} R&D staff across ${pipelineSize} programs (${staffPerProgram.toFixed(1)} per program), consider centralizing specialized functions (biostatistics, regulatory, CMC) to improve efficiency. Could support ${Math.floor(pipelineSize * 1.2)} programs with same headcount.`,
            impact: 'Medium',
            savings: '20% capacity increase'
        }
    ];

    const recommendationsHTML = recommendations.map(rec => `
        <div class="feature-card" style="margin-bottom: 1rem;">
            <h4 style="color: var(--primary-navy); margin-bottom: 0.5rem;">${rec.title}</h4>
            <p style="color: var(--text-light); margin-bottom: 1rem;">${rec.description}</p>
            <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
                <span style="background: ${rec.impact === 'High' ? '#28a745' : '#ffc107'}; color: white; padding: 0.25rem 0.75rem; border-radius: 3px; font-size: 0.85rem;">Impact: ${rec.impact}</span>
                <span style="background: var(--success); color: white; padding: 0.25rem 0.75rem; border-radius: 3px; font-size: 0.85rem;">Potential Savings: ${rec.savings}</span>
            </div>
        </div>
    `).join('');

    document.getElementById('rdRecommendations').innerHTML = recommendationsHTML;

    // Generate portfolio optimization
    const idealDiscovery = Math.round(pipelineSize * 0.40);
    const idealPreclinical = Math.round(pipelineSize * 0.30);
    const idealClinical = Math.round(pipelineSize * 0.30);

    const portfolioData = [
        {
            stage: 'Discovery',
            current: discoveryPrograms,
            recommended: idealDiscovery,
            action: discoveryPrograms < idealDiscovery ? `Add ${idealDiscovery - discoveryPrograms} programs` : discoveryPrograms > idealDiscovery ? `Reduce ${discoveryPrograms - idealDiscovery} programs` : 'Maintain current level'
        },
        {
            stage: 'Preclinical',
            current: preclinicalPrograms,
            recommended: idealPreclinical,
            action: preclinicalPrograms < idealPreclinical ? `Add ${idealPreclinical - preclinicalPrograms} programs` : preclinicalPrograms > idealPreclinical ? `Reduce ${preclinicalPrograms - idealPreclinical} programs` : 'Maintain current level'
        },
        {
            stage: 'Clinical',
            current: clinicalPrograms,
            recommended: idealClinical,
            action: clinicalPrograms < idealClinical ? `Add ${idealClinical - clinicalPrograms} programs` : clinicalPrograms > idealClinical ? `Reduce ${clinicalPrograms - idealClinical} programs` : 'Maintain current level'
        }
    ];

    const portfolioHTML = portfolioData.map(p => `
        <tr>
            <td>${p.stage}</td>
            <td>${p.current}</td>
            <td>${p.recommended}</td>
            <td>${p.action}</td>
        </tr>
    `).join('');

    document.getElementById('portfolioTable').innerHTML = portfolioHTML;

    // Generate productivity opportunities
    const opportunities = `
        <div class="features-grid">
            <div class="feature-card">
                <h4 style="color: var(--primary-navy); margin-bottom: 1rem;">🎯 Quick Wins (0-6 months)</h4>
                <ul style="color: var(--text-light); line-height: 1.8;">
                    <li><strong>Implement stage-gate reviews:</strong> Reduce late-stage attrition by 25%</li>
                    <li><strong>Centralize data management:</strong> Save ${(rdStaff * 0.1).toFixed(0)} FTEs worth of effort</li>
                    <li><strong>Optimize vendor management:</strong> Reduce external costs by 15%</li>
                    <li><strong>Standardize protocols:</strong> Accelerate study startup by 30%</li>
                </ul>
                <div style="margin-top: 1rem; padding: 1rem; background: var(--light-bg); border-radius: 5px;">
                    <strong style="color: var(--success);">Potential Impact: $${(rdBudget * 0.10).toFixed(1)}M savings</strong>
                </div>
            </div>
            
            <div class="feature-card">
                <h4 style="color: var(--primary-navy); margin-bottom: 1rem;">🚀 Strategic Initiatives (6-18 months)</h4>
                <ul style="color: var(--text-light); line-height: 1.8;">
                    <li><strong>AI/ML platform deployment:</strong> 50% faster target identification</li>
                    <li><strong>Predictive toxicology:</strong> 30% reduction in preclinical failures</li>
                    <li><strong>Biomarker strategy:</strong> Improve clinical success rates by 40%</li>
                    <li><strong>External innovation hub:</strong> Access to 100+ novel targets</li>
                </ul>
                <div style="margin-top: 1rem; padding: 1rem; background: var(--light-bg); border-radius: 5px;">
                    <strong style="color: var(--success);">Potential Impact: $${(rdBudget * 0.25).toFixed(1)}M savings + pipeline expansion</strong>
                </div>
            </div>
            
            <div class="feature-card">
                <h4 style="color: var(--primary-navy); margin-bottom: 1rem;">🔬 Innovation Opportunities</h4>
                <ul style="color: var(--text-light); line-height: 1.8;">
                    <li><strong>Precision medicine approaches:</strong> Higher success rates in targeted populations</li>
                    <li><strong>Real-world evidence:</strong> Accelerate regulatory approvals</li>
                    <li><strong>Decentralized trials:</strong> Faster enrollment, lower costs</li>
                    <li><strong>Digital biomarkers:</strong> Continuous patient monitoring</li>
                </ul>
                <div style="margin-top: 1rem; padding: 1rem; background: var(--light-bg); border-radius: 5px;">
                    <strong style="color: var(--info);">Competitive Advantage: 12-18 months faster time-to-market</strong>
                </div>
            </div>
            
            <div class="feature-card">
                <h4 style="color: var(--primary-navy); margin-bottom: 1rem;">📊 Performance Metrics</h4>
                <ul style="color: var(--text-light); line-height: 1.8;">
                    <li><strong>Current R&D ROI:</strong> ${((pipelineSize * 0.15 * 500) / rdBudget).toFixed(1)}x</li>
                    <li><strong>Target R&D ROI:</strong> ${((pipelineSize * 0.25 * 500) / rdBudget).toFixed(1)}x (with optimization)</li>
                    <li><strong>Programs per $100M:</strong> ${(pipelineSize / (rdBudget / 100)).toFixed(1)}</li>
                    <li><strong>Industry benchmark:</strong> 8-12 programs per $100M</li>
                </ul>
                <div style="margin-top: 1rem; padding: 1rem; background: var(--light-bg); border-radius: 5px;">
                    <strong style="color: var(--primary-gold);">Gap to Best-in-Class: ${Math.abs((pipelineSize / (rdBudget / 100)) - 10).toFixed(1)} programs</strong>
                </div>
            </div>
        </div>
        
        <div class="feature-card" style="margin-top: 2rem;">
            <h4 style="color: var(--primary-navy); margin-bottom: 1rem;">📈 3-Year Transformation Roadmap</h4>
            
            <div style="margin-bottom: 1.5rem;">
                <h5 style="color: var(--primary-navy); margin-bottom: 0.5rem;">Year 1: Foundation</h5>
                <ul style="color: var(--text-light); line-height: 1.8;">
                    <li>Implement portfolio optimization and stage-gate rigor</li>
                    <li>Deploy AI/ML tools for target identification and lead optimization</li>
                    <li>Establish external innovation partnerships</li>
                    <li>Expected impact: 15% cost reduction, 20% faster cycle times</li>
                </ul>
            </div>
            
            <div style="margin-bottom: 1.5rem;">
                <h5 style="color: var(--primary-navy); margin-bottom: 0.5rem;">Year 2: Acceleration</h5>
                <ul style="color: var(--text-light); line-height: 1.8;">
                    <li>Scale predictive models across all discovery programs</li>
                    <li>Implement biomarker-driven clinical development</li>
                    <li>Launch decentralized trial capabilities</li>
                    <li>Expected impact: 25% cost reduction, 30% faster development</li>
                </ul>
            </div>
            
            <div style="margin-bottom: 1.5rem;">
                <h5 style="color: var(--primary-navy); margin-bottom: 0.5rem;">Year 3: Excellence</h5>
                <ul style="color: var(--text-light); line-height: 1.8;">
                    <li>Achieve best-in-class R&D productivity metrics</li>
                    <li>Expand pipeline by 40% without proportional cost increase</li>
                    <li>Establish reputation as innovation leader</li>
                    <li>Expected impact: 35% cost reduction, 40% faster time-to-market</li>
                </ul>
            </div>
            
            <div style="background: var(--light-bg); padding: 1rem; border-radius: 5px; margin-top: 1rem;">
                <strong style="color: var(--primary-navy);">Total 3-Year Value Creation:</strong>
                <ul style="color: var(--text-light); margin-top: 0.5rem; line-height: 1.8;">
                    <li>Cost savings: $${(rdBudget * 0.35 * 3).toFixed(0)}M cumulative</li>
                    <li>Pipeline expansion: ${Math.floor(pipelineSize * 0.4)} additional programs</li>
                    <li>Time-to-market: 12-18 months faster on average</li>
                    <li>Success rate improvement: 40% increase in clinical approvals</li>
                </ul>
            </div>
        </div>
    `;

    document.getElementById('productivityOpportunities').innerHTML = opportunities;

    // Scroll to results
    document.getElementById('rdResults').scrollIntoView({ behavior: 'smooth' });
}