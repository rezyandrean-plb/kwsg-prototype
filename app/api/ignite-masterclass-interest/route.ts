import { NextRequest, NextResponse } from 'next/server'
import sgMail from '@sendgrid/mail'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, mobile } = body

    console.log('Ignite Masterclass interest submission received:', {
      name,
      email,
      mobile,
    })

    if (!name || !email || !mobile) {
      return NextResponse.json(
        { error: 'Name, email, and mobile are required.' },
        { status: 400 }
      )
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format.' },
        { status: 400 }
      )
    }

    // Send notification to KW Singapore
    const notificationResult = await sendNotificationEmail({ name, email, mobile })
    console.log('Ignite notification email result:', notificationResult)

    if (!notificationResult.success) {
      console.error('Failed to send Ignite notification email:', notificationResult.error)
    }

    // Send auto-reply to prospect
    const autoReplyResult = await sendAutoReplyEmail({ name, email })
    console.log('Ignite auto-reply email result:', autoReplyResult)

    if (!autoReplyResult.success) {
      console.error('Failed to send Ignite auto-reply email:', autoReplyResult.error)
    }

    return NextResponse.json({
      success: true,
      message: 'Thank you for your interest in the Ignite Masterclass! We have emailed you a confirmation and our team will be in touch soon.',
      notificationSent: notificationResult.success,
      autoReplySent: autoReplyResult.success,
    })
  } catch (error) {
    console.error('Ignite Masterclass interest error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

async function sendNotificationEmail({ 
  name, 
  email, 
  mobile 
}: { 
  name: string
  email: string
  mobile: string
}) {
  try {
    const apiKey = process.env.SENDGRID_API_KEY
    const fromEmail = process.env.FROM_EMAIL || 'noreply@kwsg.com'
    const toEmail = 'hello@kwsingapore.com'

    console.log('Ignite notification email configuration:', {
      hasApiKey: !!apiKey,
      fromEmail,
      toEmail,
    })

    if (!apiKey) {
      console.error('❌ SendGrid API key not found')
      return { success: false, error: 'Email service not configured' }
    }

    sgMail.setApiKey(apiKey)

    const emailContent = {
      to: toEmail,
      from: fromEmail,
      subject: `New Ignite Masterclass Interest: ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background-color: #B40101; color: white; padding: 20px; text-align: center;">
            <h1 style="margin: 0; font-size: 24px;">KW Singapore - Ignite Masterclass Interest</h1>
          </div>
          
          <div style="padding: 30px; background-color: #f9f9f9;">
            <h2 style="color: #333; margin-bottom: 20px;">New Interest Submission</h2>
            
            <div style="background-color: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #333;">Name:</td>
                  <td style="padding: 8px 0; color: #666;">${name}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #333;">Email:</td>
                  <td style="padding: 8px 0; color: #666;">
                    <a href="mailto:${email}" style="color: #B40101;">${email}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #333;">Mobile:</td>
                  <td style="padding: 8px 0; color: #666;">
                    <a href="tel:${mobile}" style="color: #B40101;">${mobile}</a>
                  </td>
                </tr>
              </table>
            </div>
            
            <div style="text-align: center; margin-top: 30px;">
              <a href="mailto:${email}" style="background-color: #B40101; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block;">
                Reply to Prospect
              </a>
            </div>
          </div>
          
          <div style="background-color: #333; color: white; padding: 20px; text-align: center; font-size: 12px;">
            <p style="margin: 0;">© 2025 KW Singapore. All rights reserved.</p>
            <p style="margin: 5px 0 0 0;">This notification was sent to ${toEmail}</p>
          </div>
        </div>
      `,
    }

    await sgMail.send(emailContent)
    console.log('✅ Ignite Masterclass notification email sent successfully')

    return { success: true }
  } catch (error) {
    console.error('❌ Ignite notification email error:', error)
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
  }
}

async function sendAutoReplyEmail({ 
  name, 
  email 
}: { 
  name: string
  email: string
}) {
  try {
    const apiKey = process.env.SENDGRID_API_KEY
    const fromEmail = process.env.FROM_EMAIL || 'noreply@kwsg.com'

    console.log('Ignite auto-reply email configuration:', {
      hasApiKey: !!apiKey,
      fromEmail,
      toEmail: email,
    })

    if (!apiKey) {
      console.error('❌ SendGrid API key not found')
      return { success: false, error: 'Email service not configured' }
    }

    sgMail.setApiKey(apiKey)

    const emailContent = {
      to: email,
      from: fromEmail,
      subject: 'We’ve received your interest in the Ignite Masterclass',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background-color: #B40101; color: white; padding: 20px; text-align: center;">
            <h1 style="margin: 0; font-size: 24px;">KW Singapore</h1>
          </div>
          
          <div style="padding: 30px; background-color: #f9f9f9;">
            <h2 style="color: #333; margin-bottom: 20px;">Hi ${name || ''},</h2>
            
            <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">
              Thank you for registering your interest in the <strong>Ignite Masterclass</strong>.
              We’ve received your details and our team will be in touch shortly with dates, pricing, and next steps.
            </p>
            
            <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">
              If you have any urgent questions, feel free to email us at 
              <a href="mailto:hello@kwsingapore.com" style="color: #B40101;">hello@kwsingapore.com</a>.
            </p>
            
            <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">
              We’re excited to help you elevate your real estate practice in 2026 and beyond.
            </p>
            
            <p style="color: #666; line-height: 1.6;">
              Best regards,<br/>
              <strong>KW Singapore Team</strong>
            </p>
          </div>
          
          <div style="background-color: #333; color: white; padding: 20px; text-align: center; font-size: 12px;">
            <p style="margin: 0;">© 2025 KW Singapore. All rights reserved.</p>
            <p style="margin: 5px 0 0 0;">This email was sent to ${email}</p>
          </div>
        </div>
      `,
    }

    await sgMail.send(emailContent)
    console.log('✅ Ignite Masterclass auto-reply email sent successfully')

    return { success: true }
  } catch (error) {
    console.error('❌ Ignite auto-reply email error:', error)
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
  }
}

