# Architecture & Design System

## Design Philosophy: "Industrial Post-Quantum"
The UI enforces a strict "no-rounding" policy (`border-radius: 0`) to communicate precision, stability, and the deterministic nature of cryptographic infrastructure.

### Color Palette
- **Charcoal (`#0F0F0F`)**: Primary background. Represents the secure void.
- **Coral (`#FF6B5A`)**: Action/Alert. Used for CTAs and critical lattice nodes.
- **Node (`#3CC9DD`)**: Information. Represents secure endpoints.
- **Grid (`#2D6B9F`)**: Structure. The underlying mathematical lattice.

## Component Architecture

### 1. The Envelope Simulator
Located in `components/envelope/`, this module uses a unidirectional data flow.
- **`InteractiveEnvelope`**: The controller. Manages `stage` state (0-5) and holds the `envelope` data object.
- **`cryptoSim.ts`**: Provides *simulated* cryptographic primitives (ML-KEM, ML-DSA, AEAD). *Note: These are for demonstration only and rely on `window.crypto` for randomness but do not perform actual lattice math.*
- **Visualizers**: `WireView`, `SizeEstimator`, `DiffView` subscribe to the `envelope` state to render real-time diagnostics.

### 2. The Landing Interface
Located in `App.tsx` and `components/hero/`.
- **State**: Uses a simple `view` state string (`landing` | `platform` | `envelope`) to manage routing without a heavy router library, keeping the bundle size minimal.
- **Performance**: Animations are offloaded to `framer-motion` which handles GPU acceleration for the background lattice pulse.

## Routing
This is a Single Page Application (SPA).
- **Client-side**: `App.tsx` conditionally renders views.
- **Server-side**: Nginx/Vercel must be configured to rewrite all routes to `index.html` to allow for deep linking (future proofing) and proper 404 handling.

## Code Quality Standards
- **Strict Typing**: All components use TypeScript interfaces.
- **Accessibility**: All interactive elements must have `aria-label` if text is not descriptive.
- **Performance**: Large assets are avoided. Icons are inline SVGs to prevent layout shift.
