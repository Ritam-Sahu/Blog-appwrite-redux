import React, {useId} from "react";

function Select({
    options, // array of dropdown values
    label,
    className = "",
    ...props
}, ref){

    const id = useId();
    

    return(
        <div className="w-full">
            {label && (<label htmlFor={id} className="">{label}</label>)}
            <select name="" id={id} {...props} ref={ref} className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border-gray-200 w-full ${className}`}>

            {/* It loops through the options array and creates one <option> element for each value. */}

                {options?.map((option)=>(
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}

            </select>
        </div>
    )
}

export default React.forwardRef(Select)

// 🟢 When do we use backticks?
// you mix static + dynamic values


/**
 * Reusable Select (dropdown) component
 * Supports:
 * - forwardRef (parent can control/select DOM element)
 * - dynamic options rendering
 * - accessibility via unique id
 * - custom styles & extra props
 */