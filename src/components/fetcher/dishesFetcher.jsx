import { useSelector, useDispatch } from "react-redux";
import { Container, Box, Alert } from "@mui/material";
import { toast } from "react-toastify";
import Spinner from "../shared/UI/spinner";
import AlertMessage from "../shared/UI/alertMessage";
import { useGetDishesQuery } from "../../store/slices/dishesApiSlice";
import { setVote, selectUserVotes } from "../../store/slices/votesSlice";
import { selectCurrentUser } from "../../store/slices/authSlice";
import DishesHeader from "../dishes/dishesHeader";
import DishCard from "../dishes/dishCard";
import CurrentVotesSummary from "../dishes/currentVotesSummary";

function DishesFetcher() {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const { data: dishes, isLoading, isError, error } = useGetDishesQuery();
  const userVotes = useSelector(selectUserVotes(currentUser?.username));

  const selectedCount = Object.keys(userVotes).length;
  const maxSelections = 3;

  const handleRankSelection = (dishId, rank) => {
    const currentRank = userVotes[dishId];
    const dish = dishes?.find((d) => d.id === dishId);

    // If clicking the same rank on the same dish, deselect it
    if (currentRank === rank) {
      dispatch(
        setVote({
          username: currentUser.username,
          dishId,
          rank: null,
        })
      );
      toast.info("Vote removed");
      return;
    }

    const dishWithThisRank = Object.entries(userVotes).find(
      ([id, r]) => r === rank && parseInt(id) !== dishId
    );

    if (!currentRank) {
      if (selectedCount >= maxSelections && !dishWithThisRank) {
        toast.warning(
          `You can only select ${maxSelections} dishes. Please remove a rank from another dish first.`
        );
        return;
      }
    }

    dispatch(
      setVote({
        username: currentUser.username,
        dishId,
        rank,
      })
    );

    const rankLabels = { 1: "1st", 2: "2nd", 3: "3rd" };

    if (dishWithThisRank) {
      const previousDish = dishes?.find((d) => d.id === parseInt(dishWithThisRank[0]));
      if (previousDish) {
        toast.success(
          `Rank ${rank} moved from "${previousDish.dishName}" to "${dish.dishName}"!`
        );
      } else {
        toast.success(`Ranked as ${rankLabels[rank]}!`);
      }
    } else if (currentRank) {
      toast.success(`Changed from Rank ${currentRank} to Rank ${rank}!`);
    } else {
      toast.success(`Ranked as ${rankLabels[rank]}!`);
    }
  };

  const getRankLabel = (rank) => {
    const labels = {
      1: { label: "Rank 1", points: 30, color: "#FFD700" },
      2: { label: "Rank 2", points: 20, color: "#C0C0C0" },
      3: { label: "Rank 3", points: 10, color: "#CD7F32" },
    };
    return labels[rank];
  };

  const isDishSelected = (dishId) => {
    return userVotes[dishId] !== undefined;
  };

  const getDishRank = (dishId) => {
    return userVotes[dishId];
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <DishesHeader
        selectedCount={selectedCount}
        maxSelections={maxSelections}
        getRankLabel={getRankLabel}
      />

      {isLoading && (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
          <Spinner />
        </Box>
      )}

      {isError && (
        <AlertMessage severity="error">
          {error?.data?.message || error?.error || "Failed to load dishes. Please try again."}
        </AlertMessage>
      )}

      {dishes && dishes.length > 0 && (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              md: "repeat(2, 1fr)",
              lg: "repeat(3, 1fr)",
            },
            gap: 3,
          }}
        >
          {dishes.map((dish) => (
            <DishCard
              key={dish.id}
              dish={dish}
              isSelected={isDishSelected(dish.id)}
              currentRank={getDishRank(dish.id)}
              onRankSelect={handleRankSelection}
              getRankLabel={getRankLabel}
            />
          ))}
        </Box>
      )}

      {dishes && dishes.length === 0 && (
        <Alert severity="info" sx={{ mt: 4 }}>
          No dishes available at the moment.
        </Alert>
      )}

      <CurrentVotesSummary
        userVotes={userVotes}
        dishes={dishes}
        getRankLabel={getRankLabel}
      />
    </Container>
  );
}

export default DishesFetcher;