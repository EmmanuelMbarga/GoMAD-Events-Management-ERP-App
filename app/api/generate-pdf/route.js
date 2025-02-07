import { NextResponse } from "next/server";
import puppeteer from "puppeteer-core";
import chromium from "@sparticuz/chromium";
import TicketView from "@/app/(payment)/ticket.js";

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

    // Launch browser using Chromium
    const browser = await puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath(), // Get the correct Chromium path
      headless: true,
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
           ${<TicketView Data={data}/>}
        </body>
        </html>
    `);

    console.log("Generating PDF");
    const pdf = await page.pdf({
      format: "B5",
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
