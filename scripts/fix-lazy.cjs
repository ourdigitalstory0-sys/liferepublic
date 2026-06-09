const fs = require('fs');
const path = require('path');

const appTsxPath = path.resolve(__dirname, '../src/App.tsx');
let content = fs.readFileSync(appTsxPath, 'utf8');

// Replace standard default exports
// const Home = lazy(() => import('./pages/Home'));
// -> import Home from './pages/Home';
content = content.replace(/const (\w+) = lazy\(\(\) => import\('\.\/(pages\/[^']+)'\)\);/g, "import $1 from './$2';");

// Replace named exports
// const Amenities = lazy(() => import('./pages/Amenities').then(module => ({ default: module.Amenities })));
// -> import { Amenities } from './pages/Amenities';
content = content.replace(/const (\w+) = lazy\(\(\) => import\('\.\/(pages\/[^']+)'\)\.then\(module => \(\{\s*default:\s*module\.\1\s*\}\)\)\);/g, "import { $1 } from './$2';");

// Also replace admin named exports
content = content.replace(/const (\w+) = lazy\(\(\) => import\('\.\/(components\/admin\/[^']+)'\)\.then\(module => \(\{\s*default:\s*module\.\1\s*\}\)\)\);/g, "import { $1 } from './$2';");

fs.writeFileSync(appTsxPath, content);
console.log("Fixed lazy imports in App.tsx");
