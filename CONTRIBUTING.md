# Contributing to AliceMQ

Thank you for your interest in contributing to AliceMQ! This document provides guidelines and instructions for contributing to the project.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Coding Standards](#coding-standards)
- [Testing](#testing)
- [Submitting Changes](#submitting-changes)
- [Reporting Issues](#reporting-issues)

## Code of Conduct

### Our Pledge

We are committed to providing a welcoming and inspiring community for all. Please be respectful and constructive in all interactions.

### Expected Behavior

- Be respectful and inclusive
- Welcome newcomers and help them get started
- Focus on what is best for the community
- Show empathy towards other community members

### Unacceptable Behavior

- Harassment, discrimination, or offensive comments
- Personal attacks or trolling
- Publishing others' private information
- Any conduct that could reasonably be considered inappropriate

## Getting Started

### Prerequisites

Before you begin, ensure you have:

- Node.js >= 18.0.0
- npm >= 9.0.0
- Git
- A GitHub account
- (Optional) Docker and Docker Compose

### Setting Up Your Development Environment

1. **Fork the repository** on GitHub

2. **Clone your fork:**

   ```bash
   git clone https://github.com/YOUR_USERNAME/alicemq.git
   cd alicemq
   ```

3. **Add upstream remote:**

   ```bash
   git remote add upstream https://github.com/alicelabs/alicemq.git
   ```

4. **Install dependencies:**

   ```bash
   npm install
   ```

5. **Create a .env file:**

   ```bash
   cp .env.example .env
   # Edit .env with your local RabbitMQ settings
   ```

6. **Verify setup:**
   ```bash
   npm test
   npm run lint
   npm run type-check
   ```

### Using Docker (Recommended)

```bash
# Start RabbitMQ and development server
docker-compose up

# Access:
# - AliceMQ: http://localhost:8080
# - RabbitMQ Management: http://localhost:15672
```

## Development Workflow

### 1. Create a Feature Branch

```bash
# Update your local main branch
git checkout main
git pull upstream main

# Create a new branch
git checkout -b feature/your-feature-name
# or
git checkout -b fix/your-bug-fix
```

Branch naming conventions:

- `feature/` - New features
- `fix/` - Bug fixes
- `docs/` - Documentation updates
- `refactor/` - Code refactoring
- `test/` - Test additions or fixes
- `chore/` - Maintenance tasks

### 2. Make Your Changes

- Write clear, concise commit messages
- Keep commits focused and atomic
- Add tests for new functionality
- Update documentation as needed

### 3. Test Your Changes

```bash
# Run linting
npm run lint

# Run type checking
npm run type-check

# Run tests
npm test

# Run all checks
npm run lint && npm run type-check && npm test
```

### 4. Commit Your Changes

Follow the conventional commits specification:

```bash
# Format: <type>(<scope>): <description>

git commit -m "feat(graph): add zoom controls to network graph"
git commit -m "fix(connection): handle RabbitMQ connection timeout"
git commit -m "docs(readme): update installation instructions"
git commit -m "test(components): add tests for ErrorBoundary"
```

Types:

- `feat` - New feature
- `fix` - Bug fix
- `docs` - Documentation changes
- `style` - Code style changes (formatting, etc.)
- `refactor` - Code refactoring
- `test` - Adding or updating tests
- `chore` - Maintenance tasks

### 5. Push and Create Pull Request

```bash
# Push to your fork
git push origin feature/your-feature-name

# Create a pull request on GitHub
```

## Coding Standards

### JavaScript/React

- Use functional components with hooks (not class components)
- Follow React best practices
- Use meaningful variable and function names
- Keep functions small and focused
- Add JSDoc comments for complex functions

### Code Style

We use ESLint and Prettier for code formatting:

```bash
# Format code
npm run format

# Check formatting
npm run format:check

# Fix linting issues
npm run lint:fix
```

**Key style rules:**

- 2 spaces for indentation
- Single quotes for strings
- Semicolons required
- Trailing commas in ES5 syntax
- Max line length: 100 characters

### TypeScript

- Add type definitions for new modules in `types/`
- Use TypeScript for new files when possible
- Avoid `any` type; use proper typing

### File Organization

```
client/
├── Components/     # Presentational components
├── Containers/     # Container components with logic
└── utils/          # Utility functions

server/             # Server-side code
test/               # Test configuration and helpers
```

## Testing

### Writing Tests

- Write tests for all new features
- Maintain or improve code coverage
- Use React Testing Library for component tests
- Mock external dependencies appropriately

### Test Structure

```javascript
describe('Component/Function Name', () => {
  // Setup
  beforeEach(() => {
    // Setup code
  });

  it('should do something specific', () => {
    // Arrange
    const input = 'test';

    // Act
    const result = functionUnderTest(input);

    // Assert
    expect(result).toBe(expected);
  });
});
```

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### Coverage Requirements

- Minimum coverage: 40% (branches, functions, lines, statements)
- Aim for higher coverage on new code
- Coverage reports are generated in `coverage/`

## Submitting Changes

### Pull Request Checklist

Before submitting a pull request, ensure:

- [ ] Code follows the project's style guidelines
- [ ] All tests pass (`npm test`)
- [ ] Linting passes (`npm run lint`)
- [ ] Type checking passes (`npm run type-check`)
- [ ] New tests added for new functionality
- [ ] Documentation updated (if applicable)
- [ ] Commits follow conventional commits format
- [ ] Branch is up to date with main

### Pull Request Template

```markdown
## Description

Brief description of the changes

## Type of Change

- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing

Describe how you tested your changes

## Screenshots (if applicable)

Add screenshots for UI changes

## Related Issues

Fixes #123
```

### Review Process

1. Automated checks will run (CI, linting, tests)
2. Maintainers will review your code
3. Address any requested changes
4. Once approved, your PR will be merged

### Updating Your PR

If changes are requested:

```bash
# Make changes
git add .
git commit -m "fix: address review comments"
git push origin feature/your-feature-name
```

## Reporting Issues

### Before Creating an Issue

1. Check if the issue already exists
2. Ensure you're using the latest version
3. Collect relevant information (OS, Node version, error messages)

### Creating a Good Issue

**For bugs:**

- Clear, descriptive title
- Steps to reproduce
- Expected vs. actual behavior
- Environment details
- Error messages and stack traces
- Screenshots (if applicable)

**For features:**

- Clear description of the feature
- Use case and benefits
- Proposed implementation (optional)

### Issue Template

```markdown
## Bug Report / Feature Request

**Description:**
Clear description of the issue or feature

**Environment:**

- OS: [e.g., macOS 13.0]
- Node.js: [e.g., 18.17.0]
- npm: [e.g., 9.8.0]
- AliceMQ version: [e.g., 1.0.1]

**Steps to Reproduce:** (for bugs)

1. Step 1
2. Step 2
3. ...

**Expected Behavior:**
What you expected to happen

**Actual Behavior:**
What actually happened

**Screenshots:**
If applicable

**Additional Context:**
Any other relevant information
```

## Development Tips

### Debugging

```bash
# Enable verbose logging
ELECTRON_ENABLE_LOGGING=true npm run app

# Run with Node debugger
node --inspect-brk node_modules/.bin/webpack serve
```

### Hot Reload

```bash
# Start dev server with hot reload
npm run dev
# Changes to React components will auto-reload
```

### Bundle Analysis

```bash
# Analyze webpack bundle size
npm run build:analyze
# Opens visualization in browser
```

### Common Issues

**Port already in use:**

```bash
# Kill process on port 8080
lsof -ti:8080 | xargs kill -9
```

**Electron rebuild needed:**

```bash
npm rebuild electron
```

**Clear cache:**

```bash
rm -rf node_modules .webpack_cache
npm install
```

## Getting Help

- **Documentation:** Check the [README](README.md)
- **Issues:** Search [existing issues](https://github.com/alicelabs/alicemq/issues)
- **Discussions:** Start a [discussion](https://github.com/alicelabs/alicemq/discussions)

## License

By contributing to AliceMQ, you agree that your contributions will be licensed under the Mozilla Public License 2.0.

## Recognition

Contributors will be recognized in:

- The project's README
- Release notes
- GitHub contributor graphs

Thank you for contributing to AliceMQ! 🎉
