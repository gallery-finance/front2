import React, { useState } from 'react'
import { VoteFigureModal } from '../../../components/Modals/VoteFigureModal'
import { Backdrop } from '../../../components/Modals/Backdrop'

const figures = [
  {
    name: 'Jacob Jones',
    date: '11/10/2020',
    details:
      'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.',
    price: 1000,
  },
  {
    name: 'Annette Black',
    date: '12/10/2020',
    details:
      'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.',
    price: 1000,
  },
  {
    name: 'Darrell Steward',
    date: '13/10/2020',
    details:
      'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.',
    price: 1000,
  },
  {
    name: 'Ralph Edwards',
    date: '14/10/2020',
    details:
      'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.',
    price: 1000,
  },
  {
    name: 'Darlene Robertson',
    date: '15/10/2020',
    details:
      'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.',
    price: 1000,
  },
  {
    name: 'Cameron Williamson',
    date: '16/10/2020',
    details:
      'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.',
    price: 1000,
  },
  {
    name: 'Courtney Henry',
    date: '17/10/2020',
    details:
      'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.',
    price: 1000,
  },
]

export const MyFigures = () => {
  const [voteOpen, setVoteOpen] = useState(false)

  return (
    <div className="tabs__item">
      <div className="voter-table">
        <table>
          <thead>
            <tr>
              <th>Proposed</th>
              <th>Name</th>
              <th className="voter-table__col-max-width hidden-sm">Details</th>
              <th>Total Votes</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {figures.map((item) => {
              return (
                <tr>
                  <td>{item.date}</td>
                  <td>{item.name}</td>
                  <td className="hidden-sm">
                    <div className="voter-table__details">
                      <p className="voter-table__details-inner">
                        {item.details}
                      </p>
                    </div>
                  </td>
                  <td>{item.price} GLF</td>
                  <td>
                    <button
                      type="button"
                      className="btn btn--vote"
                      data-modal="vote"
                      onClick={() => setVoteOpen(true)}
                    >
                      Vote
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      <VoteFigureModal voteOpen={voteOpen} setVoteOpen={setVoteOpen} />
      <Backdrop isOpen={voteOpen} setIsOpen={setVoteOpen} />
    </div>
  )
}
