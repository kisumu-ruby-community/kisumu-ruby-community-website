# Kisumu Ruby Community Website

Public-facing website for the Ruby developer community based in Kisumu, Kenya. Built with Angular 21, TailwindCSS, and Angular Universal (SSR).

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Angular 21 (Standalone Components) |
| Styling | TailwindCSS v4 |
| Icons | Lucide Angular |
| Forms | Formspree |
| SSR | Angular Universal |
| Hosting | Vercel / Firebase Hosting |

## Prerequisites

- Node.js 20+
- npm 10+
- Angular CLI 21+

```bash
npm install -g @angular/cli
```

## Setup

```bash
# Clone the repository
git clone https://github.com/kisumu-ruby-community/kisumu-ruby-community-website.git
cd kisumu-ruby-community-website

# Install dependencies
npm install
```

## Environment Configuration

The app uses environment files for external service URLs. These are located in `src/environments/`.

Copy the default and fill in your values:

```
src/environments/environment.ts       ← development
src/environments/environment.prod.ts  ← production
```

Current environment variables:

```ts
export const environment = {
  production: false,
  formspree: {
    contactUrl: 'https://formspree.io/f/<your-form-id>',
    proposalUrl: 'https://formspree.io/f/<your-form-id>',
  },
};
```

> The Formspree endpoints handle the contact form and talk proposal form submissions. Set up your forms at [formspree.io](https://formspree.io).

## Development

```bash
ng serve
```

Navigate to `http://localhost:4200/`. The app reloads automatically on file changes.

## Building

```bash
# Production build
ng build

# Output is in dist/kisumu-ruby-community-website/
```

## Project Structure

```
src/
├── app/
│   ├── core/
│   │   └── services/          # NotificationService
│   ├── shared/
│   │   └── components/        # Navbar, Footer, Notification
│   ├── features/
│   │   ├── home/              # Landing page
│   │   ├── about/             # About page
│   │   └── contact/           # Contact & join page
│   ├── app.routes.ts
│   ├── app.config.ts
│   └── app.html
├── environments/
│   ├── environment.ts
│   └── environment.prod.ts
└── styles.css                 # Global styles & design tokens
```

## Pages

| Route | Description |
|---|---|
| `/` | Homepage with hero, typing animation, and community stats |
| `/about` | Origin story, values, leadership, and join links |
| `/contact` | Community join links, contact form, and talk proposal form |

## Running Tests

```bash
ng test
```
