// Intelligence Hub JavaScript

function showTab(tabName) {
    document.querySelectorAll('.intel-section').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('.intel-tab').forEach(t => t.classList.remove('active'));
    document.getElementById('tab-' + tabName).classList.add('active');
    event.target.classList.add('active');
    if (tabName === 'market') initMarketCharts();
    if (tabName === 'competitive') initCompetitiveCharts();
    if (tabName === 'funding') initFundingCharts();
}

// ===================== CHATBOT =====================
const botResponses = {
    'fda': `**FDA Regulatory Pathways for Biologics:**\n\n**1. Biologics License Application (BLA)**\nThe primary pathway for novel biologics. Requires comprehensive CMC, preclinical, and clinical data. Standard review: 12 months; Priority Review: 6 months.\n\n**2. Accelerated Approval**\nFor serious conditions with unmet need. Uses surrogate endpoints. Post-market confirmatory trials required.\n\n**3. Breakthrough Therapy Designation**\nIntensive FDA guidance throughout development. Median approval time reduced by ~3 years vs standard pathway.\n\n**4. Fast Track Designation**\nRolling review of completed sections. More frequent FDA meetings and communications.\n\n**Key Recommendation:** Engage FDA early via Pre-IND meeting to align on development program. Electi can help design your regulatory strategy to maximize approval probability.`,

    'clinical trial': `**Reducing Clinical Trial Costs by 30%+:**\n\n**1. Decentralized Trial Design (DCT)**\nRemote monitoring, eConsent, and home nursing reduce site costs by 25-40%. Patient retention improves 35%.\n\n**2. Adaptive Trial Design**\nBayesian adaptive designs can reduce sample size by 20-30% while maintaining statistical power.\n\n**3. Site Selection Optimization**\nAI-powered site selection identifies high-enrolling sites. Top 20% of sites enroll 80% of patients.\n\n**4. Risk-Based Monitoring (RBM)**\nFocus monitoring resources on high-risk data. Reduces monitoring costs by 30-50%.\n\n**5. Patient Recruitment Technology**\nDigital recruitment and AI-powered patient matching reduces enrollment timelines by 40%.\n\n**Electi Recommendation:** Our Clinical Trials Optimization tool can model your specific protocol and identify the highest-impact cost reduction opportunities.`,

    'gmp': `**GMP Compliance Best Practices for Life Sciences:**\n\n**Quality Management System (QMS)**\n• Implement electronic QMS (eQMS) for real-time deviation tracking\n• Automated CAPA management with AI-driven root cause analysis\n• Digital batch records eliminate transcription errors\n\n**Process Analytical Technology (PAT)**\n• Real-time process monitoring reduces batch failures by 60%\n• Continuous manufacturing reduces cycle time by 40%\n• In-line analytics enable real-time release testing\n\n**Data Integrity (21 CFR Part 11)**\n• Audit trails for all GMP-critical data\n• Electronic signatures with biometric authentication\n• Automated data backup and disaster recovery\n\n**Training & Culture**\n• Role-based GMP training with competency assessments\n• Quality culture metrics tracked quarterly\n• Cross-functional quality councils\n\n**Electi Insight:** Companies with mature QMS systems experience 70% fewer FDA observations and 45% lower cost of quality.`,

    'market access': `**European Market Access Strategy:**\n\n**1. Early HTA Engagement**\nWith EU HTA Regulation now in effect, joint clinical assessments are mandatory for oncology and ATMPs. Engage EUnetHTA early in Phase 2.\n\n**2. Value Dossier Development**\nBuild comprehensive value story addressing:\n• Clinical differentiation vs. standard of care\n• Patient-reported outcomes and quality of life\n• Real-world evidence strategy\n• Budget impact modeling\n\n**3. Country-Specific Strategies**\nGermany (AMNOG): Focus on added benefit vs. appropriate comparator\nFrance (HAS): Emphasize SMR and ASMR ratings\nUK (NICE): Cost-effectiveness threshold £20-30K/QALY\nItaly/Spain: Regional variation in access timelines\n\n**4. Pricing Strategy**\nReference pricing dynamics across EU27. Launch sequencing critical to protect price in high-value markets.\n\n**Electi Recommendation:** Develop integrated evidence generation plan aligning Phase 3 endpoints with HTA requirements from Day 1.`,

    'leadership': `**Critical Leadership Competencies for Life Sciences Executives:**\n\n**Scientific Credibility + Business Acumen**\nThe most effective life sciences leaders bridge scientific depth with commercial insight. 78% of top-performing pharma CEOs have dual expertise.\n\n**Cross-Functional Integration**\nBreaking silos between R&D, Medical Affairs, Commercial, and Manufacturing. Leaders who excel at integration deliver 35% faster time-to-market.\n\n**Regulatory Intelligence**\nDeep understanding of regulatory strategy as a competitive advantage, not just compliance. Proactive FDA/EMA engagement reduces approval timelines.\n\n**Change Leadership**\nLife sciences is transforming rapidly (AI, precision medicine, DCTs). Leaders must drive cultural transformation while maintaining operational excellence.\n\n**External Stakeholder Management**\nPatient advocacy, payer relationships, KOL engagement, and investor communications are increasingly critical CEO competencies.\n\n**Talent Development**\nBuilding diverse, high-performing teams. Life sciences talent war intensifying — retention strategies essential.\n\n**Electi Assessment:** Our 360° Leadership Assessment measures all 12 critical life sciences leadership competencies with peer benchmarking.`,

    'r&d': `**Building High-Performing R&D Teams:**\n\n**Team Composition**\n• Optimal R&D team: 60-70% deep specialists + 30-40% integrators/translators\n• Diversity of thought: mix of academic, industry, and clinical backgrounds\n• Include patient advocates and commercial representatives early\n\n**Culture & Environment**\n• Psychological safety: teams that feel safe to fail innovate 3x more\n• Celebrate learning from failures, not just successes\n• Dedicated innovation time (15-20% of researcher time)\n\n**Processes & Tools**\n• Agile R&D methodologies reduce cycle time by 25%\n• AI-assisted literature review saves 8-12 hours/researcher/week\n• Integrated data platforms eliminate data silos\n\n**Performance Management**\n• Balance short-term milestones with long-term innovation metrics\n• Team-based incentives alongside individual recognition\n• Regular scientific exchange and external collaboration\n\n**Retention Strategies**\n• Career development pathways (scientific track vs. management track)\n• Competitive compensation benchmarking every 18 months\n• Publication and patent recognition programs`,

    'biotech funding': `**Biotech Funding Trends 2026:**\n\n**Market Overview**\nVC funding rebounded strongly in 2025-2026 after 2022-2023 downturn. Q1 2026 saw $42B deployed globally, up 18% QoQ.\n\n**Hot Investment Areas**\n🔥 AI/ML Drug Discovery: $8.2B invested in 2025\n🔥 Obesity/Metabolic: GLP-1 follow-ons attracting massive capital\n🔥 Cell & Gene Therapy: Manufacturing scale-up investments\n🔥 Radiopharmaceuticals: Emerging as next oncology frontier\n🔥 Longevity/Aging Biology: New category attracting $3.1B\n\n**Funding Stage Trends**\n• Series A median: $45M (up from $32M in 2024)\n• Series B median: $95M\n• Series C+: $200M+ becoming standard for late-stage\n• IPO window reopening: 34 biotech IPOs filed in 2026\n\n**Investor Priorities**\n• Clinical proof-of-concept before Series B\n• Clear regulatory pathway and commercial strategy\n• Experienced management team with track record\n• Platform technology with multiple shots on goal\n\n**Electi Insight:** Companies with strong operational infrastructure and data-driven decision making command 25-40% valuation premiums.`,

    'ai': `**AI Transforming Drug Discovery in 2026:**\n\n**Current State**\nAI-designed molecules represent 23% of all new IND filings. 15 AI-discovered drugs now in clinical trials. First AI-designed drug approval expected 2026-2027.\n\n**Key Applications**\n\n**Target Identification & Validation**\n• Multi-omics data integration identifies novel targets 10x faster\n• AlphaFold3 enables structure-based drug design for previously undruggable targets\n• AI reduces false positive rate in target validation by 45%\n\n**Lead Optimization**\n• Generative AI designs novel chemical scaffolds with desired properties\n• ADMET prediction reduces late-stage attrition by 30%\n• Virtual screening of billion-compound libraries in hours\n\n**Clinical Development**\n• Patient stratification using biomarker AI improves trial success rates\n• Digital biomarkers from wearables enable continuous monitoring\n• AI-powered protocol optimization reduces sample size requirements\n\n**Implementation Roadmap**\n1. Data infrastructure: Unified data lake for all R&D data\n2. AI partnerships: Collaborate with specialized AI platforms\n3. Internal capability: Build AI/ML team within R&D\n4. Governance: Establish AI ethics and validation framework\n\n**Electi Recommendation:** Start with AI-assisted literature review and ADMET prediction — highest ROI, lowest implementation risk.`
};

