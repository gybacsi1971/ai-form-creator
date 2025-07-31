# AI Form Creator

An intelligent form generation system that converts natural language instructions into dynamic forms for the DynForm framework. The system automatically generates DynForm JSON descriptors and submits them to the Creator API.

> **Transform simple text descriptions into fully functional web forms with AI assistance.**

## 🚀 Quick Start

```bash
# 1. Clone this repository
git clone https://github.com/your-org/ai-form-creator.git
cd ai-form-creator

# 2. Set up environment variables
cp .env.example .env
# Edit .env with your Creator API credentials

# 3. Install dependencies
npm install

# 4. Test the system
node examples/test-form-generation.js

# 5. Generate a form from natural language
node src/create-form.js "Create a customer registration form with name, email, phone, and company fields"
```

## 🎯 What This System Does

1. **Natural Language Processing**: Converts user instructions into structured form requirements
2. **DynForm Generation**: Creates valid DynForm JSON following all schema rules and conventions  
3. **Creator API Integration**: Automatically submits forms with proper authentication and formatting
4. **Complete Workflow**: Provides edit and view URLs for immediate form usage

## 📚 Table of Contents

- [System Architecture](#system-architecture)
- [DynForm Integration](#dynform-integration)
- [Creator API Setup](#creator-api-setup)
- [Usage Examples](#usage-examples)
- [Development Guide](#development-guide)
- [API Reference](#api-reference)
- [Troubleshooting](#troubleshooting)

## System Architecture

The AI Form Creator follows a three-stage pipeline architecture:

### 1. Natural Language Processing
- **Input**: User instructions in plain text
- **Processing**: Extract form structure, field types, and validation requirements
- **Output**: Structured form specification

### 2. DynForm Generation
- **Input**: Structured form specification
- **Processing**: Generate compliant DynForm JSON following all schema rules
- **Output**: Valid DynForm descriptor ready for submission

### 3. Creator API Integration
- **Input**: DynForm JSON descriptor
- **Processing**: OAuth authentication and multipart form submission
- **Output**: Deployed form with edit and view URLs

### Key Components Interaction

```
User Instructions → FormGenerator → CreatorAPIClient → Deployed Form
       ↓              ↓               ↓
   Text Analysis → JSON Generation → API Submission
```

## DynForm Integration

The system generates forms compatible with the DynForm framework, following strict schema requirements:

### Project Structure
```
ai-form-creator/
├── src/
│   ├── form-generator.js     # Core form generation logic
│   ├── creator-api.js        # Creator API client
│   ├── validators.js         # Schema validation utilities
│   └── main.js              # CLI interface
├── docs/
│   ├── formMCP.md           # Complete DynForm schema guide
│   └── SendToCreatorAPI.md  # API integration instructions
├── examples/
│   └── app-new-form.json    # Employee onboarding form sample
├── tests/
│   ├── form-generation.test.js
│   └── api-integration.test.js
└── .env.example             # Environment configuration template
```

### DynForm Schema Compliance

- **Field Naming**: UPPERCASE with underscores (e.g., `CUSTOMER_NAME`, `EMAIL_ADDRESS`)
- **Connection Fields**: ID prefix for relationships (e.g., `ID_CUSTOMER_TYPE`)
- **Form Metadata**: Required fields include `formName`, `formCode`, `idSubsystem`, `mainTable`
- **New Form Settings**: `mainTable: "-generate-"` and `url: null` for automatic generation

## Creator API Setup

### 1. Environment Configuration

Create a `.env` file with your Creator API credentials:

```bash
CREATOR_URI=https://creator.gy-dev.dev.spartancode.hu
CREATOR_TOKEN_URL=https://auth.dev.spartancode.hu/auth/realms/spartan/protocol/openid-connect/token
CREATOR_AUTH_BASIC=YXBpLXNlcnZpY2UtY2xpZW50OkRwdWRqYjlrRnlaOW1sSktMV0daVTBaQ1ZPbjc5aGYw
```

### 2. Authentication Flow

The system uses OAuth 2.0 client credentials flow:

1. **Token Request**: POST to token URL with Basic auth
2. **Form Submission**: POST form data with Bearer token
3. **Response Parsing**: Extract form ID and URLs

**Important**: Creator API requires multipart/form-data, not JSON!

## Usage Examples

### Basic Form Creation

```javascript
const AIFormCreator = require('./src/main');

const creator = new AIFormCreator();

// Create a simple contact form
const result = await creator.createForm(`
  Create a contact form with the following fields:
  - Full name (required text field)
  - Email address (required email field)
  - Phone number (optional text field)
  - Message (required multi-line text)
`);

console.log(`Form created successfully!`);
console.log(`Edit URL: ${result.editUrl}`);
console.log(`View URL: ${result.viewUrl}`);
```

### Advanced Form with Relationships

```javascript
// Create an employee registration form
const result = await creator.createForm(`
  Create an employee onboarding form:
  - Personal info: first name, last name, birth date
  - Contact: email, phone number
  - Employment: position, salary, start date
  - Department (dropdown connected to departments)
  - Status (dropdown: Active, Inactive, Probation)
`);
```

## Development Guide

### Setting Up the Development Environment

```bash
# Clone and install
git clone https://github.com/your-org/ai-form-creator.git
cd ai-form-creator
npm install

# Set up environment
cp .env.example .env
# Edit .env with your credentials

# Run tests
npm test

# Start development
npm run dev
```

### Implementing New Features

This project uses Context Engineering for AI-assisted development:

1. **Define Requirements**: Edit `INITIAL.md` with feature specifications
2. **Generate PRP**: Run `/generate-prp INITIAL.md` in Claude Code
3. **Execute Implementation**: Run `/execute-prp PRPs/feature-name.md`
4. **Validate**: Test generated forms and API integration

### Code Structure Guidelines

- **Modular Design**: Separate concerns (generation, validation, API)
- **Error Handling**: Comprehensive error messages and recovery
- **Schema Compliance**: Always validate against DynForm requirements
- **Testing**: Unit tests for all core functionality

## API Reference

### AIFormCreator Class

```javascript
class AIFormCreator {
  constructor(options = {}) {
    // Initialize with custom configuration
  }

  async createForm(instructions, options = {}) {
    // Generate and submit form from natural language
    // Returns: { success, formId, formName, editUrl, viewUrl, meta }
  }

  async validateForm(formStructure) {
    // Validate DynForm JSON structure
    // Returns: { valid, errors }
  }
}
```

### FormGenerator Class

```javascript
class FormGenerator {
  parseInstructions(text) {
    // Extract form requirements from natural language
  }

  generateFormStructure(requirements) {
    // Create DynForm JSON structure
  }

  validateSchema(formStructure) {
    // Ensure DynForm compliance
  }
}
```

### CreatorAPIClient Class

```javascript
class CreatorAPIClient {
  async authenticate() {
    // OAuth authentication
  }

  async submitForm(formStructure) {
    // Submit form to Creator API
  }
}
```

## Troubleshooting

### Common Issues

**Authentication Errors**
```
Error: OAuth authentication failed
```
- Verify `CREATOR_AUTH_BASIC` is correctly base64 encoded
- Check token URL is accessible
- Ensure credentials are valid

**Form Validation Errors**
```
Error: Invalid field name format
```
- Field names must be UPPERCASE with underscores
- Connection fields must start with "ID_"
- No special characters except underscores

**API Submission Errors**
```
Error: Form submission failed
```
- Ensure using multipart/form-data, not JSON
- Check all required headers are included
- Verify form structure follows DynForm schema

### Debug Mode

Enable debug logging:
```javascript
const creator = new AIFormCreator({ debug: true });
```

This will log:
- Generated form JSON structure
- API requests and responses
- Validation errors and warnings

### Field Type Mapping

| User Description | DynForm Type | Properties |
|-----------------|--------------|------------|
| "name", "title" | `text` | Basic text input |
| "email", "email address" | `email` | Email validation |
| "phone", "number" | `text` with pattern | Phone formatting |
| "age", "count", "amount" | `number` | Numeric input |
| "date", "birthday" | `date` | Date picker |
| "description", "notes" | `textarea` | Multi-line text |
| "choose", "select" | `dropdownlist` | Single selection |
| "multiple", "categories" | `multiselect` | Multiple selection |
| "agree", "confirm" | `checkbox` | Boolean value |

### Support

For issues and support:

1. **Check Documentation**: Review `docs/formMCP.md` for schema details
2. **Validate Schema**: Use online JSON validators against DynForm schema
3. **Test API**: Use tools like Postman to test Creator API directly
4. **Enable Debugging**: Use debug mode for detailed logging
5. **Check Examples**: Compare with `examples/app-new-form.json`

## Performance Optimization

### Form Generation Speed
- **Caching**: Cache frequently used field patterns
- **Parallel Processing**: Generate multiple fields concurrently
- **Schema Validation**: Pre-validate common patterns

### API Integration Efficiency
- **Token Caching**: Reuse OAuth tokens until expiration
- **Request Pooling**: Batch multiple form submissions
- **Error Recovery**: Implement exponential backoff for retries

### Memory Management
- **Stream Processing**: Handle large form definitions efficiently
- **Cleanup**: Dispose of temporary objects after generation
- **Monitoring**: Track memory usage in production

## Contributing

1. **Fork the Repository**: Create your own fork for development
2. **Create Feature Branch**: `git checkout -b feature/new-field-type`
3. **Follow Code Standards**: Use ESLint and Prettier configurations
4. **Add Tests**: Include unit tests for new functionality
5. **Update Documentation**: Add examples and API documentation
6. **Submit Pull Request**: Include detailed description of changes

### Development Workflow

```bash
# Set up development environment
npm run dev:setup

# Run tests continuously
npm run test:watch

# Validate code quality
npm run lint && npm run test

# Generate documentation
npm run docs:generate
```

## License

MIT License - see [LICENSE](LICENSE) file for details.

## Resources

- **DynForm Documentation**: Complete schema reference in `docs/formMCP.md`
- **Creator API Guide**: Integration instructions in `docs/SendToCreatorAPI.md`
- **Example Forms**: Reference implementations in `examples/`
- **Context Engineering**: This project uses AI-assisted development with comprehensive context

## Changelog

### v1.0.0
- Initial release with basic form generation
- Creator API integration
- DynForm schema compliance
- Natural language processing for form requirements

### Roadmap

- **v1.1.0**: Advanced field types (file upload, rich text)
- **v1.2.0**: Form templates and presets
- **v1.3.0**: Batch form generation
- **v2.0.0**: Visual form designer integration