import React, { useId } from 'react'

const TextArea = React.forwardRef(function TextArea({
    label,
    className = "",
    ...props
}, ref) {
    const id = useId()
    return (
        <div className='w-full'>
            {label && <label
                className='block mb-1 text-gray-700 pl-1'
                htmlFor={id}>
                {label}
            </label>
            }
            <textarea
                className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
                ref={ref}
                {...props}
                id={id}
            />            
        </div>
    )
})

export default TextArea