function getBotResponse(message) {
    const msg = message.toLowerCase();
    if (msg.includes('fda') || msg.includes('biologic') || msg.includes('regulatory pathway')) return botResponses['fda'];
    if (msg.includes('clinical trial') || msg.includes('trial cost') || msg.includes('enrollment')) return botResponses['clinical trial'];
    if (msg.includes('gmp') || msg.includes('manufacturing') || msg.includes('compliance')) return botResponses['gmp'];
    if (msg.includes('market access') || msg.includes('europe') || msg.includes('hta') || msg.includes('reimbursement')) return botResponses['market access'];
    if (msg.includes('leadership') || msg.includes('competenc') || msg.includes('executive')) return botResponses['leadership'];
    if (msg.includes('r&d team') || msg.includes('research team') || msg.includes('high-performing')) return botResponses['r&d'];
    if (msg.includes('funding') || msg.includes('biotech fund') || msg.includes('venture') || msg.includes('vc')) return botResponses['biotech funding'];
    if (msg.includes('ai') || msg.includes('drug discovery') || msg.includes('machine learning')) return botResponses['ai'];

    return `Thank you for your question about **"${message}"**.\n\nThis is an excellent strategic question for life sciences organizations. Based on our expertise working with pharmaceutical, biotech, and medical device companies, here are key considerations:\n\n**Strategic Framework:**\n• Assess your current organizational capabilities and gaps\n• Benchmark against industry best practices and peer companies\n• Develop a phased implementation roadmap with clear milestones\n• Establish KPIs to measure progress and ROI\n\n**Recommended Next Steps:**\n1. Schedule a consultation with an Electi expert advisor\n2. Complete our organizational assessment tools\n3. Review relevant case studies in our resource library\n4. Explore our training modules for capability building\n\nWould you like me to dive deeper into any specific aspect of this topic? I can provide more detailed guidance on regulatory strategy, operational excellence, commercial strategy, or leadership development.`;
}

