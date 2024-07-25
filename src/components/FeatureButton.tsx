interface FeatureLinkProps {
    onClick: () => void
    text: string
    compact?: boolean
}

const FeatureButton = ({ onClick, text, compact }: FeatureLinkProps) => {
    return (
        <div className='items-center flex'>
            <button onClick={onClick}>
                <div
                    className={`cursor-pointer rounded  bg-[#1CDBB6] w-fit m-auto p-4 hover:bg-green-500 duration-300 ${
                        compact ? 'text-md hover:text-lg' : 'text-2xl hover:text-3xl'
                    }`}
                >
                    {' '}
                    <span className='text-nowrap'>{text}</span>
                </div>
            </button>
        </div>
    )
}

export default FeatureButton
