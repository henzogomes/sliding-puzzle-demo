import Link from 'next/link';
import { PageSection } from '../PageSection';

const Footer = () => {

  // @TODO: Populate social medias.
  const socialMedias = [
    {
      label: 'LinkedIn',
      url: 'https://...',
      // @TODO: Replace with Radix/custom Logos.
      logo: <div />,
    },
  ];

  return (
    <footer className="footer-container dark-background">
      <PageSection>
        <div className="footer-inner-container">
          <div className="footer-copyright">
            © 2023 Dev
          </div>
          <div className="device-mobile-only">
            <hr />
          </div>
          <div>
            <ul className="footer-social-medias-container">
              {socialMedias.map((media, idx) => (
                <li key={idx}>
                  <Link
                    target="_blank"
                    rel="noreferrer"
                    href={media.url}
                    className="footer-social-medias-links"
                  >
                    {media.logo} {media.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </PageSection>
    </footer>
  );
};

export default Footer;
