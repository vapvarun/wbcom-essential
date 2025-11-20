#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const blocksDir = path.join(__dirname, '..', 'plugins', 'gutenberg', 'blocks');
const buildDir = path.join(__dirname, '..', 'build', 'blocks');

console.log('🔨 Building Gutenberg blocks...\n');

// Clean and create centralized build directory
if (fs.existsSync(buildDir)) {
    fs.rmSync(buildDir, { recursive: true, force: true });
}
fs.mkdirSync(buildDir, { recursive: true });
console.log('📁 Created centralized build directory:', buildDir);

// Check if blocks directory exists
if (!fs.existsSync(blocksDir)) {
    console.log('❌ Blocks directory not found:', blocksDir);
    process.exit(1);
}

// Get all block directories
const blockDirs = fs.readdirSync(blocksDir)
    .filter(dir => {
        const fullPath = path.join(blocksDir, dir);
        return fs.statSync(fullPath).isDirectory() && !dir.startsWith('.');
    });

if (blockDirs.length === 0) {
    console.log('ℹ️  No blocks found to build.');
    return;
}

console.log(`📦 Found ${blockDirs.length} block(s): ${blockDirs.join(', ')}\n`);

// Build each block
let successCount = 0;
let failureCount = 0;

blockDirs.forEach(blockName => {
    const blockPath = path.join(blocksDir, blockName);
    const packageJsonPath = path.join(blockPath, 'package.json');
    const blockBuildDir = path.join(blockPath, 'build');
    const centralizedBlockBuildDir = path.join(buildDir, blockName);

    console.log(`🏗️  Building ${blockName}...`);

    try {
        // Check if package.json exists
        if (!fs.existsSync(packageJsonPath)) {
            console.log(`   ❌ package.json not found for ${blockName}`);
            failureCount++;
            return;
        }

        // Change to block directory and run npm run build (dependencies managed at root)
        process.chdir(blockPath);
        execSync('npm run build', { stdio: 'inherit' });

        // Copy built files to centralized build directory
        if (fs.existsSync(blockBuildDir)) {
            // Create block-specific directory in centralized build
            if (!fs.existsSync(centralizedBlockBuildDir)) {
                fs.mkdirSync(centralizedBlockBuildDir, { recursive: true });
            }

            // Copy all files from block build directory to centralized location
            const files = fs.readdirSync(blockBuildDir);
            files.forEach(file => {
                const srcPath = path.join(blockBuildDir, file);
                const destPath = path.join(centralizedBlockBuildDir, file);
                fs.copyFileSync(srcPath, destPath);
            });

            console.log(`   📋 Copied build files to centralized location`);

            // Clean up individual block build directory
            fs.rmSync(blockBuildDir, { recursive: true, force: true });
            console.log(`   🧹 Cleaned up individual build directory`);
        }

        console.log(`   ✅ ${blockName} built successfully`);
        successCount++;

    } catch (error) {
        console.log(`   ❌ Failed to build ${blockName}:`, error.message);
        failureCount++;
    }

    // Change back to root directory
    process.chdir(path.join(__dirname, '..'));
});

console.log(`\n📊 Build Summary:`);
console.log(`   ✅ Successful: ${successCount}`);
console.log(`   ❌ Failed: ${failureCount}`);

if (failureCount > 0) {
    console.log('\n❌ Some blocks failed to build. Please check the errors above.');
    process.exit(1);
} else {
    console.log('\n🎉 All blocks built successfully!');
    console.log(`📁 Build files are available in: ${buildDir}`);
}