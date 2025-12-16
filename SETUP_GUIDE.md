# ComplainHub - Complete Setup Guide

## 🚀 Quick Start Guide

Follow these steps to get your ComplainHub platform up and running!

## Prerequisites

- Node.js 18+ installed
- MongoDB Atlas account (free tier works!)
- Google Cloud account for OAuth
- Google AI Studio account for Gemini API

## Step-by-Step Setup

### 1. Install Dependencies

```bash
npm install
```

This installs:
- Next.js 15
- NextAuth.js (authentication)
- Mongoose (MongoDB)
- GSAP (animations)
- Google Generative AI (Gemini)
- React Hot Toast (notifications)
- SWR (data fetching)
- BCryptJS (password hashing)

### 2. Setup MongoDB Atlas

1. **Create Account**
   - Go to https://www.mongodb.com/cloud/atlas
   - Sign up for free

2. **Create Cluster**
   - Click "Build a Database"
   - Choose "FREE" tier (M0)
   - Select your preferred cloud provider and region
   - Click "Create Cluster"

3. **Setup Database Access**
   - Go to "Database Access"
   - Click "Add New Database User"
   - Create username and password
   - Set permissions to "Read and write to any database"

4. **Setup Network Access**
   - Go to "Network Access"
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (0.0.0.0/0)
   - For production, use specific IPs

5. **Get Connection String**
   - Go to "Database" → "Connect"
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database user password
   - Add to `.env.local` as `MONGODB_URI`

### 3. Setup Google OAuth

1. **Create Project**
   - Go to https://console.cloud.google.com/
   - Click "Select a project" → "New Project"
   - Name it "ComplainHub" → Create

2. **Configure OAuth Consent Screen**
   - Go to "APIs & Services" → "OAuth consent screen"
   - Choose "External" → Create
   - Fill in app name: "ComplainHub"
   - Add your email as support email
   - Save and Continue

3. **Create OAuth Credentials**
   - Go to "Credentials" → "Create Credentials" → "OAuth client ID"
   - Choose "Web application"
   - Name: "ComplainHub Web"
   - Authorized redirect URIs:
     - `http://localhost:3000/api/auth/callback/google`
     - For production, add your domain
   - Click Create

4. **Copy Credentials**
   - Copy Client ID → Add to `.env.local` as `GOOGLE_CLIENT_ID`
   - Copy Client Secret → Add to `.env.local` as `GOOGLE_CLIENT_SECRET`

### 4. Setup Google Gemini API

1. **Get API Key**
   - Go to https://makersuite.google.com/app/apikey
   - Sign in with Google account
   - Click "Create API Key"
   - Select your project or create new
   - Copy the API key

2. **Add to Environment**
   - Add to `.env.local` as `GEMINI_API_KEY`

### 5. Configure Environment Variables

Create `.env.local` in the root directory:

```env
# MongoDB Atlas
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/complainhub?retryWrites=true&w=majority

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_generated_secret_here

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Gemini AI
GEMINI_API_KEY=your_gemini_api_key_here

# Socket.io (for real-time features)
NEXT_PUBLIC_SOCKET_URL=http://localhost:3000
```

### 6. Generate NextAuth Secret

Run this command in terminal:

**Windows PowerShell:**
```powershell
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

**Mac/Linux:**
```bash
openssl rand -base64 32
```

Copy the output and add to `.env.local` as `NEXTAUTH_SECRET`

### 7. Start Development Server

```bash
npm run dev
```

Open http://localhost:3000 in your browser!

## 🎯 First Steps After Setup

### 1. Create Your First User
- Go to http://localhost:3000
- Click "Sign Up"
- Fill in your details
- Choose role: "User"
- Click "Create Account"

### 2. Test Google Sign In
- Click "Sign In"
- Click "Sign in with Google"
- Authorize the application

### 3. File Your First Complaint
- From dashboard, click "File New Complaint"
- Enter title and description
- Click "AI Analyze & Categorize"
- Watch as AI categorizes your complaint!
- Submit the complaint

### 4. Create Different Role Accounts
Test all dashboards by creating accounts with different roles:

**Department Account:**
- Sign up with role "Department"
- Choose a department (e.g., "Public Works")
- Login and see department dashboard

**Authority Account:**
- Sign up with role "Authority"
- Login to see system-wide overview

**Developer Account:**
- Sign up with role "Developer"
- Login to see system monitoring dashboard

## 🔧 Troubleshooting

### MongoDB Connection Issues
- Check if IP is whitelisted in MongoDB Atlas
- Verify connection string has correct password
- Ensure MongoDB cluster is active

### Google OAuth Not Working
- Verify redirect URI matches exactly
- Check if OAuth consent screen is published
- Ensure credentials are correct in `.env.local`

### Gemini API Errors
- Verify API key is valid
- Check if you have API quota remaining
- Ensure Gemini API is enabled in your project

### Port Already in Use
```bash
# Find process using port 3000
netstat -ano | findstr :3000

# Kill the process (Windows)
taskkill /PID <PID_NUMBER> /F

# Or use different port
npm run dev -- -p 3001
```

## 📊 Testing the Platform

### Test AI Categorization
Try filing complaints with these examples:

**Infrastructure Issue:**
```
Title: Broken street light on Main Street
Description: The street light at Main Street near City Hall has been broken for a week. It's causing safety concerns for pedestrians at night.
```

**Water Supply Issue:**
```
Title: Low water pressure in residential area
Description: Residents of Green Valley apartments are experiencing very low water pressure for the past 3 days. Multiple complaints received.
```

### Test Real-Time Updates
1. Open complaint detail page
2. Open same page in another browser/tab
3. Add a comment in one
4. Watch it appear in the other (within 5 seconds)

## 🚀 Production Deployment

### Environment Variables for Production
Update these in your hosting platform:
- `NEXTAUTH_URL` → Your production domain
- `NEXT_PUBLIC_SOCKET_URL` → Your production domain
- Add production redirect URI to Google OAuth

### Build for Production
```bash
npm run build
npm start
```

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [NextAuth.js Guide](https://next-auth.js.org/)
- [MongoDB Atlas Docs](https://www.mongodb.com/docs/atlas/)
- [Google Gemini API](https://ai.google.dev/)
- [GSAP Documentation](https://greensock.com/docs/)

## 🎉 You're All Set!

Your ComplainHub platform is now ready. Start filing complaints and watch the AI magic happen!

For issues or questions, check the main README.md or create an issue on GitHub.

Happy coding! 🚀
