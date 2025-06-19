import { NextRequest, NextResponse } from 'next/server'
import sgMail from '@sendgrid/mail'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, message, projectTitle } = body

    console.log('Contact form submission received:', { name, email, phone, projectTitle })

    // Validate required fields
    if (!name || !email || !phone || !message) {
      console.log('Validation failed: Missing required fields')
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Send auto-reply email
    const autoReplyResult = await sendAutoReplyEmail({
      name,
      email,
      projectTitle
    })

    console.log('Auto-reply result:', autoReplyResult)

    if (!autoReplyResult.success) {
      console.error('Failed to send auto-reply email:', autoReplyResult.error)
    }

    // Here you would typically also save the inquiry to your database
    // and send a notification to your team

    return NextResponse.json({
      success: true,
      message: autoReplyResult.success 
        ? 'Thank you for your enquiry. We have sent you a confirmation email and our team will get back to you within 24 business hours.'
        : 'Thank you for your enquiry. We will get back to you within 24 business hours.',
      autoReplySent: autoReplyResult.success
    })

  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

async function sendAutoReplyEmail({ name, email, projectTitle }: {
  name: string
  email: string
  projectTitle: string
}) {
  try {
    // Check if we're in development mode
    const isDevelopment = process.env.NODE_ENV === 'development'
    const apiKey = process.env.SENDGRID_API_KEY
    const fromEmail = process.env.FROM_EMAIL || 'noreply@kwsg.com'
    
    console.log('Email configuration:', {
      isDevelopment,
      hasApiKey: !!apiKey,
      fromEmail,
      toEmail: email
    })
    
    // If no API key is set, just log in development
    if (!apiKey) {
      if (isDevelopment) {
        console.log('🔧 DEVELOPMENT MODE: No SendGrid API key found')
        console.log('📧 Auto-reply email would be sent:', {
          to: email,
          from: fromEmail,
          subject: `Your enquiry to KW Singapore has been received`,
          name,
          projectTitle
        })
        
        // Simulate email sending delay
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        return { success: true, message: 'Development mode - email logged to console' }
      } else {
        console.error('❌ PRODUCTION: SendGrid API key not found')
        return { success: false, error: 'Email service not configured' }
      }
    }

    // If API key is available, try to send real email (both dev and prod)
    console.log('📧 Attempting to send real email via SendGrid...')
    
    sgMail.setApiKey(apiKey)

    const emailContent = {
      to: email,
      from: fromEmail,
      subject: `Your enquiry to KW Singapore has been received`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background-color: #ce001f; color: white; padding: 20px; text-align: center;">
            <h1 style="margin: 0; font-size: 24px;">KW Singapore</h1>
          </div>
          
          <div style="padding: 30px; background-color: #f9f9f9;">
            <h2 style="color: #333; margin-bottom: 20px;">Hello, ${name}</h2>
            
            <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">
              Thanks for reaching out to KW Singapore! We've received your enquiry and it's important to us.
            </p>
            
            <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">
              We're working to get back to you as quickly as possible, and our goal is to respond within 24 business hours.
            </p>
            
            <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">
              If you need a faster response, please reach us directly at <strong>+65 9123 4567</strong>.
            </p>
            
            <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">
              Thanks again for connecting with us!
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

    console.log('📤 Sending email via SendGrid...')
    await sgMail.send(emailContent)
    console.log('✅ Email sent successfully via SendGrid')
    
    return { success: true, message: 'Email sent successfully' }

  } catch (error) {
    console.error('❌ Email sending error:', error)
    
    // Provide detailed error information
    let errorMessage = 'Failed to send email'
    
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