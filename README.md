# 🍽️ Dish Poll - Voting Application

A React-based web application that allows multiple users to vote for their favorite dishes and view poll results in real-time.

# Problem Statement :
Make a small react app for ranking dishes. Multiple users should be able to login into the app and vote for their favourite dishes and see the results of the poll.

**Screens and functionalities needed:**
**Login Screen:** A user should be able to login into the app using a username and password. Since there is no backend to query you can use a static list of users. Refer to users.json for the static list of users to use

Once logged in the main app should have 2 tabs (or equivalent).

**Tab 1:** Fetch the list of dishes using an API and display the results for the user to vote. Each user then should be able to make a selection of 3 dishes from the poll that has been created. Each selection is given points based on the rank (Rank 1 gets 30 points, Rank 2 gets 20, Rank 3 gets 10). Save the user’s selections for displaying it to him on the next screen for poll results. A user should be able to edit his choices anytime even after submission i.e. if Dish 1 was Rank 1, the user can change it to no Rank or Rank 2, if there is another dish with the same rank the other dish will lose its rank

**Sample dish object**
{
    "id": 1,
    "dishName": "Lasagne",
    "description": "Breaded fried chicken with waffles, and a side of maple syrup.",
    "image": "https://loremflickr.com/300/300/food"
}
> **Check out constant.js file for the dish data json.**

**Tab2:** Show the dishes in the descending order of the points received from the polling. The logged in user should also be able to see his selections in this list so that he knows where his selected dishes stand in the rankings.

---

## ✨ Features

- **User Authentication**: Login system with multiple user accounts
- **Dish Voting**: 
  - Vote for top 3 favorite dishes
  - Rank dishes (Rank 1: 30 points, Rank 2: 20 points, Rank 3: 10 points)
  - Edit votes anytime
  - Automatic rank reassignment when conflicts occur
- **Poll Results**: 
  - View aggregated results from all users
  - See dish rankings sorted by total points
  - Track your own votes in the results
  - Visual progress bars and statistics
- **Persistent Storage**: Votes saved in localStorage
- **Responsive Design**: Works on mobile, tablet, and desktop

---

## 🛠️ Tech Stack

- **Frontend Framework**: React.js
- **State Management**: Redux Toolkit
- **UI Library**: Material-UI (MUI)
- **Routing**: React Router DOM
- **API Calls**: RTK Query
- **Notifications**: React Toastify
- **Styling**: CSS, MUI sx prop


# 🌍 Deployed Application
 https://react-app-dishpoll.netlify.app/



# 💻 For local setup :

## 📦 Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (v14 or higher)
- **npm** (v6 or higher) or **yarn**

Check versions:
```bash
node --version
npm --version
```

## 🚀 Installation
1. **Clone the repository**
```bash
git clone <repository-url>
cd react-app-dishpoll
```
2. **Install dependencies**
```bash
npm install
```

## ▶️ Running the Application
Start the development server
```bash
npm start
```

- The application will open automatically in your browser at: http://localhost:3000
- If it doesn't open automatically, manually navigate to the URL above.


## 🧪 Testing the Application
> ### ⚠️ Important Testing Instructions
>To experience the full functionality of the Poll Results page, you need to:
>
>Login with multiple users and cast votes from each account
Vote for different dishes with different ranks from each user
View Poll Results to see aggregated data from all users
Recommended Testing Flow:
- Step 1: Vote as User 1
1. Login with: username: amar | password: amar123
2. Go to "Dishes" page
3. Select and rank 3 dishes
4. Logout
- Step 2: Vote as User 2
1. Login with: username: akbar | password: akbar123
2. Go to "Dishes" page
3. Select and rank 3 different dishes (or same with different ranks)
4. Logout
- Step 3: Vote as User 3
1. Login with: username: antony | password: antony123
2. Go to "Dishes" page
3. Select and rank 3 dishes
4. Go to "Poll Result" page
5. See aggregated results with votes from all users
- Step 4: View Complete Results
1. Login with any user
2. Navigate to "Poll Result" page
3. You will now see:<br>
   ✓ Total voters count<br>
   ✓ Dishes ranked by total points<br>
   ✓ Vote breakdown for each dish<br>
   ✓ Your own votes highlighted<br>
   ✓ Progress bars showing popularity<br>

---

## 👤 Available Test Users:
**Username ===> Password**
1. amar ===> amar123	
2. akbar ===> akbar123	
3. antony ===>	antony123
4. john	===> john123	
5. paul ===> 	paul123	


