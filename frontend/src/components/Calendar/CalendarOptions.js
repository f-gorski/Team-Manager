import React, { Component } from 'react';
import { v4 as uuid } from 'uuid';

import FullCalendar, { isPropsEqual, getEventClassNames } from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction'

import { AuthContext } from '../../auth/AuthContext';
import UserSelect from './UserSelect';

class CalendarOptions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userList: null,
            selectedUser: null,
            events: [],
            title: "",
            startTime: "",
            error: false
        }
    }

    componentDidMount() {
        fetch(`http://localhost:5000/api/users/${this.context.user.user_id}`)
            .then(response => response.json())
            .then(data => {
                this.setState({
                    userList: data
                })
            console.log(data);
            });
    }

    postEvent = (addInfo) => {
      const {title, start, id} = addInfo
      const postBody = {
        id: id,
        user_id: this.state.selectedUser,
        title: title,
        start: start
      }
      console.log(postBody);

      fetch('http://localhost:5000/api/events', {
                method: 'POST',
                body: JSON.stringify(postBody),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => console.log(response.status, "response:", response));

        this.setState({
            error: false,
            title: "",
            startTime: ""
        })
    }

    removeEvent = (removeInfo) => {
      console.log(removeInfo.event.id)
      
      fetch(`http://localhost:5000/api/events/${removeInfo.event.id}`, {
                method: 'DELETE',
            })
            .then(response => console.log(response.status, "response:", response));
    }

    handleDateSelect = (selectInfo) => {
        console.log("handleDateSelect", this.state)

        if(this.state.title && this.state.startTime) {
            let calendarApi = selectInfo.view.calendar

            console.log(selectInfo.startStr)

            calendarApi.unselect() // clear date selection

            const event = {
                id: uuid(),
                title: this.state.title,
                start: selectInfo.startStr + "T" + this.state.startTime
            }

            this.postEvent(event);

            this.setState((prevState) =>({
                events: [...prevState.events, event]
            }))
        } else {
            this.setState({
                error: true
            })
        }
    }

    handleEventClick = (clickInfo) => {
        if (true) {
          clickInfo.event.remove()
        }
    }
    
   renderEventContent(eventInfo) {
      return (
        <>
          <div><b>{eventInfo.timeText}</b></div>
          <div>{eventInfo.event.title}</div>
        </>
      )
    }

    handleChange = (e) => {
        const {name, value} = e.target;
        this.setState({
            [name]: value
        }) 
    }

    handleUserSelect = (e) => {
        const {name, value} = e.target;
        this.setState({
            [name]: value
        })

        if(value) {
            fetch(`http://localhost:5000/api/events/${value}`)
            .then(response => response.json())
            .then(data => {
                this.setState({
                    events: data
                })
            console.log(data);
            });
        } else {
            this.setState({
                events: []
            })
        }
        
    }
    

    render() {
        return(
            <div className="container">
                <div className="box-calendar">
                    <FullCalendar
                    plugins={[ dayGridPlugin, interactionPlugin ]}
                    initialView="dayGridMonth"
                    editable={true}
                    selectable={true}
                    selectMirror={true}
                    //dayMaxEvents={false}
                    events={this.state.events}
                    select={this.handleDateSelect}
                    eventContent={this.renderEventContent} 
                    eventClick={this.handleEventClick}
                    //eventsSet={this.handleEvents}// called after events are initialized/added/changed/removed
                    // you can update a remote database when these fire:
                    eventAdd={this.postEvent}
                    // eventChange={function(){}}
                    eventRemove={this.removeEvent}
                    />
                </div>

                <div className="box-calendar">
                    <h3>Wybierz użytkownika</h3>
                        <div>
                            <label>
                                Użytkownik:
                                {this.state.userList
                                    ?
                                    <UserSelect userList={this.state.userList} selectedUser={this.state.user} handleChange={this.handleUserSelect}/>
                                    :
                                    null
                                }
                            </label>
                        </div>

                    <h3>Dodaj wydarzenie</h3>
                    <form onSubmit={this.handleSubmit}>
                            <div>
                                <label>
                                    Nazwa wydarzenia:
                                    <input type="text" name="title" value={this.state.title} onChange={this.handleChange}/>
                                </label>
                            </div>

                            <div>
                                <label>
                                    Godzina rozpoczęcia:
                                    <input type="time" name="startTime" value={this.state.startTime} onChange={this.handleChange}/>
                                </label>
                            </div>

                            <div className={this.state.error ? "alert alert-danger" : "alert alert-info"}>
                                1. Wpisz nazwę wydarzenia i godzinę rozpoczęcia
                            </div>

                            <div className="alert alert-info">
                               2. Wybierz datę w kalendarzu aby dodać wydarzenie
                            </div>
                    </form>
                </div>
            </div>

                    

                   
        )
    }
}

CalendarOptions.contextType = AuthContext;

export default CalendarOptions;
