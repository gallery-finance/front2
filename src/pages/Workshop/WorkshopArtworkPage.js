import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { VoteCardList } from '../../components/Workshop/VoteCardList'

export const WorkshopArtworkPage = () => {
  const [radioChecked, setRadioChecked] = useState(true)

  return (
    <article className="center">
      <div className="center">
        <ul
          className="breadcrumbs hidden-sm"
          itemScope=""
          itemType="https://schema.org/BreadcrumbList"
        >
          <li
            className="breadcrumbs__item"
            itemProp="itemListElement"
            itemScope=""
            itemType="https://schema.org/ListItem"
          >
            <Link to="/" className="breadcrumbs__link" itemProp="item">
              <span itemProp="name">Home</span>
            </Link>
            <meta itemProp="position" content="1" />
          </li>

          <li
            className="breadcrumbs__item"
            itemProp="itemListElement"
            itemScope=""
            itemType="https://schema.org/ListItem"
          >
            <Link to="/workshop" className="breadcrumbs__link" itemProp="item">
              <span itemProp="name">Workshops</span>
            </Link>
            <meta itemProp="position" content="2" />
          </li>

          <li
            className="breadcrumbs__item"
            itemProp="itemListElement"
            itemScope=""
            itemType="https://schema.org/ListItem"
          >
            <span itemProp="name">Artwork</span>
            <link
              itemProp="item"
              href="http://gf.wndrbase.com/workshop/voter"
            />
            <meta itemProp="position" content="3" />
          </li>
        </ul>
      </div>

      <header className="voter-head">
        <h1 className="voter-head__title h3">Vote for the Artwork</h1>
        <div className="voter-head__dashboard">
          <div className="voter-head__dashboard-account">
            <div className="voter-head__dashboard-ico">
              <svg width="24" height="24" viewBox="0 0 24 24">
                <path d="M2 9h19a1 1 0 011 1v10a1 1 0 01-1 1H3a1 1 0 01-1-1V9zm1-6h15v4H2V4a1 1 0 011-1zm12 11v2h3v-2h-3z"></path>
              </svg>
            </div>
            <Link to="/workshop/account" className="link">
              Account
            </Link>
          </div>
          <div className="voter-head__dashboard-power">
            <p>
              Your Voting Power: <b>100 GLF</b>
            </p>
          </div>
          <div className="voter-head__dashboard-btn">
            <Link to="/workshop/submit" className="btn" data-modal="vote-new">
              Propose an artwork
            </Link>
          </div>
        </div>
      </header>

      <div className="tab">
        <label className="tab__btn">
          <input
            type="radio"
            name="tab"
            className="tab__input visuallyhidden"
            checked={radioChecked && 'checked'}
            onClick={() => setRadioChecked(true)}
          />

          <span className="tab__label">Hot</span>
        </label>

        <label className="tab__btn">
          <input
            type="radio"
            name="tab"
            className="tab__input visuallyhidden"
            checked={!radioChecked && 'checked'}
            onClick={() => setRadioChecked(false)}
          />

          <span className="tab__label">Fresh</span>
        </label>
      </div>

      <div className="hashtag">
        <div className="hashtag__list">
          <label className="hashtag__item">
            <input type="checkbox" className="hashtag__input visuallyhidden" />

            <span className="hashtag__label">#All</span>
          </label>

          <label className="hashtag__item">
            <input type="checkbox" className="hashtag__input visuallyhidden" />

            <span className="hashtag__label">#Hot</span>
          </label>

          <label className="hashtag__item">
            <input type="checkbox" className="hashtag__input visuallyhidden" />

            <span className="hashtag__label">#Donald Jay Trump Junior</span>
          </label>

          <label className="hashtag__item">
            <input type="checkbox" className="hashtag__input visuallyhidden" />

            <span className="hashtag__label">#vangogh</span>
          </label>
        </div>
      </div>

      <VoteCardList />
    </article>
  )
}
