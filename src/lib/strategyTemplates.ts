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
    priority: 'High' | 'Medium' | 'Low'
    actions: string[]
  }[]
}

export const strategyTemplates: StrategyTemplate[] = [
  {
    id: 'b2b-saas',
    name: 'B2B SaaS Growth Strategy',
    description: 'Proven framework for software companies targeting business customers',
    targetIndustries: ['Software', 'Technology', 'SaaS', 'IT Services'],
    keyMetrics: [
      'Monthly Recurring Revenue (MRR)',
      'Customer Acquisition Cost (CAC)',
      'Customer Lifetime Value (CLV)',
      'Churn Rate',
      'Lead-to-Customer Conversion Rate',
      'Trial-to-Paid Conversion Rate'
    ],
    recommendedChannels: [
      'LinkedIn Advertising',
      'Google Ads (Search & Display)',
      'Content Marketing',
      'Email Marketing',
      'Webinar Marketing',
      'Industry Events'
    ],
    contentPillars: [
      'Product Education & Tutorials',
      'Industry Insights & Trends',
      'Customer Success Stories',
      'Thought Leadership',
      'Problem-Solution Content'
    ],
    budgetAllocation: [
      { channel: 'LinkedIn Ads', percentage: 30, description: 'Target decision-makers in specific industries' },
      { channel: 'Google Ads', percentage: 25, description: 'Capture high-intent search traffic' },
      { channel: 'Content Marketing', percentage: 20, description: 'SEO, blog, whitepapers, case studies' },
      { channel: 'Email Marketing', percentage: 10, description: 'Nurture leads and customer retention' },
      { channel: 'Events & Webinars', percentage: 15, description: 'Build authority and generate leads' }
    ],
    competitorAnalysisPoints: [
      'Feature comparison and differentiation',
      'Pricing strategy analysis',
      'Content marketing approach',
      'Customer testimonial themes',
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
          'Audit and update all directory listings',
          'Implement review collection system',
          'Create location-specific landing pages'
        ]
      },
      {
        phase: 'Visibility (Month 3-6)',
        duration: '4 months',
        priority: 'High',
        actions: [
          'Launch local Google Ads campaigns',
          'Start local SEO content program',
          'Begin Facebook local advertising',
          'Engage in community events'
        ]
      },
      {
        phase: 'Authority Building (Month 7-12)',
        duration: '6 months',
        priority: 'Medium',
        actions: [
          'Build local backlinks and partnerships',
          'Expand to additional local platforms',
          'Implement referral programs',
          'Focus on customer retention strategies'
        ]
      }
    ]
  },
  {
    id: 'professional-services',
    name: 'Professional Services Strategy',
    description: 'Authority-building approach for consultants, agencies, and professional firms',
    targetIndustries: ['Consulting', 'Legal', 'Accounting', 'Marketing Agency', 'Financial Services'],
    keyMetrics: [
      'Qualified Lead Generation',
      'Consultation Bookings',
      'Proposal-to-Close Rate',
      'Average Project Value',
      'Client Lifetime Value',
      'Referral Rate'
    ],
    recommendedChannels: [
      'LinkedIn Marketing',
      'Content Marketing',
      'Speaking Engagements',
      'Email Newsletters',
      'Referral Programs',
      'Industry Publications'
    ],
    contentPillars: [
      'Industry Expertise & Insights',
      'Case Studies & Results',
      'Thought Leadership',
      'Educational Content',
      'Market Analysis & Trends'
    ],
    budgetAllocation: [
      { channel: 'Content Marketing', percentage: 35, description: 'Build authority through valuable content' },
      { channel: 'LinkedIn Marketing', percentage: 30, description: 'Network and reach decision-makers' },
      { channel: 'Speaking & Events', percentage: 20, description: 'Build credibility and network' },
      { channel: 'Email Marketing', percentage: 10, description: 'Nurture relationships and leads' },
      { channel: 'Referral Programs', percentage: 5, description: 'Incentivize client referrals' }
    ],
    competitorAnalysisPoints: [
      'Service offerings and specializations',
      'Thought leadership presence',
      'Client testimonials and case studies',
      'Pricing and service packages',
      'Professional credentials and certifications',
      'Industry awards and recognition'
    ],
    marketResearchAreas: [
      'Industry challenges and pain points',
      'Decision-making processes',
      'Budget allocation trends',
      'Preferred communication channels',
      'Trust and credibility factors',
      'Service delivery expectations'
    ],
    implementation: [
      {
        phase: 'Authority Setup (Month 1-3)',
        duration: '3 months',
        priority: 'High',
        actions: [
          'Develop thought leadership content strategy',
          'Optimize LinkedIn profile and company page',
          'Create core service landing pages',
          'Establish email newsletter program'
        ]
      },
      {
        phase: 'Visibility Building (Month 4-8)',
        duration: '5 months',
        priority: 'High',
        actions: [
          'Publish regular industry insights',
          'Engage in LinkedIn conversations',
          'Apply for speaking opportunities',
          'Build strategic partnerships'
        ]
      },
      {
        phase: 'Authority Scaling (Month 9-12)',
        duration: '4 months',
        priority: 'Medium',
        actions: [
          'Guest post on industry publications',
          'Host webinars and workshops',
          'Develop referral partner network',
          'Create premium content offerings'
        ]
      }
    ]
  }
]

export const getRecommendedTemplate = (industry: string): StrategyTemplate | null => {
  const normalizedIndustry = industry.toLowerCase()
  
  for (const template of strategyTemplates) {
    if (template.targetIndustries.some(target => 
      normalizedIndustry.includes(target.toLowerCase()) || 
      target.toLowerCase().includes(normalizedIndustry)
    )) {
      return template
    }
  }
  
  return null
}

export const getAllTemplates = (): StrategyTemplate[] => {
  return strategyTemplates
}