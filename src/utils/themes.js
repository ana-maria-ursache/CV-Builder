export const getInitialTheme = () => {
  const savedTheme = localStorage.getItem('theme');
  return savedTheme ? savedTheme : 'light-theme';
};

export const applyTheme = (themeName) => {
  document.documentElement.classList.remove('light-theme', 'dark-theme');
  document.documentElement.classList.add(themeName);
  localStorage.setItem('theme', themeName);
};