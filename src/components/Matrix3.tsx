import { onInputFocus, onPointerEnterCircle, onPointerLeaveCircle } from '../functions/Functions.js'
import { useTranslation } from 'react-i18next'
import matrix3 from '../assets/Matrix/matrix3.webp'
import AnimatedCircle from './AnimatedCircle.js'

function Matrix3({ handleOpen }: { handleOpen: () => void }) {
  const { t } = useTranslation()

  return (
    <div className='relative tablet:w-full tablet:left-0 aspect-[100/80] z-0 mt-6 laptop:mt-12 desktopMd:mt-0 overflow-x-clip'>
      <svg
        className='absolute -top-[5%] -left-[9%] w-[130%]'
        viewBox='0 0 1151 1040'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
        xmlnsXlink='http://www.w3.org/1999/xlink'
      >
        <image x='321' y='136' width='608' height='608' href={matrix3} />

        {/*Circle1*/}
        <path className='circle1' d='M497 209H320' stroke='#605C53' strokeWidth='1' />
        <path
          className='circle1'
          d='M343.53 208.47C343.237 208.177 342.763 208.177 342.47 208.47L337.697 213.243C337.404 213.536 337.404 214.01 337.697 214.303C337.99 214.596 338.464 214.596 338.757 214.303L343 210.061L347.243 214.303C347.536 214.596 348.01 214.596 348.303 214.303C348.596 214.01 348.596 213.536 348.303 213.243L343.53 208.47ZM342.47 676.53C342.763 676.823 343.237 676.823 343.53 676.53L348.303 671.757C348.596 671.464 348.596 670.99 348.303 670.697C348.01 670.404 347.536 670.404 347.243 670.697L343 674.939L338.757 670.697C338.464 670.404 337.99 670.404 337.697 670.697C337.404 670.99 337.404 671.464 337.697 671.757L342.47 676.53ZM342.25 209L342.25 210.497L343.75 210.497L343.75 209L342.25 209ZM342.25 213.49L342.25 216.484L343.75 216.484L343.75 213.49L342.25 213.49ZM342.25 219.478L342.25 222.471L343.75 222.471L343.75 219.478L342.25 219.478ZM342.25 225.465L342.25 228.458L343.75 228.458L343.75 225.465L342.25 225.465ZM342.25 231.452L342.25 234.446L343.75 234.446L343.75 231.452L342.25 231.452ZM342.25 237.439L342.25 240.433L343.75 240.433L343.75 237.439L342.25 237.439ZM342.25 243.426L342.25 246.42L343.75 246.42L343.75 243.426L342.25 243.426ZM342.25 249.413L342.25 252.407L343.75 252.407L343.75 249.413L342.25 249.413ZM342.25 255.401L342.25 258.394L343.75 258.394L343.75 255.401L342.25 255.401ZM342.25 261.388L342.25 264.381L343.75 264.381L343.75 261.388L342.25 261.388ZM342.25 267.375L342.25 270.369L343.75 270.369L343.75 267.375L342.25 267.375ZM342.25 273.362L342.25 276.356L343.75 276.356L343.75 273.362L342.25 273.362ZM342.25 279.349L342.25 282.343L343.75 282.343L343.75 279.349L342.25 279.349ZM342.25 285.337L342.25 288.33L343.75 288.33L343.75 285.337L342.25 285.337ZM342.25 291.324L342.25 294.317L343.75 294.317L343.75 291.324L342.25 291.324ZM342.25 297.311L342.25 300.305L343.75 300.305L343.75 297.311L342.25 297.311ZM342.25 303.298L342.25 306.292L343.75 306.292L343.75 303.298L342.25 303.298ZM342.25 309.285L342.25 312.279L343.75 312.279L343.75 309.285L342.25 309.285ZM342.25 315.272L342.25 318.266L343.75 318.266L343.75 315.272L342.25 315.272ZM342.25 321.26L342.25 324.253L343.75 324.253L343.75 321.26L342.25 321.26ZM342.25 327.247L342.25 330.24L343.75 330.24L343.75 327.247L342.25 327.247ZM342.25 333.234L342.25 336.228L343.75 336.228L343.75 333.234L342.25 333.234ZM342.25 339.221L342.25 342.215L343.75 342.215L343.75 339.221L342.25 339.221ZM342.25 345.208L342.25 348.202L343.75 348.202L343.75 345.208L342.25 345.208ZM342.25 351.196L342.25 354.189L343.75 354.189L343.75 351.196L342.25 351.196ZM342.25 357.183L342.25 360.176L343.75 360.176L343.75 357.183L342.25 357.183ZM342.25 363.17L342.25 366.164L343.75 366.164L343.75 363.17L342.25 363.17ZM342.25 369.157L342.25 372.151L343.75 372.151L343.75 369.157L342.25 369.157ZM342.25 375.144L342.25 378.138L343.75 378.138L343.75 375.144L342.25 375.144ZM342.25 381.131L342.25 384.125L343.75 384.125L343.75 381.131L342.25 381.131ZM342.25 387.119L342.25 390.112L343.75 390.112L343.75 387.119L342.25 387.119ZM342.25 393.106L342.25 396.099L343.75 396.099L343.75 393.106L342.25 393.106ZM342.25 399.093L342.25 402.087L343.75 402.087L343.75 399.093L342.25 399.093ZM342.25 405.08L342.25 408.074L343.75 408.074L343.75 405.08L342.25 405.08ZM342.25 411.067L342.25 414.061L343.75 414.061L343.75 411.067L342.25 411.067ZM342.25 417.055L342.25 420.048L343.75 420.048L343.75 417.055L342.25 417.055ZM342.25 423.042L342.25 426.035L343.75 426.035L343.75 423.042L342.25 423.042ZM342.25 429.029L342.25 432.023L343.75 432.023L343.75 429.029L342.25 429.029ZM342.25 435.016L342.25 438.01L343.75 438.01L343.75 435.016L342.25 435.016ZM342.25 441.003L342.25 443.997L343.75 443.997L343.75 441.003L342.25 441.003ZM342.25 446.99L342.25 449.984L343.75 449.984L343.75 446.99L342.25 446.99ZM342.25 452.978L342.25 455.971L343.75 455.971L343.75 452.978L342.25 452.978ZM342.25 458.965L342.25 461.958L343.75 461.958L343.75 458.965L342.25 458.965ZM342.25 464.952L342.25 467.946L343.75 467.946L343.75 464.952L342.25 464.952ZM342.25 470.939L342.25 473.933L343.75 473.933L343.75 470.939L342.25 470.939ZM342.25 476.926L342.25 479.92L343.75 479.92L343.75 476.926L342.25 476.926ZM342.25 482.914L342.25 485.907L343.75 485.907L343.75 482.914L342.25 482.914ZM342.25 488.901L342.25 491.894L343.75 491.894L343.75 488.901L342.25 488.901ZM342.25 494.888L342.25 497.882L343.75 497.882L343.75 494.888L342.25 494.888ZM342.25 500.875L342.25 503.869L343.75 503.869L343.75 500.875L342.25 500.875ZM342.25 506.862L342.25 509.856L343.75 509.856L343.75 506.862L342.25 506.862ZM342.25 512.85L342.25 515.843L343.75 515.843L343.75 512.85L342.25 512.85ZM342.25 518.837L342.25 521.83L343.75 521.83L343.75 518.837L342.25 518.837ZM342.25 524.824L342.25 527.817L343.75 527.817L343.75 524.824L342.25 524.824ZM342.25 530.811L342.25 533.805L343.75 533.805L343.75 530.811L342.25 530.811ZM342.25 536.798L342.25 539.792L343.75 539.792L343.75 536.798L342.25 536.798ZM342.25 542.785L342.25 545.779L343.75 545.779L343.75 542.785L342.25 542.785ZM342.25 548.773L342.25 551.766L343.75 551.766L343.75 548.773L342.25 548.773ZM342.25 554.76L342.25 557.753L343.75 557.753L343.75 554.76L342.25 554.76ZM342.25 560.747L342.25 563.741L343.75 563.741L343.75 560.747L342.25 560.747ZM342.25 566.734L342.25 569.728L343.75 569.728L343.75 566.734L342.25 566.734ZM342.25 572.721L342.25 575.715L343.75 575.715L343.75 572.721L342.25 572.721ZM342.25 578.709L342.25 581.702L343.75 581.702L343.75 578.709L342.25 578.709ZM342.25 584.696L342.25 587.689L343.75 587.689L343.75 584.696L342.25 584.696ZM342.25 590.683L342.25 593.676L343.75 593.676L343.75 590.683L342.25 590.683ZM342.25 596.67L342.25 599.664L343.75 599.664L343.75 596.67L342.25 596.67ZM342.25 602.657L342.25 605.651L343.75 605.651L343.75 602.657L342.25 602.657ZM342.25 608.644L342.25 611.638L343.75 611.638L343.75 608.644L342.25 608.644ZM342.25 614.632L342.25 617.625L343.75 617.625L343.75 614.632L342.25 614.632ZM342.25 620.619L342.25 623.612L343.75 623.612L343.75 620.619L342.25 620.619ZM342.25 626.606L342.25 629.6L343.75 629.6L343.75 626.606L342.25 626.606ZM342.25 632.593L342.25 635.587L343.75 635.587L343.75 632.593L342.25 632.593ZM342.25 638.58L342.25 641.574L343.75 641.574L343.75 638.58L342.25 638.58ZM342.25 644.568L342.25 647.561L343.75 647.561L343.75 644.568L342.25 644.568ZM342.25 650.555L342.25 653.548L343.75 653.548L343.75 650.555L342.25 650.555ZM342.25 656.542L342.25 659.535L343.75 659.535L343.75 656.542L342.25 656.542ZM342.25 662.529L342.25 665.523L343.75 665.523L343.75 662.529L342.25 662.529ZM342.25 668.516L342.25 671.51L343.75 671.51L343.75 668.516L342.25 668.516ZM342.25 674.503L342.25 676L343.75 676L343.75 674.503L342.25 674.503Z'
          fill='#605C53'
        />
        <path className='circle1' d='M530 677H319' stroke='#605C53' strokeWidth='1' />

        {/*Circle2*/}
        <path className='circle2' d='M541 147H186' stroke='#605C53' strokeWidth='1' />
        <path
          className='circle2'
          d='M209.53 146.47C209.237 146.177 208.763 146.177 208.47 146.47L203.697 151.243C203.404 151.536 203.404 152.01 203.697 152.303C203.99 152.596 204.464 152.596 204.757 152.303L209 148.061L213.243 152.303C213.536 152.596 214.01 152.596 214.303 152.303C214.596 152.01 214.596 151.536 214.303 151.243L209.53 146.47ZM208.47 729.53C208.763 729.823 209.237 729.823 209.53 729.53L214.303 724.757C214.596 724.464 214.596 723.99 214.303 723.697C214.01 723.404 213.536 723.404 213.243 723.697L209 727.939L204.757 723.697C204.464 723.404 203.99 723.404 203.697 723.697C203.404 723.99 203.404 724.464 203.697 724.757L208.47 729.53ZM208.25 147L208.25 148.5L209.75 148.5L209.75 147L208.25 147ZM208.25 151.5L208.25 154.5L209.75 154.5L209.75 151.5L208.25 151.5ZM208.25 157.5L208.25 160.5L209.75 160.5L209.75 157.5L208.25 157.5ZM208.25 163.5L208.25 166.5L209.75 166.5L209.75 163.5L208.25 163.5ZM208.25 169.5L208.25 172.5L209.75 172.5L209.75 169.5L208.25 169.5ZM208.25 175.5L208.25 178.5L209.75 178.5L209.75 175.5L208.25 175.5ZM208.25 181.5L208.25 184.5L209.75 184.5L209.75 181.5L208.25 181.5ZM208.25 187.5L208.25 190.5L209.75 190.5L209.75 187.5L208.25 187.5ZM208.25 193.5L208.25 196.5L209.75 196.5L209.75 193.5L208.25 193.5ZM208.25 199.5L208.25 202.5L209.75 202.5L209.75 199.5L208.25 199.5ZM208.25 205.5L208.25 208.5L209.75 208.5L209.75 205.5L208.25 205.5ZM208.25 211.5L208.25 214.5L209.75 214.5L209.75 211.5L208.25 211.5ZM208.25 217.5L208.25 220.5L209.75 220.5L209.75 217.5L208.25 217.5ZM208.25 223.5L208.25 226.5L209.75 226.5L209.75 223.5L208.25 223.5ZM208.25 229.5L208.25 232.5L209.75 232.5L209.75 229.5L208.25 229.5ZM208.25 235.5L208.25 238.5L209.75 238.5L209.75 235.5L208.25 235.5ZM208.25 241.5L208.25 244.5L209.75 244.5L209.75 241.5L208.25 241.5ZM208.25 247.5L208.25 250.5L209.75 250.5L209.75 247.5L208.25 247.5ZM208.25 253.5L208.25 256.5L209.75 256.5L209.75 253.5L208.25 253.5ZM208.25 259.5L208.25 262.5L209.75 262.5L209.75 259.5L208.25 259.5ZM208.25 265.5L208.25 268.5L209.75 268.5L209.75 265.5L208.25 265.5ZM208.25 271.5L208.25 274.5L209.75 274.5L209.75 271.5L208.25 271.5ZM208.25 277.5L208.25 280.5L209.75 280.5L209.75 277.5L208.25 277.5ZM208.25 283.5L208.25 286.5L209.75 286.5L209.75 283.5L208.25 283.5ZM208.25 289.5L208.25 292.5L209.75 292.5L209.75 289.5L208.25 289.5ZM208.25 295.5L208.25 298.5L209.75 298.5L209.75 295.5L208.25 295.5ZM208.25 301.5L208.25 304.5L209.75 304.5L209.75 301.5L208.25 301.5ZM208.25 307.5L208.25 310.5L209.75 310.5L209.75 307.5L208.25 307.5ZM208.25 313.5L208.25 316.5L209.75 316.5L209.75 313.5L208.25 313.5ZM208.25 319.5L208.25 322.5L209.75 322.5L209.75 319.5L208.25 319.5ZM208.25 325.5L208.25 328.5L209.75 328.5L209.75 325.5L208.25 325.5ZM208.25 331.5L208.25 334.5L209.75 334.5L209.75 331.5L208.25 331.5ZM208.25 337.5L208.25 340.5L209.75 340.5L209.75 337.5L208.25 337.5ZM208.25 343.5L208.25 346.5L209.75 346.5L209.75 343.5L208.25 343.5ZM208.25 349.5L208.25 352.5L209.75 352.5L209.75 349.5L208.25 349.5ZM208.25 355.5L208.25 358.5L209.75 358.5L209.75 355.5L208.25 355.5ZM208.25 361.5L208.25 364.5L209.75 364.5L209.75 361.5L208.25 361.5ZM208.25 367.5L208.25 370.5L209.75 370.5L209.75 367.5L208.25 367.5ZM208.25 373.5L208.25 376.5L209.75 376.5L209.75 373.5L208.25 373.5ZM208.25 379.5L208.25 382.5L209.75 382.5L209.75 379.5L208.25 379.5ZM208.25 385.5L208.25 388.5L209.75 388.5L209.75 385.5L208.25 385.5ZM208.25 391.5L208.25 394.5L209.75 394.5L209.75 391.5L208.25 391.5ZM208.25 397.5L208.25 400.5L209.75 400.5L209.75 397.5L208.25 397.5ZM208.25 403.5L208.25 406.5L209.75 406.5L209.75 403.5L208.25 403.5ZM208.25 409.5L208.25 412.5L209.75 412.5L209.75 409.5L208.25 409.5ZM208.25 415.5L208.25 418.5L209.75 418.5L209.75 415.5L208.25 415.5ZM208.25 421.5L208.25 424.5L209.75 424.5L209.75 421.5L208.25 421.5ZM208.25 427.5L208.25 430.5L209.75 430.5L209.75 427.5L208.25 427.5ZM208.25 433.5L208.25 436.5L209.75 436.5L209.75 433.5L208.25 433.5ZM208.25 439.5L208.25 442.5L209.75 442.5L209.75 439.5L208.25 439.5ZM208.25 445.5L208.25 448.5L209.75 448.5L209.75 445.5L208.25 445.5ZM208.25 451.5L208.25 454.5L209.75 454.5L209.75 451.5L208.25 451.5ZM208.25 457.5L208.25 460.5L209.75 460.5L209.75 457.5L208.25 457.5ZM208.25 463.5L208.25 466.5L209.75 466.5L209.75 463.5L208.25 463.5ZM208.25 469.5L208.25 472.5L209.75 472.5L209.75 469.5L208.25 469.5ZM208.25 475.5L208.25 478.5L209.75 478.5L209.75 475.5L208.25 475.5ZM208.25 481.5L208.25 484.5L209.75 484.5L209.75 481.5L208.25 481.5ZM208.25 487.5L208.25 490.5L209.75 490.5L209.75 487.5L208.25 487.5ZM208.25 493.5L208.25 496.5L209.75 496.5L209.75 493.5L208.25 493.5ZM208.25 499.5L208.25 502.5L209.75 502.5L209.75 499.5L208.25 499.5ZM208.25 505.5L208.25 508.5L209.75 508.5L209.75 505.5L208.25 505.5ZM208.25 511.5L208.25 514.5L209.75 514.5L209.75 511.5L208.25 511.5ZM208.25 517.5L208.25 520.5L209.75 520.5L209.75 517.5L208.25 517.5ZM208.25 523.5L208.25 526.5L209.75 526.5L209.75 523.5L208.25 523.5ZM208.25 529.5L208.25 532.5L209.75 532.5L209.75 529.5L208.25 529.5ZM208.25 535.5L208.25 538.5L209.75 538.5L209.75 535.5L208.25 535.5ZM208.25 541.5L208.25 544.5L209.75 544.5L209.75 541.5L208.25 541.5ZM208.25 547.5L208.25 550.5L209.75 550.5L209.75 547.5L208.25 547.5ZM208.25 553.5L208.25 556.5L209.75 556.5L209.75 553.5L208.25 553.5ZM208.25 559.5L208.25 562.5L209.75 562.5L209.75 559.5L208.25 559.5ZM208.25 565.5L208.25 568.5L209.75 568.5L209.75 565.5L208.25 565.5ZM208.25 571.5L208.25 574.5L209.75 574.5L209.75 571.5L208.25 571.5ZM208.25 577.5L208.25 580.5L209.75 580.5L209.75 577.5L208.25 577.5ZM208.25 583.5L208.25 586.5L209.75 586.5L209.75 583.5L208.25 583.5ZM208.25 589.5L208.25 592.5L209.75 592.5L209.75 589.5L208.25 589.5ZM208.25 595.5L208.25 598.5L209.75 598.5L209.75 595.5L208.25 595.5ZM208.25 601.5L208.25 604.5L209.75 604.5L209.75 601.5L208.25 601.5ZM208.25 607.5L208.25 610.5L209.75 610.5L209.75 607.5L208.25 607.5ZM208.25 613.5L208.25 616.5L209.75 616.5L209.75 613.5L208.25 613.5ZM208.25 619.5L208.25 622.5L209.75 622.5L209.75 619.5L208.25 619.5ZM208.25 625.5L208.25 628.5L209.75 628.5L209.75 625.5L208.25 625.5ZM208.25 631.5L208.25 634.5L209.75 634.5L209.75 631.5L208.25 631.5ZM208.25 637.5L208.25 640.5L209.75 640.5L209.75 637.5L208.25 637.5ZM208.25 643.5L208.25 646.5L209.75 646.5L209.75 643.5L208.25 643.5ZM208.25 649.5L208.25 652.5L209.75 652.5L209.75 649.5L208.25 649.5ZM208.25 655.5L208.25 658.5L209.75 658.5L209.75 655.5L208.25 655.5ZM208.25 661.5L208.25 664.5L209.75 664.5L209.75 661.5L208.25 661.5ZM208.25 667.5L208.25 670.5L209.75 670.5L209.75 667.5L208.25 667.5ZM208.25 673.5L208.25 676.5L209.75 676.5L209.75 673.5L208.25 673.5ZM208.25 679.5L208.25 682.5L209.75 682.5L209.75 679.5L208.25 679.5ZM208.25 685.5L208.25 688.5L209.75 688.5L209.75 685.5L208.25 685.5ZM208.25 691.5L208.25 694.5L209.75 694.5L209.75 691.5L208.25 691.5ZM208.25 697.5L208.25 700.5L209.75 700.5L209.75 697.5L208.25 697.5ZM208.25 703.5L208.25 706.5L209.75 706.5L209.75 703.5L208.25 703.5ZM208.25 709.5L208.25 712.5L209.75 712.5L209.75 709.5L208.25 709.5ZM208.25 715.5L208.25 718.5L209.75 718.5L209.75 715.5L208.25 715.5ZM208.25 721.5L208.25 724.5L209.75 724.5L209.75 721.5L208.25 721.5ZM208.25 727.5L208.25 729L209.75 729L209.75 727.5L208.25 727.5Z'
          fill='#605C53'
        />
        <path className='circle2' d='M552 729H185' stroke='#605C53' strokeWidth='1' />

        {/*Circle4*/}
        <path
          className='circle4'
          d='M448.424 539.02C448.159 539.338 448.202 539.811 448.52 540.076L453.703 544.4C454.021 544.665 454.494 544.622 454.759 544.304C455.025 543.986 454.982 543.513 454.664 543.248L450.056 539.404L453.9 534.797C454.165 534.479 454.122 534.006 453.804 533.741C453.486 533.475 453.013 533.518 452.748 533.836L448.424 539.02ZM549.076 530.98C549.341 530.662 549.298 530.189 548.98 529.924L543.797 525.6C543.479 525.335 543.006 525.378 542.741 525.696C542.475 526.014 542.518 526.487 542.836 526.752L547.444 530.595L543.6 535.203C543.335 535.521 543.378 535.994 543.696 536.259C544.014 536.525 544.487 536.482 544.752 536.164L549.076 530.98ZM449.068 540.247L450.531 540.115L450.396 538.621L448.932 538.753L449.068 540.247ZM453.457 539.85L456.384 539.585L456.249 538.091L453.322 538.356L453.457 539.85ZM459.31 539.32L462.237 539.056L462.102 537.562L459.175 537.827L459.31 539.32ZM465.163 538.791L468.09 538.526L467.954 537.032L465.028 537.297L465.163 538.791ZM471.016 538.262L473.943 537.997L473.807 536.503L470.881 536.768L471.016 538.262ZM476.869 537.732L479.796 537.468L479.66 535.974L476.734 536.238L476.869 537.732ZM482.722 537.203L485.648 536.938L485.513 535.444L482.587 535.709L482.722 537.203ZM488.575 536.673L491.501 536.409L491.366 534.915L488.44 535.179L488.575 536.673ZM494.428 536.144L497.354 535.879L497.219 534.385L494.293 534.65L494.428 536.144ZM500.281 535.615L503.207 535.35L503.072 533.856L500.146 534.121L500.281 535.615ZM506.134 535.085L509.06 534.82L508.925 533.327L505.999 533.591L506.134 535.085ZM511.987 534.556L514.913 534.291L514.778 532.797L511.852 533.062L511.987 534.556ZM517.84 534.026L520.766 533.762L520.631 532.268L517.704 532.532L517.84 534.026ZM523.693 533.497L526.619 533.232L526.484 531.738L523.557 532.003L523.693 533.497ZM529.546 532.967L532.472 532.703L532.337 531.209L529.41 531.474L529.546 532.967ZM535.398 532.438L538.325 532.173L538.19 530.679L535.263 530.944L535.398 532.438ZM541.251 531.909L544.178 531.644L544.043 530.15L541.116 530.415L541.251 531.909ZM547.104 531.379L548.568 531.247L548.432 529.753L546.969 529.885L547.104 531.379Z'
          fill='#605C53'
        />

        {/*Circle5*/}
        <path
          className='circle5'
          d='M756.47 210.47C756.177 210.763 756.177 211.237 756.47 211.53L761.243 216.303C761.536 216.596 762.01 216.596 762.303 216.303C762.596 216.01 762.596 215.536 762.303 215.243L758.061 211L762.303 206.757C762.596 206.464 762.596 205.99 762.303 205.697C762.01 205.404 761.536 205.404 761.243 205.697L756.47 210.47ZM757 211.75L880 211.75L880 210.25L757 210.25L757 211.75Z'
          fill='#605C53'
        />

        {/*Circle3*/}
        <path className='circle3' d='M513 152V100' stroke='#605C53' strokeWidth='1' />
        <path
          className='circle3'
          d='M715.53 115.53C715.823 115.238 715.823 114.763 715.53 114.47L710.757 109.697C710.464 109.404 709.99 109.404 709.697 109.697C709.404 109.99 709.404 110.465 709.697 110.757L713.939 115L709.697 119.243C709.404 119.536 709.404 120.011 709.697 120.303C709.99 120.596 710.464 120.596 710.757 120.303L715.53 115.53ZM512.47 114.47C512.177 114.763 512.177 115.238 512.47 115.53L517.243 120.303C517.536 120.596 518.01 120.596 518.303 120.303C518.596 120.011 518.596 119.536 518.303 119.243L514.061 115L518.303 110.757C518.596 110.465 518.596 109.99 518.303 109.697C518.01 109.404 517.536 109.404 517.243 109.697L512.47 114.47ZM715 114.25H713.515V115.75H715V114.25ZM710.544 114.25H707.574V115.75H710.544V114.25ZM704.603 114.25H701.632V115.75H704.603V114.25ZM698.662 114.25H695.691V115.75H698.662V114.25ZM692.721 114.25H689.75V115.75H692.721V114.25ZM686.779 114.25H683.809V115.75H686.779V114.25ZM680.838 114.25H677.868V115.75H680.838V114.25ZM674.897 114.25H671.926V115.75H674.897V114.25ZM668.956 114.25H665.985V115.75H668.956V114.25ZM663.015 114.25H660.044V115.75H663.015V114.25ZM657.074 114.25H654.103V115.75H657.074V114.25ZM651.132 114.25H648.162V115.75H651.132V114.25ZM645.191 114.25H642.221V115.75H645.191V114.25ZM639.25 114.25H636.279V115.75H639.25V114.25ZM633.309 114.25H630.338V115.75H633.309V114.25ZM627.368 114.25H624.397V115.75H627.368V114.25ZM621.426 114.25H618.456V115.75H621.426V114.25ZM615.485 114.25H612.515V115.75H615.485V114.25ZM609.544 114.25H606.574V115.75H609.544V114.25ZM603.603 114.25H600.632V115.75H603.603V114.25ZM597.662 114.25H594.691V115.75H597.662V114.25ZM591.721 114.25H588.75V115.75H591.721V114.25ZM585.779 114.25H582.809V115.75H585.779V114.25ZM579.838 114.25H576.868V115.75H579.838V114.25ZM573.897 114.25H570.926V115.75H573.897V114.25ZM567.956 114.25H564.985V115.75H567.956V114.25ZM562.015 114.25H559.044V115.75H562.015V114.25ZM556.074 114.25H553.103V115.75H556.074V114.25ZM550.132 114.25H547.162V115.75H550.132V114.25ZM544.191 114.25H541.221V115.75H544.191V114.25ZM538.25 114.25H535.28V115.75H538.25V114.25ZM532.309 114.25H529.338V115.75H532.309V114.25ZM526.368 114.25H523.397V115.75H526.368V114.25ZM520.427 114.25H517.456V115.75H520.427V114.25ZM514.485 114.25H513V115.75H514.485V114.25Z'
          fill='#605C53'
        />
        <path className='circle3' d='M715 160L715 101' stroke='#605C53' strokeWidth='1' />

        <defs>
          <filter
            id='filter0_f_12_262'
            x='150.469'
            y='361.218'
            width='999.87'
            height='678.236'
            filterUnits='userSpaceOnUse'
            colorInterpolationFilters='sRGB'
          >
            <feFlood floodOpacity='0' result='BackgroundImageFix' />
            <feBlend mode='normal' in='SourceGraphic' in2='BackgroundImageFix' result='shape' />
            <feGaussianBlur stdDeviation='117.5' result='effect1_foregroundBlur_12_262' />
          </filter>
          <filter
            id='filter1_f_12_262'
            x='444'
            y='583'
            width='395'
            height='219'
            filterUnits='userSpaceOnUse'
            colorInterpolationFilters='sRGB'
          >
            <feFlood floodOpacity='0' result='BackgroundImageFix' />
            <feBlend mode='normal' in='SourceGraphic' in2='BackgroundImageFix' result='shape' />
            <feGaussianBlur stdDeviation='31' result='effect1_foregroundBlur_12_262' />
          </filter>
          <filter
            id='filter2_f_12_262'
            x='-48.5015'
            y='229.938'
            width='785.001'
            height='640.812'
            filterUnits='userSpaceOnUse'
            colorInterpolationFilters='sRGB'
          >
            <feFlood floodOpacity='0' result='BackgroundImageFix' />
            <feBlend mode='normal' in='SourceGraphic' in2='BackgroundImageFix' result='shape' />
            <feGaussianBlur stdDeviation='1' result='effect1_foregroundBlur_12_262' />
          </filter>
          <pattern id='pattern0' patternContentUnits='objectBoundingBox' width='1' height='1'>
            <use xlinkHref='#image0_12_262' transform='scale(0.0005)' />
          </pattern>
          <filter
            id='filter3_d_12_262'
            x='104.584'
            y='388.465'
            width='75.9614'
            height='76.9874'
            filterUnits='userSpaceOnUse'
            colorInterpolationFilters='sRGB'
          >
            <feFlood floodOpacity='0' result='BackgroundImageFix' />
            <feColorMatrix
              in='SourceAlpha'
              type='matrix'
              values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
              result='hardAlpha'
            />
            <feOffset dy='4' />
            <feGaussianBlur stdDeviation='2' />
            <feComposite in2='hardAlpha' operator='out' />
            <feColorMatrix type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0' />
            <feBlend mode='normal' in2='BackgroundImageFix' result='effect1_dropShadow_12_262' />
            <feBlend mode='normal' in='SourceGraphic' in2='effect1_dropShadow_12_262' result='shape' />
          </filter>
          <filter
            id='filter4_d_12_262'
            x='444.968'
            y='429.147'
            width='76.9937'
            height='76.9949'
            filterUnits='userSpaceOnUse'
            colorInterpolationFilters='sRGB'
          >
            <feFlood floodOpacity='0' result='BackgroundImageFix' />
            <feColorMatrix
              in='SourceAlpha'
              type='matrix'
              values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
              result='hardAlpha'
            />
            <feOffset dy='4' />
            <feGaussianBlur stdDeviation='2' />
            <feComposite in2='hardAlpha' operator='out' />
            <feColorMatrix type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0' />
            <feBlend mode='normal' in2='BackgroundImageFix' result='effect1_dropShadow_12_262' />
            <feBlend mode='normal' in='SourceGraphic' in2='effect1_dropShadow_12_262' result='shape' />
          </filter>
          <filter
            id='filter5_d_12_262'
            x='874.967'
            y='175.968'
            width='76.999'
            height='76.4369'
            filterUnits='userSpaceOnUse'
            colorInterpolationFilters='sRGB'
          >
            <feFlood floodOpacity='0' result='BackgroundImageFix' />
            <feColorMatrix
              in='SourceAlpha'
              type='matrix'
              values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
              result='hardAlpha'
            />
            <feOffset dy='4' />
            <feGaussianBlur stdDeviation='2' />
            <feComposite in2='hardAlpha' operator='out' />
            <feColorMatrix type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0' />
            <feBlend mode='normal' in2='BackgroundImageFix' result='effect1_dropShadow_12_262' />
            <feBlend mode='normal' in='SourceGraphic' in2='effect1_dropShadow_12_262' result='shape' />
          </filter>
          <filter
            id='filter6_d_12_262'
            x='575.5'
            y='13.504'
            width='76.9927'
            height='76.9962'
            filterUnits='userSpaceOnUse'
            colorInterpolationFilters='sRGB'
          >
            <feFlood floodOpacity='0' result='BackgroundImageFix' />
            <feColorMatrix
              in='SourceAlpha'
              type='matrix'
              values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
              result='hardAlpha'
            />
            <feOffset dy='4' />
            <feGaussianBlur stdDeviation='2' />
            <feComposite in2='hardAlpha' operator='out' />
            <feColorMatrix type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0' />
            <feBlend mode='normal' in2='BackgroundImageFix' result='effect1_dropShadow_12_262' />
            <feBlend mode='normal' in='SourceGraphic' in2='effect1_dropShadow_12_262' result='shape' />
          </filter>
          <filter
            id='filter7_d_12_262'
            x='583'
            y='21.0001'
            width='62'
            height='61.9999'
            filterUnits='userSpaceOnUse'
            colorInterpolationFilters='sRGB'
          >
            <feFlood floodOpacity='0' result='BackgroundImageFix' />
            <feColorMatrix
              in='SourceAlpha'
              type='matrix'
              values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
              result='hardAlpha'
            />
            <feOffset dy='4' />
            <feGaussianBlur stdDeviation='2' />
            <feComposite in2='hardAlpha' operator='out' />
            <feColorMatrix type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0' />
            <feBlend mode='normal' in2='BackgroundImageFix' result='effect1_dropShadow_12_262' />
            <feBlend mode='normal' in='SourceGraphic' in2='effect1_dropShadow_12_262' result='shape' />
          </filter>
        </defs>

        <AnimatedCircle x='241' y='389' stroke='#969284' />
        <AnimatedCircle x='112' y='388' stroke='#969284' />
        <AnimatedCircle x='580' y='13' stroke='#969284' />
        <AnimatedCircle x='449' y='429' stroke='#969284' />
        <AnimatedCircle x='865' y='175' stroke='#969284' />

        {/*Circle1*/}
        <foreignObject x='211' y='389' width='130' height='140'>
          <div className='flex h-full flex-col items-center gap-y-2'>
            <div className='w-[70px] h-[70px] flex justify-center items-center'>
              <div
                id='circle1'
                className='w-[54px] h-[54px] bg-[#292929] rounded-full font-labgrotesque text-[30px] text-[#767676] flex justify-center items-center'
                onMouseEnter={event => onPointerEnterCircle(event.currentTarget.id)}
                onMouseLeave={event => onPointerLeaveCircle(event.currentTarget.id)}
                onClick={() => {
                  handleOpen()
                  setTimeout(() => onInputFocus('innerDiameter'), 100)
                }}
              >
                1
              </div>
            </div>
            <span
              id='circle1text'
              className='font-adventpro font-medium text-footerBottomText text-[20px] laptop:text-[15px]
                               group-hover:text-white text-center break-words'
            >
              {t('productBlock.innerDiameter')}
            </span>
          </div>
        </foreignObject>

        {/*Circle2*/}
        <foreignObject x='87' y='388' width='120' height='140'>
          <div className='flex h-full flex-col items-center gap-y-2'>
            <div className='w-[70px] h-[70px] flex justify-center items-center'>
              <div
                id='circle2'
                className='w-[54px] h-[54px] bg-[#292929] rounded-full font-labgrotesque text-[30px]
                text-[#767676] flex justify-center items-center'
                onMouseEnter={event => onPointerEnterCircle(event.currentTarget.id)}
                onMouseLeave={event => onPointerLeaveCircle(event.currentTarget.id)}
                onClick={() => {
                  handleOpen()
                  setTimeout(() => onInputFocus('outerDiameter'), 100)
                }}
              >
                2
              </div>
            </div>
            <span
              id='circle2text'
              className='font-adventpro font-medium text-footerBottomText text-[20px] laptop:text-[15px]
                               group-hover:text-white text-center break-words'
            >
              {t('productBlock.outerDiameter')}
            </span>
          </div>
        </foreignObject>

        {/*Circle3*/}
        <foreignObject x='525' y='13' width='180' height='100'>
          <div className='flex h-full flex-col items-center gap-y-1'>
            <div className='w-[70px] h-[70px] flex justify-center items-center shrink-0'>
              <div
                id='circle3'
                className='w-[54px] h-[54px] bg-[#292929] rounded-full font-labgrotesque text-[30px]
                text-[#767676] flex justify-center items-center'
                onMouseEnter={event => onPointerEnterCircle(event.currentTarget.id)}
                onMouseLeave={event => onPointerLeaveCircle(event.currentTarget.id)}
                onClick={() => {
                  handleOpen()
                  setTimeout(() => onInputFocus('overallWidth'), 100)
                }}
              >
                3
              </div>
            </div>
            <span
              id='circle3text'
              className='font-adventpro font-medium text-footerBottomText text-[20px] laptop:text-[15px]
                               group-hover:text-white text-center'
            >
              {t('productBlock.overallWidth')}
            </span>
          </div>
        </foreignObject>

        {/*Circle4*/}
        <foreignObject x='449' y='429' width='192' height='70'>
          <div className='flex h-full items-center gap-x-14'>
            <div className='w-[70px] h-[70px] flex justify-center items-center shrink-0'>
              <div
                id='circle4'
                className='w-[54px] h-[54px] bg-[#292929] rounded-full font-labgrotesque text-[30px]
                                            text-[#767676] flex justify-center items-center'
                onMouseEnter={event => onPointerEnterCircle(event.currentTarget.id)}
                onMouseLeave={event => onPointerLeaveCircle(event.currentTarget.id)}
                onClick={() => {
                  handleOpen()
                  setTimeout(() => onInputFocus('workingWidth'), 100)
                }}
              >
                4
              </div>
            </div>
            <span
              id='circle4text'
              className='font-adventpro font-medium text-footerBottomText text-[20px] laptop:text-[15px]
                               group-hover:text-white break-words'
            >
              {t('productBlock.workingWidth')}
            </span>
          </div>
        </foreignObject>

        {/*/!*Circle5*!/*/}
        <foreignObject x='835' y='175' width='130' height='140'>
          <div className='flex flex-col h-full items-center gap-y-2'>
            <div className='w-[70px] h-[70px] flex justify-center items-center shrink-0'>
              <div
                id='circle5'
                className='w-[54px] h-[54px] bg-[#292929] rounded-full font-labgrotesque text-[30px]
                text-[#767676] flex justify-center items-center'
                onMouseEnter={event => onPointerEnterCircle(event.currentTarget.id)}
                onMouseLeave={event => onPointerLeaveCircle(event.currentTarget.id)}
                onClick={() => {
                  handleOpen()
                  setTimeout(() => onInputFocus('drillingDiameter'), 100)
                }}
              >
                5
              </div>
            </div>
            <span
              id='circle5text'
              className='font-adventpro font-medium text-footerBottomText text-[20px] laptop:text-[15px]
                               group-hover:text-white text-center'
            >
              {t('productBlock.drillingDiameter')}
            </span>
          </div>
        </foreignObject>
      </svg>
    </div>
  )
}

export default Matrix3
