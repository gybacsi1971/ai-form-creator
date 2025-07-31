# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 🎯 Project Overview

This is an **AI Form Creator** system that generates dynamic forms for the DynForm framework based on user instructions. The system converts natural language form requirements into valid DynForm JSON descriptors and submits them to the Creator API.

**Core Workflow**: User Instructions → AI Form Generation → Creator API Submission

## 🚀 Essential Commands

### Context Engineering Workflow
```bash
# Generate form implementation blueprint
/generate-prp INITIAL.md

# Execute PRP to implement AI form creator
/execute-prp PRPs/ai-form-creator.md
```

### Development Commands
```bash
# Node.js/JavaScript Projects
npm install                    # Install dependencies
npm test                      # Run tests
npm run lint                  # Lint code

# Form Generation Testing
node generate-form.js         # Test form generation
node send-to-creator.js       # Test Creator API integration
```

## 🏗️ Architecture Overview

### Project Structure
```
/
├── examples/
│   └── app-new-form.json     # Employee onboarding form example
├── docs/
│   ├── formMCP.md           # Complete DynForm generation prompt
│   └── SendToCreatorAPI.md  # Creator API integration guide
├── src/                     # Source code (to be created)
│   ├── form-generator.js    # AI form generation engine
│   ├── creator-api.js       # Creator API client
│   └── validators.js        # Form validation utilities
├── INITIAL.md              # Project requirements
└── README.md               # Project documentation
```

### Core Components

**Form Generation Engine:**
- Natural language processing for form requirements
- DynForm JSON schema generation
- Field type detection and mapping
- Validation rule creation

**Creator API Integration:**
- OAuth authentication with Basic auth
- Form data submission via multipart/form-data
- Response handling and URL extraction
- Error handling and retry logic

## 📋 Form Generation Workflow

### 1. User Input Processing
- Parse natural language form requirements
- Identify form structure (pages, groups, fields)
- Extract field types, validations, and relationships
- Determine form metadata (name, description, tags)

### 2. DynForm JSON Generation
- Apply DynForm schema rules from `docs/formMCP.md`
- Generate proper field configurations
- Create localization keys
- Set up GUI configurations
- Validate against DynForm schema

### 3. Creator API Submission
- Authenticate using OAuth client credentials
- Format data as multipart/form-data
- Submit to Creator API endpoint
- Parse response and extract form URLs

## 🛠️ Development Standards

### DynForm Schema Rules

**Form Structure:**
```javascript
const formStructure = {
  meta: {
    formName: "FORM_NAME",           // UPPERCASE
    formCode: "form_code",           // lowercase
    description: "Form description",
    idSubsystem: 26,                 // Always 26
    mainTable: "-generate-",         // Always for new forms
    url: null,                       // Always null for new forms
    tags: ["ai-generated", "form"]
  },
  data: [/* pages with groups and fields */],
  gui: {
    showInList: [],                  // Required
    availableInList: [],
    availableInDetailView: []
  },
  formTables: [],                    // Empty for new forms
  formTablesRelations: [],           // Empty for new forms
  formVerifications: [],
  isLight: false,
  localizations: {},
  localizationsToRemove: []
}
```

**Field Naming Conventions:**
- Field names: UPPERCASE with underscores (e.g., "VEZETEKNEV", "EMAIL_CIM")
- Connection fields: Always prefix with "ID_" (e.g., "ID_CUSTOMER_TYPE")
- Labels: User-friendly with proper capitalization
- Localization keys: `form-field-[field_name_lower]`

**Field Types and Properties:**
- `text`: Basic text input with optional pattern validation
- `number`: Numeric input with min/max, decimal places
- `date`: Date picker with min/max dates
- `email`: Email validation
- `dropdownlist`: Connected to other forms via listSource
- `multiselect`: Multiple selection with N:M relationships
- `textarea`: Multi-line text with row configuration
- `checkbox`: Boolean values

### Creator API Integration

