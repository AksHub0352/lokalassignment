import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Job } from "../types/Job";

interface JobCardProps {
  job: Job;
  onPress: (job: Job) => void;
}

const JobCard = ({ job, onPress }: JobCardProps) => {
  const title = job.title?.trim();
  const location = job.primary_details?.Place?.trim();

  if (!title || !location) {
    return null;
  }

  const thumbnailUrl =
    job.creatives && job.creatives.length > 0
      ? job.creatives[0].thumb_url
      : "https://via.placeholder.com/50";

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => onPress(job)}
      activeOpacity={0.8}
    >
      <View style={styles.content}>
        <Image source={{ uri: thumbnailUrl }} style={styles.thumbnail} />
        <View style={styles.infoContainer}>
          <Text style={styles.title} numberOfLines={2}>
            {title}
          </Text>
          <Text style={styles.company}>{job.company_name}</Text>
          <View style={styles.detailsRow}>
            <View style={styles.detailItem}>
              <Ionicons name="location-outline" size={16} color="#666" />
              <Text style={styles.detailText}>{location}</Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    borderRadius: 12,
    marginHorizontal: 16,
    marginVertical: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: "hidden",
  },
  content: {
    flexDirection: "row",
    padding: 12,
  },
  thumbnail: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },
  infoContainer: {
    flex: 1,
    marginLeft: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  company: {
    fontSize: 14,
    color: "#666",
    marginBottom: 6,
  },
  detailsRow: {
    flexDirection: "row",
    marginBottom: 4,
  },
  detailItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 12,
  },
  detailText: {
    fontSize: 13,
    color: "#666",
    marginLeft: 4,
  },
});

export default JobCard;
