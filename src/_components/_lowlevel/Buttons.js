import React from 'react';
import './Buttons.css';
import AddIcon from '@material-ui/icons/Add';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import AssignmentIcon from '@material-ui/icons/Assignment';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import BackspaceIcon from '@material-ui/icons/Backspace';
const BackwardsButton = (props) =>
    <div
        style={props.style}
        className="BackwardsButton"
        onClick={props.onClick}
    >
        <div className="BackwardsButtonArrow"/>
        <div className="BackwardsButtonInner"></div>
    </div>
;
const AddButton = (props) =>{
    const style=props.styleType==="small" ? 
    {

    }:
    {
        addIcon:{fontSize:20},
        assignmnentIcon:{fontSize:"16px",marginleft:-5,paddingTop:-3}
    }
    ;
    console.log(style.addIcon);
    return(
        <button 
            className="AddButton" 
            onClick={props.onClick}
        >   

            <AssignmentIcon style={style.assignmentIcon} className="Icon"/>
            <AddIcon style={style.addIcon} className="Icon"/>
        </button>
    );
}
    
;
const SaveButton = (props) =>{
    var style={fontSize:"20px",color:"darkgreen",display:"inline-block",overflow:"visible"};
    if(props.style!==undefined && typeof props.style==='object'){
        const tempStyle=style;
        style=Object.assign(style,props.style);
    }
    return(
<SaveAltIcon onClick={props.onClick} 
            style={style} className="SaveIcon"/>
    )
}

        

;
const ResetButton = (props) =>{
    var style={fontSize:"20px",display:"inline-block",color:"#ED213A",overflow:"visible"};
    if(props.style!==undefined && typeof props.style==='object'){
        const tempStyle=style;
        style=Object.assign(style,props.style);
    }
    return(
        <BackspaceIcon
            style={style}
            onClick={props.onClick}
            className="DeleteIcon"
        />
    )
    

}
const DeleteButton=(props)=>{
    var style={fontSize:"20px",display:"inline-block",color:"#ED213A",overflow:"visible"};
    if(props.style!==undefined && typeof props.style==='object'){
        const tempStyle=style;
        style=Object.assign(style,props.style);
    }
    return(
        <DeleteForeverIcon
            style={style}
            onClick={props.onClick}
            className="DeleteIcon"
        />
    )
}
    
;

    // <div
    //     className="DeleteButton"
    // >
    //     <p>{props.label}</p>
        

    // </div>
;
export {BackwardsButton,AddButton,SaveButton,ResetButton,DeleteButton};
