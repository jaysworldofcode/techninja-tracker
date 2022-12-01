import axios from "axios";

class TimerSessionRepository {

    username;
    session_token;
    agency_code;
    current_task;
    response;

    constructor(username, session_token, agency_code, current_task) {
        this.username = username;
        this.session_token = session_token;
        this.agency_code = agency_code;
        this.current_task = current_task;
    }

    async save(){
       await axios.post('http://localhost:3000/timer_session/start', {
            username: this.username,
            session_token: this.session_token,
            task: this.current_task,
            client_id: 1
        }).then(function (response) {
            console.log(response);
        }).catch(function (error) {
            console.log(error);
        });
    }

    static async get(page=1, per_page=20, client_id=1, query = {}){
        let response;

        var query_string = '';

        //build param query string
        for (const [key, value] of Object.entries(query)) {
            query_string = query_string+'&'+key+'='+value;
        }

        await axios
        .get(`http://localhost:3000/timer_session?page=${page}&per_page=${per_page}&client_id=${client_id}${query_string}`)
        .then(res => {
            return response = res.data;
        });

        return response;
    }

    static async stop(token){
        await axios.post('http://localhost:3000/timer_session/stop/'+token, {}
        ).then(function (response) {
            console.log(response);
        }).catch(function (error) {
            console.log(error);
        });
    }
}

export default TimerSessionRepository;