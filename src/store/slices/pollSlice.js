import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  results: [], 
};

const pollSlice = createSlice({
  name: 'poll',
  initialState,
  reducers: {
    calculatePollResults: (state, action) => {
      const { dishes, allVotes } = action.payload;
      
      const dishPoints = {};
      
      dishes.forEach(dish => {
        dishPoints[dish.id] = {
          dishId: dish.id,
          dishName: dish.dishName,
          description: dish.description,
          image: dish.image,
          totalPoints: 0,
          votes: [],
        };
      });

      Object.entries(allVotes).forEach(([username, userVotes]) => {
        Object.entries(userVotes).forEach(([dishId, rank]) => {
          const points = rank === 1 ? 30 : rank === 2 ? 20 : rank === 3 ? 10 : 0;
          
          if (dishPoints[dishId]) {
            dishPoints[dishId].totalPoints += points;
            dishPoints[dishId].votes.push({ username, rank, points });
          }
        });
      });

      state.results = Object.values(dishPoints)
        .sort((a, b) => b.totalPoints - a.totalPoints)
        .map((dish, index) => ({
          ...dish,
          position: index + 1,
        }));
    },
  },
});

export const { calculatePollResults } = pollSlice.actions;
export default pollSlice.reducer;

// Selectors
export const selectPollResults = (state) => state.poll.results;

export const selectUserDishesInResults = (username) => (state) => {
  return state.poll.results.map(result => ({
    ...result,
    userVote: result.votes.find(v => v.username === username) || null,
  }));
};