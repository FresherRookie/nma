export const topContactItems = [
  { contactType: 'email', address: 'management@northmusicacademy.in' },
  { contactType: 'phone', address: '+919307288570' },
];
export const topSocialList = [
  { platform: 'facebook', link: '/' },
  { platform: 'youtube', link: '/' },
  { platform: 'instagram', link: '/' },
];

export const navItems = [
  { name: 'Home', link: '/' },
  { name: 'Courses', link: '/courses' },
  { name: 'Faculties', link: '/faculties' },
  { name: 'News', link: '/news' },
  { name: 'About Us', link: '/about' },
  { name: 'Contact', link: '/contact' },
];

export const heroItems = [{ Image: '/HeroImage.jpg' }];

interface TeamMember {
  name: string;
  role: string;
  imageSrc: string;
  bio: string;
}
export const teamMembers: TeamMember[] = [
  {
    name: 'K.C Angami',
    role: 'Instructor',
    imageSrc: '/womanpiano.jpg',
    bio: 'From beginners to advanced lesson, I will take you through.',
  },
  {
    name: 'John',
    role: 'Instructor',
    imageSrc: '/handsguitar.jpg',
    bio: 'Intermediate and advanced guitar instructor',
  },
  {
    name: 'Grace',
    role: 'Instructor',
    imageSrc: '/womanviolin.jpg',
    bio: 'Intermediate and advanced violin instructor',
  },
  {
    name: 'Rocky',
    role: 'Instructor',
    imageSrc: '/drums.jpg',
    bio: 'Beginner, Intermediate and advanced drums instructor',
  },
  // Add more team members here
];
