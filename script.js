// FUNDRAISER TRACKER: update these two numbers only.
const fundraiser = {
  raised: 20,
  goal: 100,
};

const fundraiserProgress = document.querySelector('.goal-progress');
if (fundraiserProgress) {
  const percent = fundraiser.goal > 0
    ? Math.min(100, Math.max(0, (fundraiser.raised / fundraiser.goal) * 100))
    : 0;
  const roundedPercent = Math.round(percent);
  const remaining = Math.max(0, fundraiser.goal - fundraiser.raised);
  const progressTrack = fundraiserProgress.querySelector('.progress-track');

  fundraiserProgress.querySelector('[data-fundraiser-raised]').textContent = `${fundraiser.raised}`;
  fundraiserProgress.querySelector('[data-fundraiser-goal]').textContent = `${fundraiser.goal}`;
  fundraiserProgress.querySelector('[data-fundraiser-percent]').textContent = `${roundedPercent}% there`;
  fundraiserProgress.querySelector('[data-fundraiser-remaining]').textContent = `${remaining} to go`;
  fundraiserProgress.querySelector('[data-fundraiser-bar]').style.width = `${percent}%`;

  progressTrack.setAttribute('aria-valuemax', String(fundraiser.goal));
  progressTrack.setAttribute('aria-valuenow', String(fundraiser.raised));
  progressTrack.setAttribute('aria-label', `${fundraiser.raised} raised toward a ${fundraiser.goal} goal`);
}

const menu = document.querySelector('.menu');
const links = document.querySelector('.nav-links');
menu.addEventListener('click', () => {
  const open = links.classList.toggle('open');
  menu.setAttribute('aria-expanded', String(open));
  menu.textContent = open ? 'Close' : 'Menu';
});
links.addEventListener('click', ({ target }) => {
  if (target.matches('a')) {
    links.classList.remove('open');
    menu.setAttribute('aria-expanded', 'false');
    menu.textContent = 'Menu';
  }
});
document.querySelector('#year').textContent = new Date().getFullYear();

const bookmarkGallery = document.querySelector('#bookmark-gallery');
if (bookmarkGallery) {
  const bookmarkCodes = Array.from({ length: 12 }, (_, index) => `BM${String(index + 2).padStart(3, '0')}`);
  const galleryImage = bookmarkGallery.querySelector('.gallery-image');
  const galleryCode = bookmarkGallery.querySelector('.gallery-code');
  const galleryCount = bookmarkGallery.querySelector('.gallery-count');
  let currentBookmark = 0;

  const showBookmark = (index) => {
    currentBookmark = (index + bookmarkCodes.length) % bookmarkCodes.length;
    const code = bookmarkCodes[currentBookmark];
    galleryImage.src = `assets/inventory/bookmarks/${code}.jpg`;
    galleryImage.alt = `Bookmark ${code}`;
    galleryCode.textContent = code;
    galleryCount.textContent = `${currentBookmark + 1} of ${bookmarkCodes.length}`;
  };

  document.querySelector('.gallery-trigger').addEventListener('click', () => {
    showBookmark(0);
    bookmarkGallery.showModal();
  });
  bookmarkGallery.querySelector('.gallery-close').addEventListener('click', () => bookmarkGallery.close());
  bookmarkGallery.querySelector('.gallery-previous').addEventListener('click', () => showBookmark(currentBookmark - 1));
  bookmarkGallery.querySelector('.gallery-next').addEventListener('click', () => showBookmark(currentBookmark + 1));
  bookmarkGallery.addEventListener('click', ({ target }) => {
    if (target === bookmarkGallery) bookmarkGallery.close();
  });
  bookmarkGallery.addEventListener('keydown', ({ key }) => {
    if (key === 'ArrowLeft') showBookmark(currentBookmark - 1);
    if (key === 'ArrowRight') showBookmark(currentBookmark + 1);
  });
}
