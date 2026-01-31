import { Paper, Typography, Grid, Box, Chip } from "@mui/material";

function CurrentVotesSummary({ userVotes, dishes, getRankLabel }) {
  const selectedCount = Object.keys(userVotes).length;

  if (selectedCount === 0) return null;

  return (
    <Paper elevation={3} sx={{ p: 3, mt: 4, bgcolor: "grey.50" }}>
      <Typography variant="h6" gutterBottom fontWeight="bold">
        📊 Your Current Votes
      </Typography>
      <Grid container spacing={2}>
        {Object.entries(userVotes).map(([dishId, rank]) => {
          const dish = dishes?.find((d) => d.id === parseInt(dishId));
          if (!dish) return null;

          const { label, points, color } = getRankLabel(rank);

          return (
            <Grid item xs={12} sm={4} key={dishId}>
              <Box
                sx={{
                  p: 2,
                  bgcolor: "white",
                  borderRadius: 1,
                  border: "2px solid",
                  borderColor: color,
                }}
              >
                <Typography variant="subtitle2" fontWeight="bold">
                  {dish.dishName}
                </Typography>
                <Chip
                  size="small"
                  label={`${label} (${points} pts)`}
                  sx={{
                    mt: 1,
                    bgcolor: color,
                    color: "white",
                    fontWeight: "bold",
                  }}
                />
              </Box>
            </Grid>
          );
        })}
      </Grid>
    </Paper>
  );
}

export default CurrentVotesSummary;