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

    console.log('W Residences Marina View form submission received:', { 
      fullName, 
      contactNumber, 
      emailAddress, 
      preferredDate, 
      preferredTiming,
      hasRecaptchaToken: !!recaptchaToken
    })

    // Validate required fields
    if (!fullName || !contactNumber) {
      console.log('Validation failed: Missing required fields')
      return NextResponse.json(
        { error: 'Full name and contact number are required' },
        { status: 400 }
      )
    }

    // Validate reCAPTCHA token
    if (!recaptchaToken) {
      console.log('Validation failed: Missing reCAPTCHA token')
      return NextResponse.json(
        { error: 'reCAPTCHA verification is required' },
        { status: 400 }
      )
    }

    // Verify reCAPTCHA token
    const recaptchaVerification = await verifyRecaptcha(recaptchaToken)
    if (!recaptchaVerification.success) {
      console.log('reCAPTCHA verification failed:', recaptchaVerification.error)
      return NextResponse.json(
        { error: 'reCAPTCHA verification failed. Please try again.' },
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

    // Send auto-reply email to the contact (if email provided)
    let autoReplyResult: { success: boolean } | null = null
    if (emailAddress) {
      autoReplyResult = await sendAutoReplyEmail({
        fullName,
        emailAddress
      })

      console.log('Auto-reply result:', autoReplyResult)

      if (!autoReplyResult.success) {
        console.error('Failed to send auto-reply email:', (autoReplyResult as any).error)
      }
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
      message: 'Thank you for your interest in W Residences Marina View! We have sent you a confirmation email and our team will contact you soon to arrange your showflat visit.',
      notificationSent: notificationResult.success,
      autoReplySent: autoReplyResult?.success || false,
      sheetsInserted: sheetsResult.success
    })

  } catch (error) {
    console.error('W Residences Marina View form error:', error)
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
  emailAddress?: string
  preferredDate?: Date
  preferredTiming?: string
}) {
  try {
    const isDevelopment = process.env.NODE_ENV === 'development'
    const apiKey = process.env.SENDGRID_API_KEY
    const fromEmail = process.env.FROM_EMAIL || 'noreply@kwsingapore.com'
    const toEmails = [
      process.env.W_RESIDENCES_LEAD_TO_EMAIL || 'consults@propertylimbrothers.com'
    ]
    
    console.log('Notification email configuration (W Residences Marina View):', {
      isDevelopment,
      hasApiKey: !!apiKey,
      fromEmail,
      toEmails
    })
    
    if (!apiKey) {
      console.error('❌ SendGrid API key not found')
      return { success: false, error: 'Email service not configured' }
    }

    sgMail.setApiKey(apiKey)

    const formatDate = (date?: Date) => {
      if (!date) return 'Not specified'
      return new Date(date).toLocaleDateString('en-SG', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    }

    const emailContent = {
      to: toEmails,
      from: fromEmail,
      subject: `New W Residences Marina View Showflat Visit Request - ${fullName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background-color: #B40101; color: white; padding: 20px; text-align: center;">
            <h1 style="margin: 0; font-size: 24px;">KW Singapore</h1>
            <p style="margin: 5px 0 0 0; font-size: 16px;">W Residences Marina View Showflat Visit Request</p>
          </div>
          
          <div style="padding: 30px; background-color: #f9f9f9;">
            <h2 style="color: #333; margin-bottom: 20px;">New Showflat Visit Request</h2>
            
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
                  <td style="padding: 8px 0; border-bottom: 1px solid #eee; color: #333;">${emailAddress || 'Not provided'}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; border-bottom: 1px solid #eee; font-weight: bold; color: #666;">Preferred Date:</td>
                  <td style="padding: 8px 0; border-bottom: 1px solid #eee; color: #333;">${formatDate(preferredDate)}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; border-bottom: 1px solid #eee; font-weight: bold; color: #666;">Preferred Time:</td>
                  <td style="padding: 8px 0; border-bottom: 1px solid #eee; color: #333;">${preferredTiming || 'Not specified'}</td>
                </tr>
              </table>
            </div>
            
            <div style="background-color: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <h3 style="color: #B40101; margin-top: 0;">Project Details</h3>
              <p style="color: #666; line-height: 1.6; margin: 0;">
                <strong>Project:</strong> W Residences Marina View<br>
                <strong>Location:</strong> Sentosa Cove, Singapore<br>
                <strong>Developer:</strong> (W Residences Marina View Developer)<br>
              </p>
            </div>
            
            <div style="text-align: center; margin-top: 30px;">
              <a href="tel:${contactNumber}" style="background-color: #B40101; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block; margin-right: 10px;">
                Call Contact
              </a>
              ${emailAddress ? `<a href="mailto:${emailAddress}" style="background-color: #333; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block;">
                Email Contact
              </a>` : ''}
            </div>
          </div>
          
          <div style="background-color: #333; color: white; padding: 20px; text-align: center; font-size: 12px;">
            <p style="margin: 0;">© 2025 KW Singapore. All rights reserved.</p>
            <p style="margin: 5px 0 0 0;">This notification was sent to ${toEmails.join(', ')}</p>
          </div>
        </div>
      `
    }

    console.log('📤 Sending notification email via SendGrid (W Residences Marina View)...')
    console.log('📧 Email details:', {
      to: toEmails,
      from: fromEmail,
      subject: emailContent.subject,
      hasHtml: !!emailContent.html
    })
    
    try {
      await sgMail.send(emailContent as any)
      console.log('✅ Notification email sent successfully via SendGrid (W Residences Marina View)')
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

async function sendAutoReplyEmail({ fullName, emailAddress }: {
  fullName: string
  emailAddress: string
}) {
  try {
    const apiKey = process.env.SENDGRID_API_KEY
    const fromEmail = process.env.FROM_EMAIL || 'noreply@kwsingapore.com'
    
    console.log('Auto-reply email configuration (W Residences Marina View):', {
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
      subject: `W Residences Marina View Showflat Visit Request Confirmation - KW Singapore`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background-color: #B40101; color: white; padding: 20px; text-align: center;">
            <h1 style="margin: 0; font-size: 24px;">KW Singapore</h1>
            <p style="margin: 5px 0 0 0; font-size: 16px;">W Residences Marina View Showflat Visit</p>
          </div>
          
          <div style="padding: 30px; background-color: #f9f9f9;">
            <h2 style="color: #333; margin-bottom: 20px;">Thank You for Your Interest!</h2>
            
            <div style="background-color: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <p style="color: #666; line-height: 1.6; margin: 0;">
                Dear ${fullName},
              </p>
              <p style="color: #666; line-height: 1.6; margin: 10px 0 0 0;">
                Thank you for your interest in W Residences Marina View! We have received your showflat visit request and our team will contact you within 24 business hours to arrange your visit.
              </p>
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

    console.log('📤 Sending auto-reply email via SendGrid (W Residences Marina View)...')
    console.log('📧 Email details:', {
      to: emailAddress,
      from: fromEmail,
      subject: emailContent.subject,
      hasHtml: !!emailContent.html
    })
    
    try {
      await sgMail.send(emailContent as any)
      console.log('✅ Auto-reply email sent successfully via SendGrid (W Residences Marina View)')
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

async function insertIntoGoogleSheets({ 
  fullName, 
  contactNumber, 
  emailAddress, 
  preferredDate, 
  preferredTiming
}: {
  fullName: string
  contactNumber: string
  emailAddress?: string
  preferredDate?: Date
  preferredTiming?: string
}) {
  try {
    const rawSpreadsheetEnv = process.env.GOOGLE_SHEETS_W_RESIDENCES_SPREADSHEET_ID
    let spreadsheetId = rawSpreadsheetEnv
    if (rawSpreadsheetEnv && rawSpreadsheetEnv.includes('/d/')) {
      const match = rawSpreadsheetEnv.match(/\/d\/([^/]+)/)
      spreadsheetId = match ? match[1] : rawSpreadsheetEnv
    }
    const clientEmail = process.env.GOOGLE_SHEETS_CLIENT_EMAIL
    const privateKey = process.env.GOOGLE_SHEETS_PRIVATE_KEY
    const targetRange = process.env.GOOGLE_SHEETS_W_RESIDENCES_LEAD_RANGE || 'ShowflatVisitRequests!A:I'
    
    console.log('Google Sheets configuration (W Residences Marina View):', {
      hasSpreadsheetId: !!spreadsheetId,
      hasClientEmail: !!clientEmail,
      hasPrivateKey: !!privateKey
    })
    
    if (!spreadsheetId || !clientEmail || !privateKey) {
      console.error('❌ Google Sheets credentials not found')
      return { success: false, error: 'Google Sheets service not configured' }
    }

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
    const formatDate = (date?: Date) => {
      if (!date) return 'Not specified'
      return new Date(date).toLocaleDateString('en-SG', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    }
    
    const dataRow = [
      timestamp,
      fullName,
      emailAddress || 'Not provided',
      contactNumber,
      'W Residences Marina View',
      'Sentosa Cove',
      'W Residences Marina View Developer',
      formatDate(preferredDate),
      preferredTiming || 'Not specified'
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
    } catch (appendError: any) {
      if (appendError instanceof Error && appendError.message.includes('protected cell or object')) {
        const currentData = await sheets.spreadsheets.values.get({
          spreadsheetId,
          range: targetRange.split('!')[0] + '!A:A'
        })
        const nextRow = (currentData.data.values?.length || 1) + 1
        const baseTab = targetRange.split('!')[0]
        const range = `${baseTab}!A${nextRow}:I${nextRow}`
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

    console.log('✅ Data inserted into Google Sheets successfully (W Residences Marina View)')
    if ('updates' in (response as any).data) {
      console.log('📊 Sheets append response:', (response as any).data.updates)
    }
    return { success: true, message: 'Data inserted into Google Sheets successfully' }

  } catch (error: any) {
    console.error('❌ Google Sheets insertion error:', error)
    let errorMessage = 'Failed to insert data into Google Sheets'
    if (error instanceof Error) {
      if (error.message.includes('Invalid JWT')) {
        errorMessage = 'Invalid Google Sheets credentials. Please check your service account configuration.'
      } else if (error.message.includes('Requested entity was not found')) {
        errorMessage = 'Spreadsheet not found. Please check your GOOGLE_SHEETS_W_RESIDENCES_SPREADSHEET_ID.'
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

async function verifyRecaptcha(token: string) {
  try {
    const secretKey = process.env.RECAPTCHA_SECRET_KEY
    
    if (!secretKey) {
      console.error('❌ reCAPTCHA secret key not found')
      return { success: false, error: 'reCAPTCHA service not configured' }
    }

    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        secret: secretKey,
        response: token,
      }),
    })

    const data = await response.json()
    
    console.log('reCAPTCHA verification response:', {
      success: data.success,
      score: data.score,
      action: data.action,
      challenge_ts: data.challenge_ts,
      hostname: data.hostname
    })

    if (data.success && data.score >= 0.5) {
      return { success: true, score: data.score }
    } else {
      return { 
        success: false, 
        error: data.success ? `reCAPTCHA score too low: ${data.score}` : 'reCAPTCHA verification failed'
      }
    }

  } catch (error) {
    console.error('❌ reCAPTCHA verification error:', error)
    return { success: false, error: 'Failed to verify reCAPTCHA' }
  }
}


