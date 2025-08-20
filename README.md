Vaidik Kathal IIT2024005
 <br>
The backend is kinda slow on vercel so please bear with it and might take some time / refresh to fetch the 300+ problems to display on dashboard :3 <br>

Frontend deployment - [https://vercel.com/vaidik-kathals-projects/geek-haven-taskone-ljzc](https://geek-haven-taskone-ljzc.vercel.app/)

backend deployment - [geek-haven-taskone.vercel.app](https://geek-haven-taskone.vercel.app/)
<br>
Hello Sir/Mam , there is one slight bug in the ui in frontend when user adds a question to bookmark or add a question to solved it is not being updated on the frontend in the same session (you have to logout and log back in ) but it is being added to the seperate bookmarks section and profile section instantly. ( like it is not updated on the question card but it being added to bookmarks/solved section)

I saw this bug before hand but due to and upcoming quiz on 20th i coundnt manage to fix it due to time constraints. I hope you understand and dont deduct any points for it becuase the backend adding and deleting logic works flawlessly.
<br> 
<br>

📌 API Routes

POST /api/bookmark
{ body: { quesId, userId } } → adds question to user’s bookmarked list

POST /api/addsolved
{ body: { quesId, userId } } → adds question to user’s solved list

POST /api/removesolved
{ body: { quesId, userId } } → removes question from user’s solved list

GET /api/fetchdata
→ fetches all categories with their questions

GET /api/search?topic={topic}
→ fetches questions by topic

GET /api/sorteddata
→ fetches categories with questions sorted alphabetically by title

GET /api/getbookmarkdata?userId={userId}
→ fetches user’s bookmarked questions

GET /api/getsolveddata?userId={userId}
→ fetches user’s solved questions
