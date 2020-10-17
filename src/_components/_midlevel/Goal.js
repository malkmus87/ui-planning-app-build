import React from 'react';
import CheckIcon from '@material-ui/icons/Check';
import './Goal.css';
import {FlexibleTextInput} from '../_lowlevel/TextInput';
import ActionRow from '../_midlevel/ActionRow';

const getStyle = (type) => {
    switch (type) {
        case("dailygoal"):
            return {
                input:{borderRadius:"4px 0 0 1px"},
                main:{padding:0,width:"100%",display:"inline-block"}
            }
        default:
            return {
                input: {borderRadius:"4px 0 0 1px"},
                main: { width: "100%"}
            };
    }
}
export default class ShortTermGoal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            initialTodo: "",
            todo: ""
        }
    }
    setInitialState = () => {
        this.setState({ initialTodo: this.props.todo, todo: this.props.todo, mounted: true });
    }
    componentDidMount = () => {
        this.setInitialState();
    }
    componentDidReceiveProps = (prevProps) => {
        if (this.props['_id'] !== prevProps['_id'] || this.props.todo!==prevProps.todo) {
            this.setInitialState();
        }
    }
    onInputChange = (newValue) => {
        this.setState({ ...newValue });
    }
    onCheckBoxClick = () => {
        let finished = this.props.finished ? false:true;
        this.props.onGoalChange(this.props.type, this.props['_id'], { finished: finished });
    }
    onSave = ()=>{
        if(this.state.todo.length>0){
            this.setState({initialTodo:this.state.todo,todo:this.state.todo});
            this.props.onGoalChange(this.props.type, this.props['_id'], { todo:this.state.todo });         
        }    
    }
    onReset = ()=>{
        this.setState({todo:this.state.initialTodo});
    }
    render() {
        const style = getStyle(this.props.styleType);
        return (
            this.state.mounted ?
                <div className="Goal" style={style.main} key={this.props['_id']}>
                    <div className="InputRow">
                        <FlexibleTextInput
                            name="todo"
                            value={this.state.todo}
                            style={style.input}
                            placeHolder={this.props.placeHolder !==undefined ? this.props.placeHolder:"Beskriv ditt mål"}
                            onChange={this.onInputChange}
                            onSubmit={this.onSave}
                     
                        />
                        {this.state.initialTodo.length>0 ?
                        <div
                            className="CheckIconWrapper"
                            onClick={this.onCheckBoxClick}
                        >
                            {this.props.finished ?
                                <CheckIcon
                                    className="CheckIcon"
                                /> : null
                            }
                        </div>
                        :null
                        }
                    </div>
                    {this.state.todo !== this.state.initialTodo ?
                        <ActionRow
                            onSave={this.onSave}
                            onReset={this.onReset}
                            style={{marginRight:20}}
                        />
                        : null
                    }
                   
                </div>
                : null
        )
    }
}
