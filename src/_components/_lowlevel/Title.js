import React from 'react';
import './Title.css';
const Title = ({text,type,style,textStyle}) =>{
    var usedClassName="TitleDefault";
    if(type!==undefined){
        if(type==="Centered"){
            usedClassName="TitleCentered"
        }
    }
    return(
        <div className={usedClassName} style={style}>
            {/* <div className="TitleInner"> */}
            <h2 className="TitleText" style={textStyle}>{text}</h2>
            {/* </div> */}

        </div>
    )
}
export default Title;