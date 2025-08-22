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
      'Customer Lifetime Value (CLV)',
      'Lead-to-Customer Conversion Rate',
      'Trial-to-Paid Conversion Rate',
      'Churn Rate'
    ],
    recommendedChannels: [
      'Google Ads (Search & Display)',
      'LinkedIn Marketing',
      'Content Marketing',
      'Email Marketing',
      'Webinars & Product Demos',
      'Partner Referrals'
    ],
    contentPillars: [
      'Product Education',
      'Industry Best Practices',
      'Case Studies & Success Stories',
      'Technical Resources',
      'Thought Leadership'
    ],
    budgetAllocation: [
      { channel: 'Google Ads', percentage: 35, description: 'Capture high-intent search traffic' },
      { channel: 'LinkedIn Marketing', percentage: 25, description: 'Target decision-makers and influencers' },
      { channel: 'Content Marketing', percentage: 20, description: 'Build authority and organic traffic' },
      { channel: 'Email Marketing', percentage: 10, description: 'Nurture leads through sales funnel' },
      { channel: 'Events & Webinars', percentage: 10, description: 'Demonstrate product value and expertise' }
    ],
    competitorAnalysisPoints: [
      'Feature comparison and positioning',
      'Pricing strategy analysis',
      'Content marketing strategies',
      'Partnership and integration ecosystem',
      'Customer testimonials and case studies',
      'Sales process and demo approach'
    ],
    marketResearchAreas: [
      'Target persona pain points and motivations',
      'Buying process and decision criteria',
      'Technology adoption patterns',
      'Industry compliance requirements',
      'Integration and scalability needs',
      'Budget allocation and procurement processes'
    ],
    implementation: [
      {
        phase: 'Foundation (Month 1-2)',
        duration: '2 months',
        priority: 'High',
        actions: [
          'Set up analytics and conversion tracking',
          'Create core landing pages for key features',
          'Develop lead magnets (whitepapers, tools)',
          'Create core content assets',
          'Set up email marketing automation'
        ]
      },
      {
        phase: 'Growth Acceleration (Month 3-6)',
        duration: '4 months',
        priority: 'High',
        actions: [
          'Launch Google Ads campaigns',
          'Start LinkedIn advertising',
          'Begin content marketing program',
          'Set up email nurture sequences',
          'Create product demo videos'
        ]
      },
      {
        phase: 'Optimization (Month 7-12)',
        duration: '6 months',
        priority: 'Medium',
        actions: [
          'A/B test ad creative and landing pages',
          'Implement account-based marketing',
          'Launch partner referral program',
          'Create advanced content series',
          'Optimize conversion funnel'
        ]
      }
    ]
  },
  {
    id: 'ecommerce-retail',
    name: 'E-commerce & Retail Strategy',
    description: 'Multi-channel approach for online retailers to maximize sales and customer lifetime value',
    targetIndustries: ['E-commerce', 'Retail', 'Fashion', 'Consumer Goods', 'Marketplace Sellers'],
    keyMetrics: [
      'Revenue Growth',
      'Conversion Rate',
      'Average Order Value (AOV)',
      'Return on Ad Spend (ROAS)',
      'Customer Acquisition Cost (CAC)',
      'Customer Lifetime Value (CLV)'
    ],
    recommendedChannels: [
      'Google Shopping & Search Ads',
      'Facebook & Instagram Ads',
      'Email Marketing',
      'Influencer Partnerships',
      'Amazon Marketing',
      'Retargeting Campaigns'
    ],
    contentPillars: [
      'Product Showcases',
      'Lifestyle & Inspiration',
      'Customer Reviews & UGC',
      'Educational Content',
      'Behind-the-Scenes Content'
    ],
    budgetAllocation: [
      { channel: 'Google Ads', percentage: 30, description: 'Capture purchase-intent searches' },
      { channel: 'Facebook & Instagram Ads', percentage: 25, description: 'Visual product discovery and retargeting' },
      { channel: 'Email Marketing', percentage: 15, description: 'Customer retention and repeat purchases' },
      { channel: 'Influencer Marketing', percentage: 15, description: 'Build brand awareness and social proof' },
      { channel: 'Amazon Advertising', percentage: 10, description: 'Marketplace visibility and sales' },
      { channel: 'Content Creation', percentage: 5, description: 'Product photography and video content' }
    ],
    competitorAnalysisPoints: [
      'Product pricing and positioning',
      'Social media presence and engagement',
      'Customer review strategies',
      'Shipping and return policies',
      'Website user experience',
      'Promotional strategies and discounts'
    ],
    marketResearchAreas: [
      'Consumer shopping behavior trends',
      'Price sensitivity and positioning',
      'Seasonal demand patterns',
      'Product discovery preferences',
      'Brand loyalty factors',
      'Mobile shopping experience expectations'
    ],
    implementation: [
      {
        phase: 'Foundation Setup (Month 1-2)',
        duration: '2 months',
        priority: 'High',
        actions: [
          'Set up conversion tracking and analytics',
          'Optimize product pages for conversions',
          'Create Google Shopping feed',
          'Implement email capture strategies',
          'Set up retargeting pixels'
        ]
      },
      {
        phase: 'Channel Expansion (Month 3-6)',
        duration: '4 months',
        priority: 'High',
        actions: [
          'Launch Google Shopping campaigns',
          'Start Facebook and Instagram advertising',
          'Begin email marketing campaigns',
          'Begin influencer outreach',
          'Set up Amazon seller account and advertising'
        ]
      },
      {
        phase: 'Optimization & Scale (Month 7-12)',
        duration: '6 months',
        priority: 'Medium',
        actions: [
          'Optimize for mobile experience',
          'Implement customer loyalty program',
          'Scale winning campaigns and products',
          'Launch seasonal promotional campaigns',
          'Expand to new product categories'
        ]
      }
    ]
  },
  {
    id: 'local-business',
    name: 'Local Business Strategy',
    description: 'Community-focused marketing approach for brick-and-mortar and local service businesses',
    targetIndustries: ['Restaurants', 'Healthcare', 'Home Services', 'Retail Stores', 'Professional Services'],
    keyMetrics: [
      'Local Search Rankings',
      'Google My Business Engagement',
      'Online Reviews & Ratings',
      'Foot Traffic & Store Visits',
      'Local Market Share',
      'Customer Retention Rate'
    ],
    recommendedChannels: [
      'Google My Business',
      'Local SEO',
      'Facebook Local Ads',
      'Nextdoor Advertising',
      'Community Sponsorships',
      'Local Print & Radio'
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

export const getAllTemplates = (): StrategyTemplate[] => {
  return strategyTemplates
}

export const getRecommendedTemplate = (industry: string): StrategyTemplate | undefined => {
  const recommendations = getTemplatesByIndustry(industry)
  return recommendations.length > 0 ? recommendations[0] : strategyTemplates[0]
}