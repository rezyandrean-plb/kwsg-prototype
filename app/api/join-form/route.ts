import { NextRequest, NextResponse } from 'next/server'
import sgMail from '@sendgrid/mail'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { 
      fullName, 
      email, 
      mobile, 
      experience, 
      currentBrokerage, 
      areasOfInterest, 
      linkedinUrl, 
      consent 
    } = body

    console.log('Join form submission received:', { 
      fullName, 
      email, 
      mobile, 
      experience, 
      currentBrokerage, 
      areasOfInterest, 
      linkedinUrl, 
      consent 
    })

    // Validate required fields
    if (!fullName || !email || !mobile || !experience || !consent) {
      console.log('Validation failed: Missing required fields')
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Validate areas of interest
    if (!areasOfInterest || areasOfInterest.length === 0) {
      console.log('Validation failed: No areas of interest selected')
      return NextResponse.json(
        { error: 'Please select at least one area of interest' },
        { status: 400 }
      )
    }

    // Send notification email to KW Singapore team
    const notificationResult = await sendNotificationEmail({
      fullName,
      email,
      mobile,
      experience,
      currentBrokerage,
      areasOfInterest,
      linkedinUrl
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
      message: 'Thank you for your interest in joining KW Singapore! We have sent you a confirmation email and our Growth Team will reach out to you within 24 business hours.',
      notificationSent: notificationResult.success,
      autoReplySent: autoReplyResult.success
    })

  } catch (error) {
    console.error('Join form error:', error)
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
  experience, 
  currentBrokerage, 
  areasOfInterest, 
  linkedinUrl 
}: {
  fullName: string
  email: string
  mobile: string
  experience: string
  currentBrokerage: string
  areasOfInterest: string[]
  linkedinUrl: string
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

    const experienceText = {
      'new': 'Just starting',
      '1-3': '1–3 years',
      '3-5': '3–5 years',
      '5+': '5+ years'
    }[experience] || experience

    const emailContent = {
      to: toEmail,
      from: fromEmail,
      subject: `New Join KW Singapore Application: ${fullName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background-color: #B40101; color: white; padding: 20px; text-align: center;">
            <h1 style="margin: 0; font-size: 24px;">KW Singapore - New Application</h1>
          </div>
          
          <div style="padding: 30px; background-color: #f9f9f9;">
            <h2 style="color: #333; margin-bottom: 20px;">New Join Application Received</h2>
            
            <div style="background-color: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <h3 style="color: #B40101; margin-top: 0;">Applicant Details</h3>
              
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
                  <td style="padding: 8px 0; color: #666;"><a href="tel:${mobile}" style="color: #B40101;">${mobile}</a></td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #333;">Experience:</td>
                  <td style="padding: 8px 0; color: #666;">${experienceText}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #333;">Current Brokerage:</td>
                  <td style="padding: 8px 0; color: #666;">${currentBrokerage || 'Not specified'}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #333;">LinkedIn/Portfolio:</td>
                  <td style="padding: 8px 0; color: #666;">
                    ${linkedinUrl ? `<a href="${linkedinUrl}" target="_blank" style="color: #B40101;">View Profile</a>` : 'Not provided'}
                  </td>
                </tr>
              </table>
            </div>
            
            <div style="background-color: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <h3 style="color: #B40101; margin-top: 0;">Areas of Interest</h3>
              <ul style="margin: 0; padding-left: 20px; color: #666;">
                ${areasOfInterest.map(area => `<li style="margin-bottom: 5px;">${area}</li>`).join('')}
              </ul>
            </div>
            
            <div style="text-align: center; margin-top: 30px;">
              <a href="mailto:${email}" style="background-color: #B40101; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block;">
                Reply to Applicant
              </a>
            </div>
          </div>
          
          <div style="background-color: #333; color: white; padding: 20px; text-align: center; font-size: 12px;">
            <p style="margin: 0;">© 2024 KW Singapore. All rights reserved.</p>
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
      fromEmail,
      toEmail: email
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
      subject: `Your KW Singapore application has been received`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background-color: #B40101; color: white; padding: 20px; text-align: center;">
            <h1 style="margin: 0; font-size: 24px;">KW Singapore</h1>
          </div>
          
          <div style="padding: 30px; background-color: #f9f9f9;">
            <h2 style="color: #333; margin-bottom: 20px;">Hello, ${fullName}</h2>
            
            <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">
              Thank you for your interest in joining KW Singapore! We've received your application and we're excited about the possibility of working together.
            </p>
            
            <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">
              Our Growth Team has been notified and will review your application carefully. We aim to get back to you within 24 business hours to discuss next steps.
            </p>
            
            <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">
              In the meantime, if you have any urgent questions, please don't hesitate to reach out to us directly at <strong>hello@kwsingapore.com</strong> or call us at <strong>+65 9123 4567</strong>.
            </p>
            
            <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">
              We look forward to potentially welcoming you to the KW Singapore family!
            </p>
            
            <p style="color: #666; line-height: 1.6;">
              Best regards,<br>
              <strong>The KW Singapore Growth Team</strong>
            </p>
          </div>
          
          <div style="background-color: #333; color: white; padding: 20px; text-align: center; font-size: 12px;">
            <p style="margin: 0;">© 2024 KW Singapore. All rights reserved.</p>
            <p style="margin: 5px 0 0 0;">This email was sent to ${email}</p>
          </div>
        </div>
      `
    }

    console.log('📤 Sending auto-reply email via SendGrid...')
    console.log('📧 Email details:', {
      to: email,
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
