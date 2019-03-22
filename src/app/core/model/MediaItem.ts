import { environment } from 'src/environments/environment';

export interface IMediaItemResponse {
    vote_count: number;
    id: number;
    video: boolean;
    vote_average: number;
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
    name?: string;
    first_air_date?: string;
}


export class MediaItem {
    public voteAverage: number;
    public posterPath: string;
    public backdropPath: string;
    public releaseDate: Date;
    public id: number;
    public title: string;
    public overview: string;
    public genreIds: { id: number, name: string };
    constructor(item: IMediaItemResponse) {
        this.id = item.id;
        this.title = item.title || item.name;
        this.overview = item.overview;
        this.releaseDate = new Date(item.release_date || item.first_air_date);
        this.voteAverage = Math.ceil((item.vote_average * 100) / 10);
        this.backdropPath = `${environment.imageHost}${item.backdrop_path}`;
        this.posterPath = `${environment.imageHost}${item.poster_path}`;
    }
}
