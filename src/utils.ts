export function checkCollision(first, second) {
  const a = first.getBounds();
  const b = second.getBounds();
  return (
    a.x + a.width > b.x &&
    a.x < b.x + b.width &&
    a.y + a.height > b.y &&
    a.y < b.y + b.height
  );
}

export function generateHexColor(): number {
  const maxValue = 0xffffff;
  const randomNumber = Math.floor(Math.random() * maxValue).toString(16);
  const hex = `0x${randomNumber}`;

  return parseInt(hex);
}

function 