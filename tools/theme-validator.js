const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Configuration
const THEME_ROOT = path.resolve(__dirname, '../');
const ASSET_DIR = path.join(THEME_ROOT, 'assets');
const SNIPPETS_DIR = path.join(THEME_ROOT, 'snippets');
const CONFIG_DIR = path.join(THEME_ROOT, 'config');

// Validator functions
const validators = {
  validateJSONFiles() {
    const jsonFiles = [
      path.join(CONFIG_DIR, 'settings_data.json'),
      path.join(CONFIG_DIR, 'settings_schema.json')
    ];
    
    const errors = [];
    
    jsonFiles.forEach(file => {
      try {
        const content = fs.readFileSync(file, 'utf8');
        JSON.parse(content);
        console.log(`✓ JSON file valid: ${path.relative(THEME_ROOT, file)}`);
      } catch (error) {
        errors.push(`✗ Invalid JSON in ${path.relative(THEME_ROOT, file)}: ${error.message}`);
      }
    });
    
    return errors;
  },
  
  validateAssetStructure() {
    const errors = [];
    
    // Check for nested directories in assets (should be flat)
    const directories = fs.readdirSync(ASSET_DIR, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name);
    
    if (directories.length > 0) {
      errors.push(`✗ Assets directory should be flat, but contains subdirectories: ${directories.join(', ')}`);
    } else {
      console.log('✓ Assets directory structure is flat (correct)');
    }
    
    return errors;
  },
  
  validateLiquidTemplates() {
    const errors = [];
    const snippetFiles = glob.sync(path.join(SNIPPETS_DIR, '*.liquid'));
    
    const invalidPatterns = [
      { regex: /{%\s*stylesheet\s*%}/i, message: 'Invalid {% stylesheet %} tag' },
      { regex: /{%\s*javascript\s*%}/i, message: 'Invalid {% javascript %} tag' }
    ];
    
    snippetFiles.forEach(file => {
      const content = fs.readFileSync(file, 'utf8');
      const filename = path.basename(file);
      
      invalidPatterns.forEach(pattern => {
        if (pattern.regex.test(content)) {
          errors.push(`✗ ${filename}: Contains ${pattern.message}`);
        }
      });
    });
    
    if (errors.length === 0) {
      console.log('✓ All Liquid templates use valid Shopify tags');
    }
    
    return errors;
  }
};

// Run all validators
function validateTheme() {
  console.log('🔍 Validating Shopify theme...\n');
  
  const allErrors = [
    ...validators.validateJSONFiles(),
    ...validators.validateAssetStructure(),
    ...validators.validateLiquidTemplates()
  ];
  
  if (allErrors.length > 0) {
    console.log('\n❌ Validation failed with the following errors:');
    allErrors.forEach(error => console.log(error));
    process.exit(1);
  } else {
    console.log('\n✅ Theme validation passed! Ready for deployment.');
    process.exit(0);
  }
}

// Execute the validation
validateTheme();
