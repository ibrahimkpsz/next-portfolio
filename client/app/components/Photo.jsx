import React from 'react'

const Photo = ({ src, alt }) => {
    return (
        <div className="w-60">
            <img
                className="object-cover rounded-sm aspect-square"
                src={src}
                alt={alt}
            />
        </div>
    )
}

export default Photo