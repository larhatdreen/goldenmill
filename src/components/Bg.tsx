import vector from '../assets/Background/Vector 18.svg'
import vectorline from '../assets/Background/Vector 19.png'

export const Bg = () => (
  <div className='absolute left-0 top-0 -z-50'>
    <img className='fixed w-full ' alt='Vector' src={vector} />
    <img className='fixed w-full ' alt='Vector' src={vectorline} />
  </div>
)
