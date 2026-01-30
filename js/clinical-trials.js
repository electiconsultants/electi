// Clinical Trials Optimization AI Tool
function analyzeTrial() {
    const trialPhase = document.getElementById('trialPhase').value;
    const indication = document.getElementById('indication').value;
    const targetEnrollment = parseInt(document.getElementById('targetEnrollment').value);
    const numberOfSites = parseInt(document.getElementById('numberOfSites').value);
    const trialDuration = parseInt(document.getElementById('trialDuration').value);
    const geography = document.getElementById('geography').value;

    if (!trialPhase || !indication || !targetEnrollment || !numberOfSites || !trialDuration || !geography) {
        alert('Please fill in all fields');
        return;
    }

    // Show results section
    document.getElementById('trialResults').classList.remove('hidden');

    // AI-powered trial calculations
    const phaseFactor = {
        'phase1': 1.2,
        'phase2': 1.5,
        'phase3': 2.0,
        'phase4': 1.3
    };

    const geoFactor = {
        'north-america': 1.0,
        'europe': 1.1,
        'asia-pacific': 0.9,
        'global': 1.3
    };

    const baseEnrollmentRate = 2.5; // patients per site per month
    const actualRate = baseEnrollmentRate * (1 / phaseFactor[trialPhase]) * geoFactor[geography];
    const enrollmentMonths = Math.ceil(targetEnrollment / (numberOfSites * actualRate));
    const successProb = Math.min(95, 70 + (numberOfSites * 0.5) - (phaseFactor[trialPhase] * 5));
    const costPerPatient = 25000 * phaseFactor[trialPhase];
    const totalCost = targetEnrollment * costPerPatient;
    const riskScore = Math.max(10, 100 - successProb);

    // Update stats
    document.getElementById('enrollmentTime').textContent = enrollmentMonths + ' months';
    document.getElementById('successProb').textContent = successProb.toFixed(0) + '%';
    document.getElementById('costEstimate').textContent = '$' + (totalCost / 1000000).toFixed(1) + 'M';
    document.getElementById('riskScore').textContent = riskScore.toFixed(0);

    // Create enrollment projection chart
    const enrollmentCtx = document.getElementById('enrollmentChart').getContext('2d');
    const monthlyEnrollment = [];
    const cumulativeEnrollment = [];
    let cumulative = 0;
    
    for (let i = 0; i <= enrollmentMonths; i++) {
        const monthly = Math.min(
            numberOfSites * actualRate,
            targetEnrollment - cumulative
        );
        monthlyEnrollment.push(monthly);
        cumulative += monthly;
        cumulativeEnrollment.push(cumulative);
    }

    new Chart(enrollmentCtx, {
        type: 'line',
        data: {
            labels: Array.from({length: enrollmentMonths + 1}, (_, i) => 'Month ' + i),
            datasets: [{
                label: 'Cumulative Enrollment',
                data: cumulativeEnrollment,
                borderColor: '#1a2b4a',
                backgroundColor: 'rgba(26, 43, 74, 0.1)',
                tension: 0.4,
                fill: true
            }, {
                label: 'Target',
                data: Array(enrollmentMonths + 1).fill(targetEnrollment),
                borderColor: '#d4a574',
                borderDash: [5, 5],
                tension: 0
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
                    max: targetEnrollment * 1.1
                }
            }
        }
    });

    // Create site performance chart
    const siteCtx = document.getElementById('siteChart').getContext('2d');
    const siteCategories = ['Top Performers', 'Average', 'Below Average', 'Underperforming'];
    const siteDistribution = [
        Math.floor(numberOfSites * 0.25),
        Math.floor(numberOfSites * 0.40),
        Math.floor(numberOfSites * 0.25),
        Math.floor(numberOfSites * 0.10)
    ];

    new Chart(siteCtx, {
        type: 'bar',
        data: {
            labels: siteCategories,
            datasets: [{
                label: 'Number of Sites',
                data: siteDistribution,
                backgroundColor: ['#28a745', '#17a2b8', '#ffc107', '#dc3545']
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    // Generate AI recommendations
    const recommendations = [
        {
            title: 'Optimize Site Selection',
            description: `Based on ${indication} trials in ${geography}, prioritize sites with proven track records in this therapeutic area. Top-performing sites can enroll ${(actualRate * 1.5).toFixed(1)} patients/month vs. ${actualRate.toFixed(1)} average. Focus on the top ${Math.floor(numberOfSites * 0.3)} sites for 60% of enrollment.`,
            impact: 'High',
            timeline: 'Immediate'
        },
        {
            title: 'Implement Risk-Based Monitoring',
            description: `For ${trialPhase.toUpperCase()} trials, centralized monitoring can reduce on-site visits by 40% while maintaining data quality. Allocate resources to high-risk sites and use remote monitoring for stable performers.`,
            impact: 'High',
            timeline: '1-2 months'
        },
        {
            title: 'Enhance Patient Recruitment',
            description: `Digital recruitment strategies (social media, patient registries) can accelerate enrollment by 35%. Budget $${(totalCost * 0.05 / 1000000).toFixed(1)}M for targeted digital campaigns and patient advocacy partnerships.`,
            impact: 'High',
            timeline: '2-3 months'
        },
        {
            title: 'Streamline Protocol Design',
            description: `Current protocol complexity may impact enrollment. Consider reducing visit frequency by 20% and implementing home health visits for ${Math.floor(targetEnrollment * 0.3)} patients to improve retention.`,
            impact: 'Medium',
            timeline: '1 month'
        },
        {
            title: 'Leverage Decentralized Trial Elements',
            description: `Incorporating telemedicine visits and wearable devices can expand patient pool by 25% and reduce dropout rates. Particularly effective for ${indication} where remote monitoring is feasible.`,
            impact: 'Medium',
            timeline: '2-4 months'
        }
    ];

    const recommendationsHTML = recommendations.map(rec => `
        <div class="feature-card" style="margin-bottom: 1rem;">
            <h4 style="color: var(--primary-navy); margin-bottom: 0.5rem;">${rec.title}</h4>
            <p style="color: var(--text-light); margin-bottom: 1rem;">${rec.description}</p>
            <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
                <span style="background: ${rec.impact === 'High' ? '#28a745' : '#ffc107'}; color: white; padding: 0.25rem 0.75rem; border-radius: 3px; font-size: 0.85rem;">Impact: ${rec.impact}</span>
                <span style="background: var(--info); color: white; padding: 0.25rem 0.75rem; border-radius: 3px; font-size: 0.85rem;">Timeline: ${rec.timeline}</span>
            </div>
        </div>
    `).join('');

    document.getElementById('trialRecommendations').innerHTML = recommendationsHTML;

    // Generate risk analysis
    const risks = [
        { factor: 'Slow Enrollment', impact: 'High', probability: riskScore > 50 ? 'High' : 'Medium', mitigation: 'Implement digital recruitment, expand site network' },
        { factor: 'Site Activation Delays', impact: 'Medium', probability: 'Medium', mitigation: 'Streamline contracting, provide site training early' },
        { factor: 'Patient Dropout', impact: 'High', probability: phaseFactor[trialPhase] > 1.5 ? 'Medium' : 'Low', mitigation: 'Reduce visit burden, implement retention programs' },
        { factor: 'Data Quality Issues', impact: 'Medium', probability: 'Low', mitigation: 'Risk-based monitoring, real-time data review' },
        { factor: 'Regulatory Delays', impact: 'High', probability: geography === 'global' ? 'Medium' : 'Low', mitigation: 'Early regulatory engagement, parallel submissions' }
    ];

    const riskHTML = risks.map(r => `
        <tr>
            <td>${r.factor}</td>
            <td><span style="color: ${r.impact === 'High' ? 'var(--danger)' : 'var(--warning)'};">${r.impact}</span></td>
            <td><span style="color: ${r.probability === 'High' ? 'var(--danger)' : r.probability === 'Medium' ? 'var(--warning)' : 'var(--success)'};">${r.probability}</span></td>
            <td>${r.mitigation}</td>
        </tr>
    `).join('');

    document.getElementById('riskTable').innerHTML = riskHTML;

    // Generate site optimization
    const siteOptimization = `
        <div class="feature-card">
            <h4 style="color: var(--primary-navy); margin-bottom: 1rem;">Recommended Site Strategy</h4>
            
            <div style="margin-bottom: 1.5rem;">
                <h5 style="color: var(--primary-navy); margin-bottom: 0.5rem;">Tier 1 Sites (Top 30%)</h5>
                <p style="color: var(--text-light);">
                    <strong>${Math.floor(numberOfSites * 0.3)} sites</strong> with proven ${indication} experience and enrollment rates >3 patients/month.
                    Expected to deliver 60% of total enrollment.
                </p>
                <ul style="color: var(--text-light); margin-top: 0.5rem; line-height: 1.8;">
                    <li>Academic medical centers with dedicated research infrastructure</li>
                    <li>Sites with active patient registries in ${indication}</li>
                    <li>Locations with high population density and disease prevalence</li>
                </ul>
            </div>
            
            <div style="margin-bottom: 1.5rem;">
                <h5 style="color: var(--primary-navy); margin-bottom: 0.5rem;">Tier 2 Sites (Middle 40%)</h5>
                <p style="color: var(--text-light);">
                    <strong>${Math.floor(numberOfSites * 0.4)} sites</strong> with moderate experience, enrollment rates 1.5-3 patients/month.
                    Expected to deliver 30% of total enrollment.
                </p>
                <ul style="color: var(--text-light); margin-top: 0.5rem; line-height: 1.8;">
                    <li>Community hospitals with research capabilities</li>
                    <li>Sites requiring additional training and support</li>
                    <li>Backup sites for geographic coverage</li>
                </ul>
            </div>
            
            <div style="margin-bottom: 1.5rem;">
                <h5 style="color: var(--primary-navy); margin-bottom: 0.5rem;">Tier 3 Sites (Bottom 30%)</h5>
                <p style="color: var(--text-light);">
                    <strong>${Math.floor(numberOfSites * 0.3)} sites</strong> with limited experience or new to ${indication}.
                    Expected to deliver 10% of total enrollment.
                </p>
                <ul style="color: var(--text-light); margin-top: 0.5rem; line-height: 1.8;">
                    <li>Consider replacing underperforming sites after 3 months</li>
                    <li>Provide intensive training and monitoring support</li>
                    <li>Evaluate for closure if enrollment <0.5 patients/month</li>
                </ul>
            </div>
            
            <div style="background: var(--light-bg); padding: 1rem; border-radius: 5px; margin-top: 1rem;">
                <strong style="color: var(--primary-navy);">Key Success Factors:</strong>
                <ul style="color: var(--text-light); margin-top: 0.5rem; line-height: 1.8;">
                    <li>Site activation within 60 days of contract execution</li>
                    <li>Monthly enrollment targets with performance-based incentives</li>
                    <li>Centralized patient recruitment support and materials</li>
                    <li>Regular site performance reviews and optimization</li>
                </ul>
            </div>
        </div>
    `;

    document.getElementById('siteOptimization').innerHTML = siteOptimization;

    // Scroll to results
    document.getElementById('trialResults').scrollIntoView({ behavior: 'smooth' });
}