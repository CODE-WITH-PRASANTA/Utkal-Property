import React from 'react'
import FrequentlyAskedQuestions from '../../Component/FrequentlyAskedQuestions/FrequentlyAskedQuestions'
import AboutFindDreamHome from '../../Component/AboutFindDreamHome/AboutFindDreamHome'
import FaqBreadcrume from '../../Component/FaqBreadcrume/FaqBreadcrume'

const Faq = () => {
  return (
    <div>
      <FaqBreadcrume/>
        <FrequentlyAskedQuestions/>
        <AboutFindDreamHome/>


    </div>
  )
}

export default Faq