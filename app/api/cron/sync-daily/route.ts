import { NextRequest, NextResponse } from 'next/server';
import { DatabaseSyncService } from '@/lib/database-sync';
import sgMail from '@sendgrid/mail';

async function sendCronEmail(subject: string, html: string) {
  try {
    const apiKey = process.env.SENDGRID_API_KEY;
    const fromEmail = process.env.FROM_EMAIL || 'noreply@kwsg.com';
    const recipients =
      process.env.CRON_NOTIFICATION_EMAILS ||
      'rezy.andrean@propertylimbrothers.com,cynthia.loh@propertylimbrothers.com';

    if (!apiKey) {
      console.warn('SENDGRID_API_KEY not set; skipping cron email');
      return;
    }

    const toEmails = recipients
      .split(',')
      .map((email) => email.trim())
      .filter(Boolean);

    if (!toEmails.length) {
      console.warn(
        'CRON_NOTIFICATION_EMAILS not configured; skipping cron email notification'
      );
      return;
    }

    sgMail.setApiKey(apiKey);
    await sgMail.send({
      to: toEmails,
      from: fromEmail,
      subject,
      html,
    });
  } catch (error) {
    console.error('Failed to send cron email notification:', error);
  }
}

export async function GET(request: NextRequest) {
  try {
    // Verify this is a cron request (Vercel sets this header)
    const authHeader = request.headers.get('authorization');
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const bucketName = process.env.S3_BUCKET_NAME;
    const csvKey = process.env.S3_CSV_KEY;

    if (!bucketName || !csvKey) {
      console.error('Missing S3 configuration');
      return NextResponse.json(
        { error: 'Missing S3 configuration' },
        { status: 500 }
      );
    }

    console.log('Starting daily sync...');
    const syncService = new DatabaseSyncService(bucketName, csvKey);
    const result = await syncService.syncWithS3();

    if (result.success) {
      console.log('Daily sync completed successfully:', result.stats);
      const successSubject = 'Cron: Daily DB Sync SUCCESS';
      const successHtml = `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, 'Apple Color Emoji', 'Segoe UI Emoji', sans-serif; background:#f6f7fb; padding:24px;">
          <div style="max-width:680px; margin:0 auto; background:#ffffff; border:1px solid #e9ebf0; border-radius:12px; overflow:hidden;">
            <div style="background:#0B5FFF; color:#fff; padding:20px 24px;">
              <h1 style="margin:0; font-size:18px; font-weight:600;">KW Singapore • Daily Database Sync</h1>
              <p style="margin:8px 0 0 0; font-size:13px; opacity:0.9;">Completed at ${new Date().toUTCString()}</p>
            </div>
            <div style="padding:24px;">
              <p style="margin:0 0 16px 0; font-size:14px; color:#334155;">
                ✅ Daily sync completed successfully.
              </p>
              <table style="width:100%; border-collapse:collapse; font-size:14px; color:#334155;">
                <tbody>
                  <tr>
                    <td style="padding:6px 0; font-weight:600;">Created</td>
                    <td style="padding:6px 0; text-align:right;">${result.stats.created}</td>
                  </tr>
                  <tr>
                    <td style="padding:6px 0; font-weight:600;">Updated</td>
                    <td style="padding:6px 0; text-align:right;">${result.stats.updated}</td>
                  </tr>
                  <tr>
                    <td style="padding:6px 0; font-weight:600;">Deleted</td>
                    <td style="padding:6px 0; text-align:right;">${result.stats.deleted}</td>
                  </tr>
                </tbody>
              </table>
              <div style="margin-top:20px; padding:12px 16px; background:#f8fafc; border:1px solid #e2e8f0; border-radius:8px; font-size:12px; color:#475569;">
                Request ID: <code style="background:#eef2f7; padding:2px 6px; border-radius:4px;">sync-daily</code>
              </div>
            </div>
            <div style="background:#0b1a33; color:#a3b0c2; padding:16px 24px; font-size:12px; text-align:center;">
              © ${new Date().getUTCFullYear()} KW Singapore • Automated Cron Report
            </div>
          </div>
        </div>
      `;
      await sendCronEmail(successSubject, successHtml);

      return NextResponse.json({
        success: true,
        message: result.message,
        stats: result.stats,
        timestamp: new Date().toISOString(),
      });
    } else {
      console.error('Daily sync failed:', result.message);
      const failSubject = 'Cron: Daily DB Sync FAILURE';
      const failHtml = `
        <div style="font-family: Arial, sans-serif;">
          <h2>❌ KW Singapore Daily Sync Failed</h2>
          <p><strong>Timestamp:</strong> ${new Date().toISOString()}</p>
          <p><strong>Error:</strong> ${result.message}</p>
        </div>
      `;
      await sendCronEmail(failSubject, failHtml);
      return NextResponse.json(
        { error: result.message },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error in daily sync cron job:', error);
    const failSubject = 'Cron: Daily DB Sync FAILURE';
    const failHtml = `
      <div style="font-family: Arial, sans-serif;">
        <h2>❌ KW Singapore Daily Sync Failed</h2>
        <p><strong>Timestamp:</strong> ${new Date().toISOString()}</p>
        <p><strong>Error:</strong> ${
          error instanceof Error ? error.message : 'Unknown error'
        }</p>
      </div>
    `;
    await sendCronEmail(failSubject, failHtml);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}






