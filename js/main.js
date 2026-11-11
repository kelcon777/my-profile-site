// 연도 자동 갱신
document.getElementById('year').textContent = new Date().getFullYear();

// 헤더 스크롤 효과
const navbar = document.getElementById('navbar');
const onScroll = () => {
  navbar.classList.toggle('scrolled', window.scrollY > 10);
};
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// 모바일 메뉴 토글
const menuToggle = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');

menuToggle.addEventListener('click', () => {
  const isOpen = !mobileMenu.classList.contains('hidden');
  mobileMenu.classList.toggle('hidden', isOpen);
  menuToggle.setAttribute('aria-expanded', String(!isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? '메뉴 열기' : '메뉴 닫기');
});

// 모바일 메뉴에서 링크 클릭 시 닫기
mobileMenu.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    mobileMenu.classList.add('hidden');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', '메뉴 열기');
  });
});

// 스크롤 등장 애니메이션 (IntersectionObserver)
const revealEls = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  revealEls.forEach((el) => observer.observe(el));
} else {
  revealEls.forEach((el) => el.classList.add('is-visible'));
}

// 네비게이션 현재 섹션 강조 (스크롤 위치 기준)
const navLinks = document.querySelectorAll('[data-nav]');
const sections = Array.from(navLinks)
  .map((link) => document.querySelector(link.getAttribute('href')))
  .filter(Boolean);

const updateActiveNav = () => {
  const offset = window.innerHeight * 0.35;
  let currentId = sections[0] ? sections[0].id : '';
  sections.forEach((sec) => {
    if (sec.getBoundingClientRect().top <= offset) currentId = sec.id;
  });
  // 맨 위 근처면 '홈'
  if (window.scrollY < 100) currentId = 'top';
  navLinks.forEach((link) => {
    const isActive = link.getAttribute('href') === `#${currentId}`;
    link.classList.toggle('active', isActive);
  });
};
window.addEventListener('scroll', updateActiveNav, { passive: true });
updateActiveNav();

// 이메일 복사 버튼
const copyBtn = document.getElementById('copy-email');
const copyLabel = document.getElementById('copy-label');
const EMAIL = 'kelcon@daum.net';

copyBtn.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(EMAIL);
    copyLabel.textContent = '복사되었습니다 ✓';
  } catch (err) {
    copyLabel.textContent = '복사 실패';
    console.error('클립보드 복사 실패:', err);
  }
  setTimeout(() => {
    copyLabel.textContent = '이메일 복사';
  }, 2000);
});
