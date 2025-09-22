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
      preferredDate,
      preferredTiming,
      recaptchaToken
    } = body

    console.log('Penrith Lead Generation form submission received:', { 
      fullName, 
      contactNumber, 
      emailAddress,
      preferredDate,
      preferredTiming
    })

    // Validate required fields
    if (!fullName || !contactNumber || !emailAddress) {
      console.log('Validation failed: Missing required fields')
      return NextResponse.json(
        { error: 'Full name, contact number, and email address are required' },
        { status: 400 }
      )
    }

    // Send notification email to KW Singapore team
    const notificationResult = await sendNotificationEmail({
      fullName,
      contactNumber,
      emailAddress,
      preferredDate,
      preferredTiming
    })

    console.log('Notification email result:', notificationResult)
    if (!notificationResult.success) {
      console.error('Failed to send notification email:', notificationResult.error)
    }

    // Send auto-reply email to the registrant (same as Penrith event)
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
      preferredDate,
      preferredTiming
    })

    console.log('Google Sheets result:', sheetsResult)
    if (!sheetsResult.success) {
      console.error('Failed to insert into Google Sheets:', sheetsResult.error)
    }

    return NextResponse.json({
      success: true,
      message: 'Thank you for your interest in Penrith! We have sent you a confirmation email and our team will contact you soon to arrange your showflat visit.',
      notificationSent: notificationResult.success,
      autoReplySent: autoReplyResult.success,
      sheetsInserted: sheetsResult.success
    })

  } catch (error) {
    console.error('Penrith Lead Generation form error:', error)
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
  preferredDate,
  preferredTiming
}: {
  fullName: string
  contactNumber: string
  emailAddress: string
  preferredDate: string | undefined
  preferredTiming: string
}) {
  try {
    const apiKey = process.env.SENDGRID_API_KEY
    const fromEmail = process.env.FROM_EMAIL || 'noreply@kwsingapore.com'
    const toEmail = process.env.PENRITH_LEAD_TO_EMAIL || 'consults@propertylimbrothers.com'

    console.log('Notification email configuration (Penrith Lead):', {
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
      subject: 'New Penrith Lead Generation - KW Singapore',
      bcc: 'cynthia.loh@propertylimbrothers.com',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background-color: #B40101; color: white; padding: 20px; text-align: center;">
            <h1 style="margin: 0; font-size: 24px;">KW Singapore</h1>
            <p style="margin: 5px 0 0 0; font-size: 16px;">Penrith Lead Generation</p>
          </div>
          <div style="padding: 30px; background-color: #f9f9f9;">
            <h2 style="color: #333; margin-bottom: 20px;">New Lead Generation Request</h2>
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
                  <td style="padding: 8px 0; border-bottom: 1px solid #eee; font-weight: bold; color: #666;">Preferred Date:</td>
                  <td style="padding: 8px 0; border-bottom: 1px solid #eee; color: #333;">${preferredDate || 'Not specified'}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #666;">Preferred Timing:</td>
                  <td style="padding: 8px 0; color: #333;">${preferredTiming || 'Not specified'}</td>
                </tr>
              </table>
            </div>
            <div style="text-align: center; margin-top: 30px;">
              <a href="mailto:${emailAddress}" style="background-color: #B40101; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block;">
                Reply to Lead
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

    try {
      await sgMail.send(emailContent)
      console.log('✅ Notification email sent successfully via SendGrid (Penrith Lead)')
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
  preferredDate,
  preferredTiming
}: {
  fullName: string
  contactNumber: string
  emailAddress: string
  preferredDate: string | undefined
  preferredTiming: string
}) {
  try {
    // Accept either a raw spreadsheet ID or a full Google Sheets URL in env
    const rawSpreadsheetEnv = process.env.GOOGLE_SHEETS_PENRITH_LEAD_SPREADSHEET_ID
    let spreadsheetId = rawSpreadsheetEnv
    if (rawSpreadsheetEnv && rawSpreadsheetEnv.includes('/d/')) {
      const match = rawSpreadsheetEnv.match(/\/d\/([^/]+)/)
      spreadsheetId = match ? match[1] : rawSpreadsheetEnv
    }
    const clientEmail = process.env.GOOGLE_SHEETS_CLIENT_EMAIL
    const privateKey = process.env.GOOGLE_SHEETS_PRIVATE_KEY
    const targetRange = process.env.GOOGLE_SHEETS_PENRITH_LEAD_RANGE || 'ShowflatVisitRequests!A:J'

    console.log('Google Sheets configuration (Penrith Lead):', {
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
      'Penrith',
      'Margaret Drive, District 3 (Queenstown), Singapore',
      'Hong Leong Holdings & GuocoLand (Margaret Rise Development Pte Ltd)',
      preferredDate || '',
      preferredTiming || '',
      'Penrith Lead Generation'
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
        const range = `${baseTab}!A${nextRow}:J${nextRow}`
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

    console.log('✅ Data inserted into Google Sheets successfully (Penrith Lead)')
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

    console.log('Auto-reply email configuration (Penrith Lead):', {
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
      subject: 'Penrith Showflat Visit Request Confirmation - KW Singapore',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background-color: #B40101; color: white; padding: 20px; text-align: center;">
            <h1 style="margin: 0; font-size: 24px;">KW Singapore</h1>
            <p style="margin: 5px 0 0 0; font-size: 16px;">Penrith Showflat Visit</p>
          </div>
          
          <div style="padding: 30px; background-color: #f9f9f9;">
            <h2 style="color: #333; margin-bottom: 20px;">Thank You for Your Interest!</h2>
            
            <div style="background-color: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <p style="color: #666; line-height: 1.6; margin: 0;">
                Dear ${fullName},
              </p>
              <p style="color: #666; line-height: 1.6; margin: 10px 0 0 0;">
                Thank you for your interest in Penrith! We have received your showflat visit request and our team will contact you within 24 business hours to arrange your visit.
              </p>
            </div>
            
            <div style="background-color: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <h3 style="color: #B40101; margin-top: 0;">What's Next?</h3>
              <ul style="color: #666; line-height: 1.6; margin: 0; padding-left: 20px;">
                <li>Our team will call you to confirm your preferred visit date and time</li>
                <li>We'll provide you with detailed directions to the showflat</li>
                <li>You'll receive exclusive information about unit availability and pricing</li>
                <li>Our property experts will be available to answer all your questions</li>
              </ul>
            </div>
            
            <div style="background-color: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <h3 style="color: #B40101; margin-top: 0;">About Penrith</h3>
              <ul style="color: #666; line-height: 1.6; margin: 0; padding-left: 20px;">
                <li>District 3, Queenstown - Prime location in Margaret Drive</li>
                <li>Developed by Hong Leong Holdings & GuocoLand</li>
                <li>Premium residential development with modern amenities</li>
                <li>Strategic location near Queenstown MRT and amenities</li>
                <li>Excellent investment potential in District 3</li>
                <li>Limited units available for preview</li>
              </ul>
            </div>
            
            <div style="text-align: center; margin-top: 30px;">
              <p style="color: #666; margin-bottom: 20px;">
                Have questions? Contact our team at 
                <a href="mailto:hello@kwsingapore.com" style="color: #B40101;">hello@kwsingapore.com</a>
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
      console.log('✅ Auto-reply email sent successfully via SendGrid (Penrith Lead)')
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
