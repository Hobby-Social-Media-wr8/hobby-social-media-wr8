import BigCalendar from 'react-big-calendar'

function BigCalendar () {
    onSlotChange=(slotInfo) =>{
        var startDate = moment(slotInfo.start.toLocaleString()).format("YYYY-MM-DD HH:mm:ss");
        var endDate = moment(slotInfo.end.toLocaleString()).format("YYYY-MM-DD HH:mm:ss");
        console.log('startTime', startDate); //shows the start time chosen
        console.log('endTime', endDate); //shows the end time chosen
    }
    onEventClick =(event) => {
        console.log(event) //Shows the event details provided while booking
    }
    return(
        <div>
            
        </div>
    )
     
}
export default BigCalendar