# Email Setup Guide

This project includes auto-reply email functionality for contact forms using **SendGrid**. Here's how to set it up:

## Current Implementation

The contact form now includes:
- ✅ Form validation
- ✅ Auto-reply email functionality using SendGrid
- ✅ Success/error handling
- ✅ Loading states
- ✅ User feedback

## SendGrid Setup (Current Implementation)

### 1. Create SendGrid Account

1. **Sign up** for a free SendGrid account at [sendgrid.com](https://sendgrid.com)
2. **Verify your account** (check email for verification link)
3. **Complete account setup** (add company information)

### 2. Get API Key

1. **Navigate to Settings → API Keys** in SendGrid dashboard
2. **Create API Key**:
   - Click "Create API Key"
   - Name: "KW Singapore Contact Form"
   - Access: "Full Access" (or "Restricted Access" with "Mail Send" permissions)
   - Click "Create & View"
3. **Copy the API Key** (you won't see it again!)

### 3. Verify Sender Email

1. **Go to Settings → Sender Authentication**
2. **Verify Single Sender**:
   - Click "Verify a Single Sender"
   - Fill in your details:
     - From Name: "KW Singapore"
     - From Email: your-email@domain.com
     - Company: "KW Singapore"
     - Address: Your business address
   - Click "Create"
3. **Check your email** and click the verification link

### 4. Set Environment Variables

Create a `.env.local` file in your project root:

```bash
# SendGrid Configuration
SENDGRID_API_KEY=your-sendgrid-api-key-here
FROM_EMAIL=your-verified-email@domain.com

# Optional: Custom domain (if you have one)
# FROM_EMAIL=noreply@kwsg.com
```

### 5. Test the Setup

1. **Start your development server**:
   ```bash
   bun dev
   ```

2. **Fill out the contact form** on any project page
3. **Submit the form**
4. **Check the console logs** (development mode logs to console)
5. **Deploy to production** to test real email sending

## Development vs Production

- **Development**: Emails are logged to console (no real sending)
- **Production**: Real emails are sent using SendGrid

## Alternative Email Services

If you prefer other email services, here are the alternatives:

### Gmail SMTP

1. **Enable 2-Factor Authentication** on your Gmail account
2. **Generate an App Password**:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate a new app password for "Mail"
3. **Set Environment Variables**:
   ```bash
   GMAIL_USER=your-email@gmail.com
   GMAIL_APP_PASSWORD=your-16-character-app-password
   ```

### AWS SES

1. **Set up AWS SES** in your AWS account
2. **Verify your email domain** or email address
3. **Get AWS credentials**
4. **Install AWS SDK**:
   ```bash
   bun add @aws-sdk/client-ses
   ```
5. **Set Environment Variables**:
   ```bash
   AWS_ACCESS_KEY_ID=your-aws-access-key
   AWS_SECRET_ACCESS_KEY=your-aws-secret-key
   AWS_REGION=us-east-1
   ```

### Resend

1. **Sign up** for Resend (resend.com)
2. **Get API Key** from dashboard
3. **Install Resend**:
   ```bash
   bun add resend
   ```
4. **Set Environment Variable**:
   ```bash
   RESEND_API_KEY=your-resend-api-key
   ```

## Testing

1. Fill out the contact form on any project page
2. Submit the form
3. Check the console logs (development) or your email (production)
4. You should receive an auto-reply email

## Customization

You can customize the email template in `app/api/contact-form/route.ts`:
- Email subject
- Email content/HTML
- Branding colors
- Contact information

## SendGrid Benefits

- **Free tier**: 100 emails/day
- **High deliverability**: Excellent reputation
- **Easy setup**: Simple API
- **Analytics**: Track email opens, clicks, etc.
- **Templates**: Pre-built email templates available

## Security Notes

- Never commit real API keys to version control
- Use environment variables for all sensitive data
- Consider rate limiting for the contact form API
- Validate email addresses on both client and server side
- SendGrid API keys should be kept secure 