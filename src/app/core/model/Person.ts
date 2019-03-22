import { MediaItem } from './MediaItem';
import { environment } from 'src/environments/environment';

export interface IPersonResponse {
    popularity: number;
    id: 60073;
    profile_path: string;
    name: string;
    known_for: KnownFor[];
    adult: boolean;
}

interface KnownFor {
    vote_average: number;
    vote_count: number;
    id: number;
    video: boolean;
    media_type: string;
    title: string;
    popularity: number;
    poster_path: string;
    original_language: string;
    original_title: string;
    genre_ids: number[];
    backdrop_path: string;
    adult: boolean;
    overview: string;
    release_date: string;
}

export class Person {
    public id: number;
    public name: string;
    public profilePath: string;
    public knownFor: MediaItem[];
    constructor(person: IPersonResponse) {
        this.id = person.id;
        this.name = person.name;
        this.profilePath = `${environment.imageHost}${person.profile_path}`;
        this.knownFor = person.known_for.map(item => new MediaItem(item));
    }
}
