
export interface DownloadOption {
  quality: string;
  size: string;
  url: string;
}

export interface VideoDetails {
  thumbnailUrl: string;
  title: string;
  author: string;
  downloadOptions: DownloadOption[];
}
