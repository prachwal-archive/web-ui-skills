#!/usr/bin/env node
const { validateSkillTree, getSkillsSources } = require('../bin/install.js');

const { skills, warnings } = validateSkillTree(getSkillsSources());

if (warnings.length > 0) {
  console.error('Skill metadata warnings:');
  for (const w of warnings) {
    console.error(`  ⚠ ${w}`);
  }
  process.exitCode = 1;
} else {
  console.log(`✓ ${skills.length} skills, no metadata issues`);
}
