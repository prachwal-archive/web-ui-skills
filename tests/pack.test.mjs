import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { describe, test } from 'node:test';

const packageRoot = path.resolve(import.meta.dirname, '..');

function tmpDir() {
  return fs.mkdtempSync(path.join(os.tmpdir(), 'wus-pack-test-'));
}

function pack(cwd, dest) {
  return execFileSync('npm', ['pack', '--pack-destination', dest], { cwd, encoding: 'utf8' }).trim();
}

function installTarball(dir, tarball) {
  execFileSync('npm', ['install', tarball], { cwd: dir, encoding: 'utf8', stdio: 'pipe' });
}

describe('packed tarball', { concurrency: false }, () => {
  test('npm pack produces a valid tarball', () => {
    const tmp = tmpDir();
    try {
      const tarball = pack(packageRoot, tmp);
      assert.ok(tarball.endsWith('.tgz'), `Expected .tgz file, got: ${tarball}`);
      assert.ok(fs.existsSync(path.join(tmp, tarball)), `Tarball not found: ${tarball}`);
    } finally {
      fs.rmSync(tmp, { recursive: true, force: true });
    }
  });

  test('installed package runs --list', () => {
    const tmp = tmpDir();
    try {
      const tarball = pack(packageRoot, tmp);
      const installDir = path.join(tmp, 'test-project');
      fs.mkdirSync(installDir, { recursive: true });
      fs.writeFileSync(path.join(installDir, 'package.json'), JSON.stringify({ name: 'test-project', private: true }));

      installTarball(installDir, path.join(tmp, tarball));

      const output = execFileSync(
        path.join(installDir, 'node_modules', '.bin', 'web-ui-skills'),
        ['--list'],
        { cwd: installDir, encoding: 'utf8' },
      );
      assert.ok(output.includes('preact-ui'), `--list output should contain skills, got: ${output.slice(0, 200)}`);
    } finally {
      fs.rmSync(tmp, { recursive: true, force: true });
    }
  });

  test('installed package MCP entry resolves', () => {
    const tmp = tmpDir();
    try {
      const tarball = pack(packageRoot, tmp);
      const installDir = path.join(tmp, 'test-project');
      fs.mkdirSync(installDir, { recursive: true });
      fs.writeFileSync(path.join(installDir, 'package.json'), JSON.stringify({ name: 'test-project', private: true }));

      installTarball(installDir, path.join(tmp, tarball));

      const mcpPath = path.join(installDir, 'node_modules', 'web-ui-skills', 'bin', 'mcp.mjs');
      assert.ok(fs.existsSync(mcpPath), `MCP entry not found at ${mcpPath}`);

      execFileSync(
        'node',
        ['--eval', `import('${mcpPath.replace(/\\/g, '/')}').then(m => { console.log('ok:', typeof m.createServer); process.exit(0); }).catch(e => { console.error(e); process.exit(1); })`],
        { cwd: installDir, encoding: 'utf8', stdio: 'pipe' },
      );
    } finally {
      fs.rmSync(tmp, { recursive: true, force: true });
    }
  });
});
