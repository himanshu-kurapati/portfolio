# Modern Portfolio Website

A responsive, accessible, dark-theme portfolio site built with React + TypeScript, featuring Framer Motion v11 animations and Tailwind CSS styling. This portfolio recreates the visual and interactive experience of the Cohesion (Framer) template with modern web technologies.

## ✨ Features

- **Modern Tech Stack**: React 19 + TypeScript + Tailwind CSS
- **Advanced Animations**: Framer Motion v11 with spring physics and scroll-based animations
- **3D Graphics**: Three.js integration with floating objects and parallax effects
- **Custom Cursor**: Interactive cursor with hover states and labels
- **Dark Theme**: Glassmorphism effects with neon accents
- **Responsive Design**: Mobile-first approach with smooth breakpoints
- **Accessibility**: ARIA labels, contrast ratios ≥ 4.5, reduced motion support
- **Performance Optimized**: Lazy loading, dynamic imports, compressed assets

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install --legacy-peer-deps
   ```

3. **Start development server**
   ```bash
   npm start
   ```

4. **Open in browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
```

The build artifacts will be stored in the `build/` directory.

## 🎨 Design System

### Colors
- **Dark Background**: `#0d0e12`
- **Primary Accent**: `#7f5af0` (Purple)
- **Secondary Accent**: `#2cb67d` (Green)

### Typography
- **Font**: Inter (Google Fonts)
- **Weights**: 300, 400, 500, 600, 700, 800, 900

### Components
- **Glass Cards**: `bg-[#16171d]/60 backdrop-blur-md border border-white/5`
- **Gradients**: Primary to secondary color transitions
- **Hover Effects**: Scale animations with glow shadows

## 📱 Sections

### 1. Navigation (`Header.tsx`)
- Sticky navigation with glassmorphism
- Logo follows cursor with spring delay
- Mobile-responsive hamburger menu
- Smooth underline animations on links

### 2. Hero (`Hero.tsx`)
- Full-viewport layout with 3D floating objects
- Staggered word-by-word text animations
- Interactive statistics cards
- Parallax scroll effects

### 3. About (`About.tsx`)
- Split layout with image scaling animations
- Line-by-line text reveals using clipPath
- Skills grid with hover animations
- Stats section with icons

### 4. Tech Stack (`Stack.tsx`)
- 3D flip cards with Y-axis rotation
- Front shows icons, back shows descriptions
- Technology icons grid
- Hover effects with scaling

### 5. Services (`Services.tsx`)
- Horizontal scroll with snap points
- Service cards with 3D rotation on view
- Pricing plans with popular highlighting
- CTA section

### 6. Projects (`Projects.tsx`)
- Project showcase with image overlays
- Featured project spans multiple columns
- Hover effects with glow and lift
- GitHub and live demo links

### 7. Testimonials (`Testimonials.tsx`)
- Auto-play slider (6-second intervals)
- Star ratings and client avatars
- Navigation dots and arrows
- Smooth fade transitions

### 8. Contact (`Contact.tsx`)
- Gradient stroke text headings
- Animated contact form
- Social media links
- Footer with navigation

## 🎬 Animation System

### Motion Configuration (`motion.config.ts`)
- **Spring Physics**: `{ stiffness: 400, damping: 40 }`
- **Cubic Bezier Easings**: Custom easing curves
- **Reusable Variants**: `fadeUp`, `scaleIn`, `stagger`, `slideLeft`
- **Reduced Motion**: Respects user preferences

### Custom Cursor (`CustomCursor.tsx`)
- 12px circle that follows pointer
- Scales 2x on hover with spring animation
- Shows labels for interactive elements
- Mix-blend-mode for visibility

## 🔧 Performance Optimizations

- **Dynamic Imports**: Three.js assets load after `useInView`
- **Lazy Loading**: Components load when needed
- **Image Compression**: Optimized with 80% MozJPEG
- **Smooth Scrolling**: CSS `scroll-behavior: smooth`

## 📦 Dependencies

### Core
- `react` - UI library
- `typescript` - Type safety
- `framer-motion` - Animations
- `tailwindcss` - Styling

### 3D Graphics
- `@react-three/fiber` - React Three.js renderer
- `@react-three/drei` - Three.js helpers
- `three` - 3D graphics library

### Utilities
- `react-intersection-observer` - Scroll-based animations

## 🎯 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm run build
# Upload build folder to Netlify
```

### GitHub Pages
```bash
npm install --save-dev gh-pages
npm run build
npm run deploy
```

## 🔧 Customization

### Colors
Update `tailwind.config.js`:
```js
colors: {
  dark: "#your-dark-color",
  primary: "#your-primary-color",
  secondary: "#your-secondary-color",
}
```

### Animations
Modify `src/motion.config.ts` for custom animations:
```ts
export const customVariant: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1 }
};
```

### Content
Update component content by editing the respective `.tsx` files in `src/components/`.

## 🐛 Troubleshooting

### TypeScript Errors
Make sure all dependencies are installed with `--legacy-peer-deps` flag.

### Three.js Performance
Reduce the number of 3D objects or lower the quality for better performance on slower devices.

### Animation Issues
Check if `prefers-reduced-motion` is enabled in browser settings.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📧 Contact

For questions or support, please reach out through the contact form on the website or create an issue in the repository.

---

Built with ❤️ using React, TypeScript, and Framer Motion
