# Clerk Authentication Setup Guide

## Overview
The compass page now uses Clerk authentication instead of a hardcoded password. Users must sign in to access the tools.

## Setup Steps

### 1. Create a Clerk Account
1. Go to [https://dashboard.clerk.com/](https://dashboard.clerk.com/)
2. Sign up for a free account
3. Create a new application

### 2. Get Your API Keys
1. In your Clerk dashboard, go to "API Keys"
2. Copy your **Publishable Key** and **Secret Key**

### 3. Configure Environment Variables
Create a `.env.local` file in your project root with the following content:

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_publishable_key_here
CLERK_SECRET_KEY=your_secret_key_here

# Optional: Customize the sign-in and sign-up URLs
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/
```

Replace `your_publishable_key_here` and `your_secret_key_here` with your actual keys from Clerk.

### 4. Configure Clerk Application Settings
In your Clerk dashboard:

1. **Allowed redirect URLs**: Add your domain (e.g., `http://localhost:3000` for development)
2. **Sign-in methods**: Enable the methods you want (email, Google, etc.)
3. **User management**: Configure user settings as needed

### 5. Test the Integration
1. Start your development server: `bun dev`
2. Navigate to `/compass`
3. Click on any tool - you should see the authentication dialog
4. Sign in with your credentials
5. After authentication, the tool should open in a new tab

## How It Works

1. **Unauthenticated users**: When clicking on a tool, they see a Clerk SignIn dialog
2. **Authenticated users**: Tools open directly without any authentication prompt
3. **After sign-in**: Users are redirected back to the compass page and can access tools

## Customization

The authentication dialog can be customized by modifying the `AuthDialog` component in `/components/auth-dialog.tsx`. The Clerk SignIn component appearance is already styled to match your site's design.

## Security Notes

- Never commit your `.env.local` file to version control
- Use different API keys for development and production
- Consider implementing role-based access control if needed
- Monitor user activity in your Clerk dashboard
