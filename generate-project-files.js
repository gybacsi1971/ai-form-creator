#!/usr/bin/env node

/**
 * Automatizált projekt fájl generátor
 * Az INITIAL.md alapján generálja a projekt-specifikus fájlokat
 * 
 * Használat: node generate-project-files.js
 */

const fs = require('fs');
const path = require('path');

class ProjectFileGenerator {
  constructor() {
    this.initialPath = './INITIAL.md';
    this.outputDir = './generated';
  }

  /**
   * INITIAL.md beolvasása és elemzése
   */
  parseInitialFile() {
    if (!fs.existsSync(this.initialPath)) {
      throw new Error('INITIAL.md fájl nem található');
    }

    const content = fs.readFileSync(this.initialPath, 'utf8');
    const sections = this.extractSections(content);
    
    return {
      feature: sections.FEATURE || '',
      examples: sections.EXAMPLES || '',
      documentation: sections.DOCUMENTATION || '',
      considerations: sections['OTHER CONSIDERATIONS'] || ''
    };
  }

  /**
   * Szekciók kinyerése a markdown fájlból
   */
  extractSections(content) {
    const sections = {};
    const sectionRegex = /## ([^:]+):\s*\n(.*?)(?=\n## |$)/gs;
    let match;

    while ((match = sectionRegex.exec(content)) !== null) {
      const sectionName = match[1].trim();
      const sectionContent = match[2].trim();
      sections[sectionName] = sectionContent;
    }

    return sections;
  }

  /**
   * Projekt-specifikus CLAUDE.md generálása
   */
  generateClaudeMd(requirements) {
    const projectName = this.extractProjectName(requirements.feature);
    const technology = this.detectTechnology(requirements);
    
    return `# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 🎯 Project Overview

${this.generateProjectOverview(requirements)}

## 🚀 Essential Commands

### Context Engineering Workflow
\`\`\`bash
# Generate implementation blueprint
/generate-prp INITIAL.md

# Execute PRP to implement features
/execute-prp PRPs/${projectName.toLowerCase().replace(/\s+/g, '-')}.md
\`\`\`

### Development Commands
${this.generateDevelopmentCommands(technology)}

## 🏗️ Architecture Overview

${this.generateArchitectureSection(requirements)}

## 🛠️ Development Standards

${this.generateDevelopmentStandards(requirements)}

## 🧠 AI Assistant Behavior

### Implementation Rules
${this.generateImplementationRules(requirements)}

## 📖 Quick Reference

${this.generateQuickReference(requirements)}
`;
  }

  /**
   * PRP generálása
   */
  generatePRP(requirements) {
    const projectName = this.extractProjectName(requirements.feature);
    
    return `# ${projectName} - Product Requirements Prompt (PRP)

## Project Overview

${requirements.feature}

## Context and Documentation

### Key Resources
${this.formatDocumentationLinks(requirements.documentation)}

### Examples
${requirements.examples}

### Other Considerations
${requirements.considerations}

## Implementation Plan

${this.generateImplementationPlan(requirements)}

## Technical Specifications

${this.generateTechnicalSpecs(requirements)}

## Success Criteria

${this.generateSuccessCriteria(requirements)}

## Validation Gates

${this.generateValidationGates(requirements)}

This PRP provides comprehensive context for implementing the ${projectName} system following established patterns and requirements.`;
  }

  /**
   * README.md frissítése
   */
  generateReadme(requirements) {
    const projectName = this.extractProjectName(requirements.feature);
    
    return `# ${projectName}

${this.generateProjectDescription(requirements)}

## 🚀 Quick Start

\`\`\`bash
# 1. Clone this repository
git clone https://github.com/your-org/${projectName.toLowerCase().replace(/\s+/g, '-')}.git
cd ${projectName.toLowerCase().replace(/\s+/g, '-')}

# 2. Set up environment
${this.generateSetupInstructions(requirements)}

# 3. Install dependencies
${this.generateInstallInstructions(requirements)}

# 4. Run the application
${this.generateRunInstructions(requirements)}
\`\`\`

## 🎯 What This System Does

${this.generateFeatureList(requirements)}

## 📚 Documentation

${this.generateDocumentationSection(requirements)}

## 🛠️ Development

${this.generateDevelopmentSection(requirements)}

## 📖 API Reference

${this.generateAPIReference(requirements)}

## 🔧 Troubleshooting

${this.generateTroubleshooting(requirements)}

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.
`;
  }

