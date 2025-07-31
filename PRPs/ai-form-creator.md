# AI Form Creator - Product Requirements Prompt (PRP)

## Project Overview

Implement an AI-powered form creation system that converts natural language instructions into DynForm JSON descriptors and submits them to the Creator API. The system should provide a complete workflow from user input to deployed forms.

## Context and Documentation

### Key Resources
- **DynForm Schema Guide**: `docs/formMCP.md` - Complete specification for DynForm JSON structure
- **Creator API Integration**: `docs/SendToCreatorAPI.md` - API authentication and submission patterns
- **Example Form**: `examples/app-new-form.json` - Employee onboarding form reference
- **Project Requirements**: `INITIAL.md` - Original feature specification

### DynForm Key Concepts
- Forms consist of pages → groups → fields hierarchy
- Field names must be UPPERCASE with underscores (e.g., "VEZETEKNEV", "EMAIL_CIM")
- Connection fields use "ID_" prefix for relationships
- New forms require: `mainTable: "-generate-"` and `url: null`
- GUI section defines list view and available fields
- Localization keys follow specific patterns

### Creator API Requirements
- OAuth authentication with client credentials
- Form data submission as multipart/form-data (NOT JSON)
- Specific headers required: Authorization, Cache-Control, Referer, X-Requested-With
- Success response includes form ID and URLs for editing/viewing

## Implementation Plan

### Phase 1: Core Infrastructure
1. **Project Setup**
   - Initialize Node.js project with package.json
   - Install dependencies: axios, form-data, dotenv
   - Create .env template with Creator API credentials
   - Set up basic project structure

2. **Creator API Client**
   - Implement OAuth authentication flow
   - Create form submission client with proper headers
   - Add error handling and response parsing
   - Include retry logic for transient failures

### Phase 2: Form Generation Engine
3. **DynForm Generator**
   - Create form structure generator following `docs/formMCP.md`
   - Implement field type detection and mapping
   - Add validation for field names and schema compliance
   - Generate proper localization keys and GUI configuration

4. **Natural Language Processing**
   - Parse user instructions to extract form requirements
   - Identify field types, validations, and relationships
   - Generate appropriate form metadata (name, description, tags)
   - Handle edge cases and validation requirements

### Phase 3: Integration and Testing
5. **End-to-End Workflow**
   - Combine form generation with Creator API submission
   - Implement complete user instruction → deployed form flow
   - Add comprehensive error handling and user feedback
   - Generate form URLs for editing and viewing

6. **Validation and Testing**
   - Create test suite for form generation accuracy
   - Test Creator API integration with various form types
   - Validate generated forms against DynForm schema
   - Performance testing and optimization

## Technical Specifications

### Environment Configuration
```bash
CREATOR_URI=https://creator.gy-dev.dev.spartancode.hu
CREATOR_TOKEN_URL=https://auth.dev.spartancode.hu/auth/realms/spartan/protocol/openid-connect/token
CREATOR_AUTH_BASIC=YXBpLXNlcnZpY2UtY2xpZW50OkRwdWRqYjlrRnlaOW1sSktMV0daVTBaQ1ZPbjc5aGYw
```

### Core Components Architecture

#### 1. FormGenerator Class
```javascript
class FormGenerator {
  constructor(instructions) {
    this.instructions = instructions;
    this.formStructure = {};
  }

  parseInstructions() {
    // Extract form requirements from natural language
  }

  generateFormStructure() {
    // Create DynForm JSON following schema rules
  }

  validateSchema() {
    // Ensure compliance with DynForm requirements
  }
}
```

#### 2. CreatorAPIClient Class
```javascript
class CreatorAPIClient {
  async authenticate() {
    // OAuth client credentials flow
  }

  async submitForm(formStructure) {
    // Submit form via multipart/form-data
  }

  parseResponse(response) {
    // Extract form ID and URLs
  }
}
```

