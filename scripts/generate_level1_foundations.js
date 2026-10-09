const page = figma.root.children.find(p => p.name === '❖ System');
await figma.setCurrentPageAsync(page);

const generatorKey = 'lighthouse.generator';
const generatorId = 'generate_level1_foundations';
const previousGenerated = page.children.filter(
  child => child.getPluginData(generatorKey) === generatorId
);

// 1. Load Fonts
await figma.loadFontAsync({ family: 'Inter', style: 'Regular' });
await figma.loadFontAsync({ family: 'Inter', style: 'Medium' });
await figma.loadFontAsync({ family: 'Inter', style: 'Semi Bold' });
await figma.loadFontAsync({ family: 'Inter', style: 'Bold' });

await figma.loadFontAsync({ family: 'Vazirmatn', style: 'Regular' });
await figma.loadFontAsync({ family: 'Vazirmatn', style: 'Medium' });
await figma.loadFontAsync({ family: 'Vazirmatn', style: 'SemiBold' });
await figma.loadFontAsync({ family: 'Vazirmatn', style: 'Bold' });

function hexToRgb(hex) {
  const num = parseInt(hex.replace('#', ''), 16);
  return {
    r: ((num >> 16) & 255) / 255,
    g: ((num >> 8) & 255) / 255,
    b: (num & 255) / 255
  };
}

// -----------------------------------------------------------------
// 2. CREATE NATIVE FIGMA TEXT STYLES (En + Fa)
// -----------------------------------------------------------------
const existingStyles = await figma.getLocalTextStylesAsync();
const styleMap = new Map();
for (const s of existingStyles) {
  styleMap.set(s.name, s);
}

function getOrCreateTextStyle(name, family, style, size, lineHeight) {
  let textStyle = styleMap.get(name);
  if (!textStyle) {
    textStyle = figma.createTextStyle();
    textStyle.name = name;
  }
  textStyle.fontName = { family, style };
  textStyle.fontSize = size;
  if (lineHeight) {
    textStyle.lineHeight = { value: lineHeight, unit: 'PIXELS' };
  }
  return textStyle;
}

getOrCreateTextStyle('EN/Display 36', 'Inter', 'Bold', 36, 44);
getOrCreateTextStyle('EN/Heading H1', 'Inter', 'Bold', 28, 36);
getOrCreateTextStyle('EN/Heading H2', 'Inter', 'Semi Bold', 22, 28);
getOrCreateTextStyle('EN/Heading H3', 'Inter', 'Semi Bold', 18, 24);
getOrCreateTextStyle('EN/Body Large', 'Inter', 'Regular', 16, 24);
getOrCreateTextStyle('EN/Body Base', 'Inter', 'Regular', 14, 20);
getOrCreateTextStyle('EN/Body Medium', 'Inter', 'Medium', 14, 20);
getOrCreateTextStyle('EN/Body Small', 'Inter', 'Regular', 12, 16);
getOrCreateTextStyle('EN/Caption Micro', 'Inter', 'Medium', 11, 14);

getOrCreateTextStyle('FA/Heading H1', 'Vazirmatn', 'Bold', 26, 36);
getOrCreateTextStyle('FA/Heading H2', 'Vazirmatn', 'SemiBold', 20, 30);
getOrCreateTextStyle('FA/Body Base', 'Vazirmatn', 'Regular', 14, 22);
getOrCreateTextStyle('FA/Body Medium', 'Vazirmatn', 'Medium', 14, 22);
getOrCreateTextStyle('FA/Body Small', 'Vazirmatn', 'Regular', 12, 18);

