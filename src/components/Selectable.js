import React from "react";
import BigCalendar from "react-big-calendar";
import events from "../events";
import moment from "moment";

BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment));

let Selectable = () => (
    <React.Fragment>
        <div>
            <h3 className="callout">
                Click an event to see more info, or drag the mouse over the
                calendar to select a date/time range.
            </h3>
            <BigCalendar
                selectable
                events={events}
                defaultView="week"
                scrollToTime={new Date(1970, 1, 1, 6)}
                defaultDate={new Date(2018, 4, 17)}
                onSelectEvent={event => alert(event.title)}
                onSelectSlot={slotInfo =>
                    alert(
                        `selected slot: \n\nstart ${slotInfo.start.toLocaleString()} ` +
                            `\nend: ${slotInfo.end.toLocaleString()}` +
                            `\naction: ${slotInfo.action}`
                    )
                }
            />
        </div>
    </React.Fragment>
);

export default Selectable;
