import { ReactElement } from 'react'
import Link from 'next/link'

function Footer(): ReactElement {
  return (
    <div className='footer'>
      <div className='container'>
        <div className='footer_container'>
          <Link href='/'>
            <div className='footer_logo'>Files</div>
          </Link>
          <div className='footer_left'>
            Small project made by{' '}
            <a href='https://twitter.com/AHamaiz' target='_blank'>
              Ali Hamaiz
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer
