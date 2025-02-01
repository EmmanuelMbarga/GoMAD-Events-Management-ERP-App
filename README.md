# GoMAD Event Management App

A progressive web application (PWA) for managing event registrations, check-ins, and ticket validations.

## System Architecture Overview
A progressive web application (PWA) built with Next.js for managing large-scale events. The system uses a microservices architecture with real-time data synchronization and offline capabilities.

### Core Architecture Components
- **Frontend Layer**: Next.js SSR application
- **State Management**: React Context + Local Storage
- **API Layer**: RESTful with Axios interceptors
- **Cache Layer**: Service Workers + IndexedDB
- **Authentication**: JWT with refresh token rotation

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

1. Clone the repository (Master branch)
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
API_URL=https://gomad-backend.onrender.com
PUPPETEER_SKIP_DOWNLOAD=true
CHROME_PATH="C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe"
```

## Project Structure

```
frontend/
├── app/                    # Next.js app directory
│   ├── dashboard/         # Admin dashboard
│   ├── login/           # Login Page
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
- Supports Momo and OM payment methods
- Secure transaction handling
- Automatic ticket generation

## Technical Implementation Details

### Authentication Flow
1. **JWT Implementation**
```javascript
// Token structure
{
  "userType": "admin|staff",
  "permissions": ["scanner", "dashboard"],
  "exp": 1234567890
}
```
- Tokens stored in HttpOnly cookies
- Auto-refresh mechanism 5 minutes before expiration
- Role-based route protection using Next.js middleware

### QR Code System
- **Generation**: Uses `qrcode` library with error correction level 'H'
- **Validation Flow**:
  1. Scan QR (html5-qrcode)
  2. Decrypt ticket data
  3. Verify against backend
  4. Update status atomically
- **Offline Support**: Local validation with sync queue

### Real-time Features
- WebSocket connections for live updates
- Fallback to polling when WebSocket fails
- Optimistic UI updates with rollback

### Data Flow Architecture
```
User Action -> Context -> API Layer -> Cache Layer -> UI Update
                     -> Optimistic Update
                     -> Error Handling
```

## Component Architecture

### Key Components Structure
```
components/
├── auth/              # Authentication components
│   ├── AuthGuard.tsx    # Route protection
│   └── LoginForm.tsx    # Authentication forms
├── tickets/           # Ticket management
│   ├── Generator.tsx    # QR generation
│   └── Scanner.tsx      # QR scanning
└── dashboard/         # Analytics components
    ├── Charts.tsx       # Data visualization
    └── Stats.tsx        # Statistics display
```

### State Management
- **AuthContext**: User session & permissions
- **TicketContext**: Ticket operations & cache
- **UIContext**: App-wide UI state

## API Integration

### Endpoint Structure
```typescript
interface APIEndpoints {
  auth: {
    login: '/api/auth/login',
    logout: '/api/auth/logout'
  },
  tickets: {
    validate: '/api/tickets/validate',
    generate: '/api/tickets/generate',
    status: '/api/tickets/status'
  }
}
```

### Error Handling
- Global error boundary for React components
- Axios interceptors for API errors
- Offline error queue with retry logic

## Performance Optimizations

### Implemented Optimizations
1. **Code Splitting**
   - Dynamic imports for routes
   - Component lazy loading
   - CSS code splitting

2. **Caching Strategy**
   - Runtime caching for API responses
   - Static asset caching
   - Offline-first approach

3. **Image Optimization**
   - Next.js Image component
   - WebP format with fallbacks
   - Lazy loading implementation

## Development Workflow

### Setup Requirements
- Node.js >= 18.0.0
- npm or pnpm
- Chrome for debugging

### Environment Configuration
```env
# Required Environment Variables
API_URL=string            # Backend API URL
NODE_ENV=development|production
NEXT_PUBLIC_WS_URL=string # WebSocket URL
```

### Development Commands
```bash
# Development
npm run dev          # Start development server
npm run lint        # Run ESLint
npm run type-check  # Run TypeScript checks

# Production
npm run build      # Production build
npm run analyze    # Bundle analysis
```

### Testing Strategy
1. **Unit Tests**: Components & utilities
2. **Integration Tests**: API interactions
3. **E2E Tests**: Critical user flows

## Deployment

### Production Checklist
- [ ] Environment variables configured
- [ ] SSL certificates installed
- [ ] CDN configuration
- [ ] Database migrations
- [ ] Cache warming

### Monitoring
- Performance metrics
- Error tracking
- User analytics

## Troubleshooting Guide

### Common Issues
1. **QR Scanner Issues**
   - Check camera permissions
   - Verify lighting conditions
   - Clear cache if persistent

2. **Authentication Problems**
   - Clear cookies
   - Check token expiration
   - Verify CORS settings

3. **Performance Issues**
   - Check bundle size
   - Monitor memory usage
   - Verify CDN caching

## Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/AmazingFeature`
3. Commit your changes: `git commit -m 'feat (file name): Add some AmazingFeature'`
4. Push to the branch: `git push origin feature/AmazingFeature`
5. Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Security Considerations
- CSRF protection
- Rate limiting
- Input sanitization
- XSS prevention
- CORS policy

## Continuous Integration & Deployment
- Automatically run tests on Pull Requests
- Generate production builds using containers
- Deploy to staging for final verification
- Promote tested builds to production

## Styling & Theming
- Uses Tailwind CSS for utility-based styling
- Framer Motion for smooth transitions

## Third-Party Integrations
- Payment providers (IWOMI PAY - MOMO & OM)

## Glossary
- **PWA (Progressive Web App)**: Web applications with offline support, installable on devices
- **JWT (JSON Web Token)**: Securely transmit session data
- **SSR (Server-Side Rendering)**: Rendering pages on the server for faster initial loads
- **Optimistic UI**: Updating the UI immediately before the server response