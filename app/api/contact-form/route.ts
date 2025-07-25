import { NextRequest, NextResponse } from 'next/server'
import sgMail from '@sendgrid/mail'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { 
      firstName, 
      lastName, 
      email, 
      phone, 
      subject, 
      message,
      recaptchaToken 
    } = body

    console.log('Contact form submission received:', { 
      firstName, 
      lastName, 
      email, 
      phone, 
      subject, 
      message,
      hasRecaptchaToken: !!recaptchaToken
    })

    // Validate required fields
    if (!firstName || !lastName || !email || !subject || !message) {
      console.log('Validation failed: Missing required fields')
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Verify reCAPTCHA token
    if (!recaptchaToken) {
      console.log('Validation failed: Missing reCAPTCHA token')
      return NextResponse.json(
        { error: 'Security verification required' },
        { status: 400 }
      )
    }

    const recaptchaVerification = await verifyRecaptcha(recaptchaToken)
    
    if (!recaptchaVerification.success) {
      console.log('reCAPTCHA verification failed:', recaptchaVerification.error)
      return NextResponse.json(
        { error: 'Security verification failed. Please try again.' },
        { status: 400 }
      )
    }

    console.log('reCAPTCHA verification successful, score:', recaptchaVerification.score)

    const fullName = `${firstName} ${lastName}`

    // Send notification email to KW Singapore team
    const notificationResult = await sendNotificationEmail({
      firstName,
      lastName,
      fullName,
      email,
      phone,
      subject,
      message
    })

    console.log('Notification email result:', notificationResult)

    if (!notificationResult.success) {
      console.error('Failed to send notification email:', notificationResult.error)
    }

    // Send auto-reply email to the contact
    const autoReplyResult = await sendAutoReplyEmail({
      fullName,
      email,
      subject
    })

    console.log('Auto-reply result:', autoReplyResult)

    if (!autoReplyResult.success) {
      console.error('Failed to send auto-reply email:', autoReplyResult.error)
    }

    return NextResponse.json({
      success: true,
      message: 'Thank you for your message! We have sent you a confirmation email and our team will get back to you within 24 business hours.',
      notificationSent: notificationResult.success,
      autoReplySent: autoReplyResult.success,
      recaptchaScore: recaptchaVerification.score
    })

  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
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

async function sendNotificationEmail({ 
  firstName, 
  lastName, 
  fullName, 
  email, 
  phone, 
  subject, 
  message 
}: {
  firstName: string
  lastName: string
  fullName: string
  email: string
  phone: string
  subject: string
  message: string
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

    const subjectText = {
      'general': 'General Inquiry',
      'partnership': 'Partnership',
      'bootcamp': 'Training & Events',
      'property': 'Property Inquiry',
      'career': 'Career Opportunities',
      'media': 'Media Services',
      'other': 'Other'
    }[subject] || subject

    const emailContent = {
      to: toEmail,
      from: fromEmail,
      subject: `New Contact Form Submission: ${subjectText} - ${fullName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background-color: #B40101; color: white; padding: 20px; text-align: center;">
            <h1 style="margin: 0; font-size: 24px;">KW Singapore - New Contact Form</h1>
          </div>
          
          <div style="padding: 30px; background-color: #f9f9f9;">
            <h2 style="color: #333; margin-bottom: 20px;">New Contact Form Submission</h2>
            
            <div style="background-color: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <h3 style="color: #B40101; margin-top: 0;">Contact Details</h3>
              
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
                  <td style="padding: 8px 0; font-weight: bold; color: #333;">Phone:</td>
                  <td style="padding: 8px 0; color: #666;">
                    ${phone ? `<a href="tel:${phone}" style="color: #B40101;">${phone}</a>` : 'Not provided'}
                  </td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #333;">Subject:</td>
                  <td style="padding: 8px 0; color: #666;">${subjectText}</td>
                </tr>
              </table>
            </div>
            
            <div style="background-color: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <h3 style="color: #B40101; margin-top: 0;">Message</h3>
              <p style="color: #666; line-height: 1.6; margin: 0; white-space: pre-wrap;">${message}</p>
            </div>
            
            <div style="text-align: center; margin-top: 30px;">
              <a href="mailto:${email}" style="background-color: #B40101; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block;">
                Reply to Contact
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

async function sendAutoReplyEmail({ fullName, email, subject }: {
  fullName: string
  email: string
  subject: string
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

    const subjectText = {
      'general': 'General Inquiry',
      'partnership': 'Partnership',
      'bootcamp': 'Training & Events',
      'property': 'Property Inquiry',
      'career': 'Career Opportunities',
      'media': 'Media Services',
      'other': 'Other'
    }[subject] || subject

    const emailContent = {
      to: email,
      from: fromEmail,
      subject: `Your message to KW Singapore has been received`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background-color: #B40101; color: white; padding: 20px; text-align: center;">
            <h1 style="margin: 0; font-size: 24px;">KW Singapore</h1>
          </div>
          
          <div style="padding: 30px; background-color: #f9f9f9;">
            <h2 style="color: #333; margin-bottom: 20px;">Hello, ${fullName}</h2>
            
            <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">
              Thank you for reaching out to KW Singapore! We've received your ${subjectText.toLowerCase()} and we're excited to help you.
            </p>
            
            <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">
              Our team has been notified and will review your message carefully. We aim to get back to you within 24 business hours to address your inquiry.
            </p>
            
            <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">
              In the meantime, if you have any urgent questions, please don't hesitate to reach out to us directly at <strong>hello@kwsingapore.com</strong> or call us at <strong>+65 8799 6569</strong>.
            </p>
            
            <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">
              We look forward to connecting with you soon!
            </p>
            
            <p style="color: #666; line-height: 1.6;">
              Best regards,<br>
              <strong>The KW Singapore Team</strong>
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