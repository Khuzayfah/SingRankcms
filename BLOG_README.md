# SingRank Blog System

This document provides instructions on how to use and manage the SingRank blog system.

## Overview

The SingRank blog system is built using Next.js and Markdown files. It provides a professional, responsive blog with features like:

- Elegant article layout with proper typography
- Table of Contents generation
- Featured posts
- Related articles
- Tag filtering
- Author information
- Social sharing

## Getting Started

### Setup

1. Run the setup script to create the necessary directories and sample posts:

```bash
npm run setup-blog
```

This will:
- Create the `_posts` directory if it doesn't exist
- Add sample blog posts if none exist
- Create necessary image directories

2. Start the development server:

```bash
npm run dev
```

3. Visit `http://localhost:3000/blog` to see your blog.

## Managing Blog Posts

### Creating a New Post

1. Create a new Markdown (`.md`) file in the `_posts` directory.
2. Name the file using the post's slug (e.g., `my-new-post.md`).
3. Add the required frontmatter at the top of the file:

```markdown
---
title: "Your Post Title"
description: "A brief description of your post"
date: "2023-11-15"
modifiedDate: "2023-11-16"  # Optional
thumbnail: "/images/blog/your-image.jpg"
featured: false  # Set to true to feature this post
tags: ["Tag1", "Tag2", "Tag3"]
author:
  name: "Author Name"
  title: "Author Title"
  image: "/images/authors/author.jpg"
---

# Your Post Title

Your content goes here...
```

4. Write your post content using Markdown syntax.

### Markdown Features

The blog system supports standard Markdown syntax plus some enhancements:

- **Headings**: Use `#` for h1, `##` for h2, etc.
- **Lists**: Use `-` or `*` for unordered lists, and numbers for ordered lists
- **Links**: `[Link text](URL)`
- **Images**: `![Alt text](image-url)`
- **Bold**: `**bold text**`
- **Italic**: `*italic text*`
- **Blockquotes**: Start lines with `>`
- **Code blocks**: Use triple backticks (```) with optional language name

Example:

```markdown
## Section Heading

This is a paragraph with **bold** and *italic* text.

> This is a blockquote with an important note.

- List item 1
- List item 2
- List item 3

```javascript
// This is a code block
function example() {
  return "Hello World";
}
```

### Images

1. Place blog post images in the `public/images/blog/` directory.
2. Place author images in the `public/images/authors/` directory.
3. Reference images in your Markdown using the path from the `public` directory:

```markdown
![Image description](/images/blog/your-image.jpg)
```

4. For the post thumbnail, specify the path in the frontmatter:

```yaml
thumbnail: "/images/blog/your-image.jpg"
```

## Table of Contents

The system automatically generates a Table of Contents based on the headings in your post (h2, h3, and h4 levels). No additional configuration is needed.

## API Routes

The blog system includes API routes for fetching posts:

- `GET /api/blog/posts` - Get all blog posts
  - Query parameters:
    - `limit`: Maximum number of posts to return
    - `category`: Filter by category
    - `tag`: Filter by tag
- `GET /api/blog/post?slug=your-post-slug` - Get a specific post by slug

## Customization

### Styling

The blog uses Tailwind CSS for styling. You can customize the appearance by:

1. Modifying the Tailwind classes in the components
2. Adjusting the theme colors in `tailwind.config.js`
3. Adding custom CSS in `app/globals.css`

### Layout

The main blog components are:
- `app/blog/page.tsx` - Blog listing page
- `app/blog/[id]/page.tsx` - Blog post detail page

## Troubleshooting

### Posts Not Appearing

1. Check that your Markdown files are in the correct directory (`_posts/`).
2. Verify that the frontmatter is correctly formatted with no syntax errors.
3. Make sure the date is in a valid format (YYYY-MM-DD).
4. Check the console for any error messages.

### Images Not Loading

1. Confirm that images are in the correct directory (`public/images/blog/` or `public/images/authors/`).
2. Verify that the paths in your Markdown and frontmatter are correct.
3. Check for typos in file names or paths.

## Need Help?

If you encounter any issues or have questions about the blog system, please contact the development team.

---

Happy blogging with SingRank! 