import React, { useState } from 'react';
import './TextInput.css';
const TextInput = ({ name, value, onChange, style }) =>
    <input
        style={style}
        type="text"
        onChange={
            (event) => {
                event.preventDefault();
                onChange({ [event.target.name]: event.target.value });
            }}
        name={name}
        value={value}
    />
    ;
const FlexibleTextInput = ({ name, value, onChange, style,placeHolder}) => {
    
    const [shiftDown,setShiftDown]=useState(false);
    var numberOfRows=value.split('\n').length;
    const onKeyDown=(event)=>{
        // if(event.key==='Shift' && shiftDown===false){
        //     setShiftDown(true);
        // }    
        // if (event.key==="Enter" && shiftDown){
        //     event.preventDefault();
        //     onSubmit({[name]:event.target.value});
        // }
        if(event.key===" "){
            const forcedRows=value.split('\n');
            if(forcedRows[forcedRows.length-1].length===0){
                event.preventDefault();
            }
        } 
    }
    const onKeyUp=(event)=>{
        if(event.key==='Shift' && shiftDown===true){
            setShiftDown(false);
        }
    }
    const onTextChange = (event) => {
        var newRow=false;
        var newValue=event.target.value;
        if(event.target.value>value){
            var forcedRows=newValue.split('\n');
            const lastRow=forcedRows[forcedRows.length-1];
            if(lastRow.length===40){
                newRow=true;        
            }       
        } 
        const extra=newRow ? '\n':'';
        onChange({
            [name]:event.target.value+extra
        });  
        
    }

    // Ugly
    var usedStyle={height:numberOfRows*40};
    if(style!==undefined && style!==null){
        var tempStyle=usedStyle;
        usedStyle=Object.assign(style,tempStyle);
    } 
    return (
        <textarea
            placeHolder={placeHolder}
            className="TextArea"
            style={usedStyle}
            onKeyDown={onKeyDown}
            onKeyUp={onKeyUp}
            onChange={onTextChange}
            spellCheck="false"
            name={name}
            value={value}
        />
    );
}
const findSomething = () =>{
    // let i=lastRow.length-1;
    //             var foundWhiteSpace=false;
    //             while(i>=0 && !foundWhiteSpace){
    //                 if(lastRow[i]===" "){
    //                     foundWhiteSpace=true;
    //                 }
    //                 i--;
    //             }
    //             forcedRows[forcedRows.length-1].slice(i+1);
}
export {TextInput,FlexibleTextInput};