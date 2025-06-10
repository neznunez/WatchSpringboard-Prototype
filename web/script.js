const icons = [
  "../WatchSpringboard/Icons/Icon-0@2x.png",
  "../WatchSpringboard/Icons/Icon-1@2x.png",
  "../WatchSpringboard/Icons/Icon-2@2x.png",
  "../WatchSpringboard/Icons/Icon-3@2x.png",
  "../WatchSpringboard/Icons/Icon-4@2x.png",
  "../WatchSpringboard/Icons/Icon-5@2x.png",
  "../WatchSpringboard/Icons/Icon-6@2x.png",
  "../WatchSpringboard/Icons/Icon-7@2x.png",
  "../WatchSpringboard/Icons/Icon-8@2x.png",
  "../WatchSpringboard/Icons/Icon-9@2x.png",
  "../WatchSpringboard/Icons/Icon-10@2x.png",
  "../WatchSpringboard/Icons/Icon-11@2x.png",
  "../WatchSpringboard/Icons/Icon-12@2x.png",
  "../WatchSpringboard/Icons/Icon-13@2x.png",
  "../WatchSpringboard/Icons/Icon-14@2x.png",
  "../WatchSpringboard/Icons/Icon-15@2x.png",
  "../WatchSpringboard/Icons/Icon-16@2x.png",
  "../WatchSpringboard/Icons/Icon-17@2x.png",
  "../WatchSpringboard/Icons/Icon-18@2x.png",
  "../WatchSpringboard/Icons/Icon-19@2x.png",
  "../WatchSpringboard/Icons/Icon-20@2x.png",
  "../WatchSpringboard/Icons/Icon-21@2x.png",
  "../WatchSpringboard/Icons/Icon-22@2x.png",
  "../WatchSpringboard/Icons/Icon-23@2x.png",
  "../WatchSpringboard/Icons/Icon-24@2x.png",
  "../WatchSpringboard/Icons/Icon-25@2x.png",
  "../WatchSpringboard/Icons/Icon-26@2x.png",
  "../WatchSpringboard/Icons/Icon-27@2x.png",
  "../WatchSpringboard/Icons/Icon-28@2x.png",
  "../WatchSpringboard/Icons/Icon-29@2x.png",
  "../WatchSpringboard/Icons/Icon-30@2x.png",
  "../WatchSpringboard/Icons/Icon-31@2x.png",
  "../WatchSpringboard/Icons/Icon-32@2x.png",
  "../WatchSpringboard/Icons/Icon-33@2x.png",
  "../WatchSpringboard/Icons/Icon-34@2x.png",
];

const springboard = document.getElementById('springboard');
const overlay = document.getElementById('overlay');
const overlayIcon = document.getElementById('overlay-icon');
const respring = document.getElementById('respring');

let scale = 1;
let translateX = 0;
let translateY = 0;
let isDragging = false;
let startX, startY;
let startTranslateX, startTranslateY;

function createIcons() {
  const perRow = 8;
  const size = 60;
  const padding = 20;

  icons.forEach((src, index) => {
    const row = Math.floor(index / perRow);
    const col = index % perRow;
    const offset = row % 2 === 0 ? 0 : (size + padding) / 2;

    const div = document.createElement('div');
    div.className = 'icon';
    div.style.left = `${col * (size + padding) + offset}px`;
    div.style.top = `${row * (size + padding)}px`;

    const img = document.createElement('img');
    img.src = src;
    div.appendChild(img);

    div.addEventListener('click', () => {
      overlayIcon.src = src;
      overlay.classList.remove('hidden');
    });

    springboard.appendChild(div);
  });

  const width = perRow * (size + padding) + size;
  const height = Math.ceil(icons.length / perRow) * (size + padding);
  springboard.style.width = `${width}px`;
  springboard.style.height = `${height}px`;
}

function updateTransform() {
  springboard.style.transform = `translate(calc(-50% + ${translateX}px), calc(-50% + ${translateY}px)) scale(${scale})`;
}

springboard.addEventListener('mousedown', (e) => {
  isDragging = true;
  startX = e.clientX;
  startY = e.clientY;
  startTranslateX = translateX;
  startTranslateY = translateY;
  springboard.style.cursor = 'grabbing';
});

document.addEventListener('mousemove', (e) => {
  if (!isDragging) return;
  translateX = startTranslateX + e.clientX - startX;
  translateY = startTranslateY + e.clientY - startY;
  updateTransform();
});

document.addEventListener('mouseup', () => {
  isDragging = false;
  springboard.style.cursor = 'grab';
});

springboard.addEventListener('wheel', (e) => {
  e.preventDefault();
  const delta = e.deltaY > 0 ? -0.1 : 0.1;
  scale = Math.min(Math.max(0.5, scale + delta), 2);
  updateTransform();
});

respring.addEventListener('click', () => {
  translateX = 0;
  translateY = 0;
  scale = 1;
  updateTransform();
});

overlay.addEventListener('click', () => {
  overlay.classList.add('hidden');
});

document.addEventListener('DOMContentLoaded', () => {
  createIcons();
  updateTransform();
});
