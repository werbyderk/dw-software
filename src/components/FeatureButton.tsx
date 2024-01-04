interface FeatureButtonProps {
    target: string
    text: string
    compact?: boolean
}

const FeatureButton = ({ compact, target, text }: FeatureButtonProps) => (
    <div className='items-center flex'>
        <a href={target} target='_blank'>
            <div
                className={`cursor-pointer rounded  bg-[#1CDBB6] w-fit m-auto p-4 hover:bg-green-500 duration-300 ${
                    compact ? 'text-sm' : 'text-2xl hover:text-3xl'
                }`}
            >
                {' '}
                <span>{text}</span>
            </div>
        </a>
    </div>
)

export default FeatureButton
