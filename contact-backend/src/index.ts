export interface Env {
  RESEND_API_KEY: string;
}

const corsHeaders = {
  "Access-Control-Allow-Origin": "*", // Allows your frontend to talk to the worker
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    // 1. Handle CORS Preflight requests
    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders });
    }

    if (request.method !== "POST") {
      return new Response(JSON.stringify({ error: "Method not allowed" }), {
        status: 405,
        headers: corsHeaders,
      });
    }

    try {
      // 2. Parse incoming form data
      const { name, email, message } = await request.json<{
        name: string;
        email: string;
        message: string;
      }>();

      if (!name || !email || !message) {
        return new Response(JSON.stringify({ error: "Missing required fields" }), {
          status: 400,
          headers: corsHeaders,
        });
      }

      // 3. Send Lead Notification Email
      const notifyAdmin = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          // MUST be this exact address when testing without a domain
          from: "Portfolio Contact <onboarding@resend.dev>", 
          // MUST be the email address you registered your Resend account with
          to: "yashsunilmalik@gmail.com", 
          subject: `New Project Inquiry from ${name}`,
          html: `
            <h3>New Contact Request</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Reply-To Email:</strong> ${email}</p>
            <p><strong>Message:</strong></p>
            <p>${message}</p>
          `,
          reply_to: email // This allows you to hit "Reply" in Gmail and reply directly to the client
        }),
      });

      if (!notifyAdmin.ok) {
        const errorText = await notifyAdmin.text();
        throw new Error(`Resend API Error: ${errorText}`);
      }

      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: corsHeaders,
      });
    } catch (error: any) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: corsHeaders,
      });
    }
  },
};