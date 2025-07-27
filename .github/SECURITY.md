# Security Policy

## Supported Versions

We actively support the following versions of bao-ui:

| Version | Supported          |
| ------- | ------------------ |
| 0.0.x   | :white_check_mark: |

## Reporting a Vulnerability

We take security seriously. If you discover a security vulnerability in bao-ui, please report it responsibly:

### Reporting Process

1. **DO NOT** create a public GitHub issue for security vulnerabilities
2. **Email** security reports to: [security@example.com] (replace with actual email)
3. **Include** the following information:
   - Description of the vulnerability
   - Steps to reproduce
   - Potential impact
   - Suggested fix (if available)

### Response Timeline

- **Initial Response**: Within 48 hours
- **Status Update**: Within 1 week
- **Fix Timeline**: Critical issues within 7 days, others within 30 days

## Security Best Practices

### Content Security Policy (CSP)

When using bao-ui components, configure your CSP headers:

```http
Content-Security-Policy:
  default-src 'self';
  script-src 'self' 'unsafe-inline';
  style-src 'self' 'unsafe-inline';
  img-src 'self' data: https:;
```

### XSS Prevention

bao-ui includes built-in XSS protection:

- **Tooltip content** is automatically sanitized with DOMPurify
- **Dialog content** should be escaped by your application
- **User-generated content** should always be sanitized

### Dependency Security

We maintain security through:

- **Regular audits** with `pnpm audit`
- **Snyk scanning** in CI/CD pipeline
- **Automated dependency updates**
- **Minimal dependency footprint**

### Secure Development

Our development process includes:

- **Security linting** with ESLint security rules
- **Type safety** with TypeScript strict mode
- **Access control** on all repositories
- **Signed commits** for maintainers

## Known Security Considerations

### Third-Party Dependencies

- **@mui/base**: Follows Material-UI security practices
- **DOMPurify**: Industry-standard XSS sanitization
- **Tailwind CSS**: Build-time CSS generation (no runtime risks)

### Component-Specific Notes

- **Tooltip**: HTML content is sanitized by default
- **Dialog**: Implements proper focus trapping
- **Button**: No special security considerations

## Security Tools Integration

### GitHub Security

- **Dependabot** enabled for automatic dependency updates
- **CodeQL analysis** runs on all pull requests
- **Security advisories** monitoring enabled

### CI/CD Security

```yaml
# Security scanning in GitHub Actions
- name: Run Snyk security scan
  run: pnpm snyk test --severity-threshold=high

- name: Audit dependencies
  run: pnpm audit --audit-level moderate
```

## Contact

For security-related questions or concerns:

- **Security Email**: [security@example.com]
- **General Issues**: [GitHub Issues](https://github.com/yourusername/bao-ui/issues)
- **Maintainer**: [@yourusername](https://github.com/yourusername)

---

**Thank you for helping keep bao-ui and our community safe!**
