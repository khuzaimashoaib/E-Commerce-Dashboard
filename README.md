# E-Commerce Dashboard

A comprehensive, enterprise-grade e-commerce management platform developed with modern web technologies. Built using vanilla JavaScript, HTML5, and CSS3, bootstrap 4 this responsive dashboard empowers administrators with complete control over product catalogs, order processing, and user management.

## 🌐 Live Demo

[![Live Demo](https://img.shields.io/badge/Live%20Demo-View%20Store-blue?style=for-the-badge&logo=google-chrome)](https://khuzaimashoaib.github.io/E-Commerce-Dashboard/)

## 🚀 Features

### Core Functionality

- **Product Management**: Add, edit, delete, and view products
- **Order Management**: View and manage customer orders
- **User Authentication**: Secure login system with Supabase Auth
- **Dashboard Analytics**: Real-time statistics and metrics
- **Image Upload**: Cloudinary integration for product images
- **Responsive Design**: Works on desktop, tablet, and mobile devices

### UI/UX Features

- **Glassmorphism Design**: Modern frosted glass effect on login page
- **SweetAlert2 Integration**: Beautiful popup notifications
- **DataTables**: Advanced table sorting, searching, and pagination
- **Summernote Editor**: Rich text editing for product descriptions
- **Image Preview**: Live image preview with delete functionality
- **Loading Animations**: Smooth transitions and loading states

## 🛠️ Tech Stack

### Frontend

- **HTML5** - Semantic markup and structure
- **CSS3** - Custom styling with glassmorphism effects
- **Vanilla JavaScript (ES6+)** - No frameworks, pure JavaScript
- **Bootstrap 4** - Responsive grid system and components

### Backend & Services

- **Supabase** - PostgreSQL database and authentication
- **Cloudinary** - Image storage and optimization

### Libraries & Plugins

- **DataTables** - Advanced table functionality
- **Summernote** - Rich text editor
- **ApexCharts** - Dashboard charts and graphs
- **jQuery** - DOM manipulation (minimal usage)
- **Font Awesome** - Icons and UI elements

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/khuzaimashoaib/E-Commerce-Dashboard.git
   cd e-commerce-dashboard
   ```

2. **Open in browser**
   - Open `login.html` in your web browser
   - Or use a local server for better development experience

## 🔧 Configuration

### Supabase Setup

The project uses Supabase for backend services. The configuration is already set up in `js/database.js`:

```javascript
const supabaseUrl = "your-project-url";
const supabaseKey = "your-supabase-anon-key";
```

### Cloudinary Setup

Image uploads are handled by Cloudinary. Configuration in `js/cloudinary.js`:

```javascript
const cloudName = "your-cloud-name";
const uploadPreset = "your-preset-name";
```

## 🙏 Acknowledgments

- **Supabase** - Backend-as-a-Service platform
- **Cloudinary** - Image management and optimization
- **Bootstrap** - CSS framework
- **DataTables** - Table enhancement plugin
- **SweetAlert2** - Beautiful popup library
- **Summernote** - Rich text editor


---

**Made with ❤️ by Khuzaima Shoaib**

⭐ Star this repo if you found it helpful!
