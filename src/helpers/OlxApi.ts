import Cookies from "js-cookie";
import qs from 'qs';

// TYPES
export type UserType = {
    name: string,
    email: string,
    state: string,
    ads: AnnouncedType[]
}
type AnnouncedImage = {
    url: string,
    default: boolean
}
export type AnnouncedType = {
    data: {
        id: string,
        image: string,
        images?: AnnouncedImage[],
        price: number,
        priceNegotiable: boolean,
        title: string
    }
}
type BodyType = {
    email?: string,
    password?: string,
    confirmPassword?: string,
    token?: string,
    name?: string,
    state?: string,
    id?: string,
    other?: boolean,
    options?: State | Category | AdsType
}
type AdsType = {
    sort: string,
    limit: number,
    q?: any,
    cat?: any,
    state?: any,
    offset?: any
}
export interface EditAd {
    id: string;
    status: boolean;
    title: string;
    category: string;
    price: number;
    priceNegotiable: boolean;
    description: string;
    images: string[];
    img: string[];
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
export interface AdsInterface {
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
    images: string[];
    others: AdsInterface[];
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

const apiFetchFile = async (endpoint: string, body: any) => {
    if(!body.token) {
        let token = Cookies.get('token');
        if(token) {
            body.append('token', token);
        }
    }
    const res = await fetch(BASEAPI+endpoint, {
        method: 'POST',
        body
    });
    const json = await res.json();
    if(json.notallowed) {
        window.location.href = '/signin';
        return;
    }
    return json;
}
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
const apiFetchGetUser = async (endpoint: string, body: any = []) => {
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
const apiFetchGetStatesAndCategories = async (endpoint: string) => {
    const res = await fetch(`${BASEAPI+endpoint}`);
    const json = await res.json();
    return json;
}
const apiFetchPut = async (endpoint: string, body: BodyType) => {
    if(!body.token) {
        let token = Cookies.get('token');
        if(token) {
            body.token = token;
        }
    }

    const res = await fetch(BASEAPI+endpoint, {
        method: 'PUT',
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

const OlxAPI = {
    // FILE POST
    addAd: async (fData: any) => {
        const json = await apiFetchFile(
            '/ad/add',
            fData
        );
        return json;
    },
    // POST
    updateAd: async (fData: any, itemId: string) => {
        const json = await apiFetchFile(
            `/ad/${itemId}`,
            fData
        );
        return json;
    },
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
    // PUT
    updateUser: async (name: string, email: string, password: string, state: string) => {
        const json = await apiFetchPut(
            '/user/me',
            {name, email, password, state}
        );
        return json;
    },
    // GET STATES AND CATEGORIES
    getStates: async () => {
        const json = await apiFetchGetStatesAndCategories(
            '/states'
        );
        return json.states;
    },
    getCategories: async () => {
        const json = await apiFetchGetStatesAndCategories(
            '/categories'
        );
        return json.categories;
    },
    // GET
    getAds: async (options: AdsType) => {
        const json = await apiFetchGet(
            '/ad/list',
            options
        );
        return json;
    },
    getAd: async (id: string | undefined, other: boolean = false) => {
        const json = await apiFetchGet(
            '/ad/item',
            {id, other}
        );
        return json;
    },
    getUser: async () => {
        const json = await apiFetchGetUser(
            '/user/me'
        );
        return json;
    }
};
export default () => OlxAPI;