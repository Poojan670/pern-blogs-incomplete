import React from 'react'
import { ImFacebook, ImTwitter, ImLinkedin2 } from "react-icons/im";
import NewsLetter from './sub-components/NewsLetter';

const Footer = () => {
  const bg = {
    background: "url('images/footer.png')no-repeat",
    backgroundRepeat: 'no-repeat',
    backgroundPosition: "bottom left"
  }
  return (
    <div className="bg-gray-50" style={bg}>
      <NewsLetter />
      <div className='container mx-auto flex justify-center py-12'>
        <div className='py-5'>
          <div className="flex gap-6 justify-center">
            <a href="/"><ImFacebook color='#888888' /></a>
            <a href="/"><ImTwitter color='#888888' /></a>
            <a href="/"><ImLinkedin2 color='#888888' /></a>
          </div>
          <p className='py-5 text-gray-400'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae quas laboriosam dolores qui cumque id.
          </p>
          <p className='text-gray-400 text-center'>
            Terms & Conditions
          </p>

        </div>

      </div>

    </div>
  )
}

export default Footer