**Environment Variables:**
```bash
CREATOR_URI=https://creator.gy-dev.dev.spartancode.hu
CREATOR_TOKEN_URL=https://auth.dev.spartancode.hu/auth/realms/spartan/protocol/openid-connect/token
CREATOR_AUTH_BASIC=YXBpLXNlcnZpY2UtY2xpZW50OkRwdWRqYjlrRnlaOW1sSktMV0daVTBaQ1ZPbjc5aGYw
```

**API Client Pattern:**
```javascript
class CreatorAPIClient {
  async authenticate() {
    // OAuth client credentials flow
    const response = await axios.post(process.env.CREATOR_TOKEN_URL, 
      'grant_type=client_credentials', {
        headers: {
          'Authorization': `Basic ${process.env.CREATOR_AUTH_BASIC}`,
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });
    return response.data.access_token;
  }

  async submitForm(formStructure) {
    const token = await this.authenticate();
    const formData = new FormData();
    formData.append('schema', JSON.stringify(formStructure));
    
    return await axios.post(
      `${process.env.CREATOR_URI}/api/Dynforms/post-form-designer-schema`,
      formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Cache-Control': 'no-cache, no-store, max-age=0',
          'Referer': `${process.env.CREATOR_URI}/form-designer/create`,
          'X-Requested-With': 'XMLHttpRequest',
          ...formData.getHeaders()
        }
      });
  }
}
```

## 🔒 Security & Configuration

### Environment Management
- Store all credentials in `.env` file
- Never commit secrets to repository
- Use environment-specific configurations
- Validate all required environment variables on startup

### Input Validation
- Sanitize user input before processing
- Validate form structures against DynForm schema
- Check field name conventions and restrictions
- Prevent injection attacks in field expressions

## 🎨 AI Integration Patterns

### Form Generation Prompt Engineering
- Use the complete prompt from `docs/formMCP.md`
- Include all DynForm schema rules and examples
- Provide context about field types and relationships
- Include validation and expression patterns

### Natural Language Processing
- Extract form structure from user descriptions
- Identify field requirements and types
- Detect relationships between forms
- Parse validation requirements

### Response Formatting
```javascript
// Successful form creation response
{
  success: true,
  formId: "generated_form_id",
  formName: "Generated Form Name",
  editUrl: "https://creator.../form-designer/update?mongoId=...",
  viewUrl: "https://int.../form_url/",
  meta: {
    url: "generated_form_url",
    formCode: "generated_form_code"
  }
}
```

## 🧠 AI Assistant Behavior

### Form Generation Rules
- **Always use DynForm schema**: Follow `docs/formMCP.md` exactly
- **Validate field names**: UPPERCASE with underscores only
- **Set proper metadata**: Use appropriate formName, formCode, tags
- **Include localization**: Generate proper localization keys
- **Handle relationships**: Use proper listSource configurations

### Error Handling
- **Schema validation**: Check against DynForm requirements
- **API errors**: Handle authentication and submission failures
- **User feedback**: Provide clear error messages
- **Retry logic**: Implement retry for transient failures

### Implementation Principles
- **KISS**: Keep form generation logic simple and focused
- **Validation first**: Always validate before API submission
- **Error recovery**: Handle failures gracefully with user feedback
- **Documentation**: Reference existing examples and patterns

## 📖 Quick Reference

### Adding New Field Types
1. Study field examples in `docs/formMCP.md`
2. Implement field generation logic in form-generator.js
3. Add validation rules for the new field type
4. Test with Creator API integration
5. Update documentation and examples

### Debugging Form Generation
- Validate JSON structure against DynForm schema
- Check field naming conventions
- Verify required metadata fields
- Test API submission with valid auth tokens
- Review Creator API response for errors

### Form Relationship Patterns
- **1:N relationships**: Use dropdownlist with proper listSource
- **N:M relationships**: Use multiselect with refTable: "None"
- **Master forms first**: Create referenced forms before dependent forms
- **Connection fields**: Always prefix with "ID_" and use proper types

## 🎯 Project Success Criteria

- Generate valid DynForm JSON from natural language input
- Successfully submit forms to Creator API
- Handle authentication and API errors gracefully
- Provide clear feedback with form URLs
- Follow all DynForm schema conventions
- Create reusable, maintainable code structure