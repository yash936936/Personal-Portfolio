export interface Env {
  RESEND_API_KEY: string;
}

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

const jsonHeaders = {
  ...corsHeaders,
  "Content-Type": "application/json",
};

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: corsHeaders });
    }

    if (request.method !== "POST") {
      return new Response(JSON.stringify({ error: "Method not allowed" }), {
        status: 405,
        headers: jsonHeaders,
      });
    }

    let body: { name: string; email: string; message: string };
    try {
      body = await request.json();
    } catch {
      return new Response(JSON.stringify({ error: "Invalid or missing JSON body" }), {
        status: 400,
        headers: jsonHeaders,
      });
    }

    const { name, email, message } = body;

    if (!name || !email || !message) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), {
        status: 400,
        headers: jsonHeaders,
      });
    }

    try {
      const notifyAdmin = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "Portfolio Contact <onboarding@resend.dev>",
          to: "yashm15082005@gmail.com",
          subject: `New lead: ${name} wants to talk about a project`,
          html: `
            <div style="font-family: -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif; max-width: 560px; margin: 0 auto; padding: 32px 24px; background: #0f1115; color: #e6e6e6; border-radius: 12px;">
              <p style="margin: 0 0 4px; font-size: 12px; letter-spacing: 0.08em; text-transform: uppercase; color: #8b8f9a;">
                Portfolio Contact Form
              </p>
              <h2 style="margin: 0 0 24px; font-size: 22px; color: #ffffff;">
                New project inquiry from ${name}
              </h2>

              <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
                <tr>
                  <td style="padding: 8px 0; font-size: 13px; color: #8b8f9a; width: 90px; vertical-align: top;">Name</td>
                  <td style="padding: 8px 0; font-size: 14px; color: #e6e6e6;">${name}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-size: 13px; color: #8b8f9a; vertical-align: top;">Email</td>
                  <td style="padding: 8px 0; font-size: 14px;">
                    <a href="mailto:${email}" style="color: #6ea8ff; text-decoration: none;">${email}</a>
                  </td>
                </tr>
              </table>

              <div style="background: #181b21; border-radius: 8px; padding: 16px 18px; margin-bottom: 24px;">
                <p style="margin: 0 0 6px; font-size: 13px; color: #8b8f9a;">Message</p>
                <p style="margin: 0; font-size: 14px; line-height: 1.6; color: #e6e6e6; white-space: pre-wrap;">${message}</p>
              </div>

              <a href="mailto:${email}" style="display: inline-block; padding: 10px 18px; background: #6ea8ff; color: #0f1115; font-size: 14px; font-weight: 600; text-decoration: none; border-radius: 8px;">
                Reply to ${name}
              </a>

              <p style="margin: 28px 0 0; font-size: 12px; color: #5b5f6a;">
                Sent automatically from your portfolio's contact form.
              </p>
            </div>
          `,
          reply_to: email,
        }),
      });

      if (!notifyAdmin.ok) {
        const errorText = await notifyAdmin.text();
        throw new Error(`Resend API Error: ${errorText}`);
      }

	  // 4. Send confirmation email to the visitor (requires a verified domain)
    const notifyVisitor = await fetch("https://api.resend.com/emails", {
       method: "POST",
       headers: {
            Authorization: `Bearer ${env.RESEND_API_KEY}`,
             "Content-Type": "application/json",
             },
        body: JSON.stringify({
        from: "Yash Malik <hello@yourdomain.com>", // must be on your verified domain
        to: email, // the visitor's address from the form
        subject: "Thanks for reaching out — I got your message",
        html: `
           <div style="font-family: -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif; max-width: 560px; margin: 0 auto; padding: 32px 24px; background: #0f1115; color: #e6e6e6; border-radius: 12px;">
           <h2 style="margin: 0 0 16px; font-size: 20px; color: #ffffff;">Hey ${name}, thanks for reaching out!</h2>
           <p style="font-size: 14px; line-height: 1.6; color: #cfd2d8;">
          I've received your message and will get back to you within a couple of days.
        </p>
        <div style="background: #181b21; border-radius: 8px; padding: 16px 18px; margin: 20px 0;">
          <p style="margin: 0 0 6px; font-size: 13px; color: #8b8f9a;">Your message</p>
          <p style="margin: 0; font-size: 14px; line-height: 1.6; color: #e6e6e6; white-space: pre-wrap;">${message}</p>
        </div>
        <p style="margin: 24px 0 0; font-size: 13px; color: #5b5f6a;">— Yash</p>
      </div>
        `,
       }),
      });
   // Don't throw if this one fails — the admin notification already succeeded,
     // and you don't want the visitor to see an error just because their confirmation email failed.
      if (!notifyVisitor.ok) {
       console.error("Visitor confirmation email failed:", await notifyVisitor.text());
     }

      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: jsonHeaders,
      });
    } catch (error: any) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: jsonHeaders,
      });
    }
  },
};