import Link from 'next/link'
import { LinkedInLogoIcon } from '@radix-ui/react-icons'
import Image from 'next/image'
import { css } from '../../../styled-system/css'
import classNames from 'classnames'
import { flex } from '../../../styled-system/patterns'
import { pageSectionContainer } from '../../../styled-system/recipes'
import Tilt from 'react-parallax-tilt'

const Footer = () => {
  const socialMedias = [
    {
      label: 'LinkedIn',
      url: 'https://www.linkedin.com/in/henzo/',
      logo: <LinkedInLogoIcon width={20} height={20} />
    }
  ]

  const footerInner = classNames(
    flex({
      align: 'center',
      justify: 'space-between',
      gap: 16,
      width: '100%',
      p: 10
    }),
    css({ padding: '24px 0' })
  )

  const paralaxEffect = classNames(
    flex({ direction: 'column', justify: 'center', align: 'center' }),
    css({
      width: '180px',
      height: '180px',
      backgroundImage: 'url(/images/profile1.jpg)',
      bgSize: 'cover',
      color: 'white',
      borderRadius: '5px',
      transformStyle: 'preserve-3d'
    })
  )

  const innerElement = classNames(
    flex({ direction: 'column', justify: 'center', align: 'center' }),
    css({
      fontSize: '20px',
      color: 'white',
      transform: 'translateZ(60px)'
    })
  )

  const mediaLogo = classNames(
    css({
      w: '140px',
      h: '140px',
      position: 'absolute'
    })
  )

  return (
    <footer className={pageSectionContainer()}>
      <div className={footerInner}>
        <div>
          <Image src="/images/puppy.gif" alt="Puppy" width="100" height="100" />
        </div>
        <div className={css({ color: 'accent' })}>
          © {new Date().getFullYear()} Henzo Gomes
        </div>
        <div>
          <ul className="footer-social-medias-container">
            {socialMedias.map((media, idx) => (
              <li key={idx}>
                <Link
                  target="_blank"
                  rel="noreferrer"
                  href={media.url}
                  className={css({ color: 'accent' })}
                >
                  <Tilt className={paralaxEffect} perspective={500}>
                    <div className={innerElement}>
                      <div className={css({ mt: '110px', fontSize: '12px' })}>
                        Henzo Gomes
                      </div>
                      <div className={mediaLogo}>{media.logo}</div>
                    </div>
                  </Tilt>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  )
}

export default Footer
