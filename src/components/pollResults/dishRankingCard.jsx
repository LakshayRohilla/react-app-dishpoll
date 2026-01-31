import {
  Card,
  CardMedia,
  CardContent,
  Box,
  Typography,
  Chip,
  Avatar,
  Divider,
  LinearProgress,
} from "@mui/material";
import { EmojiEvents as TrophyIcon, Person as PersonIcon } from "@mui/icons-material";

function DishRankingCard({ dish, position, maxPoints, currentUsername }) {
  const { dishName, description, image, totalPoints, votes } = dish;

  const percentage = maxPoints > 0 ? (totalPoints / maxPoints) * 100 : 0;

  const getPositionColor = (pos) => {
    if (pos === 1) return "#FFD700";
    if (pos === 2) return "#C0C0C0";
    if (pos === 3) return "#CD7F32";
    return "#9e9e9e";
  };

  const getRankColor = (rank) => {
    if (rank === 1) return "#FFD700";
    if (rank === 2) return "#C0C0C0";
    if (rank === 3) return "#CD7F32";
    return "#9e9e9e";
  };

  const userVote = votes.find((v) => v.username === currentUsername);

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        mb: 3,
        border: userVote ? "3px solid #1976d2" : "1px solid #e0e0e0",
        transition: "all 0.3s",
        position: "relative",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: 6,
        },
      }}
    >

      <Box
        sx={{
          position: "absolute",
          top: 10,
          left: 10,
          zIndex: 2,
        }}
      >
        <Avatar
          sx={{
            bgcolor: getPositionColor(position),
            width: 50,
            height: 50,
            fontWeight: "bold",
            fontSize: "1.2rem",
          }}
        >
          #{position}
        </Avatar>
      </Box>

      {userVote && (
        <Chip
          label="Your Vote"
          color="primary"
          size="small"
          icon={<PersonIcon />}
          sx={{
            position: "absolute",
            top: 70, 
            left: 10,
            zIndex: 2,
            fontWeight: "bold",
          }}
        />
      )}

      <CardMedia
        component="img"
        sx={{
          width: { xs: "100%", sm: 200 },
          height: { xs: 200, sm: "auto" },
          objectFit: "cover",
        }}
        image={image}
        alt={dishName}
      />

      <Box sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
        <CardContent sx={{ flex: "1 0 auto" }}>
          {/* Dish Name and Points */}
          <Box display="flex" justifyContent="space-between" alignItems="start" mb={1}>
            <Typography variant="h5" fontWeight="bold">
              {dishName}
            </Typography>
            <Chip
              icon={<TrophyIcon />}
              label={`${totalPoints} pts`}
              sx={{
                bgcolor: getPositionColor(position),
                color: "white",
                fontWeight: "bold",
                fontSize: "1rem",
              }}
            />
          </Box>

          <Typography variant="body2" color="text.secondary" mb={2}>
            {description}
          </Typography>

          <Box mb={2}>
            <Box display="flex" justifyContent="space-between" mb={0.5}>
              <Typography variant="caption" color="text.secondary">
                Points Progress
              </Typography>
              <Typography variant="caption" fontWeight="bold">
                {percentage.toFixed(1)}%
              </Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={percentage}
              sx={{
                height: 8,
                borderRadius: 4,
                bgcolor: "grey.200",
                "& .MuiLinearProgress-bar": {
                  bgcolor: getPositionColor(position),
                },
              }}
            />
          </Box>

          {votes.length > 0 && (
            <>
              <Divider sx={{ my: 2 }} />
              <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
                Votes Received ({votes.length}):
              </Typography>
              <Box display="flex" flexWrap="wrap" gap={1}>
                {votes.map((vote, idx) => (
                  <Chip
                    key={idx}
                    icon={<PersonIcon />}
                    label={`${vote.username}: Rank ${vote.rank} (${vote.points} pts)`}
                    size="small"
                    variant={vote.username === currentUsername ? "filled" : "outlined"}
                    color={vote.username === currentUsername ? "primary" : "default"}
                    sx={{
                      borderColor: getRankColor(vote.rank),
                      bgcolor: vote.username === currentUsername ? "primary.main" : "transparent",
                      color: vote.username === currentUsername ? "white" : "text.primary",
                    }}
                  />
                ))}
              </Box>
            </>
          )}

          {votes.length === 0 && (
            <Typography variant="body2" color="text.secondary" fontStyle="italic">
              No votes received yet
            </Typography>
          )}
        </CardContent>
      </Box>
    </Card>
  );
}

export default DishRankingCard;