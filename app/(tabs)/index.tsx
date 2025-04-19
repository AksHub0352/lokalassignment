import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  ActivityIndicator,
  Text,
  StyleSheet,
} from "react-native";
import { fetchJobs } from "../../services/api";
import JobCard from "../../components/JobCard";
import { Job } from "../../types/Job";

const JobListScreen = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  const refreshJobs = async () => {
    setRefreshing(true);
    setError("");
    try {
      const res = await fetchJobs(1);
      setJobs(res.data);
      setPage(res.nextPage ?? 2);
      setHasMore(true);
    } catch (err) {
      setError("Failed to refresh jobs");
    } finally {
      setRefreshing(false);
    }
  };

  const loadJobs = async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const res = await fetchJobs(page);
      setJobs((prev) => [...prev, ...res.data]);
      setPage(res.nextPage ?? page + 1);
      if (res.data.length === 0) setHasMore(false);
    } catch (err) {
      setError("Failed to load jobs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadJobs();
  }, []);

  if (loading && jobs.length === 0)
    return <ActivityIndicator style={styles.centered} />;
  if (error && jobs.length === 0)
    return <Text style={styles.centered}>{error}</Text>;
  if (jobs.length === 0)
    return <Text style={styles.centered}>No jobs found</Text>;

  return (
    <View style={styles.container}>
      <FlatList
        data={jobs}
        keyExtractor={(item, index) =>
          item.id ? item.id.toString() : index.toString()
        }
        renderItem={({ item }) => <JobCard job={item} onPress={() => {}} />}
        onEndReached={loadJobs}
        onEndReachedThreshold={0.5}
        ListFooterComponent={() => {
          if (loading) return <ActivityIndicator style={{ margin: 10 }} />;
          if (!hasMore)
            return (
              <Text style={{ textAlign: "center", margin: 10 }}>
                No more jobs
              </Text>
            );
          return null;
        }}
        refreshing={refreshing}
        onRefresh={refreshJobs}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  centered: {
    marginTop: 50,
    textAlign: "center",
    fontSize: 16,
  },
  container: {
    marginTop: 60,
    marginBottom: 80,
  },
});

export default JobListScreen;
