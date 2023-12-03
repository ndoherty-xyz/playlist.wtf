

type SpotifyImagesArray = { url: string, height: number, width: number }[]

export type SimplifiedPlaylist = {
    collaborative: boolean,
    description: string,
    external_urls: {
      spotify: string
    },
    href: string,
    id: string,
    images: SpotifyImagesArray,
    name: string,
    owner: {
      external_urls: {
        spotify: string
      },
      followers: {
        href: string,
        total: number
      },
      href: string,
      id: string,
      type: "user",
      uri: string,
      display_name: string
    },
    public: false,
    snapshot_id: string,
    tracks: {
      href: string,
      total: number
    },
    type: string,
    uri: string
}

export type PlaylistTrack = {
    added_at: string,
    added_by: {
        external_urls: {
            spotify: string
        },
        followers: {
            href: string,
            total: number
        },
        href: string,
        id: string,
        type: "user",
        uri: string
    },
    is_local: false,
    track: Track 
}

export type Track = {
    album: {
        album_type: string,
        total_tracks: number,
        available_markets: string[],
        external_urls: {
          spotify: string
        },
        href: string,
        id: string,
        images: SpotifyImagesArray,
        name: string,
        release_date: string
        release_date_precision: string,
        restrictions: {
          reason: string
        },
        type: "album",
        uri: string
        artists: {
            external_urls: {
              spotify: string
            },
            href: string,
            id: string,
            name: string,
            type: "artist",
            uri: string
        }[]
    },
    artists: {
        external_urls: {
            spotify: string
        },
        followers: {
            href: string,
            total: number
        },
        genres: string[],
        href: string,
        id: string,
        images: SpotifyImagesArray,
        name: string,
        popularity: 0,
        type: "artist",
        uri: string
    }[]
    ,
      available_markets: string[],
      disc_number: 0,
      duration_ms: 0,
      explicit: false,
      external_ids: {
        isrc: string,
        ean: string,
        upc: string
      },
      external_urls: {
        spotify: string
      },
      href: string,
      id: string,
      is_playable: false,
      linked_from: {
      },
      restrictions: {
        reason: string
      },
      name: string,
      popularity: 0,
      preview_url: string,
      track_number: 0,
      type: "track",
      uri: string,
      is_local: false
}

export type CurrentlyPlayingResponse = {
    device: {
        id: string,
        is_active: boolean,
        is_private_session: boolean,
        is_restricted: boolean,
        name: string,
        type: string,
        volume_percent: number,
        supports_volume: boolean
      },
      repeat_state: string,
      shuffle_state: boolean,
      context: {
        type: string,
        href: string,
        external_urls: {
          spotify: string
        },
        uri: string
      },
      timestamp: number,
      progress_ms: number,
      is_playing: boolean,
      item: {
        album: {
          album_type: string,
          total_tracks: number,
          available_markets: string[],
          external_urls: {
            spotify: string
          },
          href: string,
          id: string,
          images: SpotifyImagesArray,
          name: string,
          release_date: string,
          release_date_precision: string,
          restrictions: {
            reason: string
          },
          type: "album",
          uri: string,
          artists:  {
            external_urls: {
            spotify: string
            },
            href: string,
            id: string,
            name: string,
            type: "artist",
            uri: string
          }[]
          
        },
        artists: [
          {
            external_urls: {
              spotify: string
            },
            followers: {
              href: string,
              total: number
            },
            genres: string[],
            href: string,
            id: string,
            images: SpotifyImagesArray,
            name: string,
            popularity: number,
            type: "artist",
            uri: string
          }
        ],
        available_markets: string[],
        disc_number: number,
        duration_ms: number,
        explicit: boolean,
        external_ids: {
          isrc: string,
          ean: string,
          upc: string
        },
        external_urls: {
          spotify: string
        },
        href: string,
        id: string,
        is_playable: boolean,
        linked_from: {
        },
        restrictions: {
          reason: string
        },
        name: string,
        popularity: number,
        preview_url: string,
        track_number: number,
        type: "track",
        uri: string,
        is_local: boolean
      },
      currently_playing_type: string,
      actions: {
        interrupting_playback: boolean,
        pausing: boolean,
        resuming: boolean,
        seeking: boolean,
        skipping_next: boolean,
        skipping_prev: boolean,
        toggling_repeat_context: boolean,
        toggling_shuffle: boolean,
        toggling_repeat_track: boolean,
        transferring_playback: boolean
      }
}

export type PlaybackStateResponse = {
    device: {
        id: string,
        is_active: boolean,
        is_private_session: boolean,
        is_restricted: boolean,
        name: string,
        type: string,
        volume_percent: number,
        supports_volume: boolean
      },
      repeat_state: string,
      shuffle_state: boolean,
      context: {
        type: string,
        href: string,
        external_urls: {
          spotify: string
        },
        uri: string
      },
      timestamp: number,
      progress_ms: number,
      is_playing: boolean,
      item: {
        album: {
          album_type: string,
          total_tracks: number,
          available_markets: string[],
          external_urls: {
            spotify: string
          },
          href: string,
          id: string,
          images: SpotifyImagesArray,
          name: string,
          release_date: string,
          release_date_precision: string,
          restrictions: {
            reason: string
          },
          type: string,
          uri: string,
          artists: {
              external_urls: {
                spotify: string
              },
              href: string,
              id: string,
              name: string,
              type: string,
              uri: string
          }[]
        },
        artists: {
            external_urls: {
              spotify: string
            },
            followers: {
              href: string,
              total: number
            },
            genres: string[],
            href: string,
            id: string,
            images: SpotifyImagesArray,
            name: string,
            popularity: number,
            type: string,
            uri: string
          }[],
        available_markets: string[],
        disc_number: number,
        duration_ms: number,
        explicit: boolean,
        external_ids: {
          isrc: string,
          ean: string,
          upc: string
        },
        external_urls: {
          spotify: string
        },
        href: string,
        id: string,
        is_playable: boolean,
        linked_from: {
        },
        restrictions: {
          reason: string
        },
        name: string,
        popularity: number,
        preview_url: string,
        track_number: number,
        type: string,
        uri: string,
        is_local: boolean
      },
      currently_playing_type: string,
      actions: {
        interrupting_playback: boolean,
        pausing: boolean,
        resuming: boolean,
        seeking: boolean,
        skipping_next: boolean,
        skipping_prev: boolean,
        toggling_repeat_context: boolean,
        toggling_shuffle: boolean,
        toggling_repeat_track: boolean,
        transferring_playback: boolean
      }
}