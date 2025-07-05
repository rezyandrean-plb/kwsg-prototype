import { NextRequest, NextResponse } from 'next/server'
import sgMail from '@sendgrid/mail'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { 
      fullName, 
      email, 
      mobile, 
      preferences, 
      consent 
    } = body

    console.log('New launch notification form submission received:', { 
      fullName, 
      email, 
      mobile, 
      preferences, 
      consent 
    })

    // Validate required fields
    if (!fullName || !email || !consent) {
      console.log('Validation failed: Missing required fields')
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Send notification email to KW Singapore team
    const notificationResult = await sendNotificationEmail({
      fullName,
      email,
      mobile,
      preferences
    })

    console.log('Notification email result:', notificationResult)

    if (!notificationResult.success) {
      console.error('Failed to send notification email:', notificationResult.error)
    }

    // Send auto-reply email to the applicant
    const autoReplyResult = await sendAutoReplyEmail({
      fullName,
      email
    })

    console.log('Auto-reply result:', autoReplyResult)

    if (!autoReplyResult.success) {
      console.error('Failed to send auto-reply email:', autoReplyResult.error)
    }

    return NextResponse.json({
      success: true,
      message: 'Thank you for your interest in new launch projects! We have sent you a confirmation email and will notify you when our new launch directory goes live.',
      notificationSent: notificationResult.success,
      autoReplySent: autoReplyResult.success
    })

  } catch (error) {
    console.error('New launch notification form error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

async function sendNotificationEmail({ 
  fullName, 
  email, 
  mobile, 
  preferences 
}: {
  fullName: string
  email: string
  mobile: string
  preferences: string
}) {
  try {
    const isDevelopment = process.env.NODE_ENV === 'development'
    const apiKey = process.env.SENDGRID_API_KEY
    const fromEmail = process.env.FROM_EMAIL || 'noreply@kwsg.com'
    const toEmail = 'hello@kwsingapore.com'
    
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
      subject: `New Launch Notification Request: ${fullName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background-color: #B40101; color: white; padding: 20px; text-align: center;">
            <h1 style="margin: 0; font-size: 24px;">KW Singapore - New Launch Notification</h1>
          </div>
          
          <div style="padding: 30px; background-color: #f9f9f9;">
            <h2 style="color: #333; margin-bottom: 20px;">New Launch Notification Request Received</h2>
            
            <div style="background-color: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <h3 style="color: #B40101; margin-top: 0;">Interested Buyer Details</h3>
              
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #333;">Full Name:</td>
                  <td style="padding: 8px 0; color: #666;">${fullName}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #333;">Email:</td>
                  <td style="padding: 8px 0; color: #666;"><a href="mailto:${email}" style="color: #B40101;">${email}</a></td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #333;">Mobile:</td>
                  <td style="padding: 8px 0; color: #666;">
                    ${mobile ? `<a href="tel:${mobile}" style="color: #B40101;">${mobile}</a>` : 'Not provided'}
                  </td>
                </tr>
              </table>
            </div>
            
            ${preferences ? `
            <div style="background-color: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <h3 style="color: #B40101; margin-top: 0;">Preferred Districts or Projects</h3>
              <p style="color: #666; margin: 0; line-height: 1.5;">${preferences}</p>
            </div>
            ` : ''}
            
            <div style="text-align: center; margin-top: 30px;">
              <a href="mailto:${email}" style="background-color: #B40101; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block;">
                Contact Buyer
              </a>
            </div>
          </div>
          
          <div style="background-color: #333; color: white; padding: 20px; text-align: center; font-size: 12px;">
            <p style="margin: 0;">This notification was sent from the KW Singapore new launch directory page.</p>
          </div>
        </div>
      `
    }

    const result = await sgMail.send(emailContent)
    console.log('✅ Notification email sent successfully:', result)
    return { success: true }

  } catch (error) {
    console.error('❌ Failed to send notification email:', error)
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
  }
}

async function sendAutoReplyEmail({ fullName, email }: {
  fullName: string
  email: string
}) {
  try {
    const isDevelopment = process.env.NODE_ENV === 'development'
    const apiKey = process.env.SENDGRID_API_KEY
    const fromEmail = process.env.FROM_EMAIL || 'noreply@kwsg.com'
    
    console.log('Auto-reply email configuration:', {
      isDevelopment,
      hasApiKey: !!apiKey,
      fromEmail
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
      to: email,
      from: fromEmail,
      subject: 'Thank you for your interest in KW Singapore New Launch Projects',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background-color: #B40101; color: white; padding: 20px; text-align: center;">
            <h1 style="margin: 0; font-size: 24px;">KW Singapore</h1>
          </div>
          
          <div style="padding: 30px; background-color: #f9f9f9;">
            <h2 style="color: #333; margin-bottom: 20px;">Thank you for your interest!</h2>
            
            <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">
              Dear ${fullName},
            </p>
            
            <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">
              Thank you for registering your interest in Singapore's latest new launch properties. We're excited to share that we're building a comprehensive directory that will help you discover and explore the newest condominium projects across Singapore.
            </p>
            
            <div style="background-color: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <h3 style="color: #B40101; margin-top: 0;">What to expect:</h3>
              <ul style="color: #666; line-height: 1.6; margin: 0; padding-left: 20px;">
                <li style="margin-bottom: 8px;">Early access to our new launch directory when it goes live</li>
                <li style="margin-bottom: 8px;">Exclusive insights on upcoming projects and market trends</li>
                <li style="margin-bottom: 8px;">Direct connection with KW Singapore consultants for personalized guidance</li>
                <li style="margin-bottom: 8px;">Priority notifications for VIP previews and launch events</li>
              </ul>
            </div>
            
            <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">
              Our team is working hard to bring you the most comprehensive and user-friendly new launch experience. We'll notify you as soon as our directory is ready to launch.
            </p>
            
            <div style="text-align: center; margin-top: 30px;">
              <a href="https://kwsingapore.com" style="background-color: #B40101; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block;">
                Visit KW Singapore
              </a>
            </div>
          </div>
          
          <div style="background-color: #333; color: white; padding: 20px; text-align: center; font-size: 12px;">
            <p style="margin: 0;">© 2024 KW Singapore. All rights reserved.</p>
            <p style="margin: 5px 0 0 0;">This email was sent to ${email}</p>
          </div>
        </div>
      `
    }

    const result = await sgMail.send(emailContent)
    console.log('✅ Auto-reply email sent successfully:', result)
    return { success: true }

  } catch (error) {
    console.error('❌ Failed to send auto-reply email:', error)
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
  }
} 