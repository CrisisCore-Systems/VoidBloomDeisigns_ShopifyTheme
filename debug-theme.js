/**
 * VoidBloomDesign Theme Debugger
 * Run this script to check for common issues in your theme files
 */

const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Theme directory
const THEME_DIR = process.cwd();

// Validation rules
const rules = {
  jsonFiles: [
    { path: 'config/settings_data.json', required: true },
    { path: 'config/settings_schema.json', required: true }
  ],
  noSubfolders: [
    'assets',
    'snippets',
    'sections',
    'templates',
    'layout'
  ],
  liquidTags: {
    invalid: ['stylesheet', 'script'],
    valid: ['style', 'javascript']
  }
};

// Validate JSON files
function validateJsonFiles() {
  console.log('\n🔍 Checking JSON configuration files...');
  let hasErrors = false;

  rules.jsonFiles.forEach(file => {
    const filePath = path.join(THEME_DIR, file.path);
    
    if (!fs.existsSync(filePath)) {
      if (file.required) {
        console.error(`❌ Missing required file: ${file.path}`);
        hasErrors = true;
      }
      return;
    }
    
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      JSON.parse(content);
      console.log(`✅ ${file.path} is valid JSON`);
    } catch (e) {
      console.error(`❌ Invalid JSON in ${file.path}: ${e.message}`);
      hasErrors = true;
    }
  });

  return !hasErrors;
}

// Check for subfolders
function checkSubfolders() {
  console.log('\n🔍 Checking for subfolders in theme directories...');
  let hasErrors = false;

  rules.noSubfolders.forEach(dir => {
    const dirPath = path.join(THEME_DIR, dir);
    if (!fs.existsSync(dirPath)) return;
    
    const entries = fs.readdirSync(dirPath, { withFileTypes: true });
    const subDirs = entries.filter(entry => entry.isDirectory());
    
    if (subDirs.length > 0) {
      if (dir === 'sections' && subDirs.length === 1 && subDirs[0].name === 'modules') {
        // sections/modules is allowed
        console.log(`✅ ${dir} has no invalid subfolders`);
      } else {
        console.error(`❌ ${dir} contains subfolders: ${subDirs.map(d => d.name).join(', ')}`);
        hasErrors = true;
      }
    } else {
      console.log(`✅ ${dir} has no subfolders`);
    }
  });

  return !hasErrors;
}

// Check for invalid Liquid tags
function checkLiquidTags() {
  console.log('\n🔍 Checking for invalid Liquid tags...');
  let hasErrors = false;

  // Get all Liquid files
  const liquidFiles = glob.sync('**/*.liquid', { cwd: THEME_DIR });
  
  liquidFiles.forEach(file => {
    const filePath = path.join(THEME_DIR, file);
    const content = fs.readFileSync(filePath, 'utf8');
    
    rules.liquidTags.invalid.forEach(invalidTag => {
      const regex = new RegExp(`{%\\s*${invalidTag}\\s*%}`, 'g');
      const matches = content.match(regex);
      
      if (matches && matches.length > 0) {
        console.error(`❌ File ${file} contains invalid tag: ${invalidTag}`);
        const validReplacement = rules.liquidTags.valid[rules.liquidTags.invalid.indexOf(invalidTag)];
        console.log(`   Replace with: {% ${validReplacement} %}`);
        hasErrors = true;
      }
    });
  });

  if (!hasErrors) {
    console.log('✅ No invalid Liquid tags found');
  }

  return !hasErrors;
}

// Main function
function main() {
  console.log('🔎 VoidBloomDesign Theme Validator');
  console.log('================================');
  
  const jsonValid = validateJsonFiles();
  const subfoldersValid = checkSubfolders();
  const liquidTagsValid = checkLiquidTags();
  
  console.log('\n📊 Validation Summary');
  console.log('-------------------');
  console.log(`JSON Configuration: ${jsonValid ? '✅ Valid' : '❌ Invalid'}`);
  console.log(`Directory Structure: ${subfoldersValid ? '✅ Valid' : '❌ Invalid'}`);
  console.log(`Liquid Tags: ${liquidTagsValid ? '✅ Valid' : '❌ Invalid'}`);
  
  if (jsonValid && subfoldersValid && liquidTagsValid) {
    console.log('\n✨ All checks passed! Your theme should be ready to deploy.');
  } else {
    console.log('\n⚠️ Some issues were found. Please fix them before deploying.');
    process.exit(1);
  }
}

// Run the validator
main();
