// BASEURL path

const BASEURL = 'https://rwe87ecbk9.execute-api.ap-south-1.amazonaws.com/dev/v1' && 'http://127.0.0.1:8000/v1';
// const BASEURL = 'http://13.235.95.248/v1';

const USERURl = BASEURL + '/user';

const PROJECTURL = BASEURL + '/project';

const TICKETURL = BASEURL + '/ticket';

const ADMINURL = BASEURL + '/admin';

export const AdminAPI = {
    getUsers: ADMINURL + '/getUsers'

}


export const UserAPI = {
    login: USERURl + '/login',
    profile: USERURl + '/profile',
    designation: USERURl + '/designation',

};


export const ProjectAPI = {
    createProject: PROJECTURL + '/createProject',
    updateProject: PROJECTURL + '/updateProject',
    deleteProject: PROJECTURL + '/deleteProject',
    getProjects: PROJECTURL + `/getProjects`,
    getProject: PROJECTURL + `/getProject`,
    getProjectDetail: PROJECTURL + '/getProjectDetail',
    getProjectBySearch: PROJECTURL + '/getProjectSearch'

};
export const TicketAPI = {
    createTicket: TICKETURL + '/createTicket',
    updateTicket: TICKETURL + '/updateTicket',
    deleteTicket: TICKETURL + '/deleteTicket',
    getTickets: TICKETURL + '/getTickets',
    addComment: TICKETURL + '/addComment',
    deleteComment: TICKETURL + '/deleteComment',
    updateComment: TICKETURL + '/updateComment',
    getTicketDetails: TICKETURL + '/getTicketDetails',
    uploadTicketAttachments: TICKETURL + '/uploadTicketAttachments',
    updateTicketAttachments: TICKETURL + '/updateTicketAttachments',
    deleteTicketAttachments: TICKETURL + '/deleteTicketAttachments',
    getTicketAttachments: TICKETURL + '/getTicketAttachments',
    updateStatus: TICKETURL + '/updateStatus'
};
