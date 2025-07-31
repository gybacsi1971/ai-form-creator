# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 🎯 Project Overview

This project implements: A felhasználó instrukciója alapján űrlapot hozunk létre és elküldjök a creator app végpontjának.

**Core Workflow**: Input Processing → Core Logic → Output Generation

## 🚀 Essential Commands

### Context Engineering Workflow
```bash
# Generate implementation blueprint
/generate-prp INITIAL.md

# Execute PRP to implement features
/execute-prp PRPs/generated-project.md
```

### Development Commands
```bash
# Development Commands
# Add project-specific commands here
```

## 🏗️ Architecture Overview

### Project Structure
```
/
├── src/                     # Source code
├── tests/                   # Test files
├── docs/                    # Documentation
├── examples/                # Usage examples
├── INITIAL.md              # Project requirements
└── README.md               # Project documentation
```

### Core Components

**Main Components:**
- Core processing logic
- Input/output handling
- Error management
- Configuration management

## 🛠️ Development Standards

### Code Organization
- **Modular design**: Features separated by responsibility
- **Clear imports**: Consistent import patterns
- **Error handling**: Comprehensive error messages
- **Testing**: Unit tests for all core functionality

### Input Validation
- Validate all user inputs
- Handle edge cases gracefully
- Provide meaningful error messages

### Documentation Standards
- Document all public APIs
- Include usage examples
- Keep documentation up to date

## 🧠 AI Assistant Behavior

### Implementation Rules
- **Follow requirements**: Implement exactly what's specified in INITIAL.md
- **Use examples**: Reference provided examples and patterns
- **Validate assumptions**: Don't guess requirements, ask for clarification
- **Test thoroughly**: Ensure all functionality works as expected

## 📖 Quick Reference

### Key Files
- **INITIAL.md**: Project requirements and specifications
- **docs/**: Additional documentation and guides
- **examples/**: Reference implementations and patterns

### Common Tasks
1. Review requirements in INITIAL.md
2. Check examples for implementation patterns
3. Follow architecture guidelines
4. Test all new functionality
