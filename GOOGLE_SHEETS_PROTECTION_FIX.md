# Google Sheets Protection Issue Fix

## Problem
The Springleaf Residence Event form is failing with the error:
```
Failed to insert into Google Sheets: You are trying to edit a protected cell or object. Please contact the spreadsheet owner to remove protection if you need to edit.
```

## Root Cause
The Google Sheets has protected cells or ranges that prevent the service account from inserting data into the `EventRegistrations` tab.

## Solutions

### Solution 1: Remove Sheet Protection (Recommended)

1. **Open the Google Sheets** using the spreadsheet ID from `GOOGLE_SHEETS_EVENT_SPREADSHEET_ID`

2. **Check for Protected Ranges**:
   - Go to **Data** → **Protected sheets and ranges**
   - Look for any protected ranges that include the `EventRegistrations` tab
   - Note down which ranges are protected

3. **Remove Protection**:
   - Click on each protected range
   - Click **Remove protection**
   - Or modify the protection to exclude the data insertion area (columns A-H)

4. **Verify Sheet Structure**:
   Ensure the `EventRegistrations` tab has these headers in row 1:
   ```
   A1: Timestamp
   B1: Full Name  
   C1: Contact Number
   D1: Email Address
   E1: Number of Pax
   F1: PLB Consultant
   G1: Request Type
   H1: Project
   ```

### Solution 2: Verify Service Account Permissions

1. **Open the spreadsheet**
2. **Click "Share"** in the top right corner
3. **Add the service account email** (from `GOOGLE_SHEETS_CLIENT_EMAIL`) as an **Editor**
4. **Make sure it has "Editor" permissions** (not just Viewer)

### Solution 3: Create a New Sheet (If Protection Can't Be Removed)

If you can't remove the protection, create a new sheet:

1. **Create a new Google Sheets** document
2. **Name it** "Springleaf Residence Event Registrations"
3. **Create the EventRegistrations tab** with the headers above
4. **Share it** with the service account email as Editor
5. **Update the environment variable**:
   ```
   GOOGLE_SHEETS_EVENT_SPREADSHEET_ID=your_new_spreadsheet_id
   ```

### Solution 4: Use Alternative Range (Code Already Updated)

The code has been updated to handle protection errors by:
1. First trying to append data normally
2. If that fails due to protection, finding the next empty row
3. Using `update` instead of `append` to insert data

## Environment Variables to Check

Ensure these environment variables are properly set:

```bash
GOOGLE_SHEETS_EVENT_SPREADSHEET_ID=your_spreadsheet_id
GOOGLE_SHEETS_CLIENT_EMAIL=your_service_account_email
GOOGLE_SHEETS_PRIVATE_KEY=your_private_key
```

## Testing the Fix

1. **Test the form** on the Springleaf Residence page
2. **Check the console logs** for any errors
3. **Verify data appears** in the Google Sheets
4. **Check that emails are sent** (notification and auto-reply)

## Common Issues and Solutions

### Issue: "Spreadsheet not found"
- **Solution**: Verify `GOOGLE_SHEETS_EVENT_SPREADSHEET_ID` is correct

### Issue: "Permission denied"
- **Solution**: Ensure service account has Editor access to the spreadsheet

### Issue: "Invalid JWT"
- **Solution**: Check that `GOOGLE_SHEETS_CLIENT_EMAIL` and `GOOGLE_SHEETS_PRIVATE_KEY` are correct

### Issue: "Protected cell or object" (after trying the above)
- **Solution**: The fallback mechanism in the code should handle this automatically

## Monitoring

After implementing the fix:

1. **Monitor form submissions** in the Google Sheets
2. **Check console logs** for any remaining errors
3. **Verify email delivery** for both notification and auto-reply emails
4. **Test with different data** to ensure robustness

## Prevention

To prevent this issue in the future:

1. **Avoid protecting** the data insertion area in Google Sheets
2. **Use dedicated sheets** for form submissions
3. **Regularly test** the integration
4. **Monitor logs** for any protection-related errors 