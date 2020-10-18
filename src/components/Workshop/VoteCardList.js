import React, { useState } from 'react'
import { VoteCard } from './VoteCard'
import { VoteModal } from '../../components/Modals/VoteModal'
import { Backdrop } from '../../components/Modals/Backdrop'

export const VoteCardList = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <div className="artwork-list">
        <div className="artwork-list__list">
          <VoteCard setIsOpen={setIsOpen} />
          <VoteCard setIsOpen={setIsOpen} />
          <VoteCard setIsOpen={setIsOpen} />
        </div>
      </div>

      <VoteModal isOpen={isOpen} setIsOpen={setIsOpen} />
      <Backdrop isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  )
}
