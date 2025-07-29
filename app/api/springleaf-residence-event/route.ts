import { NextRequest, NextResponse } from 'next/server'
import sgMail from '@sendgrid/mail'
import { google } from 'googleapis'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { 
      fullName, 
      contactNumber, 
      emailAddress,
      numberOfPax,
      plbConsultant
    } = body

    console.log('Springleaf Residence Event registration form submission received:', { 
      fullName, 
      contactNumber, 
      emailAddress,
      numberOfPax,
      plbConsultant
    })

    // Validate required fields
    if (!fullName || !contactNumber || !emailAddress || !numberOfPax || !plbConsultant) {
      console.log('Validation failed: Missing required fields')
      return NextResponse.json(
        { error: 'Full name, contact number, email address, number of pax, and PLB consultant are required' },
        { status: 400 }
      )
    }



    // Send notification email to KW Singapore team
    const notificationResult = await sendNotificationEmail({
      fullName,
      contactNumber,
      emailAddress,
      numberOfPax,
      plbConsultant
    })

    console.log('Notification email result:', notificationResult)

    if (!notificationResult.success) {
      console.error('Failed to send notification email:', notificationResult.error)
    }

    // Send auto-reply email to the registrant
    const autoReplyResult = await sendAutoReplyEmail({
      fullName,
      emailAddress
    })

    console.log('Auto-reply result:', autoReplyResult)

    if (!autoReplyResult.success) {
      console.error('Failed to send auto-reply email:', autoReplyResult.error)
    }

    // Insert data into Google Sheets
    const sheetsResult = await insertIntoGoogleSheets({
      fullName,
      contactNumber,
      emailAddress,
      numberOfPax,
      plbConsultant
    })

    console.log('Google Sheets result:', sheetsResult)

    if (!sheetsResult.success) {
      console.error('Failed to insert into Google Sheets:', sheetsResult.error)
    }

    return NextResponse.json({
      success: true,
      message: 'Thank you for registering for the Springleaf Residence Event! We have sent you a confirmation email and will contact you soon with event details.',
      notificationSent: notificationResult.success,
      autoReplySent: autoReplyResult.success,
      sheetsInserted: sheetsResult.success
    })

  } catch (error) {
    console.error('Springleaf Residence Event registration form error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}



async function sendNotificationEmail({ 
  fullName, 
  contactNumber, 
  emailAddress,
  numberOfPax,
  plbConsultant
}: {
  fullName: string
  contactNumber: string
  emailAddress: string
  numberOfPax: string
  plbConsultant: string
}) {
  try {
    const isDevelopment = process.env.NODE_ENV === 'development'
    const apiKey = process.env.SENDGRID_API_KEY
    const fromEmail = process.env.FROM_EMAIL || 'noreply@kwsg.com'
    const toEmail = 'events@propertylimbrothers.com'
    
    console.log('Notification email configuration:', {
      isDevelopment,
      hasApiKey: !!apiKey,
      fromEmail,
      toEmail
    })
    
    // If no API key is set, return error
    if (!apiKey) {
      console.error('❌ SendGrid API key not found')
      return { success: false, error: 'Email service not configured' }
    }

    // If API key is available, try to send real email
    console.log('📧 Attempting to send notification email via SendGrid...')
    
    sgMail.setApiKey(apiKey)

    const emailContent = {
      to: toEmail,
      from: fromEmail,
      subject: 'New Springleaf Residence Event Registration - KW Singapore',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background-color: #B40101; color: white; padding: 20px; text-align: center;">
            <h1 style="margin: 0; font-size: 24px;">KW Singapore</h1>
            <p style="margin: 5px 0 0 0; font-size: 16px;">Springleaf Residence Event Registration</p>
          </div>
          
          <div style="padding: 30px; background-color: #f9f9f9;">
            <h2 style="color: #333; margin-bottom: 20px;">New Event Registration</h2>
            
            <div style="background-color: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <h3 style="color: #B40101; margin-top: 0;">Contact Information</h3>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; border-bottom: 1px solid #eee; font-weight: bold; color: #666;">Full Name:</td>
                  <td style="padding: 8px 0; border-bottom: 1px solid #eee; color: #333;">${fullName}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; border-bottom: 1px solid #eee; font-weight: bold; color: #666;">Contact Number:</td>
                  <td style="padding: 8px 0; border-bottom: 1px solid #eee; color: #333;">${contactNumber}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; border-bottom: 1px solid #eee; font-weight: bold; color: #666;">Email Address:</td>
                  <td style="padding: 8px 0; border-bottom: 1px solid #eee; color: #333;">${emailAddress}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; border-bottom: 1px solid #eee; font-weight: bold; color: #666;">Number of Pax:</td>
                  <td style="padding: 8px 0; border-bottom: 1px solid #eee; color: #333;">${numberOfPax}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #666;">PLB Consultant:</td>
                  <td style="padding: 8px 0; color: #333;">${plbConsultant}</td>
                </tr>
              </table>
            </div>
            
            <div style="text-align: center; margin-top: 30px;">
              <a href="mailto:${emailAddress}" style="background-color: #B40101; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block;">
                Reply to Registrant
              </a>
            </div>
          </div>
          
          <div style="background-color: #333; color: white; padding: 20px; text-align: center; font-size: 12px;">
            <p style="margin: 0;">© 2025 KW Singapore. All rights reserved.</p>
            <p style="margin: 5px 0 0 0;">This notification was sent to ${toEmail}</p>
          </div>
        </div>
      `
    }

    console.log('📤 Sending notification email via SendGrid...')
    console.log('📧 Email details:', {
      to: toEmail,
      from: fromEmail,
      subject: emailContent.subject,
      hasHtml: !!emailContent.html
    })
    
    try {
      await sgMail.send(emailContent)
      console.log('✅ Notification email sent successfully via SendGrid')
    } catch (sendError) {
      console.error('❌ SendGrid send error:', sendError)
      throw sendError
    }
    
    return { success: true, message: 'Notification email sent successfully' }

  } catch (error) {
    console.error('❌ Notification email sending error:', error)
    
    let errorMessage = 'Failed to send notification email'
    
    if (error instanceof Error) {
      if (error.message.includes('Unauthorized')) {
        errorMessage = 'Invalid SendGrid API key. Please check your SENDGRID_API_KEY.'
      } else if (error.message.includes('Forbidden')) {
        errorMessage = 'Sender email not verified. Please verify your FROM_EMAIL in SendGrid.'
      } else if (error.message.includes('Bad Request')) {
        errorMessage = 'Invalid email format or missing required fields.'
      } else {
        errorMessage = error.message
      }
    }
    
    return { success: false, error: errorMessage }
  }
}

async function insertIntoGoogleSheets({ 
  fullName, 
  contactNumber, 
  emailAddress,
  numberOfPax,
  plbConsultant
}: {
  fullName: string
  contactNumber: string
  emailAddress: string
  numberOfPax: string
  plbConsultant: string
}) {
  try {
    const spreadsheetId = process.env.GOOGLE_SHEETS_EVENT_SPREADSHEET_ID
    const clientEmail = process.env.GOOGLE_SHEETS_CLIENT_EMAIL
    const privateKey = process.env.GOOGLE_SHEETS_PRIVATE_KEY
    
    console.log('Google Sheets configuration:', {
      hasSpreadsheetId: !!spreadsheetId,
      hasClientEmail: !!clientEmail,
      hasPrivateKey: !!privateKey
    })
    
    // If Google Sheets credentials are not configured, return error
    if (!spreadsheetId || !clientEmail || !privateKey) {
      console.error('❌ Google Sheets credentials not found')
      return { success: false, error: 'Google Sheets service not configured' }
    }

    console.log('📊 Attempting to insert data into Google Sheets...')
    
    // Process private key to handle different formats and OpenSSL compatibility
    const processPrivateKey = (key: string): string => {
      // Remove quotes if present
      let processedKey = key.replace(/"/g, '')
      
      // Handle different newline formats
      if (processedKey.includes('\\n')) {
        processedKey = processedKey.replace(/\\n/g, '\n')
      }
      
      // Ensure proper PEM format
      if (!processedKey.includes('-----BEGIN PRIVATE KEY-----')) {
        console.error('❌ Invalid private key format')
        throw new Error('Invalid private key format')
      }
      
      return processedKey
    }
    
    // Create JWT client
    const auth = new google.auth.JWT(
      clientEmail,
      undefined,
      processPrivateKey(privateKey),
      ['https://www.googleapis.com/auth/spreadsheets']
    )

    // Create Google Sheets API client
    const sheets = google.sheets({ version: 'v4', auth })

    // Prepare data row
    const timestamp = new Date().toISOString()
    const dataRow = [
      timestamp,
      fullName,
      contactNumber,
      emailAddress,
      numberOfPax,
      plbConsultant,
      'Event Registration',
      'Springleaf Residence Event'
    ]

    // Append data to the spreadsheet
    const response = await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: 'EventRegistrations!A:H', // Updated range to include new columns
      valueInputOption: 'RAW',
      insertDataOption: 'INSERT_ROWS',
      requestBody: {
        values: [dataRow]
      }
    })

    console.log('✅ Data inserted into Google Sheets successfully')
    console.log('📊 Sheets response:', {
      updatedRange: response.data.updates?.updatedRange,
      updatedRows: response.data.updates?.updatedRows,
      updatedColumns: response.data.updates?.updatedColumns
    })
    
    return { success: true, message: 'Data inserted into Google Sheets successfully' }

  } catch (error) {
    console.error('❌ Google Sheets insertion error:', error)
    
    let errorMessage = 'Failed to insert data into Google Sheets'
    
    if (error instanceof Error) {
      if (error.message.includes('Invalid JWT')) {
        errorMessage = 'Invalid Google Sheets credentials. Please check your service account configuration.'
      } else if (error.message.includes('Requested entity was not found')) {
        errorMessage = 'Spreadsheet not found. Please check your GOOGLE_SHEETS_EVENT_SPREADSHEET_ID.'
      } else if (error.message.includes('Permission denied')) {
        errorMessage = 'Permission denied. Please check if the service account has access to the spreadsheet.'
      } else if (error.message.includes('DECODER routines::unsupported') || error.message.includes('ERR_OSSL_UNSUPPORTED')) {
        errorMessage = 'OpenSSL compatibility issue with private key format. Please check the private key format.'
      } else if (error.message.includes('Invalid private key format')) {
        errorMessage = 'Invalid private key format. Please ensure the private key is in correct PEM format.'
      } else {
        errorMessage = error.message
      }
    }
    
    return { success: false, error: errorMessage }
  }
}

async function sendAutoReplyEmail({ fullName, emailAddress }: {
  fullName: string
  emailAddress: string
}) {
  try {
    const isDevelopment = process.env.NODE_ENV === 'development'
    const apiKey = process.env.SENDGRID_API_KEY
    const fromEmail = process.env.FROM_EMAIL || 'noreply@kwsg.com'
    
    console.log('Auto-reply email configuration:', {
      isDevelopment,
      hasApiKey: !!apiKey,
      fromEmail,
      toEmail: emailAddress
    })
    
    // If no API key is set, return error
    if (!apiKey) {
      console.error('❌ SendGrid API key not found')
      return { success: false, error: 'Email service not configured' }
    }

    // If API key is available, try to send real email
    console.log('📧 Attempting to send auto-reply email via SendGrid...')
    
    sgMail.setApiKey(apiKey)

    const emailContent = {
      to: emailAddress,
      from: fromEmail,
      subject: 'Springleaf Residence Live Seminar - Your Seat is Confirmed!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background-color: #B40101; color: white; padding: 20px; text-align: center;">
            <h1 style="margin: 0; font-size: 24px;">KW Singapore</h1>
            <p style="margin: 5px 0 0 0; font-size: 16px;">Springleaf Residence Live Seminar</p>
          </div>
          
          <div style="padding: 30px; background-color: #f9f9f9;">
            <div style="background-color: white; padding: 25px; border-radius: 8px; margin-bottom: 20px;">
              <p style="color: #333; line-height: 1.6; margin: 0 0 15px 0; font-size: 16px;">
                Hi ${fullName},
              </p>
              <p style="color: #333; line-height: 1.6; margin: 0 0 15px 0; font-size: 16px;">
                Thanks for signing up for the Springleaf Residence Live Seminar! Your seat is confirmed.
              </p>
            </div>
            
            <div style="background-color: white; padding: 25px; border-radius: 8px; margin-bottom: 20px;">
              <div style="margin-bottom: 15px; display: flex; align-items: flex-start;">
                <span style="color: #B40101; font-size: 18px; min-width: 20px; margin-right: 10px;">📍</span>
                <div style="flex: 1;">
                  <span style="color: #333; font-weight: bold;">Venue:</span>
                  <span style="color: #333; margin-left: 10px;">Springleaf Residence Showflat - 825A Upper Thomson Rd, Singapore 787135</span>
                  <br>
                  <a href="https://maps.app.goo.gl/C9iSsjFFpA4k4RyC9" style="color: #B40101; text-decoration: none; font-size: 14px;">View on Google Maps</a>
                </div>
              </div>
              
              <div style="margin-bottom: 15px; display: flex; align-items: center;">
                <span style="color: #B40101; font-size: 18px; min-width: 20px; margin-right: 10px;">📅</span>
                <div style="flex: 1;">
                  <span style="color: #333; font-weight: bold;">Date:</span>
                  <span style="color: #333; margin-left: 10px;">Monday, 4 August 2025</span>
                </div>
              </div>
              
              <div style="margin-bottom: 15px; display: flex; align-items: center;">
                <span style="color: #B40101; font-size: 18px; min-width: 20px; margin-right: 10px;">🕖</span>
                <div style="flex: 1;">
                  <span style="color: #333; font-weight: bold;">Time:</span>
                  <span style="color: #333; margin-left: 10px;">7:00PM (Please arrive by 6:45PM for registration)</span>
                </div>
              </div>
            </div>
            
            <div style="background-color: white; padding: 25px; border-radius: 8px; margin-bottom: 20px;">
              <h3 style="color: #B40101; margin-top: 0; margin-bottom: 15px;">What You'll Learn:</h3>
              <p style="color: #333; line-height: 1.6; margin: 0 0 15px 0;">
                Join Melvin Lim (Founder, KW Singapore) and Rayne Chua (New Launch Director) as they walk you through:
              </p>
              <ul style="color: #333; line-height: 1.6; margin: 0; padding-left: 20px;">
                <li style="margin-bottom: 8px;"><span style="color: #B40101;">✅</span> 6 investment frameworks KW uses to analyse new launches</li>
                <li style="margin-bottom: 8px;"><span style="color: #B40101;">✅</span> 7 Springleaf stacks with the strongest future upside</li>
                <li style="margin-bottom: 8px;"><span style="color: #B40101;">✅</span> Why entry PSF is only half the story — and how to plan your exit before you buy</li>
              </ul>
            </div>
            
            <div style="background-color: white; padding: 25px; border-radius: 8px; margin-bottom: 20px;">
              <p style="color: #333; line-height: 1.6; margin: 0 0 15px 0;">
                You'll also get a full walkthrough of the showflat and have a chance to speak directly with our consultants on-site.
              </p>
              <p style="color: #333; line-height: 1.6; margin: 0; font-weight: bold;">
                This is a one-night-only session and seats are limited — we're excited to have you join us!
              </p>
            </div>
            
            <div style="background-color: white; padding: 25px; border-radius: 8px; margin-bottom: 20px;">
              <p style="color: #333; line-height: 1.6; margin: 0 0 10px 0;">
                See you soon,
              </p>
              <p style="color: #B40101; font-weight: bold; margin: 0;">
                KW Singapore
              </p>
            </div>
          </div>
          
          <div style="background-color: #333; color: white; padding: 20px; text-align: center; font-size: 12px;">
            <p style="margin: 0;">© 2025 KW Singapore. All rights reserved.</p>
            <p style="margin: 5px 0 0 0;">This email was sent to ${emailAddress}</p>
          </div>
        </div>
      `
    }

    console.log('📤 Sending auto-reply email via SendGrid...')
    console.log('📧 Email details:', {
      to: emailAddress,
      from: fromEmail,
      subject: emailContent.subject,
      hasHtml: !!emailContent.html
    })
    
    try {
      await sgMail.send(emailContent)
      console.log('✅ Auto-reply email sent successfully via SendGrid')
    } catch (sendError) {
      console.error('❌ SendGrid send error:', sendError)
      throw sendError
    }
    
    return { success: true, message: 'Auto-reply email sent successfully' }

  } catch (error) {
    console.error('❌ Auto-reply email sending error:', error)
    
    let errorMessage = 'Failed to send auto-reply email'
    
    if (error instanceof Error) {
      if (error.message.includes('Unauthorized')) {
        errorMessage = 'Invalid SendGrid API key. Please check your SENDGRID_API_KEY.'
      } else if (error.message.includes('Forbidden')) {
        errorMessage = 'Sender email not verified. Please verify your FROM_EMAIL in SendGrid.'
      } else if (error.message.includes('Bad Request')) {
        errorMessage = 'Invalid email format or missing required fields.'
      } else {
        errorMessage = error.message
      }
    }
    
    return { success: false, error: errorMessage }
  }
} 