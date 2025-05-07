# Simple Login

A modern authentication system built with Nuxt 3, featuring a clean and responsive UI with dark mode support.

## Live Demo

Try the application live: [Simple Login Demo](https://stackblitz.com/~/github.com/amirrdn/simple-login-nuxt)

## Features

- 🔐 Secure Authentication System
- 🌓 Dark/Light Mode Support
- 📱 Responsive Design
- 👥 Role-based Access Control (Admin/Employee)
- 🎨 Modern UI with Tailwind CSS
- ⚡ Fast Loading States
- 🔒 Protected Routes

## Tech Stack

- [Nuxt 3](https://nuxt.com/) - The Vue Framework
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Vue Router](https://router.vuejs.org/) - Official router for Vue.js
- [Yup](https://github.com/jquense/yup) - Schema validation
- [Zod](https://zod.dev/) - TypeScript-first schema validation

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn

## Setup

1. Clone the repository:
```bash
git clone https://github.com/yourusername/simple-login.git
cd simple-login
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create a `.env` file in the root directory:
```env
SESSION_SECRET=your-secret-key
NODE_ENV=development
```

4. Start the development server:
```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:3000`

## Project Structure

```
src/
├── assets/         # Static assets and global styles
├── components/     # Vue components
├── composables/    # Vue composables
├── middleware/     # Route middleware
├── pages/         # Application pages
├── plugins/       # Nuxt plugins
├── router/        # Vue router configuration
├── server/        # Server-side code
└── types/         # TypeScript type definitions
```

## Features in Detail

### Authentication
- Secure login/logout functionality
- Session management
- Protected routes
- Role-based access control

### User Interface
- Clean and modern design
- Responsive layout
- Dark/Light mode toggle
- Loading states with overlay
- Form validation

### Admin Dashboard
- User management
- System statistics
- Role management

### Security
- Session-based authentication
- Protected API routes
- CORS configuration
- Environment variable support

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run generate` - Generate static site
- `npm run preview` - Preview production build

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| SESSION_SECRET | Secret key for session encryption | Yes |
| NODE_ENV | Environment (development/production) | No |

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Nuxt 3 Documentation](https://nuxt.com/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Vue.js Documentation](https://vuejs.org/guide/introduction.html)
