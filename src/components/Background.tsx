import miniOval5 from '@/../public/images/Mini Oval-05.svg'
import miniMac3 from '@/../public/images/Mini Mac-03.svg'
import miniRect1 from '@/../public/images/Mini Rectangle-01.svg'
import miniTri2 from '@/../public/images/Mini Triangle-02.svg'
import squiggles3 from '@/../public/images/Squiggles-03.svg'
import zigZag4 from '@/../public/images/ZigZag-04.svg'
import zigZag5 from '@/../public/images/ZigZag-05.svg'
import miniCircle8 from '@/../public/images/Mini Circle-08.svg'
import elements2 from '@/../public/images/Elements-02.svg'
import miniOval1 from '@/../public/images/Mini Oval-01.svg'
import miniRect4 from '@/../public/images/Mini Rectangle-04.svg'
import miniMac2 from '@/../public/images/Mini Mac-02.svg'
import miniTri7 from '@/../public/images/Mini Triangle-07.svg'
import more9 from '@/../public/images/More Shapes-09.svg'
import squiggles5 from '@/../public/images/Squiggles-05.svg'
import miniOval2 from '@/../public/images/Mini Oval-02.svg'
import miniTri3 from '@/../public/images/Mini Triangle-03.svg'
import miniRect3 from '@/../public/images/Mini Rectangle-03.svg'
import miniMac5 from '@/../public/images/Mini Mac-05.svg'
import element9 from '@/../public/images/Elements-09.svg'
import Image from 'next/image'

const MIN_SIZE = 200
const MAX_SIZE = 250

const IMAGES = [
    miniOval5,
    miniMac3,
    zigZag4,
    miniRect1,
    miniTri2,
    squiggles3,
    zigZag5,
    miniCircle8,
    elements2,
    miniOval1,
    miniRect4,
    miniMac2,
    miniTri7,
    more9,
    squiggles5,
    miniOval2,
    miniTri3,
    miniRect3,
    miniMac5,
    element9,
]

const randStyle = () => {
    return {
        transform: `rotate(${Math.round(Math.random() * 180) * (Math.random() > 0.5 ? 1 : -1)}deg)`,
        width: `${Math.max(MIN_SIZE, Math.round(Math.random() * MAX_SIZE))}px`,
    }
}

const Background = () => {
    return (
        <section className='max-w-screen max-h-screen overflow-clip'>
            <div className='m-auto gap-8 lg:gap-16 -z-10 fixed -top-20 lg:-top-12 -left-20 xl:left-0 opacity-10 flex flex-wrap justify-center lg:scale-125 rotate-2'>
                {IMAGES.map((img, i) => (
                    <Image
                        key={i}
                        src={img}
                        alt='background accent'
                        style={randStyle()}
                        className='hover:scale-50'
                    />
                ))}
            </div>
        </section>
    )
}

export default Background