function formatBotMessage(text) {
    return text
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\n\n/g, '<br><br>')
        .replace(/\n/g, '<br>')
        .replace(/• /g, '&bull; ')
        .replace(/🔥/g, '🔥')
        .replace(/(\d+\. )/g, '<br>$1');
}

function addMessage(text, isUser) {
    const messages = document.getElementById('chatMessages');
    const div = document.createElement('div');
    div.className = 'message ' + (isUser ? 'user' : 'bot');
    div.innerHTML = `
        <div class="message-avatar ${isUser ? 'user-avatar' : 'bot-avatar'}">${isUser ? '👤' : '🤖'}</div>
        <div class="message-bubble ${isUser ? 'user-bubble' : 'bot-bubble'}">${isUser ? text : formatBotMessage(text)}</div>
    `;
    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
}

function showTyping() {
    const messages = document.getElementById('chatMessages');
    const div = document.createElement('div');
    div.className = 'message bot';
    div.id = 'typing-indicator';
    div.innerHTML = `
        <div class="message-avatar bot-avatar">🤖</div>
        <div class="typing-indicator">
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
        </div>
    `;
    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
}

function removeTyping() {
    const indicator = document.getElementById('typing-indicator');
    if (indicator) indicator.remove();
}

function sendMessage() {
    const input = document.getElementById('chatInput');
    const message = input.value.trim();
    if (!message) return;
    addMessage(message, true);
    input.value = '';
    showTyping();
    setTimeout(() => {
        removeTyping();
        addMessage(getBotResponse(message), false);
    }, 1200 + Math.random() * 800);
}

