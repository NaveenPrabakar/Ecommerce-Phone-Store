# PhoneStore - Modern E-commerce Phone Marketplace

A comprehensive e-commerce platform for buying and selling smartphones, built with modern web technologies. This full-stack application provides a seamless marketplace experience for customers, sellers, and administrators.

## 🎯 Project Purpose

PhoneStore is a modern e-commerce platform designed to facilitate the buying and selling of smartphones. The application serves three distinct user types:

- **Customers**: Browse, search, and purchase phones with a modern shopping experience
- **Sellers**: List and sell their used phones through a secure platform
- **Administrators**: Manage the marketplace, monitor transactions, and ensure platform security

## 🚀 Key Features

### Customer Features
- **Modern Shopping Experience**: Clean, responsive interface with smooth animations
- **Advanced Product Browsing**: Search, filter, and sort through phone listings
- **Shopping Cart Management**: Add items, manage quantities, and secure checkout
- **User Authentication**: Secure login and registration system
- **Product Details**: Comprehensive product pages with images and specifications

### Seller Features
- **Easy Listing Process**: Simple interface to list phones for sale
- **Secure Transactions**: Protected payment processing and escrow system
- **Admin Monitoring**: Expert team oversight to prevent scams and ensure quality

### Admin Features
- **Comprehensive Admin Panel**: Manage products, users, and transactions
- **Content Moderation**: Monitor listings and remove potential scams
- **Analytics Dashboard**: Track sales, user activity, and platform metrics

## 🛠️ Tech Stack

### Frontend
- **React**: Latest React with modern hooks and patterns
- **Vite**: Fast build tool and development server
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development
- **Bootstrap**: Additional UI components and responsive grid system
- **React Icons**: Comprehensive icon library
- **Chart.js**: Data visualization for analytics
- **React Chart.js 2**: React wrapper for Chart.js

### Backend
- **Node.js**: JavaScript runtime environment
- **Express.js **: Fast, unopinionated web framework
- **MongoDB**: NoSQL database for flexible data storage
- **MongoDB Compass**: Database management and visualization tool
- **CORS**: Cross-origin resource sharing middleware
- **Body Parser**: Request body parsing middleware

### Development Tools
- **Git**: Version control system

## 📁 Project Structure

```
PS_2/
├── Frontend/                 # React frontend application
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── assets/          # Static assets (images, icons)
│   │   └── data/           # Static data files
│   ├── public/             # Public assets
│   └── package.json        # Frontend dependencies
├── Backend/                # Node.js backend application
│   ├── routes/            # API route handlers
│   │   ├── account.js     # User authentication routes
│   │   ├── admin.js       # Admin panel routes
│   │   ├── cart.js        # Shopping cart routes
│   │   ├── products.js    # Product management routes
│   │   └── sell.js        # Seller listing routes
│   ├── App.js             # Main server configuration
│   └── package.json       # Backend dependencies
└── Documents/             # Project documentation and assets
```

## 🚧 Currently Working On

### Database Migration
- **MongoDB Compass → MongoDB Atlas**: Migrating from local MongoDB Compass to cloud-based MongoDB Atlas for improved scalability, reliability, and global accessibility
- **Benefits**: 
  - Automatic backups and disaster recovery
  - Global distribution and low-latency access
  - Built-in security and compliance features
  - Scalable infrastructure without server management

### Backend Deployment
- **AWS Lambda + API Gateway**: Deploying the backend to AWS Lambda with API Gateway for serverless architecture
- **Benefits**:
  - Auto-scaling based on demand
  - Pay-per-use pricing model
  - High availability and fault tolerance
  - Reduced operational overhead
  - Global edge locations for low latency

## 📦 Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn package manager
- MongoDB Atlas account (for production)
- AWS account (for deployment)

### Local Development

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd PS_2
   ```

2. **Install Frontend Dependencies**
   ```bash
   cd Frontend
   npm install
   ```

3. **Install Backend Dependencies**
   ```bash
   cd ../Backend
   npm install
   ```

4. **Start Development Servers**
   ```bash
   # Terminal 1 - Frontend
   cd Frontend
   npm run dev
   
   # Terminal 2 - Backend
   cd Backend
   node App.js
   ```

5. **Access the Application**
   - Frontend: `http://localhost:5173`
   - Backend API: `http://localhost:8000`

## 🔧 Environment Configuration

### Frontend Environment Variables
Create `.env` file in the Frontend directory:
```env
VITE_API_BASE_URL=http://localhost:8000
VITE_APP_NAME=PhoneStore
```

### Backend Environment Variables
Create `.env` file in the Backend directory:
```env
MONGODB_URI=your_mongodb_atlas_connection_string
PORT=8000
```

## 📱 Application Pages

### Core Pages
- **Home**: Landing page with hero section and featured products
- **Shop**: Product browsing with search and filtering
- **Cart**: Shopping cart management and checkout
- **Login/Signup**: User authentication forms
- **Sell**: Phone listing interface for sellers
- **Admin**: Administrative dashboard and controls
- **Settings**: User profile and preferences
- **About**: Company information and contact details


## 📄 License

This project is created by **Naveen Prabakar & Mucu Milo** for educational purposes.


**Built with ❤️ by Naveen Prabakar & Mucu Milo**
