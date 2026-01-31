import { Box, Typography, Paper, Chip } from "@mui/material";
import { EmojiEvents as TrophyIcon } from "@mui/icons-material";

function PollResultsHeader({ totalVoters, totalVotes }) {
  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h4" gutterBottom fontWeight="bold">
        📊 Poll Results
      </Typography>
      <Typography variant="body1" color="text.secondary" gutterBottom>
        See how dishes rank based on votes from all users. Higher points mean more popular dishes!
      </Typography>

      <Paper elevation={2} sx={{ p: 2, mt: 2, bgcolor: "primary.light", color: "white" }}>
        <Box display="flex" gap={3} flexWrap="wrap">
          <Chip
            icon={<TrophyIcon />}
            label={`Total Voters: ${totalVoters}`}
            sx={{ bgcolor: "white", color: "primary.main", fontWeight: "bold" }}
          />
          <Chip
            icon={<TrophyIcon />}
            label={`Total Votes Cast: ${totalVotes}`}
            sx={{ bgcolor: "white", color: "primary.main", fontWeight: "bold" }}
          />
        </Box>
      </Paper>

      <Box sx={{ display: "flex", gap: 2, mt: 2, flexWrap: "wrap" }}>
        <Chip label="🥇 Rank 1 = 30 points" sx={{ bgcolor: "#FFD700", color: "white", fontWeight: "bold" }} />
        <Chip label="🥈 Rank 2 = 20 points" sx={{ bgcolor: "#C0C0C0", color: "white", fontWeight: "bold" }} />
        <Chip label="🥉 Rank 3 = 10 points" sx={{ bgcolor: "#CD7F32", color: "white", fontWeight: "bold" }} />
      </Box>
    </Box>
  );
}

export default PollResultsHeader;