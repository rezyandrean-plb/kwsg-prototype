import { NextRequest, NextResponse } from 'next/server';
import { KWS3SyncService } from '@/lib/kw-s3-sync-service';
import sgMail from '@sendgrid/mail';

async function sendCronEmail(subject: string, html: string) {
  try {
    const apiKey = process.env.SENDGRID_API_KEY;
    const fromEmail = process.env.FROM_EMAIL || 'noreply@kwsg.com';
    const toEmail = 'rezy.andrean@propertylimbrothers.com';

    if (!apiKey) {
      console.warn('SENDGRID_API_KEY not set; skipping cron email');
      return;
    }

    sgMail.setApiKey(apiKey);
    await sgMail.send({ to: toEmail, from: fromEmail, subject, html });
  } catch (e) {
    console.error('Failed to send cron email notification:', e);
  }
}

export async function GET(request: NextRequest) {
  try {
    // Verify this is a legitimate cron request
    const isVercelCron = request.headers.get('x-vercel-cron') === '1';
    const authHeader = request.headers.get('authorization');
    const cronSecret = process.env.CRON_SECRET;
    const hasBearer = !!cronSecret && authHeader === `Bearer ${cronSecret}`;
    if (!isVercelCron && !hasBearer) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    console.log('Starting scheduled KW S3 project data sync...');
    
    const syncService = new KWS3SyncService();
    const result = await syncService.syncAllData();

    console.log('Scheduled sync completed:', result);

    const successSubject = 'Cron: KW S3 Project Sync SUCCESS';
    const stats = (result as any)?.results || {};
    const changes = (result as any)?.details || {};
    const numProjects = Number(stats.projects ?? 0);
    const numUnits = Number(stats.units ?? 0);
    const numFloorPlans = Number(stats.floorPlans ?? 0);
    const numSitePlans = Number(stats.sitePlans ?? 0);

    const successHtml = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, 'Apple Color Emoji', 'Segoe UI Emoji', sans-serif; background:#f6f7fb; padding:24px;">
        <div style="max-width:720px; margin:0 auto; background:#ffffff; border:1px solid #e9ebf0; border-radius:12px; overflow:hidden;">
          <div style="background:#0B5FFF; color:#fff; padding:20px 24px;">
            <h1 style="margin:0; font-size:18px; font-weight:600; letter-spacing:0.2px;">KW Singapore • S3 Project Sync</h1>
            <p style="margin:8px 0 0 0; font-size:13px; opacity:0.9;">Completed at ${new Date().toISOString()}</p>
          </div>
          <div style="padding:24px;">
            <h2 style="margin:0 0 16px 0; font-size:16px; color:#0b1a33;">Summary</h2>
            <p style="margin:0 0 20px 0; font-size:14px; color:#4a5568;">Your daily data sync completed successfully. Here are the latest totals:</p>

            <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;">
              <tr>
                <td style="width:25%; padding:8px;">
                  <div style="background:#f0f5ff; border:1px solid #dbe7ff; border-radius:10px; padding:16px; text-align:center;">
                    <div style="font-size:24px; line-height:24px;">🏗️</div>
                    <div style="margin-top:8px; color:#0b1a33; font-weight:700; font-size:20px;">${numProjects.toLocaleString()}</div>
                    <div style="margin-top:4px; color:#496079; font-size:12px; letter-spacing:0.2px; text-transform:uppercase;">Projects</div>
                  </div>
                </td>
                <td style="width:25%; padding:8px;">
                  <div style="background:#f0fff5; border:1px solid #dbffe7; border-radius:10px; padding:16px; text-align:center;">
                    <div style="font-size:24px; line-height:24px;">🏢</div>
                    <div style="margin-top:8px; color:#0b1a33; font-weight:700; font-size:20px;">${numUnits.toLocaleString()}</div>
                    <div style="margin-top:4px; color:#496079; font-size:12px; letter-spacing:0.2px; text-transform:uppercase;">Units</div>
                  </div>
                </td>
                <td style="width:25%; padding:8px;">
                  <div style="background:#fff9f0; border:1px solid #ffe7db; border-radius:10px; padding:16px; text-align:center;">
                    <div style="font-size:24px; line-height:24px;">📐</div>
                    <div style="margin-top:8px; color:#0b1a33; font-weight:700; font-size:20px;">${numFloorPlans.toLocaleString()}</div>
                    <div style="margin-top:4px; color:#496079; font-size:12px; letter-spacing:0.2px; text-transform:uppercase;">Floor Plans</div>
                  </div>
                </td>
                <td style="width:25%; padding:8px;">
                  <div style="background:#f5f0ff; border:1px solid #e7dbff; border-radius:10px; padding:16px; text-align:center;">
                    <div style="font-size:24px; line-height:24px;">🗺️</div>
                    <div style="margin-top:8px; color:#0b1a33; font-weight:700; font-size:20px;">${numSitePlans.toLocaleString()}</div>
                    <div style="margin-top:4px; color:#496079; font-size:12px; letter-spacing:0.2px; text-transform:uppercase;">Site Plans</div>
                  </div>
                </td>
              </tr>
            </table>

            <h2 style="margin:24px 0 10px 0; font-size:16px; color:#0b1a33;">Changes</h2>
            <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;">
              <tr>
                <td style="padding:6px 0; font-size:14px; color:#334155;">🏗️ Projects</td>
                <td style="padding:6px 0; font-size:14px; color:#334155; text-align:right;">
                  <strong>+${Number(changes?.projects?.created ?? 0)}</strong> added • <strong>${Number(changes?.projects?.updated ?? 0)}</strong> updated
                </td>
              </tr>
              <tr>
                <td style="padding:6px 0; font-size:14px; color:#334155;">🏢 Units</td>
                <td style="padding:6px 0; font-size:14px; color:#334155; text-align:right;">
                  <strong>+${numUnits.toLocaleString()}</strong> created${changes?.units?.replaced ? ' • replaced existing' : ''}
                </td>
              </tr>
              <tr>
                <td style="padding:6px 0; font-size:14px; color:#334155;">📐 Floor Plans</td>
                <td style="padding:6px 0; font-size:14px; color:#334155; text-align:right;">
                  <strong>+${numFloorPlans.toLocaleString()}</strong> created${changes?.floorPlans?.replaced ? ' • replaced existing' : ''}
                </td>
              </tr>
              <tr>
                <td style="padding:6px 0; font-size:14px; color:#334155;">🗺️ Site Plans</td>
                <td style="padding:6px 0; font-size:14px; color:#334155; text-align:right;">
                  <strong>+${numSitePlans.toLocaleString()}</strong> created${changes?.sitePlans?.replaced ? ' • replaced existing' : ''}
                </td>
              </tr>
            </table>

            <div style="margin-top:20px; padding:12px 14px; background:#f8fafc; border:1px solid #e2e8f0; border-radius:8px; color:#334155; font-size:13px;">
              <strong style="display:inline-block; margin-bottom:6px;">Technical note</strong>
              <div>Request ID: <code style="background:#eef2f7; padding:2px 6px; border-radius:4px;">sync-projects</code></div>
              <div style="margin-top:4px;">Environment time: ${new Date().toUTCString()}</div>
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
      success: result.success,
      message: 'Project data sync completed',
      timestamp: new Date().toISOString(),
      results: result.results,
      errors: result.errors,
    });
  } catch (error) {
    console.error('Scheduled sync failed:', error);

    const failSubject = 'Cron: KW S3 Project Sync FAILURE';
    const failHtml = `
      <div style="font-family: Arial, sans-serif;">
        <h2>❌ KW S3 Project Sync Failed</h2>
        <p><strong>Timestamp:</strong> ${new Date().toISOString()}</p>
        <p><strong>Error:</strong> ${error instanceof Error ? error.message : 'Unknown error'}</p>
      </div>
    `;
    await sendCronEmail(failSubject, failHtml);
    return NextResponse.json(
      {
        success: false,
        message: 'Project data sync failed',
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}

// Also support POST for manual triggers
export async function POST(request: NextRequest) {
  return GET(request);
}
