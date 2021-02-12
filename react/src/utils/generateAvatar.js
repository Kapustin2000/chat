import tinycolor from 'tinycolor2';

const getCorrectIndex = (value) => (value > 255 ? 255 : value < 0 ? 0 : value);

const generateAvatar = (hash) => {
  const [r, g, b] = hash
    ?.substr(6, 9)
    .split('')
    .map((char) => getCorrectIndex(char.charCodeAt(0)));

  return tinycolor({ r, g, b })
    .lighten(15)
    .brighten(10)
    .saturate(45)
    .toHexString();
};
export default generateAvatar;
