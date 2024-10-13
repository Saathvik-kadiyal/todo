import React from 'react'
import AddDocs from './AddDocs'
import DocsList from './DocsList'

function Docs() {

    
  return (
    <>
    <div className='items-center flex justify-center flex-col gap-4'>
    <AddDocs/>
    <DocsList/>
    </div>
    </>
  )
}

export default Docs