  /**
   * Segéd függvények a tartalom generálásához
   */
  extractProjectName(feature) {
    // Próbáljuk kinyerni a projekt nevét a feature leírásból
    const match = feature.match(/([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)/);
    return match ? match[1] : 'Generated Project';
  }

  detectTechnology(requirements) {
    const content = JSON.stringify(requirements).toLowerCase();
    
    if (content.includes('node') || content.includes('javascript') || content.includes('npm')) {
      return 'nodejs';
    } else if (content.includes('python') || content.includes('pip')) {
      return 'python';
    } else if (content.includes('typescript')) {
      return 'typescript';
    }
    
    return 'generic';
  }

  generateProjectOverview(requirements) {
    return `This project implements: ${requirements.feature}

**Core Workflow**: ${this.inferWorkflow(requirements)}`;
  }

  generateDevelopmentCommands(technology) {
    const commands = {
      nodejs: `\`\`\`bash
# Node.js/JavaScript Projects
npm install                    # Install dependencies
npm test                      # Run tests
npm run lint                  # Lint code
npm start                     # Start application
\`\`\``,
      python: `\`\`\`bash
# Python Projects
pip install -r requirements.txt  # Install dependencies
python -m pytest tests/         # Run tests
python -m flake8                # Lint code
python main.py                  # Start application
\`\`\``,
      typescript: `\`\`\`bash
# TypeScript Projects
npm install                    # Install dependencies
npm run build                 # Build project
npm test                      # Run tests
npm start                     # Start application
\`\`\``,
      generic: `\`\`\`bash
# Development Commands
# Add project-specific commands here
\`\`\``
    };
    
    return commands[technology] || commands.generic;
  }

  generateArchitectureSection(requirements) {
    return `### Project Structure
\`\`\`
/
├── src/                     # Source code
├── tests/                   # Test files
├── docs/                    # Documentation
├── examples/                # Usage examples
├── INITIAL.md              # Project requirements
└── README.md               # Project documentation
\`\`\`

### Core Components

${this.inferComponents(requirements)}`;
  }

  generateDevelopmentStandards(requirements) {
    return `### Code Organization
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
- Keep documentation up to date`;
  }

  generateImplementationRules(requirements) {
    return `- **Follow requirements**: Implement exactly what's specified in INITIAL.md
- **Use examples**: Reference provided examples and patterns
- **Validate assumptions**: Don't guess requirements, ask for clarification
- **Test thoroughly**: Ensure all functionality works as expected`;
  }

  generateQuickReference(requirements) {
    return `### Key Files
- **INITIAL.md**: Project requirements and specifications
- **docs/**: Additional documentation and guides
- **examples/**: Reference implementations and patterns

### Common Tasks
1. Review requirements in INITIAL.md
2. Check examples for implementation patterns
3. Follow architecture guidelines
4. Test all new functionality`;
  }

  generateImplementationPlan(requirements) {
    return `### Phase 1: Core Setup
1. **Project Initialization**
   - Set up basic project structure
   - Configure development environment
   - Install required dependencies

### Phase 2: Core Implementation
2. **Main Functionality**
   - ${requirements.feature}
   - Follow patterns from examples
   - Implement error handling

### Phase 3: Testing and Validation
3. **Quality Assurance**
   - Add comprehensive tests
   - Validate against requirements
   - Performance optimization`;
  }

  generateTechnicalSpecs(requirements) {
    return `### Requirements Analysis
${requirements.feature}

### Implementation Details
Based on the examples and documentation provided:
${requirements.examples}

### Additional Considerations
${requirements.considerations}`;
  }

  generateSuccessCriteria(requirements) {
    return `### Functional Requirements
- [ ] All features specified in INITIAL.md are implemented
- [ ] System follows patterns from provided examples
- [ ] Error handling is comprehensive and user-friendly
- [ ] All tests pass successfully

### Quality Requirements
- [ ] Code follows project conventions
- [ ] Documentation is complete and accurate
- [ ] Performance meets requirements
- [ ] Security best practices are followed`;
  }

  generateValidationGates(requirements) {
    const technology = this.detectTechnology(requirements);
    
    const gates = {
      nodejs: `\`\`\`bash
# Code quality
npm run lint && npm test

# Integration tests
npm run test:integration
\`\`\``,
      python: `\`\`\`bash
# Code quality
python -m flake8 && python -m pytest

# Type checking
python -m mypy .
\`\`\``,
      generic: `\`\`\`bash
# Add project-specific validation commands
\`\`\``
    };
    
    return gates[technology] || gates.generic;
  }

  // További segéd függvények a README generálásához
  generateProjectDescription(requirements) {
    return requirements.feature;
  }

  generateSetupInstructions(requirements) {
    const tech = this.detectTechnology(requirements);
    
    if (tech === 'nodejs' || tech === 'typescript') {
      return '# Set up environment variables if needed';
    } else if (tech === 'python') {
      return 'python -m venv venv && source venv/bin/activate';
    }
    
    return '# Set up project environment';
  }

  generateInstallInstructions(requirements) {
    const tech = this.detectTechnology(requirements);
    
    if (tech === 'nodejs' || tech === 'typescript') {
      return 'npm install';
    } else if (tech === 'python') {
      return 'pip install -r requirements.txt';
    }
    
    return '# Install dependencies';
  }

  generateRunInstructions(requirements) {
    const tech = this.detectTechnology(requirements);
    
    if (tech === 'nodejs' || tech === 'typescript') {
      return 'npm start';
    } else if (tech === 'python') {
      return 'python main.py';
    }
    
    return '# Run the application';
  }

  generateFeatureList(requirements) {
    return `1. **Core Functionality**: ${requirements.feature}
2. **Error Handling**: Comprehensive error management
3. **Documentation**: Complete usage guides and examples
4. **Testing**: Automated test suite`;
  }

  generateDocumentationSection(requirements) {
    return `### Available Documentation
${requirements.documentation}

### Examples
${requirements.examples}`;
  }

  generateDevelopmentSection(requirements) {
    return `### Setting Up Development Environment
Follow the Quick Start guide above.

### Adding New Features
1. Define requirements
2. Implement functionality
3. Add tests
4. Update documentation`;
  }

  generateAPIReference(requirements) {
    return `### Core APIs
Documentation for main system components will be added here.

### Usage Examples
See the examples/ directory for detailed usage patterns.`;
  }

  generateTroubleshooting(requirements) {
    return `### Common Issues
1. **Setup Problems**: Ensure all dependencies are installed
2. **Runtime Errors**: Check configuration and environment
3. **Performance Issues**: Review implementation guidelines

### Getting Help
1. Check documentation in docs/
2. Review examples in examples/
3. Consult INITIAL.md for requirements`;
  }

  // Segéd függvények a tartalom következtetéséhez
  inferWorkflow(requirements) {
    // Próbáljuk meg következtetni a workflow-t a leírásból
    return 'Input Processing → Core Logic → Output Generation';
  }

  inferComponents(requirements) {
    return `**Main Components:**
- Core processing logic
- Input/output handling
- Error management
- Configuration management`;
  }

  formatDocumentationLinks(documentation) {
    return documentation.split('\n').map(line => 
      line.trim() ? `- ${line.trim()}` : ''
    ).filter(line => line).join('\n');
  }

  /**
   * Fájlok generálása és mentése
   */
  async generateFiles() {
    try {
      console.log('📖 INITIAL.md beolvasása...');
      const requirements = this.parseInitialFile();

      // Output könyvtár létrehozása
      if (!fs.existsSync(this.outputDir)) {
        fs.mkdirSync(this.outputDir, { recursive: true });
      }

      console.log('📝 CLAUDE.md generálása...');
      const claudeMd = this.generateClaudeMd(requirements);
      fs.writeFileSync(path.join(this.outputDir, 'CLAUDE.md'), claudeMd);

      console.log('📋 PRP generálása...');
      const prp = this.generatePRP(requirements);
      const projectName = this.extractProjectName(requirements.feature);
      const prpFileName = `${projectName.toLowerCase().replace(/\s+/g, '-')}.md`;
      
      // PRPs könyvtár létrehozása
      const prpsDir = path.join(this.outputDir, 'PRPs');
      if (!fs.existsSync(prpsDir)) {
        fs.mkdirSync(prpsDir, { recursive: true });
      }
      fs.writeFileSync(path.join(prpsDir, prpFileName), prp);

      console.log('📚 README.md generálása...');
      const readme = this.generateReadme(requirements);
      fs.writeFileSync(path.join(this.outputDir, 'README.md'), readme);

      console.log('✅ Fájlok sikeresen generálva a generated/ könyvtárba:');
      console.log(`   - CLAUDE.md`);
      console.log(`   - PRPs/${prpFileName}`);
      console.log(`   - README.md`);
      
      console.log('\n🎯 Következő lépések:');
      console.log('1. Ellenőrizd a generált fájlokat');
      console.log('2. Szükség esetén testre szabd őket');
      console.log('3. Futtasd: /generate-prp INITIAL.md');
      console.log('4. Majd: /execute-prp PRPs/' + prpFileName);

    } catch (error) {
      console.error('❌ Hiba a fájlok generálása során:', error.message);
      process.exit(1);
    }
  }
}

// Futtasd a generátort, ha közvetlenül meghívják
if (require.main === module) {
  const generator = new ProjectFileGenerator();
  generator.generateFiles();
}

module.exports = ProjectFileGenerator;