const page = figma.root.children.find(p => p.name === '❖ System');
await figma.setCurrentPageAsync(page);

const generatorKey = 'lighthouse.generator';
const generatorId = 'build_system_canvas';
const previousGenerated = page.children.filter(
  child => child.getPluginData(generatorKey) === generatorId
);

// Load required fonts
await figma.loadFontAsync({ family: 'Inter', style: 'Regular' });
await figma.loadFontAsync({ family: 'Inter', style: 'Medium' });
await figma.loadFontAsync({ family: 'Inter', style: 'Semi Bold' });
await figma.loadFontAsync({ family: 'Inter', style: 'Bold' });

function hexToRgb(hex) {
  const num = parseInt(hex.replace('#', ''), 16);
  return {
    r: ((num >> 16) & 255) / 255,
    g: ((num >> 8) & 255) / 255,
    b: (num & 255) / 255
  };
}

// -------------------------------------------------------------
// SECTION 1: DESIGN TOKENS & PALETTES
// -------------------------------------------------------------
const tokenSection = figma.createSection();
tokenSection.name = '🎨 Design Tokens & Palette';
tokenSection.setPluginData(generatorKey, generatorId);
tokenSection.x = 0;
tokenSection.y = 0;
tokenSection.resizeWithoutConstraints(1340, 960);

// Header
const header = figma.createFrame();
header.name = 'Header';
header.layoutMode = 'VERTICAL';
header.itemSpacing = 6;
header.fills = [];
header.x = 40;
header.y = 40;
header.resize(1260, 70);

const title = figma.createText();
title.fontName = { family: 'Inter', style: 'Bold' };
title.fontSize = 26;
title.characters = 'Lighthouse Design System — Visual Tokens';
header.appendChild(title);

const subtitle = figma.createText();
subtitle.fontName = { family: 'Inter', style: 'Regular' };
subtitle.fontSize = 13;
subtitle.characters = 'Tailwind CSS v4 @theme inline bindings · Persian Primary (RTL) · Harbor Progression System';
subtitle.fills = [{ type: 'SOLID', color: { r: 0.4, g: 0.45, b: 0.55 } }];
header.appendChild(subtitle);
tokenSection.appendChild(header);

function createGroup(titleText, tokens, startX, startY, width = 600) {
  const groupFrame = figma.createFrame();
  groupFrame.name = titleText;
  groupFrame.layoutMode = 'VERTICAL';
  groupFrame.itemSpacing = 14;
  groupFrame.fills = [{ type: 'SOLID', color: { r: 0.97, g: 0.98, b: 0.99 } }];
  groupFrame.cornerRadius = 12;
  groupFrame.paddingLeft = 20;
  groupFrame.paddingRight = 20;
  groupFrame.paddingTop = 18;
  groupFrame.paddingBottom = 20;
  groupFrame.x = startX;
  groupFrame.y = startY;
  groupFrame.resize(width, 350);

  const grpTitle = figma.createText();
  grpTitle.fontName = { family: 'Inter', style: 'Semi Bold' };
  grpTitle.fontSize = 15;
  grpTitle.characters = titleText;
  groupFrame.appendChild(grpTitle);

  const rowFrame = figma.createFrame();
  rowFrame.name = 'Swatches';
  rowFrame.layoutMode = 'HORIZONTAL';
  rowFrame.itemSpacing = 12;
  rowFrame.fills = [];
  rowFrame.resize(width - 40, 270);

  for (const token of tokens) {
    const card = figma.createFrame();
    card.name = token.name;
    card.layoutMode = 'VERTICAL';
    card.itemSpacing = 6;
    card.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }];
    card.cornerRadius = 8;
    card.paddingLeft = 10;
    card.paddingRight = 10;
    card.paddingTop = 10;
    card.paddingBottom = 12;
    card.resize(122, 240);
    card.strokes = [{ type: 'SOLID', color: { r: 0.9, g: 0.92, b: 0.95 } }];

    const swatch = figma.createRectangle();
    swatch.resize(102, 75);
    swatch.cornerRadius = 6;
    swatch.fills = [{ type: 'SOLID', color: hexToRgb(token.hex) }];
    card.appendChild(swatch);

    const label = figma.createText();
    label.fontName = { family: 'Inter', style: 'Semi Bold' };
    label.fontSize = 12;
    label.characters = token.name;
    card.appendChild(label);

    const hexLabel = figma.createText();
    hexLabel.fontName = { family: 'Inter', style: 'Regular' };
    hexLabel.fontSize = 11;
    hexLabel.characters = token.hex;
    hexLabel.fills = [{ type: 'SOLID', color: { r: 0.45, g: 0.5, b: 0.58 } }];
    card.appendChild(hexLabel);

    const tokenVar = figma.createText();
    tokenVar.fontName = { family: 'Inter', style: 'Regular' };
    tokenVar.fontSize = 9;
    tokenVar.characters = token.cssVar;
    tokenVar.fills = [{ type: 'SOLID', color: { r: 0.15, g: 0.4, b: 0.85 } }];
    card.appendChild(tokenVar);

    rowFrame.appendChild(card);
  }
  groupFrame.appendChild(rowFrame);
  tokenSection.appendChild(groupFrame);
}