// -----------------------------------------------------------------
// 3. MASTER BANNER HEADER
// -----------------------------------------------------------------
const masterHeader = figma.createFrame();
masterHeader.name = '🏛️ Foundations: Level 1 Header';
masterHeader.setPluginData(generatorKey, generatorId);
masterHeader.layoutMode = 'VERTICAL';
masterHeader.itemSpacing = 8;
masterHeader.fills = [{ type: 'SOLID', color: hexToRgb('#0C1A3E') }]; // Deep ocean
masterHeader.cornerRadius = 16;
masterHeader.paddingLeft = 36;
masterHeader.paddingRight = 36;
masterHeader.paddingTop = 32;
masterHeader.paddingBottom = 32;
masterHeader.x = 40;
masterHeader.y = 40;
masterHeader.resize(1840, 140);

const hTitle = figma.createText();
hTitle.fontName = { family: 'Inter', style: 'Bold' };
hTitle.fontSize = 32;
hTitle.characters = 'Lighthouse Design System — Level 1: Foundations';
hTitle.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }];
masterHeader.appendChild(hTitle);

const hSub = figma.createText();
hSub.fontName = { family: 'Inter', style: 'Regular' };
hSub.fontSize = 15;
hSub.characters = 'Design Tokens · Bilingual Typography Scale (Inter + Vazirmatn) · Spacing & Radius Rhythm · 122 Native Variables';
hSub.fills = [{ type: 'SOLID', color: hexToRgb('#94A3B8') }];
masterHeader.appendChild(hSub);
page.appendChild(masterHeader);

// -----------------------------------------------------------------
// SECTION A: 🎨 COLOR TOKENS & SEMANTIC ROLES
// -----------------------------------------------------------------
const colorSection = figma.createSection();
colorSection.name = '🎨 Color Tokens & Semantic Roles';
colorSection.setPluginData(generatorKey, generatorId);
colorSection.x = 40;
colorSection.y = 220;
colorSection.resizeWithoutConstraints(1840, 800);

function createSwatchGroup(titleText, tokens, startX, startY, width = 420) {
  const groupFrame = figma.createFrame();
  groupFrame.name = titleText;
  groupFrame.layoutMode = 'VERTICAL';
  groupFrame.itemSpacing = 14;
  groupFrame.fills = [{ type: 'SOLID', color: { r: 0.98, g: 0.98, b: 0.99 } }];
  groupFrame.cornerRadius = 12;
  groupFrame.paddingLeft = 18;
  groupFrame.paddingRight = 18;
  groupFrame.paddingTop = 16;
  groupFrame.paddingBottom = 18;
  groupFrame.strokes = [{ type: 'SOLID', color: hexToRgb('#E2E8F0') }];
  groupFrame.strokeWeight = 1;
  groupFrame.x = startX;
  groupFrame.y = startY;
  groupFrame.resize(width, 340);

  const grpTitle = figma.createText();
  grpTitle.fontName = { family: 'Inter', style: 'Semi Bold' };
  grpTitle.fontSize = 14;
  grpTitle.characters = titleText;
  groupFrame.appendChild(grpTitle);

  const rowFrame = figma.createFrame();
  rowFrame.name = 'Swatches';
  rowFrame.layoutMode = 'HORIZONTAL';
  rowFrame.itemSpacing = 10;
  rowFrame.fills = [];
  rowFrame.resize(width - 36, 260);

  for (const token of tokens) {
    const card = figma.createFrame();
    card.name = token.name;
    card.layoutMode = 'VERTICAL';
    card.itemSpacing = 6;
    card.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }];
    card.cornerRadius = 8;
    card.paddingLeft = 8;
    card.paddingRight = 8;
    card.paddingTop = 8;
    card.paddingBottom = 10;
    card.resize(Math.floor((width - 40) / tokens.length) - 6, 240);
    card.strokes = [{ type: 'SOLID', color: hexToRgb('#E2E8F0') }];

    const swatch = figma.createRectangle();
    swatch.resize(card.width - 16, 75);
    swatch.cornerRadius = 6;
    swatch.fills = [{ type: 'SOLID', color: hexToRgb(token.hex) }];
    if (token.border) {
      swatch.strokes = [{ type: 'SOLID', color: hexToRgb(token.border) }];
      swatch.strokeWeight = 1;
    }
    card.appendChild(swatch);

    const label = figma.createText();
    label.fontName = { family: 'Inter', style: 'Semi Bold' };
    label.fontSize = 11;
    label.characters = token.name;
    card.appendChild(label);

    const hexLabel = figma.createText();
    hexLabel.fontName = { family: 'Inter', style: 'Regular' };
    hexLabel.fontSize = 10;
    hexLabel.characters = token.hex;
    hexLabel.fills = [{ type: 'SOLID', color: hexToRgb('#64748B') }];
    card.appendChild(hexLabel);

    const tokenVar = figma.createText();
    tokenVar.fontName = { family: 'Inter', style: 'Regular' };
    tokenVar.fontSize = 9;
    tokenVar.characters = token.cssVar;
    tokenVar.fills = [{ type: 'SOLID', color: hexToRgb('#2563EB') }];
    card.appendChild(tokenVar);

    rowFrame.appendChild(card);
  }
  groupFrame.appendChild(rowFrame);
  colorSection.appendChild(groupFrame);
}

