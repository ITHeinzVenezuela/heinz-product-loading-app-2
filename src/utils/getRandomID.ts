export const getRandomID = () => {
  
  const permittedChar = "abcdefghijklmnopqrstuvwxyz0123456789";
  const idLength = 15;
  let randomID = "";

  for (let i = 0; i < idLength; i++) {
    const randomIndex = Math.floor(Math.random() * permittedChar.length);
    randomID += permittedChar[randomIndex];
  }

  return randomID;
} 