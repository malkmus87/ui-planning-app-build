import React from 'react';
import './StickyList.css';
const StickyList = ({stickAtHeight,height,style,...rest}) => {
    const actualHeight=height-10;

    return (
        <div className="StickyList" style={{...style,top:stickAtHeight,height:actualHeight, paddingTop:10,paddingBottom:5}}>
            <ButtonList
                {...rest}
            />
        </div>
    )
}
const ButtonList = ({labels,onButtonClick,buttonStyle,activeIndex}) => 
    <div className="ButtonList">
    {labels.map((label, i) => (
        <button
            style={{...getStyle(i,activeIndex),...buttonStyle}}
            onClick={() => onButtonClick(i)}
        >
            {label}
        </button>
    ))}
    </div>
;
const getStyle = (value1, value2) => {
    return value2.toString() === value1.toString()
        ? { borderBottom: "3px steelblue solid", marginBottom: -3 }
        : {};
};
export default StickyList

export {ButtonList};