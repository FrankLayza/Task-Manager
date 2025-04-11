import { useState } from 'react';
import {FaSun, FaMoon} from 'react-icons/fa';

const Form = () => {
    const [input, setInput] = useState('')

    return (
        <>
            <div className=" p-20 h-full w-[500px]">
                <div className="flex justify-between mb-5">
                    <h2 className="text-white text-4xl font-normal">TODO</h2>
                    <button><FaSun className='text-white'/></button>
                </div>

                <div className='flex bg-dark-300 w-full p-3'>
                    <label className='inline-flex items-center cursor-pointer mx-2'>
                        <input type="checkbox" className='sr-only peer' />
                        <div className='rounded-full border-gray-600 w-5 h-5 border-2 peer-checked:bg-blue-400 transition'></div>
                    </label>
                    <input value={input} className=" text-gray-400" type="text" placeholder="Create a new todo..."/>
                </div>
            </div>
        </>
    )
}

export default Form;