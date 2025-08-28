export const getDifficultyColor = (difficulty: string): string => {
  switch (difficulty) {
    case "beginner":
      return "bg-green-500";
    case "intermediate":
      return "bg-yellow-500";
    case "advance":
      return "bg-red-500";
    default:
      return "bg-gray-500";
  }
};

export const getDifficultyText = (difficulty: string): string => {
  switch (difficulty) {
    case "beginner":
      return "Beginner";
    case "intermediate":
      return "Intermediate";
    case "advance":
      return "Advance";
    default:
      return "Unknown";
  }
};
