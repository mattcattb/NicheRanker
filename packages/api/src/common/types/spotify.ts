export interface TrackObject {
  album: AlbumObject;
  id: string;
  name: string;
  popularity: number;
}

export interface ArtistObject {
  followers: {
    href: string;
    total: number;
  };
  popularity: number;
  genres: string[];
  images: ImageObject[];
  name: string;
  uri: string;
}

export interface AlbumObject {
  albumType: "album" | "single" | "compilation";
  totalTracks: number;
  id: string;
  href: string;
  images: ImageObject[];
  releaseDate: string;
  uri: string;
  artists: ArtistObject;
}

export interface ImageObject {
  url: string;
  height: number | null;
  width: number | null;
}
