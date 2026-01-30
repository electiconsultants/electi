// Leadership Development AI Tool
function analyzeLeadership() {
    const teamName = document.getElementById('teamName').value;
    const teamMembers = parseInt(document.getElementById('teamMembers').value);
    const leadershipStyle = document.getElementById('leadershipStyle').value;
    const teamTenure = parseInt(document.getElementById('teamTenure').value);
    const projectComplexity = document.getElementById('projectComplexity').value;
    const communicationFrequency = document.getElementById('communicationFrequency').value;

    if (!teamName || !teamMembers || !leadershipStyle || !teamTenure || !projectComplexity || !communicationFrequency) {
        alert('Please fill in all fields');
        return;
    }

    // Show results section
    document.getElementById('leadershipResults').classList.remove('hidden');

    // AI-powered leadership calculations
    const baseScore = 70;
    const styleBonus = {
        'democratic': 10,
        'transformational': 12,
        'servant': 8,
        'autocratic': 5,
        'laissez-faire': 6
    };
    const tenureBonus = Math.min(teamTenure / 12 * 10, 15);
    const complexityFactor = {
        'low': 1.1,
        'medium': 1.0,
        'high': 0.95,
        'very-high': 0.9
    };
    const commBonus = {
        'daily': 10,
        'weekly': 7,
        'biweekly': 5,
        'monthly': 3
    };

    const cohesionScore = Math.min(95, baseScore + styleBonus[leadershipStyle] + tenureBonus + commBonus[communicationFrequency]);
    const effectivenessScore = Math.min(98, (cohesionScore * complexityFactor[projectComplexity]));
    const communicationScore = Math.min(92, baseScore + commBonus[communicationFrequency] + 10);
    const innovationScore = Math.min(90, baseScore + (leadershipStyle === 'transformational' ? 15 : leadershipStyle === 'democratic' ? 12 : 8));

    // Update stats
    document.getElementById('cohesionScore').textContent = cohesionScore.toFixed(0) + '%';
    document.getElementById('effectivenessScore').textContent = effectivenessScore.toFixed(0) + '%';
    document.getElementById('communicationScore').textContent = communicationScore.toFixed(0) + '%';
    document.getElementById('innovationScore').textContent = innovationScore.toFixed(0) + '%';

    // Create competency radar chart
    const competencyCtx = document.getElementById('competencyChart').getContext('2d');
    new Chart(competencyCtx, {
        type: 'radar',
        data: {
            labels: ['Vision', 'Communication', 'Decision Making', 'Team Building', 'Adaptability', 'Accountability'],
            datasets: [{
                label: 'Current Level',
                data: [
                    effectivenessScore,
                    communicationScore,
                    effectivenessScore - 5,
                    cohesionScore,
                    innovationScore - 5,
                    effectivenessScore - 3
                ],
                borderColor: '#1a2b4a',
                backgroundColor: 'rgba(26, 43, 74, 0.2)',
            }, {
                label: 'Target Level',
                data: [95, 95, 95, 95, 95, 95],
                borderColor: '#d4a574',
                backgroundColor: 'rgba(212, 165, 116, 0.2)',
            }]
        },
        options: {
            responsive: true,
            scales: {
                r: {
                    beginAtZero: true,
                    max: 100
                }
            }
        }
    });

    // Create performance trends chart
    const performanceCtx = document.getElementById('performanceChart').getContext('2d');
    const basePerformance = effectivenessScore - 15;
    const performanceData = [];
    for (let i = 0; i <= 6; i++) {
        performanceData.push(basePerformance + (i * 2.5) + (Math.random() * 3));
    }

    new Chart(performanceCtx, {
        type: 'line',
        data: {
            labels: ['6 months ago', '5 months ago', '4 months ago', '3 months ago', '2 months ago', 'Last month', 'Current'],
            datasets: [{
                label: 'Team Performance',
                data: performanceData,
                borderColor: '#1a2b4a',
                backgroundColor: 'rgba(26, 43, 74, 0.1)',
                tension: 0.4,
                fill: true
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
                    min: 60,
                    max: 100
                }
            }
        }
    });

    // Generate leadership recommendations
    const recommendations = [
        {
            title: 'Enhance Cross-Functional Collaboration',
            description: `With ${teamMembers} team members and ${leadershipStyle} leadership style, implementing structured collaboration sessions could improve innovation by 25%. Consider weekly brainstorming sessions and cross-team projects.`,
            priority: 'High'
        },
        {
            title: 'Develop Emotional Intelligence',
            description: `Leadership effectiveness analysis suggests focusing on emotional intelligence training. This could improve team cohesion by ${(100 - cohesionScore).toFixed(0)}% and reduce conflict resolution time by 40%.`,
            priority: 'High'
        },
        {
            title: 'Implement Feedback Loops',
            description: `Current communication frequency (${communicationFrequency}) could be enhanced with structured feedback mechanisms. 360-degree reviews and regular one-on-ones would strengthen team dynamics.`,
            priority: 'Medium'
        },
        {
            title: 'Strategic Decision Framework',
            description: `Given ${projectComplexity} complexity projects, adopting a data-driven decision framework would improve decision quality by 30% and reduce decision time by 25%.`,
            priority: 'High'
        },
        {
            title: 'Leadership Development Program',
            description: `Investing in continuous leadership development for yourself and emerging leaders within the team would create a stronger leadership pipeline and improve succession planning.`,
            priority: 'Medium'
        }
    ];

    const recommendationsHTML = recommendations.map(rec => `
        <div class="feature-card" style="margin-bottom: 1rem;">
            <h4 style="color: var(--primary-navy); margin-bottom: 0.5rem;">${rec.title}</h4>
            <p style="color: var(--text-light); margin-bottom: 1rem;">${rec.description}</p>
            <span style="background: ${rec.priority === 'High' ? 'var(--danger)' : 'var(--warning)'}; color: white; padding: 0.25rem 0.75rem; border-radius: 3px; font-size: 0.85rem;">Priority: ${rec.priority}</span>
        </div>
    `).join('');

    document.getElementById('leadershipRecommendations').innerHTML = recommendationsHTML;

    // Generate development areas
    const developmentAreas = [
        { category: 'Strategic Vision', current: effectivenessScore, target: 95, actions: 'Quarterly strategic planning sessions, industry trend analysis' },
        { category: 'Communication Skills', current: communicationScore, target: 95, actions: 'Active listening training, presentation skills workshop' },
        { category: 'Team Empowerment', current: cohesionScore, target: 95, actions: 'Delegation framework, autonomy guidelines' },
        { category: 'Change Management', current: innovationScore - 5, target: 95, actions: 'Change leadership certification, pilot programs' },
        { category: 'Conflict Resolution', current: effectivenessScore - 8, target: 95, actions: 'Mediation training, conflict resolution protocols' }
    ];

    const developmentHTML = developmentAreas.map(area => `
        <tr>
            <td>${area.category}</td>
            <td><span style="color: ${area.current >= 90 ? 'var(--success)' : area.current >= 80 ? 'var(--info)' : 'var(--warning)'};">${area.current.toFixed(0)}%</span></td>
            <td>${area.target}%</td>
            <td>${area.actions}</td>
        </tr>
    `).join('');

    document.getElementById('developmentTable').innerHTML = developmentHTML;

    // Calculate decision-making scores
    const strategicScore = Math.min(95, effectivenessScore + (leadershipStyle === 'transformational' ? 5 : 0));
    const problemSolvingScore = Math.min(93, effectivenessScore - 2 + (projectComplexity === 'high' || projectComplexity === 'very-high' ? 5 : 0));
    const adaptabilityScore = Math.min(90, innovationScore + (teamTenure < 12 ? 5 : 0));
    const eqScore = Math.min(92, cohesionScore + (leadershipStyle === 'servant' || leadershipStyle === 'democratic' ? 5 : 0));

    document.getElementById('strategicScore').textContent = strategicScore.toFixed(0) + '%';
    document.getElementById('problemSolvingScore').textContent = problemSolvingScore.toFixed(0) + '%';
    document.getElementById('adaptabilityScore').textContent = adaptabilityScore.toFixed(0) + '%';
    document.getElementById('eqScore').textContent = eqScore.toFixed(0) + '%';

    // Generate personalized development plan
    const developmentPlan = `
        <div class="feature-card">
            <h4 style="color: var(--primary-navy); margin-bottom: 1rem;">90-Day Leadership Development Roadmap</h4>
            
            <div style="margin-bottom: 1.5rem;">
                <h5 style="color: var(--primary-navy); margin-bottom: 0.5rem;">Month 1: Foundation Building</h5>
                <ul style="color: var(--text-light); line-height: 1.8;">
                    <li>Complete leadership assessment and establish baseline metrics</li>
                    <li>Implement weekly one-on-one meetings with direct reports</li>
                    <li>Begin emotional intelligence training program</li>
                    <li>Set up team feedback mechanisms</li>
                </ul>
            </div>
            
            <div style="margin-bottom: 1.5rem;">
                <h5 style="color: var(--primary-navy); margin-bottom: 0.5rem;">Month 2: Skill Enhancement</h5>
                <ul style="color: var(--text-light); line-height: 1.8;">
                    <li>Attend strategic thinking workshop</li>
                    <li>Launch cross-functional collaboration initiative</li>
                    <li>Implement data-driven decision framework</li>
                    <li>Conduct mid-point team assessment</li>
                </ul>
            </div>
            
            <div style="margin-bottom: 1.5rem;">
                <h5 style="color: var(--primary-navy); margin-bottom: 0.5rem;">Month 3: Integration & Optimization</h5>
                <ul style="color: var(--text-light); line-height: 1.8;">
                    <li>Review progress against initial metrics</li>
                    <li>Refine leadership approach based on feedback</li>
                    <li>Develop succession planning framework</li>
                    <li>Create continuous improvement plan</li>
                </ul>
            </div>
            
            <div style="background: var(--light-bg); padding: 1rem; border-radius: 5px; margin-top: 1rem;">
                <strong style="color: var(--primary-navy);">Expected Outcomes:</strong>
                <ul style="color: var(--text-light); margin-top: 0.5rem; line-height: 1.8;">
                    <li>Team cohesion improvement: +${(95 - cohesionScore).toFixed(0)}%</li>
                    <li>Leadership effectiveness: +${(95 - effectivenessScore).toFixed(0)}%</li>
                    <li>Decision quality: +30%</li>
                    <li>Team productivity: +25%</li>
                </ul>
            </div>
        </div>
    `;

    document.getElementById('developmentPlan').innerHTML = developmentPlan;

    // Scroll to results
    document.getElementById('leadershipResults').scrollIntoView({ behavior: 'smooth' });
}