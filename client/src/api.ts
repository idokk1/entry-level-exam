import axios from 'axios';
import { APIRootPath } from '@fed-exam/config';

export type Ticket = {
    id: string,
    title: string;
    content: string;
    creationTime: number;
    userEmail: string;
    labels?: string[];
}

export type GetTicketsResponse = {
    tickets: Ticket[],
    numOfPages: number;
}

export type ApiClient = {
    getTickets: (search: string, page: number) => Promise<GetTicketsResponse>;
    addTicket: (ticket:Ticket, page:number) => Promise<GetTicketsResponse>;
}

export const createApiClient = (): ApiClient => {
    return {
        getTickets: (search: string, page: number) => {
            return axios.get(APIRootPath,
                {
                    params: {
                        search: search,
                        page: page,
                    }
                }).then((res) => res.data);
        },
        addTicket: (ticket,page) =>{
            return axios.post(`${APIRootPath}/addTicket`,
            {
                params:{
                    ticket:ticket
                }
            }).then((res) => res.data);
        },
    }
}
