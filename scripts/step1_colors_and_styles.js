const page = figma.root.children.find(p => p.name === '❖ System');
await figma.setCurrentPageAsync(page);

const generatorKey = 'lighthouse.generator';
const generatorId = 'step1_colors_and_styles';
const previousGenerated = page.children.filter(
  child => child.getPluginData(generatorKey) === generatorId
);

// Load Fonts
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

// -------------------------------------------------------------
// CREATE NATIVE FIGMA TEXT STYLES (En + Fa)
// -------------------------------------------------------------
const existingStyles = await figma.getLocalTextStylesAsync();
const styleMap = new Map();
for (const s of existingStyles) styleMap.set(s.name, s);

function createOrUpdateTextStyle(name, family, style, size, lineHeight) {
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

createOrUpdateTextStyle('EN/Display 36', 'Inter', 'Bold', 36, 44);
createOrUpdateTextStyle('EN/Heading H1', 'Inter', 'Bold', 28, 36);
createOrUpdateTextStyle('EN/Heading H2', 'Inter', 'Semi Bold', 22, 28);
createOrUpdateTextStyle('EN/Heading H3', 'Inter', 'Semi Bold', 18, 24);
createOrUpdateTextStyle('EN/Body Large', 'Inter', 'Regular', 16, 24);
createOrUpdateTextStyle('EN/Body Base', 'Inter', 'Regular', 14, 20);
createOrUpdateTextStyle('EN/Body Small', 'Inter', 'Regular', 12, 16);
createOrUpdateTextStyle('EN/Caption Micro', 'Inter', 'Medium', 11, 14);

createOrUpdateTextStyle('FA/Heading H1', 'Vazirmatn', 'Bold', 26, 36);
createOrUpdateTextStyle('FA/Heading H2', 'Vazirmatn', 'SemiBold', 20, 30);
createOrUpdateTextStyle('FA/Body Base', 'Vazirmatn', 'Regular', 14, 22);
createOrUpdateTextStyle('FA/Body Small', 'Vazirmatn', 'Regular', 12, 18);

// -------------------------------------------------------------
// MASTER BANNER HEADER
// -------------------------------------------------------------
const masterHeader = figma.createFrame();
masterHeader.name = '🏛️ Foundations: Level 1 Header';
masterHeader.setPluginData(generatorKey, generatorId);
masterHeader.layoutMode = 'VERTICAL';
masterHeader.itemSpacing = 8;
masterHeader.fills = [{ type: 'SOLID', color: hexToRgb('#0C1A3E') }];
masterHeader.cornerRadius = 16;
masterHeader.paddingLeft = 36;
masterHeader.paddingRight = 36;
masterHeader.paddingTop = 32;
masterHeader.paddingBottom = 32;
masterHeader.x = 40;
masterHeader.y = 40;
masterHeader.resize(1840, 130);

const hTitle = figma.createText();
hTitle.fontName = { family: 'Inter', style: 'Bold' };
hTitle.fontSize = 30;
hTitle.characters = 'Lighthouse Design System — Level 1: Foundations';
hTitle.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }];
masterHeader.appendChild(hTitle);

const hSub = figma.createText();
hSub.fontName = { family: 'Inter', style: 'Regular' };
hSub.fontSize = 14;
hSub.characters = 'Design Tokens · Bilingual Typography Scale (Inter + Vazirmatn) · Spacing & Radius Rhythm · 122 Native Variables';
hSub.fills = [{ type: 'SOLID', color: hexToRgb('#94A3B8') }];
masterHeader.appendChild(hSub);
page.appendChild(masterHeader);

// -------------------------------------------------------------
// SECTION 1: 🎨 COLOR TOKENS & SEMANTIC ROLES
// -------------------------------------------------------------
const colorSection = figma.createSection();
colorSection.name = '🎨 Color Tokens & Semantic Roles';
colorSection.setPluginData(generatorKey, generatorId);
colorSection.x = 40;
colorSection.y = 200;
colorSection.resizeWithoutConstraints(1840, 780);

function createSwatchGroup(titleText, tokens, startX, startY, width = 560) {
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
  groupFrame.resize(width, 330);

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
  rowFrame.resize(width - 36, 250);

  const cardW = Math.floor((width - 40) / tokens.length) - 8;

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
    card.resize(cardW, 230);
    card.strokes = [{ type: 'SOLID', color: hexToRgb('#E2E8F0') }];

    const swatch = figma.createRectangle();
    swatch.resize(cardW - 16, 75);
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
], 30, 400, 560);

// Group 5: Surface Neutrals
createSwatchGroup('Surfaces & Chrome', [
  { name: 'Base White', hex: '#FFFFFF', cssVar: '--background', border: '#E2E8F0' },
  { name: 'Subtle Slate', hex: '#F8FAFC', cssVar: '--muted', border: '#E2E8F0' },
  { name: 'Border Default', hex: '#E2E8F0', cssVar: '--border' },
  { name: 'Text Primary', hex: '#0F172A', cssVar: '--foreground' }
], 610, 400, 560);

page.appendChild(colorSection);

for (const child of previousGenerated) child.remove();

return {
  success: true,
  page: page.name,
  section: colorSection.name,
  textStylesCreated: styleMap.size
};
