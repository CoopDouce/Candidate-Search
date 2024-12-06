// This file will contain the functions to search for users on GitHub
// This Function will be used to search for users on GitHub
const searchGithub = async () => {
  try {
    const token = import.meta.env.VITE_GITHUB_TOKEN;
    if (!token) {
      throw new Error("GitHub token is undefined. Check your .env file.");
    }

    const start = Math.floor(Math.random() * 100000000) + 1;
    console.log("Fetching users starting from:", start);
    console.log("GitHub Token:", token);

    const response = await fetch(
      `https://api.github.com/users?since=${start}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("Response status:", response.status);
    const data = await response.json();
    if (!response.ok) {
      console.error("API response not OK:", data);
      throw new Error("Invalid API response, check the network tab");
    }
    console.log("Fetched data:", data);
    return data;
  } catch (err) {
    console.error("An error occurred while fetching users:", err);
    return [];
  }
};

// This Function will be used to search for a specific user on GitHub
const searchGithubUser = async (username: string) => {
  try {
    console.log("Fetching user:", username);
    const response = await fetch(`https://api.github.com/users/${username}`, {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
      },
    });
    console.log("Response status for user:", response.status);
    const data = await response.json();
    if (!response.ok) {
      console.error("API response not OK for user:", data);
      throw new Error("Invalid API response, check the network tab");
    }
    console.log("Fetched user data:", data);
    return data;
  } catch (err) {
    console.error(`An error occurred while fetching user ${username}:`, err);
    return null;
  }
};

export { searchGithub, searchGithubUser };