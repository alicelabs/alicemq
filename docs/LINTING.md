# Automated Linting & Code Quality

This document describes the automated linting and code quality setup for AliceMQ.

## 🤖 Automated Linting (Cloud-Based)

### GitHub Actions Auto-Fix

**Workflow**: `.github/workflows/auto-fix.yml`

This workflow automatically runs on every push and pull request:

```yaml
✅ Runs ESLint with --fix
✅ Runs Prettier formatting
✅ Commits fixes automatically
✅ Pushes changes back to the branch
```

**How it works:**

1. Triggers on push to any branch
2. Runs `npm run lint:fix` to auto-fix ESLint issues
3. Runs `npm run format` to format code
4. If changes are detected, commits them with message: `chore: auto-fix linting issues [skip ci]`
5. Pushes the commit back to the branch

**Note**: The `[skip ci]` tag prevents infinite loops by skipping CI on auto-fix commits.

### GitHub Actions CI

**Workflow**: `.github/workflows/ci.yml`

Runs comprehensive checks on every push/PR:

```yaml
✅ ESLint validation
✅ TypeScript type checking
✅ Prettier format checking
✅ Jest tests with coverage
✅ Production build verification
```

**Jobs:**

- **Test**: Runs on Node 18.x and 20.x
  - Linting (`npm run lint`)
  - Type checking (`npm run type-check`)
  - Tests (`npm run test:ci`)
  - Coverage upload to Codecov

- **Build**: Validates production build
  - Webpack production build
  - Bundle size reporting
  - Artifact upload

- **Format Check**: Validates code formatting
  - Prettier format verification

## 🛠️ Local Development

### Pre-commit Hooks (Automatic)

**File**: `.lintstagedrc.json`

Automatically runs on `git commit`:

```json
{
  "*.{js,jsx,ts,tsx}": ["eslint --fix", "prettier --write"],
  "*.{json,css,md}": ["prettier --write"]
}
```

**What happens when you commit:**

1. Husky intercepts the commit
2. Lint-staged runs on staged files only
3. ESLint fixes issues automatically
4. Prettier formats code
5. Fixed files are re-staged
6. Commit proceeds with clean code

### Manual Commands

Run these commands locally to fix issues:

```bash
# Fix all linting and formatting issues (recommended)
npm run fix-all

# Fix ESLint issues only
npm run lint:fix

# Format code with Prettier
npm run format

# Check for issues without fixing
npm run lint
npm run format:check
npm run type-check
```

## 📋 Linting Rules

### ESLint Configuration

**File**: `.eslintrc.json`

```json
{
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "@typescript-eslint/recommended",
    "prettier"
  ],
  "rules": {
    "react/react-in-jsx-scope": "off",
    "react/prop-types": "off",
    "react/display-name": "off",
    "@typescript-eslint/no-unused-vars": [
      "warn",
      {
        "argsIgnorePattern": "^_|^e$",
        "varsIgnorePattern": "^_"
      }
    ]
  }
}
```

**Key features:**

- React 18+ support (no React import needed)
- React Hooks validation
- TypeScript support
- Unused variables prefixed with `_` are allowed
- Integrated with Prettier

### Prettier Configuration

**File**: `.prettierrc.json`

```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 100,
  "tabWidth": 2
}
```

## 🔧 Troubleshooting

### Pre-commit hook not running

```bash
# Reinstall Husky
npm run prepare
```

### Want to skip pre-commit hook (not recommended)

```bash
git commit --no-verify -m "your message"
```

### Linting errors after merge

```bash
# Run auto-fix on all files
npm run fix-all

# Then commit the fixes
git add -A
git commit -m "fix: resolve linting issues"
```

### GitHub Actions auto-fix not working

Check:

1. Repository has write permissions enabled
2. Branch is not protected without allowing GitHub Actions
3. Check workflow run logs in GitHub Actions tab

## 📊 Linting Statistics

Current status:

- ✅ **0 ESLint errors**
- ✅ **0 ESLint warnings**
- ✅ **0 Prettier issues**
- ✅ **0 TypeScript errors**

## 🎯 Best Practices

1. **Always run `npm run fix-all` before committing** (pre-commit hook does this automatically)
2. **Don't disable ESLint rules without team discussion**
3. **Use `_` prefix for intentionally unused variables**
4. **Let GitHub Actions auto-fix handle minor issues**
5. **Review auto-fix commits** to ensure they're correct

## 🚀 Adding New Rules

To add new ESLint rules:

1. Edit `.eslintrc.json`
2. Test locally: `npm run lint`
3. Update this documentation
4. Commit and push (auto-fix will validate)

## 📝 CI/CD Integration

### Status Checks

All PRs must pass:

- ✅ ESLint validation
- ✅ Prettier format check
- ✅ TypeScript type check
- ✅ All tests passing
- ✅ Production build success

### Auto-Fix Commits

Auto-fix commits are marked with `[skip ci]` to prevent:

- Infinite CI loops
- Unnecessary CI runs
- Wasted GitHub Actions minutes

### Branch Protection

Recommended settings:

- Require status checks to pass
- Require auto-fix workflow to complete
- Allow force pushes from GitHub Actions

## 📚 Resources

- [ESLint Documentation](https://eslint.org/docs/latest/)
- [Prettier Documentation](https://prettier.io/docs/en/index.html)
- [Husky Documentation](https://typicode.github.io/husky/)
- [lint-staged Documentation](https://github.com/okonet/lint-staged)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
