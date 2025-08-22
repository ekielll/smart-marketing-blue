export interface StrategyTemplate {
  id: string
  name: string
  description: string
  targetIndustries: string[]
  keyMetrics: string[]
  recommendedChannels: string[]
  contentPillars: string[]
  budgetAllocation: {
    channel: string
    percentage: number
    description: string
  }[]
  competitorAnalysisPoints: string[]
  marketResearchAreas: string[]
  implementation: {
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
      'Lifetime Value (LTV)',
      'Lead-to-Customer Conversion Rate',
      'Free Trial to Paid Conversion',
      'Churn Rate'
    ],
    recommendedChannels: [
      'LinkedIn Advertising',
      'Google Ads (Search & Display)',
      'Content Marketing',
      'Email Marketing',
      'Webinars & Events',
      'Industry Publications'
    ],
    contentPillars: [
      'Industry Insights & Trends',
      'Thought Leadership',
      'Product Education',
      'Case Studies & Success Stories',
      'Technical Resources'
    ],
    budgetAllocation: [
      { channel: 'LinkedIn Ads', percentage: 30, description: 'Target decision-makers and key stakeholders' },
      { channel: 'Content Marketing', percentage: 25, description: 'Build authority and drive organic traffic' },
      { channel: 'Google Ads', percentage: 20, description: 'Capture high-intent search traffic' },
      { channel: 'Email Marketing', percentage: 15, description: 'Nurture leads through sales funnel' },
      { channel: 'Events & Webinars', percentage: 10, description: 'Build relationships and demonstrate expertise' }
    ],
    competitorAnalysisPoints: [
      'Pricing strategy analysis',
      'Feature comparison and positioning',
      'Content marketing strategies',
      'Sales process and free trial offerings',
      'Partnership and integration strategies'
    ],
    marketResearchAreas: [
      'Industry pain points and challenges',
      'Buying process and decision criteria',
      'Budget allocation trends',
      'Technology adoption patterns',
      'Regulatory and compliance requirements',
      'Market size and growth projections'
    ],
    implementation: [
      {
        phase: 'Foundation (Month 1-2)',
        duration: '2 months',
        priority: 'High',
        actions: [
          'Set up analytics and tracking',
          'Optimize website for conversions',
          'Create core content assets',
          'Implement lead scoring system'
        ]
      },
      {
        phase: 'Acquisition (Month 3-6)',
        duration: '4 months',
        priority: 'High',
        actions: [
          'Launch LinkedIn ad campaigns',
          'Start Google Ads campaigns',
          'Begin content marketing program',
          'Set up email nurture sequences'
        ]
      },
      {
        phase: 'Optimization (Month 7-12)',
        duration: '6 months',
        priority: 'Medium',
        actions: [
          'A/B test ad creatives and landing pages',
          'Expand to new channels based on performance',
          'Implement account-based marketing',
          'Scale successful campaigns'
        ]
      }
    ]
  },
  {
    id: 'ecommerce-retail',
    name: 'E-commerce & Retail Strategy',
    description: 'Comprehensive approach for online and physical retail businesses',
    targetIndustries: ['E-commerce', 'Retail', 'Fashion', 'Consumer Goods', 'Electronics'],
    keyMetrics: [
      'Revenue Growth',
      'Average Order Value (AOV)',
      'Conversion Rate',
      'Customer Acquisition Cost (CAC)',
      'Return on Ad Spend (ROAS)',
      'Cart Abandonment Rate'
    ],
    recommendedChannels: [
      'Facebook & Instagram Ads',
      'Google Shopping Ads',
      'Email Marketing',
      'Influencer Marketing',
      'Amazon Marketing',
      'TikTok Advertising'
    ],
    contentPillars: [
      'Product Showcases & Reviews',
      'User-Generated Content',
      'Lifestyle & Inspiration',
      'Educational Content',
      'Behind-the-Scenes Content'
    ],
    budgetAllocation: [
      { channel: 'Facebook/Instagram Ads', percentage: 35, description: 'Visual product advertising and retargeting' },
      { channel: 'Google Shopping', percentage: 25, description: 'Capture high-intent shoppers' },
      { channel: 'Email Marketing', percentage: 15, description: 'Customer retention and upselling' },
      { channel: 'Influencer Marketing', percentage: 15, description: 'Build brand awareness and social proof' },
      { channel: 'Amazon/Marketplace Ads', percentage: 10, description: 'Reach customers on their platforms' }
    ],
    competitorAnalysisPoints: [
      'Product pricing and positioning',
      'Social media presence and engagement',
      'Customer review strategies',
      'Promotional and discount strategies',
      'Shipping and return policies',
      'Brand partnerships and collaborations'
    ],
    marketResearchAreas: [
      'Consumer shopping behaviors',
      'Seasonal trends and patterns',
      'Price sensitivity analysis',
      'Product feature preferences',
      'Brand loyalty factors',
      'Mobile vs desktop shopping habits'
    ],
    implementation: [
      {
        phase: 'Setup (Month 1)',
        duration: '1 month',
        priority: 'High',
        actions: [
          'Optimize product listings and descriptions',
          'Set up conversion tracking',
          'Create branded social media content',
          'Implement email capture strategies'
        ]
      },
      {
        phase: 'Launch (Month 2-4)',
        duration: '3 months',
        priority: 'High',
        actions: [
          'Start Facebook/Instagram campaigns',
          'Launch Google Shopping ads',
          'Begin influencer outreach',
          'Implement email marketing campaigns'
        ]
      },
      {
        phase: 'Scale (Month 5-12)',
        duration: '8 months',
        priority: 'Medium',
        actions: [
          'Expand to additional platforms',
          'Optimize for mobile experience',
          'Implement loyalty programs',
          'Scale winning campaigns and products'
        ]
      }
    ]
  },
  {
    id: 'local-services',
    name: 'Local Services Strategy',
    description: 'Location-based marketing for service businesses',
    targetIndustries: ['Healthcare', 'Legal', 'Home Services', 'Restaurants', 'Professional Services'],
    keyMetrics: [
      'Local Search Rankings',
      'Website Traffic from Local Area',
      'Phone Calls Generated',
      'Online Reviews & Ratings',
      'Foot Traffic (for physical locations)',
      'Local Market Share'
    ],
    recommendedChannels: [
      'Google My Business',
      'Local SEO',
      'Facebook Local Ads',
      'Nextdoor Advertising',
      'Local Directory Listings',
      'Community Sponsorships'
    ],
    contentPillars: [
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

export const getRecommendedTemplate = (industry: string): StrategyTemplate | undefined => {
  const templates = getTemplatesByIndustry(industry)
  return templates.length > 0 ? templates[0] : undefined
}

export const getAllTemplates = (): StrategyTemplate[] => {
  return strategyTemplates
}