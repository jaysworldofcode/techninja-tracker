import axios from "axios";

class TimerSessionRepository {

    username;
    session_token;
    agency_code;
    current_task;

    constructor(username, session_token, agency_code, current_task) {
        this.username = username;
        this.session_token = session_token;
        this.agency_code = agency_code;
        this.current_task = current_task;
    }

    static async get(page=1, per_page=20, client_id, query = {}, token){
        var query_string = '';

        //build param query string
        for (const [key, value] of Object.entries(query)) {
            query_string = query_string+'&'+key+'='+value;
        }

        return await axios.get(
            `${process.env.VUE_APP_API_URL}timer_session?page=${page}&per_page=${per_page}&client_id=${client_id}${query_string}`,
            {
                headers: {
                    'Authorization': 'JWT '+token
                }
            }
        )
        .then(res => {
            return res.data;
        });
    }
}

export default TimerSessionRepository;