'use client';

import StaggeredMenu from './StaggeredMenu';
import LogoLockup from './LogoLockup';

const MENU_ITEMS = [
  { label: 'Home',        ariaLabel: 'Home',                  link: '/' },
  { label: 'About',       ariaLabel: 'About Divinus',         link: '/about' },
  { label: 'Divisions',   ariaLabel: 'Seven divisions',       link: '/divisions' },
  { label: 'Communities', ariaLabel: 'Communities',           link: '/communities' },
  { label: 'Connect',     ariaLabel: 'Get in touch',          link: '/contact' },
];

const SOCIAL_ITEMS = [
  { label: 'LinkedIn', link: 'https://www.linkedin.com/' },
  { label: 'Instagram', link: 'https://www.instagram.com/' },
  { label: 'X',        link: 'https://x.com/' },
];

export default function SiteMenu() {
  return (
    <StaggeredMenu
      isFixed
      position="right"
      items={MENU_ITEMS}
      socialItems={SOCIAL_ITEMS}
      displaySocials
      displayItemNumbering
      logoNode={<LogoLockup className="sm-logo-img" />}
      menuButtonColor="#fafafa"
      openMenuButtonColor="#fafafa"
      changeMenuColorOnOpen
      accentColor="#C9A84C"
      colors={['#0a0a0a', '#171717', '#1f1f1f']}
    />
  );
}
