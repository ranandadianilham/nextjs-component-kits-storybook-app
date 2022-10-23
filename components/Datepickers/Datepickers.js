/* eslint-disable react/display-name */

import { forwardRef, useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import DatePicker from 'react-datepicker';


const Datepickers = ({ dates = [null, null],
    className = "",
    ...props }) => {
    const [dateRange, setDateRange] = useState(dates);
    const [startDate, endDate] = dateRange;

    return (
        <div className={`position-relative ${className}`}>
            <DatePicker
                selectsRange
                selected={dateRange[0]}
                startDate={startDate}
                endDate={endDate}
                onChange={(update) => setDateRange(update)}
                dateFormat="dd/MM/yy"
                customInput={<Forms id="dates" label="Tanggal Tayang" {...props} />}
                monthsShown={2}
            />
            <img
                src="/icons/regular/date.png"
                alt=""
                width={21}
                style={{
                    position: "absolute",
                    top: 13,
                    right: 20,
                }}
            />
        </div>
    );
}

export default Datepickers;

const Forms = forwardRef(({
    id, label, className = '', info, errormessage, ...props
}, ref) => (
    <Form.Group className={`form-basic ${className}`} controlId={id}>
        <Form.Control
            ref={ref}
            className="shadow-none"
            {...props}
        />
        <Form.Label>{label}</Form.Label>
        <ErrorMessage msg={errormessage} />
        <Info msg={info} />
    </Form.Group>
));

function Info({ msg, className }) {
    return <div className={`${className} information-state ${msg ? '' : 'd-none'}`}>{msg}</div>;
}

function ErrorMessage({ msg }) {
    return <Form.Control.Feedback type="invalid">{msg}</Form.Control.Feedback>;
}

//start
Datepickers.SingleDatePickerReportNandaStart = ({
    getDate = () => null,
    isStart = false,
    withoutRangeLimit = false,
    startDate,
    endDate,
    formpurpose,
    value,
    disabled = false,
    placeholderText = "",
    date = null,
    className = '',
    ...props
}) => {
    const [currentDate, setCurrentDate] = useState('');

    useEffect(() => {
        setCurrentDate(value);
    }, [])

    const getFormatedDate = (update) => {
        let d = update ? new Date(update) : new Date();
        let ye = new Intl.DateTimeFormat('en-US', { year: 'numeric' }).format(d);
        let mo = new Intl.DateTimeFormat('en-US', { month: '2-digit' }).format(d);
        let da = new Intl.DateTimeFormat('en-US', { day: '2-digit' }).format(d);
        let currentDate = `${ye}-${mo}-${da}`;
        let date = new Date();

        if (ye && mo && da) {
            date = currentDate
        }

        return date;
    }
    //console.log("current date", currentDate);
    return (
        <div className={`position-relative ${className} `}>
            <DatePicker
                //selectsRange
                selectsStart
                selected={currentDate === '' ? value : currentDate}
                //date={date}
                minDate={!withoutRangeLimit ? moment().toDate() : false}
                startDate={startDate}
                endDate={endDate}
                onChange={(update) => {
                    setCurrentDate(update)
                    getDate(getFormatedDate(update) + " 00:00:00")/* +new Intl.DateTimeFormat('en-US', { timeStyle: 'medium', hourCycle: 'h23' }).format(new Date)) */;
                }}
                dateFormat="yyyy-MM-dd"
                placeholderText={placeholderText}
                disabled={disabled}

                customInput={(
                    <Datepickers
                        id="dates"
                        label="Tanggal Tayang"

                        {...props}
                    />
                )}
                monthsShown={1}
            />
            <img
                src="/icons/multicolor/date_orange.png"
                alt=""
                width={21}
                style={{
                    position: 'absolute',
                    top: 13,
                    right: 20,
                }}
            />
            {/* <span class="report-floating-title">{placeholderText}</span> */}
        </div>
    );
};

//end
Datepickers.SingleDatePickerReportNandaEnd = ({
    getDate = () => null,
    isStart = false,
    startDate,
    endDate,
    formpurpose,
    value,
    disabled = false,
    placeholderText = "",
    date = null,
    className = '',
    ...props
}) => {
    const [currentDate, setCurrentDate] = useState('');
    useEffect(() => {
        setCurrentDate(value);
    }, [])

    const getFormatedDate = (update) => {
        let d = update ? new Date(update) : new Date();
        let ye = new Intl.DateTimeFormat('en-US', { year: 'numeric' }).format(d);
        let mo = new Intl.DateTimeFormat('en-US', { month: '2-digit' }).format(d);
        let da = new Intl.DateTimeFormat('en-US', { day: '2-digit' }).format(d);
        let current = `${ye}-${mo}-${da}`;
        let date = new Date();

        if (ye && mo && da) {
            date = current
        }

        return date;
    }
    //console.log("current date", startDate);
    return (
        <div className={`position-relative ${className}`}>
            <DatePicker
                //selectsRange
                selectsEnd
                selected={currentDate === '' ? value : currentDate}
                //date={date}
                onChange={(update) => {
                    setCurrentDate(update)
                    getDate(getFormatedDate(update) + " 00:00:00")/* +new Intl.DateTimeFormat('en-US', { timeStyle: 'medium', hourCycle: 'h23' }).format(new Date)) */;
                }}
                startDate={startDate}
                endDate={endDate}
                minDate={startDate}
                dateFormat="yyyy-MM-dd"
                placeholderText={placeholderText}
                disabled={disabled}
                /*  value={value === "" || value === null || value === false ? "" : getFormatedDate(value)} */
                customInput={(
                    <Datepickers
                        id="dates"
                        label="Tanggal Tayang"

                        {...props}
                    />
                )}
                monthsShown={1}
            />
            <img
                src="/icons/multicolor/date_orange.png"
                alt=""
                width={21}
                style={{
                    position: 'absolute',
                    top: 13,
                    right: 20,
                }}
            />
        </div>
    );
};