// Group 1: 4 Landmark Stages
createSwatchGroup('Landmark Stages (0 — 3)', [
  { name: 'Dormant', hex: '#64748B', cssVar: '--lh-world-dormant' },
  { name: 'Restoration', hex: '#0EA5E9', cssVar: '--lh-world-restoration' },
  { name: 'Operational', hex: '#10B981', cssVar: '--lh-world-operational' },
  { name: 'Flourishing', hex: '#8B5CF6', cssVar: '--lh-world-flourishing' }
], 30, 40, 560);

// Group 2: Currency & Top Ranks
createSwatchGroup('Currency & Top Ranks', [
  { name: 'Lumen Gold', hex: '#F59E0B', cssVar: '--lh-lumen' },
  { name: 'Apprentice', hex: '#64748B', cssVar: '--lh-rank-apprentice' },
  { name: 'Beacon', hex: '#0EA5E9', cssVar: '--lh-rank-beacon' },
  { name: 'Steward', hex: '#F59E0B', cssVar: '--lh-rank-steward' }
], 610, 40, 560);

// Group 3: Assessment States
createSwatchGroup('Assessment Workflow States', [
  { name: 'Draft', hex: '#94A3B8', cssVar: '--lh-draft' },
  { name: 'Published', hex: '#10B981', cssVar: '--lh-published' },
  { name: 'Revised', hex: '#F59E0B', cssVar: '--lh-revised' },
  { name: 'Awaiting', hex: '#CBD5E1', cssVar: '--lh-awaiting' }
], 1190, 40, 560);

// Group 4: Harbor Ocean Atmospherics
createSwatchGroup('Harbor Ocean Palette', [
  { name: 'Deep Ocean', hex: '#0C1A3E', cssVar: '--lh-ocean-deep' },
  { name: 'Mid Ocean', hex: '#1E3A6E', cssVar: '--lh-ocean-mid' },
  { name: 'Light Ocean', hex: '#3B5EA6', cssVar: '--lh-ocean-light' },
  { name: 'Surface', hex: '#7BA3D4', cssVar: '--lh-ocean-surface' }
], 30, 410, 560);

// Group 5: Surface Neutrals
createSwatchGroup('Surfaces & Chrome', [
  { name: 'Base White', hex: '#FFFFFF', cssVar: '--background', border: '#E2E8F0' },
  { name: 'Subtle Slate', hex: '#F8FAFC', cssVar: '--muted', border: '#E2E8F0' },
  { name: 'Border Default', hex: '#E2E8F0', cssVar: '--border' },
  { name: 'Text Primary', hex: '#0F172A', cssVar: '--foreground' }
], 610, 410, 560);

page.appendChild(colorSection);

