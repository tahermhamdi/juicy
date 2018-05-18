import React from "react";
import BigCalendar from "react-big-calendar";
import events from "../events";
import moment from "moment";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import { Provider } from "react-redux";
import ImageModal from "./ImageModal";
import { Component } from "react";
import { openModal } from "../actions";

BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment));

class Selectable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        console.log("RENDERING BIGCALENDAR : ", this.state);
        return (
            <div className="calendar">
                <BigCalendar
                    selectable
                    events={events}
                    defaultView="week"
                    scrollToTime={new Date(1970, 1, 1, 6)}
                    defaultDate={new Date(2018, 4, 17)}
                    onSelectEvent={event => alert(event.title)}
                    onSelectSlot={slotInfo => {
                        console.log(
                            `selected slot: \n\nstart ${slotInfo.start.toLocaleString()} ` +
                                `\nend: ${slotInfo.end.toLocaleString()}` +
                                `\naction: ${slotInfo.action}`
                        );
                        this.props.dispatch(openModal(slotInfo, events));
                        console.log(
                            "IMAGE CALENDAR TITLE PROPS : " +
                                this.props.imageCalendar
                        );
                        events.push({
                            id: 15,
                            title: "imageConst",
                            start: slotInfo.start,
                            end: slotInfo.end
                        });
                        this.setState({ events: events });
                        //this.props.dispatch(saveEvents());
                    }}
                />
            </div>
        );
    }
}

const mapStateToProps = function(state) {
    console.log("STATE CHECK EVENTS mapStateToProps: ", state);
    return {
        imageslist: state.imageslist || [],
        imageCalendar: state.imageCalendar,
        events: events
    };
};
export default connect(mapStateToProps)(Selectable);
