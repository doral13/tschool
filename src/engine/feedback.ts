// ============================================================
// TSchool - Feedback System
// ============================================================

import { ValidationResult, CompilationError, TestResult } from './types';

/**
 * Maps common TypeScript error codes to beginner-friendly explanations
 */
const ERROR_TRANSLATIONS: Record<number, string> = {
  2322: "Type mismatch! The value you're assigning doesn't match the expected type. Check that you're using the correct type.",
  2345: "Wrong argument type! The value you passed to this function doesn't match what it expects.",
  2339: "This property doesn't exist on this type. Did you spell it correctly? Or maybe the type needs to be narrowed first.",
  2304: "This name isn't defined. Did you forget to declare it, or is there a typo?",
  2307: "Can't find this module. Check the import path.",
  2314: "This generic type needs type arguments. Add them in angle brackets like <string>.",
  2315: "Too many type arguments provided.",
  2316: "Too few type arguments provided.",
  2349: "You're trying to call something that isn't callable. Make sure it's a function.",
  2351: "You can't use this expression as a type. Maybe you meant to use 'typeof'?",
  2355: "A function that declares a return type must actually return a value.",
  2366: "Not all code paths return a value. Make sure every branch in your function returns something.",
  2531: "This object could be null. You need to check for null before using it.",
  2532: "This object could be undefined. You need to check for undefined before using it.",
  2551: "This property doesn't exist. Did you mean a similar one? Check for typos.",
  2554: "Wrong number of arguments. Check the function signature.",
  2555: "Too many arguments for this function.",
  2556: "A spread argument must be a tuple or passed to a rest parameter.",
  2564: "This property needs to be initialized. Give it a value in the constructor or use '!' if you're sure it'll be set.",
  2571: "The type is 'unknown'. You need to narrow it before you can use it.",
  2741: "You're missing a required property. Add it to your object.",
  2769: "None of the function overloads match this call. Check the argument types.",
  7006: "This parameter needs a type annotation. Add ': SomeType' after the parameter name.",
  7031: "This binding element needs a type annotation.",
  1005: "Syntax error: something is missing here (maybe a semicolon, bracket, or comma).",
  1003: "Expected an identifier (a name) here.",
  1128: "This declaration isn't allowed here. Check your placement.",
  1109: "This expression isn't allowed in this position.",
  18004: "No value exists in scope for 'this'. Are you using an arrow function where you need a regular function, or vice versa?",
};

export function translateError(code: number, originalMessage: string): string {
  const friendly = ERROR_TRANSLATIONS[code];
  if (friendly) {
    return friendly;
  }
  // Fall back to a simplified version of the original
  return simplifyErrorMessage(originalMessage);
}

function simplifyErrorMessage(message: string): string {
  // Remove TypeScript internals that confuse beginners
  return message
    .replace(/\bts\(\d+\)/g, '')
    .replace(/Type '(.+?)' is not assignable to type '(.+?)'/, "You're using type '$1' but type '$2' is expected")
    .replace(/Property '(.+?)' does not exist on type '(.+?)'/, "The property '$1' doesn't exist on '$2'")
    .replace(/Argument of type '(.+?)' is not assignable to parameter of type '(.+?)'/, "You passed '$1' but '$2' was expected")
    .trim();
}

export function formatCompilationFeedback(errors: CompilationError[]): string {
  const lines: string[] = [];
  lines.push('');
  lines.push('  COMPILATION ERRORS:');
  lines.push('');

  for (const err of errors.slice(0, 5)) { // Show max 5 errors
    lines.push(`  Line ${err.line}: ${err.friendlyMessage}`);
    if (err.friendlyMessage !== err.message) {
      lines.push(`    (Original: ${err.message})`);
    }
    lines.push('');
  }

  if (errors.length > 5) {
    lines.push(`  ... and ${errors.length - 5} more errors`);
    lines.push('');
  }

  return lines.join('\n');
}

export function formatTestFeedback(results: TestResult[]): string {
  const lines: string[] = [];
  lines.push('');
  lines.push('  TEST RESULTS:');
  lines.push('');

  for (const result of results) {
    const icon = result.passed ? '  ✓' : '  ✗';
    lines.push(`  ${icon} ${result.description}`);
    if (!result.passed && result.errorHint) {
      lines.push(`    → ${result.errorHint}`);
    }
  }

  lines.push('');

  const passed = results.filter(r => r.passed).length;
  const total = results.length;
  lines.push(`  ${passed}/${total} tests passed`);

  return lines.join('\n');
}

export function getEncouragingMessage(attempt: number): string {
  const messages = [
    "Don't worry, everyone makes mistakes! Give it another shot.",
    "You're getting closer! Read the hint carefully.",
    "Almost there! Take a deep breath and try again.",
    "Learning is all about trying. You've got this!",
    "Even the best developers Google things. Don't give up!",
    "TypeScript can be tricky, but you're doing great!",
    "Remember: every expert was once a beginner.",
    "The type system is your friend, not your enemy!",
  ];
  return messages[attempt % messages.length];
}

export function getVictoryMessage(): string {
  const messages = [
    "Excellent work! You nailed it!",
    "Perfect! The types are strong with this one!",
    "Brilliant! Your code compiles flawlessly!",
    "Outstanding! You're becoming a TypeScript pro!",
    "Magnificent! The compiler smiles upon you!",
    "Superb! Clean types, clean code!",
    "Impressive! You handled that like a pro!",
    "Well done! Another challenge conquered!",
  ];
  return messages[Math.floor(Math.random() * messages.length)];
}

export function getFlawlessMessage(): string {
  return "FLAWLESS VICTORY! Solved on the first try! +50% bonus XP!";
}

export function getStreakMessage(streak: number): string {
  if (streak >= 10) return `UNSTOPPABLE! ${streak} in a row! +25% streak bonus XP!`;
  if (streak >= 5) return `ON FIRE! ${streak} in a row! +25% streak bonus XP!`;
  if (streak >= 3) return `Nice streak! ${streak} in a row! +25% streak bonus XP!`;
  return '';
}
