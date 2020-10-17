import React from 'react';
import {SaveButton,ResetButton} from '../../_components/_lowlevel/Buttons';
import './ActionRow.css';
const ActionRow = ({ onSave, onReset }) =>
    <div className="ActionRow">
        <SaveButton
            onClick={onSave}
            style={{ marginRight: 20 }}
        />
        <ResetButton
            onClick={onReset}
            style={{ marginRight: 20 }}
        />
    </div>
;
export default ActionRow;