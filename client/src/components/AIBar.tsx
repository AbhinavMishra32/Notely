import { Search } from 'lucide-react';
import React, { useState } from 'react';

const AIBar = ({ parentWidth }) => {
    const leftOffset = parentWidth / 2;
    return (
        <>
            <div className={`w-full flex justify-center`}>
                <div className='right-0 gradient-blur w-[1644px]'>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
            <div
                className='fixed bottom-10'
                style={{
                    left: `calc(56% + ${leftOffset}px)`,  // Center relative to parent
                    transform: 'translateX(-50%)',
                }}
            >
                <div className='flex gap-2 items-center justify-center'>
                    <div className='flex items-center justify-center w-[50px] h-[50px] rounded-full bg-neutral-700/30 backdrop-blur-xl border-[1px] border-neutral-700' style={{ boxShadow: '0px 20px 47px 10px rgba(0,0,0,0.5)' }}>
                        <Search />
                    </div>
                    <input type='text' placeholder='Ask AI about your notes' className='bg-neutral-700/30 backdrop-blur-xl border-[1px] border-neutral-700 px-6 py-3 rounded-full focus:ring-neutral-700' style={{ boxShadow: '0px 20px 47px 10px rgba(0,0,0,0.5)' }} />
                </div>
            </div>
        </>
    );
}

export default AIBar;