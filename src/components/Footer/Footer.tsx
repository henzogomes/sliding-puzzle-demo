import Link from 'next/link'
import { PageSection } from '../PageSection'
import { LinkedInLogoIcon } from '@radix-ui/react-icons'
import Image from 'next/image'

const Footer = () => {
  // @TODO: Populate social medias.
  const socialMedias = [
    {
      label: 'LinkedIn',
      url: 'https://www.linkedin.com/in/henzo/',
      // @TODO: Replace with Radix/custom Logos.
      logo: <LinkedInLogoIcon />
    }
  ]

  return (
    <footer className="footer-container dark-background">
      <PageSection>
        <div className="footer-inner-container">
          <div>
            <Image
              src="/images/puppy.gif"
              alt="Puppy"
              width="100"
              height="100"
            />
          </div>
          <div className="footer-copyright">
            © {new Date().getFullYear()} Henzo Gomes
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
                    {media.logo}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </PageSection>
    </footer>
  )
}

export default Footer
