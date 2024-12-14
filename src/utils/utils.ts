export const getViewBox = (iconName: string): string => {
  const iconPositions: { [key: string]: number } = {
    Translate: 0,
    Rotate: 1,
    Scale: 2,
    Wireframe: 3,
    Solid: 4,
    MaterialView: 5,
    Cube: 6,
    Cylinder: 7,
    Cone: 8,
    Sphere: 9,
    Plane: 10,
    Torus: 11,
  };

  const index = iconPositions[iconName] || 0;
  const iconsPerRow = 18; // Adjust this value based on the number of icons per row
  const iconSize = 64;

  const x = (index % iconsPerRow) * iconSize;
  const y = Math.floor(index / iconsPerRow) * iconSize;

  return `${x} ${y} ${iconSize} ${iconSize}`;
};
