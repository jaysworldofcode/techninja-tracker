import axios from "axios";

class Login {

    email;
    password;

    constructor(email, password) {
        this.email = email;
        this.password = password;
    }

    async start(){
        return await axios.post(process.env.VUE_APP_API_URL+'auth/login', {
            email: this.email,
            password: this.password,
        }).then(function (res) {
            return res;
        }).catch(function (error) {
            return {
                error: error.response.data.message
            };
        });
    }
}

export default Login;