#### 3. Main Application Interface
```javascript
class AIFormCreator {
  constructor() {
    this.generator = new FormGenerator();
    this.apiClient = new CreatorAPIClient();
  }

  async createForm(userInstructions) {
    // Complete workflow: instructions → form → API → response
  }
}
```

### Field Type Mappings

Based on `docs/formMCP.md`, implement these field types:
- **text**: Basic text input with optional pattern validation
- **number**: Numeric input with min/max and decimal configuration
- **date**: Date picker with range validation
- **email**: Email validation and formatting
- **dropdownlist**: Connected to other forms via listSource
- **multiselect**: Multiple selection for N:M relationships
- **textarea**: Multi-line text with configurable rows
- **checkbox**: Boolean values

### Schema Validation Rules

Implement validation for:
- Field name format (UPPERCASE with underscores)
- Required metadata fields (formName, formCode, idSubsystem, mainTable)
- GUI configuration completeness
- Localization key format compliance
- Relationship configuration correctness

## Success Criteria

### Functional Requirements
- [ ] Generate valid DynForm JSON from natural language input
- [ ] Successfully authenticate with Creator API using OAuth
- [ ] Submit forms via multipart/form-data with correct headers
- [ ] Parse API responses and extract form URLs
- [ ] Handle authentication errors and retry logic
- [ ] Validate all generated forms against DynForm schema

### Quality Requirements
- [ ] Field names follow UPPERCASE_WITH_UNDERSCORES convention
- [ ] All required metadata fields are properly set
- [ ] GUI configuration includes all necessary field lists
- [ ] Localization keys follow correct naming patterns
- [ ] Error messages are clear and actionable
- [ ] Response includes both edit and view URLs

### Performance Requirements
- [ ] Form generation completes within 5 seconds
- [ ] API submission completes within 10 seconds
- [ ] Handles authentication token refresh automatically
- [ ] Graceful degradation on API failures

## Implementation Notes

### DynForm Schema Compliance
- Always set `mainTable: "-generate-"` for new forms
- Always set `url: null` for new forms
- Set `idSubsystem: 26` consistently
- Include empty arrays for formTables and formTablesRelations
- Generate proper localization keys using form code prefix

### Creator API Integration
- Use axios with form-data for multipart submissions
- Include all required headers exactly as specified
- Handle OAuth token expiration and refresh
- Parse "success: false" responses as normal (form created successfully)
- Extract form ID from response for URL generation

### Error Handling Patterns
- Validate user input before form generation
- Check DynForm schema compliance before API submission
- Retry authentication on token expiration
- Provide detailed error messages with resolution steps
- Log all API interactions for debugging

## Validation Gates

### Code Quality
```bash
# Syntax and style validation
npm run lint
npm run test

# Schema validation
node validate-schema.js examples/app-new-form.json
```

### Integration Testing
```bash
# Test form generation
node test-generation.js "Create a simple contact form"

# Test Creator API integration
node test-api-integration.js

# End-to-end test
node test-e2e.js "Create an employee registration form"
```

### Manual Verification
1. Generate form from sample instructions
2. Verify JSON structure matches DynForm schema
3. Submit form to Creator API successfully
4. Confirm form is accessible via generated URLs
5. Test form functionality in Creator interface

## Risk Mitigation

### Technical Risks
- **Schema Changes**: Monitor DynForm documentation for updates
- **API Changes**: Implement version checking and graceful degradation
- **Authentication Issues**: Include comprehensive error handling and retry logic
- **Rate Limiting**: Implement request throttling and backoff strategies

### Operational Risks
- **Credential Management**: Secure storage and rotation of API credentials
- **Error Monitoring**: Comprehensive logging and error tracking
- **Performance Monitoring**: Track generation and submission times
- **User Feedback**: Clear error messages and resolution guidance

This PRP provides comprehensive context for implementing the AI Form Creator system following the established patterns and requirements.