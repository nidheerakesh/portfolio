import type { CSSProperties } from "react";

type IconProps = { className?: string; size?: number; color?: string; style?: CSSProperties };

// Small pixel-grid icons, all rendered from a filled-cell string grid so the
// blocky edges stay crisp at any size.

function PixelGlyph({ grid, className, size = 16, color = "currentColor", style }: IconProps & { grid: string[] }) {
  const cols = grid[0].length;
  const rows = grid.length;
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${cols} ${rows}`}
      shapeRendering="crispEdges"
      className={className}
      style={style}
      aria-hidden="true"
    >
      {grid.map((row, r) =>
        row.split("").map((cell, c) => (cell === "#" ? <rect key={`${r}-${c}`} x={c} y={r} width={1} height={1} fill={color} /> : null)),
      )}
    </svg>
  );
}

export function PixelHeart(props: IconProps) {
  return (
    <PixelGlyph
      {...props}
      grid={[".##.##.", "#######", "#######", ".#####.", "..###..", "...#..."]}
    />
  );
}

export function PixelStar(props: IconProps) {
  return (
    <PixelGlyph
      {...props}
      grid={["...#...", "...#...", "#..#..#", ".#.#.#.", "..###..", ".#.#.#.", "#..#..#", "...#..."]}
    />
  );
}

export function PixelSparkle(props: IconProps) {
  return <PixelGlyph {...props} grid={[".#.", "###", ".#."]} />;
}

export function PixelBolt(props: IconProps) {
  return (
    <PixelGlyph
      {...props}
      grid={[
        "....##",
        "...##.",
        "..##..",
        ".#####",
        "...##.",
        "..##..",
        ".##...",
        "##....",
      ]}
    />
  );
}

// Chunky 4-point star (chrome-sparkle stand-in from the Majd hero).
export function PixelDiamond(props: IconProps) {
  return (
    <PixelGlyph
      {...props}
      grid={[
        "...##...",
        "...##...",
        "..####..",
        "########",
        "########",
        "..####..",
        "...##...",
        "...##...",
      ]}
    />
  );
}

// Cover glyphs for the project card carousel — each project gets its own motif.
export function PixelShield(props: IconProps) {
  return (
    <PixelGlyph
      {...props}
      grid={[
        "...##...",
        ".######.",
        "########",
        "########",
        "##.##.##",
        "########",
        ".######.",
        "..####..",
        "...##...",
      ]}
    />
  );
}

export function PixelNetwork(props: IconProps) {
  return (
    <PixelGlyph
      {...props}
      grid={[
        "##.....##",
        "##.....##",
        "..#...#..",
        "...###...",
        "...###...",
        "...###...",
        "..#...#..",
        "##.....##",
        "##.....##",
      ]}
    />
  );
}

export function PixelDoc(props: IconProps) {
  return (
    <PixelGlyph
      {...props}
      grid={[
        "########",
        "#......#",
        "#.####.#",
        "#......#",
        "#.####.#",
        "#......#",
        "#.###..#",
        "#......#",
        "########",
      ]}
    />
  );
}

// Loaf-cat mascot — doubles as the hero avatar filler and the easter-egg critter.
export function PixelCat(props: IconProps) {
  return (
    <PixelGlyph
      {...props}
      grid={[
        "..##....##..",
        ".####..####.",
        "############",
        "############",
        "##.##..##.##",
        "############",
        "############",
        ".##########.",
        "..########..",
        "....####....",
      ]}
    />
  );
}