// 1. Landmark Stages
createGroup('Landmark Stages (0 — 3)', [
  { name: 'Dormant', hex: '#64748B', cssVar: '--lh-world-dormant' },
  { name: 'Restoration', hex: '#0EA5E9', cssVar: '--lh-world-restoration' },
  { name: 'Operational', hex: '#10B981', cssVar: '--lh-world-operational' },
  { name: 'Flourishing', hex: '#8B5CF6', cssVar: '--lh-world-flourishing' }
], 40, 140);

// 2. Progression & Currency
createGroup('Currency & Top Ranks', [
  { name: 'Lumen Gold', hex: '#F59E0B', cssVar: '--lh-lumen' },
  { name: 'Apprentice', hex: '#64748B', cssVar: '--lh-rank-apprentice' },
  { name: 'Beacon', hex: '#0EA5E9', cssVar: '--lh-rank-beacon' },
  { name: 'Steward', hex: '#F59E0B', cssVar: '--lh-rank-steward' }
], 680, 140);

// 3. Assessment Workflow States
createGroup('Assessment States', [
  { name: 'Draft', hex: '#94A3B8', cssVar: '--lh-draft' },
  { name: 'Published', hex: '#10B981', cssVar: '--lh-published' },
  { name: 'Revised', hex: '#F59E0B', cssVar: '--lh-revised' },
  { name: 'Awaiting', hex: '#CBD5E1', cssVar: '--lh-awaiting' }
], 40, 530);

// 4. Ocean Atmospheric Palette
createGroup('Harbor Ocean Palette', [
  { name: 'Deep Ocean', hex: '#0C1A3E', cssVar: '--lh-ocean-deep' },
  { name: 'Mid Ocean', hex: '#1E3A6E', cssVar: '--lh-ocean-mid' },
  { name: 'Light Ocean', hex: '#3B5EA6', cssVar: '--lh-ocean-light' },
  { name: 'Surface', hex: '#7BA3D4', cssVar: '--lh-ocean-surface' }
], 680, 530);

// -------------------------------------------------------------
// SECTION 2: CORE DOMAIN COMPONENTS
// -------------------------------------------------------------
const compSection = figma.createSection();
compSection.name = '🧩 Domain Components';
compSection.setPluginData(generatorKey, generatorId);
compSection.x = 1400;
compSection.y = 0;
compSection.resizeWithoutConstraints(1340, 960);

const compHeader = figma.createFrame();
compHeader.name = 'Component Header';
compHeader.layoutMode = 'VERTICAL';
compHeader.itemSpacing = 6;
compHeader.fills = [];
compHeader.x = 40;
compHeader.y = 40;
compHeader.resize(1260, 70);

const compTitle = figma.createText();
compTitle.fontName = { family: 'Inter', style: 'Bold' };
compTitle.fontSize = 26;
compTitle.characters = 'Core Domain Components';
compHeader.appendChild(compTitle);

const compSubtitle = figma.createText();
compSubtitle.fontName = { family: 'Inter', style: 'Regular' };
compSubtitle.fontSize = 13;
compSubtitle.characters = 'packages/ui counterparts · 1:1 API compatibility with React code';
compSubtitle.fills = [{ type: 'SOLID', color: { r: 0.4, g: 0.45, b: 0.55 } }];
compHeader.appendChild(compSubtitle);
compSection.appendChild(compHeader);

// Helper to create badges
function createBadge(labelEn, labelFa, fgHex, bgHex, x, y) {
  const badge = figma.createFrame();
  badge.name = `Badge / ${labelEn}`;
  badge.layoutMode = 'HORIZONTAL';
  badge.counterAxisAlignItems = 'CENTER';
  badge.itemSpacing = 8;
  badge.paddingLeft = 14;
  badge.paddingRight = 14;
  badge.paddingTop = 6;
  badge.paddingBottom = 6;
  badge.cornerRadius = 9999;
  badge.fills = [{ type: 'SOLID', color: hexToRgb(bgHex) }];
  badge.strokes = [{ type: 'SOLID', color: hexToRgb(fgHex) }];
  badge.strokeWeight = 1;
  badge.x = x;
  badge.y = y;

  // Dot indicator
  const dot = figma.createEllipse();
  dot.resize(7, 7);
  dot.fills = [{ type: 'SOLID', color: hexToRgb(fgHex) }];
  badge.appendChild(dot);

  const textEn = figma.createText();
  textEn.fontName = { family: 'Inter', style: 'Semi Bold' };
  textEn.fontSize = 12;
  textEn.characters = labelEn;
  textEn.fills = [{ type: 'SOLID', color: hexToRgb(fgHex) }];
  badge.appendChild(textEn);

  const divider = figma.createText();
  divider.fontName = { family: 'Inter', style: 'Regular' };
  divider.fontSize = 12;
  divider.characters = '·';
  divider.fills = [{ type: 'SOLID', color: hexToRgb(fgHex) }];
  badge.appendChild(divider);

  const textFa = figma.createText();
  textFa.fontName = { family: 'Inter', style: 'Medium' };
  textFa.fontSize = 12;
  textFa.characters = labelFa;
  textFa.fills = [{ type: 'SOLID', color: hexToRgb(fgHex) }];
  badge.appendChild(textFa);

  return badge;
}

