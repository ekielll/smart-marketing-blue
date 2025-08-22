export interface StrategyTemplate {
  id: string
  description:
  keyMetrics: string[
  contentPillars: string[]
    channel: string
    description: string
  competitorAnalysisPoints
  budgetAllocation: {
    channel: string
    percentage: number
    description: string
  }[]
  competitorAnalysisPoints: string[]
  marketResearchAreas: string[]
  implementation: {
export const stra
    id: 'b2b-saas',
    description: 'Proven framework for 
    keyMetrics: [
     
 

    recommendedChannels: [
   
      'Email Market
      'Industry Events'
    contentPillars: [
      'Industry Insights & Trends',
      'Thought Le
    ],
      { channel: 'LinkedIn Ads', percent
      { channel: 'Content Marketing', 
      { channel: 'E
    competitorAnalysisPoints: [
      'Pricing strategy analysis',
      
      'Partnership and int
    marketResearchAreas: [
      'Buying process and decision cri
      'Technology adoption
      'Market size and g
    implementation: [
        phase: 'Foundat
      
          'Set up ana
          'Create core content assets'
        ]
      {
        duration: '4 months
        actions: [
      
          'Set up email
      },
        phase: 'Optimization (Month 7-12)',
        priority: 'Medium',
          'A/B test ad creatives and landing pages',
          'Implement account-based marketing',
      
    ]
  {
    name: 'E-commerce & Retail Str
    targetIndustries: ['E-commerce'
      'Revenue Growth',
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
      'Market Analysis & Trends'
    budgetAllocation: [
      { channel: 'LinkedIn Marketing', percentage:
      { c
    ],
      '
      'Client testimonials and case stud
      'Professional credentia
    ],
      'Industry ch
      'Budget allocation trends',
      'Trust and credibility factors',
    ],
      {
        d
        
       
          'Establish email newsletter program'
      },
        phase: 'Visibility 
        priority: 
          'Publish regular industry insights',
          'Apply for speaking opportunities',
        ]
      {
        d
       
     
    
   
  }

  const normalizedIndustry = industry.toLowerCase()
  for (const template of strategyTemplates) {
      normalizedI
    )) {
    }
  
}
export const getAllTemplates =
}






























































































