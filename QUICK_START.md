# ✅ Quick Start Checklist - ComplainHub

Follow this checklist to get your ComplainHub platform running!

## 📋 Pre-Setup Checklist

- [ ] Node.js 18+ installed (`node --version`)
- [ ] npm or yarn installed (`npm --version`)
- [ ] Git installed (optional)
- [ ] Code editor ready (VS Code recommended)

## 🔧 Setup Checklist

### 1. Dependencies
- [ ] Run `npm install`
- [ ] Wait for all packages to install
- [ ] Check for any errors

### 2. MongoDB Atlas Setup
- [ ] Create MongoDB Atlas account
- [ ] Create a free cluster (M0)
- [ ] Create database user with password
- [ ] Whitelist IP (0.0.0.0/0 for development)
- [ ] Copy connection string
- [ ] Replace `<password>` in connection string

### 3. Google OAuth Setup
- [ ] Go to Google Cloud Console
- [ ] Create new project
- [ ] Setup OAuth consent screen
- [ ] Create OAuth 2.0 credentials
- [ ] Add redirect URI: `http://localhost:3000/api/auth/callback/google`
- [ ] Copy Client ID
- [ ] Copy Client Secret

### 4. Google Gemini API Setup
- [ ] Go to Google AI Studio
- [ ] Create API key
- [ ] Copy API key
- [ ] Test API key (optional)

### 5. Environment Variables
- [ ] Create `.env.local` file in root directory
- [ ] Add `MONGODB_URI=your_connection_string`
- [ ] Generate NextAuth secret: `node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"`
- [ ] Add `NEXTAUTH_SECRET=generated_secret`
- [ ] Add `NEXTAUTH_URL=http://localhost:3000`
- [ ] Add `GOOGLE_CLIENT_ID=your_client_id`
- [ ] Add `GOOGLE_CLIENT_SECRET=your_client_secret`
- [ ] Add `GEMINI_API_KEY=your_gemini_key`
- [ ] Add `NEXT_PUBLIC_SOCKET_URL=http://localhost:3000`
- [ ] Save the file

### 6. Start Development Server
- [ ] Run `npm run dev`
- [ ] Wait for compilation
- [ ] Check for any errors in terminal
- [ ] Open browser to `http://localhost:3000`
- [ ] See the landing page load

## 🧪 Testing Checklist

### Test Landing Page
- [ ] Landing page loads without errors
- [ ] Animations play smoothly
- [ ] Navigation bar visible
- [ ] Sign In / Sign Up buttons work
- [ ] Features section scrolls smoothly
- [ ] Footer displays correctly

### Test Authentication
- [ ] Click "Sign Up"
- [ ] Fill in registration form
- [ ] Select role: "User"
- [ ] Click "Create Account"
- [ ] Should redirect to dashboard
- [ ] Sign out
- [ ] Try "Sign In" with same credentials
- [ ] Should successfully log in
- [ ] Try "Sign in with Google"
- [ ] Google OAuth flow works

### Test User Dashboard
- [ ] Dashboard loads with stats (all zeros initially)
- [ ] "File New Complaint" button visible
- [ ] Navigation works
- [ ] Sign out button works

### Test Complaint Filing
- [ ] Click "File New Complaint"
- [ ] Form loads correctly
- [ ] Type in title: "Test Complaint"
- [ ] Type description: "This is a test complaint about broken street light"
- [ ] Wait 1 second - suggestions should appear
- [ ] Click "AI Analyze & Categorize"
- [ ] AI analysis appears with category, department, priority
- [ ] Category and department auto-filled
- [ ] Click "File Complaint"
- [ ] Should redirect to complaint detail page
- [ ] Complaint details display correctly

### Test Real-Time Features
- [ ] On complaint detail page
- [ ] Add a comment
- [ ] Comment appears immediately
- [ ] Open same complaint in another tab
- [ ] Add comment in one tab
- [ ] Comment appears in other tab within 5 seconds

