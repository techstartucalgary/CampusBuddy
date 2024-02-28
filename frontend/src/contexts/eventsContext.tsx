import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { PropsWithChildren } from "react";
import { createContext } from "react";
import { mockSearchEvents } from "~/mockData/EventData";

type Event = {
    id: string,
    name: string
    date: string,
    location: string,
    clubName: string,
    picture: string
}

type eventsContext = {
    events: Event[],
    eventsByUOfC: Event[]
};
const EventsContext = createContext<eventsContext | null>(null);

export const EventsContextProvider = ({ children }: PropsWithChildren): JSX.Element => {
    const { data: events, refetch: refreshEvents } = useQuery({
        queryKey: ['events'],
        queryFn: async () => {
            let response = await (await fetch('/api/getAllEvents')).json();
            let response2 = await axios.get('/api/getAllEvents');
            return mockSearchEvents
        },
        initialData: []
    })

    const { variables, mutate, isPending } = useMutation({
        mutationFn: async ({ type }: any) => {
            if(type === 'likingEvent') {
                // code to like an event
            }
            else if(type === 'createEvent') {
                // code to create an event
            }
            refreshEvents()
        }
    });

    const likeEvent = () => {
        mutate({ type: 'likingEvent'})
    }

    const createEvent = () => {
        mutate({ type: 'createEvent'})
    }

    const eventsByUOfC =  events.filter(event => event.clubName === "uofc")

    return (
        <EventsContext.Provider value={{ events, eventsByUOfC }}>
            {children}
        </EventsContext.Provider>
    );
};

export default EventsContext;