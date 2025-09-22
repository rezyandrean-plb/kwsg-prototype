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

    console.log('Penrith Event registration form submission received:', { 
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
      message: 'Thank you for registering for the Penrith Event! We have sent you a confirmation email and will contact you soon with event details.',
      notificationSent: notificationResult.success,
      autoReplySent: autoReplyResult.success,
      sheetsInserted: sheetsResult.success
    })

  } catch (error) {
    console.error('Penrith Event registration form error:', error)
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
    const apiKey = process.env.SENDGRID_API_KEY
    const fromEmail = process.env.FROM_EMAIL || 'noreply@kwsingapore.com'
    const toEmail = process.env.PENRITH_EVENT_TO_EMAIL || 'events@propertylimbrothers.com'

    console.log('Notification email configuration (Penrith):', {
      hasApiKey: !!apiKey,
      fromEmail,
      toEmail
    })

    if (!apiKey) {
      console.error('❌ SendGrid API key not found')
      return { success: false, error: 'Email service not configured' }
    }

    sgMail.setApiKey(apiKey)

    const emailContent = {
      to: toEmail,
      from: fromEmail,
      subject: 'New Penrith Event Registration - KW Singapore',
      bcc: 'cynthia.loh@propertylimbrothers.com',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background-color: #B40101; color: white; padding: 20px; text-align: center;">
            <h1 style="margin: 0; font-size: 24px;">KW Singapore</h1>
            <p style="margin: 5px 0 0 0; font-size: 16px;">Penrith Event Registration</p>
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
          </div>
          <div style="background-color: #333; color: white; padding: 20px; text-align: center; font-size: 12px;">
            <p style="margin: 0;">© 2025 KW Singapore. All rights reserved.</p>
            <p style="margin: 5px 0 0 0;">This notification was sent to ${toEmail}</p>
          </div>
        </div>
      `
    }

    try {
      await sgMail.send(emailContent)
      console.log('✅ Notification email sent successfully via SendGrid (Penrith)')
    } catch (sendError) {
      console.error('❌ SendGrid send error:', sendError)
      throw sendError
    }
    
    return { success: true, message: 'Notification email sent successfully' }

  } catch (error) {
    console.error('❌ Notification email sending error:', error)
    let errorMessage = 'Failed to send notification email'
    if (error instanceof Error) {
      errorMessage = error.message
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
    // Accept either a raw spreadsheet ID or a full Google Sheets URL in env
    const rawSpreadsheetEnv = process.env.GOOGLE_SHEETS_PENRITH_EVENT_SPREADSHEET_ID
    let spreadsheetId = rawSpreadsheetEnv
    if (rawSpreadsheetEnv && rawSpreadsheetEnv.includes('/d/')) {
      const match = rawSpreadsheetEnv.match(/\/d\/([^/]+)/)
      spreadsheetId = match ? match[1] : rawSpreadsheetEnv
    }
    const clientEmail = process.env.GOOGLE_SHEETS_CLIENT_EMAIL
    const privateKey = process.env.GOOGLE_SHEETS_PRIVATE_KEY
    const targetRange = process.env.GOOGLE_SHEETS_PENRITH_EVENT_RANGE || 'EventRegistrations!A:H'

    console.log('Google Sheets configuration (Penrith):', {
      hasSpreadsheetId: !!spreadsheetId,
      hasClientEmail: !!clientEmail,
      hasPrivateKey: !!privateKey
    })

    if (!spreadsheetId || !clientEmail || !privateKey) {
      console.error('❌ Google Sheets credentials not found')
      return { success: false, error: 'Google Sheets service not configured' }
    }

    // Process private key
    const processPrivateKey = (key: string): string => {
      let processedKey = key.replace(/"/g, '')
      if (processedKey.includes('\\n')) {
        processedKey = processedKey.replace(/\\n/g, '\n')
      }
      if (!processedKey.includes('-----BEGIN PRIVATE KEY-----')) {
        throw new Error('Invalid private key format')
      }
      return processedKey
    }

    const auth = new google.auth.JWT(
      clientEmail,
      undefined,
      processPrivateKey(privateKey),
      ['https://www.googleapis.com/auth/spreadsheets']
    )

    const sheets = google.sheets({ version: 'v4', auth })
    const timestamp = new Date().toLocaleString('en-SG', { 
      timeZone: 'Asia/Singapore',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    })
    const dataRow = [
      timestamp,
      fullName,
      contactNumber,
      emailAddress,
      numberOfPax,
      plbConsultant,
      'Event Registration',
      'Penrith Event'
    ]

    let response
    try {
      response = await sheets.spreadsheets.values.append({
        spreadsheetId,
        range: targetRange,
        valueInputOption: 'RAW',
        insertDataOption: 'INSERT_ROWS',
        requestBody: { values: [dataRow] }
      })
    } catch (appendError) {
      if (appendError instanceof Error && appendError.message.includes('protected cell or object')) {
        const currentData = await sheets.spreadsheets.values.get({
          spreadsheetId,
          range: targetRange.split('!')[0] + '!A:A'
        })
        const nextRow = (currentData.data.values?.length || 1) + 1
        const baseTab = targetRange.split('!')[0]
        const range = `${baseTab}!A${nextRow}:H${nextRow}`
        response = await sheets.spreadsheets.values.update({
          spreadsheetId,
          range,
          valueInputOption: 'RAW',
          requestBody: { values: [dataRow] }
        })
      } else {
        throw appendError
      }
    }

    console.log('✅ Data inserted into Google Sheets successfully (Penrith)')
    if ('updates' in response.data) {
      console.log('Sheets append response:', response.data.updates)
    }
    return { success: true, message: 'Data inserted into Google Sheets successfully' }

  } catch (error) {
    console.error('❌ Google Sheets insertion error:', error)
    let errorMessage = 'Failed to insert data into Google Sheets'
    if (error instanceof Error) {
      errorMessage = error.message
    }
    return { success: false, error: errorMessage }
  }
}

async function sendAutoReplyEmail({ fullName, emailAddress }: {
  fullName: string
  emailAddress: string
}) {
  try {
    const apiKey = process.env.SENDGRID_API_KEY
    const fromEmail = process.env.FROM_EMAIL || 'noreply@kwsingapore.com'

    console.log('Auto-reply email configuration (Penrith):', {
      hasApiKey: !!apiKey,
      fromEmail,
      toEmail: emailAddress
    })

    if (!apiKey) {
      console.error('❌ SendGrid API key not found')
      return { success: false, error: 'Email service not configured' }
    }

    sgMail.setApiKey(apiKey)

    const emailContent = {
      to: emailAddress,
      from: fromEmail,
      subject: 'Penrith Consumer Event - Your Seat is Confirmed!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background-color: #B40101; color: white; padding: 20px; text-align: center;">
            <h1 style="margin: 0; font-size: 24px;">KW Singapore</h1>
            <p style="margin: 5px 0 0 0; font-size: 16px;">Penrith Consumer Event</p>
          </div>
          
          <div style="padding: 30px; background-color: #f9f9f9;">
            <div style="background-color: white; padding: 25px; border-radius: 8px; margin-bottom: 20px;">
              <p style="color: #333; line-height: 1.6; margin: 0 0 15px 0; font-size: 16px;">
                Hi ${fullName},
              </p>
              <p style="color: #333; line-height: 1.6; margin: 0 0 15px 0; font-size: 16px;">
                Thank you for registering for Penrith Consumer Event hosted by KW Singapore and PropertyLimBrothers.
              </p>
            </div>
            
            <div style="background-color: white; padding: 25px; border-radius: 8px; margin-bottom: 20px;">
              <div style="margin-bottom: 15px; display: flex; align-items: flex-start;">
                <span style="color: #B40101; font-size: 18px; min-width: 20px; margin-right: 10px;">📍</span>
                <div style="flex: 1;">
                  <span style="color: #333; font-weight: bold;">Venue:</span>
                  <span style="color: #333; margin-left: 10px;">Penrith Showflat, 6A Margaret Drive, Singapore 142006</span>
                  <br>
                  <a href="https://maps.google.com/?q=6A+Margaret+Drive+Singapore+142006" style="color: #B40101; text-decoration: none; font-size: 14px;">View on Google Maps</a>
                </div>
              </div>
              
              <div style="margin-bottom: 15px; display: flex; align-items: center;">
                <span style="color: #B40101; font-size: 18px; min-width: 20px; margin-right: 10px;">📅</span>
                <div style="flex: 1;">
                  <span style="color: #333; font-weight: bold;">Date:</span>
                  <span style="color: #333; margin-left: 10px;">Wednesday, 8 October 2025</span>
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
                Join Melvin Lim (Operating Principal, KW Singapore) and Rayne Chua (New Launch Director, KW Singapore) as they walk you through:
              </p>
              <ul style="color: #333; line-height: 1.6; margin: 0; padding-left: 20px;">
                <li style="margin-bottom: 8px;"><span style="color: #B40101;">✅</span> Framework to analyse projects near high-performing launches and assess their impact on current demand</li>
                <li style="margin-bottom: 8px;"><span style="color: #B40101;">✅</span> District 3 historical performance insights, highlighting trends investor returns</li>
                <li style="margin-bottom: 8px;"><span style="color: #B40101;">✅</span> Data-driven evaluation of price gaps between Queenstown resale and new launches to identify optimal entry points</li>
                <li style="margin-bottom: 8px;"><span style="color: #B40101;">✅</span> Structured methodology to model exit risk and forecast upside for maximum returns</li>
              </ul>
              <p style="color: #333; line-height: 1.6; margin: 15px 0 0 0; font-weight: bold;">
                Plus: 1‑on‑1 portfolio consultation and guided showflat tour with our expert consultants
              </p>
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
              <p style="color: #333; line-height: 1.6; margin: 0 0 15px 0;">
                If you have any queries in the meantime, feel free to reach out to our team at: 
                <a href="https://wa.me/6597457388" style="color: #B40101; text-decoration: none; font-weight: bold;">+65 9745 7388</a>
              </p>
              <p style="color: #333; line-height: 1.6; margin: 0 0 10px 0;">
                See you soon!
              </p>
            </div>
            
            <div style="background-color: white; padding: 25px; border-radius: 8px; margin-bottom: 20px;">
              <p style="color: #333; line-height: 1.6; margin: 0 0 10px 0;">
                Best Regards,
              </p>
              <p style="color: #B40101; font-weight: bold; margin: 0;">
                KW Singapore & PropertyLimBrothers
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

    try {
      await sgMail.send(emailContent)
      console.log('✅ Auto-reply email sent successfully via SendGrid (Penrith)')
    } catch (sendError) {
      console.error('❌ SendGrid send error:', sendError)
      throw sendError
    }
    
    return { success: true, message: 'Auto-reply email sent successfully' }

  } catch (error) {
    console.error('❌ Auto-reply email sending error:', error)
    let errorMessage = 'Failed to send auto-reply email'
    if (error instanceof Error) {
      errorMessage = error.message
    }
    return { success: false, error: errorMessage }
  }
}


