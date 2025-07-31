# Generated Project - Product Requirements Prompt (PRP)

## Project Overview

A felhasználó instrukciója alapján űrlapot hozunk létre és elküldjök a creator app végpontjának.

## Context and Documentation

### Key Resources
- Az `docs/` mappában találunk egy formMCP.md file-t, amiben egy működő AI prompt található, ami minden információt tartalmaz, ami ahhoz kell, hogy létrehozzuk az űrlap leíró json file-ját.
- Van még egy file, a SendToCreatorAPI.md, ami pedig pontosan leírja, hogy kell elküldeni az így elkészült űrlapot a creator api végpontnak.

### Examples
Az `examples/` mappában találunk egy app-new-form.json mintát, ami egy valid űrlap leírót tartalmaz.

### Other Considerations
Készítsünk szabályrendszer, amely pontosan definiálja a folyamatot, hogy ne kelljen elvileg minden egyes alkalommal minden mintát és instrukcióhalmazt újra értelmezni.

## Implementation Plan

### Phase 1: Core Setup
1. **Project Initialization**
   - Set up basic project structure
   - Configure development environment
   - Install required dependencies

### Phase 2: Core Implementation
2. **Main Functionality**
   - A felhasználó instrukciója alapján űrlapot hozunk létre és elküldjök a creator app végpontjának.
   - Follow patterns from examples
   - Implement error handling

### Phase 3: Testing and Validation
3. **Quality Assurance**
   - Add comprehensive tests
   - Validate against requirements
   - Performance optimization

## Technical Specifications

### Requirements Analysis
A felhasználó instrukciója alapján űrlapot hozunk létre és elküldjök a creator app végpontjának.

### Implementation Details
Based on the examples and documentation provided:
Az `examples/` mappában találunk egy app-new-form.json mintát, ami egy valid űrlap leírót tartalmaz.

### Additional Considerations
Készítsünk szabályrendszer, amely pontosan definiálja a folyamatot, hogy ne kelljen elvileg minden egyes alkalommal minden mintát és instrukcióhalmazt újra értelmezni.

## Success Criteria

### Functional Requirements
- [ ] All features specified in INITIAL.md are implemented
- [ ] System follows patterns from provided examples
- [ ] Error handling is comprehensive and user-friendly
- [ ] All tests pass successfully

### Quality Requirements
- [ ] Code follows project conventions
- [ ] Documentation is complete and accurate
- [ ] Performance meets requirements
- [ ] Security best practices are followed

## Validation Gates

```bash
# Add project-specific validation commands
```

This PRP provides comprehensive context for implementing the Generated Project system following established patterns and requirements.