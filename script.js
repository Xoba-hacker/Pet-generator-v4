const generateBtn = document.getElementById('generateBtn');
const petResult = document.getElementById('petResult');
const joinServerBtn = document.getElementById('joinServerBtn');
const usernameInput = document.getElementById('usernameInput');
const profileDiv = document.getElementById('profile');
const petSelect = document.getElementById('petSelect');
const petImageDiv = document.getElementById('petImage');

const robloxServerLink = 'https://www.roblox.com.am/games/126884695634066/Grow-a-Garden?privateServerLinkCode=52534889335897791035324107410840';

// Pet images (replace with actual Grow a Garden Roblox images if available)
const petImages = {
  "Racoon": "https://i.imgur.com/1Racoon.png",
  "Dragonfly": "https://i.imgur.com/2Dragonfly.png",
  "Red Kitsune": "https://i.imgur.com/3RedKitsune.png",
  "Disco Bee": "https://i.imgur.com/4DiscoBee.png"
};

generateBtn.addEventListener('click', async () => {
  const username = usernameInput.value.trim();
  const chosenPet = petSelect.value;

  if (!username) {
    alert('Please enter your Roblox username!');
    return;
  }
  if (!chosenPet) {
    alert('Please choose a pet!');
    return;
  }

  try {
    // Modern Roblox API to get user ID by username
    const userResponse = await fetch(`https://users.roblox.com/v1/usernames/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ usernames: [username] })
    });
    const userData = await userResponse.json();

    if (userData.data && userData.data.length > 0 && userData.data[0].id) {
      const userId = userData.data[0].id;

      // Show profile picture
      const avatarUrl = `https://www.roblox.com/bust-thumbnail/image?userId=${userId}&width=100&height=100&format=png`;
      profileDiv.innerHTML = `<a href="https://www.roblox.com/users/${userId}/profile" target="_blank">
                                  <img src="${avatarUrl}" alt="${username} profile">
                              </a>`;

      // Show chosen pet and image
      petResult.textContent = `${username} got: ${chosenPet}!`;
      petImageDiv.innerHTML = `<img src="${petImages[chosenPet]}" alt="${chosenPet}">`;

      joinServerBtn.style.display = 'inline-block'; // Show join button
    } else {
      alert('Roblox username not found!');
      profileDiv.innerHTML = '';
      petResult.textContent = '';
      petImageDiv.innerHTML = '';
      joinServerBtn.style.display = 'none';
    }
  } catch (error) {
    console.error(error);
    alert('Error fetching Roblox profile.');
  }
});

joinServerBtn.addEventListener('click', () => {
  window.open(robloxServerLink, '_blank');
});