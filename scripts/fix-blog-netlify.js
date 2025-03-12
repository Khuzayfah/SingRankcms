/**
 * fix-blog-netlify.js
 * 
 * Script otomatis untuk memperbaiki masalah halaman blog di Netlify.
 * Script ini akan:
 * 1. Memastikan direktori konten blog ada
 * 2. Menyiapkan contoh file markdown blog
 * 3. Menyalin konten blog ke semua lokasi yang diperlukan
 * 4. Memperbarui environment variable yang diperlukan
 * 5. Memastikan integrasi Netlify CMS berfungsi dengan baik
 */

const fs = require('fs-extra');
const path = require('path');

async function fixBlogForNetlify() {
  console.log('🔧 Mulai memperbaiki konfigurasi blog untuk Netlify...');

  // Definisikan semua path yang perlu disiapkan
  const contentBlogDir = path.join(process.cwd(), 'content/blog');
  const postsDir = path.join(process.cwd(), '_posts');
  const publicPostsDir = path.join(process.cwd(), 'public/_posts');
  const appBlogDir = path.join(process.cwd(), 'app/blog');
  const adminDir = path.join(process.cwd(), 'public/admin');
  const contentTestimonialsDir = path.join(process.cwd(), 'content/testimonials');
  const contentServicesDir = path.join(process.cwd(), 'content/services');
  const contentTeamDir = path.join(process.cwd(), 'content/team');
  const contentSettingsDir = path.join(process.cwd(), 'content/settings');
  
  // Buat contoh konten blog
  const examplePost1 = `---
title: "Pentingnya SEO untuk Bisnis Anda"
description: "Pelajari mengapa SEO sangat penting untuk kesuksesan bisnis online Anda dan strategi dasar untuk meningkatkan peringkat di mesin pencari."
date: "${new Date().toISOString().split('T')[0]}"
category: "SEO"
image: "/images/blog/seo-article.jpg"
featured: true
tags: ["SEO", "Digital Marketing", "Business"]
author:
  name: "SingRank Team"
  title: "SEO Specialist"
  image: "/images/authors/admin.jpg"
---

# Pentingnya SEO untuk Bisnis Anda

Dalam era digital saat ini, memiliki kehadiran online yang kuat adalah suatu keharusan bagi bisnis apa pun. Namun, hanya memiliki website saja tidak cukup - Anda perlu memastikan orang dapat menemukan Anda. Di sinilah Search Engine Optimization (SEO) berperan.

## Apa itu SEO?

SEO adalah proses meningkatkan kualitas dan kuantitas lalu lintas website melalui hasil mesin pencari organik (non-berbayar). Dengan kata lain, ini adalah tentang membuat website Anda muncul lebih tinggi di halaman hasil Google dan mesin pencari lainnya.

## Mengapa SEO Penting?

1. **Meningkatkan Visibilitas dan Traffic** - Peringkat yang lebih tinggi di mesin pencari berarti lebih banyak orang yang melihat dan mengunjungi website Anda.

2. **Membangun Kepercayaan dan Kredibilitas** - Website yang muncul di halaman pertama Google secara otomatis dianggap lebih terpercaya oleh pengguna.

3. **Mendatangkan Traffic Berkualitas** - Orang yang menemukan Anda melalui pencarian organik biasanya lebih tertarik dengan produk atau layanan Anda.

4. **Biaya Efektif** - Dibandingkan dengan iklan berbayar, SEO menawarkan ROI yang lebih baik dalam jangka panjang.

## Strategi SEO Dasar

- **Keyword Research** - Identifikasi kata kunci yang relevan dengan bisnis Anda
- **On-Page SEO** - Optimasi konten dan struktur halaman website
- **Technical SEO** - Pastikan website Anda cepat, aman, dan mobile-friendly
- **Link Building** - Dapatkan backlink berkualitas dari website terpercaya

## Kesimpulan

Investasi dalam SEO adalah salah satu keputusan terbaik yang dapat Anda buat untuk bisnis online Anda. Ini bukan strategi jangka pendek, tetapi hasil jangka panjangnya sangat berharga.

Butuh bantuan dengan strategi SEO Anda? [Hubungi tim kami](/contact) untuk konsultasi gratis.`;

  const examplePost2 = `---
title: "5 Strategi Content Marketing yang Efektif"
description: "Temukan strategi content marketing terbukti yang dapat membantu bisnis Anda menarik lebih banyak pelanggan dan meningkatkan konversi."
date: "${new Date(Date.now() - 86400000).toISOString().split('T')[0]}"
category: "Content Marketing"
image: "/images/blog/content-marketing.jpg"
featured: false
tags: ["Content Marketing", "Digital Strategy", "Engagement"]
author:
  name: "SingRank Team"
  title: "Content Strategist"
  image: "/images/authors/admin.jpg"
---

# 5 Strategi Content Marketing yang Efektif

Content marketing telah menjadi salah satu strategi digital marketing paling penting dalam beberapa tahun terakhir. Dengan membuat dan mendistribusikan konten yang berharga dan relevan, bisnis dapat menarik dan mempertahankan audiens sambil mendorong tindakan pelanggan yang menguntungkan.

## 1. Buat Konten Berfokus pada Audiens

Konten yang berhasil selalu dimulai dengan pemahaman mendalam tentang audiens target Anda:

- Apa masalah yang mereka hadapi?
- Informasi apa yang mereka cari?
- Format konten apa yang mereka sukai?

Memahami hal-hal ini memungkinkan Anda membuat konten yang benar-benar berguna dan menarik bagi mereka.

## 2. Gunakan Format Konten Beragam

Jangan batasi diri Anda pada satu format konten. Eksperimen dengan berbagai jenis:

- Blog posts
- Video
- Podcast
- Infografis
- Ebooks dan white papers
- Case studies

Diversifikasi format konten membantu Anda menjangkau audiens yang lebih luas dengan preferensi konsumsi konten yang berbeda.

## 3. Optimalkan untuk SEO

Content marketing dan SEO bekerja sangat baik bersama-sama. Pastikan konten Anda:

- Menargetkan kata kunci yang relevan
- Memiliki struktur yang baik dengan heading yang tepat
- Menyertakan meta description yang menarik
- Berisi internal link ke halaman relevan lainnya

## 4. Gunakan Storytelling

Manusia terhubung dengan cerita. Dengan menyematkan pesan Anda dalam narasi yang menarik, Anda membuat konten Anda jauh lebih berkesan dan mudah diingat.

Bagikan kisah pelanggan, perjalanan merek Anda, atau ilustrasi yang menghidupkan poin-poin Anda.

## 5. Distribusikan dan Promosikan Secara Strategis

Membuat konten hebat hanyalah setengah dari pertempuran - Anda juga perlu memastikan orang melihatnya:

- Bagikan di platform media sosial yang relevan
- Kirim ke pelanggan melalui email marketing
- Pertimbangkan content syndication
- Gunakan paid promotion untuk konten unggulan

## Kesimpulan

Content marketing yang efektif membutuhkan pendekatan strategis dan konsisten. Dengan fokus pada kebutuhan audiens Anda dan secara konsisten menyediakan konten berharga, Anda dapat membangun hubungan jangka panjang dengan pelanggan potensial dan meningkatkan pertumbuhan bisnis Anda.

Butuh bantuan dengan strategi content marketing Anda? [Hubungi kami](/contact) untuk mendiskusikan kebutuhan Anda.`;

  // Contoh testimonial sederhana
  const exampleTestimonial = `---
name: "John Doe"
position: "CEO"
company: "ABC Company"
quote: "SingRank telah memberikan dampak luar biasa pada bisnis online kami. Dalam 3 bulan, ranking kami naik dari halaman kedua ke posisi teratas di Google!"
avatar: "/images/testimonials/person1.jpg"
rating: 5
---`;

  // Contoh layanan
  const exampleService = `---
title: "SEO Optimization"
icon: "fa-search"
description: "Tingkatkan peringkat situs web Anda di mesin pencari dengan strategi SEO kami yang komprehensif dan terbukti."
image: "/images/services/seo.jpg"
order: 1
---

# Layanan SEO Optimization

Kami membantu bisnis Anda tampil di halaman pertama hasil pencarian Google dengan strategi SEO yang terbukti efektif.

## Apa yang Kami Tawarkan

* Audit SEO komprehensif
* Riset kata kunci mendalam
* Optimasi konten untuk mesin pencari
* Link building berkualitas tinggi
* Pelaporan hasil yang transparan

Hubungi kami sekarang untuk konsultasi gratis!`;

  // Contoh anggota tim
  const exampleTeam = `---
name: "Jane Smith"
position: "Head of SEO"
photo: "/images/team/jane.jpg"
bio: "Jane memiliki pengalaman lebih dari 10 tahun dalam industri SEO, membantu ratusan klien mencapai peringkat teratas di Google."
order: 2
---`;

  // Contoh pengaturan situs
  const generalSettings = `{
  "title": "SingRank",
  "description": "Digital Marketing Agency Terbaik di Singapura & Indonesia",
  "logo": "/images/logo.png",
  "favicon": "/images/favicon.ico",
  "mainColor": "#7857FF",
  "secondaryColor": "#1F69FF"
}`;

  const contactSettings = `{
  "email": "info@singrank.com",
  "phone": "+65 9123 4567",
  "address": "123 Robinson Road, Singapore 068913",
  "social": [
    {
      "platform": "Facebook",
      "url": "https://facebook.com/singrank",
      "icon": "fa-facebook"
    },
    {
      "platform": "Instagram",
      "url": "https://instagram.com/singrank",
      "icon": "fa-instagram"
    },
    {
      "platform": "LinkedIn",
      "url": "https://linkedin.com/company/singrank",
      "icon": "fa-linkedin"
    }
  ]
}`;

  const homeSettings = `{
  "heroTitle": "Tingkatkan Peringkat Website Anda dengan SingRank",
  "heroSubtitle": "Solusi digital marketing terbaik untuk meningkatkan visibilitas online dan menghasilkan lebih banyak leads bagi bisnis Anda",
  "heroImage": "/images/hero.jpg",
  "ctaText": "Konsultasi Gratis",
  "ctaUrl": "/contact",
  "features": [
    {
      "title": "Strategi SEO Terbukti",
      "description": "Metode SEO kami telah terbukti meningkatkan peringkat di mesin pencari secara konsisten",
      "icon": "fa-search"
    },
    {
      "title": "Content Marketing",
      "description": "Konten berkualitas tinggi yang menarik pengunjung dan meningkatkan konversi",
      "icon": "fa-edit"
    },
    {
      "title": "Analisis Kompetitor",
      "description": "Memahami strategi pesaing Anda untuk mengembangkan keunggulan kompetitif",
      "icon": "fa-chart-line"
    }
  ]
}`;

  try {
    // 1. Pastikan semua direktori konten ada
    console.log('Membuat direktori yang diperlukan...');
    await fs.ensureDir(contentBlogDir);
    await fs.ensureDir(postsDir);
    await fs.ensureDir(publicPostsDir);
    await fs.ensureDir(contentTestimonialsDir);
    await fs.ensureDir(contentServicesDir);
    await fs.ensureDir(contentTeamDir);
    await fs.ensureDir(contentSettingsDir);
    await fs.ensureDir(path.join(contentSettingsDir));
    
    // 2. Tulis contoh post ke content/blog
    console.log('Membuat contoh artikel blog...');
    await fs.writeFile(path.join(contentBlogDir, '2025-03-07-pentingnya-seo.md'), examplePost1);
    await fs.writeFile(path.join(contentBlogDir, '2025-03-08-content-marketing.md'), examplePost2);
    
    // 3. Salin ke direktori _posts
    console.log('Menyalin artikel ke direktori _posts...');
    await fs.writeFile(path.join(postsDir, '2025-03-07-pentingnya-seo.md'), examplePost1);
    await fs.writeFile(path.join(postsDir, '2025-03-08-content-marketing.md'), examplePost2);
    
    // 4. Salin ke direktori public/_posts untuk Netlify
    console.log('Menyalin artikel ke direktori public/_posts...');
    await fs.writeFile(path.join(publicPostsDir, '2025-03-07-pentingnya-seo.md'), examplePost1);
    await fs.writeFile(path.join(publicPostsDir, '2025-03-08-content-marketing.md'), examplePost2);
    
    // 5. Buat contoh konten lainnya untuk CMS
    console.log('Membuat contoh konten untuk CMS...');
    await fs.writeFile(path.join(contentTestimonialsDir, 'john-doe.md'), exampleTestimonial);
    await fs.writeFile(path.join(contentServicesDir, 'seo-optimization.md'), exampleService);
    await fs.writeFile(path.join(contentTeamDir, 'jane-smith.md'), exampleTeam);
    await fs.writeFile(path.join(contentSettingsDir, 'general.json'), generalSettings);
    await fs.writeFile(path.join(contentSettingsDir, 'contact.json'), contactSettings);
    await fs.writeFile(path.join(contentSettingsDir, 'home.json'), homeSettings);
    
    // 6. Buat .env.production dengan konfigurasi yang benar
    console.log('Memperbarui .env.production...');
    const envContent = `NEXT_PUBLIC_BLOG_CONTENT_PATH=/opt/build/repo/public/_posts\nNETLIFY=true\nNEXT_PUBLIC_NETLIFY_CMS_ENABLED=true`;
    await fs.writeFile(path.join(process.cwd(), '.env.production'), envContent);
    
    // 7. Verifikasi dan perbaiki redirects di netlify.toml
    console.log('Memperbarui konfigurasi redirects di netlify.toml...');
    const netlifyConfig = await fs.readFile(path.join(process.cwd(), 'netlify.toml'), 'utf8');
    
    let updatedConfig = netlifyConfig;
    
    // Cek apakah sudah ada redirect untuk /blog/*
    if (!netlifyConfig.includes('from = "/blog/*"')) {
      // Tambahkan redirect baru untuk /blog/*
      updatedConfig = updatedConfig.replace(
        '[[redirects]]\n  from = "/*"',
        '[[redirects]]\n  from = "/blog/*"\n  to = "/blog/:splat"\n  status = 200\n\n[[redirects]]\n  from = "/*"'
      );
    }
    
    // Pastikan ada redirect untuk /admin/*
    if (!netlifyConfig.includes('from = "/admin"')) {
      // Tambahkan redirect baru untuk /admin jika belum ada
      const redirectsSection = updatedConfig.includes('[[redirects]]') 
        ? updatedConfig 
        : updatedConfig + '\n\n[[redirects]]\n  from = "/*"\n  to = "/index.html"\n  status = 200\n  force = false';
      
      updatedConfig = redirectsSection.replace(
        '[[redirects]]',
        '[[redirects]]\n  from = "/admin"\n  to = "/admin/index.html"\n  status = 200\n\n[[redirects]]'
      );
    }
    
    // Update Netlify environment settings
    if (!updatedConfig.includes('NEXT_PUBLIC_NETLIFY_CMS_ENABLED')) {
      const envSection = updatedConfig.includes('[build.environment]')
        ? updatedConfig
        : updatedConfig + '\n\n[build.environment]\n  NODE_VERSION = "18.17.0"';
      
      updatedConfig = envSection.replace(
        '[build.environment]',
        '[build.environment]\n  NEXT_PUBLIC_NETLIFY_CMS_ENABLED = "true"'
      );
    }
    
    await fs.writeFile(path.join(process.cwd(), 'netlify.toml'), updatedConfig);
    
    // 8. Verifikasi Netlify CMS config jika ada dan perbaiki
    const cmsConfigPath = path.join(adminDir, 'config.yml');
    if (await fs.pathExists(cmsConfigPath)) {
      console.log('Memverifikasi konfigurasi Netlify CMS...');
      const cmsConfig = await fs.readFile(cmsConfigPath, 'utf8');
      
      // Pastikan branch dan media folder sudah benar
      let updatedCmsConfig = cmsConfig;
      
      if (!cmsConfig.includes('branch: main')) {
        updatedCmsConfig = updatedCmsConfig.replace(/branch: .*$/m, 'branch: main');
      }
      
      if (!cmsConfig.includes('public_folder: "/images/uploads"')) {
        updatedCmsConfig = updatedCmsConfig.replace(/public_folder: .*$/m, 'public_folder: "/images/uploads"');
      }
      
      await fs.writeFile(cmsConfigPath, updatedCmsConfig);
    }
    
    // 9. Pastikan ada script redirect untuk Netlify Identity
    const adminIndexPath = path.join(adminDir, 'index.html');
    if (await fs.pathExists(adminIndexPath)) {
      console.log('Memastikan Netlify Identity redirect berfungsi...');
      const adminIndex = await fs.readFile(adminIndexPath, 'utf8');
      
      if (!adminIndex.includes('netlifyIdentity.on("init"')) {
        const updatedAdminIndex = adminIndex.replace(
          '</body>',
          `<script>
  if (window.netlifyIdentity) {
    window.netlifyIdentity.on("init", user => {
      if (!user) {
        window.netlifyIdentity.on("login", () => {
          document.location.href = "/admin/";
        });
      }
    });
  }
</script>
</body>`
        );
        
        await fs.writeFile(adminIndexPath, updatedAdminIndex);
      }
    }
    
    // 10. Perbarui package.json dengan script build khusus untuk Netlify
    console.log('Memastikan script build Netlify tepat...');
    const packageJson = JSON.parse(await fs.readFile(path.join(process.cwd(), 'package.json'), 'utf8'));
    
    if (!packageJson.scripts['build:netlify'] || !packageJson.scripts['build:netlify'].includes('fix-blog-netlify.js')) {
      packageJson.scripts['build:netlify'] = 'node scripts/fix-blog-netlify.js && node scripts/prepare-blog-for-netlify.js && node scripts/ensure-blog-dirs.js && next build';
      await fs.writeFile(path.join(process.cwd(), 'package.json'), JSON.stringify(packageJson, null, 2));
    }
    
    console.log('✅ Konfigurasi blog dan CMS untuk Netlify telah diperbaiki! Sekarang coba build dan deploy lagi.');
    
  } catch (error) {
    console.error('❌ Error saat memperbaiki konfigurasi:', error);
  }
}

// Jalankan fungsi perbaikan
fixBlogForNetlify(); 