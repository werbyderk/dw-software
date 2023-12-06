interface FeatureButtonProps {
    target: string
    text: string
}

const FeatureButton = ({ target, text }: FeatureButtonProps) => (
    <div>
        <a href={target} target='_blank'>
            <div className='cursor-pointer rounded  bg-[#1CDBB6] w-fit m-auto p-4 text-2xl hover:bg-green-500 hover:text-3xl duration-300'>
                <span>{text}</span>
            </div>
        </a>
    </div>
)

export default FeatureButton
