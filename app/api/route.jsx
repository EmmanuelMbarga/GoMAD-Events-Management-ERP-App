// app/api/route.js
export async function GET(req) {
    const { searchParams } = new URL(req.url);
  
    // Get query parameters
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);
    const search = searchParams.get("search") || "";
  
    // Sample data
    const allGuests = [
      { id: 1, name: "Leasie Watson", phoneNumber: "+237 67895554", guestNum: 2, qrCode: "xxxxxxx", rsvpStatus: "On Time" },
      { id: 2, name: "Darlene Robertson", phoneNumber: "+234 5678930", guestNum: 3, qrCode: "xxxxxxx", rsvpStatus: "Late" },
      { id: 3, name: "Jacob Jones", phoneNumber: "+001 23456788", guestNum: 1, qrCode: "xxxxxxx", rsvpStatus: "Late" },
      // Add more sample data
    ];
  
    // Filter and paginate data
    const filteredGuests = allGuests.filter((guest) =>
      guest.name.toLowerCase().includes(search.toLowerCase())
    );
  
    const paginatedGuests = filteredGuests.slice(
      (page - 1) * limit,
      page * limit
    );
  
    return new Response(
      JSON.stringify({
        guests: paginatedGuests,
        total: filteredGuests.length,
      }),
      {
        headers: { "Content-Type": "application/json" },
      }
    );
  }
  