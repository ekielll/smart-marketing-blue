import { CompanyInfo, InterviewResponse, ExpertAnalysis } from '../App'

export interface ReportData {
  companyInfo: CompanyInfo
  responses: InterviewResponse[]
  analysis: ExpertAnalysis
}

export const generatePDFContent = (data: ReportData): string => {
  const { companyInfo, responses, analysis } = data
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  return `
MARKETING STRATEGY BLUEPRINT
============================

Company: ${companyInfo.name}
Industry: ${companyInfo.industry}
Contact: ${companyInfo.contactName}
Email: ${companyInfo.email}
Phone: ${companyInfo.phone || 'Not provided'}
Report Generated: ${currentDate}

============================
EXECUTIVE SUMMARY
============================

This comprehensive marketing strategy blueprint has been developed specifically for ${companyInfo.name} based on our strategic interview process and expert AI analysis. The strategy includes detailed recommendations across four key areas: market analysis and positioning, social media strategy, advertising approach, and SEO optimization.

Key Highlights:
• ${responses.length} strategic interview questions analyzed
• Custom recommendations for the ${companyInfo.industry} industry
• Actionable insights from our virtual expert team
• Data-driven approach to marketing strategy development

============================
MARKET ANALYSIS & POSITIONING
============================

${analysis.marketAnalyst}

============================
SOCIAL MEDIA STRATEGY
============================

${analysis.socialMediaGuru}

============================
ADVERTISING STRATEGY
============================

${analysis.advertisingPro}

============================
SEO STRATEGY
============================

${analysis.seoExpert}

============================
STRATEGIC INTERVIEW INSIGHTS
============================

The following insights were gathered during our strategic interview process:

${responses.map((response, index) => `
QUESTION ${index + 1}: ${response.question}

RESPONSE: ${response.answer}
${response.followUp ? `FOLLOW-UP: ${response.followUp}` : ''}
`).join('\n')}

============================
IMPLEMENTATION ROADMAP
============================

IMMEDIATE ACTIONS (Week 1-2):
1. Review and validate target audience definitions
2. Set up measurement and tracking systems
3. Audit current marketing materials and messaging
4. Begin content planning based on recommended themes

SHORT-TERM GOALS (Month 1-3):
1. Implement priority SEO recommendations
2. Launch social media presence on recommended platforms
3. Test advertising campaigns on primary channels
4. Develop brand guidelines and content templates

LONG-TERM STRATEGY (3-12 Months):
1. Scale successful advertising campaigns
2. Expand to additional marketing channels
3. Optimize based on performance data
4. Develop advanced content marketing initiatives

============================
NEXT STEPS & RECOMMENDATIONS
============================

1. PRIORITIZE BY IMPACT: Focus first on recommendations that offer the highest potential return on investment for your specific situation.

2. START SMALL: Begin with one or two initiatives rather than trying to implement everything at once.

3. MEASURE EVERYTHING: Set up tracking and analytics before launching any campaigns to ensure you can measure success.

4. ITERATE QUICKLY: Use the data from your initial efforts to refine and improve your approach.

5. STAY CONSISTENT: Marketing success requires consistent effort over time. Develop sustainable processes you can maintain.

============================
CONTACT & CONSULTATION
============================

This strategy blueprint provides a comprehensive foundation for your marketing efforts. For additional consultation or clarification on any recommendations, please don't hesitate to reach out.

Company: ${companyInfo.name}
Primary Contact: ${companyInfo.contactName}
Email: ${companyInfo.email}

============================

© AI Marketing Strategy Platform
Generated with AI-powered analysis
This document contains confidential business strategy information
`
}

export const downloadPDFReport = (data: ReportData): void => {
  const content = generatePDFContent(data)
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  
  const link = document.createElement('a')
  link.href = url
  link.download = `${data.companyInfo.name.replace(/[^a-zA-Z0-9]/g, '_')}_Marketing_Strategy_${new Date().toISOString().split('T')[0]}.txt`
  
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  
  URL.revokeObjectURL(url)
}

export const shareViaEmail = (data: ReportData, customMessage?: string): void => {
  const { companyInfo } = data
  const subject = encodeURIComponent(`Marketing Strategy Blueprint - ${companyInfo.name}`)
  
  const defaultMessage = `Hi ${companyInfo.contactName},

Please find attached your custom marketing strategy blueprint for ${companyInfo.name}. This comprehensive plan includes:

• Market Analysis & Positioning Strategy
• Social Media Recommendations  
• Advertising Strategy & Budget Allocation
• SEO Optimization Plan
• Implementation Roadmap

The strategy has been tailored specifically for your business in the ${companyInfo.industry} industry based on our strategic interview.

Please review the recommendations and feel free to reach out if you have any questions or need clarification on any of the strategies outlined.

Best regards,
AI Marketing Strategy Team`

  const message = encodeURIComponent(customMessage || defaultMessage)
  const content = encodeURIComponent(generatePDFContent(data))
  
  // Create mailto link with the report content
  const mailtoLink = `mailto:${companyInfo.email}?subject=${subject}&body=${message}%0A%0A--- MARKETING STRATEGY REPORT ATTACHED ---%0A%0A${content}`
  
  window.open(mailtoLink, '_blank')
}

export const generateCalendarEvent = (data: ReportData): void => {
  const { companyInfo } = data
  
  // Create a follow-up consultation event
  const startDate = new Date()
  startDate.setDate(startDate.getDate() + 7) // Schedule for next week
  startDate.setHours(14, 0, 0, 0) // 2:00 PM
  
  const endDate = new Date(startDate)
  endDate.setHours(15, 0, 0, 0) // 1-hour meeting
  
  const formatDateTime = (date: Date): string => {
    return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'
  }
  
  const eventTitle = encodeURIComponent(`Marketing Strategy Review - ${companyInfo.name}`)
  const eventDescription = encodeURIComponent(`
Follow-up consultation to review and discuss the marketing strategy blueprint for ${companyInfo.name}.

Agenda:
• Review strategy recommendations
• Clarify implementation priorities  
• Discuss budget and resource allocation
• Address any questions about the plan
• Set next steps for execution

Company: ${companyInfo.name}
Contact: ${companyInfo.contactName}
Industry: ${companyInfo.industry}
Email: ${companyInfo.email}

Please prepare any specific questions about the strategy recommendations prior to our meeting.
`)
  
  const location = encodeURIComponent('Video Conference (link to be provided)')
  
  // Google Calendar event URL
  const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${eventTitle}&dates=${formatDateTime(startDate)}/${formatDateTime(endDate)}&details=${eventDescription}&location=${location}&sf=true&output=xml`
  
  window.open(calendarUrl, '_blank')
}