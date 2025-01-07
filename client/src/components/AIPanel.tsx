import React from 'react'
import '../index.css';

const AIPanel = () => {
    return (
        <>
            <div className='w-3/12 h-screen bg-neutral-950 p-3' >
                <div className='bg-neutral-900 w-full h-full rounded-2xl' style={{
                    backgroundColor: 'hsla(0,0%,0%,1)',
                    backgroundImage: `
            radial-gradient(at 63% 15%, hsla(277,68%,6%,1) 0px, transparent 50%),
            radial-gradient(at 3% 95%, hsla(198,88%,3%,1) 0px, transparent 50%),
            radial-gradient(at 1% 0%, hsla(233,91%,12%,1) 0px, transparent 50%),
            radial-gradient(at 80% 100%, hsla(266,96%,13%,1) 0px, transparent 50%)
        `
                }}>
                    <div>
                        <h1 className='text-white text-2xl'>AI Panel</h1>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AIPanel