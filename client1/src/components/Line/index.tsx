import type { CSSProperties } from "react";

interface props {
    styles?: CSSProperties,
    size: number,
    color: string,
    top: number,
}

export default ({ top, styles, size, color }: props) => {

    return <div
        style={

            {
                display: 'flex',
                alignItems: 'center',
                position: 'absolute',
                width: '100%',
                height: `${size}px`,
                zIndex: "10000",
                top: `${top}px`,
                translate: `0 50%`,
                ...styles,
            }
        }>
        <div style={{
            width: `${size}px`,
            height: `${size}px`,
            background: `${color}`,
            border: `${size/6}px solid #fff`,
            borderRadius: `50%`
        }}></div>
        <div style={{
            width: '100%',
            height: `${size / 3}px`,
            background: `${color}`
        }}></div>
    </div>
}