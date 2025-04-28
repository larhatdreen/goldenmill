import { ReactNode } from 'react'
// import { Bg } from './Bg'
import NavBar from './NavBar'
import Footer from './Footer'
import { useLanguageFromUrl } from '../hooks/useLanguageFromUrl'

interface WrapperProps {
  children: ReactNode
}

export const Wrapper = ({ children }: WrapperProps) => {
  // Используем хук для синхронизации языка с URL
  useLanguageFromUrl()

  return (
    <>
      {/* <Bg /> */}
      <NavBar />
      {children}
      <Footer />
    </>
  )
}
