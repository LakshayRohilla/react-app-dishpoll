import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container, Box, Alert } from "@mui/material";
import Spinner from "../shared/UI/spinner";
import AlertMessage from "../shared/UI/alertMessage";
import { useGetDishesQuery } from "../../store/slices/dishesApiSlice";
import { selectAllVotes } from "../../store/slices/votesSlice";
import { calculatePollResults, selectPollResults } from "../../store/slices/pollSlice";
import { selectCurrentUser } from "../../store/slices/authSlice";
import PollResultsHeader from "../pollResults/pollResultsHeader";
import DishRankingCard from "../pollResults/dishRankingCard";

function PollResultsFetcher() {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const { data: dishes, isLoading, isError, error } = useGetDishesQuery();
  const allVotes = useSelector(selectAllVotes);
  const pollResults = useSelector(selectPollResults);

  useEffect(() => {
    if (dishes && dishes.length > 0) {
      dispatch(calculatePollResults({ dishes, allVotes }));
    }
  }, [dishes, allVotes, dispatch]);

  const totalVoters = Object.keys(allVotes).length;
  const totalVotes = Object.values(allVotes).reduce(
    (sum, userVotes) => sum + Object.keys(userVotes).length,
    0
  );

  const maxPoints = pollResults.length > 0 ? pollResults[0].totalPoints : 0;

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <PollResultsHeader totalVoters={totalVoters} totalVotes={totalVotes} />

      {isLoading && (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
          <Spinner />
        </Box>
      )}

      {isError && (
        <AlertMessage severity="error">
          {error?.data?.message || error?.error || "Failed to load poll results. Please try again."}
        </AlertMessage>
      )}

      {pollResults && pollResults.length > 0 && (
        <Box>
          {pollResults.map((dish) => (
            <DishRankingCard
              key={dish.dishId}
              dish={dish}
              position={dish.position}
              maxPoints={maxPoints}
              currentUsername={currentUser?.username}
            />
          ))}
        </Box>
      )}

      {pollResults && pollResults.length === 0 && (
        <Alert severity="info" sx={{ mt: 4 }}>
          No votes have been cast yet. Be the first to vote!
        </Alert>
      )}

      {totalVotes === 0 && dishes && dishes.length > 0 && (
        <Alert severity="info" sx={{ mt: 4 }}>
          No one has voted yet. Go to the Dishes page to cast your vote!
        </Alert>
      )}
    </Container>
  );
}

export default PollResultsFetcher;