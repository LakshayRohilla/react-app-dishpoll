import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  ButtonGroup,
  Chip,
  Typography,
} from "@mui/material";
import { EmojiEvents as TrophyIcon } from "@mui/icons-material";

function DishCard({ dish, isSelected, currentRank, onRankSelect, getRankLabel }) {
  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        position: "relative",
        border: isSelected ? "3px solid" : "1px solid #e0e0e0",
        borderColor: isSelected ? getRankLabel(currentRank).color : "#e0e0e0",
        transition: "all 0.3s",
        height: "420px",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: 6,
        },
      }}
    >
      {isSelected && (
        <Chip
          icon={<TrophyIcon />}
          label={getRankLabel(currentRank).label}
          sx={{
            position: "absolute",
            top: 10,
            right: 10,
            bgcolor: getRankLabel(currentRank).color,
            color: "white",
            fontWeight: "bold",
            zIndex: 1,
          }}
        />
      )}

      <CardMedia
        component="img"
        sx={{
          height: "200px",
          objectFit: "cover",
        }}
        image={dish.image}
        alt={dish.dishName}
      />

      <CardContent
        sx={{
          flexGrow: 1,
          py: 2,
          px: 2,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          height: "140px",
        }}
      >
        <Typography
          variant="h6"
          gutterBottom
          fontWeight="bold"
          sx={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            lineHeight: 1.3,
            mb: 1,
          }}
        >
          {dish.dishName}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            lineHeight: 1.4,
          }}
        >
          {dish.description}
        </Typography>
      </CardContent>

      <CardActions sx={{ p: 2, pt: 0, mt: "auto" }}>
        <ButtonGroup fullWidth variant="outlined" size="small">
          {[1, 2, 3].map((rank) => {
            const isCurrentRank = currentRank === rank;
            const { color } = getRankLabel(rank);

            return (
              <Button
                key={rank}
                onClick={() => onRankSelect(dish.id, rank)}
                variant={isCurrentRank ? "contained" : "outlined"}
                sx={{
                  borderColor: color,
                  color: isCurrentRank ? "white" : color,
                  bgcolor: isCurrentRank ? color : "transparent",
                  "&:hover": {
                    bgcolor: isCurrentRank ? color : `${color}20`,
                    borderColor: color,
                  },
                  fontWeight: "bold",
                }}
              >
                {rank}
              </Button>
            );
          })}
        </ButtonGroup>
      </CardActions>
    </Card>
  );
}

export default DishCard;