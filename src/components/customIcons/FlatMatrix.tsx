interface FlatMatrixProps {
  className?: string
  stroke: string
}

function FlatMatrix({ className, stroke }: FlatMatrixProps) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='108'
      height='44'
      viewBox='0 0 108 44'
      fill='none'
      className={className}
    >
      <path d='M5.77869 17.6557H1V28.5164H107V17.6557H102.221V14.1803H5.77869V17.6557Z' stroke={stroke} />
      <path d='M34.8853 14.6147V28.5164' stroke={stroke} />
      <path d='M73.1148 14.6147V28.5164' stroke={stroke} />
      <path d='M54 0L54 44' stroke={stroke} strokeDasharray='2 4 6 8' />
      <path d='M97.4426 14.1803L97.4426 28.9508' stroke={stroke} strokeWidth='0.5' />
      <path d='M94.8361 14.1803L94.8361 28.9508' stroke={stroke} strokeWidth='0.5' />
      <path d='M92.2295 14.1803L92.2295 28.9508' stroke={stroke} strokeWidth='0.5' />
      <path d='M89.6229 14.1803L89.6229 28.9508' stroke={stroke} strokeWidth='0.5' />
      <path d='M87.0164 14.1803L87.0164 28.9508' stroke={stroke} strokeWidth='0.5' />
      <path d='M84.4098 14.1803L84.4098 28.9508' stroke={stroke} strokeWidth='0.5' />
      <path d='M81.8033 14.1803L81.8033 28.9508' stroke={stroke} strokeWidth='0.5' />
      <path d='M79.1967 14.1803L79.1967 28.9508' stroke={stroke} strokeWidth='0.5' />
      <path d='M28.8033 14.1803L28.8033 28.9508' stroke={stroke} strokeWidth='0.5' />
      <path d='M26.1967 14.1803L26.1967 28.9508' stroke={stroke} strokeWidth='0.5' />
      <path d='M23.5902 14.1803L23.5902 28.9508' stroke={stroke} strokeWidth='0.5' />
      <path d='M20.9836 14.1803L20.9836 28.9508' stroke={stroke} strokeWidth='0.5' />
      <path d='M18.3771 14.1803L18.3771 28.9508' stroke={stroke} strokeWidth='0.5' />
      <path d='M15.7705 14.1803L15.7705 28.9508' stroke={stroke} strokeWidth='0.5' />
      <path d='M13.1639 14.1803L13.1639 28.9508' stroke={stroke} strokeWidth='0.5' />
      <path d='M10.5574 14.1803L10.5574 28.9508' stroke={stroke} strokeWidth='0.5' />
    </svg>
  )
}

export default FlatMatrix
