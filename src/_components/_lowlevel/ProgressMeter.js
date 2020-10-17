import React from 'react';
import './ProgressMeter.css';
const ProgressMeter = ({ progress, style }) => {
    const progressInPercent = (progress * 100).toString() + "%";
    return (
        <div className="ProgressMeter" style={style}>
            <p className="ProgressParagraph">Framsteg</p>
            <div className="ProgressWrapper">
                <div className="Progress" style={{ width: progressInPercent }} />
            </div>
        </div>
    )
}
export default ProgressMeter;