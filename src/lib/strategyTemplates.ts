export interface StrategyTemplate {
  name: stri
  targetIndust
  recommendedChannels
  budgetAllocation: {
    percentage: number
  }[]
  marketResearchAreas: str
    phase: string
    priority: strin
  }[]

  {
    name: 'B2B SaaS Strategy',
    targetIndustries: ['SaaS', 
      'Monthly Recu
    phase: string
    duration: string
    priority: string
    actions: string[]
  }[]
}

export const strategyTemplates: StrategyTemplate[] = [
  {
    id: 'b2b-saas',
    name: 'B2B SaaS Strategy',
    description: 'Proven framework for B2B SaaS companies to drive qualified leads and accelerate growth',
    targetIndustries: ['SaaS', 'Software', 'Technology', 'B2B Services', 'Enterprise Solutions'],
    keyMetrics: [
      'Monthly Recurring Revenue (MRR)',
      'Customer Acquisition Cost (CAC)',
      'Product Education',
      'Technical Resources'
    budgetAllocation: [
      { channel: '
      
    ],
      'Pricing strategy analy
      'Content marketing strategies',
      'Partnership and int
    marketResearchAreas:
      'Buying process and 
      'Technology adoption pa
      
    implementation: [
        phase: 'Foundation (Month 1
        priority: 'High',
          'Set up analytic
          'Create core content assets',
        ]
      
        duration: '4 mo
        actions: [
          'Start Google Ads campaigns',
          'Set up email nurture sequences'
      },
        phase: 'Optimization (Month 7-12)',
      
          'A/B test ad creative
          'Implement account-based
        ]
    ]
  {
    name: 'E-commerce & Retail Strategy',
    ta
      'Revenue Growth',
      'Conversion Rate',
      'Return on Ad Spend (ROAS)',
    ],
      'Facebook & Instagram Ads',
      'Email Marketing',
      'Amazon Marketing',
    ],
      'Product Showca
      '
      'Behind-the-Scenes Content'
    budgetAllocation: [
      { channel: 'Google 
      { channel: '
    ],
      'Product pricing and positioning',
      'Customer review strategies',
      'Shipping and return policies',
    ],
      'C
      '
      'Brand loyalty factors',
    ],
      {
        duration: 
        actions: [
          'Set up conversion tracking',
          'Implement email capture strategie
      },
        p
        
       
          'Begin influencer outreach',
        ]
      {
        duration: 
        actions: [
          'Optimize for mobile experience',
          'Scale winning campaigns and product
      }
  },
    id:
    d
    
   
      'Online Reviews & Rat
      'Local Market Share'
    recommendedChannels: [
      'Local SEO',
      'Nextdoor A
      'Community Sponso
    contentPillars: [
      'Service Education
      'Behind-the-Scenes',
    ],
      { channel: 'Google Ads 
      
      { channel: 'Communit
    competitorAnalysisPoints: [
      'Review quality and qu
      'Community involve
      'Local partnership stra
    marketResearchAreas: 
      'Service demand patt
      
      'Local economic
    implementation: [
        phase: 'Local Foundatio
        priority: 'High',
          'Optimize Google M
          'Set up review manageme
      
      {
        duration: '4 months',
        actions: [
          'Start Facebook local advertising',
          'Establish community partnerships'
      },
      
        priority: 'Medium',
          'Sponsor local events and orga
          'Build referral partner network',
        ]
    ]
  {
    name: 'Professional Services Strategy',
    ta
      'Qualified Lead Gene
      'Client Lifetime Value',
      'Thought Leadership Metrics',
    ],
      'LinkedIn Marketing',
      'Speaking Engagements',
      'Content Marketing',
    ],
      'Industry Exper
      '
      'Client Success Stories'
    budgetAllocation: [
      { channel: 'Content
      { channel: '
    ],
      'Service offerings and specializa
      'Client testimonials and case studies',
      'Industry partnerships',
    ],
      'I
      '
      'Service delivery preferences'
    ],
      {
        duration: 
        actions: [
          'Create cornerstone content p
          'Identify speaking opportuni
      },
        p
        
       
          'Apply for speaking opport
        ]
      {
        duration: 
        actions: [
          'Pursue media coverage and awards
          'Scale successful lead genera
      }
  }

  con
    
   
  )

  return strategyTemplates.find(template => template.id === id)

  const templates
}
export const getAllTemplates = (): Strat
}













      'Local Community Content',
      'Service Education',
      'Customer Testimonials',
      'Behind-the-Scenes',
      'Local Events & News'
    ],
    budgetAllocation: [
      { channel: 'Google Ads (Local)', percentage: 40, description: 'Capture local search intent' },
      { channel: 'Facebook Local Ads', percentage: 25, description: 'Target nearby customers' },
      { channel: 'SEO & Content', percentage: 20, description: 'Build local search authority' },
      { channel: 'Review Management', percentage: 10, description: 'Tools and incentives for reviews' },
      { channel: 'Community Marketing', percentage: 5, description: 'Local events and sponsorships' }
    ],
    competitorAnalysisPoints: [
      'Local search visibility',
      'Review quality and quantity',
      'Service pricing and packages',
      'Community involvement',
      'Website user experience',
      'Local partnership strategies'
    ],
    marketResearchAreas: [
      'Local demographic analysis',
      'Service demand patterns',
      'Seasonal business variations',
      'Local competition density',
      'Customer service expectations',
      'Local economic factors'
    ],
    implementation: [
      {
        phase: 'Local Foundation (Month 1-2)',
        duration: '2 months',
        priority: 'High',
        actions: [
          'Optimize Google My Business listing',
          'Claim all relevant directory listings',
          'Set up review management system',
          'Create location-specific landing pages'
        ]
      },
      {
        phase: 'Visibility Building (Month 3-6)',
        duration: '4 months',
        priority: 'High',
        actions: [
          'Launch Google Ads local campaigns',
          'Start Facebook local advertising',
          'Begin content marketing for local SEO',
          'Establish community partnerships'
        ]
      },
      {
        phase: 'Community Leadership (Month 7-12)',
        duration: '6 months',
        priority: 'Medium',
        actions: [
          'Sponsor local events and organizations',
          'Create educational content series',
          'Build referral partner network',
          'Expand to additional service areas'
        ]
      }
    ]
  },
  {
    id: 'professional-services',
    name: 'Professional Services Strategy',
    description: 'Authority-building approach for consultants, agencies, and professional service providers',
    targetIndustries: ['Consulting', 'Legal', 'Accounting', 'Marketing Agencies', 'Financial Services'],
    keyMetrics: [
      'Qualified Lead Generation',
      'Average Deal Size',
      'Client Lifetime Value',
      'Referral Rate',
      'Thought Leadership Metrics',
      'Pipeline Velocity'
    ],
    recommendedChannels: [
      'LinkedIn Marketing',
      'Industry Publications',
      'Speaking Engagements',
      'Professional Networking',
      'Content Marketing',
      'Referral Programs'
    ],
    contentPillars: [
      'Industry Expertise',
      'Case Studies & Results',
      'Market Analysis & Trends',
      'Professional Insights',
      'Client Success Stories'
    ],
    budgetAllocation: [
      { channel: 'LinkedIn Marketing', percentage: 35, description: 'Build professional authority and network' },
      { channel: 'Content Creation', percentage: 30, description: 'Establish thought leadership' },
      { channel: 'Event Marketing', percentage: 20, description: 'Speaking and networking opportunities' },
      { channel: 'PR & Media', percentage: 10, description: 'Industry recognition and coverage' },
      { channel: 'Referral Incentives', percentage: 5, description: 'Reward existing client referrals' }
    ],
    competitorAnalysisPoints: [
      'Service offerings and specializations',
      'Pricing models and packages',
      'Client testimonials and case studies',
      'Professional credentials and awards',
      'Industry partnerships',
      'Thought leadership content'
    ],
    marketResearchAreas: [
      'Industry challenges and pain points',
      'Decision-making processes',
      'Budget allocation trends',
      'Trust and credibility factors',
      'Service delivery preferences',
      'Professional development needs'
    ],
    implementation: [
      {
        phase: 'Authority Building (Month 1-3)',
        duration: '3 months',
        priority: 'High',
        actions: [
          'Optimize LinkedIn profile and company page',
          'Create cornerstone content pieces',
          'Establish email newsletter program',
          'Identify speaking opportunities'
        ]
      },
      {
        phase: 'Visibility Expansion (Month 4-8)',
        duration: '5 months',
        priority: 'High',
        actions: [
          'Launch LinkedIn advertising campaigns',
          'Publish regular industry insights',
          'Apply for speaking opportunities',
          'Build strategic partnerships'
        ]
      },
      {
        phase: 'Market Leadership (Month 9-12)',
        duration: '4 months',
        priority: 'Medium',
        actions: [
          'Host industry events or webinars',
          'Pursue media coverage and awards',
          'Expand referral partner network',
          'Scale successful lead generation channels'
        ]
      }
    ]
  }
]

export const getTemplatesByIndustry = (industry: string): StrategyTemplate[] => {
  const normalizedIndustry = industry.toLowerCase()
  return strategyTemplates.filter(template => 
    template.targetIndustries.some(targetIndustry => 
      targetIndustry.toLowerCase().includes(normalizedIndustry) ||
      normalizedIndustry.includes(targetIndustry.toLowerCase())
    )
  )
}

export const getTemplateById = (id: string): StrategyTemplate | undefined => {
  return strategyTemplates.find(template => template.id === id)
}

export const getAllTemplates = (): StrategyTemplate[] => {
  return strategyTemplates
}