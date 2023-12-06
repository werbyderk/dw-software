const UnderConstruction = ({ compact }: { compact?: boolean }) => {
    if (compact) {
        return (
            <div className='bg-yellow-400 fixed top-[50px] right-[-70px] w-[300px] text-center rotate-45'>
                <span className='text-xs'>Under Construction 🚧</span>
            </div>
        )
    }
    return (
        <div className='bg-yellow-400 fixed top-[60px] right-[-80px] w-[300px] text-center rotate-45'>
            <span>Under Construction 🚧</span>
        </div>
    )
}

export default UnderConstruction