// -----------------------------------------------------------------
// SECTION B: 🔤 TYPOGRAPHY HIERARCHY (BILINGUAL EN + FA)
// -----------------------------------------------------------------
const typeSection = figma.createSection();
typeSection.name = '🔤 Typography Hierarchy (Inter & Vazirmatn)';
typeSection.setPluginData(generatorKey, generatorId);
typeSection.x = 40;
typeSection.y = 1060;
typeSection.resizeWithoutConstraints(1840, 560);

const typeTable = figma.createFrame();
typeTable.name = 'Typography Specimen Table';
typeTable.layoutMode = 'VERTICAL';
typeTable.itemSpacing = 0;
typeTable.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }];
typeTable.cornerRadius = 12;
typeTable.strokes = [{ type: 'SOLID', color: hexToRgb('#E2E8F0') }];
typeTable.x = 30;
typeTable.y = 40;
typeTable.resize(1760, 460);

// Header row
const th = figma.createFrame();
th.layoutMode = 'HORIZONTAL';
th.fills = [{ type: 'SOLID', color: hexToRgb('#F8FAFC') }];
th.paddingLeft = 20;
th.paddingRight = 20;
th.paddingTop = 14;
th.paddingBottom = 14;
th.resize(1760, 44);

function addThCol(text, width) {
  const c = figma.createText();
  c.fontName = { family: 'Inter', style: 'Semi Bold' };
  c.fontSize = 12;
  c.characters = text;
  c.fills = [{ type: 'SOLID', color: hexToRgb('#64748B') }];
  c.resize(width, 16);
  th.appendChild(c);
}
addThCol('STYLE NAME', 220);
addThCol('SPECS (SIZE / LINE-HEIGHT)', 220);
addThCol('ENGLISH SPECIMEN (INTER)', 540);
addThCol('PERSIAN SPECIMEN (VAZIRMATN)', 540);
addThCol('TAILWIND UTILITY', 180);
typeTable.appendChild(th);

const typeLevels = [
  { name: 'Display / 36', specs: '36px / 44px · Bold', en: 'Lighthouse Harbor World', fa: 'دنیای بندرگاه فانوس دریایی', tw: 'text-4xl font-bold', enFamily: 'Inter', enStyle: 'Bold', enSize: 28, faFamily: 'Vazirmatn', faStyle: 'Bold', faSize: 24 },
  { name: 'Heading / H1', specs: '28px / 36px · Bold', en: 'Signal Tower Operational', fa: 'برج سیگنال به مرحله عملیاتی رسید', tw: 'text-2xl font-bold', enFamily: 'Inter', enStyle: 'Bold', enSize: 22, faFamily: 'Vazirmatn', faStyle: 'Bold', faSize: 20 },
  { name: 'Heading / H2', specs: '22px / 28px · SemiBold', en: 'Active Missions & Assessments', fa: 'مأموریت‌های فعال و ارزیابی‌ها', tw: 'text-xl font-semibold', enFamily: 'Inter', enStyle: 'Semi Bold', enSize: 18, faFamily: 'Vazirmatn', faStyle: 'SemiBold', faSize: 17 },
  { name: 'Body / Base', specs: '14px / 20px · Regular', en: 'Complete assignments and accumulate Lumens.', fa: 'تکالیف را انجام دهید و لومن کسب نمایید.', tw: 'text-sm font-normal', enFamily: 'Inter', enStyle: 'Regular', enSize: 14, faFamily: 'Vazirmatn', faStyle: 'Regular', faSize: 14 },
  { name: 'Body / Small', specs: '12px / 16px · Regular', en: 'Next restoration milestone threshold: 3,000 LM', fa: 'آستانه مرحله بعدی بازسازی: ۳,۰۰۰ لومن', tw: 'text-xs font-normal', enFamily: 'Inter', enStyle: 'Regular', enSize: 12, faFamily: 'Vazirmatn', faStyle: 'Regular', faSize: 12 }
];

