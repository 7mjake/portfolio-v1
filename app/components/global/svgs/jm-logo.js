import * as React from "react"

const JmLogo = ({ className, ...props }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 11 7"
        fill="none"
        className={className}
        {...props}
    >
        <path
            fill="currentColor"
            d="M2 7C.9 7 0 6.1 0 5V3c1.1 0 2 .9 2 2v2ZM3 7V0h2v5c0 1.1-.9 2-2 2ZM8 7H6V0c1.1 0 2 .9 2 2v5ZM11 7H9V0c1.1 0 2 .9 2 2v5Z"
        />
    </svg>
)

export default JmLogo