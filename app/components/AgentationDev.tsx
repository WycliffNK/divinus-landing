'use client';

import { Agentation } from 'agentation';

/**
 * Dev-only mount for Agentation — adds the annotation overlay that talks to
 * the Agentation MCP server. Gated to development so it never ships to prod.
 * The component itself is browser-only (requires DOM access).
 */
export default function AgentationDev() {
  if (process.env.NODE_ENV !== 'development') return null;
  return <Agentation />;
}
