import React, { useState } from 'react'
import starryNightBig from '../../../assets/img/artwork-list/starry-night--big.png'
import starryNight1x from '../../../assets/img/artwork-list/starry-night.webp'
import starryNight2x from '../../../assets/img/artwork-list/starry-night@2x.webp'
import starryNightJPG1x from '../../../assets/img/artwork-list/starry-night.jpg'
import starryNightJPG2x from '../../../assets/img/artwork-list/starry-night@2x.jpg'
import portraitBig from '../../../assets/img/artwork-list/portrait--big.png'
import portrait1x from '../../../assets/img/artwork-list/portrait.webp'
import portrait2x from '../../../assets/img/artwork-list/portrait@2x.webp'
import portraitJPG1x from '../../../assets/img/artwork-list/portrait.jpg'
import portraitJPG2x from '../../../assets/img/artwork-list/portrait@2x.jpg'
import wheatfieldBig from '../../../assets/img/artwork-list/wheatfield--big.png'
import wheatfield1x from '../../../assets/img/artwork-list/wheatfield.webp'
import wheatfield2x from '../../../assets/img/artwork-list/wheatfield@2x.webp'
import wheatfieldJPG1x from '../../../assets/img/artwork-list/wheatfield.jpg'
import wheatfieldJPG2x from '../../../assets/img/artwork-list/wheatfield@2x.jpg'
import { ArtworkDetailsModal } from '../../../components/Modals/ArtworkDetailsModal'
import { Backdrop } from '../../../components/Modals/Backdrop'
import { GalleryModal } from '../../../components/Modals/GalleryModal'

const artworks = [
  {
    title: 'The Starry Night',
    imgBig: starryNightBig,
    img1: starryNight1x,
    img2: starryNight2x,
    img3: starryNightJPG1x,
    img4: starryNightJPG2x,
    text:
      'The Starry Night is an oil on canvas painting by Dutch Post-Impressionist painter Vincent van Gogh. Painted in June 1889, it depicts the view from the east-facing window of his',
  },
  {
    title: 'Portrait of the ... ',
    imgBig: portraitBig,
    img1: portrait1x,
    img2: portrait2x,
    img3: portraitJPG1x,
    img4: portraitJPG2x,
    text:
      'Joseph Roulin—who appears in this portrait resplendent in his blue uniform against a floral background that echoes his lush, swirling beard—was among Vincent',
  },
  {
    title: 'Wheatfield with ... ',
    imgBig: wheatfieldBig,
    img1: wheatfield1x,
    img2: wheatfield2x,
    img3: wheatfieldJPG1x,
    img4: wheatfieldJPG2x,
    text:
      "Wheatfield with Crows is a July 1890 painting by Vincent van Gogh. It has been cited by several critics as one of his greatest works. It is commonly stated that this was van Gogh's",
  },
]

export const MyArtwork = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [galleryOpen, setGelleryOpen] = useState(false)

  return (
    <div className="tabs__item">
      <div className="artwork-list">
        <div className="artwork-list__list">
          {artworks.map((item) => {
            return (
              <>
                <div className="artwork-list__item">
                  <a
                    onClick={() => setGelleryOpen(true)}
                    className="artwork-list__img modal-gallery"
                  >
                    <picture>
                      <source
                        srcset={`${item.img1} 1x, ${item.img2} 2x`}
                        type="image/webp"
                      />
                      <source srcset={`${item.img3} 1x, ${item.img4} 2x`} />

                      <img
                        src={item.img4}
                        alt={item.title}
                        loading="lazy"
                        width="264"
                        height="170"
                      />
                    </picture>
                  </a>

                  <h2 className="artwork-list__title h3">{item.title}</h2>

                  <p className="artwork-list__author">by Van Gogh</p>

                  <button
                    type="button"
                    className="artwork-list__btn btn btn--gray"
                    onClick={() => setIsOpen(true)}
                  >
                    Proposed Jan 2, 2020
                  </button>

                  <p className="artwork-list__desc">{item.text}</p>

                  <hr />

                  <div className="artwork-list__votes">10,100.2 GLF Votes</div>
                </div>

                <GalleryModal
                  imgBig={item.imgBig}
                  isOpen={galleryOpen}
                  setIsOpen={setGelleryOpen}
                />
              </>
            )
          })}
        </div>
      </div>

      <ArtworkDetailsModal isOpen={isOpen} setIsOpen={setIsOpen} />
      <Backdrop
        isOpen={isOpen || galleryOpen}
        setIsOpen={setIsOpen || setGelleryOpen}
      />
    </div>
  )
}
