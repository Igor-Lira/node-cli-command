const { parseCommands } = require('../cli-parser');

describe('parseCommands', () => {
  test('should correctly parse --filter argument', () => {
    const rawArgs = ['node', 'app.js', '--filter=ry'];
    const commands = parseCommands(rawArgs);
    expect(commands.filter).toBe('ry');
    expect(commands.count).toBe(false);
    expect(commands.unknown).toEqual([]);
  });


  test('should correctly parse --count argument', () => {
    const rawArgs = ['node', 'app.js', '--count'];
    const commands = parseCommands(rawArgs);
    expect(commands.filter).toBeNull();
    expect(commands.count).toBe(true);
    expect(commands.unknown).toEqual([]);
  });

  test('should parse multiple arguments correctly', () => {
    const rawArgs = ['node', 'app.js', '--filter=test', '--count'];
    const commands = parseCommands(rawArgs);
    expect(commands.filter).toBe('test');
    expect(commands.count).toBe(true);
    expect(commands.unknown).toEqual([]);
  });

  test('should handle unknown arguments', () => {
    const rawArgs = ['node', 'app.js', '--filter=abc', '--unknown-flag', '--count'];
    const commands = parseCommands(rawArgs);
    expect(commands.filter).toBe('abc');
    expect(commands.count).toBe(true);
    expect(commands.unknown).toEqual(['--unknown-flag']);
  });

  test('should handle --filter= with empty value', () => {
    const rawArgs = ['node', 'app.js', '--filter='];
    const commands = parseCommands(rawArgs);
    expect(commands.filter).toBeNull();
    expect(commands.unknown).toEqual(['--filter=']);
  });

  test('should return default values if no arguments provided', () => {
    const rawArgs = ['node', 'app.js'];
    const commands = parseCommands(rawArgs);
    expect(commands.filter).toBeNull();
    expect(commands.count).toBe(false);
    expect(commands.unknown).toEqual([]);
  });
});
