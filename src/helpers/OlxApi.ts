import Cookies from "js-cookie";
import qs from 'qs';

type BodyType = {
    email: string,
    password: string,
    token?: string
}
export interface State {
    _id: string;
    name: string;
}

const BASEAPI = 'http://alunos.b7web.com.br:501'

const apiFetchPost = async (endpoint: string, body: BodyType) => {
    if(!body.token) {
        let token = Cookies.get('token');
        if(token) {
            body.token = token;
        }
    }

    const res = await fetch(BASEAPI+endpoint, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(body)
    });
    const json = await res.json();

    if(json.notallowed) {
        window.location.href = '/signin';
        return;
    }

    return json;
}
const apiFetchGet = async (endpoint: string, body: BodyType) => {
    if(!body.token) {
        let token = Cookies.get('token');
        if(token) {
            body.token = token;
        }
    }

    const res = await fetch(`${BASEAPI+endpoint}?${qs.stringify(body)}`);
    const json = await res.json();

    if(json.notallowed) {
        window.location.href = '/signin';
        return;
    }

    return json;
}
const apiFetchGetStates = async (endpoint: string) => {
    const res = await fetch(`${BASEAPI+endpoint}`);
    const json = await res.json();
    return json;
}

const OlxAPI = {
    login: async (email: string, password: string) => {
        const json = await apiFetchPost(
            '/user/signin',
            {email, password}
        );
        return json;
    },
    getStates: async () => {
        const json = await apiFetchGetStates(
            '/states'
        );
        return json.states;
    }
};

export default () => OlxAPI;