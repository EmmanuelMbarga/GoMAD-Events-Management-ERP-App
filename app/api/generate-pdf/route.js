import { NextResponse } from "next/server";
import puppeteer from "puppeteer-core";
import chromium from "chrome-aws-lambda";

export async function POST(request) {
  console.log("PDF generation started");
  try {
    const data = await request.json();
    console.log("Received data:", data);

    if (!data.name || !data.qrcode) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Launch browser using chrome-aws-lambda
    const browser = await puppeteer.launch({
      args: chromium.args,
      executablePath:
        (await chromium.executablePath) || "/usr/bin/chromium-browser",
      headless: chromium.headless,
    });

    console.log("Browser launched");
    const page = await browser.newPage();

    // Set content with template literal
    await page.setContent(`
      <!DOCTYPE html>
      <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Event Ticket</title>
            <script src="https://unpkg.com/@tailwindcss/browser@4"></script>
            <script src="https://cdn.rawgit.com/davidshimjs/qrcodejs/gh-pages/qrcode.min.js"></script>
            <style>
                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                }
                body {
                    font-family: Arial, sans-serif;
                    padding: 20px;
                }
                .ticket {
                    border: 1px solid #ccc;
                    padding: 20px;
                    margin-top: 20px;
                    background-color: #f9f9f9;
                }
                .ticket h2 {
                    margin-top: 0;
                }
                .ticket p {
                    margin: 5px 0;
                }
            </style>
        </head>
        <body>
            <h1 style="font-weight: bold; font-size: 1.875rem;">GoMAD 10</h1>
            <div style="display: grid; grid-template-columns: repeat(4, minmax(0, 1fr));">
                <div style="grid-column: span 3; border-right: 2px solid #60a5fa; padding-right: 0.25rem;">
                    <div style="display: flex; gap: 0.75rem; align-items: flex-start; margin: 0.5rem 0;">
                        <div style="background-color: #60a5fa; padding: 0.5rem 0.75rem;">
                            <h1 style="color: white;">Theme:</h1>
                        </div>
                        <div>
                            <h1 style="font-weight: bold; font-size: 1.5rem;">From Vision to Impact;<br/> Entrepreneurs as Nation Builders</h1>
                        </div>
                    </div>
                
                    <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                        <div style="display: flex; flex-direction: column; gap: 0.75rem;">
                            <p>Dear <span style="text-decoration: underline;">${data.name}</span>,</p>
                            <p>Your ticket for this event is secured.</p>
                        </div>
                        <div>
                            <h1>TICKET</h1>
                            <div style="background-color: #60a5fa; padding: 0.25rem 0.5rem; width: 16rem;">
                                <h1 style="font-weight: bold;">15,000 FCFA</h1>
                            </div>
                        </div>
                    </div>
                
                    <div style="display: flex; align-items: center; justify-content: space-between; margin-top: 0.5rem;">
                        <div>
                            <h2 style="color: #60a5fa; font-weight: bold;">Date:</h2>
                            <p>15 February, 2025</p>
                        </div>
                
                        <div>
                            <h2 style="color: #60a5fa; font-weight: bold;">Time:</h2>
                            <p>8:00am to 6:00pm</p>
                        </div>
                
                        <div>
                            <h2 style="color: #60a5fa; font-weight: bold;">Venue:</h2>
                            <p>College Saint-Michel, Carrefour Terminus, Douala</p>
                        </div>
                    </div>
                    <div style="border-top: 2px solid #60a5fa; margin-top: 0.5rem; padding-top: 0.5rem;">
                        <p style="font-weight: bold;">Contacts: +237 679 112 339</p>
                    </div>
                </div>
                <div style="padding: 0 0.75rem;">
                    <h1 style="text-align: center; color: #1e40af; font-size: 1.875rem;">GoMAD</h1>
                    <div>
                        <!-- QR Code Placeholder -->
                        <div class="flex justify-center my-4"><img src="${data.qrcode}"/></div>
                        <p style="text-align: center;">Official use only</p>
                    </div>

                    <div style="border-top: 2px solid #60a5fa; margin-top: 0.5rem; padding-top: 0.5rem;">
                        <!-- QR Code Placeholder -->
                        <div id="qrcode2" class="flex justify-center my-4"></div>
                        <p style="text-align: center;">Official use only</p>
                    </div>
                </div>
            </div>
        </body>
        </html>
    `);

    console.log("Generating PDF");
    const pdf = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: { top: "20px", right: "20px", bottom: "20px", left: "20px" },
    });

    await browser.close();
    console.log("PDF generated successfully");

    // Return the PDF
    return new NextResponse(pdf, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": "attachment; filename=gomad-ticket.pdf",
      },
    });
  } catch (error) {
    console.error("PDF generation error:", error);
    // More detailed error response
    return NextResponse.json(
      {
        error: error.message,
        stack: error.stack,
        details:
          "If Chrome is not installed, run: npx puppeteer browsers install chrome",
      },
      { status: 500 }
    );
  }
}
