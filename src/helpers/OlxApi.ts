import Cookies from "js-cookie";
import qs from 'qs';

// TYPES
type BodyType = {
    email: string,
    password: string,
    token?: string,
    name?: string,
    state?: string
}
type AdsType = {
    sort: string,
    limit: number
}
type AdType = {
    id: string,
    other: boolean
}
export interface State {
    _id: string;
    name: string;
}
export interface Category {
    img: string;
    name: string;
    slug: string;
    _id: string;
}
export interface Ads {
    id: string;
    image: string;
    price: number;
    priceNegotiable: boolean;
    title: string;
}
export interface Ad {
    category: {
        name: string;
        slug: string;
        _id: string;
    };
    dateCreated: string;
    description: string;
    id: string;
    images: [
        string
    ];
    others: boolean | null;
    price: number;
    priceNegotiable: boolean;
    stateName: string;
    title: string;
    userInfo: {
        email: string;
        name: string;
    };
    views: number
}
// BASE URL
const BASEAPI = 'http://alunos.b7web.com.br:501'
// FETCH
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
const apiFetchGetCategories = async (endpoint: string) => {
    const res = await fetch(`${BASEAPI+endpoint}`);
    const json = await res.json();
    return json;
}
const apiFetchGetAds = async (endpoint: string, options: AdsType) => {
    const res = await fetch(`${BASEAPI+endpoint}`);
    const json = await res.json();
    return json;
}
const apiFetchGetAd = async (endpoint: string, options: AdType) => {
    const res = await fetch(`${BASEAPI+endpoint}?${qs.stringify(options.id)}`);
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
    register: async (name: string, email: string, password: string, stateLoc: string) => {
        const json = await apiFetchPost(
            '/user/signup',
            {name, email, password, state:stateLoc}
        );
        return json;
    },
    getStates: async () => {
        const json = await apiFetchGetStates(
            '/states'
        );
        return json.states;
    },
    getCategories: async () => {
        const json = await apiFetchGetCategories(
            '/categories'
        );
        return json.categories;
    },
    getAds: async (options: AdsType) => {
        const json = await apiFetchGetAds(
            '/ad/list',
            options
        );
        return json;
    },
    getAd: async (id: string, other: boolean) => {
        const json = await apiFetchGetAd(
            '/ad/item',
            {id, other}
        );
        return json;
    }
};
export default () => OlxAPI;