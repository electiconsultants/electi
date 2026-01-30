// Training Modules System
class TrainingSystem {
    constructor() {
        this.progress = this.loadProgress();
        this.updateDashboard();
    }

    loadProgress() {
        const saved = localStorage.getItem('electi_training_progress');
        return saved ? JSON.parse(saved) : {
            completedModules: [],
            learningHours: 0,
            certificates: 0
        };
    }

    saveProgress() {
        localStorage.setItem('electi_training_progress', JSON.stringify(this.progress));
    }

    updateDashboard() {
        const totalModules = 15;
        const completed = this.progress.completedModules.length;
        const percentage = Math.round((completed / totalModules) * 100);

        document.getElementById('completedModules').textContent = completed;
        document.getElementById('learningHours').textContent = this.progress.learningHours;
        document.getElementById('certificates').textContent = this.progress.certificates;
        document.getElementById('overallProgress').textContent = percentage + '%';

        // Update module statuses
        this.progress.completedModules.forEach(moduleId => {
            const moduleCard = document.querySelector(`[data-module="${moduleId}"]`);
            if (moduleCard) {
                const status = moduleCard.querySelector('.module-status');
                status.textContent = '✅';
                status.setAttribute('data-status', 'completed');
                
                const button = moduleCard.querySelector('button');
                button.textContent = 'Review Module';
                button.style.background = 'var(--success)';
            }
        });
    }

    completeModule(moduleId, duration) {
        if (!this.progress.completedModules.includes(moduleId)) {
            this.progress.completedModules.push(moduleId);
            this.progress.learningHours += duration;
            
            // Award certificate for completing all modules in a track
            const track = moduleId.split('-')[0];
            const trackModules = this.progress.completedModules.filter(m => m.startsWith(track));
            if (trackModules.length === 5) {
                this.progress.certificates++;
            }
            
            this.saveProgress();
            this.updateDashboard();
        }
    }
}

const trainingSystem = new TrainingSystem();

