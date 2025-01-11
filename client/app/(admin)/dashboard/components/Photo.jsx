import React from 'react'
import ChangePhoto from './ChangePhoto'

const Photo = ({ userHandler, src, alt }) => {
    return (
        <div className="relative w-60 group">
            <div className="relative">
                <img
                    className="object-cover transition-all duration-300 rounded-sm aspect-square"
                    src={src}
                    alt={alt}
                />
                <div className="absolute inset-0 transition-opacity duration-300 rounded-sm opacity-0 bg-black/30 backdrop-blur-sm group-hover:opacity-100" />
            </div>
            <div className="absolute text-white transition-opacity -translate-x-1/2 -translate-y-1/2 opacity-0 top-1/2 left-1/2 group-hover:opacity-100">
                <ChangePhoto onChangePhoto={userHandler} />
            </div>
        </div>
    )
}

export default Photo