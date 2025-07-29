import { NextRequest, NextResponse } from 'next/server'
import sgMail from '@sendgrid/mail'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, recaptchaToken } = body

    console.log('Summit registration submission received:', { 
      email,
      hasRecaptchaToken: !!recaptchaToken
    })

    // Validate required fields
    if (!email) {
      console.log('Validation failed: Missing email field')
      return NextResponse.json(
        { error: 'Email is required' },
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

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      console.log('Validation failed: Invalid email format')
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Send notification email to KW Singapore team
    const notificationResult = await sendNotificationEmail({ email })

    console.log('Notification email result:', notificationResult)

    if (!notificationResult.success) {
      console.error('Failed to send notification email:', notificationResult.error)
      return NextResponse.json(
        { error: 'Failed to send registration email' },
        { status: 500 }
      )
    }

    // Send confirmation email to the registrant
    const confirmationResult = await sendConfirmationEmail({ email })

    console.log('Confirmation email result:', confirmationResult)

    return NextResponse.json({
      success: true,
      message: 'Thank you for registering your interest in the Mega Realtor Summit! We have sent you a confirmation email and will keep you updated with event details.',
      notificationSent: notificationResult.success,
      confirmationSent: confirmationResult.success
    })

  } catch (error) {
    console.error('Summit registration error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

async function sendNotificationEmail({ email }: { email: string }) {
  try {
    const apiKey = process.env.SENDGRID_API_KEY
    const fromEmail = process.env.FROM_EMAIL || 'noreply@kwsg.com'
    const toEmail = 'hello@kwsingapore.com'
    
    console.log('Notification email configuration:', {
      hasApiKey: !!apiKey,
      fromEmail,
      toEmail
    })
    
    // If no API key is set, return error
    if (!apiKey) {
      console.error('❌ SendGrid API key not found')
      return { success: false, error: 'Email service not configured' }
    }

    console.log('📧 Attempting to send notification email via SendGrid...')
    
    sgMail.setApiKey(apiKey)

    const emailContent = {
      to: toEmail,
      from: fromEmail,
      subject: `New Mega Realtor Summit Registration: ${email}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background-color: #B40101; color: white; padding: 20px; text-align: center;">
            <h1 style="margin: 0; font-size: 24px;">KW Singapore - Mega Realtor Summit Registration</h1>
          </div>
          
          <div style="padding: 30px; background-color: #f9f9f9;">
            <h2 style="color: #333; margin-bottom: 20px;">New Summit Registration</h2>
            
            <div style="background-color: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <h3 style="color: #B40101; margin-top: 0;">Registration Details</h3>
              
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #333;">Email Address:</td>
                  <td style="padding: 8px 0; color: #666;"><a href="mailto:${email}" style="color: #B40101;">${email}</a></td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #333;">Event:</td>
                  <td style="padding: 8px 0; color: #666;">Mega Realtor Summit</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #333;">Registration Date:</td>
                  <td style="padding: 8px 0; color: #666;">${new Date().toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}</td>
                </tr>
              </table>
            </div>
            
            <div style="background-color: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <h3 style="color: #B40101; margin-top: 0;">Next Steps</h3>
              <p style="color: #666; line-height: 1.6; margin: 0;">
                This person has registered their interest in the Mega Realtor Summit. Please follow up with them regarding event details, 
                registration process, and any additional information they may need.
              </p>
            </div>
            
            <div style="text-align: center; margin-top: 30px;">
              <a href="mailto:${email}" style="background-color: #B40101; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block;">
                Contact Registrant
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
    
    await sgMail.send(emailContent)
    console.log('✅ Notification email sent successfully')
    
    return { success: true }

  } catch (error) {
    console.error('❌ Failed to send notification email:', error)
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
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
      body: `secret=${secretKey}&response=${token}`,
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

async function sendConfirmationEmail({ email }: { email: string }) {
  try {
    const apiKey = process.env.SENDGRID_API_KEY
    const fromEmail = process.env.FROM_EMAIL || 'noreply@kwsg.com'
    
    if (!apiKey) {
      console.error('❌ SendGrid API key not found')
      return { success: false, error: 'Email service not configured' }
    }

    console.log('📧 Sending confirmation email to registrant...')
    
    sgMail.setApiKey(apiKey)

    const emailContent = {
      to: email,
      from: fromEmail,
      subject: 'Mega Realtor Summit Registration Confirmation - KW Singapore',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background-color: #B40101; color: white; padding: 20px; text-align: center;">
            <h1 style="margin: 0; font-size: 24px;">KW Singapore</h1>
            <p style="margin: 5px 0 0 0; font-size: 16px;">Mega Realtor Summit Registration</p>
          </div>
          
          <div style="padding: 30px; background-color: #f9f9f9;">
            <h2 style="color: #333; margin-bottom: 20px;">Thank You for Your Interest!</h2>
            
            <div style="background-color: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <p style="color: #666; line-height: 1.6; margin: 0;">
                Thank you for registering your interest in the Mega Realtor Summit! We're excited to have you join us for this 
                exclusive event designed for growth-minded real estate professionals.
              </p>
            </div>
            
            <div style="background-color: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <h3 style="color: #B40101; margin-top: 0;">What's Next?</h3>
              <ul style="color: #666; line-height: 1.6; margin: 0; padding-left: 20px;">
                <li>Our team will review your registration and contact you with event details</li>
                <li>You'll receive updates about the summit schedule and agenda</li>
                <li>We'll provide information about registration fees and payment options</li>
                <li>You'll get exclusive access to pre-event materials and resources</li>
              </ul>
            </div>
            
            <div style="background-color: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <h3 style="color: #B40101; margin-top: 0;">Event Highlights</h3>
              <ul style="color: #666; line-height: 1.6; margin: 0; padding-left: 20px;">
                <li>Learn from industry leaders J.P. Lewis, Melvin Lim, Grayce Tan, and Rayne Chua</li>
                <li>Master cutting-edge strategies in lead generation and team scaling</li>
                <li>Gain essential Mega Realtor Summit insights for millionaire-level success</li>
                <li>Network with ambitious, growth-minded realtors</li>
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
            <p style="margin: 5px 0 0 0;">This email was sent to ${email}</p>
          </div>
        </div>
      `
    }

    await sgMail.send(emailContent)
    console.log('✅ Confirmation email sent successfully')
    
    return { success: true }

  } catch (error) {
    console.error('❌ Failed to send confirmation email:', error)
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
  }
} 