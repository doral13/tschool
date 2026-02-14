#!/usr/bin/env node
// ============================================================
// TSchool - Main Entry Point
// ============================================================

import { startGame } from './engine/runner';

startGame().catch((err) => {
  console.error('An unexpected error occurred:', err);
  process.exit(1);
});
