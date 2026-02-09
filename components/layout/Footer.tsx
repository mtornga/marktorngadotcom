import Container from './Container';
import Link from '../ui/Link';

const socialLinks = [
  { name: 'GitHub', href: 'https://github.com/mtornga' },
  { name: 'LinkedIn', href: 'https://linkedin.com/in/marktornga' },
];

export default function Footer() {
  return (
    <footer className="border-t-4 border-neo-text bg-neo-surface py-12 mt-20">
      <Container>
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <div className="text-center md:text-left">
            <p className="text-sm text-gray-600">
              Highly extensible human
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {socialLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                external
                className="neo-button-accent text-xs px-4 py-2"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Copyright */}
          <div className="text-center md:text-right text-sm text-gray-600">
            <p>&copy; {new Date().getFullYear()}</p>
            <p className="mt-1">St. Louis, Missouri</p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
