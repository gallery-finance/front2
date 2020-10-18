import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import { VoterItem } from '../../components/Workshop'
import { Backdrop } from '../../components/Modals/Backdrop'
import { ProposeFigureModal } from '../../components/Modals/ProposeFigureModal'
import { VoteFigureModal } from '../../components/Modals/VoteFigureModal'

export const WorkshopVoterPage = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [voteOpen, setVoteOpen] = useState(false)

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
            <span itemProp="name">Figures</span>
            <link
              itemProp="item"
              href="http://gf.wndrbase.com/workshop/voter"
            />
            <meta itemProp="position" content="3" />
          </li>
        </ul>
      </div>
      <header className="voter-head">
        <h1 className="voter-head__title h3">Figures</h1>
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
            <button
              type="button"
              className="btn"
              data-modal="vote-new"
              onClick={() => setIsOpen(true)}
            >
              Propose a figure
            </button>
          </div>
        </div>
      </header>
      <div className="voter-table">
        <table>
          <thead>
            <tr>
              <th>Ranking</th>
              <th>Name</th>
              <th className="voter-table__col-max-width hidden-sm">Details</th>
              <th>Total Votes</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <VoterItem
              ranking={1}
              name="Jacob Jones"
              details="Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet."
              votes={1000}
              setVoteOpen={setVoteOpen}
            />
            <VoterItem
              ranking={1}
              name="Jacob Jones"
              details="Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet."
              votes={1000}
              setVoteOpen={setVoteOpen}
            />
            <VoterItem
              ranking={1}
              name="Jacob Jones"
              details="Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet."
              votes={1000}
              setVoteOpen={setVoteOpen}
            />
          </tbody>
        </table>
      </div>

      <ProposeFigureModal isOpen={isOpen} setIsOpen={setIsOpen} />
      <VoteFigureModal voteOpen={voteOpen} setVoteOpen={setVoteOpen} />
      <Backdrop
        isOpen={isOpen || voteOpen}
        setIsOpen={setIsOpen || setVoteOpen}
      />
    </article>
  )
}