for (const lvl of typeLevels) {
  const tr = figma.createFrame();
  tr.layoutMode = 'HORIZONTAL';
  tr.counterAxisAlignItems = 'CENTER';
  tr.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }];
  tr.paddingLeft = 20;
  tr.paddingRight = 20;
  tr.paddingTop = 16;
  tr.paddingBottom = 16;
  tr.resize(1760, 68);
  tr.strokes = [{ type: 'SOLID', color: hexToRgb('#F1F5F9') }];
  tr.strokeWeight = 1;

  const col1 = figma.createText();
  col1.fontName = { family: 'Inter', style: 'Semi Bold' };
  col1.fontSize = 13;
  col1.characters = lvl.name;
  col1.resize(220, 20);
  tr.appendChild(col1);

  const col2 = figma.createText();
  col2.fontName = { family: 'Inter', style: 'Regular' };
  col2.fontSize = 12;
  col2.characters = lvl.specs;
  col2.fills = [{ type: 'SOLID', color: hexToRgb('#64748B') }];
  col2.resize(220, 20);
  tr.appendChild(col2);

  const col3 = figma.createText();
  col3.fontName = { family: lvl.enFamily, style: lvl.enStyle };
  col3.fontSize = lvl.enSize;
  col3.characters = lvl.en;
  col3.resize(540, 32);
  tr.appendChild(col3);

  const col4 = figma.createText();
  col4.fontName = { family: lvl.faFamily, style: lvl.faStyle };
  col4.fontSize = lvl.faSize;
  col4.characters = lvl.fa;
  col4.resize(540, 32);
  tr.appendChild(col4);

  const col5 = figma.createText();
  col5.fontName = { family: 'Inter', style: 'Regular' };
  col5.fontSize = 11;
  col5.characters = lvl.tw;
  col5.fills = [{ type: 'SOLID', color: hexToRgb('#2563EB') }];
  col5.resize(180, 20);
  tr.appendChild(col5);

  typeTable.appendChild(tr);
}

typeSection.appendChild(typeTable);
page.appendChild(typeSection);

// -----------------------------------------------------------------
// SECTION C: 📐 SPACING & CORNER RADII RHYTHM
// -----------------------------------------------------------------
const spacingSection = figma.createSection();
spacingSection.name = '📐 Spacing & Radius Rhythm';
spacingSection.setPluginData(generatorKey, generatorId);
spacingSection.x = 40;
spacingSection.y = 1660;
spacingSection.resizeWithoutConstraints(1840, 480);

// Radii Frame
const radiiBox = figma.createFrame();
radiiBox.name = 'Corner Radii Scale';
radiiBox.layoutMode = 'VERTICAL';
radiiBox.itemSpacing = 16;
radiiBox.fills = [{ type: 'SOLID', color: hexToRgb('#F8FAFC') }];
radiiBox.cornerRadius = 12;
radiiBox.paddingLeft = 24;
radiiBox.paddingRight = 24;
radiiBox.paddingTop = 20;
radiiBox.paddingBottom = 24;
radiiBox.strokes = [{ type: 'SOLID', color: hexToRgb('#E2E8F0') }];
radiiBox.x = 30;
radiiBox.y = 40;
radiiBox.resize(860, 380);

const radiiTitle = figma.createText();
radiiTitle.fontName = { family: 'Inter', style: 'Semi Bold' };
radiiTitle.fontSize = 15;
radiiTitle.characters = 'Corner Radius Tokens (borderRadius)';
radiiBox.appendChild(radiiTitle);

const radiiRow = figma.createFrame();
radiiRow.layoutMode = 'HORIZONTAL';
radiiRow.itemSpacing = 20;
radiiRow.fills = [];
radiiRow.resize(800, 260);

const radiiTokens = [
  { name: 'sm (4px)', r: 4, token: 'radius-sm' },
  { name: 'md (8px)', r: 8, token: 'radius-md' },
  { name: 'lg (12px)', r: 12, token: 'radius-lg' },
  { name: 'xl (16px)', r: 16, token: 'radius-xl' },
  { name: 'full (9999px)', r: 50, token: 'radius-full' }
];

