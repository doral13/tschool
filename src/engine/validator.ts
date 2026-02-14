// ============================================================
// TSchool - Solution Validator
// ============================================================

import * as ts from 'typescript';
import * as path from 'path';
import * as fs from 'fs';
import { Challenge, ValidationResult, CompilationError, TestResult } from './types';
import { translateError } from './feedback';

const WORKSPACE_DIR = path.join(process.cwd(), 'workspace');

export function getWorkspaceFilePath(challenge: Challenge): string {
  const levelDir = `level-${String(challenge.level).padStart(2, '0')}`;
  const fileName = `challenge-${String(challenge.number).padStart(2, '0')}.ts`;
  return path.join(WORKSPACE_DIR, levelDir, fileName);
}

export function ensureWorkspaceFile(challenge: Challenge): string {
  const filePath = getWorkspaceFilePath(challenge);
  const dir = path.dirname(filePath);

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, challenge.scaffold);
  }

  return filePath;
}

export function resetWorkspaceFile(challenge: Challenge): string {
  const filePath = getWorkspaceFilePath(challenge);
  const dir = path.dirname(filePath);

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  fs.writeFileSync(filePath, challenge.scaffold);
  return filePath;
}

export function validateSolution(challenge: Challenge): ValidationResult {
  const filePath = getWorkspaceFilePath(challenge);

  if (!fs.existsSync(filePath)) {
    return {
      success: false,
      compilationErrors: [{
        line: 0,
        column: 0,
        message: 'Solution file not found. Make sure you create it first!',
        friendlyMessage: 'Solution file not found. Make sure you create it first!',
        code: 0,
      }],
      testResults: [],
    };
  }

  const sourceCode = fs.readFileSync(filePath, 'utf-8');

  // Step 1: Check for TypeScript compilation errors
  const compilationErrors = checkCompilation(sourceCode, filePath);
  if (compilationErrors.length > 0) {
    return {
      success: false,
      compilationErrors,
      testResults: [],
    };
  }

  // Step 2: Run the tests
  const testResults = runTests(sourceCode, challenge);
  const allPassed = testResults.every(t => t.passed);

  return {
    success: allPassed,
    compilationErrors: [],
    testResults,
  };
}

function checkCompilation(sourceCode: string, filePath: string): CompilationError[] {
  const compilerOptions: ts.CompilerOptions = {
    target: ts.ScriptTarget.ES2020,
    module: ts.ModuleKind.CommonJS,
    strict: true,
    noEmit: true,
    esModuleInterop: true,
    skipLibCheck: true,
  };

  // Create a virtual file system for compilation
  const fileName = path.basename(filePath);
  const sourceFile = ts.createSourceFile(fileName, sourceCode, ts.ScriptTarget.ES2020, true);

  const host = ts.createCompilerHost(compilerOptions);
  const originalGetSourceFile = host.getSourceFile;
  host.getSourceFile = (name, languageVersion) => {
    if (name === fileName) return sourceFile;
    return originalGetSourceFile.call(host, name, languageVersion);
  };

  const program = ts.createProgram([fileName], compilerOptions, host);
  const diagnostics = ts.getPreEmitDiagnostics(program, sourceFile);

  return diagnostics
    .filter(d => d.category === ts.DiagnosticCategory.Error)
    .map(d => {
      const pos = d.file && d.start !== undefined
        ? d.file.getLineAndCharacterOfPosition(d.start)
        : { line: 0, character: 0 };

      const message = ts.flattenDiagnosticMessageText(d.messageText, '\n');
      const code = d.code;

      return {
        line: pos.line + 1,
        column: pos.character + 1,
        message,
        friendlyMessage: translateError(code, message),
        code,
      };
    });
}

function runTests(sourceCode: string, challenge: Challenge): TestResult[] {
  const results: TestResult[] = [];

  for (const testCase of challenge.tests) {
    try {
      // Build a test wrapper that evaluates the user's code + test assertion
      const testCode = `
        ${sourceCode}
        ;(function() { return ${testCase.test}; })()
      `;

      // Transpile to JS for evaluation
      const jsCode = ts.transpileModule(testCode, {
        compilerOptions: {
          target: ts.ScriptTarget.ES2020,
          module: ts.ModuleKind.CommonJS,
          strict: false, // relax for eval
        },
      }).outputText;

      // Evaluate
      const result = eval(jsCode);

      results.push({
        description: testCase.description,
        passed: result === true,
        errorHint: result === true ? undefined : testCase.errorHint,
      });
    } catch (err: any) {
      results.push({
        description: testCase.description,
        passed: false,
        errorHint: testCase.errorHint,
      });
    }
  }

  return results;
}
