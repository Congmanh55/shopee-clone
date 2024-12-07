import React from 'react'
import { Link } from 'react-router-dom'
import path from '../../../constants/path'

const AsideFilter = () => {
  return (
    <div className='py-4'>
      <Link to={path.home} className='flex items-center font-bold'>
        <svg viewBox='0 0 12 10' className='w-3 h-4 mr-3 fill-current'>
          <g fill-rule='evenodd' stroke='none' stroke-width='1'>
            <g transform='translate(-373 -208)'>
              <g transform='translate(155 191)'>
                <g transform='translate(218 17)'>
                  <path d='m0 2h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z'></path>
                  <path d='m0 6h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z'></path>
                  <path d='m0 10h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z'></path>
                </g>
              </g>
            </g>
          </g>
        </svg>
      </Link>
    </div>
  )
}

export default AsideFilter
