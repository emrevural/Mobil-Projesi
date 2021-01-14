export class Movie{

    id: number;
    title: string;
    posterPath: string;
    backdropPath: string;
    voteCount: number;
    voteAverage: number;
    popularity: number;
    overview: string;
    genreIds: Array<number>;
}

export class Results
{
results: Array<Movie>;
page: number;
totalResults: number;
}
