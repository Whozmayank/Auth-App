export const getAuthHeader = () => {
  const token = localStorage.getItem("authToken");
  if (!token) return {};
  return {
    Authorization: `Bearer ${token}`,
  };
};