for (const rd of radiiTokens) {
  const item = figma.createFrame();
  item.layoutMode = 'VERTICAL';
  item.itemSpacing = 10;
  item.fills = [];
  item.resize(130, 200);

  const box = figma.createFrame();
  box.resize(100, 100);
  box.cornerRadius = rd.r;
  box.fills = [{ type: 'SOLID', color: hexToRgb('#DBEAFE') }];
  box.strokes = [{ type: 'SOLID', color: hexToRgb('#3B82F6') }];
  box.strokeWeight = 2;
  item.appendChild(box);

  const l1 = figma.createText();
  l1.fontName = { family: 'Inter', style: 'Semi Bold' };
  l1.fontSize = 12;
  l1.characters = rd.name;
  item.appendChild(l1);

  const l2 = figma.createText();
  l2.fontName = { family: 'Inter', style: 'Regular' };
  l2.fontSize = 10;
  l2.characters = rd.token;
  l2.fills = [{ type: 'SOLID', color: hexToRgb('#64748B') }];
  item.appendChild(l2);

  radiiRow.appendChild(item);
}
radiiBox.appendChild(radiiRow);
spacingSection.appendChild(radiiBox);

// Spacing Frame
const spacingBox = figma.createFrame();
spacingBox.name = 'Spacing Steps';
spacingBox.layoutMode = 'VERTICAL';
spacingBox.itemSpacing = 12;
spacingBox.fills = [{ type: 'SOLID', color: hexToRgb('#F8FAFC') }];
spacingBox.cornerRadius = 12;
spacingBox.paddingLeft = 24;
spacingBox.paddingRight = 24;
spacingBox.paddingTop = 20;
spacingBox.paddingBottom = 24;
spacingBox.strokes = [{ type: 'SOLID', color: hexToRgb('#E2E8F0') }];
spacingBox.x = 920;
spacingBox.y = 40;
spacingBox.resize(870, 380);

const spacingTitle = figma.createText();
spacingTitle.fontName = { family: 'Inter', style: 'Semi Bold' };
spacingTitle.fontSize = 15;
spacingTitle.characters = 'Spacing Rhythm Tokens (spacing: 4px increments)';
spacingBox.appendChild(spacingTitle);

const spSteps = [
  { name: 'space-1 (4px)', px: 4 },
  { name: 'space-2 (8px)', px: 8 },
  { name: 'space-3 (12px)', px: 12 },
  { name: 'space-4 (16px)', px: 16 },
  { name: 'space-6 (24px)', px: 24 },
  { name: 'space-8 (32px)', px: 32 },
  { name: 'space-12 (48px)', px: 48 },
  { name: 'space-16 (64px)', px: 64 }
];

for (const sp of spSteps) {
  const row = figma.createFrame();
  row.layoutMode = 'HORIZONTAL';
  row.counterAxisAlignItems = 'CENTER';
  row.itemSpacing = 16;
  row.fills = [];
  row.resize(800, 24);

  const t = figma.createText();
  t.fontName = { family: 'Inter', style: 'Regular' };
  t.fontSize = 11;
  t.characters = sp.name;
  t.fills = [{ type: 'SOLID', color: hexToRgb('#475569') }];
  t.resize(130, 16);
  row.appendChild(t);

  const bar = figma.createRectangle();
  bar.resize(sp.px * 5, 14); // visual scale 5x
  bar.cornerRadius = 3;
  bar.fills = [{ type: 'SOLID', color: hexToRgb('#F59E0B') }]; // Lumen gold accent
  row.appendChild(bar);

  spacingBox.appendChild(row);
}
spacingSection.appendChild(spacingBox);
page.appendChild(spacingSection);

for (const child of previousGenerated) child.remove();

return {
  success: true,
  page: page.name,
  sectionsCreated: [colorSection.name, typeSection.name, spacingSection.name],
  textStylesCreated: styleMap.size
};
