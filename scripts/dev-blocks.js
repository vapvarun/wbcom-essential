#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const blocksDir = path.join(__dirname, '..', 'plugins', 'gutenberg', 'blocks');

console.log('🚀 Starting Gutenberg blocks development mode...\n');

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
    console.log('ℹ️  No blocks found to start development for.');
    return;
}

console.log(`📦 Starting development for ${blockDirs.length} block(s): ${blockDirs.join(', ')}\n`);

// Start development servers for each block
const processes = [];
const skippedBlocks = [];

blockDirs.forEach(blockName => {
    const blockPath = path.join(blocksDir, blockName);
    const packageJsonPath = path.join(blockPath, 'package.json');

    // Check if package.json exists (skip non-Gutenberg blocks)
    if (!fs.existsSync(packageJsonPath)) {
        skippedBlocks.push(blockName);
        return;
    }

    console.log(`🏗️  Starting ${blockName} development server...`);

    try {

        // Start npm run start in the block directory
        const npmProcess = spawn('npm', ['run', 'start'], {
            cwd: blockPath,
            stdio: 'inherit',
            shell: true
        });

        processes.push({
            name: blockName,
            process: npmProcess
        });

        npmProcess.on('error', (error) => {
            console.log(`   ❌ Failed to start ${blockName}:`, error.message);
        });

        npmProcess.on('close', (code) => {
            console.log(`   ℹ️  ${blockName} development server stopped (code: ${code})`);
        });

    } catch (error) {
        console.log(`   ❌ Failed to start ${blockName}:`, error.message);
    }
});

if (skippedBlocks.length > 0) {
    console.log(`\n⏭️  Skipped ${skippedBlocks.length} non-Gutenberg block(s): ${skippedBlocks.join(', ')}`);
}

// Handle process termination
process.on('SIGINT', () => {
    console.log('\n🛑 Stopping all development servers...');

    processes.forEach(({ name, process }) => {
        console.log(`   Stopping ${name}...`);
        process.kill('SIGINT');
    });

    setTimeout(() => {
        process.exit(0);
    }, 2000);
});

console.log('\n🎉 All development servers started!');
console.log('Press Ctrl+C to stop all servers.\n');

// Keep the script running
setInterval(() => {
    // Check if any processes have exited
    processes.forEach(({ name, process }, index) => {
        if (process.killed) {
            console.log(`   ⚠️  ${name} development server has stopped.`);
            processes.splice(index, 1);
        }
    });

    if (processes.length === 0) {
        console.log('All development servers have stopped.');
        process.exit(0);
    }
}, 1000);