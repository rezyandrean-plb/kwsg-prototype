# Google Sheets Integration Setup Guide

This guide will help you set up Google Sheets integration for the Springleaf Residence forms (both site map requests and showflat visit requests).

## Prerequisites

1. A Google Cloud Project
2. Google Sheets API enabled
3. A Google Service Account

## Step 1: Create a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google Sheets API:
   - Go to "APIs & Services" > "Library"
   - Search for "Google Sheets API"
   - Click on it and press "Enable"

## Step 2: Create a Service Account

1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "Service Account"
3. Fill in the service account details:
   - Name: `springleaf-sheets-integration`
   - Description: `Service account for Springleaf Residence form submissions`
4. Click "Create and Continue"
5. Skip the optional steps and click "Done"

## Step 3: Generate Service Account Key

1. In the Credentials page, find your service account
2. Click on the service account email
3. Go to the "Keys" tab
4. Click "Add Key" > "Create new key"
5. Choose "JSON" format
6. Download the JSON file (keep it secure!)

## Step 4: Create Google Spreadsheet

1. Go to [Google Sheets](https://sheets.google.com/)
2. Create a new spreadsheet
3. Name it "Springleaf Residence - Form Submissions"
4. Create two separate tabs with the following headers:

### Tab 1: "ShowflatVisitRequests"
Set up the headers in the first row:
```
A1: Timestamp
B1: Full Name
C1: Email Address
D1: Contact Number
E1: Project
F1: Location
G1: Developer
H1: Preferred Date
I1: Preferred Time
```

### Tab 2: "SiteMapRequests"
Set up the headers in the first row:
```
A1: Timestamp
B1: Full Name
C1: Email Address
D1: Contact Number
E1: Request Type
F1: Project
```

## Step 5: Share Spreadsheet with Service Account

1. In your Google Spreadsheet, click "Share"
2. Add the service account email (found in the JSON file) as an Editor
3. Make sure to give it "Editor" permissions

## Step 6: Configure Environment Variables

Add these environment variables to your `.env.local` file:

```env
# Google Sheets Configuration
GOOGLE_SHEETS_SPREADSHEET_ID=your_spreadsheet_id_here
GOOGLE_SHEETS_CLIENT_EMAIL=your_service_account_email@project.iam.gserviceaccount.com
GOOGLE_SHEETS_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour private key here\n-----END PRIVATE KEY-----\n"
```

### How to get these values:

1. **Spreadsheet ID**: Found in the URL of your Google Spreadsheet
   - URL format: `https://docs.google.com/spreadsheets/d/SPREADSHEET_ID/edit`
   - Copy the ID between `/d/` and `/edit`

2. **Client Email**: Found in the downloaded JSON file
   - Look for the `client_email` field

3. **Private Key**: Found in the downloaded JSON file
   - Look for the `private_key` field
   - Make sure to include the quotes and newline characters

### ⚠️ Important: Private Key Format for Production

The private key must be properly formatted to avoid OpenSSL compatibility issues in production:

**Correct Format:**
```env
GOOGLE_SHEETS_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC...\n-----END PRIVATE KEY-----\n"
```

**Common Issues to Avoid:**
- ❌ Missing quotes around the entire key
- ❌ Missing `\n` characters for line breaks
- ❌ Extra spaces or formatting
- ❌ Using single quotes instead of double quotes

**If you're still getting OpenSSL errors in production:**
1. Ensure the private key starts with `-----BEGIN PRIVATE KEY-----`
2. Make sure all newlines are represented as `\n`
3. The key should be wrapped in double quotes
4. Try regenerating the service account key if issues persist

## Step 7: Test the Integration

1. Start your development server: `npm run dev`
2. Go to the Springleaf Residence page
3. Test both forms:
   - **Site Map Request Form**: Click "Required Site Map" button
   - **Showflat Visit Form**: Fill out the main form at the bottom
4. Submit the forms
5. Check your Google Spreadsheet for the new entries
6. Check the console logs for any errors

## Troubleshooting

### Common Issues:

1. **"Invalid JWT" error**:
   - Check that your private key is correctly formatted
   - Make sure the newline characters (`\n`) are preserved

2. **"Spreadsheet not found" error**:
   - Verify the spreadsheet ID is correct
   - Make sure the spreadsheet exists and is accessible

3. **"Permission denied" error**:
   - Ensure the service account has Editor access to the spreadsheet
   - Check that the Google Sheets API is enabled

4. **"Service account not configured" error**:
   - Verify all environment variables are set correctly
   - Restart your development server after adding environment variables

### Security Notes:

- Never commit the service account JSON file to version control
- Keep your environment variables secure
- Consider using a dedicated service account for each environment (dev/staging/prod)
- Regularly rotate your service account keys

## Data Structure

Each form submission will create a new row in the appropriate tab with the following data:

### Showflat Visit Request Form (Tab 1: "ShowflatVisitRequests"):
| Column | Data |
|--------|------|
| A | Timestamp (ISO format) |
| B | Full Name |
| C | Email Address (or "Not provided") |
| D | Contact Number |
| E | Project (always "Springleaf Residence") |
| F | Location (always "District 26, Upper Thomson") |
| G | Developer (always "GuocoLand & Hong Leong") |
| H | Preferred Date (formatted date or "Not specified") |
| I | Preferred Time (selected time or "Not specified") |

### Site Map Request Form (Tab 2: "SiteMapRequests"):
| Column | Data |
|--------|------|
| A | Timestamp (ISO format) |
| B | Full Name |
| C | Email Address |
| D | Contact Number |
| E | Request Type (always "Site Map Request") |
| F | Project (always "Springleaf Residence") |

## Form Types

The integration handles two different form types:

1. **Site Map Request Form** (`/api/site-map-request`):
   - Triggered by clicking "Required Site Map" button
   - Collects: Full Name, Email Address, Contact Number
   - Sends notification emails to the team
   - Sends auto-reply to the contact

2. **Showflat Visit Request Form** (`/api/springleaf-residence-form`):
   - Triggered by submitting the main form at the bottom
   - Collects: Full Name, Contact Number, Email Address (optional), Preferred Date, Preferred Time
   - Sends notification emails to the team
   - Sends auto-reply to the contact (if email provided)

## Monitoring

You can monitor the integration by:

1. Checking the console logs in your development environment
2. Reviewing the Google Sheets for new entries
3. Setting up Google Cloud Logging for production monitoring
4. Monitoring both form types separately in the spreadsheet

## Production Deployment

For production deployment:

1. Set the environment variables in your hosting platform (Vercel, Netlify, etc.)
2. Ensure the service account has access to the production spreadsheet
3. Consider setting up automated backups of the spreadsheet
4. Monitor the API usage in Google Cloud Console
5. Set up separate spreadsheets for different environments if needed

## Advanced Features

### Filtering and Analysis

You can use Google Sheets features to analyze your data:

1. **Separate Tabs**: Each form type has its own dedicated tab for easy organization
2. **Request Type Analysis**: Use column E to filter within each tab
3. **Date Analysis**: Use column A (Timestamp) to analyze submission trends
4. **Contact Analysis**: Use columns B, C, D to track unique contacts
5. **Cross-Tab Analysis**: Create summary sheets that pull data from both tabs
6. **Response Time**: Track how quickly your team responds to different request types

### Automation

Consider setting up Google Sheets automation:

1. **Email Notifications**: Set up email notifications when new rows are added
2. **Data Validation**: Add data validation rules to ensure data quality
3. **Conditional Formatting**: Highlight important submissions or follow-ups needed
4. **Charts and Dashboards**: Create visual representations of your form submission data 