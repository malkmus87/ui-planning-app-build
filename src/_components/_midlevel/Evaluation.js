import React,{useState} from 'react';
import {FlexibleTextInput} from '../_lowlevel/TextInput';
import ActionRow from '../_midlevel/ActionRow';
import './Evaluation.css';
class Evaluation extends React.Component{
    constructor(props){
        super(props);
        this.state={

        }
    }
    componentDidMount(){
        this.setInitialState();
    }
    componentDidUpdate(prevProps){
        console.log(this.props.evaluation['_id']);
        if (this.props.evaluation['_id'] !== prevProps.evaluation['_id']) {
            this.setInitialState();
        }
    }
    onInputChange = (newValue) => {
        this.setState({ ...newValue });
    }
    setInitialState(){
        this.setState({ initialText: this.props.evaluation.text, text: this.props.evaluation.text, mounted: true });
    }
    onSave = ()=>{
        var id=false;
        if(this.props.evaluation['_id']!==undefined){
            id=this.props.evaluation['_id'];
        }
        this.props.onEvaluationChange(this.props.type,id,{text:this.state.text}); 
    }
    onReset = ()=>{
        this.setState({text:this.state.initialText});
    }
    render(){
        return(
            this.state.text!==undefined ?
            <div className="Evaluation" style={this.props.style}>
            <p className="ProgressParagraph">Utvärdering</p>
            <FlexibleTextInput
                name="text"
                value={this.state.text}
                placeHolder="Skriv vad som gått bra och dåligt"
                style={{width:"calc(100% - 15px)",background:"transparent",borderBottom:"3px grey solid"}}  
                onChange={this.onInputChange}
            />
            {this.state.initialText!==this.state.text ? 
                <ActionRow
                    onSave={this.onSave}
                    onReset={this.onReset}
                />
                :null
            }
            
        </div>
        :null
        )
    }
}
export default Evaluation;