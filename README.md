# OswegoLabs — Post-Quantum Infrastructure

OswegoLabs is a specialized UI and simulation environment demonstrating high-assurance, post-quantum cryptography (PQC) workflows for distributed systems (Kafka, NATS, gRPC).

## Features

- **Interactive Envelope Simulator**: Visualizes the KEMIv5.15 lifecycle (KeyGen, Encapsulation, Signing, Encryption).
- **Lattice Visualization**: Abstract representation of lattice-based cryptography.
- **Fault Injection**: Tools to corrupt payloads and verify tamper-evidence.
- **Metrics**: Real-time payload overhead estimation and wire transport analysis.

## Tech Stack

- **Framework**: React 18 (SPA structure)
- **Styling**: TailwindCSS (Industrial/Dark Mode configuration)
- **Animation**: Framer Motion
- **Icons**: Custom SVG set (Tree, Lattice, Flask)
- **Build/Deploy**: Vite-compatible structure / Vercel ready

## Project Structure

- `/components`: UI components organized by domain (`envelope`, `hero`, `oswego`).
- `/lib`: Simulation utilities (`cryptoSim.ts`) and helpers.
- `App.tsx`: Main routing and layout logic.

## Deployment

### Docker

Build the container:

```bash
docker build -t oswego-labs .
docker run -p 8080:80 oswego-labs
```

### Vercel

The project includes a `vercel.json` configured for SPA routing. Connect your repository and deploy with default settings.

## Accessibility

This application targets WCAG 2.1 AA compliance:
- Semantic HTML structure.
- High contrast "Charcoal & Coral" theme.
- ARIA labels for interactive simulation controls.
- Reduced motion preferences respected (via OS settings).

---
© 2024 OswegoLabs Inc. FIPS-203/204 Compliance.
