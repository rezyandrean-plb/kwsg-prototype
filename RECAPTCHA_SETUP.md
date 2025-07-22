# reCAPTCHA Setup for Springleaf Residence Site Map Form

This document explains how to set up Google reCAPTCHA v3 for the Site Map Request form to prevent bot spam.

## Overview

The Site Map Request popup form now includes Google reCAPTCHA v3 protection using the `react-google-recaptcha-v3` package. This provides a seamless user experience while protecting against automated form submissions.

## Setup Instructions

### 1. Create Google reCAPTCHA Keys

1. Go to the [Google reCAPTCHA Admin Console](https://www.google.com/recaptcha/admin)
2. Click "Create" to add a new site
3. Choose "reCAPTCHA v3" as the reCAPTCHA type
4. Add your domain(s):
   - For development: `localhost`, `127.0.0.1`
   - For production: Your actual domain (e.g., `kwsingapore.com`)
5. Accept the terms and click "Submit"
6. You'll receive two keys:
   - **Site Key** (public) - Used in the frontend
   - **Secret Key** (private) - Used in the backend API

### 2. Environment Variables

Add the following environment variables to your `.env.local` file:

```env
# reCAPTCHA Configuration
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your_site_key_here
RECAPTCHA_SECRET_KEY=your_secret_key_here
```

### 3. Frontend Configuration

The reCAPTCHA v3 component is configured using the `react-google-recaptcha-v3` package:

- **Provider**: Wraps the entire component with `GoogleReCaptchaProvider`
- **Site Key**: Uses `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` environment variable
- **Fallback**: Uses Google's test site key for development
- **Execution**: Automatically executes on form submission with action 'site_map_request'
- **Seamless UX**: No user interaction required - runs in background

### 4. Backend Configuration

The API route (`/api/site-map-request`) includes:

- **Token Validation**: Verifies the reCAPTCHA token on the server
- **Score Threshold**: Requires a score of 0.5 or higher (configurable)
- **Error Handling**: Returns appropriate error messages for failed verification

## How It Works

1. **Background Execution**: reCAPTCHA v3 runs automatically in the background when the page loads
2. **Form Submission**: When the user submits the form, reCAPTCHA executes with the action 'site_map_request'
3. **Token Generation**: A token is generated and sent along with the form data to the API
4. **Server Verification**: The API verifies the token with Google's servers
5. **Score Evaluation**: Google returns a score (0.0 to 1.0) indicating how likely the user is human
6. **Processing**: If the score meets the threshold, the form is processed; otherwise, an error is returned

## Security Features

- **Server-side Verification**: All tokens are verified on the server
- **Score-based Protection**: Uses Google's AI to detect suspicious behavior
- **Automatic Expiration**: Tokens expire after a short time
- **Rate Limiting**: Built-in protection against rapid submissions

## Testing

### Development Mode
- Uses Google's test site key by default
- Always returns a valid score for testing
- No real verification occurs

### Production Mode
- Uses your actual reCAPTCHA keys
- Real verification with Google's servers
- Proper score evaluation and protection

## Troubleshooting

### Common Issues

1. **"reCAPTCHA service not configured"**
   - Check that `RECAPTCHA_SECRET_KEY` is set in your environment variables

2. **"reCAPTCHA verification failed"**
   - Verify your domain is correctly configured in the reCAPTCHA admin console
   - Check that the site key matches the secret key

3. **"reCAPTCHA score too low"**
   - This indicates suspicious behavior detected by Google
   - Consider adjusting the score threshold if legitimate users are being blocked

### Score Threshold Adjustment

The current threshold is set to 0.5. You can adjust this in the `verifyRecaptcha` function:

```typescript
if (data.success && data.score >= 0.5) { // Adjust this value
  return { success: true, score: data.score }
}
```

- **0.0**: Very strict (likely to block legitimate users)
- **0.5**: Balanced (recommended)
- **1.0**: Very lenient (may allow some bots)

## Maintenance

- Monitor your reCAPTCHA analytics in the Google Admin Console
- Review failed verifications to adjust thresholds if needed
- Keep your domain list updated when deploying to new environments

## Support

For issues with reCAPTCHA setup or configuration, refer to:
- [Google reCAPTCHA Documentation](https://developers.google.com/recaptcha)
- [reCAPTCHA Admin Console](https://www.google.com/recaptcha/admin)
- [react-google-recaptcha-v3 Documentation](https://github.com/t49tran/react-google-recaptcha-v3) 