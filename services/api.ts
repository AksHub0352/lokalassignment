import { Job, JobsResponse } from "../types/Job";

const BASE_URL = "https://testapi.getlokalapp.com";

export const fetchJobs = async (page: number = 1): Promise<JobsResponse> => {
  const response = await fetch(`${BASE_URL}/common/jobs?page=${page}`);
  if (!response.ok) throw new Error("Failed to fetch jobs");
  const data = await response.json();
  return {
    data: data.results || [],
    nextPage: page + 1,
  };
};
