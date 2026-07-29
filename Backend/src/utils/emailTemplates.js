// src/utils/emailTemplates.js

// Professional ArcticAir HVAC Solutions password reset email.
// Kept as a single inline-styled HTML string for maximum email-client compatibility.
export const passwordResetTemplate = ({ name, resetUrl, expiresInMinutes = 30 }) => `
<!DOCTYPE html>
<html>
  <body style="margin:0; padding:0; background-color:#f1f5f9; font-family:Arial, Helvetica, sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f1f5f9; padding:32px 0;">
      <tr>
        <td align="center">
          <table width="480" cellpadding="0" cellspacing="0" style="background-color:#ffffff; border-radius:12px; overflow:hidden; box-shadow:0 1px 3px rgba(0,0,0,0.08);">

            <!-- Header / logo placeholder -->
            <tr>
              <td style="background:linear-gradient(135deg,#0C447C,#185FA5); padding:28px 32px; text-align:center;">
                <div style="width:48px; height:48px; border-radius:12px; background:rgba(255,255,255,0.15); display:inline-block; line-height:48px; color:#ffffff; font-size:20px; font-weight:bold; margin-bottom:10px;">
                  ❆
                </div>
                <div style="color:#ffffff; font-size:20px; font-weight:600;">
                  ArcticAir <span style="color:#EF9F27;">HVAC Solutions</span>
                </div>
              </td>
            </tr>

            <!-- Body -->
            <tr>
              <td style="padding:32px;">
                <h1 style="font-size:18px; color:#111827; margin:0 0 12px;">Reset your password</h1>
                <p style="font-size:14px; color:#4b5563; line-height:1.6; margin:0 0 20px;">
                  Hi ${name || "there"},<br /><br />
                  We received a request to reset the password on your ArcticAir HVAC Solutions account.
                  Click the button below to choose a new password.
                </p>

                <table cellpadding="0" cellspacing="0" style="margin:0 0 24px;">
                  <tr>
                    <td style="border-radius:8px; background-color:#185FA5;">
                      <a href="${resetUrl}" target="_blank"
                        style="display:inline-block; padding:12px 28px; font-size:14px; font-weight:600; color:#ffffff; text-decoration:none; border-radius:8px;">
                        Reset Password
                      </a>
                    </td>
                  </tr>
                </table>

                <p style="font-size:12px; color:#9ca3af; line-height:1.6; margin:0 0 20px;">
                  This link will expire in ${expiresInMinutes} minutes. If you didn't request a password reset,
                  you can safely ignore this email — your password will remain unchanged.
                </p>

                <p style="font-size:12px; color:#9ca3af; line-height:1.6; margin:0; word-break:break-all;">
                  Or paste this link into your browser:<br />
                  <a href="${resetUrl}" style="color:#185FA5;">${resetUrl}</a>
                </p>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="padding:20px 32px; background-color:#f8fafc; border-top:1px solid #e5e7eb;">
                <p style="font-size:12px; color:#6b7280; margin:0;">
                  Need help? Contact our support team at
                  <a href="mailto:support@arcticair-hvac.com" style="color:#185FA5;">support@arcticair-hvac.com</a>.
                </p>
                <p style="font-size:11px; color:#9ca3af; margin:8px 0 0;">
                  &copy; ${new Date().getFullYear()} ArcticAir HVAC Solutions. All rights reserved.
                </p>
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
`;
