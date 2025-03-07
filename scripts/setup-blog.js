/**
 * Blog Setup Script
 * 
 * This script ensures the blog posts directory exists and contains sample content.
 * It creates the _posts directory if it doesn't exist and adds sample markdown files.
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Configuration
const POSTS_DIR = path.join(process.cwd(), '_posts');
const SAMPLE_POSTS = [
  {
    filename: 'getting-started-with-singrank.md',
    content: `---
title: "Getting Started with SingRank: Your Guide to Digital Marketing Success"
description: "Learn how to leverage SingRank's powerful tools to boost your online presence and drive meaningful results for your business."
date: "2023-09-15"
modifiedDate: "2023-10-20"
thumbnail: "/images/blog/getting-started.jpg"
featured: true
tags: ["Digital Marketing", "SEO", "Getting Started"]
author:
  name: "Alex Johnson"
  title: "Head of Marketing"
  image: "/images/authors/alex.jpg"
---

# Getting Started with SingRank

Welcome to SingRank, your all-in-one digital marketing platform designed to help businesses of all sizes succeed online. In this comprehensive guide, we'll walk you through the essential features and show you how to get the most out of our platform.

## Why Digital Marketing Matters

In today's digital-first world, having a strong online presence is no longer optional—it's essential. Here's why:

- **Increased Visibility**: Reach potential customers where they spend most of their time.
- **Cost-Effective**: Digital marketing often provides better ROI than traditional methods.
- **Measurable Results**: Track performance and adjust strategies in real-time.
- **Targeted Approach**: Reach specific demographics with precision.

## Key Features of SingRank

### SEO Optimization

Our advanced SEO tools help you climb search engine rankings and drive organic traffic to your website.

\`\`\`javascript
// Example of how our API can be used to track rankings
const rankings = await singrank.trackKeywords({
  domain: 'yourbusiness.com',
  keywords: ['digital marketing', 'SEO services']
});
\`\`\`

### Content Marketing

Create compelling content that resonates with your audience and drives engagement.

### Social Media Management

Manage all your social media accounts from one intuitive dashboard.

### Analytics & Reporting

Get detailed insights into your marketing performance with our comprehensive analytics.

## Getting Started in 5 Steps

1. **Create Your Account**: Sign up at [singrank.com](https://singrank.com)
2. **Set Up Your Profile**: Add your business details and preferences
3. **Connect Your Platforms**: Link your website, social media, and other digital assets
4. **Define Your Goals**: Set clear objectives for your digital marketing efforts
5. **Launch Your First Campaign**: Put your strategy into action

## Best Practices for Success

To maximize your results with SingRank, consider these best practices:

> "The key to digital marketing success is consistency and adaptation. Keep testing, learning, and refining your approach." - Alex Johnson

### Regular Content Updates

Keeping your content fresh and relevant is crucial for SEO and audience engagement.

### Data-Driven Decisions

Let the analytics guide your strategy adjustments and resource allocation.

### Multi-Channel Approach

Don't put all your eggs in one basket—leverage multiple digital channels for maximum impact.

## Conclusion

SingRank is more than just a tool—it's your partner in digital marketing success. By following this guide and consistently applying the principles outlined, you'll be well on your way to achieving your business goals online.

Ready to take your digital marketing to the next level? [Contact our team](https://singrank.com/contact) for personalized support and strategies tailored to your specific needs.`
  },
  {
    filename: 'seo-best-practices-2023.md',
    content: `---
title: "SEO Best Practices for 2023: What's Changed and What Works Now"
description: "Stay ahead of the competition with the latest SEO strategies and techniques that are driving results in 2023."
date: "2023-08-10"
thumbnail: "/images/blog/seo-practices.jpg"
featured: false
tags: ["SEO", "Digital Strategy", "Content Marketing"]
author:
  name: "Sarah Chen"
  title: "SEO Specialist"
  image: "/images/authors/sarah.jpg"
---

# SEO Best Practices for 2023

Search engine optimization continues to evolve at a rapid pace. What worked a few years ago may not be effective today. In this article, we'll explore the most important SEO trends and best practices for 2023.

## Core Web Vitals: More Important Than Ever

Google's Page Experience update has made Core Web Vitals a critical ranking factor. These metrics measure:

- **Largest Contentful Paint (LCP)**: Loading performance
- **First Input Delay (FID)**: Interactivity
- **Cumulative Layout Shift (CLS)**: Visual stability

### How to Improve Your Core Web Vitals

1. Optimize image sizes and formats
2. Implement lazy loading for below-the-fold content
3. Minimize JavaScript execution time
4. Reserve space for dynamic elements to prevent layout shifts

## E-A-T: Expertise, Authoritativeness, Trustworthiness

Google continues to emphasize E-A-T in its evaluation of content quality. To improve your E-A-T:

- Display clear author credentials and expertise
- Cite reputable sources
- Keep content up-to-date and accurate
- Build a strong backlink profile from authoritative sites

## AI-Generated Content: Proceed with Caution

With the rise of AI writing tools, Google has updated its guidelines on AI-generated content. The key takeaway: AI-generated content is not inherently problematic, but it must provide value and meet quality standards.

## Mobile-First Indexing is Non-Negotiable

Google now uses the mobile version of your site for indexing and ranking. Ensure your mobile experience is:

- Fast-loading
- Easy to navigate
- Free of intrusive interstitials
- Properly formatted for small screens

## Local SEO: Hyperlocal Targeting

For businesses with physical locations, local SEO continues to grow in importance:

1. Optimize your Google Business Profile
2. Generate authentic customer reviews
3. Create location-specific content
4. Build local backlinks

## Voice Search Optimization

With the growing use of voice assistants, optimizing for voice search is increasingly important:

- Focus on conversational, long-tail keywords
- Answer common questions directly
- Implement schema markup
- Aim for featured snippets

## Conclusion

SEO in 2023 requires a holistic approach that balances technical excellence, high-quality content, and user experience. By staying current with these best practices, you'll position your website for success in an increasingly competitive digital landscape.

Need help implementing these strategies? [Contact our SEO team](https://singrank.com/contact) for a personalized consultation.`
  },
  {
    filename: 'content-marketing-strategy.md',
    content: `---
title: "Building a Content Marketing Strategy That Converts"
description: "Learn how to create and implement a content marketing strategy that drives engagement, builds trust, and converts visitors into customers."
date: "2023-07-05"
thumbnail: "/images/blog/content-marketing.jpg"
featured: true
tags: ["Content Marketing", "Digital Strategy", "Conversion Optimization"]
author:
  name: "Michael Rodriguez"
  title: "Content Director"
  image: "/images/authors/michael.jpg"
---

# Building a Content Marketing Strategy That Converts

Content marketing has evolved from a nice-to-have to an essential component of any successful digital marketing strategy. But creating content without a clear strategy is like sailing without a compass—you might move, but you're unlikely to reach your destination.

## The Foundation: Setting Clear Objectives

Before creating any content, define what you want to achieve:

- **Brand Awareness**: Introducing your brand to new audiences
- **Audience Engagement**: Building relationships with your audience
- **Lead Generation**: Capturing contact information from potential customers
- **Conversion**: Turning prospects into customers
- **Customer Retention**: Keeping existing customers engaged and loyal

Each objective requires different types of content and distribution strategies.

## Know Your Audience Inside Out

Effective content marketing starts with a deep understanding of your audience:

### Create Detailed Buyer Personas

Document the characteristics of your ideal customers:

- Demographics (age, location, income, etc.)
- Challenges and pain points
- Goals and aspirations
- Information sources they trust
- Decision-making factors

### Map the Customer Journey

Different content serves different purposes along the customer journey:

1. **Awareness Stage**: Educational blog posts, infographics, and videos
2. **Consideration Stage**: Case studies, webinars, and comparison guides
3. **Decision Stage**: Product demos, testimonials, and free trials

## Content Creation: Quality Over Quantity

The internet is saturated with content. To stand out:

- **Provide Unique Value**: Offer insights or perspectives not available elsewhere
- **Be Comprehensive**: Cover topics thoroughly to become a trusted resource
- **Maintain High Standards**: Ensure accuracy, readability, and visual appeal
- **Tell Stories**: Use storytelling to make your content memorable and engaging

## Distribution: Getting Your Content Seen

Creating great content is only half the battle. You also need a solid distribution strategy:

### Owned Media

- Optimize your website and blog for SEO
- Leverage email marketing to reach your subscriber base
- Cross-promote content across your digital properties

### Earned Media

- Build relationships with industry influencers
- Pursue guest posting opportunities
- Engage in communities where your audience gathers

### Paid Media

- Use targeted social media advertising
- Implement pay-per-click campaigns
- Consider content discovery platforms

## Measurement: Tracking What Matters

To refine your strategy over time, track these key metrics:

- **Traffic**: Overall visitors, traffic sources, and page views
- **Engagement**: Time on page, bounce rate, and social shares
- **Lead Generation**: Form completions, email sign-ups
- **Conversion**: Content-attributed sales and conversion rates
- **ROI**: Return on content investment

## Conclusion

A successful content marketing strategy requires careful planning, quality execution, strategic distribution, and ongoing measurement. By following these principles, you'll create content that not only attracts visitors but converts them into loyal customers.

Ready to elevate your content marketing? [Contact our team](https://singrank.com/contact) for expert guidance tailored to your business goals.`
  }
];

// Create posts directory if it doesn't exist
console.log(`Checking if posts directory exists at: ${POSTS_DIR}`);
if (!fs.existsSync(POSTS_DIR)) {
  console.log(`Creating posts directory: ${POSTS_DIR}`);
  fs.mkdirSync(POSTS_DIR, { recursive: true });
}

// Create sample posts
SAMPLE_POSTS.forEach(post => {
  const filePath = path.join(POSTS_DIR, post.filename);
  
  // Only create the file if it doesn't exist
  if (!fs.existsSync(filePath)) {
    console.log(`Creating sample post: ${post.filename}`);
    fs.writeFileSync(filePath, post.content);
  } else {
    console.log(`Sample post already exists: ${post.filename}`);
  }
});

// Create images directory for blog posts if it doesn't exist
const IMAGES_DIR = path.join(process.cwd(), 'public', 'images', 'blog');
if (!fs.existsSync(IMAGES_DIR)) {
  console.log(`Creating images directory: ${IMAGES_DIR}`);
  fs.mkdirSync(IMAGES_DIR, { recursive: true });
}

// Create authors directory for profile images if it doesn't exist
const AUTHORS_DIR = path.join(process.cwd(), 'public', 'images', 'authors');
if (!fs.existsSync(AUTHORS_DIR)) {
  console.log(`Creating authors directory: ${AUTHORS_DIR}`);
  fs.mkdirSync(AUTHORS_DIR, { recursive: true });
}

// Create a default image if it doesn't exist
const DEFAULT_IMAGE = path.join(IMAGES_DIR, 'default.jpg');
if (!fs.existsSync(DEFAULT_IMAGE)) {
  console.log(`Creating default blog image: ${DEFAULT_IMAGE}`);
  // Create a simple placeholder image or copy from assets
  try {
    // Try to copy from assets if available
    const assetsDir = path.join(process.cwd(), 'assets');
    if (fs.existsSync(path.join(assetsDir, 'default-blog.jpg'))) {
      fs.copyFileSync(path.join(assetsDir, 'default-blog.jpg'), DEFAULT_IMAGE);
    } else {
      // Otherwise just create an empty file as placeholder
      fs.writeFileSync(DEFAULT_IMAGE, '');
      console.log('Created empty placeholder image. Please replace with a real image.');
    }
  } catch (error) {
    console.error('Error creating default image:', error);
  }
}

// Create a default author image if it doesn't exist
const DEFAULT_AUTHOR_IMAGE = path.join(AUTHORS_DIR, 'default.jpg');
if (!fs.existsSync(DEFAULT_AUTHOR_IMAGE)) {
  console.log(`Creating default author image: ${DEFAULT_AUTHOR_IMAGE}`);
  // Create a simple placeholder image or copy from assets
  try {
    // Try to copy from assets if available
    const assetsDir = path.join(process.cwd(), 'assets');
    if (fs.existsSync(path.join(assetsDir, 'default-author.jpg'))) {
      fs.copyFileSync(path.join(assetsDir, 'default-author.jpg'), DEFAULT_AUTHOR_IMAGE);
    } else {
      // Otherwise just create an empty file as placeholder
      fs.writeFileSync(DEFAULT_AUTHOR_IMAGE, '');
      console.log('Created empty placeholder image. Please replace with a real image.');
    }
  } catch (error) {
    console.error('Error creating default author image:', error);
  }
}

console.log('Blog setup complete! Sample posts and directories have been created.');
console.log(`Posts directory: ${POSTS_DIR}`);
console.log(`Blog images directory: ${IMAGES_DIR}`);
console.log(`Author images directory: ${AUTHORS_DIR}`);
console.log('\nYou can now run the application to see the blog in action.');
console.log('To add more posts, create markdown files in the _posts directory following the same format as the samples.'); 