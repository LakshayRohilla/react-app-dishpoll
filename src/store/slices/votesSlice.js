import { createSlice } from '@reduxjs/toolkit';

const loadVotesFromStorage = () => {
  try {
    const userVotes = localStorage.getItem('userVotes');
    return userVotes ? JSON.parse(userVotes) : {};
  } catch (error) {
    console.error('Error loading votes from localStorage:', error);
    return {};
  }
};

const POINTS_MAP = {
  1: 30, // Rank 1 = 30 points
  2: 20, // Rank 2 = 20 points
  3: 10, // Rank 3 = 10 points
};

const initialState = {
  userVotes: loadVotesFromStorage(), 
};

const votesSlice = createSlice({
  name: 'votes',
  initialState,
  reducers: {
    setVote: (state, action) => {
      const { username, dishId, rank } = action.payload;
      
      if (!state.userVotes[username]) {
        state.userVotes[username] = {};
      }

      if (!rank) {
        delete state.userVotes[username][dishId];
      } else {
        const existingDishWithRank = Object.entries(state.userVotes[username]).find(
          ([id, r]) => r === rank && parseInt(id) !== dishId
        );

        if (existingDishWithRank) {
          delete state.userVotes[username][existingDishWithRank[0]];
        }

        state.userVotes[username][dishId] = rank;
      }
      localStorage.setItem('userVotes', JSON.stringify(state.userVotes));
    },
    
    clearUserVotes: (state, action) => {
      const { username } = action.payload;
      if (state.userVotes[username]) {
        delete state.userVotes[username];
        localStorage.setItem('userVotes', JSON.stringify(state.userVotes));
      }
    },

    clearAllVotes: (state) => {
      state.userVotes = {};
      localStorage.removeItem('userVotes');
    },
  },
});

export const { setVote, clearUserVotes, clearAllVotes } = votesSlice.actions;
export default votesSlice.reducer;

// Selectors
export const selectUserVotes = (username) => (state) => 
  state.votes.userVotes[username] || {};

export const selectAllVotes = (state) => state.votes.userVotes;

export const getPointsForRank = (rank) => POINTS_MAP[rank] || 0;