function askSuggestion(question) {
    document.getElementById('chatInput').value = question;
    sendMessage();
}

function handleChatKey(e) {
    if (e.key === 'Enter') sendMessage();
}

// ===================== CHARTS =====================
let chartsInitialized = {};

function initMarketCharts() {
    if (chartsInitialized.market) return;
    chartsInitialized.market = true;

    new Chart(document.getElementById('marketChart'), {
        type: 'bar',
        data: {
            labels: ['Pharma', 'Biotech', 'MedTech', 'Digital Health', 'CRO/CDMO', 'Diagnostics'],
            datasets: [
                { label: '2024', data: [820, 340, 280, 95, 120, 85], backgroundColor: 'rgba(26,43,74,0.6)' },
                { label: '2025', data: [875, 390, 305, 130, 145, 98], backgroundColor: 'rgba(212,165,116,0.6)' },
                { label: '2026E', data: [940, 445, 330, 175, 168, 112], backgroundColor: 'rgba(40,167,69,0.6)' }
            ]
        },
        options: { responsive: true, plugins: { legend: { position: 'top' } }, scales: { y: { beginAtZero: true, title: { display: true, text: 'Market Size ($B)' } } } }
    });

    new Chart(document.getElementById('therapyChart'), {
        type: 'doughnut',
        data: {
            labels: ['Oncology', 'Immunology', 'Neurology', 'Cardiovascular', 'Rare Disease', 'Infectious Disease', 'Other'],
            datasets: [{ data: [28, 18, 14, 12, 11, 9, 8], backgroundColor: ['#1a2b4a','#d4a574','#28a745','#17a2b8','#6f42c1','#fd7e14','#6c757d'] }]
        },
        options: { responsive: true, plugins: { legend: { position: 'right' } } }
    });
}

function initCompetitiveCharts() {
    if (chartsInitialized.competitive) return;
    chartsInitialized.competitive = true;

    new Chart(document.getElementById('pipelineChart'), {
        type: 'bar',
        data: {
            labels: ['Your Company', 'Competitor A', 'Competitor B', 'Competitor C', 'Competitor D'],
            datasets: [
                { label: 'Phase 1', data: [4, 6, 3, 5, 2], backgroundColor: '#17a2b8' },
                { label: 'Phase 2', data: [3, 4, 5, 2, 4], backgroundColor: '#ffc107' },
                { label: 'Phase 3', data: [2, 3, 2, 1, 3], backgroundColor: '#28a745' },
                { label: 'Approved', data: [5, 8, 6, 4, 7], backgroundColor: '#1a2b4a' }
            ]
        },
        options: { responsive: true, plugins: { legend: { position: 'top' } }, scales: { x: { stacked: true }, y: { stacked: true, title: { display: true, text: 'Number of Assets' } } } }
    });
}

function initFundingCharts() {
    if (chartsInitialized.funding) return;
    chartsInitialized.funding = true;

    new Chart(document.getElementById('fundingChart'), {
        type: 'bar',
        data: {
            labels: ['Oncology', 'Metabolic/Obesity', 'Neurology', 'Rare Disease', 'Immunology', 'Digital Health', 'Cell/Gene Therapy'],
            datasets: [{ label: 'Q1 2026 Funding ($B)', data: [9.8, 7.2, 5.4, 4.8, 4.2, 3.8, 6.8], backgroundColor: ['#1a2b4a','#d4a574','#28a745','#17a2b8','#6f42c1','#fd7e14','#dc3545'] }]
        },
        options: { responsive: true, plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true, title: { display: true, text: 'Funding ($B)' } } } }
    });

    new Chart(document.getElementById('dealChart'), {
        type: 'pie',
        data: {
            labels: ['M&A', 'Series C+', 'Series B', 'Series A', 'IPO', 'Licensing'],
            datasets: [{ data: [35, 22, 18, 12, 8, 5], backgroundColor: ['#1a2b4a','#d4a574','#28a745','#17a2b8','#6f42c1','#fd7e14'] }]
        },
        options: { responsive: true, plugins: { legend: { position: 'right' } } }
    });
}

// Filter buttons
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        this.closest('.filter-bar').querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
    });
});