### Test Different Roles
- [ ] Sign out
- [ ] Create account with role "Department"
- [ ] Select department: "Public Works"
- [ ] Login
- [ ] See department dashboard
- [ ] Should see complaints assigned to Public Works
- [ ] Sign out

- [ ] Create account with role "Authority"
- [ ] Login
- [ ] See authority dashboard
- [ ] Should see system-wide stats
- [ ] Sign out

- [ ] Create account with role "Developer"
- [ ] Login
- [ ] See developer dashboard
- [ ] Should see system metrics
- [ ] Sign out

## 🐛 Troubleshooting Checklist

### Server Won't Start
- [ ] Check if port 3000 is already in use
- [ ] Kill process using port 3000
- [ ] Try different port: `npm run dev -- -p 3001`
- [ ] Check for syntax errors in code
- [ ] Delete `.next` folder and restart

### MongoDB Connection Error
- [ ] Verify connection string is correct
- [ ] Check if password has special characters (URL encode them)
- [ ] Verify IP is whitelisted
- [ ] Check if cluster is active
- [ ] Test connection with MongoDB Compass

### Google OAuth Not Working
- [ ] Verify redirect URI is exactly: `http://localhost:3000/api/auth/callback/google`
- [ ] Check if Client ID and Secret are correct
- [ ] Ensure OAuth consent screen is published
- [ ] Clear browser cookies and try again
- [ ] Check browser console for errors

### AI Not Working
- [ ] Verify Gemini API key is valid
- [ ] Check if you have API quota
- [ ] Look at browser console for errors
- [ ] Check Network tab for failed requests
- [ ] Verify API is enabled in Google Cloud

### Page Not Loading
- [ ] Clear browser cache
- [ ] Hard refresh (Ctrl+Shift+R)
- [ ] Check browser console for errors
- [ ] Verify all imports are correct
- [ ] Check if component files exist

## 📝 After Setup Checklist

### Documentation Review
- [ ] Read README.md for overview
- [ ] Review SETUP_GUIDE.md for detailed steps
- [ ] Check FEATURES.md for all features
- [ ] Browse API_REFERENCE.md for API details
- [ ] Read PROJECT_SUMMARY.md for what's included

### Code Exploration
- [ ] Open `app/page.js` - landing page
- [ ] Check `app/dashboard/page.js` - dashboard router
- [ ] Review `models/` folder - database schemas
- [ ] Look at `app/api/` - API endpoints
- [ ] Explore `components/` - UI components
- [ ] Check `lib/gemini.js` - AI integration

### Customization Ideas
- [ ] Change color scheme in Tailwind
- [ ] Add more departments
- [ ] Modify AI categories
- [ ] Add custom features
- [ ] Update branding/logo
- [ ] Modify email templates (future)

## 🎯 Ready to Use?

Once all checkmarks are complete:
- ✅ Your ComplainHub platform is fully functional
- ✅ You can start filing and managing complaints
- ✅ AI categorization is working
- ✅ Real-time tracking is active
- ✅ All user roles are operational

## 🚀 Next Steps

1. **Explore the Platform**
   - Create multiple test complaints
   - Try different categories
   - Test all user roles
   - Explore all dashboards

2. **Customize**
   - Update branding
   - Modify colors
   - Add new features
   - Enhance UI

3. **Prepare for Production**
   - Review security settings
   - Setup production database
   - Configure production OAuth
   - Add monitoring
   - Setup CI/CD

4. **Share & Deploy**
   - Push to GitHub
   - Deploy to Vercel/Netlify
   - Share with team
   - Get feedback

## 💡 Tips

- **Use Different Emails**: For testing different roles
- **Test Edge Cases**: Try invalid inputs
- **Monitor Console**: Keep dev tools open
- **Check Network**: Watch API calls
- **Read Logs**: Check terminal output

## 🎉 Congratulations!

If all checkboxes are checked, you're ready to go!

Start managing complaints with AI power! 🚀

---

**Need Help?**
- Check documentation files
- Review code comments
- Test step by step
- Debug with console.log
- Ask for help if stuck

**Happy Coding! 🎉**
