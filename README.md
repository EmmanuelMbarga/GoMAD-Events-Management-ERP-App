# GoMAD Event Management App

A progressive web application (PWA) for managing event registrations, check-ins, and ticket validations.

## Features

- 🎫 QR Code-based ticket generation and validation
- 📱 PWA support for offline functionality
- 🔐 Role-based authentication (Admin/Staff)
- 📊 Real-time dashboard with analytics
- 💳 Integrated payment processing
- 📱 Responsive design for all devices

## Tech Stack

- **Frontend**
  - Next.js 15.1.2
  - React 19.0.0
  - Tailwind CSS
  - Framer Motion
  - Next PWA

- **Key Dependencies**
  - @headlessui/react - UI components
  - @react-pdf/renderer - PDF ticket generation
  - html5-qrcode - QR code scanning
  - qrcode - QR code generation
  - axios - API requests
  - recharts - Dashboard analytics

## Getting Started

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Build for production:
```bash
npm run build
npm start
```

## Environment Setup

Create a `.env.local` file in the root directory with:

```env
NEXT_PUBLIC_API_URL=https://gomad-backend.onrender.com
```

## Project Structure

```
frontend/
├── app/                    # Next.js app directory
│   ├── dashboard/         # Admin dashboard
│   ├── scanner/           # QR code scanner
│   └── (payment)/        # Payment processing
├── components/            # Reusable components
├── public/               # Static assets
└── utils/               # Helper functions
```

## Authentication

The app supports two user roles:
- **Admin**: Full access to dashboard and scanner
- **Staff**: Access to scanner only

## Features in Detail

### Ticket Management
- Generate QR codes for tickets
- Validate tickets through scanning
- Real-time check-in status updates

### Dashboard
- Total sales metrics
- User registration statistics
- Real-time analytics

### Payment Processing
- Supports multiple payment methods
- Secure transaction handling
- Automatic ticket generation

## Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/AmazingFeature`
3. Commit your changes: `git commit -m 'Add some AmazingFeature'`
4. Push to the branch: `git push origin feature/AmazingFeature`
5. Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.