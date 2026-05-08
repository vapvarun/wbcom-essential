#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const srcBlocksDir = path.join(__dirname, '..', 'plugins', 'gutenberg', 'src', 'blocks');
const buildDir = path.join(__dirname, '..', 'build', 'blocks');
const rootDir = path.join(__dirname, '..');

console.log('🔨 Building Gutenberg V2 blocks...\n');

// Clean and create centralized build directory
if (fs.existsSync(buildDir)) {
    fs.rmSync(buildDir, { recursive: true, force: true });
}
fs.mkdirSync(buildDir, { recursive: true });
console.log('📁 Created build directory:', buildDir);

// Check if src/blocks directory exists
if (!fs.existsSync(srcBlocksDir)) {
    console.log('❌ Source blocks directory not found:', srcBlocksDir);
    process.exit(1);
}

// Get all block directories (must contain block.json + index.js)
const blockDirs = fs.readdirSync(srcBlocksDir)
    .filter(dir => {
        const fullPath = path.join(srcBlocksDir, dir);
        return fs.statSync(fullPath).isDirectory()
            && !dir.startsWith('.')
            && fs.existsSync(path.join(fullPath, 'block.json'))
            && fs.existsSync(path.join(fullPath, 'index.js'));
    });

if (blockDirs.length === 0) {
    console.log('ℹ️  No V2 blocks found to build.');
    process.exit(0);
}

console.log(`📦 Found ${blockDirs.length} V2 block(s): ${blockDirs.join(', ')}\n`);

// Build each block using wp-scripts from the root directory
let successCount = 0;
let failureCount = 0;
const failedBlocks = [];

blockDirs.forEach(blockName => {
    const blockSrcPath = path.join(srcBlocksDir, blockName);
    const blockOutputDir = path.join(buildDir, blockName);

    console.log(`🏗️  Building ${blockName}...`);

    try {
        // Use wp-scripts build with explicit src and output paths
        const wpScriptsBin = path.join(rootDir, 'node_modules', '.bin', 'wp-scripts');
        execFileSync(wpScriptsBin, [
            'build',
            `--webpack-src-dir=plugins/gutenberg/src/blocks/${blockName}`,
            `--output-path=build/blocks/${blockName}`,
            '--webpack-copy-php',
        ], {
            cwd: rootDir,
            stdio: 'pipe',
            timeout: 60000,
        });

        // Verify block.json was copied
        const builtBlockJson = path.join(blockOutputDir, 'block.json');
        if (!fs.existsSync(builtBlockJson)) {
            const srcBlockJson = path.join(blockSrcPath, 'block.json');
            fs.copyFileSync(srcBlockJson, builtBlockJson);
        }

        // Copy render.php if it exists
        const renderPhp = path.join(blockSrcPath, 'render.php');
        if (fs.existsSync(renderPhp)) {
            fs.copyFileSync(renderPhp, path.join(blockOutputDir, 'render.php'));
        }

        console.log(`   ✅ ${blockName}`);
        successCount++;
    } catch (error) {
        const stderr = error.stderr ? error.stderr.toString() : '';
        const errorLines = stderr.split('\n').filter(l => l.includes('ERROR')).slice(0, 3).join('\n   ');
        console.log(`   ❌ ${blockName}`);
        if (errorLines) console.log(`   ${errorLines}`);
        failedBlocks.push(blockName);
        failureCount++;
    }
});

console.log(`\n📊 Build Summary:`);
console.log(`   ✅ Successful: ${successCount}`);
console.log(`   ❌ Failed: ${failureCount}`);
if (failedBlocks.length > 0) {
    console.log(`   Failed blocks: ${failedBlocks.join(', ')}`);
}

if (failureCount > 0) {
    console.log('\n⚠️  Some blocks failed to build. Check errors above.');
    process.exit(1);
} else {
    console.log('\n🎉 All V2 blocks built successfully!');
    console.log(`📁 Output: ${buildDir}`);
}
