export interface Game{
    id: string;
    background_image: string;
    name: string;
    released: string;
    metacritic_url: string;
    website: string;
    metacritic: number;
    genres: Array<Genre>;
    description: string;
    description_raw: string;
    parent_platforms: Array<ParentPlatform>;
    publishers: Array<Publishers>;
    ratings: Array<Rating>;
    ratings_count:number;
    screenshots: Array<Screenshots>;
    trailers: Array<Trailer>;
    stores: Array<Stores>;
    developers: Array<Developer>;
    esrb_rating: {
        name:string;
    };
    playtime: string;
}


export interface APIResponse<T> {
    results: Array<T>;
}

// export interface APIResponse<Game> {
//     results: Array<Game>;
// }


interface Genre {
    name: string;
}

interface ParentPlatform {
    platform: {
        name: string;
        slug: string;
    };
}

interface Publishers {
    name: string;
}

interface Rating {
    id: number;
    count: number;
    title: string;
}
interface Screenshots {
    image:string;
}

interface Trailer {
    data: {
        max: string;
        480: string;
        name:string;
    };
    preview: string;

}
interface Stores{
    store: {
        id:number;
        name:string;
        slug:string;
        domain: string;
    }
}
interface Developer {
    name:string;
}