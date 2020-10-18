import React, { useState } from 'react'
import bigImg from '../../assets/img/artwork-list/big.jpg'
import imgWebp1x from '../../assets/img/artwork-list/img.webp'
import imgWebp2x from '../../assets/img/artwork-list/img@2x.webp'
import img1x from '../../assets/img/artwork-list/img.jpg'
import img2x from '../../assets/img/artwork-list/img@2x.jpg'
import { GalleryModal } from '../Modals/GalleryModal'
import { Backdrop } from '../Modals/Backdrop'

export const VoteCard = ({ setIsOpen }) => {
  const [galleryOpen, setGalleryOpen] = useState(false)

  return (
    <>
      <div className="artwork-list__item">
        <a
          onClick={() => setGalleryOpen(true)}
          className="artwork-list__img modal-gallery"
        >
          <picture>
            <source
              srcset={`${imgWebp1x} 1x, ${imgWebp2x} 2x`}
              type="image/webp"
            />
            <source srcset={`${img1x} 1x, ${img2x} 2x`} />

            <img
              src={img2x}
              alt="Starry Night"
              loading="lazy"
              width="264"
              height="170"
            />
          </picture>
        </a>

        <h2 className="artwork-list__title h3">Starry Night</h2>

        <p className="artwork-list__author">by Van Gogh</p>

        <div className="artwork-list__hashtag">
          <a href="/">#vangogh</a>
        </div>

        <button
          type="button"
          className="artwork-list__btn btn"
          data-modal="vote-img"
          onClick={() => setIsOpen(true)}
        >
          Vote
        </button>

        <p className="artwork-list__desc">
          Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet
          sint. Velit officia consequat duis enim velit mollit. Exercitation
          veniam consequat sunt nostrud amet.
        </p>

        <hr />

        <div className="artwork-list__votes">10,100.2 GLF Votes</div>
      </div>

      <GalleryModal
        imgBig={bigImg}
        isOpen={galleryOpen}
        setIsOpen={setGalleryOpen}
      />
      <Backdrop isOpen={galleryOpen} setIsOpen={setGalleryOpen} />
    </>
  )
}