function startModule(moduleId) {
    const moduleInfo = {
        'ops-1': {
            title: 'GMP Compliance Fundamentals',
            duration: 0.75,
            content: `
                <h3>Module Overview</h3>
                <p>This module covers FDA GMP regulations, documentation requirements, and compliance best practices.</p>
                
                <h4>Learning Objectives:</h4>
                <ul>
                    <li>Understand FDA 21 CFR Part 211 requirements</li>
                    <li>Master documentation and record-keeping practices</li>
                    <li>Implement effective quality systems</li>
                    <li>Prepare for FDA inspections</li>
                    <li>Manage deviations and CAPAs</li>
                </ul>
                
                <h4>Key Topics:</h4>
                <ul>
                    <li><strong>GMP Principles:</strong> Quality management systems, personnel qualifications, facility design</li>
                    <li><strong>Documentation:</strong> Batch records, SOPs, validation protocols, audit trails</li>
                    <li><strong>Quality Control:</strong> Testing requirements, specifications, stability studies</li>
                    <li><strong>Compliance:</strong> Inspection readiness, 483 responses, warning letter prevention</li>
                </ul>
                
                <h4>Case Study:</h4>
                <p>Learn how a mid-size biotech company improved their GMP compliance score from 78% to 96% in 6 months using systematic improvements and staff training.</p>
                
                <h4>Interactive Exercise:</h4>
                <p>Review sample batch records and identify compliance gaps. Practice writing effective CAPA responses.</p>
            `
        },
        'ops-2': {
            title: 'Lean Manufacturing for Pharma',
            duration: 1.0,
            content: `
                <h3>Module Overview</h3>
                <p>Apply lean principles to pharmaceutical manufacturing for waste reduction and efficiency gains.</p>
                
                <h4>Learning Objectives:</h4>
                <ul>
                    <li>Identify and eliminate eight types of waste</li>
                    <li>Implement 5S methodology in pharma environments</li>
                    <li>Apply value stream mapping to production</li>
                    <li>Reduce cycle times and improve throughput</li>
                    <li>Sustain continuous improvement culture</li>
                </ul>
                
                <h4>Key Topics:</h4>
                <ul>
                    <li><strong>Lean Principles:</strong> Value, waste, flow, pull, perfection</li>
                    <li><strong>Tools & Techniques:</strong> 5S, Kaizen, Kanban, SMED, TPM</li>
                    <li><strong>Pharma Applications:</strong> Batch processing, changeovers, material flow</li>
                    <li><strong>Metrics:</strong> OEE, cycle time, lead time, quality metrics</li>
                </ul>
                
                <h4>Real-World Example:</h4>
                <p>Pharmaceutical manufacturer reduced changeover time from 4 hours to 45 minutes using SMED principles, increasing capacity by 30%.</p>
            `
        },
        'growth-1': {
            title: 'Market Access Strategies',
            duration: 0.83,
            content: `
                <h3>Module Overview</h3>
                <p>Navigate complex payer landscapes and develop winning market access strategies.</p>
                
                <h4>Learning Objectives:</h4>
                <ul>
                    <li>Understand payer decision-making processes</li>
                    <li>Develop compelling value propositions</li>
                    <li>Navigate formulary placement strategies</li>
                    <li>Optimize reimbursement approaches</li>
                    <li>Manage payer negotiations effectively</li>
                </ul>
                
                <h4>Key Topics:</h4>
                <ul>
                    <li><strong>Payer Landscape:</strong> Commercial, Medicare, Medicaid, managed care</li>
                    <li><strong>Value Demonstration:</strong> Clinical evidence, economic models, budget impact</li>
                    <li><strong>Access Strategies:</strong> Formulary positioning, prior authorization, step therapy</li>
                    <li><strong>Contracting:</strong> Rebates, discounts, value-based agreements</li>
                </ul>
                
                <h4>Case Study:</h4>
                <p>Specialty pharma company achieved 85% formulary coverage within 12 months through strategic payer engagement and robust value demonstration.</p>
            `
        },
        'leadership-1': {
            title: 'Scientific Leadership Fundamentals',
            duration: 1.0,
            content: `
                <h3>Module Overview</h3>
                <p>Develop essential leadership skills for managing R&D teams and driving innovation.</p>
                
                <h4>Learning Objectives:</h4>
                <ul>
                    <li>Transition from scientist to scientific leader</li>
                    <li>Build and motivate high-performing teams</li>
                    <li>Communicate vision and strategy effectively</li>
                    <li>Make data-driven decisions under uncertainty</li>
                    <li>Foster innovation and calculated risk-taking</li>
                </ul>
                
                <h4>Key Topics:</h4>
                <ul>
                    <li><strong>Leadership Styles:</strong> Transformational, servant, situational leadership</li>
                    <li><strong>Team Building:</strong> Recruitment, onboarding, development, retention</li>
                    <li><strong>Communication:</strong> Vision casting, feedback, difficult conversations</li>
                    <li><strong>Decision Making:</strong> Portfolio prioritization, resource allocation, risk management</li>
                </ul>
                
                <h4>Leadership Assessment:</h4>
                <p>Complete a 360-degree leadership assessment and receive personalized development recommendations.</p>
            `
        }
    };

    const module = moduleInfo[moduleId] || {
        title: 'Training Module',
        duration: 0.75,
        content: '<p>Module content coming soon...</p>'
    };

    // Create modal for module content
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        padding: 2rem;
    `;

    modal.innerHTML = `
        <div style="background: white; padding: 3rem; border-radius: 15px; max-width: 800px; max-height: 90vh; overflow-y: auto; position: relative;">
            <button onclick="this.closest('div[style*=fixed]').remove()" style="position: absolute; top: 1rem; right: 1rem; background: none; border: none; font-size: 2rem; cursor: pointer; color: var(--text-light);">&times;</button>
            
            <h2 style="color: var(--primary-navy); margin-bottom: 1rem;">${module.title}</h2>
            <p style="color: var(--text-light); margin-bottom: 2rem;">⏱️ ${Math.round(module.duration * 60)} minutes</p>
            
            <div style="color: var(--text-dark); line-height: 1.8;">
                ${module.content}
            </div>
            
            <div style="margin-top: 2rem; padding-top: 2rem; border-top: 2px solid var(--border-color); display: flex; gap: 1rem;">
                <button onclick="completeModuleAndClose('${moduleId}', ${module.duration}, this)" class="btn btn-primary" style="flex: 1;">Complete Module</button>
                <button onclick="this.closest('div[style*=fixed]').remove()" class="btn btn-secondary" style="flex: 1;">Close</button>
            </div>
        </div>
    `;

    document.body.appendChild(modal);
}

function completeModuleAndClose(moduleId, duration, button) {
    trainingSystem.completeModule(moduleId, duration);
    button.closest('div[style*="fixed"]').remove();
    alert('Congratulations! Module completed successfully. Your progress has been saved.');
}
</script>