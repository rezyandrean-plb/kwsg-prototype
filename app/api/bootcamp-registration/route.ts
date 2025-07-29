import { NextRequest, NextResponse } from 'next/server'
import sgMail from '@sendgrid/mail'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { 
      firstName, 
      lastName, 
      email, 
      phoneNumber, 
      selectedBootcamps,
      recaptchaToken
    } = body

    console.log('Bootcamp registration form submission received:', { 
      firstName, 
      lastName, 
      email, 
      phoneNumber, 
      selectedBootcamps,
      hasRecaptchaToken: !!recaptchaToken
    })

    // Validate required fields
    if (!firstName || !lastName || !email || !phoneNumber) {
      console.log('Validation failed: Missing required fields')
      return NextResponse.json(
        { error: 'First name, last name, email, and phone number are required' },
        { status: 400 }
      )
    }

    // Validate bootcamp selection
    if (!selectedBootcamps || selectedBootcamps.length === 0) {
      console.log('Validation failed: No bootcamps selected')
      return NextResponse.json(
        { error: 'Please select at least one training bootcamp' },
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

    const fullName = `${firstName} ${lastName}`

    // Send notification email to KW Singapore team
    const notificationResult = await sendNotificationEmail({
      firstName,
      lastName,
      fullName,
      email,
      phoneNumber,
      selectedBootcamps
    })

    console.log('Notification email result:', notificationResult)

    if (!notificationResult.success) {
      console.error('Failed to send notification email:', notificationResult.error)
    }

    // Send auto-reply email to the registrant
    const autoReplyResult = await sendAutoReplyEmail({
      fullName,
      email,
      selectedBootcamps
    })

    console.log('Auto-reply result:', autoReplyResult)

    if (!autoReplyResult.success) {
      console.error('Failed to send auto-reply email:', autoReplyResult.error)
    }

    return NextResponse.json({
      success: true,
      message: 'Thank you for your interest in our training bootcamps! We have sent you a confirmation email and will contact you soon with bootcamp details.',
      notificationSent: notificationResult.success,
      autoReplySent: autoReplyResult.success
    })

  } catch (error) {
    console.error('Bootcamp registration form error:', error)
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
  phoneNumber, 
  selectedBootcamps
}: {
  firstName: string
  lastName: string
  fullName: string
  email: string
  phoneNumber: string
  selectedBootcamps: string[]
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
      subject: 'New Training Bootcamp Registration - KW Singapore',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background-color: #B40101; color: white; padding: 20px; text-align: center;">
            <h1 style="margin: 0; font-size: 24px;">KW Singapore</h1>
            <p style="margin: 5px 0 0 0; font-size: 16px;">Training Bootcamp Registration</p>
          </div>
          
          <div style="padding: 30px; background-color: #f9f9f9;">
            <h2 style="color: #333; margin-bottom: 20px;">New Bootcamp Registration</h2>
            
            <div style="background-color: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <h3 style="color: #B40101; margin-top: 0;">Contact Information</h3>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; border-bottom: 1px solid #eee; font-weight: bold; color: #666;">Full Name:</td>
                  <td style="padding: 8px 0; border-bottom: 1px solid #eee; color: #333;">${fullName}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; border-bottom: 1px solid #eee; font-weight: bold; color: #666;">Email Address:</td>
                  <td style="padding: 8px 0; border-bottom: 1px solid #eee; color: #333;">${email}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #666;">Phone Number:</td>
                  <td style="padding: 8px 0; color: #333;">${phoneNumber}</td>
                </tr>
              </table>
            </div>
            
            <div style="background-color: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <h3 style="color: #B40101; margin-top: 0;">Selected Bootcamps</h3>
              <ul style="color: #666; line-height: 1.6; margin: 0; padding-left: 20px;">
                ${selectedBootcamps.map(bootcamp => `<li>${bootcamp}</li>`).join('')}
              </ul>
            </div>
            
            <div style="text-align: center; margin-top: 30px;">
              <a href="mailto:${email}" style="background-color: #B40101; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block;">
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

async function sendAutoReplyEmail({ fullName, email, selectedBootcamps }: {
  fullName: string
  email: string
  selectedBootcamps: string[]
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
      subject: 'Training Bootcamp Registration Confirmation - KW Singapore',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background-color: #B40101; color: white; padding: 20px; text-align: center;">
            <h1 style="margin: 0; font-size: 24px;">KW Singapore</h1>
            <p style="margin: 5px 0 0 0; font-size: 16px;">Training Bootcamp Registration</p>
          </div>
          
          <div style="padding: 30px; background-color: #f9f9f9;">
            <h2 style="color: #333; margin-bottom: 20px;">Thank You for Your Registration!</h2>
            
            <div style="background-color: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <p style="color: #666; line-height: 1.6; margin: 0;">
                Dear ${fullName},
              </p>
              <p style="color: #666; line-height: 1.6; margin: 10px 0 0 0;">
                Thank you for registering your interest in our training bootcamps! We're excited to have you join us for specialized training designed to enhance your real estate skills.
              </p>
            </div>
            
            <div style="background-color: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <h3 style="color: #B40101; margin-top: 0;">Your Selected Bootcamps</h3>
              <ul style="color: #666; line-height: 1.6; margin: 0; padding-left: 20px;">
                ${selectedBootcamps.map(bootcamp => `<li>${bootcamp}</li>`).join('')}
              </ul>
            </div>
            
            <div style="background-color: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <h3 style="color: #B40101; margin-top: 0;">What's Next?</h3>
              <ul style="color: #666; line-height: 1.6; margin: 0; padding-left: 20px;">
                <li>Our training team will review your registration and contact you with bootcamp details</li>
                <li>You'll receive updates about upcoming training sessions and schedules</li>
                <li>We'll provide information about registration fees and payment options</li>
                <li>You'll get exclusive access to pre-training materials and resources</li>
              </ul>
            </div>
            
            <div style="background-color: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <h3 style="color: #B40101; margin-top: 0;">Training Benefits</h3>
              <ul style="color: #666; line-height: 1.6; margin: 0; padding-left: 20px;">
                <li>Learn from industry experts and successful real estate professionals</li>
                <li>Master proven strategies for lead generation and client conversion</li>
                <li>Gain practical skills for market analysis and property presentation</li>
                <li>Network with like-minded professionals in the industry</li>
              </ul>
            </div>
            
            <div style="text-center; margin-top: 30px;">
              <p style="color: #666; margin-bottom: 20px;">
                Have questions? Contact our training team at 
                <a href="mailto:hello@kwsingapore.com" style="color: #B40101;">hello@kwsingapore.com</a>
              </p>
            </div>
          </div>
          
          <div style="background-color: #333; color: white; padding: 20px; text-align: center; font-size: 12px;">
            <p style="margin: 0;">© 2025 KW Singapore. All rights reserved.</p>
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