/**
 * Auto-categorizes a code snippet based on its content
 * Analyzes the code to identify common patterns and assigns appropriate tags
 * 
 * @param code The code snippet to analyze
 * @param programmingLanguage The programming language of the snippet
 * @returns An array of automatically generated tags
 */
export const categorizeSnippet = (code: string, programmingLanguage: string): string[] => {
  const tags: string[] = [];
  
  const lowerCode = code.toLowerCase();
  
  // Common patterns across languages
  if (
    lowerCode.includes('for ') || 
    lowerCode.includes('while ') || 
    lowerCode.includes('foreach') ||
    lowerCode.match(/for\s*\(/)
  ) {
    tags.push('loop');
  }

  if (lowerCode.includes('switch') || lowerCode.includes('case')) {
    tags.push('conditional');
  }
  
  if (
    lowerCode.includes('try') && 
    lowerCode.includes('catch')
  ) {
    tags.push('error-handling');
  }
  
  if (
    lowerCode.includes('function ') || 
    lowerCode.includes('def ') || 
    lowerCode.includes('fun ') ||
    lowerCode.match(/\w+\s*\([^)]*\)\s*{/) ||
    lowerCode.match(/\w+\s*=\s*\([^)]*\)\s*=>/)
  ) {
    tags.push('function');
  }

  if (lowerCode.includes('class ')) {
    tags.push('oop');
  }

  // API/Network related patterns
  if (
    lowerCode.includes('fetch(') || 
    lowerCode.includes('axios.') || 
    lowerCode.includes('http.') ||
    lowerCode.includes('request(') || 
    lowerCode.includes('xmlhttprequest') ||
    lowerCode.includes('ajax') ||
    lowerCode.includes('requests.') ||
    lowerCode.includes('curl ')
  ) {
    tags.push('api');
    tags.push('network');
  }
  
  // Debugging patterns
  if (
    lowerCode.includes('console.log') ||
    lowerCode.includes('print(') ||
    lowerCode.includes('system.out.print') ||
    lowerCode.includes('debug') ||
    lowerCode.includes('fmt.println') ||
    lowerCode.includes('echo ')
  ) {
    tags.push('debugging');
  }
  
  // Data structure patterns
  if (
    lowerCode.includes('array') ||
    lowerCode.includes('list') ||
    lowerCode.includes('[') && lowerCode.includes(']') ||
    lowerCode.match(/\[\s*\d/)
  ) {
    tags.push('arrays');
  }
  
  if (
    lowerCode.includes('map') ||
    lowerCode.includes('hashmap') ||
    lowerCode.includes('dictionary') ||
    (lowerCode.includes('{') && lowerCode.includes('}') && lowerCode.includes(':'))
  ) {
    tags.push('objects');
  }

  // Language-specific patterns
  switch (programmingLanguage.toLowerCase()) {
    case 'javascript':
    case 'typescript':
      if (lowerCode.includes('.map(') || lowerCode.includes('.filter(') || lowerCode.includes('.reduce(') || lowerCode.includes('.foreach(')) {
        tags.push('array-methods');
      }
      if (lowerCode.includes('async') && lowerCode.includes('await')) {
        tags.push('async');
      }
      if (lowerCode.includes('promise')) {
        tags.push('promise');
      }
      if (lowerCode.includes('component') || lowerCode.includes('props') || lowerCode.includes('usestate') || lowerCode.includes('useeffect')) {
        tags.push('react');
      }
      break;

    case 'python':
      if (lowerCode.includes('pandas') || lowerCode.includes('matplotlib') || lowerCode.includes('numpy')) {
        tags.push('data-science');
      }
      if (lowerCode.includes('self.') && lowerCode.includes('__init__')) {
        tags.push('oop');
      }
      break;

    case 'java':
    case 'csharp':
    case 'cpp':
      if (lowerCode.includes('public static void main') || lowerCode.includes('namespace') || lowerCode.includes('#include')) {
        tags.push('entry-point');
      }
      break;

    case 'go':
      if (lowerCode.includes('package main') && lowerCode.includes('func main')) {
        tags.push('entry-point');
      }
      break;

    case 'rust':
      if (lowerCode.includes('fn main')) {
        tags.push('entry-point');
      }
      break;

    case 'php':
      if (lowerCode.includes('<?php') || lowerCode.includes('echo ')) {
        tags.push('web-dev');
      }
      break;

    case 'ruby':
      if (lowerCode.includes('def ') && lowerCode.includes('end')) {
        tags.push('scripting');
      }
      break;

    case 'swift':
      if (lowerCode.includes('import swiftui') || lowerCode.includes('func ')) {
        tags.push('ios');
      }
      break;

    case 'kotlin':
      if (lowerCode.includes('fun ') || lowerCode.includes('val ') || lowerCode.includes('var ')) {
        tags.push('android');
      }
      break;

    case 'html':
      if (lowerCode.includes('<html') || lowerCode.includes('<div') || lowerCode.includes('<span')) {
        tags.push('markup');
        tags.push('web-dev');
      }
      break;

    case 'css':
      if (lowerCode.includes('color:') || lowerCode.includes('font-size:') || lowerCode.includes('margin:')) {
        tags.push('styling');
      }
      break;

    case 'sql':
      if (lowerCode.includes('select') || lowerCode.includes('insert') || lowerCode.includes('update') || lowerCode.includes('delete')) {
        tags.push('database');
      }
      break;

    case 'bash':
    case 'powershell':
      if (lowerCode.includes('echo ') || lowerCode.includes('if ') || lowerCode.includes('fi')) {
        tags.push('scripting');
      }
      if (lowerCode.includes('curl ') || lowerCode.includes('wget ')) {
        tags.push('network');
      }
      break;

    case 'other':
      tags.push('general');
      break;
  }

  // Remove duplicate tags and return
  return [...new Set(tags)];
};