// 1. LandmarkStageBadge Container
const badgeContainer = figma.createFrame();
badgeContainer.name = 'LandmarkStageBadge Set';
badgeContainer.layoutMode = 'VERTICAL';
badgeContainer.itemSpacing = 16;
badgeContainer.paddingLeft = 24;
badgeContainer.paddingRight = 24;
badgeContainer.paddingTop = 20;
badgeContainer.paddingBottom = 20;
badgeContainer.cornerRadius = 12;
badgeContainer.fills = [{ type: 'SOLID', color: { r: 0.98, g: 0.98, b: 0.99 } }];
badgeContainer.x = 40;
badgeContainer.y = 140;
badgeContainer.resize(480, 280);

const badgeTitle = figma.createText();
badgeTitle.fontName = { family: 'Inter', style: 'Semi Bold' };
badgeTitle.fontSize = 16;
badgeTitle.characters = 'LandmarkStageBadge (Stage 0–3)';
badgeContainer.appendChild(badgeTitle);

badgeContainer.appendChild(createBadge('Dormant', 'خاموش', '#64748B', '#F1F5F9', 0, 0));
badgeContainer.appendChild(createBadge('Restoration', 'در حال بازسازی', '#0EA5E9', '#E0F2FE', 0, 0));
badgeContainer.appendChild(createBadge('Operational', 'عملیاتی', '#10B981', '#ECFDF5', 0, 0));
badgeContainer.appendChild(createBadge('Flourishing', 'شکوفا', '#8B5CF6', '#F5F3FF', 0, 0));

compSection.appendChild(badgeContainer);

// 2. LumenBar Component
const lumenCard = figma.createFrame();
lumenCard.name = 'LumenBar Component';
lumenCard.layoutMode = 'VERTICAL';
lumenCard.itemSpacing = 14;
lumenCard.paddingLeft = 24;
lumenCard.paddingRight = 24;
lumenCard.paddingTop = 20;
lumenCard.paddingBottom = 24;
lumenCard.cornerRadius = 12;
lumenCard.fills = [{ type: 'SOLID', color: { r: 0.98, g: 0.98, b: 0.99 } }];
lumenCard.x = 560;
lumenCard.y = 140;
lumenCard.resize(520, 240);

const lumenTitle = figma.createText();
lumenTitle.fontName = { family: 'Inter', style: 'Semi Bold' };
lumenTitle.fontSize = 16;
lumenTitle.characters = 'LumenBar (Progress Gauge)';
lumenCard.appendChild(lumenTitle);

// Header row: Label + counter
const lumenHeader = figma.createFrame();
lumenHeader.layoutMode = 'HORIZONTAL';
lumenHeader.itemSpacing = 0;
lumenHeader.fills = [];
lumenHeader.resize(472, 24);

const lumenLabel = figma.createText();
lumenLabel.fontName = { family: 'Inter', style: 'Medium' };
lumenLabel.fontSize = 13;
lumenLabel.characters = 'Harbor Restoration Progress';
lumenHeader.appendChild(lumenLabel);

const spacer = figma.createFrame();
spacer.fills = [];
spacer.resize(190, 20);
lumenHeader.appendChild(spacer);

const lumenVal = figma.createText();
lumenVal.fontName = { family: 'Inter', style: 'Bold' };
lumenVal.fontSize = 14;
lumenVal.characters = '2,450 / 3,000 LM';
lumenVal.fills = [{ type: 'SOLID', color: hexToRgb('#F59E0B') }];
lumenHeader.appendChild(lumenVal);
lumenCard.appendChild(lumenHeader);

// The Track Bar
const track = figma.createFrame();
track.name = 'Track';
track.resize(472, 14);
track.cornerRadius = 9999;
track.fills = [{ type: 'SOLID', color: { r: 0.9, g: 0.92, b: 0.95 } }];

const fillBar = figma.createFrame();
fillBar.name = 'Fill';
fillBar.resize(380, 14);
fillBar.cornerRadius = 9999;
fillBar.fills = [{ type: 'SOLID', color: hexToRgb('#F59E0B') }];
track.appendChild(fillBar);
lumenCard.appendChild(track);

const lumenHint = figma.createText();
lumenHint.fontName = { family: 'Inter', style: 'Regular' };
lumenHint.fontSize = 12;
lumenHint.characters = 'Next milestone: Operational → Flourishing at 3,000 Lumens';
lumenHint.fills = [{ type: 'SOLID', color: { r: 0.45, g: 0.5, b: 0.6 } }];
lumenCard.appendChild(lumenHint);

compSection.appendChild(lumenCard);

for (const child of previousGenerated) child.remove();

return {
  success: true,
  page: page.name,
  sections: [tokenSection.name, compSection.name]
};
