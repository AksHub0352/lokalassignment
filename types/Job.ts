export interface Job {
  id: number;
  title: string;
  primary_details: {
    Place: string;
  };
  company_name: string;
  creatives?: Array<{
    thumb_url: string;
  }>;
}
export interface JobsResponse {
  data: Job[];
  nextPage?: number;
}
