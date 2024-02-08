import React from 'react'

const CountdownTimer = ({days,hours,minutes,seconds}) => {
    return (
        <div classname="counterdown-timer">
            <h1>COUNTDOWN TO STAKING</h1>
            <div className="coundownBox">
                <div className="day">
                    <span>{days}</span>
                    <p>DAYS</p>
                </div>
                <div className="hour">
                    <span>{hours}</span>
                    <p>HOURS</p>
                </div>
                <div className="minute">
                    <span>{minutes}</span>
                    <p>MINUTES</p>
                </div>
                <div className="second">
                    <span>{seconds}</span>
                    <p>SECONDS</p>
                </div>
            </div>
        </div>
    )
}

export default CountdownTimer