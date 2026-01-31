import { Box, Typography, Paper, Chip } from "@mui/material";
import { EmojiEvents as TrophyIcon, Star as StarIcon } from "@mui/icons-material";

function DishesHeader({ selectedCount, maxSelections, getRankLabel }) {
  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h4" gutterBottom fontWeight="bold">
        🍽️ Vote for Your Favorite Dishes
      </Typography>
      <Typography variant="body1" color="text.secondary" gutterBottom>
        Select your top 3 dishes and rank them. Click any rank to assign it - it will
        automatically move from any previously ranked dish.
      </Typography>

      <Paper
        elevation={2}
        sx={{
          p: 2,
          mt: 2,
          bgcolor: selectedCount === maxSelections ? "success.light" : "primary.light",
          color: "white",
        }}
      >
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography variant="h6">
            Your Selections: {selectedCount}/{maxSelections}
          </Typography>
          {selectedCount === maxSelections && (
            <Chip
              icon={<StarIcon />}
              label="All votes cast!"
              color="success"
              sx={{ bgcolor: "white", color: "success.main" }}
            />
          )}
        </Box>
      </Paper>

      <Box sx={{ display: "flex", gap: 2, mt: 2, flexWrap: "wrap" }}>
        {[1, 2, 3].map((rank) => {
          const { label, points, color } = getRankLabel(rank);
          return (
            <Chip
              key={rank}
              icon={<TrophyIcon />}
              label={`${label} = ${points} points`}
              sx={{
                bgcolor: color,
                color: "white",
                fontWeight: "bold",
              }}
            />
          );
        })}
      </Box>
    </Box>
  );
}

export default DishesHeader;