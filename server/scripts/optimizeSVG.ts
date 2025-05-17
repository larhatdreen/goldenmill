import fs from 'fs';
import path from 'path';
import { optimize } from 'svgo';

const SVG_DIR = path.join(__dirname, '../../src/components');

async function optimizeSVG(filePath: string) {
  try {
    const svgContent = fs.readFileSync(filePath, 'utf8');
    const result = optimize(svgContent, {
      multipass: true,
      plugins: [
        'removeDoctype',
        'removeXMLProcInst',
        'removeComments',
        'removeMetadata',
        'removeEditorsNSData',
        'cleanupAttrs',
        'mergeStyles',
        'inlineStyles',
        'minifyStyles',
        'removeUselessDefs',
        'cleanupNumericValues',
        'cleanupListOfValues',
        'convertColors',
        'removeUnknownsAndDefaults',
        'removeNonInheritableGroupAttrs',
        'removeUselessStrokeAndFill',
        'removeViewBox',
        'cleanupEnableBackground',
        'removeHiddenElems',
        'removeEmptyText',
        'convertShapeToPath',
        'convertEllipseToCircle',
        'moveElemsAttrsToGroup',
        'moveGroupAttrsToElems',
        'collapseGroups',
        'convertPathData',
        'convertTransform',
        'removeEmptyAttrs',
        'removeEmptyContainers',
        'mergePaths',
        'removeUnusedNS',
        'sortDefsChildren',
        'removeTitle',
        'removeDesc'
      ]
    });

    // Создаем оптимизированную версию файла
    const optimizedPath = filePath.replace('.tsx', '.optimized.tsx');
    const componentName = path.basename(filePath, '.tsx');
    
    const optimizedContent = `import React from 'react';

const ${componentName}: React.FC = () => (
  ${result.data}
);

export default ${componentName};`;

    fs.writeFileSync(optimizedPath, optimizedContent);
    console.log(`Optimized ${filePath}`);
    
    // Выводим статистику оптимизации
    const originalSize = Buffer.byteLength(svgContent, 'utf8');
    const optimizedSize = Buffer.byteLength(result.data, 'utf8');
    const savings = ((originalSize - optimizedSize) / originalSize * 100).toFixed(2);
    
    console.log(`Original size: ${(originalSize / 1024 / 1024).toFixed(2)}MB`);
    console.log(`Optimized size: ${(optimizedSize / 1024 / 1024).toFixed(2)}MB`);
    console.log(`Savings: ${savings}%`);
  } catch (error) {
    console.error(`Error optimizing ${filePath}:`, error);
  }
}

async function optimizeAllSVGs() {
  const files = [
    'Granulator1.tsx',
    'Granulator2.tsx',
    'Granulator3.tsx',
    'Mixer1.tsx',
    'Mixer2.tsx',
    'Mixer3.tsx',
    'Mixer4.tsx'
  ];

  for (const file of files) {
    const filePath = path.join(SVG_DIR, file);
    if (fs.existsSync(filePath)) {
      await optimizeSVG(filePath);
    }
  }
}

optimizeAllSVGs(); 